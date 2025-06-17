// lib/utils/payment.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to smallest currency unit
    currency: "inr",
    payment_method_types: ["card"],
  });
}
