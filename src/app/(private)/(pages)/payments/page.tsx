"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Column, Action } from "@/lib/types";
import { DataTable } from "@/components/theme/DataTable";
import { fetchApi } from "@/lib/api";
import { getCurrentCompanyId } from "@/lib/auth";
// import PaymentActions from "@/components/Forms/PaymentActions";

interface PaymentData {
  id: number;
  company_id: number;
  amount: number;
  payment_date: string;
  payment_method: string;
  status: "מאושר" | "בטיפול" | "נדחה";
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

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [filteredData, setFilteredData] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPayments() {
      try {
        const companyId = getCurrentCompanyId();
        if (!companyId) {
          throw new Error("Company ID not found.");
        }

        const data = await fetchApi("/payments_view", {
          params: {
            company_id: `eq.${companyId}`,
          },
        });
        setPayments(data);
        setFilteredData(data);
      } catch (err) {
        setError("Error");
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  const handleApplyFilter = useCallback((filters: Record<string, string | boolean>) => {
    let filtered = payments;
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((driver) => {
          const filterValue = filters[key];
          if (typeof filterValue === "boolean") return true;
          return (driver[key as keyof PaymentData] as string)
            .toLowerCase()
            .includes((filterValue as string).toLowerCase());
        });
      }
    });
    setFilteredData(filtered);
  }, [payments]);

  const handleSearch = useCallback((query: string) => {
    if (query.trim() === "") {
      setFilteredData(payments);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = payments.filter(
        (data) =>
          data.amount.toString().includes(query) ||
          data.payment_date.includes(query) ||
          data.payment_method.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    }
  }, [payments]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns: Column<PaymentData>[] = [
    { key: "amount", header: "סכום" },
    { key: "payment_date", header: "תאריך התשלום" },
    { key: "payment_method", header: "שיטת התשלום" },
    {
      key: "status",
      header: "סטטוס",
      render: (value: string | number) => (
        <div
          className={`${
            value === "נדחה"
              ? "bg-[#FFF5E7] text-[#FF9500]"
              : value === "בטיפול"
              ? "bg-[#F0FFF1] text-[#2EBD32]"
              : "bg-[#F0FFF1] text-[#2EBD32]"
          } w-20 h-8 flex justify-center items-center rounded-lg`}
        >
          {value}
        </div>
      ),
    },
  ];

  const actions: Action<PaymentData>[] = [
    {
      icon: "/icons/open-eye.svg",
      alt: "see",
      form: <div>Component is hidden.</div>,
    },
    {
      icon: "/icons/edit-icon.svg",
      alt: "edit",
      onClick: (row) => console.log("Edit", row),
    },
  ];

  const filterOptions: {
    key: string;
    label: string;
    type: "text" | "checkbox";
  }[] = [
    { key: "amount", label: "סכום", type: "text" },
    { key: "payment_date", label: "תאריך התשלום", type: "text" },
    { key: "payment_method", label: "שיטת התשלום", type: "text" },
  ];

  return (
    <div className="mr-80 flex flex-col gap-12">
      <section className="flex flex-col gap-6 mx-20 mt-20">
      <DataTable
          data={filteredData}
          columns={columns}
          actions={actions}
          showCheckbox={true}
          title="כל התשלומים"
          subtitle="(389)"
          showSearch={true}
          showFilter={true}
          onSearch={handleSearch}
          onFilter={() => {}}
          filterOptions={filterOptions}
          onApplyFilter={handleApplyFilter}
        />
      </section>
    </div>
  );
}
