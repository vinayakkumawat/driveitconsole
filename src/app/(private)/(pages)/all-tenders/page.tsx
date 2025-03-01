'use client';

import React, { useEffect, useState } from 'react';
import { fetchTenders } from '@/lib/api';
import { TenderPageClient } from './all-tenders-client-page';
import { getCurrentCompanyId } from '@/lib/auth';

export default function Page() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTenders() {
            try {
                const companyId = getCurrentCompanyId();
                if (!companyId) {
                    throw new Error('Company ID not found.');
                }

                const data = await fetchTenders(companyId);
                setTenders(data);
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
