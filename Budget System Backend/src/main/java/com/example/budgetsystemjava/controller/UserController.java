package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.config.JwtLoginRequest;
import com.example.budgetsystemjava.config.JwtLoginResponse;
import com.example.budgetsystemjava.services.UserServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/")
public class UserController {

    //UserServices
    private final UserServices userService;

    //controller
    @Autowired
    public UserController(UserServices userService) {
        this.userService = userService;
    }

    @GetMapping(path = "hello")
    public String hello() {
        return "Hello World";
    }

    @PostMapping(path = "/api/user/add_user")
    public ResponseEntity<String> addUser(@RequestBody Users user) {

        userService.addUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User added successfully");
    }

    @PostMapping(path = "/api/user/login")
    public ResponseEntity<?> login(@RequestBody JwtLoginRequest loginUser) {
     try {
         String token = userService.authenticateUser(loginUser.getEmail(), loginUser.getPassword());
         return ResponseEntity.ok(new JwtLoginResponse(token));
     }
     catch (Exception e){
        return ResponseEntity.badRequest().body(e.getMessage());
     }
    }

    @GetMapping(path = "/api/user/loggedInUser")
    public ResponseEntity<?> getLoggedInUser(@RequestHeader("Authorization") String token) {
        try {
            Users user = userService.getLoggedInUser(token);
            return ResponseEntity.ok(user);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/api/user/allUsers")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        try {
            List<Users> users = userService.getAllUsers(token);
            return ResponseEntity.ok(users);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
