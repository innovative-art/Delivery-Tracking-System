package com.project.delivery.repository;

import com.project.delivery.entity.OrderAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderAssignmentRepository extends JpaRepository<OrderAssignment, Long> {

    List<OrderAssignment> findByAgentId(Long agentId);

    OrderAssignment findByOrderId(Long orderId);
}
