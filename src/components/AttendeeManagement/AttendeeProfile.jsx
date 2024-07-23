import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AttendeeProfile = ({ attendee, onEdit }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Attendee Profile</span>
          <Button onClick={onEdit}>Edit</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Name:</strong> {attendee.name}</p>
          <p><strong>Email:</strong> {attendee.email}</p>
          <p><strong>Phone:</strong> {attendee.phone || 'N/A'}</p>
          <p><strong>Dietary Requirements:</strong> {attendee.dietaryRequirements || 'None'}</p>
          <p><strong>Special Needs:</strong> {attendee.specialNeeds || 'None'}</p>
          {attendee.customFields && attendee.customFields.map((field, index) => (
            <p key={index}><strong>{field.name}:</strong> {field.value}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendeeProfile;