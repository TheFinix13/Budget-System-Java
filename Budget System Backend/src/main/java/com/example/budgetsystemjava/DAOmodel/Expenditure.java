package com.example.budgetsystemjava.DAOmodel;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "expenditure")
public class Expenditure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long expenditure_id;
    @NotNull
    private float amount;
    @NotNull
    private LocalDateTime date;
    @NotNull
    private String description;
    @NotNull
    private LocalDateTime created_at;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "division_id", referencedColumnName = "division_id")
    private Division division;

    @ManyToOne
    @JoinColumn(name = "term_id", referencedColumnName = "term_id")
    private Term term;

    @ManyToOne
    @JoinColumn(name = "budget_request_id")
    private BudgetRequest budgetRequest;
}
