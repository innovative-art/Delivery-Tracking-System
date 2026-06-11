package com.project.delivery.service;

import com.project.delivery.dto.AssignRequest;
import com.project.delivery.entity.*;
import com.project.delivery.repository.*;
import com.project.delivery.entity.Role;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    private final OrderAssignmentRepository assignmentRepo;
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public AssignmentService(OrderAssignmentRepository assignmentRepo,
                             OrderRepository orderRepo,
                             UserRepository userRepo) {
        this.assignmentRepo = assignmentRepo;
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    // ADMIN → ASSIGN ORDER (NO CHANGE IN LOGIC, JUST SECURITY CLEANUP OPTIONAL)
    public OrderAssignment assignOrder(AssignRequest request) {

        Order order = orderRepo.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        User agent = userRepo.findById(request.getAgentId())
                .filter(u -> u.getRole() == Role.AGENT)
                .orElseThrow(() -> new RuntimeException("Valid AGENT not found"));

        // 🔥 FORCE RELATION
        order.setAgent(agent);
        order.setStatus(OrderStatus.ASSIGNED);

        Order savedOrder = orderRepo.save(order); // IMPORTANT

        OrderAssignment assignment = new OrderAssignment();
        assignment.setOrder(savedOrder);
        assignment.setAgent(agent);
        assignment.setStatus(AssignmentStatus.ASSIGNED);

        return assignmentRepo.save(assignment);
    }

    // GET BY ORDER (UNCHANGED)
    public OrderAssignment getByOrder(Long orderId) {
        return assignmentRepo.findByOrderId(orderId);
    }

    // AGENT → GET ASSIGNED ORDERS (JWT UPDATED)
    public List<OrderAssignment> getOrdersForAgent() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        System.out.println("AGENT EMAIL: " + email);

        if (email.equals("anonymousUser")) {
            throw new RuntimeException("No JWT token provided");
        }

        User agent = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        return assignmentRepo.findByAgentId(agent.getId());
    }
}