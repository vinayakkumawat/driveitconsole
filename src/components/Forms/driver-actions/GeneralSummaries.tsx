"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const GeneralSummaries = () => {
  return (
    <div dir="rtl">
      <div className="bg-white py-4 px-6 rounded-lg w-full">
        <div className="grid grid-cols-3">
          <div>
            <span className="text-lg">סיכום נסיעות:</span>
          </div>
          <div className="flex flex-col">
            <span>סה”כ נסיעות</span>
            <span className="text-3xl font-semibold">259</span>
          </div>
          <div className="flex flex-col">
            <span>חודש נוכחי</span>
            <span className="text-3xl font-semibold">28</span>
          </div>
        </div>

        <div className="grid grid-cols-2 bg-[#FF0004]/10 p-2 my-4">
          <div className="flex justify-center">
            <div className="flex flex-col items-center border-l border-[#FF0004] w-full">
              <div className="flex flex-col">
                <span>חיובים קבועים:</span>
                <span className="text-xl font-medium">
                  <span className="text-sm mr-1">₪</span>250
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="">
              <div className="flex flex-col">
                <span>חיובים משתנים:</span>
                <span className="text-xl font-medium">
                  <span className="text-sm mr-1">₪</span>250
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 bg-[#2EBD32]/10 p-2 my-4">
          <div className="flex justify-center">
            <div className="flex flex-col items-center border-l border-[#2EBD32] w-full">
              <div className="flex flex-col">
                <span>חיובים קבועים:</span>
                <span className="text-xl font-medium">
                  <span className="text-sm mr-1">₪</span>250
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="">
              <div className="flex flex-col">
                <span>חיובים משתנים:</span>
                <span className="text-xl font-medium">
                  <span className="text-sm mr-1">₪</span>250
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 p-2 my-4">
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <span>יתרה קודמת</span>
              <span className="text-xl font-medium">
                <span className="text-sm mr-1">₪</span>950
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <span>סיכום סופי</span>
              <span className="text-xl font-medium">
                <span className="text-sm mr-1">₪</span>0
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="w-1/2 text-black h-8">הצג פירוט</Button>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <div className="flex items-center gap-2 space-x-2">
          <div className="flex items-center rotate-180">
            <Switch id="driverDisabling" dir="ltr" />
          </div>
          <Label htmlFor="driverDisabling" className="text-base">
            השבתת נהג
          </Label>
        </div>
        <Button className="w-1/2 text-black h-8">עדכון תשלום</Button>
      </div>
    </div>
  );
};

export default GeneralSummaries;
