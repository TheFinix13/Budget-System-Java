package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Budget;
import com.example.budgetsystemjava.DAOmodel.Department;
import com.example.budgetsystemjava.DAOmodel.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepo extends JpaRepository<Budget, Long> {

    List<Budget> findByDivision(Division division);

    @Query("SELECT b FROM Budget b WHERE b.status = 'Created'")
    List<Budget> findByStatus(String status);

    @Query("SELECT b FROM Budget b WHERE b.status = 'Created'")
    List<Budget> findByStatusAndMinistryId(String status, Long ministryId);

    @Query("SELECT b FROM Budget b WHERE b.status != 'Created'")
    List<Budget> findHandledRequests();

    @Query("SELECT b FROM Budget b WHERE b.ministry.ministryId = :ministryId AND b.status != 'Created'")
    List<Budget> findHandledRequestsByMinistryId(@Param("ministryId") Long ministryId);

    List<Budget> findByDepartment(Department department);

    int countBudgetRequestsByDivision(Division division);

    @Query("SELECT COUNT(br) FROM Budget br WHERE br.division.divisionId = :divisionId")
    int countBudgetRequestsByDivisionId(Long divisionId);

    @Query("SELECT SUM(br.amount) FROM Budget br WHERE br.division.divisionId = :divisionId")
    Double sumBudgetAmountByDivisionId(Long divisionId);


}
