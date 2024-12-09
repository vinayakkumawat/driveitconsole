import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StationSelection from '@/components/Forms/StationSelection';
import DriverSelection from '@/components/Forms/DriverSelection';


const personalizedReportPage = () => {
    return (
        <div className="mr-80 flex flex-col gap-12">
            <div className="flex flex-col gap-8">

                <section className="flex flex-col gap-4 mt-40 mx-20">
                    <div className="flex justify-between items-center gap-3 text-3xl">
                        <h2 className="text-foreground font-medium">דוחות בהתאמה אישית</h2>
                    </div>
                    <div className='flex'>
                        <Tabs defaultValue="StationSelection" className="w-full">
                            <TabsList>
                                <TabsTrigger value="DriverSelection">בחירת נהג</TabsTrigger>
                                <TabsTrigger value="StationSelection">בחירת תחנה</TabsTrigger>
                            </TabsList>
                            <TabsContent value="StationSelection">
                                <StationSelection />
                            </TabsContent>
                            <TabsContent value="DriverSelection">
                                <DriverSelection />
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                <section className='flex flex-col gap-4 mb-40 mx-20'>
                    <div className='border-b border-[#BCBCBC] p-2'>
                        <h3 className='text-lg font-medium'>תוצאות החיפוש</h3>
                    </div>
                    <div className='h-40 w-full flex justify-center items-center'>
                        <span>אין תוצאות חיפוש</span>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default personalizedReportPage