"use client";

import React from "react";
import Image from "next/image";
import { fetchApi } from "@/lib/api";
import { getCurrentCompanyId } from "@/lib/auth";
import { DataTable } from "@/components/theme/DataTable";
import { Column } from "@/lib/types";

interface TripSummary {
  company_id: number;
  status: number;
  total_trips: number;
  total_price: number;
}

interface TripDetail {
  id?: string | number;
  company_id: number;
  route: string;
  service_type: string;
  service_date: string;
  status: number;
  actions?: undefined;
}

const STATUS_MAP: Record<number, { label: string; color: string }> = {
  1: { label: "ממתין", color: "bg-blue-100 text-blue-600" },
  2: { label: "פעיל", color: "bg-yellow-200 text-yellow-700" },
  3: { label: "הסתיים", color: "bg-green-100 text-green-600" },
  4: { label: "מבוטל", color: "bg-orange-100 text-orange-600" },
};

const StatusBadge = ({ status }: { status: number }) => {
  const { label, color } = STATUS_MAP[status] || {
    label: "לא ידוע",
    color: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-3 py-1 rounded-md text-sm font-medium ${color}`}>
      {label}
    </span>
  );
};

export default function Home() {
  const [tripSummary, setTripSummary] = React.useState<TripSummary[]>([]);
  const [tripDetails, setTripDetails] = React.useState<TripDetail[]>([]);
  const [selectedStatus, setSelectedStatus] = React.useState<number | null>(null);
  const [filteredTrips, setFilteredTrips] = React.useState<TripDetail[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = getCurrentCompanyId();
        if (!companyId) throw new Error("Company ID not found.");
        // Fetch summary
        const summary = await fetchApi("/daily_trip_summary", {
          params: { company_id: `eq.${companyId}` },
        });
        setTripSummary(summary);
        // Fetch details
        let details = await fetchApi("/daily_trip_details", {
          params: { company_id: `eq.${companyId}` },
        });
        // Add synthetic id if not present
        details = details.map((item: TripDetail, idx: number) => ({ ...item, id: idx }));
        setTripDetails(details);
        setFilteredTrips(details);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (selectedStatus) {
      setFilteredTrips(tripDetails.filter(trip => trip.status === selectedStatus));
    } else {
      setFilteredTrips(tripDetails);
    }
  }, [selectedStatus, tripDetails]);

  const getStatusCount = (status: number) => {
    const summary = tripSummary.find(item => item.status === status);
    return summary ? summary.total_trips : 0;
  };

  const getTotalPrice = () => {
    return tripSummary.reduce((sum, item) => sum + (item.total_price || 0), 0);
  };

  const columns: Column<TripDetail>[] = [
    { key: "route", header: "מסלול" },
    { key: "service_type", header: "סוג שירות" },
    { key: "service_date", header: "תאריך שירות" },
    {
      key: "status",
      header: "סטטוס",
      render: (value) => typeof value === 'number' ? <StatusBadge status={value} /> : null,
    },
  ];
  const actionColumn: Column<TripDetail> = {
    key: "actions",
    header: "",
    render: (_, row) => (
      <div className="flex gap-2">
        <button
          className="bg-[#F8F5ED] border border-[#E6D7B8] text-[#3E404C] rounded-md px-4 py-2 flex items-center gap-2 hover:drop-shadow-md transition-all duration-200"
          onClick={() => console.log('Stop', row)}
        >
          <Image src="/icons/stop-circle.svg" alt="עצירה" width={20} height={20} />
          <span className="text-lg font-medium ml-2">עצירה</span>
        </button>
        <button
          className="bg-[#F8F5ED] border border-[#E6D7B8] text-[#3E404C] rounded-md px-4 py-2 flex items-center gap-2 hover:drop-shadow-md transition-all duration-200"
          onClick={() => console.log('Edit', row)}
        >
          <Image src="/icons/edit-icon.svg" alt="עריכה" width={20} height={20} />
          <span className="text-lg font-medium ml-2">עריכה</span>
        </button>
        <button
          className="bg-[#F8F5ED] border border-[#E6D7B8] text-[#3E404C] rounded-md px-4 py-2 flex items-center gap-2 hover:drop-shadow-md transition-all duration-200"
          onClick={() => console.log('Delete', row)}
        >
          <Image src="/icons/delete-icon.svg" alt="מחיקה" width={20} height={20} />
          <span className="text-lg font-medium ml-2">מחיקה</span>
        </button>
      </div>
    ),
  };

  const handleStatusBoxClick = (status: number) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  return (
    <>
      <div className="mr-80 flex flex-col gap-12">
        <div className="flex flex-col gap-20 mt-20">
          <section className="flex flex-col gap-4 mt-20 mx-20">
            <div className="flex justify-start items-center gap-3 text-3xl">
              <h2 className="text-foreground font-medium">סטטיסטיקה יומית</h2>
              <span className="text-accent">
                {new Date().toLocaleDateString("he-IL")}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div
                className={`relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 ${selectedStatus === 1 ? 'bg-primary' : 'bg-white border-r-4 border-r-primary'}`}
                onClick={() => handleStatusBoxClick(1)}
              >
                <button className="absolute top-3 left-4">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    width={20}
                    height={20}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">{getStatusCount(1)}</span>
                  <span className="text-xl font-light">נסיעות ממתינות</span>
                </div>
              </div>
              <div
                className={`relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 ${selectedStatus === 2 ? 'bg-primary' : 'bg-white border-r-4 border-r-primary'}`}
                onClick={() => handleStatusBoxClick(2)}
              >
                <button className="absolute top-3 left-4">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    width={20}
                    height={20}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">{getStatusCount(2)}</span>
                  <span className="text-xl font-light">נסיעות פעילות</span>
                </div>
              </div>
              <div
                className={`relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 ${selectedStatus === 3 ? 'bg-primary' : 'bg-white border-r-4 border-r-primary'}`}
                onClick={() => handleStatusBoxClick(3)}
              >
                <button className="absolute top-3 left-4">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    width={20}
                    height={20}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">{getStatusCount(3)}</span>
                  <span className="text-xl font-light">נסיעות שהסתיימו</span>
                </div>
              </div>
              <button className="h-48 w-72 p-8 bg-[#ECE9E2] flex justify-center items-center border-2 border-primary rounded-lg hover:drop-shadow-lg transition-all duration-200">
                <span className="text-2xl font-medium">{getTotalPrice()}</span>
              </button>
            </div>
          </section>
          <section className="flex flex-col gap-6 mx-20 mb-20">
            <div className="flex justify-start items-center gap-3 text-3xl">
              <h2 className="text-foreground font-medium">פירוט נסיעות</h2>
              <span className="text-accent">({filteredTrips.length})</span>
            </div>
            <div className="">
              <DataTable
                data={filteredTrips}
                columns={[...columns, actionColumn]}
                showCheckbox={true}
                showSearch={false}
                showFilter={false}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
