package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DTO.DepartmentDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.repository.DepartmentRepo;
import com.example.budgetsystemjava.repository.MinistryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DepartmentServices {
    private final DepartmentRepo departmentRepo;
    private final MinistryRepo ministryRepo;

    @Autowired
    public DepartmentServices(DepartmentRepo departmentRepo, MinistryRepo ministryRepo) {
        this.departmentRepo = departmentRepo;
        this.ministryRepo = ministryRepo;
    }

    public Department addDepartment(Department department, Long ministryId) throws MinistryNotFoundException {
        Ministry ministry = ministryRepo.findById(ministryId)
                .orElseThrow(() -> new MinistryNotFoundException("Ministry with id " + ministryId + " was not found"));
        department.setMinistry(ministry);

//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        LocalDateTime localDate = LocalDateTime.now();
//        String Date = localDate.format(dtf);

        department.setCreated_at(LocalDateTime.now()); //set the date the department was created

        return departmentRepo.save(department);
    }

    public List<DepartmentDTO> getDepartmentsInAMinistry(Long ministryId) {
        List<Department> departments = departmentRepo.getDepartmentDataByMinistryId(ministryId);

        return departments.stream()
                .map(department -> DepartmentDTO.builder()
                        .name(department.getName())
                        .description(department.getDescription())
                        .build(
                        )).collect(Collectors.toList());
    }


    public List<DepartmentDTO> getAllDepartments() {
        List<Map<String, String>> data = departmentRepo.findAllDepartments();

        List<DepartmentDTO> allDepartments = new ArrayList<>();
        for (Map<String, String> map : data) {
            DepartmentDTO departmentDTO = new DepartmentDTO();
            departmentDTO.setName(map.get("departmentName"));
            departmentDTO.setDescription(map.get("description"));
            departmentDTO.setMinistryName(map.get("ministryName"));
            allDepartments.add(departmentDTO);
        }
        return allDepartments;
    }


}
