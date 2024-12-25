'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

export function UserProfile() {
  const { logout } = useAuth();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [companyLogo, setCompanyLogo] = useState('/images/sample-logo.svg');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserDetails() {
      try {
        const userStr = localStorage.getItem('auth-user');
        if (userStr) {
          const user = JSON.parse(userStr);
          const companyId = user.company_id;

          if (!companyId) throw new Error('Company ID is missing.');

          // const companyLogo = await fetchCompanyLogo(companyId);
          const companyLogo = '/images/sample-logo.svg';

          setUsername(user.username);
          setPhone(user.phone);
          setCompanyLogo(companyLogo);
        } else {
          throw new Error('User not found in localStorage.');
        }
      } catch (err) {
        setError("Error");
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Image src={companyLogo} alt="home" width={50} height={50} className="w-24 h-24" />
      <div className="text-white flex flex-col justify-center items-center">
        <span className="text-lg flex">{username}</span>
        <span className="text-base font-light flex">{phone}</span>
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