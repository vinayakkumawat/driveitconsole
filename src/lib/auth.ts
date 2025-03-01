import { fetchApi, getCall2AllToken, sendVerificationCode } from './api';
import type { User, LoginCredentials } from '@/lib/types';

// Company interface
interface Company {
    id: string;
    name: string;
    logolink?: string;
    address?: string;
    phone?: string;
    email?: string;
    created_date?: string;
    updated_date?: string;
}

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const COMPANY_KEY = 'auth-company';
const COMPANY_ID_KEY = 'company-id';
const VERIFICATION_STATE_KEY = 'verification-state';

// Special user configuration - hardcoded for both development and production
const ENABLE_SPECIAL_USER = true;
const SPECIAL_USER = {
    username: 'test',
    password: '052711Aa'
};

// Helper function to store company data
const storeCompanyData = (companyId: string, companyDetails?: Company) => {
    // Store company ID separately for easy access
    localStorage.setItem(COMPANY_ID_KEY, companyId);
    
    // If we have company details, store them too
    if (companyDetails) {
        localStorage.setItem(COMPANY_KEY, JSON.stringify(companyDetails));
    }
};

export function generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function initiateLogin(credentials: LoginCredentials): Promise<{ user: User | null; verificationId: string }> {
    try {
        // First check if this is the special user
        if (ENABLE_SPECIAL_USER && 
            credentials.username === SPECIAL_USER.username && 
            credentials.password === SPECIAL_USER.password) {
            
            try {
                // Fetch the actual user data for the special user
                const response = await fetchApi('/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        username: `eq.${SPECIAL_USER.username}`,
                        limit: '1',
                    },
                });

                if (response && response.length > 0) {
                    const user = response[0];
                    
                    // Generate token for direct login
                    const token = btoa(JSON.stringify({
                        userId: user.id,
                        timestamp: Date.now(),
                        type: 'special-user',
                        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
                    }));
                    
                    // Store authentication data
                    localStorage.setItem(TOKEN_KEY, token);
                    localStorage.setItem(USER_KEY, JSON.stringify(user));
                    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
                    
                    // Store company ID and fetch company details
                    if (user.company_id) {
                        storeCompanyData(user.company_id);
                        try {
                            const companyDetails = await fetchApi('/companies', {
                                params: {
                                    id: `eq.${user.company_id}`
                                }
                            });

                            if (companyDetails && companyDetails.length > 0) {
                                storeCompanyData(user.company_id, companyDetails[0]);
                            }
                        } catch (companyError) {
                            console.error('Error fetching company details:', companyError);
                        }
                    }
                    
                    // Set secure cookie for server-side authentication
                    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; samesite=strict; secure`;
                    
                    return { user, verificationId: 'direct-login' };
                }
            } catch (error) {
                console.error('Error fetching special user data:', error);
            }
        }

        // Regular user login flow
        const isEmail = credentials.username.includes('@');
        const queryParam = isEmail ? 'email' : 'username';

        try {
            const response = await fetchApi('/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    [queryParam]: `eq.${credentials.username}`,
                    password: `eq.${credentials.password}`,
                    limit: '1',
                },
            });

            if (response && response.length > 0) {
                const user = response[0];

                // Store company ID immediately when we get the user
                if (user.company_id) {
                    storeCompanyData(user.company_id);

                    // Then try to fetch and store company details
                    try {
                        const companyDetails = await fetchApi('/companies', {
                            params: {
                                id: `eq.${user.company_id}`
                            }
                        });

                        if (companyDetails && companyDetails.length > 0) {
                            storeCompanyData(user.company_id, companyDetails[0]);
                        }
                    } catch (companyError) {
                        console.error('Error fetching company details:', companyError);
                        // Continue with login even if company fetch fails
                    }
                }

                const verificationCode = generateVerificationCode();
                const verificationId = btoa(JSON.stringify({ 
                    userId: user.id, 
                    code: verificationCode,
                    timestamp: Date.now() 
                }));

                // Store verification state temporarily
                localStorage.setItem(VERIFICATION_STATE_KEY, JSON.stringify({
                    verificationId,
                    code: verificationCode,
                    user
                }));

                try {
                    // Get Call2All token and send verification code
                    const call2AllToken = await getCall2AllToken('043136703', '0527186026');
                    await sendVerificationCode(call2AllToken, user.phone, verificationCode);
                } catch (smsError) {
                    console.error('Error sending verification code:', smsError);
                    // Continue with login even if SMS fails
                }

                return { user, verificationId };
            }
        } catch (apiError) {
            console.error('API Error:', apiError);
        }

        return { user: null, verificationId: '' };
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
}

export async function verifyCode(verificationId: string, code: string): Promise<User | null> {
    const verificationState = localStorage.getItem(VERIFICATION_STATE_KEY);
    if (!verificationState) return null;

    const { code: storedCode, user } = JSON.parse(verificationState);

    if (code === storedCode) {
        const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));

        // Store authentication data
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        
        // Ensure company ID is stored after verification
        if (user.company_id) {
            storeCompanyData(user.company_id);
        }
        
        localStorage.removeItem(VERIFICATION_STATE_KEY);

        // Set cookie for server-side authentication
        document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; samesite=strict`;

        return user;
    }

    return null;
}

export function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(COMPANY_KEY);
        localStorage.removeItem(COMPANY_ID_KEY);  // Clear company ID on logout
        localStorage.removeItem(VERIFICATION_STATE_KEY);
        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}

// Helper function to get company ID
export function getCurrentCompanyId(): string | null {
    try {
        // First try to get from company ID key for performance
        const companyId = localStorage.getItem(COMPANY_ID_KEY);
        if (companyId) {
            return companyId;
        }

        // If not found, try to get from user data
        const userStr = localStorage.getItem(USER_KEY);
        if (!userStr) {
            return null;
        }

        const user = JSON.parse(userStr) as User;
        if (!user || !user.company_id) {
            return null;
        }

        // Store the company ID for future quick access
        localStorage.setItem(COMPANY_ID_KEY, user.company_id);
        return user.company_id;
    } catch (error) {
        console.error('Error getting current company ID:', error);
        return null;
    }
}

export function getCurrentUser() {
    // Ensure the code runs only in the browser
    if (typeof window === 'undefined') {
        console.error('Attempting to access localStorage on the server');
        return null;
    }

    try {
        const userStr = localStorage.getItem(USER_KEY);
        if (!userStr) {
            return null;
        }

        const user = JSON.parse(userStr);
        return user;
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
    }
}

export function getCurrentUserCompany() {
    try {
        const companyStr = localStorage.getItem(COMPANY_KEY);
        if (!companyStr) {
            console.error('No company details found in localStorage');
            return null;
        }

        const company = JSON.parse(companyStr);
        return company;
    } catch (error) {
        console.error('Error parsing company details from localStorage:', error);
        return null;
    }
}

export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}