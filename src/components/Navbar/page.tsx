"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

// Type definitions for nav items and dropdown items
interface DropdownItem {
    title: string;
    link: string;
}

interface NavItem {
    id: number;
    title: string;
    link: string;
    icon: string;
    isDropdown: boolean;
    dropdownItems?: DropdownItem[];
}

const navItems: NavItem[] = [
    { id: 1, title: "כל המכרזים", link: "/all-tenders", icon: "/icons/speaker-icon.svg", isDropdown: false },
    { id: 2, title: "נהגים", link: "#", icon: "/icons/user-icon.svg", isDropdown: false },
    {
        id: 3, title: "דוחות", link: "#", icon: "/icons/report-icon.svg", isDropdown: true, dropdownItems: [
            { title: "דוח נהגים", link: "#" },
            { title: "דוח כללי", link: "#" },
            { title: "דוח חודשי", link: "#" }
        ]
    },
    { id: 4, title: "תשלומים", link: "#", icon: "/icons/credit-card-icon.svg", isDropdown: false },
    { id: 5, title: "נסיעות", link: "#", icon: "/icons/car-icon.svg", isDropdown: false },
    { id: 6, title: "לקוחות", link: "#", icon: "/icons/user-icon-2.svg", isDropdown: false },
    { id: 7, title: "מחירון כללי", link: "#", icon: "/icons/list-icon.svg", isDropdown: false }
];

const Nav = () => {
    // State to track which dropdown is open
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    // Toggle function to open/close dropdown
    const toggleDropdown = (id: number) => {
        setOpenDropdown(openDropdown === id ? null : id); // Toggle dropdown visibility
    };

    return (
        <nav className='h-screen z-20 w-80 py-12 fixed flex flex-col justify-between items-center rounded-tl-3xl bg-foreground'>
            <div className=''>
                <Image src="/images/logo-white.svg" alt="logo" width={150} height={150} className="" />
            </div>
            <div className='flex flex-col gap-2 text-[#F6F7F9] text-xl h-96 overflow-y-scroll no-scrollbar'>
                {navItems.map((item) => (
                    item.isDropdown ? (
                        <div key={item.id}>
                            <div
                                className='flex items-center gap-4 bg-transparent hover:bg-[#4F525F]/60 p-2 cursor-pointer w-80'
                                onClick={() => toggleDropdown(item.id)} // Toggle dropdown visibility
                            >
                                <Image
                                    src={"/icons/arrow-left.svg"}
                                    alt="icon"
                                    width={100}
                                    height={100}
                                    className={`transition-transform duration-200 flex w-5 h-5 ${openDropdown === item.id ? '-rotate-90' : ''}`}
                                />
                                <Image src={item.icon} alt='icon' width={20} height={20} className='' />
                                <span className="flex">{item.title}</span>
                            </div>
                            <div
                                className={`${
                                    openDropdown === item.id ? 'flex' : 'hidden'
                                } flex-col gap-2 bg-[#4F525F]/80 rounded-md p-2 ml-8 w-full`}
                            >
                                {item.dropdownItems?.map((list) => (
                                    <a key={list.title} href={list.link} className="flex items-center gap-4 bg-transparent hover:bg-[#4F525F]/60 p-2">
                                        <div className="flex w-12 h-5"></div>
                                        <span className="flex">{list.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div key={item.id}>
                            <a href={item.link} className="flex items-center gap-4 bg-transparent hover:bg-[#4F525F]/60 p-2 w-80">
                                <div className="flex w-5 h-5"></div>
                                <Image src={item.icon} alt="logo" width={20} height={20} className="" />
                                <span className="flex">{item.title}</span>
                            </a>
                        </div>
                    )
                ))}
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                <Image src="/images/sample-logo.svg" alt="home" width={50} height={50} className="w-24 h-24" />
                    <div className="text-white flex flex-col justify-center items-center">
                        <span className="text-lg flex">ישראל ישראלי</span>
                        <span className="text-base font-light flex">מ.ז: 22635894</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Button className='bg-[#DDDEE4] text-lg font-light text-black'><Image src={"/icons/sign-out.svg"} alt='icon' width={20} height={20} />יציאה</Button>
                        <Button className='bg-[#DDDEE4] text-lg font-light text-black'><Image src={"/icons/gear-with-pencil.svg"} alt='icon' width={20} height={20} />הגדרות</Button>
                    </div>
            </div>
        </nav>
    );
};

export default Nav;
