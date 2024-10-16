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

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;

@Service
public class UserService {

    private Firestore firestore;


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

    public UserRecord createUser(String email, String password) throws FirebaseAuthException {
        // Set email and passord in Firebase so they can handle auth
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
            .setEmail(email)
            .setPassword(password);

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        // Store user data in Firestore
        Map<String, Object> userData = new HashMap<>();
        userData.put("createdAt", System.currentTimeMillis());

        firestore.collection("users").document(userRecord.getUid()).set(userData);

        return userRecord;
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUserByEmail(email);
    }
}