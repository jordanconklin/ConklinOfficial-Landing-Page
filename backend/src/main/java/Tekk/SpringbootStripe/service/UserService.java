package Tekk.SpringbootStripe.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import javax.annotation.PostConstruct;

@Service
public class UserService {

    private Firestore firestore;

    @Value("${FIREBASE_CONFIG}")
    private String firebaseConfig;

    @PostConstruct
    public void initialize() throws IOException {
        try {
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(new ByteArrayInputStream(firebaseConfig.getBytes())))
                .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            firestore = FirestoreClient.getFirestore();
        } catch (IOException e) {
            throw new RuntimeException("Error initializing Firebase: " + e.getMessage(), e);
        }
    }

    public UserRecord createUser(String email, String password) throws FirebaseAuthException {
        // Set email and passord in Firebase so they can handle auth
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
            .setEmail(email)
            .setPassword(password);

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        // Store user data in Firestore
        Map<String, Object> userData = new HashMap<>();
        userData.put("email", email);
        userData.put("createdAt", System.currentTimeMillis());

        firestore.collection("users").document(userRecord.getUid()).set(userData);

        return userRecord;
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUserByEmail(email);
    }
}
