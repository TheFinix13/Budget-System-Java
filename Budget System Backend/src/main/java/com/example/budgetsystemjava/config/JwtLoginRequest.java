package com.example.budgetsystemjava.config;

public class JwtLoginRequest {
    private String email;
    private String password;

    public JwtLoginRequest() {

    }

    public JwtLoginRequest(String email, String password) {
        this.setEmail(email);
        this.setPassword(password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
