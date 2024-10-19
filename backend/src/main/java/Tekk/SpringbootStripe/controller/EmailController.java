package Tekk.SpringbootStripe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import Tekk.SpringbootStripe.model.EmailRequest;
import Tekk.SpringbootStripe.service.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/api/send-email")
    public String sendEmail(@RequestBody EmailRequest request) {
        String to = "conklinofficialsoccer@gmail.com";
        String subject = "New message from " + request.getName();
        String body = String.format("Name: %s\nEmail: %s\nMessage: %s", 
                                    request.getName(), 
                                    request.getEmail(), 
                                    request.getMessage());
            
        emailService.sendEmail(to, subject, body);
        return "Email sent successfully";
    }
}
