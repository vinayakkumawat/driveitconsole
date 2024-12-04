'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownItem } from './types';

interface NavDropdownProps {
  id: number;
  title: string;
  link: string;
  icon: string;
  dropdownItems: DropdownItem[];
}

export function NavDropdown({ title, link, icon, dropdownItems }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div>
      <div
        className={`flex items-center gap-4 p-2 cursor-pointer w-80 transition-colors ${
          isActive ? 'bg-[#4F525F99]' : 'bg-transparent hover:bg-[#4F525F]/60'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/icons/arrow-left.svg"
          alt="icon"
          width={100}
          height={100}
          className={`transition-transform duration-200 flex w-5 h-5 ${isOpen ? '-rotate-90' : ''}`}
        />
        <Link href={link} className="flex items-center gap-4">
          <Image src={icon} alt="icon" width={20} height={20} />
          <span className="flex">{title}</span>
        </Link>
      </div>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col gap-2 bg-[#4F525F]/80 rounded-md p-2 ml-8 w-full`}
      >
        {dropdownItems.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className={`flex items-center gap-4 p-2 transition-colors ${
              pathname === item.link ? 'bg-[#4F525F99]' : 'bg-transparent hover:bg-[#4F525F]/60'
            }`}
          >
            <div className="flex w-12 h-5" />
            <span className="flex">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}