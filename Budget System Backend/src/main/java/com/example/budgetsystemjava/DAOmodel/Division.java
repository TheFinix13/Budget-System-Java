package com.example.budgetsystemjava.DAOmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "division")
public class Division {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long divisionId;
    private String name;
    private String code;
    private String description;
    private LocalDateTime created_at;
    @ManyToOne
    @JoinColumn(name = "departmentId", referencedColumnName = "departmentId")
    private Department department;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "division")
    private List<Budget> budgets;
    @OneToMany
    private List<Expenditure> expenditures;

}
