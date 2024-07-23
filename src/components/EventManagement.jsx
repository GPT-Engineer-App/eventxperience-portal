import React, { useState } from 'react';
import EventForm from './EventForm';
import { Button } from '@/components/ui/button';
import { useEvents, useAddEvent, useUpdateEvent } from '@/integrations/supabase';

const EventManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();

  const handleCreateEvent = (eventData) => {
    addEvent.mutate(eventData, {
      onSuccess: () => {
        console.log('Event created successfully');
        setSelectedEvent(null);
      },
      onError: (error) => {
        console.error('Error creating event:', error);
      },
    });
  };

  const handleUpdateEvent = (eventData) => {
    updateEvent.mutate({ id: selectedEvent.id, ...eventData }, {
      onSuccess: () => {
        console.log('Event updated successfully');
        setSelectedEvent(null);
      },
      onError: (error) => {
        console.error('Error updating event:', error);
      },
    });
  };

  if (isLoading) return <div>Loading events...</div>;
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
          <Button onClick={() => setSelectedEvent({})}>Create New Event</Button>
          <h3 className="text-xl font-semibold mt-4 mb-2">Existing Events</h3>
          {events.map((event) => (
            <div key={event.id} className="border p-2 mb-2 rounded">
              <h4 className="font-semibold">{event.name}</h4>
              <p>{event.description}</p>
              <Button onClick={() => setSelectedEvent(event)} className="mt-2">
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManagement;