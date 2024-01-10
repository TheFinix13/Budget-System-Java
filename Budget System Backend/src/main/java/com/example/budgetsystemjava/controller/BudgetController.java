package com.example.budgetsystemjava.controller;

import com.example.budgetsystemjava.DTO.BudgetDTO;
import com.example.budgetsystemjava.services.BudgetServices;
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
        List<BudgetDTO> pendingRequests = budgetServices.getAllPendingRequests();
        return ResponseEntity.ok(pendingRequests);
    }

    @GetMapping(path = "/get_pending_requests_by_ministry/{ministryId}")
    public ResponseEntity<List<BudgetDTO>> getPendingRequests(@PathVariable Long ministryId) {
        List<BudgetDTO> handledRequests = budgetServices.getPendingRequestsByMinistry(ministryId);
        return ResponseEntity.ok(handledRequests);
    }

    @PutMapping(path = "/approve_requests/{requestId}")
    public ResponseEntity<?> approveBudget(@PathVariable Long requestId) {
        return budgetServices.approveBudget(requestId);
    }

    @PutMapping(path = "/reject_requests/{requestId}")
    public ResponseEntity<?> denyBudget(@PathVariable Long requestId) {
        return budgetServices.denyBudget(requestId);
    }

    @GetMapping(path = "/get_all_handled_requests")
    public ResponseEntity<List<BudgetDTO>> getHandledRequests() {
        List<BudgetDTO> pendingRequests = budgetServices.getAllHandledRequests();
        return ResponseEntity.ok(pendingRequests);
    }

    @GetMapping(path = "/get_handled_requests_by_ministry/{ministryId}")
    public ResponseEntity<List<BudgetDTO>> getHandledRequests(@PathVariable Long ministryId) {
        List<BudgetDTO> handledRequests = budgetServices.getHandledRequestsByMinistry(ministryId);
        return ResponseEntity.ok(handledRequests);
    }



}
