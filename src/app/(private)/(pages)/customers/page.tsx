"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Column, Action } from "@/lib/types";
import { DataTable } from "@/components/theme/DataTable";
import { fetchApi } from "@/lib/api";
import DriverActions from "@/components/Forms/DriverActions";
import { Button } from "@/components/ui/button";

interface CustomerData {
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [filteredData, setFilteredData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const userStr = localStorage.getItem('auth-user');
        if (userStr) {
          const user = JSON.parse(userStr);
          const companyId = user.company_id;

          if (!companyId) throw new Error('Company ID is missing.');

          const data = await fetchApi("/customers_view", {
            params: {
              company_id: `eq.${companyId}`,
            },
          });
          setCustomers(data);
          setFilteredData(data);

        } else {
          throw new Error('User not found in localStorage.');
        }

      } catch (err) {
        setError("Error");
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const handleApplyFilter = useCallback(
    (filters: Record<string, string | boolean>) => {
      let filtered = customers;
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter((customer) => {
            const filterValue = filters[key];
            if (typeof filterValue === "boolean") return true;
            return (customer[key as keyof CustomerData] as string)
              .toLowerCase()
              .includes((filterValue as string).toLowerCase());
          });
        }
      });
      setFilteredData(filtered);
    },
    [customers]
  );

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim() === "") {
        setFilteredData(customers);
      } else {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = customers.filter(
          (customer) =>
            customer.id.toString().includes(query) ||
            customer.city.toLowerCase().includes(lowerCaseQuery) ||
            customer.phone.includes(query) ||
            customer.full_name.includes(query)
        );
        setFilteredData(filtered);
      }
    },
    [customers]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns: Column<CustomerData>[] = [
    { key: "id", header: "מספר סידורי" },
    { key: "full_name", header: "שם לקוח" },
    { key: "phone", header: "טלפון" },
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
    { key: "city", header: "עיר" },
    { key: "additional_phone", header: "טלפון נוסף" },
    { key: "channel", header: "ערוץ" },
  ];

  const actions: Action<CustomerData>[] = [
    {
      icon: "/icons/open-eye.svg",
      alt: "see",
      form: <DriverActions />,
    },
    {
        icon: "/icons/report-icon-black.svg",
        alt: "report",
        onClick: (row) => console.log("Report", row),
      },
    {
      icon: "/icons/delete-icon.svg",
      alt: "delete",
      onClick: (row) => console.log("Edit", row),
    },
    
  ];

  const filterOptions: {
    key: string;
    label: string;
    type: "text" | "checkbox";
  }[] = [
    { key: "id", label: "מספר סידורי", type: "text" },
    { key: "full_name", label: "שם לקוח", type: "text" },
    { key: "phone", label: "טלפון", type: "text" },
  ];

  return (
    <div className="mr-80 flex flex-col gap-12">
      <section className="flex flex-col gap-6 mx-20 mt-20">
        <DataTable
          data={filteredData}
          columns={columns}
          actions={actions}
          showCheckbox={true}
          title="כל הלקוחות"
          subtitle="(389)"
          showSearch={true}
          showFilter={true}
          onSearch={handleSearch}
          onFilter={() => {}}
          filterOptions={filterOptions}
          onApplyFilter={handleApplyFilter}
          extraButton={<Button className="text-black h-8 px-8">לקוח חדש</Button>}
        />
      </section>
    </div>
  );
}
