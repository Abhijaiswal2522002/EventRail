/**
 * Payment utility functions for EventRail platform
 */

// Types
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: PaymentStatus
  created: number
  metadata: Record<string, string>
}

export type PaymentStatus = "pending" | "processing" | "succeeded" | "failed" | "refunded"

export interface PaymentError {
  code: string
  message: string
}

export interface PaymentResult {
  success: boolean
  paymentIntent?: PaymentIntent
  error?: PaymentError
}

/**
 * Creates a payment intent for processing a payment
 */
export async function createPaymentIntent(
  amount: number,
  currency = "inr",
  metadata: Record<string, string> = {},
): Promise<PaymentResult> {
  try {
    // Validate amount
    if (!validatePaymentAmount(amount)) {
      return {
        success: false,
        error: {
          code: "invalid_amount",
          message: "Payment amount must be between ₹0.50 and ₹1,00,000",
        },
      }
    }

    // Mock payment intent creation (would use Stripe in production)
    const paymentIntent: PaymentIntent = {
      id: `pi_${generateRandomId()}`,
      amount,
      currency,
      status: "pending",
      created: Date.now(),
      metadata: {
        ...metadata,
        receipt_number: generateReceiptNumber(),
      },
    }

    return {
      success: true,
      paymentIntent,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: "payment_intent_creation_failed",
        message: error instanceof Error ? error.message : "Failed to create payment intent",
      },
    }
  }
}

/**
 * Confirms a payment intent
 */
export async function confirmPaymentIntent(paymentIntentId: string): Promise<PaymentResult> {
  try {
    // Mock payment confirmation (would use Stripe in production)
    // Simulate 90% success rate
    const isSuccessful = Math.random() < 0.9

    const paymentIntent: PaymentIntent = {
      id: paymentIntentId,
      amount: 1000, // Mock amount
      currency: "inr",
      status: isSuccessful ? "succeeded" : "failed",
      created: Date.now() - 60000, // 1 minute ago
      metadata: {
        receipt_number: generateReceiptNumber(),
      },
    }

    return {
      success: isSuccessful,
      paymentIntent,
      error: isSuccessful
        ? undefined
        : {
            code: "payment_failed",
            message: "The payment could not be processed",
          },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: "payment_confirmation_failed",
        message: error instanceof Error ? error.message : "Failed to confirm payment",
      },
    }
  }
}

/**
 * Retrieves a payment intent
 */
export async function retrievePaymentIntent(paymentIntentId: string): Promise<PaymentResult> {
  try {
    // Mock retrieval (would use Stripe in production)
    const paymentIntent: PaymentIntent = {
      id: paymentIntentId,
      amount: 1000,
      currency: "inr",
      status: "succeeded",
      created: Date.now() - 3600000, // 1 hour ago
      metadata: {
        receipt_number: generateReceiptNumber(),
      },
    }

    return {
      success: true,
      paymentIntent,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: "payment_retrieval_failed",
        message: error instanceof Error ? error.message : "Failed to retrieve payment",
      },
    }
  }
}

/**
 * Calculates platform fee (2.9% + ₹3)
 */
export function calculatePlatformFee(amount: number): number {
  return Math.round(amount * 0.029) + 300 // 2.9% + ₹3 (in paise)
}

/**
 * Formats currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount / 100) // Convert paise to rupees
}

/**
 * Validates payment amount (between ₹0.50 and ₹1,00,000)
 */
export function validatePaymentAmount(amount: number): boolean {
  return amount >= 50 && amount <= 10000000
}

/**
 * Generates a receipt number
 */
export function generateReceiptNumber(): string {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `ER-${timestamp}-${random}`
}

/**
 * Generates a random ID
 */
function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Gets payment status color
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  switch (status) {
    case "succeeded":
      return "text-green-600"
    case "processing":
      return "text-blue-600"
    case "pending":
      return "text-yellow-600"
    case "failed":
      return "text-red-600"
    case "refunded":
      return "text-purple-600"
    default:
      return "text-gray-600"
  }
}

/**
 * Gets payment status text
 */
export function getPaymentStatusText(status: PaymentStatus): string {
  switch (status) {
    case "succeeded":
      return "Payment successful"
    case "processing":
      return "Processing payment"
    case "pending":
      return "Payment pending"
    case "failed":
      return "Payment failed"
    case "refunded":
      return "Payment refunded"
    default:
      return "Unknown status"
  }
}
