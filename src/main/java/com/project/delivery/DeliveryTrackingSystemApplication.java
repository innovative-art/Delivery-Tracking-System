package com.project.delivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.project.delivery.repository")
@EntityScan("com.project.delivery.entity")
public class DeliveryTrackingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliveryTrackingSystemApplication.class, args);
	}

}
