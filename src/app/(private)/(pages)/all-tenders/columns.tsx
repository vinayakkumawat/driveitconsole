"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export type AllTenders = {
    id: string
    tenderName: string
    serviceType: string
    publicationTime: string
    publicationDate: string
    status: "תפוס" | "בוצע" | "מבוטל" | "ממתין"
    driverName: string
}

export const columns: ColumnDef<AllTenders>[] = [
    {
        id: "actions2",
        cell: () => {
            return (
                <div className="">
                    <Image src="/icons/three-ellipse.svg" alt="edit" width={5} height={5} />
                </div>
            )
        },
    },
    {
        accessorKey: "tenderName",
        header: () => <div className="text-right">שם מכרז</div>,
    },
    {
        accessorKey: "serviceType",
        header: () => <div className="text-right">סוג שירות</div>,
    },
    {
        accessorKey: "publicationTime",
        header: () => <div className="text-right">שעת פרסום</div>,
        cell: ({ row }) => {
            return <div className="">{row.original.publicationTime} {row.original.publicationDate}</div>
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-right">סטטוס</div>,
    },
    {
        accessorKey: "driverName",
        header: () => <div className="text-right">נהג שקיבל את המכרז</div>,
    },
    {
        id: "actions",
        cell: () => {
            return (
                <div className="flex justify-end gap-2">
                    <Button variant={"secondary"} size={"icon"}>
                        <img src="/icons/stop-circle.svg" alt="edit" />
                    </Button>
                    <Button variant={"secondary"} size={"icon"}>
                        <img src="/icons/edit-icon.svg" alt="edit" />
                    </Button>
                    <Button variant={"secondary"} size={"icon"}>
                        <img src="/icons/delete-icon.svg" alt="edit" />
                    </Button>
                </div>
            )
        },
    },
]
