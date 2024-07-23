import React, { useState } from 'react';
import EventForm from './EventForm';
import { Button } from '@/components/ui/button';
import { useEvents, useAddEvent, useUpdateEvent } from '@/integrations/supabase';
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from './LoadingSpinner';

const EventManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const { toast } = useToast();

  const handleCreateEvent = async (eventData) => {
    try {
      await addEvent.mutateAsync(eventData);
      toast({
        title: "Event created",
        description: "Your event has been successfully created.",
      });
      setSelectedEvent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create event: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      await updateEvent.mutateAsync({ id: selectedEvent.id, ...eventData });
      toast({
        title: "Event updated",
        description: "Your event has been successfully updated.",
      });
      setSelectedEvent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update event: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading events</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>
      {selectedEvent ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {selectedEvent.id ? 'Edit Event' : 'Create New Event'}
          </h3>
          <EventForm
            event={selectedEvent}
            onSubmit={selectedEvent.id ? handleUpdateEvent : handleCreateEvent}
          />
          <Button onClick={() => setSelectedEvent(null)} className="mt-4">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => setSelectedEvent({})} className="mb-4">Create New Event</Button>
          <h3 className="text-xl font-semibold mt-4 mb-2">Existing Events</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="border p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold">{event.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <Button onClick={() => setSelectedEvent(event)} className="w-full">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;