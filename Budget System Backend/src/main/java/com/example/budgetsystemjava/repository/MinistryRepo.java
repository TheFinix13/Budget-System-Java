package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Ministry;
import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.MinistryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MinistryRepo extends JpaRepository<Ministry, Long> {
    Optional<Object> findByName(String ministryName);

    @Query("SELECT m FROM Ministry m")
    List<Ministry> getMinistryData();

}
