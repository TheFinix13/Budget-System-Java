package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.exceptions.MinistryNotFoundException;
import com.example.budgetsystemjava.repository.DepartmentRepo;
import com.example.budgetsystemjava.repository.MinistryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServices {
    private DepartmentRepo departmentRepo;
    private MinistryRepo ministryRepo;
    @Autowired
    public DepartmentServices(DepartmentRepo departmentRepo, MinistryRepo ministryRepo) {
        this.departmentRepo = departmentRepo;
        this.ministryRepo = ministryRepo;
    }

    public Department addDepartment(Department department, Long ministryId) throws MinistryNotFoundException {
        Ministry ministry = ministryRepo.findById(ministryId)
                .orElseThrow(() -> new MinistryNotFoundException("Ministry with id " + ministryId + " was not found"));
        department.setMinistry(ministry);
        return departmentRepo.save(department);
    }

    public List<Department> getAllDepartments(){
        return departmentRepo.findAll(Sort.by(Sort.Direction.ASC, "departmentName"));
    };





}
