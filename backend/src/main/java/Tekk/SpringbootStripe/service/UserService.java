package Tekk.SpringbootStripe.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.FirebaseAuth;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.PostConstruct;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private Firestore firestore;

    @Autowired
    private FirebaseApp firebaseApp;
    
    @PostConstruct 
    public void initialize() {
        this.firestore = FirestoreClient.getFirestore(firebaseApp);
    }

    public UserRecord createUser(String email, String password) throws FirebaseAuthException {
        // Create user request for Firebase Auth
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
            .setEmail(email)
            .setPassword(password);
    
        // Create the user
        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        // Store user data in hashmap for Firestore
        Map<String,Object> userData = new HashMap<>();
        userData.put("email", email);
        userData.put("createdAt", System.currentTimeMillis());

        // Store user data in Firestore database
        firestore.collection("users").document(userRecord.getUid()).set(userData);

        return userRecord;
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUserByEmail(email);
    }
}
