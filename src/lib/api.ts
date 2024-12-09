const API_BASE_URL = 'http://drive-it.co.il:5000';

interface ApiOptions extends RequestInit {
    params?: Record<string, string>;
}

export async function fetchApi(endpoint: string, options: ApiOptions = {}) {
    const { params, ...fetchOptions } = options;

    // Build URL with query parameters
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const response = await fetch(url.toString(), {
        ...fetchOptions,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        cache: 'no-store', // Disable caching for real-time data
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

export async function fetchTenders(companyId: string) {
    try {
        return await fetchApi('/trip_driver_view', {
            params: {
                company_id: `eq.${companyId}`
            }
        });
    } catch (error) {
        console.error('Error fetching tenders:', error);
        throw error;
    }
}