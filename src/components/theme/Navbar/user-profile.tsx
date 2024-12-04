'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

export function UserProfile() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Image src="/images/sample-logo.svg" alt="home" width={50} height={50} className="w-24 h-24" />
      <div className="text-white flex flex-col justify-center items-center">
        <span className="text-lg flex">ישראל ישראלי</span>
        <span className="text-base font-light flex">מ.ז: 22635894</span>
      </div>
      <div className="flex gap-2 mt-2">
        <Button onClick={logout} className="bg-[#DDDEE4] text-lg font-light text-black">
          <Image src="/icons/sign-out.svg" alt="icon" width={20} height={20} />
          יציאה
        </Button>
        <Button className="bg-[#DDDEE4] text-lg font-light text-black">
          <Image src="/icons/gear-with-pencil.svg" alt="icon" width={20} height={20} />
          הגדרות
        </Button>
      </div>
    </div>
  );
}