import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const OrderTracking = () => {
  const { toast } = useToast();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const handleReorder = async (order) => {
    try {
      const { data, error } = await supabase.from('orders').insert([
        {
          items: order.items,
          total: order.total,
          status: 'Received',
          type: 'immediate',
        },
      ]);
      if (error) throw error;
      toast({
        title: "Order Placed",
        description: "Your reorder has been successfully placed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to place reorder: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
          <p>Type: {order.type}</p>
          {order.scheduled_time && <p>Scheduled Time: {new Date(order.scheduled_time).toLocaleString()}</p>}
          <h4 className="font-semibold mt-2">Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
          <Button onClick={() => handleReorder(order)} className="mt-2">Reorder</Button>
        </div>
      ))}
    </div>
  );
};

export default OrderTracking;