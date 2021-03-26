package com.a202.fishserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class FishServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FishServerApplication.class, args);
	}

}
