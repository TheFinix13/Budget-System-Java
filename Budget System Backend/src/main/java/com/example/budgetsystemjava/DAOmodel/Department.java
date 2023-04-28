package com.example.budgetsystemjava.DAOmodel;

import javax.persistence.*;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long department_id;
    @Column(unique = true)
    private String name;
    @NotNull
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date created_at;

    @ManyToOne
    @JoinColumn(name = "ministry_id", referencedColumnName = "ministry_id")
    private Ministry ministry;

    @OneToMany
    private List<Unit> units;

    @OneToMany(mappedBy = "department")
    private List<Budget> budgets;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "department")
    private List<Expenditure> expenditures;

}