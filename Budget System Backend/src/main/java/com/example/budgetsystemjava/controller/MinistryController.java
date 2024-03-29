package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DTO.DivisionDTO;
import com.example.budgetsystemjava.DTO.MinistryDTO;
import com.example.budgetsystemjava.responses.AddMinistryResponse;
import com.example.budgetsystemjava.services.MinistryServices;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*",
        "http://localhost:3000/"}
)
@RestController
@RequestMapping(path = "api/ministry")
public class MinistryController {
    private final MinistryServices ministryServices;
    @Autowired
    public MinistryController(MinistryServices ministryServices) {
        this.ministryServices = ministryServices;
    }

    @GetMapping(path = "get_ministry")
    public List<MinistryDTO> getMinistry() {
        return ministryServices.getMinistries();
    }

    @PostMapping(path = "add_ministry")
    public ResponseEntity<AddMinistryResponse> addMinistry(@RequestBody MinistryDTO ministry) {
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

    @GetMapping(path = "get_one_ministry/{id}")
    public ResponseEntity<MinistryDTO> showAMinistry(@PathVariable Long id) {
        MinistryDTO ministry = ministryServices.showAMinistry(id);
        return ResponseEntity.ok(ministry);
    }

    @GetMapping(path = "get_divisions_in_ministry/{id}")
    public ResponseEntity<List<DivisionDTO>> getAllDivisionsInMinistry(@PathVariable Long id) {
        List<DivisionDTO> divisions = ministryServices.getAllDivisionsInMinistry(id);

        if (divisions == null) {
            return ResponseEntity.noContent()
                    .build();
        }

        return ResponseEntity.ok(divisions);
    }

    @GetMapping(path = "/get_ministry_from_admin/{adminId}")
    public ResponseEntity<MinistryDTO> getMinistryForAdmin(@PathVariable Long adminId) {
        MinistryDTO ministry = ministryServices.getMinistryForAdmin(adminId);
        return ResponseEntity.ok(ministry);
    }


}
