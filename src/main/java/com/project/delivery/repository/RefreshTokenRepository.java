package com.project.delivery.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.delivery.entity.RefreshToken;
import com.project.delivery.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
    
    Optional<RefreshToken> findByUser(User user);
}
