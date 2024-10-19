package Tekk.SpringbootStripe.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {
    
    @Value("${SPRING_MAIL_USERNAME}")
    private String to;

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    @Async
    public void sendEmail(String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(this.to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

 }
