import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";

const Channels = () => {
  return (
    <div className="space-y-6 bg-white rounded-lg p-4">
      <h2 className="text-xl font-semibold text-right">הוספת ערוץ חדש</h2>

      {/* Channel Manager Details */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-right block mb-1">שם מנהל הערוץ</Label>
            <div className="relative">
              <Input placeholder="משה" className="text-right pr-4 h-8" />
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
            <Label className="text-right block mb-1">שם משפחה</Label>
            <div className="relative">
              <Input placeholder="אייזנברג" className="text-right pr-4 h-8" />
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
            <Label className="text-right block mb-1">כתובת</Label>
            <div className="relative">
              <Input
                placeholder="עזרת תורה 8"
                className="text-right pr-4 h-8"
              />
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
            <Label className="text-right block mb-1">עיר</Label>
            <div className="relative">
              <Input placeholder="ירושלים" className="text-right pr-4 h-8" />
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

        {/* Phone Numbers Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-right block mb-1">טלפון</Label>
            <div className="relative">
              <Input placeholder="משה" className="text-right pr-4 h-8" />
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
            <Label className="text-right block mb-1">טלפון נוסף</Label>
            <div className="relative">
              <Input
                placeholder="אייזנברג"
                className="text-right pr-4 h-8"
              />
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
            <Label className="text-right block mb-1">כתובת מייל</Label>
            <div className="relative">
              <Input
                placeholder="עזרת תורה 8"
                className="text-right pr-4 h-8"
              />
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
            <Label className="text-right block mb-1">שדה חדש</Label>
            <div className="relative">
              <Input className="text-right pr-4 h-8" />
              <Image
                src="/icons/plus-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Channel Details */}
      <div>
        <h3 className="text-lg font-semibold text-right mb-4">פרטי הערוץ</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-right block mb-1">שם הערוץ</Label>
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
            <Label className="text-right block mb-1">כינוי הערוץ</Label>
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
            <Label className="text-right block mb-1">מספר זיהוי הערוץ</Label>
            <div className="relative">
              <Input
                placeholder="8-16 תווים"
                className="text-right pr-4 h-8"
              />
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
            <Label className="text-right block mb-1">שדה חדש</Label>
            <div className="relative">
              <Input className="text-right pr-4 h-8" />
              <Image
                src="/icons/plus-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="px-10 py-2 bg-[#F5D77D] text-black hover:bg-[#e6c86e] h-8">
          צור ערוץ חדש
        </Button>
      </div>
    </div>
  );
};

export default Channels;
