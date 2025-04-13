"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Clock, PenToolIcon as Tool, Wrench } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Sample maintenance history data
const maintenanceHistory = [
  {
    id: 1,
    date: "2024-01-01",
    bike: "KTM 350 EXC-F",
    type: "Oil Change",
    hours: "25",
    notes: "Regular maintenance, used 10W-40 synthetic oil",
  },
  {
    id: 2,
    date: "2023-12-15",
    bike: "KTM 350 EXC-F",
    type: "Air Filter",
    hours: "20",
    notes: "Cleaned and re-oiled air filter",
  },
  {
    id: 3,
    date: "2023-12-01",
    bike: "Honda CRF450R",
    type: "Chain Maintenance",
    hours: "15",
    notes: "Adjusted chain tension and lubricated",
  },
];

// Sample bikes data
const bikes = [
  { id: "ktm-350", name: "KTM 350 EXC-F" },
  { id: "honda-450", name: "Honda CRF450R" },
  { id: "yamaha-250", name: "Yamaha YZ250F" },
];

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  bike: z.string().min(1, "Bike selection is required"),
  hours: z.string().min(1, "Hours are required"),
  type: z.string().min(1, "Maintenance type is required"),
  notes: z.string(),
});

export default function MaintenanceDashboard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="grid grid-cols-[1fr_400px] gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Vehicle Maintenance
          </h2>
          <p className="text-muted-foreground">
            Select a vehicle type to view and manage its maintenance schedule.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance History</CardTitle>
            <CardDescription>
              Recent maintenance records for all bikes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceHistory.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Wrench className="text-muted-foreground h-5 w-5" />
                          <div className="font-semibold">{record.type}</div>
                        </div>
                        <div className="text-muted-foreground flex items-center space-x-4 text-xs">
                          <Tool className="h-4 w-4" />
                          <span>{record.bike}</span>
                        </div>
                      </div>
                      <div className="text-muted-foreground grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>
                            {new Date(record.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{record.hours} hours</span>
                        </div>
                      </div>
                      {record.notes && (
                        <div className="text-muted-foreground text-sm">
                          {record.notes}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Log Maintenance</CardTitle>
          <CardDescription>
            Record your dirt bike maintenance details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="bike"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bike</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your bike" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bikes.map((bike) => (
                          <SelectItem key={bike.id} value={bike.id}>
                            {bike.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select maintenance type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="oil">Oil Change</SelectItem>
                        <SelectItem value="filter">Air Filter</SelectItem>
                        <SelectItem value="chain">Chain Maintenance</SelectItem>
                        <SelectItem value="tires">Tire Service</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine Hours</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Current engine hours</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Log Maintenance
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
