package com.project.delivery.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
}
