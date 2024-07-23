import React from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import DataExport from './DataExport';

const EventAnalytics = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Event Analytics</h1>
      <AnalyticsDashboard />
      <DataExport />
    </div>
  );
};

export default EventAnalytics;