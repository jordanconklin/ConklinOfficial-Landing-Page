package Tekk.SpringbootStripe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import Tekk.SpringbootStripe.model.EmailRequest;

@RestController
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @PostMapping("/api/send-email")
    public String sendEmail(@RequestBody EmailRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo("conklinofficialsoccer@gmail.com");
        message.setSubject("New Contact Form Submission");
        message.setText("Name: " + request.getName() + "\nEmail: " + request.getEmail() + "\nMessage: " + request.getMessage());

        mailSender.send(message);

        return "Email sent successfully";
    }
}
