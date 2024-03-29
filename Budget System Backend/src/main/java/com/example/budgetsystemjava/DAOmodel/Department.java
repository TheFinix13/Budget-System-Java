package com.example.budgetsystemjava.DAOmodel;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long departmentId;
    @Column(unique = true)
    private String name;
    @NotNull
    private String code;
    @NotNull
    private String description;
    @Column(updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "ministryId", referencedColumnName = "ministryId")
    private Ministry ministry;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Division> divisions;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Budget> budgets;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "department")
    private List<Expenditure> expenditures;

}
