package com.project.delivery.service;

import com.project.delivery.entity.*;
import com.project.delivery.repository.OrderRepository;
import com.project.delivery.repository.OrderTrackingRepository;
import com.project.delivery.repository.UserRepository;
import com.project.delivery.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;
    private final OrderTrackingRepository trackingRepo;

    public OrderService(OrderRepository orderRepo,
                        UserRepository userRepo,
                        JwtUtil jwtUtil,
                        HttpServletRequest request, OrderTrackingRepository trackingRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
        this.request = request;
        this.trackingRepo = trackingRepo;
    }

    // CREATE ORDER (JWT BASED USER)
//    public Order createOrder(Order order, Long userId) {
//
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//
//        System.out.println("EMAIL FROM JWT: " + email);
//        
//        User user = userRepo.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        order.setUser(user);
//        order.setStatus(OrderStatus.PLACED);
//        order.setCreatedAt(LocalDateTime.now());
//
//        return orderRepo.save(order);
//    }
    
    
    
    
    
    public Order createOrder(Order order) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid token");
        }

        String token = authHeader.substring(7);

        String email = jwtUtil.extractEmail(token);

        if (email == null || email.isEmpty()) {
            throw new RuntimeException("Invalid token payload");
        }

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        order.setUser(user);

        order.setStatus(OrderStatus.PLACED);

        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        Order savedOrder = orderRepo.save(order);
        
     // ADD THIS
        OrderTracking tracking = new OrderTracking();
        tracking.setOrder(savedOrder);
        tracking.setStatus(OrderStatus.PLACED);
        tracking.setLocation("Order Created");
        tracking.setUpdatedAt(LocalDateTime.now());

        trackingRepo.save(tracking);

        return savedOrder;
    }
    
    
    
    
    
    
    

    // GET USER ORDERS (JWT BASED)
    public List<Order> getUserOrders() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        
        if (email.equals("anonymousUser")) {
            throw new RuntimeException("No JWT token provided");
        }

        System.out.println("GET ORDERS EMAIL: " + email); // debug

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        return orderRepo.findByUserId(user.getId());
    }

    // GET ORDER BY ID (UNCHANGED)
    public Order getOrder(Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // ADMIN VIEW ALL (UNCHANGED)
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}