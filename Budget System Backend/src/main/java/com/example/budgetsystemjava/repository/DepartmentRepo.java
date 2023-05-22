package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("departmentRepository")
public interface DepartmentRepo extends JpaRepository<Department, Long> {

    @Query("SELECT CAST(d.department_id AS string) as departmentId, d.name as departmentName, d.code as departmentCode, d.description as description, m.name as ministryName FROM Department d JOIN d.ministry m")
    List<Map<String, String>> findAllDepartments();

    @Query("SELECT d FROM Department d JOIN d.ministry m WHERE m.ministry_id = :ministryId")
    List<Department> getDepartmentDataByMinistryId(@Param("ministryId") Long ministryId);

    @Query("SELECT COUNT(d) FROM Department d JOIN d.ministry m WHERE m.ministry_id = :ministryId")
    int countDepartmentsByMinistryId(@Param("ministryId") Long ministryId);

//    Optional<Department> findByIdAndMinistryId(Long departmentId, Long ministryId);
}
