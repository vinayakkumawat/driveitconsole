"use client";

import React, { useState, useCallback } from "react";
import { Column, Action } from "@/lib/types";
import { DataTable } from "@/components/theme/DataTable";

interface DriverData {
  id: number;
  full_name: string;
  city: string;
  phone: string;
  additional_phone: string;
  channel: string;
  status: string;
}

const Drivers = () => {
  const [filteredData, setFilteredData] = useState<DriverData[]>([]);

  // Mock data for initial development
  const mockDrivers: DriverData[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      full_name: "משה אייזנבר",
      city: "ירושלים",
      phone: "055.363.2685",
      additional_phone: "055.363.2685",
      channel: "1205852",
      status: "לא פעיל",
    }));

  const handleSearch = useCallback((query: string) => {
    if (query.trim() === "") {
      setFilteredData(mockDrivers);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = mockDrivers.filter(
        (driver) =>
          driver.full_name.toLowerCase().includes(lowerCaseQuery) ||
          driver.city.toLowerCase().includes(lowerCaseQuery) ||
          driver.phone.includes(query) ||
          driver.additional_phone.includes(query) ||
          driver.channel.includes(query)
      );
      setFilteredData(filtered);
    }
  }, []);

  const handleApplyFilter = useCallback(
    (filters: Record<string, string | boolean>) => {
      let filtered = mockDrivers;
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter((driver) => {
            const filterValue = filters[key];
            if (typeof filterValue === "boolean") return true;
            return (driver[key as keyof DriverData] as string)
              .toLowerCase()
              .includes((filterValue as string).toLowerCase());
          });
        }
      });
      setFilteredData(filtered);
    },
    []
  );

  const columns: Column<DriverData>[] = [
    { key: "full_name", header: "שם נהג" },
    { key: "city", header: "אזור מגורים" },
    { key: "phone", header: "טלפון" },
    { key: "additional_phone", header: "טלפון נוסף" },
    { key: "channel", header: "משוייך לתחנה" },
    {
      key: "status",
      header: "סטטוס",
      render: (value: string | number) => (
        <div className="flex items-center gap-2">
          <div className="bg-[#FEF5E2] text-[#FF9500] px-3 py-1 rounded-lg text-sm">
            {value}
          </div>
        </div>
      ),
    },
  ];

  const actions: Action<DriverData>[] = [
    {
      icon: "/icons/open-eye.svg",
      alt: "see",
      onClick: (row) => console.log("File", row),
    },
    {
      icon: "/icons/file-list-icon.svg",
      alt: "edit",
      onClick: (row) => console.log("List", row),
    },
    {
      icon: "/icons/report-icon-black.svg",
      alt: "report",
      onClick: (row) => console.log("View", row),
    },
  ];

  const filterOptions = [
    { key: "full_name", label: "שם נהג", type: "text" as const },
    { key: "city", label: "אזור מגורים", type: "text" as const },
    { key: "phone", label: "טלפון", type: "text" as const },
    { key: "channel", label: "משוייך לתחנה", type: "text" as const },
  ];

  return (
    <div className="overflow-x-scroll">
      <DataTable
        data={filteredData.length > 0 ? filteredData : mockDrivers}
        columns={columns}
        actions={actions}
        showCheckbox={true}
        title="נהגים"
        showSearch={true}
        showFilter={true}
        onSearch={handleSearch}
        onFilter={() => {}}
        filterOptions={filterOptions}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
};

export default Drivers;
