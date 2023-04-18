package com.example.budgetsystemjava.DAOmodel;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "budget_request")
public class BudgetRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private float total_amount;
    private String description;
    private String status;
    private LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "ministry_id", referencedColumnName = "ministry_id")
    private Ministry ministry;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "term_id")
    private Term term;

    @OneToMany(mappedBy = "budgetRequest")
    private List<Expenditure> expenditures;
}
