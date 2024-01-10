package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DTO.DivisionDTO;
import com.example.budgetsystemjava.repository.BudgetRepo;
import com.example.budgetsystemjava.repository.DepartmentRepo;
import com.example.budgetsystemjava.repository.DivisionRepo;
import com.example.budgetsystemjava.repository.MinistryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DivisionServices {
    private final DivisionRepo divisionRepo;
    private final DepartmentRepo departmentRepo;
    private final MinistryRepo ministryRepo;
    private final BudgetRepo budgetRepo;

    @Autowired
    public DivisionServices(DivisionRepo divisionRepo, DepartmentRepo departmentRepo, MinistryRepo ministryRepo, BudgetRepo budgetRepo) {
        this.divisionRepo = divisionRepo;
        this.departmentRepo = departmentRepo;
        this.ministryRepo = ministryRepo;
        this.budgetRepo = budgetRepo;
    }

    public void addDivision(Long departmentId, DivisionDTO divisionDto) {
        try {
            Optional<Department> departmentOptional = departmentRepo.findById(
//                    departmentId, divisionDto.getMinistryId());
                    departmentId);
            //Check if department exists
            if (departmentOptional.isPresent()) {
                Department department = departmentOptional.get();

                //create a new division
                Division division = Division.builder()
                        .name(divisionDto.getName())
                        .code(divisionDto.getCode())
                        .description(divisionDto.getDescription())
                        .created_at(LocalDateTime.now())
                        .department(department)
                        .build();

                //save the division
                divisionRepo.save(division);

                //set the department of the division
                department.getDivisions().add(division);
                department.setDepartmentId(division.getDivisionId());
                departmentRepo.save(department);

                DivisionDTO savedDivisionDto = DivisionDTO.builder()
                        .name(division.getName())
                        .code(division.getCode())
                        .description(division.getDescription())
                        .created_at(division.getCreated_at())
                        .departmentId(departmentId)
                        .build();

                ResponseEntity.status(HttpStatus.CREATED)
                        .body(savedDivisionDto);
            } else {
                throw new RuntimeException("Department does not exist");
            }
        } catch (Exception e) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Error(e.getMessage()));
        }
    }

    public List<DivisionDTO> getDivisionsInADepartment(Long departmentId) {
        List<Division> divisions = divisionRepo.findByDepartmentId(departmentId);

        List<DivisionDTO> fetchedDivision = new ArrayList<>();
        for (Division division : divisions) {
            fetchedDivision.add(DivisionDTO.builder()
                    .id(division.getDivisionId())
                    .name(division.getName())
                    .code(division.getCode())
                    .description(division.getDescription())
                    .departmentName(division.getDepartment().getName())
                    .build());
        }

        return fetchedDivision;
    }

    public List<DivisionDTO> getAllDivisions() {
        List<DivisionDTO> allDivision = new ArrayList<>();
        List<Division> divisions = divisionRepo.findAll();

        for (Division division : divisions) {

            Department department = division.getDepartment();

            if (department != null) {

                Ministry ministry = department.getMinistry();

                if (ministry != null) {

                    Long ministryID = ministry.getMinistryId();

                    Ministry ministryId = ministryRepo.findById(ministryID)
                            .orElse(null);

                    Long departmentId = department.getDepartmentId();

                    departmentRepo.findById(departmentId)
                            .ifPresent(departmentID -> {
                                assert ministryId != null;

                                // Count budget requests for the division
                                int budgetRequestCount = budgetRepo.countBudgetRequestsByDivision(division);

                                allDivision.add(DivisionDTO.builder()
                                        .name(division.getName())
                                        .code(division.getCode())
                                        .description(division.getDescription())
                                        .departmentId(departmentID.getDepartmentId())
                                        .departmentName(departmentID.getName())
                                        .ministryId(ministryId.getMinistryId())
                                        .ministryName(ministryId.getName())
                                        .budgetRequestCount(budgetRequestCount)
                                        .build());
                            });

                }
            }
        }
        return allDivision;
    }
}
