package com.example.budgetsystemjava.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private long userId;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private String status;

}


