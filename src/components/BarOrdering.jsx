import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DigitalMenuDisplay from './BarOrdering/DigitalMenuDisplay';
import AdminInterface from './BarOrdering/AdminInterface';

const BarOrdering = () => {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bar Ordering</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="menu">Digital Menu</TabsTrigger>
          <TabsTrigger value="admin">Admin Interface</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <DigitalMenuDisplay />
        </TabsContent>
        <TabsContent value="admin">
          <AdminInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BarOrdering;