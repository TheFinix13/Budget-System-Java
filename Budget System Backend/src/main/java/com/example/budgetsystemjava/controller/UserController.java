package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.UserDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.exceptions.UserNotFoundException;
import com.example.budgetsystemjava.repository.UserRepo;
import com.example.budgetsystemjava.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = {"*",
        "http://localhost:3000/"}
            )
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

        userService.createSuperApproveUser(user);

        return new ResponseEntity<>("Approve User Created Successfully", HttpStatus.CREATED);
    }

    @PostMapping(path = "add_super_admin")
    public ResponseEntity<String> createSuperAdmin(@RequestBody UserDTO user) {

        userService.createSuperAdminUser(user);

        return new ResponseEntity<>("SuperAdmin Created Successfully", HttpStatus.CREATED);
    }

    @PostMapping(path = "assign_ministry_to_admin/{userId}")
    public ResponseEntity<String> assignMinistryToAdmin(@PathVariable("userId") Long userId,
                                                       @RequestParam("ministryId") Long ministryId) {
        try {
            userService.assignMinistryToAdminUser(userId, ministryId);
            return ResponseEntity.ok("Ministry assigned to admin successfully.");
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body("User not found.");
        } catch (MinistryNotFoundException e) {
            return ResponseEntity.badRequest().body("Ministry not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning ministry to user.");
        }
    }

    @PostMapping(path = "assign_approver_to_ministry/{ministryId}")
    public ResponseEntity<String> assignApproverToMinistryUser(@PathVariable Long ministryId) {
        try {
            userService.assignApproverUserToMinistry(ministryId);
            return ResponseEntity.ok("Approver assigned successfully to the ministry.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning approver to the ministry.");
        }
    }

    @GetMapping("get_ministry_id/{adminId}")
    public ResponseEntity<Long> getMinistryIdByAdminId(@PathVariable Long adminId) {
        // Logic to retrieve the ministry ID associated with the admin
        Long ministryId = userService.getMinistryIdByAdminId(adminId);
        return ResponseEntity.ok(ministryId);
    }

    @PostMapping("/uploadProfilePhoto/{userId}")
    public ResponseEntity<String> uploadProfilePhoto(
            @PathVariable("userId") Long userId,
            @RequestParam("profilePhoto") MultipartFile profilePhotoData
    ) {
        try {
            userService.saveProfilePhoto(userId, profilePhotoData.getBytes());
            return ResponseEntity.ok("Profile photo uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading profile photo.");
        }
    }





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
