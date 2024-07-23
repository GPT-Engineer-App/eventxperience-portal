import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from '@/integrations/supabase';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const DataExport = () => {
  const { data: events, isLoading, isError } = useEvents();
  const [exportFormat, setExportFormat] = React.useState('');

  if (isLoading) return <div>Loading export data...</div>;
  if (isError) return <div>Error loading export data</div>;

  const exportData = () => {
    switch (exportFormat) {
      case 'csv':
        exportCSV();
        break;
      case 'excel':
        exportExcel();
        break;
      case 'pdf':
        exportPDF();
        break;
      default:
        console.log('Please select an export format');
    }
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + events.map(e => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "event_data.csv");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(events);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Events");
    XLSX.writeFile(wb, "event_data.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [Object.keys(events[0])],
      body: events.map(Object.values),
    });
    doc.save("event_data.pdf");
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={setExportFormat}>
        <SelectTrigger>
          <SelectValue placeholder="Select export format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="csv">CSV</SelectItem>
          <SelectItem value="excel">Excel</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={exportData} disabled={!exportFormat}>Export Data</Button>
    </div>
  );
};

export default DataExport;