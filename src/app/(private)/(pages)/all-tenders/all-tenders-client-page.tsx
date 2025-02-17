'use client';

import { useState } from "react";
import { DataTable } from "@/components/theme/DataTable";
import { ApiTenderData, TenderData, Column, Action } from "@/lib/types";
import { transformTenderData } from "@/lib/transformData";

interface TenderPageClientProps {
    initialTenders: ApiTenderData[];
}

export function TenderPageClient({ initialTenders }: TenderPageClientProps) {
    const [tenders] = useState(() => transformTenderData(initialTenders));

    const columns: Column<TenderData>[] = [
        { key: "tenderName", header: "שם מכרז" },
        { key: "serviceType", header: "סוג שירות" },
        { key: "publicationTime", header: "שעת פרסום" },
        {
            key: "status",
            header: "סטטוס",
            render: (status: string | number) => (
                <div className={`${
                    status === "תפוס" 
                        ? "bg-[#FFE7E7] text-[#FF0004]" 
                        : "bg-[#F0FFF1] text-[#2EBD32]"
                } w-20 h-8 flex justify-center items-center rounded-lg`}
                >
                    {status}
                </div>
            ),
        },
        { key: "driverName", header: "נהג שקיבל את המכרז" },
    ];

    const actions: Action<TenderData>[] = [
        {
            icon: "/icons/stop-circle.svg",
            alt: "stop",
            onClick: (row: TenderData) => console.log("Stop", row),
        },
        {
            icon: "/icons/edit-icon.svg",
            alt: "edit",
            onClick: (row: TenderData) => console.log("Edit", row),
        },
        {
            icon: "/icons/delete-icon.svg",
            alt: "delete",
            onClick: (row: TenderData) => console.log("Delete", row),
        },
    ];

    return (
        <div className="mr-80 flex flex-col gap-12">
            <section className="flex flex-col gap-6 mx-20 mt-20">
                <DataTable
                    data={tenders}
                    columns={columns}
                    actions={actions}
                    title="כל המכרזים"
                    subtitle={`(${tenders.length})`}
                    filterOptions={[]}
                    onApplyFilter={function (filters: Record<string, string | boolean>): void {
                        console.log(filters);
                    } }                />
            </section>
        </div>
    );
}