package com.project.delivery.controller;

import com.project.delivery.dto.AuthRequest;
import jakarta.validation.Valid;
import com.project.delivery.dto.AuthResponse;
import com.project.delivery.dto.RefreshRequest;
import com.project.delivery.dto.RegisterRequest;
import com.project.delivery.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // REGISTER API
    @PostMapping("auth/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    // LOGIN API
    @PostMapping("auth/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }
    
    @PostMapping("/auth/refresh")
    public AuthResponse refresh(@RequestBody RefreshRequest request) {
        return authService.refreshToken(request.getRefreshToken());
    }

    @PostMapping("/auth/logout")
    public String logout(@RequestBody RefreshRequest request) {
        authService.logout(request.getRefreshToken());
        return "Logged out successfully";
    }
}
