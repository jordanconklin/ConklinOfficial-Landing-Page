package Tekk.SpringbootStripe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// This is the main class that runs the Spring Boot application
@SpringBootApplication
public class SpringbootStripeApplication implements ApplicationListener<ContextRefreshedEvent> {

	private static final Logger logger = LoggerFactory.getLogger(SpringbootStripeApplication.class);

	public static void main(String[] args) {
		logger.info("Starting SpringbootStripeApplication...");
		SpringApplication.run(SpringbootStripeApplication.class, args);
	}

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		logger.info("ContextRefreshedEvent received");
		try {
			ServletWebServerApplicationContext webServerAppCtxt = (ServletWebServerApplicationContext) event.getApplicationContext();
			int port = webServerAppCtxt.getWebServer().getPort();
			logger.info("Application is running on port: " + port);
			logger.info("SpringbootStripeApplication started successfully.");
		} catch (Exception e) {
			logger.error("Error during application startup", e);
		}
	}
}
