package com.example.budgetsystemjava.DAOmodel;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ministry")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Ministry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ministry_id;

    private String name;
    private String description;
    private String location;
    private String sector;
    @Transient
    private String firstname;
    @Transient
    private String lastname;
    @Transient
    private String email;
    @Transient
    private String password;
    @Transient
    private String role;
    @Transient
    private String status;
    @OneToMany
    private List<Department> departments;


}
