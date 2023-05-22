package com.example.budgetsystemjava.config;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtLoginRequest {
    private String email;
    private String password;

}


