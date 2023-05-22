package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DTO.DepartmentDTO;
import com.example.budgetsystemjava.DTO.DivisionDTO;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.repository.DepartmentRepo;
import com.example.budgetsystemjava.repository.DivisionRepo;
import com.example.budgetsystemjava.repository.MinistryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentServices {
    private final DepartmentRepo departmentRepo;
    private final MinistryRepo ministryRepo;
    private final DivisionRepo divisionRepo;

    @Autowired
    public DepartmentServices(DepartmentRepo departmentRepo, MinistryRepo ministryRepo,
                              DivisionRepo divisionRepo) {
        this.departmentRepo = departmentRepo;
        this.ministryRepo = ministryRepo;
        this.divisionRepo = divisionRepo;
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
                .map(department -> {
                    List<Division> divisions = department.getDivisions();
                    List<DivisionDTO> divisionDTOS = divisions.stream()
                            .map(division -> DivisionDTO.builder()
                                    .id(division.getDivision_id())
                                    .name(division.getName())
                                    .build())
                            .collect(Collectors.toList());

                    return DepartmentDTO.builder()
                            .id(String.valueOf(department.getDepartment_id()))
                        .name(department.getName())
                        .description(department.getDescription())
                            .divisions(divisionDTOS)
                        .build();
                }).collect(Collectors.toList());
    }


    public List<DepartmentDTO> getAllDepartments() {
        List<Map<String, String>> data = departmentRepo.findAllDepartments();

        List<DepartmentDTO> allDepartments = new ArrayList<>();
        for (Map<String, String> map : data) {
            DepartmentDTO departmentDTO = new DepartmentDTO();
            departmentDTO.setId(map.get("departmentId"));
            departmentDTO.setName(map.get("departmentName"));
            departmentDTO.setCode(map.get("departmentCode"));
            departmentDTO.setDescription(map.get("description"));
            departmentDTO.setMinistryName(map.get("ministryName"));

            Long departmentId = Long.parseLong(map.get("departmentId"));
            int divisionCount = divisionRepo.countDivisionsByDepartmentId(departmentId);
            departmentDTO.setDivisionCount(divisionCount);

            allDepartments.add(departmentDTO);
        }

        return allDepartments;
    }

    public DepartmentDTO getADepartment(Long departmentId) {
        Department department = departmentRepo.findById(departmentId)
                .orElse(null);

        Ministry ministry = department.getMinistry();

        List<Division> division = department.getDivisions();

        List<DivisionDTO> divisionDTOS = division.stream()
                .map(division1 -> DivisionDTO.builder()
                        .id(division1.getDivision_id())
                        .name(division1.getName())
                        .code(division1.getCode())
                        .build())
                .collect(Collectors.toList());

        return DepartmentDTO.builder()
                .name(department.getName())
                .code(department.getCode())
                .description(department.getDescription())
                .created_at(department.getCreated_at())
                .ministryId(ministry.getMinistry_id())
                .ministryName(ministry.getName())
                .divisions(divisionDTOS)
                .build();

    }

}
