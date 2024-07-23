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

const PaymentProcessing = ({ cart, clearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const { toast } = useToast();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: cart.map(item => ({
          price: item.stripe_price_id, // Assuming you have this field in your item data
          quantity: item.quantity,
        })),
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

      clearCart();
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully.",
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Processing</h3>
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
        <Label>Order Summary</Label>
        <ul className="mt-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 font-bold">
          Total: ${total.toFixed(2)}
        </div>
      </div>
      <Button onClick={handlePayment} disabled={!paymentMethod || cart.length === 0}>
        Process Payment
      </Button>
    </div>
  );
};

export default PaymentProcessing;