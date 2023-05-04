package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DTO.MinistryDTO;
import com.example.budgetsystemjava.services.MinistryServices;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/ministry")
public class MinistryController {
    private final MinistryServices ministryServices;
    @Autowired
    public MinistryController(MinistryServices ministryServices) {
        this.ministryServices = ministryServices;
    }

    @GetMapping(path = "get_ministry")
    public List<Ministry> getMinistry() {
        return ministryServices.getMinistries();
    }

    @PostMapping(path = "add_ministry")
    public ResponseEntity<?> addMinistry(@RequestBody MinistryDTO ministry) {
        return ministryServices.addMinistry(ministry);
    }

    @PutMapping(path = "update_ministry/{id}")
    public ResponseEntity<Ministry> updateMinistry(@PathVariable("id") Long id,
                                                   @RequestBody MinistryDTO ministryDTO) throws NotFoundException {
        Ministry ministry = ministryServices.updateMinistry(id, ministryDTO);
        return ResponseEntity.ok(ministry);
    }

    @DeleteMapping(path = "delete_ministry/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMinistry(@PathVariable Long id) {
        boolean deleted;
        deleted = ministryServices.deleteMinistry(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }


//    @GetMapping(path = "show_all_ministry")
//    public List<Ministry> showAllMinistry() {
//        return ministryServices.showAllMinistry().getBody();
//    }

//
//    @GetMapping(path = "show_department_count")
//    public List<Ministry> showDepartmentCount() {
//        return ministryServices.showDepartmentCount();
//    }
//
//    @GetMapping(path = "ministry_department_count")
//    public List<Ministry> ministryDepartmentCount() {
//        return ministryServices.ministryDepartmentCount();
//    }
}
