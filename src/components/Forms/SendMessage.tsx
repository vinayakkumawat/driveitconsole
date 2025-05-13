"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormDataInputSingleElement from "@/components/ui/formDataInputSingleElement";
import { Label } from "../ui/label";
import { fetchApi } from "@/lib/api";
import { getCurrentUser, getCurrentCompanyId } from "@/lib/auth";

const sendMessageSchema = z.object({
  channel: z.string().optional(),
  driver: z.string().optional(),
  subject: z.string().min(1, "נושא נדרש"),
  message: z.string().min(1, "הודעה נדרשת"),
  comments: z.string().optional(),
});

type SendMessageFormValues = z.infer<typeof sendMessageSchema>;

interface SendMessageProps {
  onCancel: () => void;
}

const SendMessage = ({ onCancel }: SendMessageProps) => {
  const user = getCurrentUser();
  const companyId = getCurrentCompanyId();
  const [showComments, setShowComments] = useState(false);

  const form = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      channel: "", // default to all channels
      driver: "",
      subject: "",
      message: "",
      comments: "",
    },
  });

  async function onSubmit(values: SendMessageFormValues) {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) throw new Error("Authentication token not found");
      // Example API call, adjust endpoint and payload as needed
      await fetchApi("/send_message", {
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
        }),
      });
      onCancel();
    } catch (error) {
      console.error("Error sending message:", error);
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
        </div>
        <div className="flex justify-center items-center gap-2 px-8">
          <Button type="submit" className="w-full text-black h-8 bg-[#F9CF70] hover:bg-[#f7d98b]">שמור</Button>
          <Button type="button" onClick={onCancel} className="w-full text-black bg-secondary h-8">ביטול</Button>
        </div>
      </form>
    </Form>
  );
};

export default SendMessage;
