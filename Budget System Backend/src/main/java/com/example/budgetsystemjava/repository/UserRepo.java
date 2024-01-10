package com.example.budgetsystemjava.repository;

import com.example.budgetsystemjava.DAOmodel.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("userRepository")
public interface UserRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);

    Optional<Users> findUsersByUserId(long adminId);

    Optional<Users> findByUserIdAndRole(long id, String user);

    List<Users> findAllByRole(String role);

    Optional<Users> findByMinistryID(long ministryId);
}
