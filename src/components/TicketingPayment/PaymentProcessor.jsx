import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentProcessor = ({ amount, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    const stripe = await stripePromise;

    // This would typically be a call to your backend to create a Stripe Checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      toast({
        title: "Payment Error",
        description: result.error.message,
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  const handleRefund = async () => {
    // This would typically be a call to your backend to process a refund
    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        toast({
          title: "Refund Processed",
          description: "Your refund has been processed successfully.",
        });
        onCancel();
      } else {
        throw new Error('Refund failed');
      }
    } catch (error) {
      toast({
        title: "Refund Error",
        description: "There was an error processing your refund. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handlePayment} disabled={isProcessing} className="w-full">
        {isProcessing ? 'Processing...' : `Confirm Payment of $${amount}`}
      </Button>
      <Button variant="outline" onClick={handleRefund} className="w-full">
        Request Refund
      </Button>
    </div>
  );
};

export default PaymentProcessor;