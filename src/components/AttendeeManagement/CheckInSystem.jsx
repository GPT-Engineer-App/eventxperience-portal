import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const CheckInSystem = ({ attendees }) => {
  const [checkInCode, setCheckInCode] = useState('');
  const { toast } = useToast();

  const generateCheckInCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCheckInCode(code);
  };

  const handleCheckIn = (attendeeId) => {
    // Here you would typically update the attendee's check-in status in your backend
    console.log(`Checking in attendee with ID: ${attendeeId}`);
    toast({
      title: "Check-in Successful",
      description: `Attendee ${attendeeId} has been checked in.`,
      status: "success",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Button onClick={generateCheckInCode}>Generate Check-in Code</Button>
        {checkInCode && (
          <div className="mt-4">
            <QRCodeSVG value={checkInCode} size={256} />
            <p className="mt-2">Check-in Code: {checkInCode}</p>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Manual Check-in</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter attendee ID"
            onChange={(e) => setCheckInCode(e.target.value)}
          />
          <Button onClick={() => handleCheckIn(checkInCode)}>Check In</Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Attendance List</h3>
        <ul>
          {attendees.map((attendee) => (
            <li key={attendee.id} className="flex justify-between items-center py-2">
              <span>{attendee.name}</span>
              <Button
                onClick={() => handleCheckIn(attendee.id)}
                disabled={attendee.checkedIn}
              >
                {attendee.checkedIn ? 'Checked In' : 'Check In'}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CheckInSystem;