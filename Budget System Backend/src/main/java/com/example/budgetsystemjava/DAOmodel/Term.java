package com.example.budgetsystemjava.DAOmodel;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@Table(name = "term")
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long termId;
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
