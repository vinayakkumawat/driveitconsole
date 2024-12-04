interface ApiOptions extends RequestInit {
    params?: Record<string, string>;
}

const API_BASE_URL = 'http://drive-it.co.il:5000';

export async function fetchApi(endpoint: string, options: ApiOptions = {}) {
    const { params, ...fetchOptions } = options;

    // Build URL with query parameters
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(url.toString(), {
        ...fetchOptions,
        headers,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}