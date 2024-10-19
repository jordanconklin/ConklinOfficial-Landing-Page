package Tekk.SpringbootStripe.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Default controller for the home page
@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to SpringbootStripe Application!";
    }
}
