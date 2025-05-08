import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from '@/hooks/use-toast';

interface DepositFormProps {
  method: string;
  title: string;
  extraData?: Record<string, any>;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  transactionId: z.string().min(3, { message: "Transaction ID is required" }),
  receipt: z.instanceof(File).optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const DepositForm = ({ method, title, extraData }: DepositFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      transactionId: "",
      notes: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submission data:", { ...data, method, ...extraData });

    toast({
      title: "Deposit submitted successfully!",
      description: `Your ${title} request has been received.`,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-xl font-semibold">{title} Submission</h3>

        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deposit Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transactionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction ID / Reference</FormLabel>
                <FormControl>
                  <Input placeholder="Enter transaction ID" {...field} />
                </FormControl>
                <FormDescription>
                  Use the reference ID from your payment confirmation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <Label htmlFor="receipt">Upload Receipt (Optional)</Label>
            <Input
              id="receipt"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  form.setValue("receipt", file);
                }
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Any extra information..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Submit Deposit
        </Button>
      </form>
    </Form>
  );
};

export default DepositForm;
