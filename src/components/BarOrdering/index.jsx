import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DigitalMenuDisplay from './DigitalMenuDisplay';
import OnlineOrdering from './OnlineOrdering';
import OrderTracking from './OrderTracking';
import PaymentProcessing from './PaymentProcessing';
import Cart from './Cart';
import { useToast } from "@/components/ui/use-toast";

const BarOrdering = () => {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");
  const { toast } = useToast();

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    setActiveTab("payment");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bar Ordering</h2>
      <div className="flex">
        <div className="flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="menu">Digital Menu</TabsTrigger>
              <TabsTrigger value="order">Online Ordering</TabsTrigger>
              <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="menu">
              <DigitalMenuDisplay addToCart={addToCart} />
            </TabsContent>
            <TabsContent value="order">
              <OnlineOrdering />
            </TabsContent>
            <TabsContent value="tracking">
              <OrderTracking />
            </TabsContent>
            <TabsContent value="payment">
              <PaymentProcessing cart={cart} clearCart={clearCart} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-1/4 ml-4">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default BarOrdering;