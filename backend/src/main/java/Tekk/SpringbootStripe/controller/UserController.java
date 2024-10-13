package Tekk.SpringbootStripe.controller;

import Tekk.SpringbootStripe.service.UserService;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Tekk.SpringbootStripe.model.RegisterRequest;
import Tekk.SpringbootStripe.model.LoginRequest;
import org.springframework.http.HttpStatus;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            if (!request.getPassword().equals(request.getConfirmPassword())) {
                logger.warn("Password mismatch during registration for email: {}", request.getEmail());
                return ResponseEntity.badRequest().body(Map.of("error", "Passwords do not match"));
            }

            logger.info("Attempting to register user with email: {}", request.getEmail());
            UserRecord userRecord = userService.createUser(request.getEmail(), request.getPassword());

            // String jwtToken = userService.generateJwtToken(userRecord.getUid());
            logger.info("User registered successfully with UID: {}", userRecord.getUid());

            // return ResponseEntity.ok().body(Map.of("uid", userRecord.getUid(), "token", jwtToken));
            return ResponseEntity.ok().body(Map.of("uid", userRecord.getUid(), "message", "Registration successful"));
            
        } catch (Exception e) {
            logger.error("Unexpected error during registration: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            UserRecord userRecord = userService.getUserByEmail(request.getEmail());
            String encryptedPassword = userService.getEncryptedPassword(userRecord.getUid());
            if (encryptedPassword != null && userService.validatePassword(request.getPassword(), encryptedPassword)) {
                String jwtToken = userService.generateJwtToken(userRecord.getUid());
                return ResponseEntity.ok().body(Map.of("uid", userRecord.getUid(), "token", jwtToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
            }
        } catch (Exception e) {
            logger.error("Error during login: ", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @RequestMapping("/log") public String log()
    {
        // Logging various log level messages
        logger.trace("Log level: TRACE");
        logger.info("Log level: INFO");
        logger.debug("Log level: DEBUG");
        logger.error("Log level: ERROR");
        logger.warn("Log level: WARN");

        return "Hey! You can check the output in the logs";
    }
}