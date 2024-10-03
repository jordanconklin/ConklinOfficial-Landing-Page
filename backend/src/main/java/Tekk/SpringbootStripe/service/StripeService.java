package Tekk.SpringbootStripe.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

// This is the service class that handles the Stripe API calls
@Service
public class StripeService {

    // @Value("${stripe.secret.key}")
    // private String secretKey;  

    // his method is called after the bean is created
    @PostConstruct
    public void init() {
        String stripeKey = System.getenv("STRIPE_API_KEY");
        if (stripeKey == null || stripeKey.isEmpty()) {
            System.out.println("Warning: STRIPE_API_KEY is not set. Stripe functionality may not work correctly.");
        } else {
            Stripe.apiKey = stripeKey;
            System.out.println("Stripe secret key is set (value not shown for security)");
        }
    }

    // Create payment intent for Stripe 
    public PaymentIntent createPaymentIntent(Long amount, String currency) throws StripeException {
        if (currency == null || currency.isEmpty()) {
            throw new IllegalArgumentException("Currency must be provided");
        }
        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", currency.toLowerCase());
        params.put("payment_method_types", new String[]{"card"});

        return PaymentIntent.create(params);
    }
}