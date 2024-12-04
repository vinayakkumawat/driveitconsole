import React from 'react'
import DataTable from './data-table'
import Image from 'next/image'
import { Button } from '@/components/ui/button';

interface DriverData {
    id: string;
    serialNumber: number;
    driverName: string;
    permanent: number;
    requiredVariables: number;
    rightVariables: number;
    previousBalance: number;
    numberOfTrips: number;
    total: number;
}

const data: DriverData[] = [
    {
        id: "1",
        serialNumber: 744242,
        driverName: "משה רוט",
        permanent: 220,
        requiredVariables: 2200,
        rightVariables: 2600,
        previousBalance: 0,
        numberOfTrips: 25,
        total: 400,
    },
    {
        id: "2",
        serialNumber: 744242,
        driverName: "משה רוט",
        permanent: 220,
        requiredVariables: 2200,
        rightVariables: 2600,
        previousBalance: 0,
        numberOfTrips: 25,
        total: 400,
    },
    {
        id: "3",
        serialNumber: 744242,
        driverName: "משה רוט",
        permanent: 220,
        requiredVariables: 2200,
        rightVariables: 2600,
        previousBalance: 0,
        numberOfTrips: 25,
        total: 400,
    },
    {
        id: "5",
        serialNumber: 744242,
        driverName: "משה רוט",
        permanent: 220,
        requiredVariables: 2200,
        rightVariables: 2600,
        previousBalance: 0,
        numberOfTrips: 25,
        total: 400,
    },
    {
        id: "5",
        serialNumber: 744242,
        driverName: "משה רוט",
        permanent: 220,
        requiredVariables: 2200,
        rightVariables: 2600,
        previousBalance: 0,
        numberOfTrips: 25,
        total: 400,
    },
    // ...
]

const driverReport = () => {
    return (
        <>
            <div className='mr-80 flex flex-col gap-12'>
                <section className="flex flex-col gap-6 mx-20 mt-20">
                    <div className="flex justify-between items-center gap-3 text-3xl border-b border-b-[#BCBCBC] relative">
                        <div className="flex gap-6 mr-4">
                            <div className="cursor-pointer py-3 px-1 flex gap-1 relative -bottom-[3px]">
                                <span className="text-lg font-bold">דוחות נהגים</span>
                                <span className="text-lg text-[#9B9B9B]">(כל הנהגים)</span>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="cursor-pointer py-3 px-1 flex items-center gap-1 font-light">
                                <Image src="/icons/filter-icon.svg" alt="filter" width={100} height={100} className="w-4 h-4" />
                                <span className="text-lg">סינון</span>
                            </div>
                            <div className="cursor-pointer py-3 px-1 flex items-center gap-1 font-light">
                                <Image src="/icons/search-icon.svg" alt="filter" width={100} height={100} className="w-4 h-4" />
                                <span className="text-lg">חיפוש</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <DataTable data={data} />
                    </div>

                    <div className='flex justify-end gap-2'>
                        <Button className='text-black'>הדפסה<Image src={"/icons/print.svg"} alt='print' height={20} width={20} /></Button>
                        <Button className='text-black'>PDF<Image src={"/icons/pdf.svg"} alt='print' height={20} width={20} /></Button>
                        <Button className='text-black'>אקסל<Image src={"/icons/excel.svg"} alt='print' height={20} width={20} /></Button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default driverReport