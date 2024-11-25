import React from 'react'
import Image from 'next/image'
import DataTable from './data-table'

const data = [
  {
    id: "1",
    driverName: "נחום שמואלי",
    residentialArea: "ירושלים",
    phone: "050.663.4258",
    additionalPhone: "055.363.2685",
    associatedWithAChannel: "2125869354",
    status: "לא פעיל",
  },
  {
    id: "2",
    driverName: "נחום שמואלי",
    residentialArea: "ירושלים",
    phone: "050.663.4258",
    additionalPhone: "055.363.2685",
    associatedWithAChannel: "2125869354",
    status: "לא פעיל",
  },
  {
    id: "3",
    driverName: "נחום שמואלי",
    residentialArea: "ירושלים",
    phone: "050.663.4258",
    additionalPhone: "055.363.2685",
    associatedWithAChannel: "2125869354",
    status: "לא פעיל",
  },
  {
    id: "4",
    driverName: "נחום שמואלי",
    residentialArea: "ירושלים",
    phone: "050.663.4258",
    additionalPhone: "055.363.2685",
    associatedWithAChannel: "2125869354",
    status: "לא פעיל",
  },
  {
    id: "5",
    driverName: "נחום שמואלי",
    residentialArea: "ירושלים",
    phone: "050.663.4258",
    additionalPhone: "055.363.2685",
    associatedWithAChannel: "2125869354",
    status: "לא פעיל",
  },
  // ...
]

const driversPage = () => {
  return (
    <>
      <div className='mr-80 flex flex-col gap-12'>
        <section className="flex flex-col gap-6 mx-20 mt-20">
          <div className="flex justify-between items-center gap-3 text-3xl border-b border-b-[#BCBCBC] relative">
            <div className="flex gap-6 mr-4">
              <div className="cursor-pointer py-3 px-1 flex gap-1 relative -bottom-[3px]">
                <span className="text-lg font-bold">כל הנהגים</span>
                <span className="text-lg text-[#9B9B9B]">(389)</span>
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

export default driversPage