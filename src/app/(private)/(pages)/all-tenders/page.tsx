import React from 'react'
import Image from 'next/image'
import DataTable from './data-table'

interface TenderData {
    id: string;
    tenderName: string;
    serviceType: string;
    publicationTime: string;
    publicationDate: string;
    status: 'תפוס' | 'פנוי';
    driverName: string;
}

const data: TenderData[] = [
    {
        id: "728ed52f",
        tenderName: "ב”ש - ת”א",
        serviceType: "משלוח",
        publicationTime: "11:01",
        publicationDate: "01.08.2024",
        status: "תפוס",
        driverName: "משה כהן | 055.7759685",
    },
    {
        id: "728ed52f",
        tenderName: "ב”ש - ת”א",
        serviceType: "משלוח",
        publicationTime: "11:01",
        publicationDate: "01.08.2024",
        status: "תפוס",
        driverName: "משה כהן | 055.7759685",
    },
    {
        id: "728ed52f",
        tenderName: "ב”ש - ת”א",
        serviceType: "משלוח",
        publicationTime: "11:01",
        publicationDate: "01.08.2024",
        status: "תפוס",
        driverName: "משה כהן | 055.7759685",
    },
    {
        id: "728ed52f",
        tenderName: "ב”ש - ת”א",
        serviceType: "משלוח",
        publicationTime: "11:01",
        publicationDate: "01.08.2024",
        status: "תפוס",
        driverName: "משה כהן | 055.7759685",
    },
    {
        id: "728ed52f",
        tenderName: "ב”ש - ת”א",
        serviceType: "משלוח",
        publicationTime: "11:01",
        publicationDate: "01.08.2024",
        status: "תפוס",
        driverName: "משה כהן | 055.7759685",
    }
    // ...
]

const allTendersPage = async () => {

    return (
        <>
            <div className='mr-80 flex flex-col gap-12'>
                <section className="flex flex-col gap-6 mx-20 mt-20">
                    <div className="flex justify-between items-center gap-3 text-3xl border-b border-b-[#BCBCBC] relative">
                        <div className="flex gap-6 mr-4">
                            <div className="cursor-pointer py-3 px-1 flex gap-1 border-b-[4px] border-b-[#F9CF70] relative -bottom-[3px]">
                                <span className="text-lg">כל המכרזים</span>
                                <span className="text-lg text-[#9B9B9B]">(58)</span>
                            </div>
                            <div className="cursor-pointer py-3 px-1 flex gap-1 relative -bottom-[3px] font-light">
                                <span className="text-lg">מכרזים פעילים</span>
                                <span className="text-lg text-[#9B9B9B]">(32)</span>
                            </div>
                            <div className="cursor-pointer py-3 px-1 flex gap-1 relative -bottom-[3px] font-light">
                                <span className="text-lg">מכרזים שהסתיימו</span>
                                <span className="text-lg text-[#9B9B9B]">(29)</span>
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
                </section>
            </div>
        </>
    )
}

export default allTendersPage