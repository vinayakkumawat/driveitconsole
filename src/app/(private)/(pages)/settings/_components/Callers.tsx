import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const Callers = () => {
  return (
    <div className="space-y-6 bg-white rounded-lg p-4">
      <h2 className="text-xl font-semibold text-right">מוקדן חדש</h2>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label className="text-right block mb-1">
            שם פרטי
            <span className="text-red-500 mr-1">*</span>
          </Label>
          <div className="relative">
            <Input value="משה" className="text-right pr-4 h-8" />
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
          <Label className="text-right block mb-1">
            שם משפחה
            <span className="text-red-500 mr-1">*</span>
          </Label>
          <div className="relative">
            <Input value="אייזנברג" className="text-right pr-4 h-8" />
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
          <Label className="text-right block mb-1">
            כתובת
            <span className="text-red-500 mr-1">*</span>
          </Label>
          <div className="relative">
            <Input value="עזרת תורה 8" className="text-right pr-4 h-8" />
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
            <Input value="ירושלים" className="text-right pr-4 h-8" />
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

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label className="text-right block mb-1">
            טלפון
            <span className="text-red-500 mr-1">*</span>
          </Label>
          <div className="relative">
            <Input value="משה" className="text-right pr-4 h-8" />
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
          <Label className="text-right block mb-1">
            טלפון נוסף
            <span className="text-red-500 mr-1">*</span>
          </Label>
          <div className="relative">
            <Input value="אייזנברג" className="text-right pr-4 h-8" />
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
          <Label className="text-right block mb-1">
            כתובת מייל
            <span className="text-red-500 mr-1">*</span>
          </Label>
          <div className="relative">
            <Input value="עזרת תורה 8" className="text-right pr-4 h-8" />
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

      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-right block mb-1">הערות</Label>
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

      {/* Username Section */}
      <div>
        <h3 className="text-lg font-semibold text-right mb-4">
          עדכון שם משתמש וסיסמה
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-right block mb-1">שם משתמש</Label>
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
            <Label className="text-right block mb-1">מספר מזהה</Label>
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
          <div className="flex items-center justify-end gap-2 mt-2">
            <Checkbox />
            <Label className="text-right">בחירת שם משתמש אקראי</Label>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="text-right block mb-1">סיסמה חדשה</Label>
          <div className="relative">
            <Input
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
          <Label className="text-right block mb-1">אישור סיסמה</Label>
          <div className="relative">
            <Input className="text-right pl-10 h-8" placeholder="8-16 תווים, זהים לסיסמה החדשה" />
            <Image
              src="/icons/edit-icon.svg"
              alt="Edit"
              width={20}
              height={20}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="flex justify-end items-end">
        <Button className="bg-[#FEF5E2] text-[#3E404C] h-8 px-12">
          עדכן פרטים
        </Button>
      </div>
      </div>
    </div>
  );
};

export default Callers;
