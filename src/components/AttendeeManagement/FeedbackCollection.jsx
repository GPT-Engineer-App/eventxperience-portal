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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  overallExperience: z.enum(['1', '2', '3', '4', '5'], {
    required_error: "Please rate your overall experience.",
  }),
  contentQuality: z.enum(['1', '2', '3', '4', '5'], {
    required_error: "Please rate the content quality.",
  }),
  organizationQuality: z.enum(['1', '2', '3', '4', '5'], {
    required_error: "Please rate the organization quality.",
  }),
  comments: z.string().optional(),
});

const FeedbackCollection = ({ eventId }) => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      overallExperience: undefined,
      contentQuality: undefined,
      organizationQuality: undefined,
      comments: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the feedback to your backend
      console.log("Submitting feedback:", { eventId, ...data });
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your feedback.",
        status: "error",
      });
    }
  };

  const RatingField = ({ name, label }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-1"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <FormItem key={value}>
                  <FormControl>
                    <RadioGroupItem value={value.toString()} className="sr-only" />
                  </FormControl>
                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    {value}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <RatingField name="overallExperience" label="Overall Experience" />
        <RatingField name="contentQuality" label="Content Quality" />
        <RatingField name="organizationQuality" label="Organization Quality" />

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please share any additional feedback you have about the event"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit Feedback</Button>
      </form>
    </Form>
  );
};

export default FeedbackCollection;