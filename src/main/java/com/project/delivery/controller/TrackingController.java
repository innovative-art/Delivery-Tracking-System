package com.project.delivery.controller;

import com.project.delivery.entity.OrderStatus;
import com.project.delivery.entity.OrderTracking;
import com.project.delivery.service.TrackingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TrackingController {

    private final TrackingService trackingService;

    public TrackingController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    // 🔥 AGENT UPDATE
    @PostMapping("/agent/update-status")
    public OrderTracking updateStatus(@RequestBody TrackingRequest request) {

        return trackingService.updateStatus(
                request.getOrderId(),
                OrderStatus.valueOf(request.getStatus()),
                request.getLocation()
        );
    }

    // 🔥 CUSTOMER VIEW
    @GetMapping("/customer/track/{orderId}")
    public List<OrderTracking> track(@PathVariable Long orderId) {
        return trackingService.getTracking(orderId);
    }
}
