package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.UserDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.exceptions.UserNotFoundException;
import com.example.budgetsystemjava.repository.MinistryRepo;
import com.example.budgetsystemjava.repository.UserRepo;
import javassist.NotFoundException;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.*;


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

    //Add User to Database
    public void addAdminUser(Users user) {
        Users newUser = modelMapper.map(user, Users.class);
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole("admin");
        newUser.setStatus("active");

        Users savedUser = userRepo.save(newUser);

        modelMapper.map(savedUser, UserDTO.class);

    }

    public void createSuperApproveUser(UserDTO userDTO) {
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

    public void assignMinistryToAdminUser(Long userId, Long ministryId) {
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

    public void assignApproverUserToMinistry(Long ministryId) {
        Ministry ministry = ministryRepo.findById(ministryId)
                .orElseThrow(() -> new MinistryNotFoundException("Ministry not found."));

        String ministryName = ministry.getName();

        // Customize the approver email format as needed
        String approverEmail = getLastWord(ministryName) + "approver@gmail.com";
        String approverFirstName = getLastWord(ministryName);

        // Create the approver user
        Users approver = Users.builder()
                .firstname(approverFirstName) // Customize as needed
                .lastname("Approver")
                .email(approverEmail)
                .password(passwordEncoder.encode("password")) // Customize as needed
                .role("approver")
                .status("active")
                .ministryID(ministry.getMinistryId()) // Link the approver user to the ministry user
                .build();

        // Save the approver user to the database
        userRepo.save(approver);
    }

    // Utility method to extract the first word from a string
    private String getLastWord(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }

        // Split the string by space
        String[] words = input.trim().split("\\s+");

        // Get the last word
        return words[words.length - 1].trim();
    }

    public Users getAdministratorById(long id) throws NotFoundException {
        return userRepo.findByUserIdAndRole(id, "admin")
                .orElseThrow(() -> new NotFoundException("Administrator not found with ID: " + id));
    }

    public Users getApproverById(long id) throws NotFoundException {
        return userRepo.findByUserIdAndRole(id, "approver")
                .orElseThrow(() -> new NotFoundException("Approver not found with ID: " + id));
    }

    public List<Users> getAllAdministrators() {
        return userRepo.findAllByRole("admin");
    }

    public void saveProfilePhoto(Long userId, byte[] profilePhotoData) throws IOException {
        Optional<Users> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();

            // Set the profile photo data directly
            user.setProfilePhotoData(profilePhotoData);

            // Save the updated user entity with profile photo data to the database
            userRepo.save(user);
        }
    }

    public Long getMinistryIdByAdminId(Long adminId) {
        Users user = userRepo.findById(adminId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + adminId));

        // Assuming your User entity has a ministryId field
        return user.getMinistryID();
    }

    // Method to change a user's name based on ID and status
    public void updateUserName(Long userId, String newFirstName, String newLastName) {
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        // Check if the user's status is 'active'
        if ("active".equals(user.getStatus())) {

            // Update the user's first name
            if (newFirstName != null && !newFirstName.isEmpty()) {
                user.setFirstname(newFirstName);
            }

            // Update the user's last name
            if (newLastName != null && !newLastName.isEmpty()) {
                user.setLastname(newLastName);
            }
        } else {
            throw new IllegalArgumentException("User status must be 'active'");
        }
        // Save the updated user to the database
        userRepo.save(user);
    }

    // Method to change a user's name based on ID and status
    public void updateEmail(Long userId, String newEmail) {
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        // Check if the user's status is 'active'
        if ("active".equals(user.getStatus())) {
            // Update the user's name
            user.setEmail(newEmail);
        } else {
            throw new IllegalArgumentException("User status must be 'active'");
        }
        // Save the updated user to the database
        userRepo.save(user);
    }

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
