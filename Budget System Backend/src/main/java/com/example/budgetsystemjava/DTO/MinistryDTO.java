package com.example.budgetsystemjava.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
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
//    private List<DepartmentDTO> departments;
//    private int departCount;
//    private int divisionCount;


//    private UserDTO user;

}
