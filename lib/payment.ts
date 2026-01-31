// lib/utils/payment.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to smallest currency unit
    currency: "inr",
    payment_method_types: ["card"],
  });
}

export async function confirmPayment(paymentIntentId: string): Promise<boolean> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.status === "succeeded";
  } catch (error) {
    console.error("Error confirming payment:", error);
    return false;
  }
}
