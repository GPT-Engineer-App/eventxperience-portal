import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEvents } from '@/integrations/supabase';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataVisualization = () => {
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) return <div>Loading chart data...</div>;
  if (isError) return <div>Error loading chart data</div>;

  const chartData = {
    labels: events.map(event => event.name),
    datasets: [
      {
        label: 'Attendees',
        data: events.map(event => event.attendees?.length || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Ticket Sales',
        data: events.map(event => event.ticketsSold || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Event Performance',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default DataVisualization;