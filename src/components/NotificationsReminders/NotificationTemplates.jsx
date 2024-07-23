import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const templates = [
  { id: 1, name: 'Event Reminder', content: 'Don\'t forget about {eventName} on {eventDate}!' },
  { id: 2, name: 'Event Update', content: 'Important update for {eventName}: {updateDetails}' },
  { id: 3, name: 'Event Cancellation', content: 'We regret to inform you that {eventName} has been cancelled.' },
];

const NotificationTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizedContent, setCustomizedContent] = useState('');
  const { toast } = useToast();

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === parseInt(templateId));
    setSelectedTemplate(template);
    setCustomizedContent(template ? template.content : '');
  };

  const handleContentChange = (e) => {
    setCustomizedContent(e.target.value);
  };

  const handleSaveTemplate = () => {
    // Here you would typically save the customized template to your backend
    console.log('Saving customized template:', { ...selectedTemplate, content: customizedContent });
    toast({
      title: "Template Saved",
      description: "Your customized template has been saved successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={handleTemplateSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map(template => (
            <SelectItem key={template.id} value={template.id.toString()}>{template.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTemplate && (
        <>
          <Textarea
            value={customizedContent}
            onChange={handleContentChange}
            placeholder="Customize your template here"
            rows={5}
          />
          <Button onClick={handleSaveTemplate}>Save Customized Template</Button>
        </>
      )}
    </div>
  );
};

export default NotificationTemplates;