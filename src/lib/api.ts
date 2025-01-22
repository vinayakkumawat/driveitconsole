export const API_BASE_URL = 'http://drive-it.co.il:5000';
export const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6InJvb3QiLCJpYXQiOjE3MzM4NjA3NjIsImV4cCI6MTc2NTQxODM2Mn0.iaXQ5Ha4Jr6fXAcb4Xf-mYjL6hElnh2J6SyTNMdAKzA';
const CALL2ALL_API_URL = 'https://www.call2all.co.il/ym/api';

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
            'Authorization': `Bearer ${API_TOKEN}`,
            ...options.headers,
        },
        cache: 'no-store', // Disable caching for real-time data
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    // Handle response for empty or no-content cases
    if (response.status === 204) {
        return null; // No Content
    }

    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
        // Attempt to parse JSON response
        return response.json();
    }

    // If not JSON, return as text or null for unexpected cases
    return response.text().then((text) => (text ? text : null));
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

export async function fetchCompanyLogo(companyId: string) {
    try {
        const companyData = await fetchApi('/companies', {
            params: {
                id: `eq.${companyId}`
            }
        });
        const logo = companyData[0]?.logolink || '/images/sample-logo.svg';
        return logo;
    } catch (error) {
        console.error('Error fetching company logo:', error);
        throw error;
    }
}

export async function getCall2AllToken(username: string, password: string) {
    const response = await fetch(
        `${CALL2ALL_API_URL}/Login?username=${username}&password=${password}`
    );

    if (!response.ok) {
        throw new Error('Failed to get Call2All token');
    }

    const data = await response.json();
    return data.token;
}

export async function sendVerificationCode(
    token: string,
    phone: string,
    code: string
) {
    const formattedMessage = `קוד האימות היא,${code.split('').join(',')}`;

    const params = new URLSearchParams({
        token,
        callerId: '043136703',
        ttsMessage: formattedMessage,
        phones: phone,
        tts_voice: 'Jacob'
    });

    const response = await fetch(
        `${CALL2ALL_API_URL}/SendTTS?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error('Failed to send verification code');
    }

    return response.json();
}