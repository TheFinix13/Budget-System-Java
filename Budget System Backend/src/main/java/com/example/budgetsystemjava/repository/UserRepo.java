package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("userRepository")
public interface UserRepo extends JpaRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

}
