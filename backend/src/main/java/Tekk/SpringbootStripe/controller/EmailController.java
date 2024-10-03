package Tekk.SpringbootStripe.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import Tekk.SpringbootStripe.model.EmailRequest;

@RestController
public class EmailController {

    @PostMapping("/api/send-email")
    public String sendEmail(@RequestBody EmailRequest request) {
        // Mock response for now
        System.out.println("Received email request: " + request.getName() + ", " + request.getEmail());
        return "Email request received successfully (Note: Emails are not actually sent in production)";
    }
}
