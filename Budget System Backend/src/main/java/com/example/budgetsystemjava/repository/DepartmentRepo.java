package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Long> {
//    List<Department> findByMinistryId(Long ministryId);

}
