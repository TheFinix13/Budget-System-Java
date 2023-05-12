package com.example.budgetsystemjava.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DepartmentDTO {
    private String name;
    private String description;
    private LocalDateTime created_at;
    private String ministryName;
//    private List<DivisionDTO> divisions;

}
