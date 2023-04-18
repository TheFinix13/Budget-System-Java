package com.example.budgetsystemjava.config;

public class JwtLoginResponse {
    private final String jwt;

    public JwtLoginResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getToken() {
        return this.jwt;
    }
}
