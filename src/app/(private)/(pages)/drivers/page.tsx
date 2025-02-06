"use client";

import React, { useState, useEffect } from "react";
import { Column, Action } from "@/lib/types";
import { DataTable } from "@/components/theme/DataTable";
import { fetchApi } from "@/lib/api";

interface DriverData {
  id: number;
  company_id: number;
  full_name: string;
  city: string;
  phone: string;
  additional_phone: string;
  channel: string;
  status: "פעיל" | "לא פעיל";
}

// const data: DriverData[] = [
//   {
//     id: "1",
//     driverName: "אבי כהן",
//     residentialArea: "תל אביב",
//     phone: "052.123.4567",
//     additionalPhone: "054.987.6543",
//     associatedWithAChannel: "987654321",
//     status: "פעיל",
//   },
//   {
//     id: "2",
//     driverName: "יוסי לוי",
//     residentialArea: "חיפה",
//     phone: "053.321.6789",
//     additionalPhone: "056.654.3210",
//     associatedWithAChannel: "876543210",
//     status: "לא פעיל",
//   },
//   {
//     id: "3",
//     driverName: "דני פרץ",
//     residentialArea: "באר שבע",
//     phone: "050.111.2222",
//     additionalPhone: "058.333.4444",
//     associatedWithAChannel: "765432109",
//     status: "פעיל",
//   },
//   {
//     id: "4",
//     driverName: "רוני ישראלי",
//     residentialArea: "נתניה",
//     phone: "051.222.3333",
//     additionalPhone: "059.444.5555",
//     associatedWithAChannel: "654321098",
//     status: "לא פעיל",
//   },
//   {
//     id: "5",
//     driverName: "משה דנינו",
//     residentialArea: "אשדוד",
//     phone: "055.333.4444",
//     additionalPhone: "057.555.6666",
//     associatedWithAChannel: "543210987",
//     status: "פעיל",
//   },
//   {
//     id: "6",
//     driverName: "יונתן רז",
//     residentialArea: "רמת גן",
//     phone: "054.444.5555",
//     additionalPhone: "052.666.7777",
//     associatedWithAChannel: "432109876",
//     status: "לא פעיל",
//   },
//   {
//     id: "7",
//     driverName: "אורן שמש",
//     residentialArea: "פתח תקווה",
//     phone: "053.555.6666",
//     additionalPhone: "051.777.8888",
//     associatedWithAChannel: "321098765",
//     status: "פעיל",
//   },
//   {
//     id: "8",
//     driverName: "גבי שלמה",
//     residentialArea: "הרצליה",
//     phone: "052.666.7777",
//     additionalPhone: "050.888.9999",
//     associatedWithAChannel: "210987654",
//     status: "לא פעיל",
//   },
//   {
//     id: "9",
//     driverName: "תומר נקש",
//     residentialArea: "כפר סבא",
//     phone: "051.777.8888",
//     additionalPhone: "053.999.0000",
//     associatedWithAChannel: "109876543",
//     status: "פעיל",
//   },
//   {
//     id: "10",
//     driverName: "אלון בן עמי",
//     residentialArea: "רעננה",
//     phone: "050.888.9999",
//     additionalPhone: "054.000.1111",
//     associatedWithAChannel: "098765432",
//     status: "לא פעיל",
//   },
// ];

const DriversPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [filteredData, setFilteredData] = useState<DriverData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDrivers() {
      try {
        const userStr = localStorage.getItem("auth-user");
        if (userStr) {
          // const user = JSON.parse(userStr);
          // const companyId = user.company_id;
          const companyId = "1";

          if (!companyId) throw new Error("Company ID is missing.");

          try {
            const data = await fetchApi("/drivers_view", {
              params: {
                company_id: `eq.${companyId}`,
              },
            });
            setDrivers(data);
            setFilteredData(data);
          } catch (error) {
            console.error("Error fetching drivers:", error);
            setError("Error: Try again later.");
            throw error;
          }
        } else {
          throw new Error("User not found in localStorage.");
        }
      } catch (err) {
        setError("Error");
        console.error("Error fetching tenders:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDrivers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns: Column<DriverData>[] = [
    { key: "full_name", header: "שם נהג" },
    { key: "city", header: "אזור מגורים" },
    { key: "phone", header: "טלפון" },
    { key: "additional_phone", header: "טלפון נוסף" },
    { key: "channel", header: "משוייך לערוץ" },
    {
      key: "status",
      header: "סטטוס",
      render: (value: string | number) => (
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

  const actions: Action<DriverData>[] = [
    {
      icon: "/icons/open-eye.svg",
      alt: "see",
      onClick: (row) => console.log("View", row),
    },
    {
      icon: "/icons/file-list-icon.svg",
      alt: "edit",
      onClick: (row) => console.log("Edit", row),
    },
    {
      icon: "/icons/report-icon-black.svg",
      alt: "report",
      onClick: (row) => console.log("Report", row),
    },
  ];

  const filterOptions: { key: string; label: string; type: "text" | "checkbox" }[] = [
      { key: "id", label: "מספר סידורי", type: "text" },
      { key: "full_name", label: "שם נהג", type: "text" },
      { key: "phone", label: "טלפון", type: "text" },
    ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(drivers);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = drivers.filter(
        (driver) =>
          driver.full_name.toLowerCase().includes(lowerCaseQuery) ||
          driver.city.toLowerCase().includes(lowerCaseQuery) ||
          driver.phone.includes(query) ||
          driver.additional_phone.includes(query) ||
          driver.channel.includes(query)
      );
      setFilteredData(filtered);

      if (false) console.log(searchQuery);
    }
  };

  const handleApplyFilter = (filters: Record<string, string | boolean>) => {
    let filtered = drivers;
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((driver) => {
          const filterValue = filters[key];
          if (typeof filterValue === "boolean") return true;
          return (driver[key as keyof DriverData] as string).toLowerCase().includes(filterValue.toLowerCase());
        });
      }
    });
    setFilteredData(filtered);
  };

  return (
    <div className="mr-80 flex flex-col gap-12">
      <section className="flex flex-col gap-6 mx-20 mt-20">
        <DataTable
          data={filteredData}
          columns={columns}
          actions={actions}
          showCheckbox={true}
          title="כל הנהגים"
          subtitle="(389)"
          showSearch={true}
          showFilter={true}
          onSearch={handleSearch}
          onFilter={() => console.log("Filter clicked")}
          filterOptions={filterOptions}
          onApplyFilter={handleApplyFilter}
        />
      </section>
    </div>
  );
};

export default DriversPage;
