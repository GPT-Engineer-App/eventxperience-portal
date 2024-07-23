import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  specialNeeds: z.string().optional(),
});

const RegistrationForm = ({ onSubmit }) => {
  const [customFields, setCustomFields] = useState([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dietaryRequirements: "",
      specialNeeds: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      await onSubmit({ ...data, customFields });
      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted.",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration.",
        status: "error",
      });
    }
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const updateCustomField = (index, field, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dietaryRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Requirements (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any dietary requirements" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Needs (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special needs or accommodations" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {customFields.map((field, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => updateCustomField(index, 'name', e.target.value)}
            />
            <Input
              placeholder="Field Value"
              value={field.value}
              onChange={(e) => updateCustomField(index, 'value', e.target.value)}
            />
          </div>
        ))}

        <Button type="button" onClick={addCustomField}>Add Custom Field</Button>

        <Button type="submit">Submit Registration</Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;