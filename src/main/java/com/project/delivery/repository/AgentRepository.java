package com.project.delivery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.delivery.entity.Agent;

public interface AgentRepository extends JpaRepository<Agent, Long> {
}
