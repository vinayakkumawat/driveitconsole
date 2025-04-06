"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// This type can be moved to a separate types file later
type Station = {
  id: string;
  number: string;
  name: string;
  date: string;
};

const StationCard = ({ station }: { station: Station }) => {
  return (
    <div className="bg-white rounded-lg p-4 relative">
      <div className="absolute left-2 top-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>ערוך</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">מחק</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-col mb-4">
        <div className="bg-[#F9CF70] rounded-full p-3 h-12 w-12 mb-2">
          <Image
            src="/icons/station-icon.svg"
            alt="Station"
            width={24}
            height={24}
          />
        </div>
        <div className="text-sm text-gray-500 rtl">{station.date}</div>
      </div>

      <div className="text-start space-y-2">
        <div className="font-semibold rtl">תחנה מספר: {station.number}</div>
        <div className="text-sm rtl">{station.name}</div>
      </div>
    </div>
  );
};

const Stations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // This would come from an API in the real implementation
  const mockStations: Station[] = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      number: "15846",
      name: "יעקב בונים",
      date: "15/02/2020",
    }));

  return (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <div className="flex items-center justify-end gap-4">
        <div>
          <Button className="bg-[#F5D77D] text-black hover:bg-[#e6c86e] h-8 px-6">
            הוספת תחנה חדש
          </Button>
        </div>

        <div>
          <Popover>
            <PopoverTrigger>
              <div
                // onClick={onFilter}
                className="py-3 px-1 flex items-center gap-1 cursor-pointer"
              >
                <Image
                  src="/icons/filter-icon.svg"
                  alt="filter"
                  width={16}
                  height={16}
                />
                <span className="text-lg">סינון</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="px-4 py-6" align="end">
              <div className="flex flex-col gap-4">{/* content */}</div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
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
                <Input
                  placeholder="חיפוש..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full h-8"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-h-[60vh] overflow-y-auto">
        {mockStations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
};

export default Stations;
