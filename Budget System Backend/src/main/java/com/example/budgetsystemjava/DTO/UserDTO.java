package com.example.budgetsystemjava.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private String firstname;
    private String lastname;
    private String email;
    private String password;

}


