package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.UserDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.exceptions.UserNotFoundException;
import com.example.budgetsystemjava.repository.MinistryRepo;
import com.example.budgetsystemjava.repository.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServices implements UserDetailsService {
    private final UserRepo userRepo;
    private final MinistryRepo ministryRepo;

    private final BCryptPasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    //Constructor
    @Autowired
    public UserServices(UserRepo userRepo, MinistryRepo ministryRepo, BCryptPasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.ministryRepo = ministryRepo;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    //Add User to Database
    public void addAdminUser(Users user) {
        Users newUser = modelMapper.map(user, Users.class);
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole("admin");
        newUser.setStatus("active");

        Users savedUser = userRepo.save(newUser);

        modelMapper.map(savedUser, UserDTO.class);
    }

    public void createApproveUser(UserDTO userDTO) {
        Users user = Users.builder()
                .firstname(userDTO.getFirstname())
                .lastname(userDTO.getLastname())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .role("approve")
                .status("active")
                .build();

        userRepo.save(user);
    }

    public void createSuperAdminUser(UserDTO superAdminDTO) {
        // Create the superAdmin user
        Users superAdmin = Users.builder()
                .firstname(superAdminDTO.getFirstname())
                .lastname(superAdminDTO.getLastname())
                .email(superAdminDTO.getEmail())
                .password(passwordEncoder.encode(superAdminDTO.getPassword()))
                .role("superAdmin")
                .status("active")
                .build();

        // Save the superAdmin user to the database
        userRepo.save(superAdmin);
    }

    public void assignAdminToMinistry(long adminUserId, long ministryId) {
        // Find the admin user by user_id
        Optional<Users> adminUserOptional = userRepo.findById(adminUserId);

        if (adminUserOptional.isPresent()) {
            Users adminUser = adminUserOptional.get();
            adminUser.setMinistryID(ministryId);
            userRepo.save(adminUser);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> userOptional = userRepo.findByEmail(email);

        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }

        Users user = userOptional.get();

        // Create and return an instance of UserDetails
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }

    public void assignMinistryToUser(Long userId, Long ministryId) {
        Users admin = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        Ministry assignMinistry = ministryRepo.findById(ministryId)
                .orElseThrow(() -> new MinistryNotFoundException("User not found."));

        if (assignMinistry == null) {
            throw new MinistryNotFoundException("Ministry not found.");
        }

        admin.setMinistryID(ministryId);
        userRepo.save(admin);
    }


//    public Users getLoggedInUser(String token) {
//        Long userId = jwtUtils.getUserIdFromToken(token);
//        Optional<Users> user = userRepo.findById(userId);
//        if (!user.isPresent()) {
//            throw new UsernameNotFoundException("User not found with id: " + userId);
//        }
//        return user.get();
//    }
//
//    public List<Users> getAllUsers(String token) {
//        Long userId = jwtUtils.getUserIdFromToken(token);
//        Optional<Users> user = userRepo.findById(userId);
//        if (!user.isPresent()) {
//            throw new UsernameNotFoundException("User not found with id: " + userId);
//        }
//        return userRepo.findAll();
//    }
//
//    public List<Users> getAllUsers() {
//        List<Users> user = userRepo.findAll();
//
//        List<Users> loggedUser = user
//                .stream()
//                .map(u -> {
//                    Users newU = new Users();
//                    newU.setFirstname(u.getFirstname());
//                    newU.setLastname(u.getLastname());
//                    newU.setEmail(u.getEmail());
//                    newU.setRole(u.getRole());
//                    newU.setStatus(u.getStatus());
//                    return newU;
//                }).collect(Collectors.toList());
//
//        return loggedUser;
//
//    }


}
