"use client";

import React from "react";
import Image from "next/image";
import { fetchApi } from "@/lib/api";
import { getCurrentCompanyId } from "@/lib/auth";
import { DataTable } from "@/components/theme/DataTable";
import { Action, Column } from "@/lib/types";

interface Data {
  id?: number;
  company_id: number;
  status: string;
  total_trips: number;
  total_price: number;
}

// const STATUS_MAP: Record<number, { label: string; color: string }> = {
//   1: { label: "ממתין", color: "bg-blue-100 text-blue-600" },
//   2: { label: "תפוס", color: "bg-red-100 text-red-600" },
//   3: { label: "הסתיים", color: "bg-blue-100 text-blue-600" },
//   4: { label: "מבוטל", color: "bg-orange-100 text-orange-600" },
// };

export default function Home() {
  const [tripSummary, setTripSummary] = React.useState<
    {
      company_id: number;
      status: string;
      total_trips: number;
      total_price: number;
    }[]
  >([]);

  React.useEffect(() => {
    const fetchTripSummary = async () => {
      try {
        const companyId = getCurrentCompanyId();
        if (!companyId) {
          throw new Error("Company ID not found.");
        }

        const data = await fetchApi("/daily_trip_summary", {
          params: {
            company_id: `eq.${companyId}`,
          },
        });
        setTripSummary(data);
      } catch (error) {
        console.error("Error fetching trip summary:", error);
      }
    };

    fetchTripSummary();
  }, []);

  const getStatusCount = (status: string) => {
    const statusData = tripSummary.find((item) => item.status === status);
    return statusData?.total_trips || 0;
  };

  const getTotalPrice = () => {
    return tripSummary.reduce((sum, item) => sum + (item.total_price || 0), 0);
  };

  const columns: Column<Data>[] = [
    { key: "company_id", header: "" },
    { key: "total_trips", header: "" },
    { key: "total_price", header: "" },
    {
      key: "status",
      header: "",
      render: (value: string | number | undefined) => (
        <div
          className={`${
            value === "לא פעיל"
              ? "bg-[#FFF5E7] text-[#FF9500]"
              : "bg-[#F0FFF1] text-[#2EBD32]"
          } w-20 h-8 flex justify-center items-center rounded-lg`}
        >
          {value}
        </div>
      ),
    },
  ];

  const actions: Action<Data>[] = [
    {
      icon: "/icons/stop-circle.svg",
      alt: "see",
      text: "עצירה",
      form: <div />,
    },
    {
      icon: "/icons/edit-icon.svg",
      alt: "edit",
      text: "עריכה",
      onClick: (row) => console.log("Edit", row),
    },
    {
      icon: "/icons/delete-icon.svg",
      alt: "report",
      text: "מחיקה",
      onClick: (row) => console.log("Report", row),
    },
  ];

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
              <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-primary">
                <button className="absolute top-3 left-4">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    width={20}
                    height={20}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">
                    {getStatusCount("לא פעיל")}
                  </span>
                  <span className="text-xl font-light">נסיעות פעילות</span>
                </div>
              </div>

              <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                <button className="absolute top-3 left-4">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    width={20}
                    height={20}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">
                    {getStatusCount("לא פעיל")}
                  </span>
                  <span className="text-xl font-light">נסיעות ממתינות</span>
                </div>
              </div>

              <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                <button className="absolute top-3 left-4">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    width={20}
                    height={20}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">
                    {getStatusCount("לא פעיל")}
                  </span>
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
              <h2 className="text-foreground font-medium">נסיעות פעילות</h2>
              <span className="text-accent">({tripSummary.length})</span>
            </div>

            <div className="">
              {/* <BidTable /> */}
              <DataTable
                data={tripSummary}
                columns={columns}
                showCheckbox={true}
                actions={actions}
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

// const StatusBadge = ({ status }: { status: number }) => {
//   const { label, color } = STATUS_MAP[status] || {
//     label: "לא ידוע",
//     color: "bg-gray-100 text-gray-600",
//   };
//   return (
//     <span className={`px-3 py-1 rounded-md text-sm font-medium ${color}`}>
//       {label}
//     </span>
//   );
// };

// const bids = [
//   { id: 1, status: 3 },
//   { id: 2, status: 4 },
//   { id: 3, status: 2 },
//   { id: 4, status: 1 },
// ];

// // const BidTable = () => {
// //   return (
// //     <table className="min-w-full border rounded-md" dir="rtl">
// //       <thead>
// //         <tr className="bg-gray-100 text-right">
// //           <th className="px-4 py-2">#</th>
// //           <th className="px-4 py-2">סטטוס</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {bids.map((bid) => (
// //           <tr key={bid.id} className="border-b">
// //             <td className="px-4 py-2">{bid.id}</td>
// //             <td className="px-4 py-2">
// //               <StatusBadge status={bid.status} />
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // };
