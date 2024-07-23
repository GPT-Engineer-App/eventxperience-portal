import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TicketDistribution = ({ ticket }) => {
  const { toast } = useToast();

  const handleEmailTicket = async () => {
    // This would typically be a call to your backend to send an email
    try {
      const response = await fetch('/api/email-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticket }),
      });

      if (response.ok) {
        toast({
          title: "Ticket Emailed",
          description: "Your ticket has been sent to your email.",
        });
      } else {
        throw new Error('Email sending failed');
      }
    } catch (error) {
      toast({
        title: "Email Error",
        description: "There was an error sending your ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Ticket</h3>
      <div className="bg-gray-100 p-4 rounded">
        <p>Event: {ticket.eventName}</p>
        <p>Type: {ticket.type}</p>
        <p>Price: ${ticket.price}</p>
        <p>Date: {ticket.date}</p>
      </div>
      <Button onClick={handleEmailTicket}>Email Ticket</Button>
    </div>
  );
};

export default TicketDistribution;