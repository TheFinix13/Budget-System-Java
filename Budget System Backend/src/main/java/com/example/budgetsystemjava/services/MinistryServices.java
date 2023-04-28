package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.MinistryDTO;
import com.example.budgetsystemjava.repository.MinistryRepo;
import com.example.budgetsystemjava.repository.UserRepo;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MinistryServices {
    private final MinistryRepo ministryRepo;
    private final UserRepo userRepo;
    @Autowired
    private ModelMapper mapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public MinistryServices(MinistryRepo ministryRepo, UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
        this.ministryRepo = ministryRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
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

    public List<Ministry> getMinistries(){
        List<Ministry> ministry = ministryRepo.getMinistryData();

        for (Ministry min : ministry) {
            Users user = userRepo.findByMinistryID(min.getMinistry_id());
           if (user != null) {
            min.setFirstname(user.getFirstname());
            min.setLastname(user.getLastname());
            min.setEmail(user.getEmail());
            }
        }

        return ministry;
    }

    public Ministry updateMinistry(long ministry_id, MinistryDTO ministryDTO) throws NotFoundException {
        Optional<Ministry> existingMinistry = ministryRepo.findById(ministry_id);
        if (!existingMinistry.isPresent()) {
            throw new NotFoundException("Ministry with id " + ministry_id + " does not exist");
        }

        //update the ministry
        Ministry updatedMinistry = existingMinistry.get()
                        .builder()
                        .name(ministryDTO.getName())
                        .description(ministryDTO.getDescription())
                        .location(ministryDTO.getLocation())
                        .sector(ministryDTO.getSector())
                        .build();

        return ministryRepo.save(updatedMinistry);
    }

    public boolean deleteMinistry(Long id) {
        Optional<Ministry> existingMinistry = ministryRepo.findById(id);
        if (!existingMinistry.isPresent()) {
            return false;
        }
        ministryRepo.deleteById(id);
        return true;
    }

//    public ResponseEntity<List<Ministry>> showAllMinistry () {
//        List<Ministry> details = ministryRepo.findAll();
//        if (details.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(details);
//    }
//
//
//
//    public List<Ministry> showDepartmentCount() {
//        List<Ministry> details = ministryRepo.findAll();
//        if(details.isEmpty()) {
//            throw new IllegalStateException("No Ministry Found");
//        }
//        return details;
//    }

//    public List<Ministry> ministryDepartmentCount() {
//        List<Ministry> details = ministryRepo.findAll();
//        if(details.isEmpty()) {
//            throw new IllegalStateException("No Ministry Found");
//        }
//        return details;
//    }
}
