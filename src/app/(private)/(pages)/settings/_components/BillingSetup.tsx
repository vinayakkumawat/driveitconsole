import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BillingSetup = () => {
  return (
    <div className="space-y-8 bg-white rounded-lg p-4">
      {/* Fixed Payments Section */}
      <div>
        <h2 className="text-xl font-semibold text-right mb-4">
          תשלומים קבועים
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4">
          <div>
            <Label>תשלום דמי חבר קבוע</Label>
            <div className="relative">
              <Input className="text-right pr-4 h-8" />
              <Image
                src="/icons/edit-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div>
            <Label>תשלומי אחזקה</Label>
            <div className="relative">
              <Input className="text-right pr-4 h-8" />
              <Image
                src="/icons/edit-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div className="flex justify-center items-end h-full w-full">
            <Button className="bg-[#FEF5E2] text-[#3E404C] h-8 w-full">
              {" "}
              שדה תשלום חדש
            </Button>
          </div>
        </div>
      </div>

      {/* Regular Payments Section */}
      <div>
        <h2 className="text-xl font-semibold text-right mb-4">תשלום פרטיים</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>תשלום קבוע</Label>
            <div className="relative">
              <Input className="text-right pr-4 h-8" />
              <Image
                src="/icons/edit-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div>
            <Label>תשלום קבוע</Label>
            <div className="relative">
              <Input className="text-right pr-4 h-8" />
              <Image
                src="/icons/edit-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div>
            <Label>אחזורי נסיעות</Label>
            <div className="relative">
              <Input className="text-right pr-4 h-8" />
              <Image
                src="/icons/edit-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payments by Value Section */}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-right mb-4">
            תשלומים לפי ערוץ
          </h2>
          <div className="">
            <Popover>
              <PopoverTrigger>
                <div className="cursor-pointer py-3 px-1 flex items-center gap-1 font-light">
                  <Image
                    src="/icons/search-icon.svg"
                    alt="filter"
                    width={100}
                    height={100}
                    className="w-4 h-4"
                  />
                  <span className="text-lg">חיפוש</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-1" align="end">
                <div className="flex items-center gap-2">
                  <Input placeholder="חיפוש..." className="w-full h-8" />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-50 rounded-lg p-4 border-r-4 border-[#F9CF70]"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>מספר ערוץ</span>
                  <span className="font-semibold">655</span>
                </div>
                <div className="flex justify-between">
                  <span>עלות דמי חבר</span>
                  <span className="font-semibold">158.5 ₪</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start gap-4">
        <Button className="bg-[#FEF5E2] text-[#3E404C] h-8 px-12">הוספת ערוץ חדש</Button>
      </div>
    </div>
  );
};

export default BillingSetup;
