package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Budget;
import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DTO.BudgetDTO;
import com.example.budgetsystemjava.repository.BudgetRepo;
import com.example.budgetsystemjava.repository.DepartmentRepo;
import com.example.budgetsystemjava.repository.DivisionRepo;
import com.example.budgetsystemjava.repository.MinistryRepo;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BudgetServices {
    private final BudgetRepo budgetRepo;
    private final DivisionRepo divisionRepo;
    private final DepartmentRepo departmentRepo;
    private final MinistryRepo ministryRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public BudgetServices(BudgetRepo budgetRepo, DivisionRepo divisionRepo, DepartmentRepo departmentRepo, MinistryRepo ministryRepo, ModelMapper modelMapper) {
        this.budgetRepo = budgetRepo;
        this.divisionRepo = divisionRepo;
        this.departmentRepo = departmentRepo;
        this.ministryRepo = ministryRepo;
        this.modelMapper = modelMapper;
    }

    public BudgetDTO createBudget(BudgetDTO budgetDTO, Long divisionId) throws NotFoundException {
        Division division = divisionRepo.findById(divisionId)
                .orElseThrow(() -> new NotFoundException("Division Not Found"));

        Department department = division.getDepartment();

        if (department.getDepartmentId() == 0) {
            department = departmentRepo.save(department);
        }

        Budget budget = modelMapper.map(budgetDTO, Budget.class);
        budget.setStatus("Created");
        budget.setCreated_at(LocalDateTime.now());
        budget.setDepartment(department);

        if (division.getDivisionId() == 0) {
            division = divisionRepo.save(division);
        }

        budget.setDivision(division);

        Budget createdBudget = budgetRepo.save(budget);

        BudgetDTO createdBudgetDTO = modelMapper.map(createdBudget, BudgetDTO.class);
        createdBudgetDTO.setStatus("Created");
        createdBudgetDTO.setCreated_at(LocalDateTime.now());
        createdBudgetDTO.setDepartment_id(department.getDepartmentId());
        createdBudgetDTO.setDepartmentName(department.getName());
        createdBudgetDTO.setDivision_id(division.getDivisionId());
        createdBudgetDTO.setDivisionName(division.getName());

        return createdBudgetDTO;

    }

    public List<BudgetDTO> getBudgetRequestsByDivision(Long divisionId) throws NotFoundException {
        Division division = divisionRepo.findById(divisionId)
                .orElseThrow(() -> new NotFoundException("Division not Found"));

        List<Budget> budgetRequests = budgetRepo.findByDivision(division);

        List<BudgetDTO> budgetDTO = new ArrayList<>();

        for (Budget bud : budgetRequests) {
            BudgetDTO budget = BudgetDTO.builder()
                    .budget_id(bud.getBudgetId())
                    .narration(bud.getNarration())
                    .amount(bud.getAmount())
                    .status(bud.getStatus())
                    .divisionName(division.getName())
                    .division_id(division.getDivisionId())
                    .build();

            budgetDTO.add(budget);
        }

        return budgetDTO;
    }

    public List<BudgetDTO> getBudgetByDepartment(Long departmentId) throws NotFoundException {
        Department department = departmentRepo.findById(departmentId)
                .orElseThrow(() -> new NotFoundException("Department not found"));

        List<Budget> budgetRequests = budgetRepo.findByDepartment(department);

        List<BudgetDTO> budgetDTO = new ArrayList<>();

        for (Budget bud : budgetRequests) {
            BudgetDTO budget = BudgetDTO.builder()
                    .budget_id(bud.getBudgetId())
                    .amount(bud.getAmount())
                    .status(bud.getStatus())
                    .departmentName(department.getName())
                    .department_id(department.getDepartmentId())
                    .build();

            budgetDTO.add(budget);
        }

        return budgetDTO;
    }

    public List<BudgetDTO> getBudgetRequestsByMinistry(Long ministryId) throws NotFoundException {
        Ministry ministry = ministryRepo.findById(ministryId)
                .orElseThrow(() -> new NotFoundException("Ministry not found"));

        List<Department> departments = departmentRepo.findByMinistry(ministry);

        List<BudgetDTO> budgetDTOs = new ArrayList<>();

        for (Department department : departments) {
            List<Division> divisions = divisionRepo.findByDepartment(department);

            for (Division division : divisions) {
                List<Budget> budgetRequests = budgetRepo.findByDivision(division);

                for (Budget bud : budgetRequests) {
                    BudgetDTO budgetDTO = BudgetDTO.builder()
                            .budget_id(bud.getBudgetId())
                            .amount(bud.getAmount())
                            .status(bud.getStatus())
                            .ministryName(ministry.getName())
                            .ministry_id(ministry.getMinistryId())
                            .build();

                    budgetDTOs.add(budgetDTO);
                }
            }
        }

        return budgetDTOs;
    }


    public List<BudgetDTO> getAllPendingRequests() {
        List<Budget> pendingRequests = budgetRepo.findByStatus("created");

        return getBudgetDTOS(pendingRequests);
    }

    public List<BudgetDTO> getPendingRequestsByMinistry(Long ministryId) {
        List<Budget> pendingRequests = budgetRepo.findByStatusAndMinistryId("created", ministryId);

        return getBudgetDTOS(pendingRequests);
    }

    public ResponseEntity<?> approveBudget(Long requestId) {
        return updateBudgetStatus(requestId, "Approved");
    }

    public ResponseEntity<?> denyBudget(Long requestId) {
        return updateBudgetStatus(requestId, "Denied");
    }

    private ResponseEntity<?> updateBudgetStatus(Long requestId, String newStatus) {
        Budget budget = budgetRepo.findById(requestId).orElse(null);

        if (budget == null) {
            return ResponseEntity.notFound().build();
        }

        budget.setStatus(newStatus);

        try {
            budgetRepo.save(budget);
            return ResponseEntity.ok().build();
        } catch (DataIntegrityViolationException e) {
            // Handle constraint violation if necessary
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error updating budget status. Constraint violation.");
        } catch (Exception e) {
            // Handle other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating budget status.");
        }
    }


    public List<BudgetDTO> getAllHandledRequests() {
        List<Budget> handledRequests = budgetRepo.findHandledRequests();

        return getBudgetDTOS(handledRequests);
    }

    public List<BudgetDTO> getHandledRequestsByMinistry(Long ministryId) {
        List<Budget> handledRequests = budgetRepo.findHandledRequestsByMinistryId(ministryId);

        return getBudgetDTOS(handledRequests);
    }

    private List<BudgetDTO> getBudgetDTOS(List<Budget> handledRequests) {
        List<BudgetDTO> budgetDTOs = new ArrayList<>();

        for (Budget budget : handledRequests) {
            Ministry ministry = budget.getDivision().getDepartment().getMinistry();

            Department department = budget.getDivision().getDepartment();

            BudgetDTO budgetDTO = BudgetDTO.builder()
                    .budget_id(budget.getBudgetId())
                    .narration(budget.getNarration())
                    .amount(budget.getAmount())
                    .status(budget.getStatus())
                    .divisionName(budget.getDivision().getName())
                    .division_id(budget.getDivision().getDivisionId())
                    .divisionCode(budget.getDivision().getCode())
                    .department_id(department.getDepartmentId())
                    .departmentName(department.getName())
                    .ministryName(ministry.getName())
                    .ministry_id(ministry.getMinistryId())
                    .build();

            budgetDTOs.add(budgetDTO);
        }

        return budgetDTOs;
    }


}

