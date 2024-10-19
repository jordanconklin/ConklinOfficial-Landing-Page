package Tekk.SpringbootStripe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// This is the main class that runs the Spring Boot application
@SpringBootApplication
public class SpringbootStripeApplication {

	private static final Logger logger = LoggerFactory.getLogger(SpringbootStripeApplication.class);

	public static void main(String[] args) {
		logger.info("Starting SpringbootStripeApplication...");
		SpringApplication.run(SpringbootStripeApplication.class, args);
		logger.info("SpringbootStripeApplication started successfully.");
	}

}
