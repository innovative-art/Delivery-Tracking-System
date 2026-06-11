package com.project.delivery.controller;

import com.project.delivery.entity.Order;
import com.project.delivery.entity.Role;
import com.project.delivery.entity.User;

import com.project.delivery.repository.UserRepository;

import com.project.delivery.service.OrderService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService service;

    private final UserRepository userRepository;

    public OrderController(
            OrderService service,
            UserRepository userRepository
    ) {

        this.service = service;
        this.userRepository = userRepository;
    }

    // CUSTOMER → CREATE ORDER

    @PostMapping("/customer/orders")
    public Order createOrder(
    		//Receives JSON request from frontend.
            @RequestBody Order order
    ) {

        return service.createOrder(order);
    }

    // CUSTOMER → GET THEIR ORDERS

    @GetMapping("/customer/orders")
    public List<Order> getUserOrders() {

        return service.getUserOrders();
    }

    // CUSTOMER → TRACK SINGLE ORDER

    @GetMapping("/customer/order/{id}")
    public Order getOrder(
            @PathVariable Long id
    ) {

        return service.getOrder(id);
    }

    // ADMIN → VIEW ALL ORDERS

    @GetMapping("/admin/orders")
    public List<Order> getAllOrders() {

        return service.getAllOrders();
    }

    // ADMIN → GET ALL AGENTS

    @GetMapping("/admin/agents")
    public List<User> getAllAgents() {

        return userRepository.findByRole(
                Role.AGENT
        );
    }
}