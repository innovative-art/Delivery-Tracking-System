package com.project.delivery.service;

import com.project.delivery.entity.*;
import com.project.delivery.repository.*;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.project.delivery.entity.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrackingService {

    private final OrderTrackingRepository trackingRepo;
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public TrackingService(OrderTrackingRepository trackingRepo, OrderRepository orderRepo, UserRepository userRepo) {
        this.trackingRepo = trackingRepo;
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    // 🔥 AGENT UPDATES STATUS
//    public OrderTracking updateStatus(Long orderId, OrderStatus  status, String location) {
//
//        Order order = orderRepo.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Order not found"));
//
//     // 🔥 ADD VALIDATION HERE
//        OrderStatus currentStatus = order.getStatus();
//
//     // 🔥 VALIDATION FLOW
//     if (currentStatus == OrderStatus.PLACED && status != OrderStatus.CONFIRMED) {
//         throw new RuntimeException("Order must move from PLACED → CONFIRMED");
//     }
//
//     if (currentStatus == OrderStatus.CONFIRMED && status != OrderStatus.ASSIGNED) {
//         throw new RuntimeException("Order must move from CONFIRMED → ASSIGNED");
//     }
//
//     if (currentStatus == OrderStatus.ASSIGNED && status != OrderStatus.SHIPPED) {
//         throw new RuntimeException("Order must move from ASSIGNED → SHIPPED");
//     }
//
//     if (currentStatus == OrderStatus.SHIPPED && status != OrderStatus.OUT_FOR_DELIVERY) {
//         throw new RuntimeException("Order must move from SHIPPED → OUT_FOR_DELIVERY");
//     }
//
//     if (currentStatus == OrderStatus.OUT_FOR_DELIVERY && status != OrderStatus.DELIVERED) {
//         throw new RuntimeException("Order must move from OUT_FOR_DELIVERY → DELIVERED");
//     }
//     
//     String email = SecurityContextHolder.getContext()
//    	        .getAuthentication().getName();
//
//    	User agent = userRepo.findByEmail(email)
//    	        .orElseThrow(() -> new RuntimeException("Agent not found"));
//        
//    	
//    	
//
//    	if (order.getAgent() == null ||
//    		    !order.getAgent().getId().equals(agent.getId())) {
//    		    throw new RuntimeException("You are not allowed to update this order");
//    		}
//    	
//        OrderTracking tracking = new OrderTracking();
//        tracking.setOrder(order);
//        tracking.setStatus(status);
//        tracking.setLocation(location);
//        tracking.setUpdatedAt(LocalDateTime.now());
//
//        // update order main status also
//        order.setStatus(status);
//
//        orderRepo.save(order);
//        return trackingRepo.save(tracking);
//    }
    
    
    
    
    
    public OrderTracking updateStatus(Long orderId, OrderStatus status, String location) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // 🔥 CURRENT STATUS
        OrderStatus currentStatus = order.getStatus();

        // 🔥 VALIDATION FLOW (UNCHANGED LOGIC)
        if (currentStatus == OrderStatus.PLACED && status != OrderStatus.CONFIRMED) {
            throw new RuntimeException("Order must move from PLACED → CONFIRMED");
        }

        if (currentStatus == OrderStatus.CONFIRMED && status != OrderStatus.ASSIGNED) {
            throw new RuntimeException("Order must move from CONFIRMED → ASSIGNED");
        }

        if (currentStatus == OrderStatus.ASSIGNED && status != OrderStatus.SHIPPED) {
            throw new RuntimeException("Order must move from ASSIGNED → SHIPPED");
        }

        if (currentStatus == OrderStatus.SHIPPED && status != OrderStatus.OUT_FOR_DELIVERY) {
            throw new RuntimeException("Order must move from SHIPPED → OUT_FOR_DELIVERY");
        }

        if (currentStatus == OrderStatus.OUT_FOR_DELIVERY && status != OrderStatus.DELIVERED) {
            throw new RuntimeException("Order must move from OUT_FOR_DELIVERY → DELIVERED");
        }

        // 🔥 AUTH CHECK (UNCHANGED)
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        User agent = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        if (order.getAgent() == null ||
            !order.getAgent().getId().equals(agent.getId())) {
            throw new RuntimeException("You are not allowed to update this order");
        }

        // 🔥 UPDATE ORDER STATUS FIRST
        order.setStatus(status);
        orderRepo.save(order);

        // 🔥 CREATE TRACKING ENTRY
        OrderTracking tracking = new OrderTracking();
        tracking.setOrder(order);
        tracking.setStatus(status);
        tracking.setLocation(location != null ? location : "Updated by agent");
        tracking.setUpdatedAt(LocalDateTime.now());

        return trackingRepo.save(tracking);
    }
    
    
    

    // 🔥 CUSTOMER VIEW TRACKING
    public List<OrderTracking> getTracking(Long orderId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return trackingRepo.findByOrderOrderByUpdatedAtAsc(order);
    }
    
    public String predictDeliveryTime(String status) {

        switch (status) {
            case "ASSIGNED": return "Estimated delivery in 2-3 hours";
            case "IN_PROGRESS": return "Arriving in 30-60 minutes";
            case "DELIVERED": return "Delivered successfully";
            default: return "Processing...";
        }
    }
}