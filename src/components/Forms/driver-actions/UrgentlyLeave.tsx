'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const UrgentlyLeave = () => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  return (
    <div dir="rtl">
      <div className="bg-white py-4 px-6 rounded-lg w-full">
        {/* Using Child Component */}
        <Label className="font-semibold text-xl">בחר טווח תאריכים:</Label>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm">תאריך התחלה:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {startDate ? format(startDate, "PPP") : <span></span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm">תאריך סיום:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {endDate ? format(endDate, "PPP") : <span></span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center gap-2 space-x-2 my-4">
          <Checkbox id="terms" />
          <label
            htmlFor="ExportReportsWithoutSelectingDate"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            ייצוא דוחות ללא בחירת תאריך
          </label>
        </div>

        <div className="flex flex-col gap-1 mt-6">
          <div className="flex items-center gap-2 space-x-2 bg-background p-4">
            <Checkbox id="DetailsOfTripsTaken" />
            <label
              htmlFor="ExportReportsWithoutSelectingDate"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              פירוט נסיעות שלקח
            </label>
          </div>
          <div className="flex items-center gap-2 space-x-2 bg-background p-4">
            <Checkbox id="DetailsOfTripsBrought" />
            <label
              htmlFor="ExportReportsWithoutSelectingDate"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              פירוט נסיעות שהביא
            </label>
          </div>
          <div className="flex items-center gap-2 space-x-2 bg-background p-4">
            <Checkbox id="DetailsOfOperations" />
            <label
              htmlFor="ExportReportsWithoutSelectingDate"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              פירוט נסיעות שהביא
            </label>
          </div>
          <div className="flex items-center gap-2 space-x-2 bg-background p-4">
            <Checkbox id="ActionDetails" />
            <label
              htmlFor="ExportReportsWithoutSelectingDate"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              פירוט פעולות (מורחב)
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="w-1/2 text-black h-8">ייצוא ושליחה למייל</Button>
      </div>
    </div>
  );
};

export default UrgentlyLeave;
