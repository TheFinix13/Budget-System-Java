package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.UserDTO;
import com.example.budgetsystemjava.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    //UserServices
    private final UserServices userService;

    //controller
    @Autowired
    public UserController(UserServices userService) {
        this.userService = userService;
    }

    @PostMapping(path = "add_admin")
    public ResponseEntity<String> addAdminUser(@RequestBody Users user) {

        userService.addAdminUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("Admin User added successfully");
    }

    @PostMapping(path = "add_approve")
    public ResponseEntity<String> createApprove(@RequestBody UserDTO user) {

        userService.createApproveUser(user);

        return new ResponseEntity<>("Approve User Created Successfully", HttpStatus.CREATED);
    }

//    @GetMapping(path = "/api/user/loggedInUser")
//    public ResponseEntity<?> getLoggedInUser(@RequestHeader("Authorization") String token) {
//        try {
//            Users user = userService.getLoggedInUser(token);
//            return ResponseEntity.ok(user);
//        }
//        catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    @GetMapping(path = "/api/user/allUsers")
//    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
//        try {
//            List<Users> users = userService.getAllUsers(token);
//            return ResponseEntity.ok(users);
//        }
//        catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

}
