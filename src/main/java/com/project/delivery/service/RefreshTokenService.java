package com.project.delivery.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.delivery.entity.RefreshToken;
import com.project.delivery.entity.User;
import com.project.delivery.repository.RefreshTokenRepository;

@Service
public class RefreshTokenService {

    @Value("${jwt.refresh.expiration}")
    private Long refreshExpiration;

    @Autowired
    private RefreshTokenRepository repo;

    public RefreshToken createToken(User user) {
        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(LocalDateTime.now().plusDays(7));

        return repo.save(token);
    }

    public RefreshToken verifyToken(String token) {
        RefreshToken rt = repo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (rt.getExpiryDate().isBefore(LocalDateTime.now())) {
            repo.delete(rt);
            throw new RuntimeException("Refresh token expired");
        }

        return rt;
    }
}
