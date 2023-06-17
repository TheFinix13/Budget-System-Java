package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.DivisionDTO;
import com.example.budgetsystemjava.DTO.MinistryDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.repository.*;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MinistryServices {
    private final MinistryRepo ministryRepo;
    private final DepartmentRepo departmentRepo;
    private final UserRepo userRepo;
    private final ModelMapper mapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final DivisionRepo divisionRepo;
    private final BudgetRepo budgetRepo;

    @Autowired
    public MinistryServices(MinistryRepo ministryRepo, DepartmentRepo departmentRepo, UserRepo userRepo, ModelMapper mapper, BCryptPasswordEncoder passwordEncoder,
                            DivisionRepo divisionRepo, BudgetRepo budgetRepo) {
        this.ministryRepo = ministryRepo;
        this.departmentRepo = departmentRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.divisionRepo = divisionRepo;
        this.budgetRepo = budgetRepo;
    }

    public ResponseEntity<?> addMinistry( MinistryDTO ministryDTO) {

        //check if a user with email already exists
        String userEmail = new Users().getEmail();
        if (userRepo.findByEmail(userEmail).isPresent()) {
            return ResponseEntity.badRequest().body("Email already taken");
        }

        String ministryName = new Ministry().getName();
        if (ministryRepo.findByName(ministryName).isPresent()) {
            return ResponseEntity.badRequest().body("Ministry with name already taken");
        }

        //create the new ministry
        if (ministryDTO != null) {
            Ministry newMinistry = mapper.map(ministryDTO, Ministry.class);

            Ministry saveMinistry = ministryRepo.save(newMinistry);

            //Map the user to the ministry
            Users userMinistry = mapper.map(ministryDTO, Users.class);

            //create a new user with the ministry role
            userMinistry.setPassword(passwordEncoder.encode(ministryDTO.getPassword()));
            userMinistry.setRole("ministry");
            userMinistry.setStatus("active");
            userMinistry.setMinistryID(saveMinistry.getMinistry_id());

            userRepo.save(userMinistry);
            return ResponseEntity.ok("Ministry created successfully");

        } else {
            return ResponseEntity.badRequest().body("Ministry details are required");
        }
    }

    public List<MinistryDTO> getMinistries() {
        List<Ministry> ministry = ministryRepo.getMinistryData();

        List<MinistryDTO> ministryDTOs = new ArrayList<>();
        for (Ministry min : ministry) {
            int departmentCount = departmentRepo.countDepartmentsByMinistryId(min.getMinistry_id());
            int divisionCount = divisionRepo.countDivisionsByMinistryId(min.getMinistry_id());

            new MinistryDTO();
            MinistryDTO ministryDTO = MinistryDTO.builder()
                    .ministry_id(min.getMinistry_id())
                    .name(min.getName())
                    .description(min.getDescription())
                    .location(min.getLocation())
                    .sector(min.getSector())
                    .totalDepartments(departmentCount)
                    .totalDivisions(divisionCount)
                    .build();

            ministryDTOs.add(ministryDTO);
        }

        return ministryDTOs;
    }

    public Ministry updateMinistry(long ministry_id, MinistryDTO ministryDTO) throws NotFoundException {
        Ministry existingMinistry = ministryRepo.findById(ministry_id)
                .orElseThrow(() -> new NotFoundException("Ministry with id " + ministry_id + " does not exist"));

        //update the ministry
        existingMinistry.setName(ministryDTO.getName());
        existingMinistry.setDescription(ministryDTO.getDescription());
        existingMinistry.setLocation(ministryDTO.getLocation());
        existingMinistry.setSector(ministryDTO.getSector());

        return ministryRepo.save(existingMinistry);
    }

    public boolean deleteMinistry(Long id) {
        Optional<Ministry> existingMinistry = ministryRepo.findById(id);
        if (!existingMinistry.isPresent()) {
            return false;
        }
        ministryRepo.deleteById(id);
        return true;
    }

    public MinistryDTO showAMinistry(Long id) {
        Optional<Ministry> optionalMinistry = ministryRepo.findById(id);

        if (optionalMinistry.isPresent()) {
            Ministry ministry = optionalMinistry.get();

            List<Department> departments = departmentRepo.getDepartmentDataByMinistryId(ministry.getMinistry_id());

            int totalDepartments = departmentRepo.countDepartmentsByMinistryId(ministry.getMinistry_id());

            int totalDivisions = 0;

            for (Department depart : departments) {
                int departDivisions = divisionRepo.countDivisionsByDepartmentId(depart.getDepartment_id());
                totalDivisions += departDivisions;
            }

            return MinistryDTO.builder()
                    .ministry_id(ministry.getMinistry_id())
                    .name(ministry.getName())
                    .description(ministry.getDescription())
                    .location(ministry.getLocation())
                    .sector(ministry.getSector())
                    .totalDepartments(totalDepartments)
                    .totalDivisions(totalDivisions)
                    .build();

        } else {
            throw new MinistryNotFoundException("Ministry not found");
        }
    }

    public List<DivisionDTO> getAllDivisionsInMinistry(long ministry_id) {
        Ministry ministry = ministryRepo.findById(ministry_id)
                .orElse(null);

        if (ministry == null) {
            throw new MinistryNotFoundException("Ministry not found with ID: " + ministry_id);
        }

        List<Division> divisions = ministryRepo.findDivisions(ministry_id);

        return divisions.stream()
                .map(division -> {
                    DivisionDTO divisionDTO = new DivisionDTO();
                    divisionDTO.setId(division.getDivision_id());
                    divisionDTO.setName(division.getName());
                    divisionDTO.setCode(division.getCode());
                    divisionDTO.setDescription(division.getDescription());
                    divisionDTO.setDepartmentName(division.getDepartment().getName());

                    // Fetch the count of budget requests for the division
                    int budgetRequestCount = budgetRepo.countBudgetRequestsByDivision(division);
                    divisionDTO.setBudgetRequestCount(budgetRequestCount);

                    return divisionDTO;
                })
                .collect(Collectors.toList());
    }

}
