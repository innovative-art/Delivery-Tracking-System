package com.project.delivery.controller;


import com.project.delivery.dto.AssignRequest;
import com.project.delivery.entity.OrderAssignment;
import com.project.delivery.service.AssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AssignmentController {

    private final AssignmentService service;

    public AssignmentController(AssignmentService service) {
        this.service = service;
    }

    // ADMIN → ASSIGN ORDER
    @PostMapping("/admin/assign")
    public OrderAssignment assign(@RequestBody AssignRequest request) {
        return service.assignOrder(request);
    }

    // AGENT → VIEW ASSIGNED ORDERS (JWT-READY CHANGE)
    @GetMapping("/agent/orders")
    public List<OrderAssignment> getAgentOrders() {
        return service.getOrdersForAgent();
    }
}