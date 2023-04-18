package com.example.budgetsystemjava.services;

import com.example.budgetsystemjava.DAOmodel.Users;
import com.example.budgetsystemjava.DTO.UserDTO;
import com.example.budgetsystemjava.config.JwtUtils;
import com.example.budgetsystemjava.repository.UserRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServices implements UserDetailsService {
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    //Constructor
    @Autowired
    public UserServices(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    //Add User to Database
    public Users addUser(Users user) {
        Users newUser = new Users();
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole("admin");
        newUser.setStatus("active");
        BeanUtils.copyProperties(user, newUser);

        return userRepo.save(newUser);
    }

//    Authenticate User
    public String authenticateUser(String email, String password) {
        Optional<Users> user = userRepo.findByEmail(email);

        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        Users existingUser = user.get();

        if (!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new UsernameNotFoundException("Password is incorrect");
        }
        return jwtUtils.generateToken(existingUser.getUser_id());

    }


    @Override
    public UserDetails loadUserByUsername(String role) throws UsernameNotFoundException {
        List<SimpleGrantedAuthority> roles = null;
        if (role.equals("admin")) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
            return new User("admin", "admin", roles);
        } else if (role.equals("user")) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
            return new User("user", "user", roles);
        } else {
            throw new UsernameNotFoundException("User not found with role: " + role);
        }
    }


    public Users getLoggedInUser(String token) {
        Long userId = jwtUtils.getUserIdFromToken(token);
        Optional<Users> user = userRepo.findById(userId);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with id: " + userId);
        }
        return user.get();
    }

    public List<Users> getAllUsers(String token) {
        Long userId = jwtUtils.getUserIdFromToken(token);
        Optional<Users> user = userRepo.findById(userId);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with id: " + userId);
        }
        return userRepo.findAll();
    }

    public List<Users> getAllUsers() {
        List<Users> user = userRepo.findAll();

        List<Users> loggedUser = user
                .stream()
                .map(u -> {
                    Users newU = new Users();
                    newU.setFirstname(u.getFirstname());
                    newU.setLastname(u.getLastname());
                    newU.setEmail(u.getEmail());
                    newU.setRole(u.getRole());
                    newU.setStatus(u.getStatus());
                    return newU;
                }).collect(Collectors.toList());

        return loggedUser;

    }

}
