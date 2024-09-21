package Tekk.SpringbootStripe.controller;

import Tekk.SpringbootStripe.model.PaymentRequest;
import Tekk.SpringbootStripe.model.PaymentSuccessRequest;
import Tekk.SpringbootStripe.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(paymentRequest.getAmount(), paymentRequest.getCurrency());
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/payment-success")
    public ResponseEntity<String> handlePaymentSuccess(@RequestBody PaymentSuccessRequest request) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(request.getPaymentIntentId());
            if ("succeeded".equals(paymentIntent.getStatus())) {
                // Here you can add logic to update your database or perform any other actions
                return ResponseEntity.ok("Payment processed successfully");
            } else {
                return ResponseEntity.badRequest().body("Payment has not succeeded");
            }
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment");
        }
    }
}