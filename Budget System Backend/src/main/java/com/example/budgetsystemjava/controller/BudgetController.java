package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DTO.BudgetDTO;
import com.example.budgetsystemjava.services.BudgetServices;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "api/division_budget")
public class BudgetController {
    private final BudgetServices budgetServices;

    @Autowired
    public BudgetController(BudgetServices budgetServices) {
        this.budgetServices = budgetServices;
    }

    @PostMapping(path = "/create_budget/{divisionId}")
    public ResponseEntity<BudgetDTO> createBudget(@RequestBody BudgetDTO budgetDTO,
                                                  @PathVariable Long divisionId) throws NotFoundException {

        BudgetDTO createdBudget = budgetServices.createBudget(budgetDTO, divisionId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdBudget);
    }

    @GetMapping(path = "/get_budget_requests/{divisionId}")
    public List<BudgetDTO> getBudgetRequests(@PathVariable Long divisionId) throws NotFoundException {
        return budgetServices.getBudgetRequestsByDivision(divisionId);
    }

    @GetMapping(path = "/get_budget_requests_in_department/{departmentId}")
    public ResponseEntity<List<BudgetDTO>> getBudgetRequestsInDepartment(@PathVariable Long departmentId) {
        try {
            List<BudgetDTO> budgetRequest = budgetServices.getBudgetByDepartment(departmentId);
            return ResponseEntity.ok(budgetRequest);
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/get_budget_requests_in_ministry/{ministryId}")
    public ResponseEntity<List<BudgetDTO>> getBudgetRequestsInMinistry(@PathVariable Long ministryId) {
        try {
            List<BudgetDTO> budgetRequest = budgetServices.getBudgetRequestsByMinistry(ministryId);
            return ResponseEntity.ok(budgetRequest);
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/get_pending_requests")
    public ResponseEntity<List<BudgetDTO>> getPendingRequests() {
        List<BudgetDTO> pendingRequests = budgetServices.getPendingRequests();
        return ResponseEntity.ok(pendingRequests);
    }

    @PutMapping(path = "/approve_requests/{requestId}")
    public ResponseEntity<?> approvedRequests(@PathVariable Long requestId) {
        BudgetDTO approvedRequests = budgetServices.getById(requestId);

        if (approvedRequests == null) {
            return ResponseEntity.notFound().build();
        }
        approvedRequests.setStatus("Approved");
        budgetServices.saveStatus(approvedRequests);

        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/reject_requests/{requestId}")
    public ResponseEntity<?> rejectedRequests(@PathVariable Long requestId) {
        BudgetDTO rejectedRequests = budgetServices.getById(requestId);

        if (rejectedRequests == null) {
            return ResponseEntity.notFound().build();
        }
        rejectedRequests.setStatus("Denied");
        budgetServices.saveStatus(rejectedRequests);

        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/get_handled_requests")
    public ResponseEntity<List<BudgetDTO>> getHandledRequests() {
        List<BudgetDTO> pendingRequests = budgetServices.getHandledRequests();
        return ResponseEntity.ok(pendingRequests);
    }


}
