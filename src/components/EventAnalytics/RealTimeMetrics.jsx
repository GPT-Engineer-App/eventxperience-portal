import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEvents } from '@/integrations/supabase';

const RealTimeMetrics = () => {
  const { data: events, isLoading, isError } = useEvents();
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [ticketSales, setTicketSales] = useState(0);

  useEffect(() => {
    if (events) {
      // This is a simplified calculation. In a real app, you'd fetch this data from your backend.
      const totalAttendees = events.reduce((sum, event) => sum + (event.attendees?.length || 0), 0);
      const totalSales = events.reduce((sum, event) => sum + (event.ticketsSold || 0), 0);
      setAttendeeCount(totalAttendees);
      setTicketSales(totalSales);
    }
  }, [events]);

  if (isLoading) return <div>Loading metrics...</div>;
  if (isError) return <div>Error loading metrics</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Attendees</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{attendeeCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ticket Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{ticketSales}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeMetrics;