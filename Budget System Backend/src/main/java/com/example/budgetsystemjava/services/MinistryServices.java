package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.DepartmentDTO;
import com.example.budgetsystemjava.DTO.DivisionDTO;
import com.example.budgetsystemjava.DTO.MinistryDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.repository.DepartmentRepo;
import com.example.budgetsystemjava.repository.DivisionRepo;
import com.example.budgetsystemjava.repository.MinistryRepo;
import com.example.budgetsystemjava.repository.UserRepo;
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

    @Autowired
    public MinistryServices(MinistryRepo ministryRepo, DepartmentRepo departmentRepo, UserRepo userRepo, ModelMapper mapper, BCryptPasswordEncoder passwordEncoder,
                            DivisionRepo divisionRepo) {
        this.ministryRepo = ministryRepo;
        this.departmentRepo = departmentRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.divisionRepo = divisionRepo;
    }

    public ResponseEntity<?> addMinistry(MinistryDTO ministryDTO) {

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
            if (ministryDTO != null) {
                Users userMinistry = mapper.map(ministryDTO, Users.class);

                //create a new user with the ministry role
                userMinistry.setPassword(passwordEncoder.encode(ministryDTO.getPassword()));
                userMinistry.setRole("ministry");
                userMinistry.setStatus("active");
                userMinistry.setMinistryID(saveMinistry.getMinistry_id());

                userRepo.save(userMinistry);
            } else {
                return ResponseEntity.badRequest().body("User details are required");
            }
            return ResponseEntity.ok("Ministry created successfully");

        } else {
            return ResponseEntity.badRequest().body("Ministry details are required");
        }
    }

    public List<MinistryDTO> getMinistries(){
        List<Ministry> ministry = ministryRepo.getMinistryData();

        List<MinistryDTO> ministryDTOs = new ArrayList<>();
        for (Ministry min : ministry) {
            Users user = userRepo.findByMinistryID(min.getMinistry_id());
            int departmentCount = departmentRepo.countDepartmentsByMinistryId(min.getMinistry_id());
            int divisionCount = divisionRepo.countDivisionsByMinistryId(min.getMinistry_id());

            MinistryDTO ministryDTO = new MinistryDTO().builder()
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
                    .name(ministry.getName())
                    .description(ministry.getDescription())
                    .location(ministry.getLocation())
                    .sector(ministry.getSector())
                    .totalDepartments(totalDepartments)
                    .totalDivisions(totalDivisions)
                    .build();

        }else {
            throw new MinistryNotFoundException("Ministry not found");
        }
    }

}
