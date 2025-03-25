import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const CommonAbbreviations = () => {
  return (
    <div className='inline-flex flex-col gap-2'>
        <div className=''>
            <span className='text-lg font-semibold'>קיצורים נפוצים</span>
        </div>
        <div className='flex flex-col gap-2'>
            {[...Array(6)].map((_, i) => (
                <div key={i} className='flex items-center gap-2 bg-white rounded-lg py-2 px-4'>
                    <Image src="/icons/audio.svg" alt="icon" width={20} height={20} />
                    <span className='text-lg font-semibold'>כל המכרזים</span>
                    <div className='flex items-center gap-2'>
                        <div className='rounded-lg border border-[#8D8F98] flex items-center justify-center w-8 h-8 p-1'><span>A</span></div>
                        <div className='rounded-lg border border-[#8D8F98] flex items-center justify-center w-12 h-8 p-1'><span>Ctrl</span></div>
                    </div>
                </div>
            ))}
        </div>
        <div className='mt-8'>
            <Button className='h-8 bg-[#FEF5E2] text-[#3E404C]'>יצירת קיצור חדש</Button>
        </div>
    </div>
  )
}

export default CommonAbbreviations