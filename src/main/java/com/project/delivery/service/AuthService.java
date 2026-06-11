package com.project.delivery.service;

import com.project.delivery.dto.AuthRequest;
import com.project.delivery.dto.AuthResponse;
import com.project.delivery.dto.RegisterRequest;
import com.project.delivery.entity.RefreshToken;
import com.project.delivery.entity.Role;
import com.project.delivery.entity.User;
import com.project.delivery.repository.RefreshTokenRepository;
import com.project.delivery.repository.UserRepository;
import com.project.delivery.security.JwtUtil;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	private final RefreshTokenRepository refreshTokenRepository;
    
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            
            RefreshTokenRepository refreshTokenRepository,
            JwtUtil jwtUtil) {

this.userRepository = userRepository;
this.passwordEncoder = passwordEncoder;
this.refreshTokenRepository = refreshTokenRepository;
this.jwtUtil = jwtUtil;
}

    // REGISTER
    public String register(RegisterRequest request) {

    	//Copies name from frontend request.
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        
        

        // encrypt password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        //Duplicate Email check
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";  // or throw custom exception
        }
        
        // convert string → enum
        String role = request.getRole().toUpperCase();

        if (!role.equals("CUSTOMER") &&
            !role.equals("ADMIN") &&
            !role.equals("AGENT")) {
            throw new RuntimeException("Invalid role");
        }

        //String to enum conversion
        user.setRole(Role.valueOf(role));
        
        if (user.getName() == null || user.getName().isBlank()) {
            throw new RuntimeException("Name is required");
        }

        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new RuntimeException("Password is required");
        }

        if (user.getRole() == null) {
            throw new RuntimeException("Role is required");
        }

        userRepository.save(user);
        
        System.out.println("REGISTERING USER:");
        System.out.println(request.getName());
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());
        System.out.println(request.getRole());

        return "User registered successfully";
    }

    // LOGIN
    public AuthResponse login(AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        
        // 1. Generate ACCESS TOKEN (short life)
        String accessToken = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        // 2. Generate REFRESH TOKEN (long life)
        String refreshToken = UUID.randomUUID().toString();

        
        
        RefreshToken tokenEntity = refreshTokenRepository.findByUser(user)
                .orElseGet(() -> {
                    RefreshToken t = new RefreshToken();
                    t.setUser(user);
                    return t;
                });

        tokenEntity.setToken(refreshToken);
        tokenEntity.setExpiryDate(LocalDateTime.now().plusDays(7));

        refreshTokenRepository.save(tokenEntity);
        
        // 3. Return BOTH tokens
        return new AuthResponse(
                accessToken,
                refreshToken,
                user.getRole().name()
        );
    }
    
    public AuthResponse refreshToken(String refreshToken) {

        RefreshToken tokenEntity = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (tokenEntity.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(tokenEntity);
            throw new RuntimeException("Refresh token expired");
        }

        User user = tokenEntity.getUser();

        String newAccessToken =
                jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponse(
                newAccessToken,
                refreshToken,
                user.getRole().name()
        );
    }
    
    public void logout(String refreshToken) {

        RefreshToken tokenEntity = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        refreshTokenRepository.delete(tokenEntity);
    }
}
