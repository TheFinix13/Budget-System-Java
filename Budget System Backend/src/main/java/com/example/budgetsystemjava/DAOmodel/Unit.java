package com.example.budgetsystemjava.DAOmodel;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "unit")
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long unit_id;
    private String name;
    private String code;
    private String description;
    private LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id")
    private Department department;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "unit")
    private List<Budget> budgets;

    @OneToMany
    private List<Expenditure> expenditures;

}
