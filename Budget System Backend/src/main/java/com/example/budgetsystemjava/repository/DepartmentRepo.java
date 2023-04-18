package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepo extends JpaRepository<Department, Long> {

}
