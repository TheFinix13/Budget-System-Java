package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Budget;
import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepo extends JpaRepository<Budget, Long> {

    List<Budget> findByDivision(Division division);

    @Query("SELECT b FROM Budget b WHERE b.status = 'Created'")
    List<Budget> findByStatus(String status);

    @Query("SELECT b FROM Budget b WHERE b.status != 'Created'")
    List<Budget> findHandledRequests();

    List<Budget> findByDepartment(Department department);

    int countBudgetRequestsByDivision(Division division);
}
//    @Query("SELECT b FROM Budget b " +
//            "JOIN b.division d " +
//            "JOIN d.department de " +
//            "JOIN de.ministry m " +
//            "WHERE m.ministry_id = :ministryId")
//    List<BudgetDTO> findAllByMinistryId(Long ministryId);

//    @Query(nativeQuery = true, value =
//            "SELECT " +
//                    "    b.budget_id AS budget_id, " +
//                    "    b.narration AS narration, " +
//                    "    b.amount AS amount, " +
//                    "    b.status AS status, " +
//                    "    b.created_at AS created_at, " +
//                    "    b.division_id AS division_id, " +
//                    "    d.name AS divisionName, " +
//                    "    d.code AS divisionCode, " +
//                    "
//                    dep.department_id AS department_id, " +
//                    "    dep.name AS departmentName, " +
//                    "    m.ministry_id AS ministry_id, " +
//                    "    m.name AS ministryName " +
//                    "FROM " +
//                    "    budget b " +
//                    "    JOIN division d ON b.division_id = d.division_id " +
//                    "    JOIN department dep ON b.department_id = dep.department_id " +
//                    "    JOIN ministry m ON dep.ministry_id = m.ministry_id " +
//                    "WHERE " +
//                    "    m.ministry_id = :ministryId")
//    List<BudgetDTO> findAllInMinistry(@Param("ministryId") Long ministryId);

