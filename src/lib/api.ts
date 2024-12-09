const API_BASE_URL = 'http://drive-it.co.il:5000';
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