import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationSystem from './NotificationSystem';
import NotificationTemplates from './NotificationTemplates';

const NotificationsReminders = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications and Reminders</h1>
      <Tabs defaultValue="system">
        <TabsList>
          <TabsTrigger value="system">Notification System</TabsTrigger>
          <TabsTrigger value="templates">Notification Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="system">
          <NotificationSystem />
        </TabsContent>
        <TabsContent value="templates">
          <NotificationTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsReminders;