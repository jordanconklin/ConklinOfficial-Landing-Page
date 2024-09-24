package Tekk.SpringbootStripe.model;

public class PaymentSuccessRequest {
    private String paymentIntentId;

    // Getter and setter
    public String getPaymentIntentId() {
        return paymentIntentId; 
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }
}