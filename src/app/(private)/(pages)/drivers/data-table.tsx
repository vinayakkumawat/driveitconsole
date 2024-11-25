import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import React from 'react'

const heading = ["", "", "שם נהג", "אזור מגורים", "טלפון", "טלפון נוסף", "משוייך לערוץ", "סטטוס", ""]

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
                            <td className="flex items-center">
                                <Checkbox className="h-5 w-5" />
                            </td>
                            <td>{item.driverName}</td>
                            <td>{item.residentialArea}</td>
                            <td>{item.phone}</td>
                            <td>{item.additionalPhone}</td>
                            <td>{item.associatedWithAChannel}</td>
                            <td>
                                {item.status === 'לא פעיל' && <span className='text-[#FF0004]'>{item.status}</span>}
                                {item.status === 'פעיל' && <span className='text-[#2EBD32]'>{item.status}</span>}
                            </td>
                            <td className='flex gap-2'>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/open-eye.svg" alt="see" width={25} height={25} />
                                </Button>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/file-list-icon.svg" alt="edit" width={25} height={25} />
                                </Button>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/report-icon-black.svg" alt="report" width={25} height={25} className='text-black' />
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