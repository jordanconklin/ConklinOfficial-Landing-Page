package Tekk.SpringbootStripe.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import java.util.concurrent.ExecutionException;
import com.google.cloud.firestore.DocumentSnapshot;

import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {

    private Firestore firestore;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final Key jwtKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    // Initialize Firebase and Firestore
    @PostConstruct
    public void initialize() throws IOException {
        ClassPathResource resource = new ClassPathResource("firebase-service-account.json");
        InputStream serviceAccount = resource.getInputStream();

        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        firestore = FirestoreClient.getFirestore();
    }

    // Create a new user in Firebase Authentication and Firestore
    public UserRecord createUser(String email, String password) throws FirebaseAuthException {
        logger.info("Creating user with email: {}", email);
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
            .setEmail(email)
            .setPassword(password);
        
        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
        logger.info("User created successfully with UID: {}", userRecord.getUid());
        
        String encryptedPassword = passwordEncoder.encode(password);
        // String jwtToken = generateJwtToken(userRecord.getUid());
        String uuid = UUID.randomUUID().toString();

        Map<String, Object> userData = new HashMap<>();
        userData.put("email", email);
        userData.put("encryptedPassword", encryptedPassword);
        // userData.put("jwtToken", jwtToken);
        userData.put("createdAt", System.currentTimeMillis());
        userData.put("uuid", uuid);
        
        firestore.collection("users").document(userRecord.getUid()).set(userData);
        logger.info("User data stored in Firestore for UID: {}", userRecord.getUid());

        return userRecord;
    }

    // Generate a JWT token for the user
    public String generateJwtToken(String userId) {
        long expirationTime = 1000 * 60 * 60 * 24; // 24 hours
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(jwtKey)
                .compact();
    }

    // Get a user by email from Firebase Authentication
    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUserByEmail(email);
    }

    // Validate a password against an encoded password
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    // Fetch the encrypted password from Firestore
    public String getEncryptedPassword(String uid) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection("users").document(uid).get().get();
        if (document.exists()) {
            return document.getString("encryptedPassword");
        }
        return null;
    }

    // Fetch the UUID from Firestore
    public String getUserUUID(String uid) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection("users").document(uid).get().get();
        if (document.exists()) {
            return document.getString("uuid");
        }
        return null;
    }
}