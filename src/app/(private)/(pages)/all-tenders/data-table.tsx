import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { TenderData } from './types';

const heading = ["", "שם מכרז", "סוג שירות", "שעת פרסום", "סטטוס", "נהג שקיבל את המכרז", ""]

interface Props {
    data: TenderData[];
}

const DataTable = ({ data }: Props) => {
    return (
        <table className='rounded-lg p-2'>
            <thead className=''>
                {data.length > 0 && (
                    <tr className='bg-white rounded-t-lg border-b border-black h-14'>
                        {heading.map((head, index) => (
                            <th key={index} className='text-center text-lg font-medium'>{head}</th>
                        ))}
                    </tr>
                )}
                <tr className='h-3'></tr>
            </thead>
            <tbody className=''>
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr key={index} className='bg-white h-14 text-lg text-center'>
                            <td>
                                <Image src="/icons/three-ellipse.svg" alt="edit" width={5} height={5} />
                            </td>
                            <td>{item.tenderName}</td>
                            <td>{item.serviceType}</td>
                            <td>{item.publicationTime}</td>
                            <td>
                                {item.status === 'תפוס' && <div className='bg-[#FFE7E7] w-20 h-8 flex justify-center items-center rounded-lg'><span className='text-[#FF0004]'>{item.status}</span></div>}
                                {item.status === 'פנוי' && <div className='bg-[#F0FFF1] w-20 h-8 flex justify-center items-center rounded-lg'><span className='text-[#2EBD32]'>{item.status}</span></div>}
                            </td>
                            <td>{item.driverName}</td>
                            <td className='flex gap-2'>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/stop-circle.svg" alt="stop" width={20} height={20} />
                                </Button>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/edit-icon.svg" alt="edit" width={20} height={20} />
                                </Button>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/delete-icon.svg" alt="delete" width={20} height={20} />
                                </Button>
                            </td>
                        </tr>
                        <tr className='h-1'></tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable