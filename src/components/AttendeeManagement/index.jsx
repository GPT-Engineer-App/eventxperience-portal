import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegistrationForm from './RegistrationForm';
import AttendeeProfile from './AttendeeProfile';
import CommunicationTools from './CommunicationTools';
import CheckInSystem from './CheckInSystem';
import FeedbackCollection from './FeedbackCollection';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  const handleRegistration = (data) => {
    const newAttendee = { id: Date.now(), ...data, checkedIn: false };
    setAttendees([...attendees, newAttendee]);
  };

  const handleEditAttendee = (updatedAttendee) => {
    setAttendees(attendees.map(a => a.id === updatedAttendee.id ? updatedAttendee : a));
    setSelectedAttendee(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendee Management</h1>
      <Tabs defaultValue="registration">
        <TabsList>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="profiles">Attendee Profiles</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="registration">
          <RegistrationForm onSubmit={handleRegistration} />
        </TabsContent>
        <TabsContent value="profiles">
          {selectedAttendee ? (
            <AttendeeProfile
              attendee={selectedAttendee}
              onEdit={() => setSelectedAttendee(null)}
            />
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-2">Attendee List</h2>
              <ul>
                {attendees.map(attendee => (
                  <li key={attendee.id} className="mb-2">
                    <button onClick={() => setSelectedAttendee(attendee)} className="text-blue-500 hover:underline">
                      {attendee.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>
        <TabsContent value="communication">
          <CommunicationTools attendees={attendees} />
        </TabsContent>
        <TabsContent value="checkin">
          <CheckInSystem attendees={attendees} />
        </TabsContent>
        <TabsContent value="feedback">
          <FeedbackCollection eventId="sample-event-id" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendeeManagement;