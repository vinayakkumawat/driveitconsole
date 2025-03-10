"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import FormDataInputSingleElement from "@/components/ui/formDataInputSingleElement";
import { Label } from "../ui/label";
import { API_BASE_URL, API_TOKEN } from "@/lib/api";
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
  const form = useForm<TripFormValues>({
    resolver: zodResolver(TripFormSchema),
    defaultValues: {
      company_id: undefined,
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
      scheduled_immediate: "",
      date: "",
      time: "",
      sendremindertodriver: false,
      bringing_driver_id: undefined,
      driver_phone_number: "",
      dynamic_phone: "",
      user_id: undefined,
      scheduled: false,
    },
  });

  async function onSubmit(values: TripFormValues) {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formattedData = {
        company_id: "",
        first_name: "",
        last_name: "",
        address: "",
        city: values.from_city,
        serial_number: "",
        channel: "",
        vehicle_type: "",
        number_of_seats: 0,
        category: "",
        vehicle_status: "",
        email: "",
        phone: "",
        additional_phone: "",
        fixed_charge: 0,
        variable_charge: 0,
        scheduled: values.scheduled,
      };

      const response = await fetch(
        `${API_BASE_URL}/rpc/create_driver_with_charge`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create driver");
      }

      onCancel();
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-scroll p-1">
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
              />
              <FormDataInputSingleElement
                form={form}
                name="driver_id"
                label="שיוך הנסיעה לנהג"
                inputType="driver"
                required
              />
              <FormDataInputSingleElement
                form={form}
                name="customer_type"
                label="סוג לקוח"
                inputType="select"
              />
              <FormDataInputSingleElement
                form={form}
                name="customer_id"
                label="בחירת לקוח"
                inputType="select"
              />
              <div className="col-span-2">
                <FormDataInputSingleElement
                  form={form}
                  name="contact_phone"
                  label="טלפון ליצירת קשר"
                  inputType="select"
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
                name="from_city"
                label="מעיר"
                inputType="city"
              />
              <FormDataInputSingleElement
                form={form}
                name="to_city"
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
