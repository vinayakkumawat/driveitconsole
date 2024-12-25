'use client';

import React, { useEffect, useState } from 'react';
import { fetchTenders } from '@/lib/api';
import { TenderPageClient } from './all-tenders-client-page';

export default function Page() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTenders() {
            try {
                const userStr = localStorage.getItem('auth-user');
                if (userStr) {
                    // const user = JSON.parse(userStr);
                    // const companyId = user.company_id;
                    const companyId = '1';

                    if (!companyId) throw new Error('Company ID is missing.');

                    const data = await fetchTenders(companyId);
                    setTenders(data);
                } else {
                    throw new Error('User not found in localStorage.');
                }
            } catch (err) {
                setError("Error");
                console.error('Error fetching tenders:', err);
            } finally {
                setLoading(false);
            }
        }

        loadTenders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return <TenderPageClient initialTenders={tenders} />;
}
