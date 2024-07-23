import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DigitalMenuDisplay from './BarOrdering/DigitalMenuDisplay';
import AdminInterface from './BarOrdering/AdminInterface';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const BarOrdering = () => {
  const [activeTab, setActiveTab] = useState('menu');

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['menuItems'],
    queryFn: async () => {
      const { data, error } = await supabase.from('menu_items').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  if (isLoading) return <div>Loading menu items...</div>;
  if (error) return <div>Error loading menu items: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bar Ordering</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="menu">Digital Menu</TabsTrigger>
          <TabsTrigger value="admin">Admin Interface</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <DigitalMenuDisplay menuItems={menuItems} />
        </TabsContent>
        <TabsContent value="admin">
          <AdminInterface menuItems={menuItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BarOrdering;