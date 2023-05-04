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
    private final DepartmentServices departmentService;
    private final ModelMapper modelMapper;

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
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add department");
        }
    }

    @GetMapping(path = "/get_department_in_ministry/{ministry_id}")
    public ResponseEntity<List<DepartmentDTO>> getDepartmentInMinistry(@PathVariable Long ministry_id) {
        List<DepartmentDTO> departments = departmentService.getDepartmentsInAMinistry(ministry_id);
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    @GetMapping(path = "/get_all_departments")
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {
        List<DepartmentDTO> departments = departmentService.getAllDepartments();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

}


