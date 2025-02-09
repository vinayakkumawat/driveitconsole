"use client";

import React from "react";
import { Label } from "../ui/label";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UrgentlyLeave from "./driver-actions/UrgentlyLeave";
import GeneralSummaries from "./driver-actions/GeneralSummaries";

const DriverActions = () => {
  

  return (
    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-scroll no-scrollbar space-y-8 w-full">
      <div className="w-full flex flex-col gap-2">
        <Label className="font-bold">פרטי הנהג</Label>
        <div className="bg-white py-4 px-6 flex justify-between rounded-lg w-full">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 bg-muted rounded-full">
              <div className="absolute right-0 top-0 w-4 h-4 bg-[#FF0004] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">משה אייזנברך</span>
              <span className="font-medium text-xs">
                052.223.6359 | ירושלים
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex items-start mt-1">
              <Image
                src={"/icons/star-colored.svg"}
                alt={"star"}
                width={15}
                height={15}
              />
              <Image
                src={"/icons/star-colored.svg"}
                alt={"star"}
                width={15}
                height={15}
              />
              <Image
                src={"/icons/star-colored.svg"}
                alt={"star"}
                width={15}
                height={15}
              />
              <Image
                src={"/icons/star.svg"}
                alt={"star"}
                width={15}
                height={15}
              />
              <Image
                src={"/icons/star.svg"}
                alt={"star"}
                width={15}
                height={15}
              />
            </div>
            <span className="font-light">(180)</span>
          </div>
          <div className="bg-[#FDECC6] p-2 rounded-lg">
            <Image
              src={"/icons/messages.svg"}
              alt={"edit"}
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>

      <div>
        <Tabs defaultValue="StationSelection" className="w-full">
          <TabsList className="flex justify-between px-8 w-full border-b border-[#BCBCBC] bg-background">
            <TabsTrigger
              value="ReportsAndActions"
              className="data-[state=active]:border-b-4 py-[6px] data-[state=active]:border-[#F9CF70] text-xl"
            >
              דוחות ופעולות
            </TabsTrigger>
            <TabsTrigger
              value="Payments"
              className="data-[state=active]:border-b-4 py-[6px] data-[state=active]:border-[#F9CF70] text-xl"
            >
              תשלומים
            </TabsTrigger>
            <TabsTrigger
              value="Moredetails"
              className="data-[state=active]:border-b-4 py-[6px] data-[state=active]:border-[#F9CF70] text-xl"
            >
              פרטים נוספים
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ReportsAndActions" className="my-6">
            <div>
              <Tabs defaultValue="StationSelection" className="w-full">
                <TabsList className="w-full bg-white h-12">
                  <TabsTrigger
                    value="UrgentlyLeave"
                    className="data-[state=active]:bg-[#3E404C] data-[state=active]:text-background text-lg w-full"
                  >
                    ייצאו דחוחות
                  </TabsTrigger>
                  <TabsTrigger
                    value="GeneralSummaries"
                    className="data-[state=active]:bg-[#3E404C] data-[state=active]:text-background text-lg w-full"
                  >
                    סיכומים כללים
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="UrgentlyLeave" className="my-4">
                  <UrgentlyLeave />
                </TabsContent>

                <TabsContent value="GeneralSummaries" className="my-4">
                    <GeneralSummaries />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="Payments" className="my-6">
            <div>These components are hidden.</div>
          </TabsContent>
          <TabsContent value="Moredetails" className="my-6">
            <div>These components are hidden.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DriverActions;
