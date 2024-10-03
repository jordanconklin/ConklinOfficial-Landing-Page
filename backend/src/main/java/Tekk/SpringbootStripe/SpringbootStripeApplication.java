package Tekk.SpringbootStripe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// This is the main class that runs the Spring Boot application
@SpringBootApplication
public class SpringbootStripeApplication {

	public static void main(String[] args) {
		System.out.println("Application starting...");
		System.out.println("Java version: " + System.getProperty("java.version"));
		System.out.println("Working directory: " + System.getProperty("user.dir"));
		
		System.out.println("Environment variables:");
		System.getenv().forEach((key, value) -> System.out.println(key + "=" + (key.contains("KEY") ? "******" : value)));
		
		String stripeKey = System.getenv("STRIPE_API_KEY");
		if (stripeKey == null || stripeKey.isEmpty()) {
			System.err.println("STRIPE_API_KEY is not set!");
		} else {
			System.out.println("STRIPE_API_KEY is set (value not shown for security)");
		}
		
		try {
			SpringApplication.run(SpringbootStripeApplication.class, args);
			System.out.println("Application started successfully");
		} catch (Exception e) {
			System.err.println("Error starting application: " + e.getMessage());
			e.printStackTrace();
		}
	}

}
