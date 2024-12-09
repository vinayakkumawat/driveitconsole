import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const heading = ["", "מספר סידורי", "שם הנהג", "קבועים", "משתנים חובה", "משתנים זכות", "יתרה קודמת", "כמות נסיעות", "סה”כ", ""]

interface DriverData {
    serialNumber: number;
    driverName: string;
    permanent: number;
    requiredVariables: number;
    rightVariables: number;
    previousBalance: number;
    numberOfTrips: number;
    total: number;
}

interface Props {
    data: DriverData[];
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
                            <td>{item.serialNumber}</td>
                            <td>{item.driverName}</td>
                            <td>
                                <div className='flex justify-center items-center gap-1'>
                                    {item.permanent}
                                    <Image src="/icons/isolation-mode-icon.svg" alt='isolation mode' width={10} height={10} />
                                </div>
                            </td>
                            <td>
                                <div className='flex justify-center items-center gap-1'>
                                    {item.requiredVariables}
                                    <Image src="/icons/isolation-mode-icon.svg" alt='isolation mode' width={10} height={10} />
                                </div>
                            </td>
                            <td>
                                <div className='flex justify-center items-center gap-1'>
                                    {item.rightVariables}
                                    <Image src="/icons/isolation-mode-icon.svg" alt='isolation mode' width={10} height={10} />
                                </div>
                            </td>
                            <td>
                                <div className='flex justify-center items-center gap-1'>
                                    {item.previousBalance}
                                    <Image src="/icons/isolation-mode-icon.svg" alt='isolation mode' width={10} height={10} />
                                </div>
                            </td>
                            <td>{item.numberOfTrips}</td>
                            <td>
                                <div className='flex justify-center items-center gap-1'>
                                    {item.total}
                                    <Image src="/icons/isolation-mode-icon.svg" alt='isolation mode' width={10} height={10} />
                                </div>
                            </td>
                            <td className='flex gap-2'>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/open-eye.svg" alt="see" width={25} height={25} />
                                </Button>
                                <Button variant={"secondary"} size={"icon"}>
                                    <Image src="/icons/file-with-right-arrow-icon.svg" alt="report" width={25} height={25} className='text-black' />
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