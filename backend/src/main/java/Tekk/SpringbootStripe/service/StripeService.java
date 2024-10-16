package Tekk.SpringbootStripe.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// This is the service class that handles the Stripe API calls
@Service
public class StripeService {

    private static final Logger logger = LoggerFactory.getLogger(StripeService.class);
 
    @Value("${STRIPE_API_KEY}")
    private String stripeApiKey;

    // This method is called after the bean is created
    @PostConstruct
    public void init() {
        logger.info("Attempting to load STRIPE_API_KEY");
        if (stripeApiKey == null || stripeApiKey.isEmpty()) {
            logger.error("STRIPE_API_KEY is not set or is empty");
            throw new IllegalStateException("STRIPE_API_KEY is not set. Stripe functionality will not work.");
        } else {
            Stripe.apiKey = stripeApiKey;
            logger.info("Stripe secret key is set successfully");
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