package com.example.budgetsystemjava.DTO;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MinistryData {
    private Ministry ministry;
    private int departmentCount;
    private int unitCount;
}
