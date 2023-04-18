package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.services.DepartmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/department")
public class DepartmentController {
    private DepartmentServices departmentService;

    @Autowired
    public DepartmentController(DepartmentServices departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping(path = "/get_all_departments")
    public ResponseEntity<?> getAllDepartments() {
        try {
            List<Department> departments = departmentService.getAllDepartments();
            if(departments.isEmpty()){
                return ResponseEntity.badRequest()
                        .body("No department Found");
            }
            return ResponseEntity.ok()
                    .body(departments);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch departments");
        }
    }

}


