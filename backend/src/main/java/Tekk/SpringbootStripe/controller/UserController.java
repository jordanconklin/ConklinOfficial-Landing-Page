package Tekk.SpringbootStripe.controller;

import Tekk.SpringbootStripe.service.UserService;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Tekk.SpringbootStripe.model.RegisterRequest;
import Tekk.SpringbootStripe.model.LoginRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            UserRecord userRecord = userService.createUser(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(userRecord.getUid());
        } catch (FirebaseAuthException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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