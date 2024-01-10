package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.UserDTO;
import com.example.budgetsystemjava.config.JwtLoginRequest;
import com.example.budgetsystemjava.config.JwtUtils;
import com.example.budgetsystemjava.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"*",
        "http://localhost:3000/"}
)
@RestController
@RequestMapping(path = "api/auth")
public class AuthController {
    private final UserRepo userRepo;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepo userRepo, JwtUtils jwtUtils, BCryptPasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(path = "login")
    public ResponseEntity<?> login(@RequestBody JwtLoginRequest loginRequest) {

        // Retrieve user by email
        Optional<Users> optionalUser = userRepo.findByEmail(loginRequest.getEmail());
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email credentials");
        }

        Users user = optionalUser.get();

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password credentials");
        }

        // Generate JWT
        String jwt = jwtUtils.generateToken(user.getUserId(), user.getEmail(), user.getRole(), user.getMinistryID());

        // Return JWT
        return ResponseEntity.ok(jwt);
    }

    @GetMapping(path = "/getLoggedInUser")
    public ResponseEntity<?> getLoggedInUser(@AuthenticationPrincipal UserDetails userDetails) {
        // Get the username (email) from the authenticated user details
        String username = userDetails.getUsername();

        // Retrieve the user by email
        Optional<Users> optionalUser = userRepo.findByEmail(username);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        Users user = optionalUser.get();

        // Create a UserDTO object with user information
        UserDTO userDTO = UserDTO.builder()
                .userId(user.getUserId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .build();

        // Return the userDTO in the response
        return ResponseEntity.ok(userDTO);
    }

}
