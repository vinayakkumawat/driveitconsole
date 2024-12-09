import { fetchTenders } from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TenderPageClient } from './all-tenders-client-page';

async function getTenders(companyId: string) {
    try {
        const data = await fetchTenders(companyId);
        return data;
    } catch (error) {
        console.error('Error fetching tenders:', error);
        return [];
    }
}

export default async function Page() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth-token');

    if (!token) {
        redirect('/login');
    }

    const companyId = '1';
    const tenders = await getTenders(companyId);

    return <TenderPageClient initialTenders={tenders} />;
}