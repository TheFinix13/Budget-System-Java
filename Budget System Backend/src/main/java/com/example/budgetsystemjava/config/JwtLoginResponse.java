package com.example.budgetsystemjava.config;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtLoginResponse {
    private String token;

}
