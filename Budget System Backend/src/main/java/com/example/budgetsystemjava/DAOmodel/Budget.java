package com.example.budgetsystemjava.DAOmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "budget")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long budgetId;
    private String narration;
    private double amount;
    private String status;
    private LocalDateTime created_at;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "departmentId")
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "divisionId")
    private Division division;

    @ManyToOne
    @JoinColumn(name = "ministryId")
    private Ministry ministry;

    @ManyToOne
    @JoinColumn(name = "termId")
    private Term term;

}
