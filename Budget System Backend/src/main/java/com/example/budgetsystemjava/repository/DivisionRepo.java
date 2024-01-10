package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("divisionRepository")
public interface DivisionRepo extends JpaRepository<Division, Long> {
    @Query("SELECT d FROM Division d JOIN d.department p WHERE p.departmentId = :departmentId")
    List<Division> findByDepartmentId(@Param("departmentId") Long departmentId);

    @Query("SELECT COUNT(d) FROM Division d JOIN d.department de WHERE de.departmentId = :departmentId")
    int countDivisionsByDepartmentId(long departmentId);

    @Query("SELECT COUNT(d) FROM Division d  WHERE d.department.ministry.ministryId = :ministryId")
    int countDivisionsByMinistryId(long ministryId);

    List<Division> findByDepartment(Department department);
}
