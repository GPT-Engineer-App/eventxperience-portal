import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DigitalMenuDisplay from './DigitalMenuDisplay';
import OnlineOrdering from './OnlineOrdering';
import OrderTracking from './OrderTracking';
import PaymentProcessing from './PaymentProcessing';

const BarOrdering = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bar Ordering</h2>
      <Tabs defaultValue="menu">
        <TabsList>
          <TabsTrigger value="menu">Digital Menu</TabsTrigger>
          <TabsTrigger value="order">Online Ordering</TabsTrigger>
          <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <DigitalMenuDisplay />
        </TabsContent>
        <TabsContent value="order">
          <OnlineOrdering />
        </TabsContent>
        <TabsContent value="tracking">
          <OrderTracking />
        </TabsContent>
        <TabsContent value="payment">
          <PaymentProcessing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BarOrdering;