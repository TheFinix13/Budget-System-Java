package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DTO.DepartmentDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.services.DepartmentServices;
import org.modelmapper.ModelMapper;
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
    private ModelMapper modelMapper;

    @Autowired
    public DepartmentController(DepartmentServices departmentService, ModelMapper modelMapper) {
        this.departmentService = departmentService;
        this.modelMapper = modelMapper;
    }

    @PostMapping(path = "/add_department/{ministryId}")
    public ResponseEntity<?> addDepartment(@RequestBody DepartmentDTO departmentDTO,
                                           @PathVariable Long ministryId) throws MinistryNotFoundException {
        try {
            Department department = modelMapper.map(departmentDTO, Department.class);
            Department newDepartment = departmentService.addDepartment(department, ministryId);
            DepartmentDTO savedDepartment = modelMapper.map(newDepartment, DepartmentDTO.class);

            return ResponseEntity.ok(savedDepartment);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add department");
        }
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


