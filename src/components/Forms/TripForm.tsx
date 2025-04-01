"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { fetchApi } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import FormDataInputSingleElement from "@/components/ui/formDataInputSingleElement";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

const TripFormSchema = z.object({
  company_id: z.number(),
  driver_id: z.number().optional(),
  service_type: z.string().optional(),
  price: z.number().min(0).step(0.01).optional(),
  channel: z.string().optional(),
  customer_type: z.string().optional(),
  customer_id: z.string().optional(),
  contact_phone: z.string().optional(),
  from_city: z.string().optional(),
  from_full_address: z.string().optional(),
  to_city: z.string().optional(),
  to_full_address: z.string().optional(),
  notes_to_driver: z.string().optional(),
  scheduled_immediate: z.string().optional(),
  date: z.string().optional(), // For date type
  time: z.string().optional(), // For time type
  sendremindertodriver: z.boolean().optional(),
  bringing_driver_id: z.number().optional(),
  driver_phone_number: z.string().optional(),
  dynamic_phone: z.string().optional(),
  user_id: z.number().optional(),
  scheduled: z.boolean().optional(),
});

type TripFormValues = z.infer<typeof TripFormSchema>;

interface TripProps {
  onCancel: () => void;
}

const TripForm = ({ onCancel }: TripProps) => {
  const { user } = useAuth();
  const form = useForm<TripFormValues>({
    resolver: zodResolver(TripFormSchema),
    defaultValues: {
      company_id: user?.company_id ? Number(user.company_id) : 0,
      driver_id: undefined,
      service_type: "",
      price: 0,
      channel: "",
      customer_type: "",
      customer_id: "",
      contact_phone: "",
      from_city: "",
      from_full_address: "",
      to_city: "",
      to_full_address: "",
      notes_to_driver: "",
      scheduled_immediate: "Immediate",
      date: "",
      time: "",
      sendremindertodriver: false,
      bringing_driver_id: undefined,
      driver_phone_number: "",
      dynamic_phone: "",
      user_id: user?.id ? Number(user.id) : 0,
      scheduled: false,
    },
  });

  async function onSubmit(values: TripFormValues) {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      // Format the date and time if scheduled
      let formattedDate = values.date;
      let formattedTime = values.time;
      if (values.scheduled && values.date && values.time) {
        formattedDate = new Date(values.date).toISOString().split('T')[0];
        formattedTime = values.time + ":00"; // Add seconds for proper format
      }

      const formattedData = {
        company_id: values.company_id,
        ...(values.driver_id && { driver_id: values.driver_id }),
        ...(values.service_type && { service_type: values.service_type }),
        ...(values.price && { price: values.price }),
        ...(values.channel && { channel: values.channel }),
        ...(values.customer_type && { customer_type: values.customer_type }),
        ...(values.customer_id && { customer_id: values.customer_id }),
        ...(values.contact_phone && { contact_phone: values.contact_phone }),
        ...(values.from_city && { from_city: values.from_city }),
        ...(values.from_full_address && { from_full_address: values.from_full_address }),
        ...(values.to_city && { to_city: values.to_city }),
        ...(values.to_full_address && { to_full_address: values.to_full_address }),
        ...(values.notes_to_driver && { notes_to_driver: values.notes_to_driver }),
        scheduled_immediate: values.scheduled ? "Scheduled" : "Immediate",
        ...(values.scheduled && values.date && { date: formattedDate }),
        ...(values.scheduled && values.time && { time: formattedTime }),
        ...(values.sendremindertodriver && { sendremindertodriver: values.sendremindertodriver }),
        ...(values.bringing_driver_id && { bringing_driver_id: values.bringing_driver_id }),
        ...(values.driver_phone_number && { driver_phone_number: values.driver_phone_number }),
        ...(values.dynamic_phone && { dynamic_phone: values.dynamic_phone }),
        ...(values.user_id && { user_id: values.user_id })
      };

      await fetchApi('/trip_data', {
        method: 'POST',
        headers: {
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(formattedData)
      });

      toast.success("Trip created successfully");
      onCancel();
    } catch (error) {
      console.error("Error creating trip:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create trip");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-scroll p-1">
          <div className="w-full flex flex-col gap-2">
            <Label className="font-bold">נסיעה חדשה</Label>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label className="font-medium">פרטי נסיעה</Label>
            <div className="bg-white py-4 px-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg w-full">
              {/* Using Child Component */}
              <div className="col-span-2">
                <FormDataInputSingleElement
                  form={form}
                  name="channel"
                  label="שיוך לערוץ"
                  inputType="channel"
                  placeholder="ברירת מחדל - פרסום בכל הערוצים"
                />
              </div>
              <FormDataInputSingleElement
                form={form}
                name="service_type"
                label="סוג שירות"
                inputType="select"
                selectOptions={[{ value: "נסיעה", label: "נסיעה" }, { value: "מיוחד", label: "מיוחד" }, { value: "אחר", label: "אחר" }]}
              />
              <FormDataInputSingleElement
                form={form}
                name="bringing_driver_id"
                label="שיוך הנסיעה לנהג"
                inputType="driver"
                required
              />
              <FormDataInputSingleElement
                form={form}
                name="customer_type"
                label="סוג לקוח"
                inputType="select"
                selectOptions={[{ value: "לקוח מזדמן", label: "לקוח מזדמן" }, { value: "לקוח קבוע", label: "לקוח קבוע" }]}
              />
              <FormDataInputSingleElement
                form={form}
                name="customer_id"
                label="בחירת לקוח"
                inputType="customer"
              />
              <div className="col-span-2">
                <FormDataInputSingleElement
                  form={form}
                  name="contact_phone"
                  label="טלפון ליצירת קשר"
                  inputType="text"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label className="font-bold">תכנון נסיעה</Label>
            <div className="bg-white py-4 px-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg w-full">
              {/* Using Child Component */}
              <FormDataInputSingleElement
                form={form}
                name="date"
                label="מעיר"
                inputType="city"
              />
              <FormDataInputSingleElement
                form={form}
                name="time"
                label="לעיר"
                inputType="city"
              />
              <FormDataInputSingleElement
                form={form}
                name="from_full_address"
                label="כתובת"
                inputType="street"
              />
              <FormDataInputSingleElement
                form={form}
                name="to_full_address"
                label="כתובת"
                inputType="street"
              />
            </div>
          </div>

          <div className="w-full flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span>מיידי</span>
              <div className="flex items-center rotate-180">
                <Switch id="scheduled" dir="ltr" checked={form.watch('scheduled')} onCheckedChange={(checked) => form.setValue('scheduled', checked)} />
              </div>
              <span>מתוזמן</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="font-semibold text-lg">סכום לתשלום:</Label>
              <FormField
                control={form.control}
                name={"price"}
                render={({}) => (
                  <FormItem>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder=""
                          className="pl-6 bg-white h-8 w-28 border border-[#F9CF70]"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                          ₪
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {form.watch('scheduled') && (
            <div className="w-full flex flex-col gap-2">
              <Label className="font-bold">תזמון נסיעה</Label>
              <div className="bg-white py-4 px-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg w-full">
                {/* Using Child Component */}
                <FormDataInputSingleElement
                  form={form}
                  name="from_city"
                  label="תאריך"
                  inputType="date"
                />
                <FormDataInputSingleElement
                  form={form}
                  name="to_city"
                  label="שעה"
                  inputType="text"
                />
                <div className="flex items-center gap-2 space-x-2 my-4">
                  <Checkbox id="reminderToDriver" />
                  <label
                    htmlFor="ExportReportsWithoutSelectingDate"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    שליחת תזכורת לנהג
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col gap-2">
            <div className="bg-white py-4 px-6 grid grid-cols-1 gap-y-4 rounded-lg w-full">
              <div className="flex gap-2 items-center">
                <div className="w-full flex flex-col gap-2">
                  <FormDataInputSingleElement
                    form={form}
                    name="notes_to_driver"
                    label="הערות לנהג"
                    inputType="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 px-8">
          <Button type="submit" className="w-full text-black h-8">
            שמור
          </Button>
          <Button
            onClick={onCancel}
            className="w-full text-black bg-secondary h-8"
          >
            ביטול
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TripForm;
