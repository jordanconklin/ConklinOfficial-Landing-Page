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
		logger.info("Application starting...");
		logger.info("Java version: " + System.getProperty("java.version"));
		logger.info("Working directory: " + System.getProperty("user.dir"));
		
		logger.info("Environment variables:");
		System.getenv().forEach((key, value) -> 
			logger.info(key + "=" + (key.contains("KEY") ? "******" : value))
		);
		
		String stripeKey = System.getenv("STRIPE_API_KEY");
		if (stripeKey == null || stripeKey.isEmpty()) {
			logger.error("STRIPE_API_KEY is not set!");
		} else {
			logger.info("STRIPE_API_KEY is set (value not shown for security)");
		}
		
		SpringApplication.run(SpringbootStripeApplication.class, args);
		logger.info("Application started successfully");
	}

}
