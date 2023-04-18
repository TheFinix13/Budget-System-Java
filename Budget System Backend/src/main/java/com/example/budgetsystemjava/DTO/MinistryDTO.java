package com.example.budgetsystemjava.DTO;

import com.example.budgetsystemjava.DAOmodel.BudgetRequest;
import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Users;
import lombok.*;

import javax.persistence.Transient;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class MinistryDTO {
    private String name;
    private String description;
    private String location;
    private String sector;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private String status;


//    private UserDTO user;

}
