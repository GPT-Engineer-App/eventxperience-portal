import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
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

const OnlineOrdering = () => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState('immediate');
  const [scheduledTime, setScheduledTime] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['menuItems'],
    queryFn: async () => {
      const { data, error } = await supabase.from('menu_items').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const placeOrder = useMutation({
    mutationFn: async (orderData) => {
      const { data, error } = await supabase.from('orders').insert([orderData]);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed.",
      });
      setCart([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to place order: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handlePlaceOrder = () => {
    const orderData = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Received',
      type: orderType,
      scheduled_time: orderType === 'scheduled' ? scheduledTime : null,
    };
    placeOrder.mutate(orderData);
  };

  if (isLoading) return <div>Loading menu items...</div>;
  if (error) return <div>Error loading menu items: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Online Ordering</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Menu Items</h3>
          {menuItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} - ${item.price}</span>
              <Button onClick={() => addToCart(item)}>Add to Cart</Button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Your Cart</h3>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name} - ${item.price}</span>
              <div>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  className="w-16 mr-2"
                />
                <Button onClick={() => removeFromCart(index)} variant="destructive">Remove</Button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <Label htmlFor="orderType">Order Type</Label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger id="orderType">
                <SelectValue placeholder="Select order type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {orderType === 'scheduled' && (
            <div className="mt-2">
              <Label htmlFor="scheduledTime">Scheduled Time</Label>
              <Input
                id="scheduledTime"
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          )}
          <Button onClick={handlePlaceOrder} className="mt-4" disabled={cart.length === 0}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrdering;