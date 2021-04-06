package com.a202.fishserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FishServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FishServerApplication.class, args);
	}

}
