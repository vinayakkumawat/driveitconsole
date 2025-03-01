'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NavItem } from './nav-item';
import { NavDropdown } from './nav-dropdown';
import { UserProfile } from './user-profile';
import { NavItem as NavItemType } from './types';

const navItems: NavItemType[] = [
    { id: 1, title: "כל המכרזים", link: "/all-tenders", icon: "/icons/speaker-icon.svg", isDropdown: false },
    { id: 2, title: "נהגים", link: "/drivers", icon: "/icons/user-icon.svg", isDropdown: false },
    {
        id: 3, title: "דוחות", link: "/reports", icon: "/icons/report-icon.svg", isDropdown: true, dropdownItems: [
            { title: "דוח נהגים", link: "/reports/driver-report" },
            { title: "דוח כללי", link: "/reports/general-report" },
            { title: "דוח חודשי", link: "/reports/personalized-report" }
        ]
    },
    { id: 4, title: "תשלומים", link: "/payments", icon: "/icons/credit-card-icon.svg", isDropdown: false },
    { id: 5, title: "נסיעות", link: "/travel", icon: "/icons/car-icon.svg", isDropdown: false },
    { id: 6, title: "לקוחות", link: "/customers", icon: "/icons/user-icon-2.svg", isDropdown: false },
    { id: 7, title: "מחירון כללי", link: "/general-price-list", icon: "/icons/list-icon.svg", isDropdown: false }
];

export default function Nav() {
  return (
    <nav className="h-screen z-20 w-80 py-12 fixed flex flex-col justify-between items-center rounded-tl-3xl bg-foreground">
      <Link href="/" className="">
        <Image src="/images/logo-white.svg" alt="logo" width={150} height={150} />
      </Link>
      
      <div className="flex flex-col gap-2 text-[#F6F7F9] text-xl h-96 overflow-y-scroll no-scrollbar">
        {navItems.map((item) => (
          item.isDropdown ? (
            <NavDropdown
              key={item.id}
              id={item.id}
              title={item.title}
              link={item.link}
              icon={item.icon}
              dropdownItems={item.dropdownItems!}
            />
          ) : (
            <NavItem
              key={item.id}
              title={item.title}
              link={item.link}
              icon={item.icon}
            />
          )
        ))}
      </div>

      <UserProfile />
    </nav>
  );
}