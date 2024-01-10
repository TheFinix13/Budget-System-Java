package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DTO.DivisionDTO;
import com.example.budgetsystemjava.services.DivisionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/division")
@CrossOrigin(origins = {"*",
        "http://localhost:3000/"}
)
public class DivisionController {
    private final DivisionServices divisionService;

    @Autowired
    public DivisionController(DivisionServices divisionService) {
        this.divisionService = divisionService;
    }

    @PostMapping("/add_division/{departmentId}")
    public ResponseEntity<Object> addDivision(@RequestBody DivisionDTO divisionDto,
                                              @PathVariable Long departmentId) {
        try {
            divisionService.addDivision(departmentId, divisionDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Division added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Error(e.getMessage()));
        }
    }

    @GetMapping("/get_division_in_department/{departmentId}")
    public ResponseEntity<List<DivisionDTO>> getDivisionInDepartment(@PathVariable Long departmentId) {

        List<DivisionDTO> divisions = divisionService.getDivisionsInADepartment(departmentId);

        return new ResponseEntity<>(divisions, HttpStatus.OK);

    }

    @GetMapping("/get_all_divisions")
    public ResponseEntity<List<DivisionDTO>> getAllDivision() {

        List<DivisionDTO> divisions = divisionService.getAllDivisions();

        return new ResponseEntity<>(divisions, HttpStatus.OK);

    }


}
