"use client";

import React, { useState, useCallback } from "react";
import { Column, Action } from "@/lib/types";
import { DataTable } from "@/components/theme/DataTable";
// import { fetchApi } from "@/lib/api";
// import { getCurrentCompanyId } from "@/lib/auth";
// import PaymentActions from "@/components/Forms/PaymentActions";

interface PaymentRow {
  id: number;
  serial_number: string;
  customer_name: string;
  phone: string;
  additional_phone: string;
  city: string;
  status: "יתרה" | "חוב";
  balance_amount: string;
  debt_amount: string;
}

const dummyData: PaymentRow[] = [
  {
    id: 1,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "לקוחות",
    status: "חוב",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 2,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "נהגים",
    status: "יתרה",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 3,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "לקוחות",
    status: "חוב",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 4,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "לקוחות",
    status: "יתרה",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 5,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "לקוחות",
    status: "יתרה",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 6,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "נהגים",
    status: "חוב",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 7,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "נהגים",
    status: "חוב",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 8,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "נהגים",
    status: "יתרה",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
  {
    id: 9,
    serial_number: "1123658",
    customer_name: "משה אבוטבול",
    phone: "050.7765842",
    additional_phone: "050.7765842",
    city: "נהגים",
    status: "חוב",
    balance_amount: "₪ 1,890",
    debt_amount: "₪ 1,890",
  },
];

export default function PaymentsPage() {
  // API code (keep for future use, as in DriversPage)
  // const [payments, setPayments] = useState<PaymentRow[]>([]);
  // const [filteredData, setFilteredData] = useState<PaymentRow[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   async function loadPayments() {
  //     try {
  //       const companyId = getCurrentCompanyId();
  //       if (!companyId) throw new Error("Company ID not found.");
  //       const data = await fetchApi("/payments_view", { params: { company_id: `eq.${companyId}` } });
  //       setPayments(data);
  //       setFilteredData(data);
  //     } catch (err) {
  //       setError("Error");
  //       console.error("Error fetching payments:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadPayments();
  // }, []);

  const [filteredData, setFilteredData] = useState<PaymentRow[]>(dummyData);

  const handleApplyFilter = useCallback((filters: Record<string, string | boolean>) => {
    let filtered = dummyData;
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((row) => {
          const filterValue = filters[key];
          if (typeof filterValue === "boolean") return true;
          return (row[key as keyof PaymentRow] as string)
            .toLowerCase()
            .includes((filterValue as string).toLowerCase());
        });
      }
    });
    setFilteredData(filtered);
  }, []);

  const handleSearch = useCallback((query: string) => {
    if (query.trim() === "") {
      setFilteredData(dummyData);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = dummyData.filter(
        (row) =>
          row.customer_name.toLowerCase().includes(lowerCaseQuery) ||
          row.phone.includes(query) ||
          row.serial_number.includes(query)
      );
      setFilteredData(filtered);
    }
  }, []);

  const columns: Column<PaymentRow>[] = [
    { key: "serial_number", header: "מספר סידורי" },
    { key: "customer_name", header: "שם לקוח" },
    { key: "phone", header: "טלפון" },
    { key: "additional_phone", header: "טלפון נוסף" },
    { key: "city", header: "עיר" },
    {
      key: "status",
      header: "סטטוס",
      render: (value: string | number) => {
        const statusValue = String(value);
        return (
          <span style={{ color: statusValue === "חוב" ? "#FF3B30" : "#2EBD32", fontWeight: 500 }}>{statusValue}</span>
        );
      },
    },
    { key: "balance_amount", header: "סכום יתרה" },
    { key: "debt_amount", header: "סכום חוב" },
  ];

  const actions: Action<PaymentRow>[] = [
    {
      icon: "/icons/edit-icon.svg",
      alt: "edit",
      onClick: (row) => console.log("Edit", row),
    },
    {
      icon: "/icons/open-eye.svg",
      alt: "see",
      form: <div>Component is hidden.</div>, // Replace with your actual view component
    },
  ];

  const filterOptions: {
    key: string;
    label: string;
    type: "text" | "checkbox";
  }[] = [
    { key: "serial_number", label: "מספר סידורי", type: "text" },
    { key: "customer_name", label: "שם לקוח", type: "text" },
    { key: "phone", label: "טלפון", type: "text" },
    { key: "city", label: "עיר", type: "text" },
    { key: "status", label: "סטטוס", type: "text" },
  ];

  return (
    <div className="mr-80 flex flex-col gap-12" dir="rtl">
      <section className="flex flex-col gap-6 mx-20 mt-20">
        <DataTable
          data={filteredData}
          columns={columns}
          actions={actions}
          showCheckbox={false}
          title="יתרות / חובות"
          subtitle={`(${filteredData.length})`}
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
