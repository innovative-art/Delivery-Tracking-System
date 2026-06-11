package com.project.delivery.dto;

import lombok.Data;

@Data
public class AssignRequest {
    private Long orderId;
    private Long agentId;
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public Long getAgentId() {
		return agentId;
	}
	public void setAgentId(Long agentId) {
		this.agentId = agentId;
	}
    
    
}
