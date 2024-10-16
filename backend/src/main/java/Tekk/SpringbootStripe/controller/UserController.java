package Tekk.SpringbootStripe.controller;

import Tekk.SpringbootStripe.service.UserService;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Tekk.SpringbootStripe.model.RegisterRequest;
import Tekk.SpringbootStripe.model.LoginRequest;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            if (!request.getPassword().equals(request.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("{\"error\": \"Passwords do not match\"}");
            }
            UserRecord userRecord = userService.createUser(request.getEmail(), request.getPassword());
            return ResponseEntity.ok().body("{\"uid\": \"" + userRecord.getUid() + "\"}");
        } catch (FirebaseAuthException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"An unexpected error occurred\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            UserRecord userRecord = userService.getUserByEmail(request.getEmail());
            // Here you would typically verify the password
            // For now, we'll just check if the user exists
            if (userRecord != null) {
                String token = generateJwtToken(userRecord); // Implement this method
                return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid credentials\"}");
            }
        } catch (FirebaseAuthException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    private String generateJwtToken(UserRecord userRecord) {
        // Implement JWT token generation here
        // You'll need to add a JWT library to your project
        // For example, you can use jjwt library
        return "dummy-token"; // Replace with actual token generation
    }
}
