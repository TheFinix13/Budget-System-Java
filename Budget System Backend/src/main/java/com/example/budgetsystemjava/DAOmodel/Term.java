package com.example.budgetsystemjava.DAOmodel;

import javax.persistence.*;
import lombok.Data;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@Table(name = "term")
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long term_id;
    @NotNull
    private String name;
    @NotNull
    private int year;
    @NotNull
    private String status;

    @OneToMany(mappedBy = "term")
    private List<Budget> budgets;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "term")
//    private List<BudgetRequest> budget_requests;

    @OneToMany
    private List<Expenditure> expenditures;



}
