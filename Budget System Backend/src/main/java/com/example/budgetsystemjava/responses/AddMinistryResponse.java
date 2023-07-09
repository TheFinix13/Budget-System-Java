package com.example.budgetsystemjava.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor

public class AddMinistryResponse {
    private Long ministryId;
    private String ResponseMessage;
}
