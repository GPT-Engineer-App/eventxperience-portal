import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Cart = ({ cart, removeFromCart, updateQuantity, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 mr-2"
                  />
                  <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="font-bold">Total: ${total.toFixed(2)}</span>
        <Button onClick={onCheckout} disabled={cart.length === 0}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;