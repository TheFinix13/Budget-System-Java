package com.example.budgetsystemjava.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BudgetDTO {
    private long budget_id;
    private String narration;
    private double amount;
    private String status;
    private LocalDateTime created_at;
    private long division_id;
    private String divisionName;
    private String divisionCode;
    private long department_id;
    private String departmentName;
    private long ministry_id;
    private String ministryName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Long getDivision_id() {
        return division_id != 0 ? division_id : null;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Long getDepartment_id() {
        return department_id != 0 ? department_id : null;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Long getMinistry_id() {
        return ministry_id != 0 ? ministry_id : null;
    }
}
