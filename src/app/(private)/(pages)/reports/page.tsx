import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const data = [
    { id: 1, name: "ירושלים בית שמש - כהן", typeOfService: "משלוח", status: "פנוי", postingDate: "01.08.2024", postingTime: "11:01" },
    { id: 2, name: "ירושלים בית שמש - כהן", typeOfService: "הסעה", status: "תפוס", postingDate: "01.08.2024", postingTime: "11:01" },
    { id: 3, name: "ירושלים בית שמש - כהן", typeOfService: "מיוחד", status: "פנוי", postingDate: "01.08.2024", postingTime: "11:01" },
    { id: 4, name: "ירושלים בית שמש - כהן", typeOfService: "משלוח", status: "פנוי", postingDate: "01.08.2024", postingTime: "11:01" },
    // Add more rows as needed
];

interface Data {
    id: number;
    name: string;
    typeOfService: string;
    status: string;
    postingDate: string;
    postingTime: string;
}

interface Props {
    data: Data[];
}

const reportsPage = () => {
    return (
        <>
            <div className="mr-80 flex flex-col gap-12">
                <div className="flex flex-col gap-20">
                    <section className="flex flex-col gap-4 mt-40 mx-20">
                        <div className="flex justify-start items-center gap-3 text-3xl">
                            <h2 className="text-foreground font-medium">סטטיסטיקה יומית</h2>
                            <span className="text-accent">5.10.2024</span>
                        </div>

                        <div className="flex flex-wrap gap-4">

                            <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                                <div className="flex flex-col w-full">
                                    <span className="text-6xl font-bold">150</span>
                                    <span className="text-xl font-light">נסיעות שנכנסו בתחנה</span>
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
                                    <Image src="/icons/arrow-down.svg" alt="arrow down" width={20} height={20} />
                                </button>
                                <div className="flex flex-col">
                                    <span className="text-6xl font-bold">5</span>
                                    <span className="text-xl font-light">נסיעות ממתינות</span>
                                </div>
                            </div>

                            <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                                <button className="absolute top-3 left-4">
                                    <Image src="/icons/arrow-down.svg" alt="arrow down" width={20} height={20} />
                                </button>
                                <div className="flex flex-col">
                                    <span className="text-6xl font-bold">8</span>
                                    <span className="text-xl font-light">נסיעות שהסתיימו</span>
                                </div>
                            </div>

                            <button className="h-48 w-72 p-8 bg-[#ECE9E2] flex justify-center items-center border-2 border-primary rounded-lg hover:drop-shadow-lg transition-all duration-200">
                                <span className="text-2xl font-medium">סכום כסף?</span>
                            </button>
                        </div>
                    </section>

                    <section className="flex flex-col gap-6 mx-20 mb-20">
                        <div className="flex justify-start items-center gap-3 text-3xl">
                            <h2 className="text-foreground font-medium">נסיעות פעילות</h2>
                            <span className="text-accent">(20)</span>
                        </div>

                        <div className="">
                            <DataTable data={data} />
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}


const DataTable = ({ data }: Props) => {
    return (
        <table className='w-full'>
            <thead className=''></thead>
            <tbody className=''>
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr className='bg-white h-14 text-lg text-center'>
                            <td>
                                <Image src="/icons/three-ellipse.svg" alt="edit" width={5} height={5} />
                            </td>
                            <td className="flex items-center">
                                <Checkbox className="w-5 h-5" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.typeOfService}</td>
                            <td>{item.postingDate}</td>
                            <td>
                                {item.status === 'תפוס' && <div className='bg-[#FFE7E7] w-20 h-8 flex justify-center items-center rounded-lg'><span className='text-[#FF0004]'>{item.status}</span></div>}
                                {item.status === 'פנוי' && <div className='bg-[#F0FFF1] w-20 h-8 flex justify-center items-center rounded-lg'><span className='text-[#2EBD32]'>{item.status}</span></div>}
                            </td>
                            <td className='flex justify-end gap-2 pl-8'>
                                <Button className='text-lg font-light' variant={"secondary"} size={"default"}>
                                    <Image src="/icons/stop-circle.svg" alt="stop" width={20} height={20} />
                                    עצירה
                                </Button>
                                <Button className='text-lg font-light' variant={"secondary"} size={"default"}>
                                    <Image src="/icons/edit-icon.svg" alt="edit" width={20} height={20} />
                                    עריכה
                                </Button>
                                <Button className='text-lg font-light' variant={"secondary"} size={"default"}>
                                    <Image src="/icons/delete-icon.svg" alt="delete" width={20} height={20} />
                                    מחיקה
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

export default reportsPage