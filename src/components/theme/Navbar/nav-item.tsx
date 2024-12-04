'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  title: string;
  link: string;
  icon: string;
  showArrow?: boolean;
}

export function NavItem({ title, link, icon, showArrow = true }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div>
      <Link 
        href={link} 
        className={`flex items-center gap-4 p-2 w-80 transition-colors ${
          isActive ? 'bg-[#4F525F99]' : 'bg-transparent hover:bg-[#4F525F]/60'
        }`}
      >
        <div className="flex w-5 h-5">
          {showArrow && <div className="w-5 h-5" />}
        </div>
        <Image src={icon} alt="icon" width={20} height={20} className="" />
        <span className="flex">{title}</span>
      </Link>
    </div>
  );
}