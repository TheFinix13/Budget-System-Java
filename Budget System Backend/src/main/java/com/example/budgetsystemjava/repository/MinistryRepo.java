package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("ministryRepository")
public interface MinistryRepo extends JpaRepository<Ministry, Long> {
    Optional<Object> findByName(String ministryName);

    @Query("SELECT m FROM Ministry m")
    List<Ministry> getMinistryData();

}
