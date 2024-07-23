import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RealTimeMetrics from './RealTimeMetrics';
import CustomReports from './CustomReports';
import DataVisualization from './DataVisualization';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("realtime");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Event Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="realtime">Real-time Metrics</TabsTrigger>
            <TabsTrigger value="reports">Custom Reports</TabsTrigger>
            <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
          </TabsList>
          <TabsContent value="realtime">
            <RealTimeMetrics />
          </TabsContent>
          <TabsContent value="reports">
            <CustomReports />
          </TabsContent>
          <TabsContent value="visualization">
            <DataVisualization />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard;