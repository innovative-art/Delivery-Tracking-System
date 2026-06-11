package com.project.delivery.repository;

import com.project.delivery.entity.OrderTracking;
import com.project.delivery.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderTrackingRepository extends JpaRepository<OrderTracking, Long> {

    List<OrderTracking> findByOrderOrderByUpdatedAtAsc(Order order);
}
