package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServices {

    public List<Department> getAllDepartments(){
        return departmentRepo.findAll(Sort.by(Sort.Direction.ASC, "departmentName"));
    };
    private DepartmentRepo departmentRepo;

//    @Autowired
//    public DepartmentServices(DepartmentRepo departmentRepo) {
//        this.departmentRepo = departmentRepo;
//    }

}
