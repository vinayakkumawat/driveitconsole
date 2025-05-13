"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormDataInputSingleElement from "@/components/ui/formDataInputSingleElement";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { fetchApi } from "@/lib/api";
import { getCurrentUser, getCurrentCompanyId } from "@/lib/auth";

const messageToDriverSchema = z.object({
  channel: z.string().optional(),
  driver: z.string().optional(),
  subject: z.string().min(1, "נושא נדרש"),
  message: z.string().min(1, "הודעה נדרשת"),
  comments: z.string().optional(),
  schedule: z.boolean().optional(),
  schedule_time: z.string().optional(),
  schedule_date: z.string().optional(),
});

type MessageToDriverFormValues = z.infer<typeof messageToDriverSchema>;

interface MessageToDriverProps {
  onCancel: () => void;
}

const MessageToDriver = ({ onCancel }: MessageToDriverProps) => {
  const user = getCurrentUser();
  const companyId = getCurrentCompanyId();
  const [showComments, setShowComments] = useState(false);

  const form = useForm<MessageToDriverFormValues>({
    resolver: zodResolver(messageToDriverSchema),
    defaultValues: {
      channel: "",
      driver: "",
      subject: "",
      message: "",
      comments: "",
      schedule: false,
      schedule_time: "",
      schedule_date: "",
    },
  });

  async function onSubmit(values: MessageToDriverFormValues) {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) throw new Error("Authentication token not found");
      await fetchApi("/send_message_to_driver", {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          company_id: companyId,
          user_id: user?.id,
          channel: values.channel,
          driver: values.driver,
          subject: values.subject,
          message: values.message,
          comments: values.comments,
          schedule: values.schedule,
          schedule_time: values.schedule_time,
          schedule_date: values.schedule_date,
        }),
      });
      onCancel();
    } catch (error) {
      console.error("Error sending message to driver:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full" dir="rtl">
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-scroll">
          <div className="w-full flex flex-col gap-2">
            <Label className="font-bold">שליחת הודעות</Label>
            <div className="bg-white py-4 px-6 grid grid-cols-1 gap-y-4 rounded-lg w-full">
              <FormDataInputSingleElement
                form={form}
                name="channel"
                label="שיוך לערוץ"
                inputType="text"
                placeholder="ברירת מחדל - פרסום ההודעה בכל הערוצים"
              />
              <FormDataInputSingleElement
                form={form}
                name="driver"
                label="שיוך לנהג"
                inputType="text"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label className="font-bold">הודעה</Label>
            <div className="bg-white py-4 px-6 grid grid-cols-1 gap-y-4 rounded-lg w-full">
              <FormDataInputSingleElement
                form={form}
                name="subject"
                label="נושא"
                inputType="text"
                required
              />
              <FormDataInputSingleElement
                form={form}
                name="message"
                label="הודעה"
                inputType="textarea"
                required
              />
              <div className="flex items-center cursor-pointer select-none" onClick={() => setShowComments((v) => !v)}>
                <span className="ml-2">הערות</span>
                <span className={`transition-transform ${showComments ? 'rotate-90' : ''}`}>{'<'}</span>
              </div>
              {showComments && (
                <FormDataInputSingleElement
                  form={form}
                  name="comments"
                  label="הערות"
                  inputType="text"
                />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="bg-white py-4 px-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg w-full items-center">
              <div className="flex items-center gap-2 col-span-2">
                <Checkbox
                  id="schedule"
                  checked={form.watch('schedule')}
                  onCheckedChange={(checked) => form.setValue('schedule', checked as boolean)}
                />
                <Label htmlFor="schedule" className="cursor-pointer">תזמון הודעה</Label>
              </div>
              {form.watch('schedule') && (
                <>
                  <FormDataInputSingleElement
                    form={form}
                    name="schedule_time"
                    label="שעה"
                    inputType="time"
                  />
                  <FormDataInputSingleElement
                    form={form}
                    name="schedule_date"
                    label="תאריך"
                    inputType="date"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 px-8">
          <Button type="submit" className="w-full text-black h-8 bg-[#F9CF70] hover:bg-[#f7d98b]">שמור</Button>
          <Button type="button" onClick={onCancel} className="w-full text-black bg-secondary h-8">ביטול</Button>
        </div>
      </form>
    </Form>
  );
};

export default MessageToDriver;
