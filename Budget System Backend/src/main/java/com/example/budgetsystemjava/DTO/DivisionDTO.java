package com.example.budgetsystemjava.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DivisionDTO {
    private Long id;
    private String name;
    private String code;
    private String description;
    private LocalDateTime created_at;
    private Long departmentId;
    private String departmentName;
    private Long ministryId;
    private String ministryName;
    private int budgetRequestCount;
}
