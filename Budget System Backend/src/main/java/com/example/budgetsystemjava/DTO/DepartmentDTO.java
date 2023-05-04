package com.example.budgetsystemjava.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DepartmentDTO {
    private String name;
    private String description;
    private LocalDateTime created_at;
    private String ministryName;

}
