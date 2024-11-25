import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

const heading = ["", "שם מכרז", "סוג שירות", "שעת פרסום", "סטטוס", "נהג שקיבל את המכרז", ""]

interface Props {
    data: Array<{ [key: string]: any }>;
}

const DataTable = ({ data }: Props) => {
    return (
        <table className='rounded-lg p-2'>
            <thead className=''>
                {data.length > 0 && (
                    <tr className='bg-white rounded-t-lg border-b border-black h-14'>
                        {heading.map((head, index) => (
                            <th key={index} className='text-right text-lg font-medium'>{head}</th>
                        ))}
                    </tr>
                )}
                <tr className='h-3'></tr>
            </thead>
            <tbody className=''>
                {data.map((item, index) => (
                    <>
                        <tr key={index} className='bg-white h-14 text-lg'>
                            <td>
                                <Image src="/icons/three-ellipse.svg" alt="edit" width={5} height={5} />
                            </td>
                            <td>{item.tenderName}</td>
                            <td>{item.serviceType}</td>
                            <td>{item.publicationTime}</td>
                            <td>
                                {item.status === 'תפוס' && <span className='text-[#FF0004]'>{item.status}</span>}
                                {item.status === 'בוצע' && <span className='text-[#2EBD32]'>{item.status}</span>}
                                {item.status === 'מבוטל' && <span className='text-[#20678B]'>{item.status}</span>}
                                {item.status === 'ממתין' && <span className='text-[#EF850C]'>{item.status}</span>}
                            </td>
                            <td>{item.driverName}</td>
                            <td className='flex gap-2'>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/stop-circle.svg" alt="stop" width={20} height={20}  />
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
                    </>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable