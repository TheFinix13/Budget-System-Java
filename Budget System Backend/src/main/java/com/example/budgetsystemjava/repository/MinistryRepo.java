package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Division;
import com.example.budgetsystemjava.DAOmodel.Ministry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("ministryRepository")
public interface MinistryRepo extends JpaRepository<Ministry, Long> {
    Optional<Object> findByName(String ministryName);

    Optional<Ministry> findByMinistryId(long ministryId);

    @Query("SELECT m FROM Ministry m")
    List<Ministry> getMinistryData();

    @Query("SELECT dv FROM Division dv JOIN dv.department d JOIN d.ministry m WHERE m.ministryId = :ministryId")
    List<Division> findDivisions(long ministryId);

}
