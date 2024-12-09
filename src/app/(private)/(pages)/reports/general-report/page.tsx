import React from 'react'
import Image from 'next/image'
import CustomBarChart from './bar-chart'
import CustomPieChart from './pie-chart'

const generalReportPage = () => {
    return (
        <div className="mr-80 flex flex-col gap-12">
            <div className="flex flex-col gap-20">
                <section className="flex flex-col gap-4 mt-40 mx-20">
                    <div className="flex justify-between items-center gap-3 text-3xl">
                        <h2 className="text-foreground font-medium">סטטיסטיקה כללית</h2>
                        <div className="cursor-pointer py-3 px-1 flex items-center gap-1 font-light">
                            <Image src="/icons/filter-icon.svg" alt="filter" width={100} height={100} className="w-4 h-4" />
                            <span className="text-lg">סינון</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">

                        <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                            <button className="absolute top-3 left-4">
                                <Image src="/icons/arrow-down-red.svg" alt="arrow-down" width={20} height={20} />
                            </button>
                            <div className="flex flex-col w-full">
                                <span className="text-6xl font-bold">150</span>
                                <span className="text-xl font-light">נסיעות נכנסות</span>
                                <div className='grid grid-cols-3 mt-4 font-light'>
                                    <span className='col-span-2'>סה”כ נהגים שביצעו</span>
                                    <span className='flex justify-end'>89</span>
                                    <span className='col-span-2'>סה”כ ימים</span>
                                    <span className='flex justify-end'>28</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                            <button className="absolute top-3 left-4">
                                <Image src="/icons/arrow-up-green.svg" alt="arrow-up" width={20} height={20} />
                            </button>
                            <div className="flex flex-col w-full">
                                <span className="text-6xl font-bold">360</span>
                                <span className="text-xl font-light">נסיעות נכנסות</span>
                                <div className='grid grid-cols-3 mt-4 font-light'>
                                    <span className='col-span-2'>סה”כ נהגים שביצעו</span>
                                    <span className='flex justify-end'>89</span>
                                    <span className='col-span-2'>סה”כ ימים</span>
                                    <span className='flex justify-end'>28</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                            <div className="flex flex-col w-full">
                                <span className="text-6xl font-bold">80</span>
                                <span className="text-xl font-light">נהגים</span>
                                <div className='grid grid-cols-3 mt-4 font-light'>
                                    <span className='col-span-2'>סה”כ נהגים שביצעו</span>
                                    <span className='flex justify-end'>89</span>
                                    <span className='col-span-2'>סה”כ ימים</span>
                                    <span className='flex justify-end'>28</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                            <div className="flex flex-col w-full">
                                <span className="text-6xl font-bold">12,000</span>
                                <span className="text-xl font-light">הכנסות חודשיות</span>
                                <div className='grid grid-cols-3 mt-4 font-light'>
                                    <span className='col-span-2'>סה”כ נהגים שביצעו</span>
                                    <span className='flex justify-end'>89</span>
                                    <span className='col-span-2'>סה”כ ימים</span>
                                    <span className='flex justify-end'>28</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-6 mx-20 mb-20">
                    <div className='border-b border-black'>
                        <h3 className='text-foreground font-medium text-2xl'>שיעור הכנסות של התחנה</h3>
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>
                            <CustomBarChart />
                        </div>
                        <div className='flex flex-col justify-end w-40 mb-4'>
                            <div className='flex flex-col justify-between w-full font-medium text-lg border-b border-black'>
                                <span>סה”כ הכנסות</span>
                                <span>לשנת 2024</span>
                            </div>
                            <span className='text-lg mt-2'>96,258</span>
                        </div>
                    </div>
                </section>

                <section className="flex gap-6 mx-20 mb-20">
                    <div className='flex flex-col justify-center items-center'>
                        <span className='text-xl font-semibold'>שירותים משמעותיים</span>
                        <CustomPieChart />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='text-xl font-semibold'>שירותים משמעותיים</span>
                        <CustomPieChart />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default generalReportPage