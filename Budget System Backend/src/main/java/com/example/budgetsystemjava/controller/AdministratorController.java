package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.EmailUpdateDTO;
import com.example.budgetsystemjava.DTO.UsernameUpdateDTO;
import com.example.budgetsystemjava.services.UserServices;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*",
        "http://localhost:3000/"}
)
@RestController
@RequestMapping(path = "api/admin")
public class AdministratorController {
    private final UserServices userServices;

    @Autowired
    public AdministratorController(UserServices userServices) {
        this.userServices = userServices;
    }

    @GetMapping("/getAnAdmin/{id}")
    public Users getAdministratorById(@PathVariable("id") long id) throws NotFoundException {
        return userServices.getAdministratorById(id);
    }

    @GetMapping("/getAnApprover/{id}")
    public Users getApproverById(@PathVariable("id") long id) throws NotFoundException {
        return userServices.getApproverById(id);
    }

    // Get all administrators
    @GetMapping("/getAllAdmins")
    public List<Users> getAllAdministrators() {
        return userServices.getAllAdministrators();
    }

    // Endpoint to update user email
    @PutMapping("/updateEmail/{id}")
    public ResponseEntity<?> updateEmail(@PathVariable("id") Long userId,
                                              @RequestBody EmailUpdateDTO emailUpdateDTO) {
        try {
            userServices.updateEmail(userId, emailUpdateDTO.getEmail());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Endpoint to update username
    @PutMapping("/updateUsername/{id}")
    public ResponseEntity<?> updateUsername(@PathVariable("id") Long userId,
                               @RequestBody UsernameUpdateDTO usernameUpdateDTO) {
        try {
            userServices.updateUserName(userId, usernameUpdateDTO.getFirstname(), usernameUpdateDTO.getLastname());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}