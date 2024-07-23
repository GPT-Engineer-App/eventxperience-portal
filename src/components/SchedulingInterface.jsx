import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from '@/integrations/supabase';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const SchedulingInterface = () => {
  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: eventsData, isLoading, isError, error } = useEvents();

  const events = useMemo(() => {
    if (!eventsData) return [];
    return eventsData.map(event => ({
      id: event.id,
      title: event.name,
      start: new Date(event.date),
      end: new Date(event.date),
      allDay: true,
    }));
  }, [eventsData]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (date, view, action) => {
    setSelectedDate(date);
  };

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading events: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Scheduling Interface</h2>
      <div className="flex justify-between items-center mb-4">
        <Select value={view} onValueChange={handleViewChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setSelectedDate(new Date())}>Today</Button>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        onView={handleViewChange}
        date={selectedDate}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default SchedulingInterface;