package com.example.budgetsystemjava.exceptions;

public class MinistryNotFoundException extends RuntimeException {

    public MinistryNotFoundException(String message) {
        super(message);
    }
}