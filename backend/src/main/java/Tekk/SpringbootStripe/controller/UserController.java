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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            logger.info("Attempting to register user with email: {}", request.getEmail());
            UserRecord userRecord = userService.createUser(request.getEmail(), request.getPassword());
            logger.info("User registered successfully with UID: {}", userRecord.getUid());
            return ResponseEntity.ok().body("{\"uid\": \"" + userRecord.getUid() + "\"}");
        } catch (FirebaseAuthException e) {
            logger.error("Firebase Auth Exception during registration: ", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during registration: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            UserRecord userRecord = userService.getUserByEmail(request.getEmail());
            // Here you would typically create and return a JWT token
            return ResponseEntity.ok(userRecord.getUid());
        } catch (FirebaseAuthException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}