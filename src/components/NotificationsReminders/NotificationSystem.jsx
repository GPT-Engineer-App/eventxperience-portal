import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const NotificationSystem = () => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'reminder',
    channels: {
      email: true,
      sms: false,
      push: false,
    },
    scheduledTime: '',
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotification(prev => ({ ...prev, [name]: value }));
  };

  const handleChannelToggle = (channel) => {
    setNotification(prev => ({
      ...prev,
      channels: { ...prev.channels, [channel]: !prev.channels[channel] }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the notification data to your backend
    console.log('Notification to be sent:', notification);
    toast({
      title: "Notification Scheduled",
      description: "Your notification has been scheduled successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Notification Title</Label>
        <Input
          id="title"
          name="title"
          value={notification.title}
          onChange={handleInputChange}
          placeholder="Enter notification title"
        />
      </div>
      <div>
        <Label htmlFor="message">Notification Message</Label>
        <Textarea
          id="message"
          name="message"
          value={notification.message}
          onChange={handleInputChange}
          placeholder="Enter notification message"
        />
      </div>
      <div>
        <Label htmlFor="type">Notification Type</Label>
        <Select name="type" value={notification.type} onValueChange={(value) => handleInputChange({ target: { name: 'type', value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select notification type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reminder">Reminder</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="announcement">Announcement</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Delivery Channels</Label>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="email"
              checked={notification.channels.email}
              onCheckedChange={() => handleChannelToggle('email')}
            />
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="sms"
              checked={notification.channels.sms}
              onCheckedChange={() => handleChannelToggle('sms')}
            />
            <Label htmlFor="sms">SMS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="push"
              checked={notification.channels.push}
              onCheckedChange={() => handleChannelToggle('push')}
            />
            <Label htmlFor="push">Push</Label>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="scheduledTime">Scheduled Time</Label>
        <Input
          id="scheduledTime"
          name="scheduledTime"
          type="datetime-local"
          value={notification.scheduledTime}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit">Schedule Notification</Button>
    </form>
  );
};

export default NotificationSystem;