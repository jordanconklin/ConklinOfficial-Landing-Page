package Tekk.SpringbootStripe.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${FIREBASE_CONFIG}")
    private String firebaseConfig;

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        logger.info("Initializing FirebaseApp...");
        if (FirebaseApp.getApps().isEmpty()) {
            if (firebaseConfig == null || firebaseConfig.isEmpty()) {
                logger.error("FIREBASE_CONFIG is not set or is empty");
                throw new IllegalStateException("FIREBASE_CONFIG is not set. Firebase initialization will fail.");
            }
            
            try {
                FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new ByteArrayInputStream(firebaseConfig.getBytes())))
                    .build();
                
                FirebaseApp app = FirebaseApp.initializeApp(options);
                FirestoreClient.getFirestore(app); // Initialize Firestore
                logger.info("FirebaseApp initialized successfully");
                return app;
            } catch (IOException e) {
                logger.error("Error initializing FirebaseApp", e);
                throw e;
            }
        }
        logger.info("FirebaseApp already initialized");
        return FirebaseApp.getInstance();
    }
}
