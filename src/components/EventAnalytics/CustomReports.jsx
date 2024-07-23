import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from '@/integrations/supabase';

const CustomReports = () => {
  const [reportType, setReportType] = useState('');
  const { data: events, isLoading, isError } = useEvents();

  const generateReport = () => {
    // This is where you'd generate the actual report based on the selected type
    // For now, we'll just log the report type
    console.log(`Generating ${reportType} report`);
  };

  if (isLoading) return <div>Loading events data...</div>;
  if (isError) return <div>Error loading events data</div>;

  return (
    <div className="space-y-4">
      <Select onValueChange={setReportType}>
        <SelectTrigger>
          <SelectValue placeholder="Select report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="attendees">Attendee Report</SelectItem>
          <SelectItem value="sales">Sales Report</SelectItem>
          <SelectItem value="feedback">Feedback Report</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={generateReport} disabled={!reportType}>Generate Report</Button>
    </div>
  );
};

export default CustomReports;