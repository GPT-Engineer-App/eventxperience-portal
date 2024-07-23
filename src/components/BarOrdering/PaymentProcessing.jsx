import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentProcessing = ({ total, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [splitPayment, setSplitPayment] = useState(false);
  const [splitAmount, setSplitAmount] = useState(0);
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_1234', quantity: 1 }],
        mode: 'payment',
        successUrl: window.location.origin + '/success',
        cancelUrl: window.location.origin + '/cancel',
      });

      if (error) {
        throw new Error(error.message);
      }

      // Log the transaction for fraud detection
      await supabase.from('transactions').insert([
        { amount: total, payment_method: paymentMethod, status: 'completed' }
      ]);

      onPaymentComplete();
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSplitPayment = async () => {
    // Implement split payment logic here
    toast({
      title: "Split Payment",
      description: "Split payment functionality is not yet implemented.",
    });
  };

  const handleRefund = async () => {
    try {
      // In a real application, you would integrate with your payment provider's refund API
      // For this example, we'll just log the refund request
      await supabase.from('refunds').insert([
        { amount: total, reason: 'Customer request' }
      ]);

      toast({
        title: "Refund Requested",
        description: "Your refund request has been submitted for processing.",
      });
    } catch (error) {
      toast({
        title: "Refund Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Payment Processing</h3>
      <div className="mb-4">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger id="paymentMethod">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="applepay">Apple Pay</SelectItem>
            <SelectItem value="googlepay">Google Pay</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="splitPayment">Split Payment</Label>
        <Input
          id="splitPayment"
          type="checkbox"
          checked={splitPayment}
          onChange={(e) => setSplitPayment(e.target.checked)}
        />
      </div>
      {splitPayment && (
        <div className="mb-4">
          <Label htmlFor="splitAmount">Split Amount</Label>
          <Input
            id="splitAmount"
            type="number"
            value={splitAmount}
            onChange={(e) => setSplitAmount(parseFloat(e.target.value))}
          />
        </div>
      )}
      <p className="mb-4">Total: ${total}</p>
      {splitPayment ? (
        <Button onClick={handleSplitPayment}>Process Split Payment</Button>
      ) : (
        <Button onClick={handlePayment}>Process Payment</Button>
      )}
      <Button onClick={handleRefund} className="mt-4" variant="outline">Request Refund</Button>
      <div className="mt-4">
        <h4 className="font-semibold">Refund Policy</h4>
        <p>Refunds can be requested within 24 hours of purchase. Processing time may take up to 5-7 business days.</p>
      </div>
    </div>
  );
};

export default PaymentProcessing;