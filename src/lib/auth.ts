import { fetchApi, getCall2AllToken, sendVerificationCode } from './api';
import type { User, LoginCredentials } from '@/lib/types';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const COMPANY_KEY = 'auth-company';
const VERIFICATION_STATE_KEY = 'verification-state';

// test user details
const SPECIAL_USER = {
    username: 'test',
    password: 'password'
};

export function generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function initiateLogin(credentials: LoginCredentials): Promise<{ user: User | null; verificationId: string }> {
    try {
        const isEmail = credentials.username.includes('@');
        const queryParam = isEmail ? 'email' : 'username';

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

            // Fetch company details and store them in localStorage
            if (user.companyId) {
                const companyDetails = await fetchApi('/companies', {
                    params: {
                        id: `eq.${user.companyId}`
                    }
                });
                console.log('Fetched Company Details:', companyDetails);

                if (companyDetails && companyDetails.length > 0) {
                    localStorage.setItem(COMPANY_KEY, JSON.stringify(companyDetails[0]));
                }
            }

            // Check if this is the special user
            if (credentials.username === SPECIAL_USER.username && 
                credentials.password === SPECIAL_USER.password) {
                
                // Direct login for special user
                const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
                
                // Store authentication data
                localStorage.setItem('auth-token', token);
                localStorage.setItem('auth-user', JSON.stringify(user));
                sessionStorage.setItem('auth-user', JSON.stringify(user));
                
                // Return with empty verificationId to signal direct login
                return { user, verificationId: 'direct-login' };
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

            // Get Call2All token and send verification code
            const call2AllToken = await getCall2AllToken('043136703', '0527186026');
            await sendVerificationCode(call2AllToken, user.phone, verificationCode);

            return { user, verificationId };
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
        localStorage.removeItem(VERIFICATION_STATE_KEY);
        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}

export function getCurrentUser() {
    // Ensure the code runs only in the browser
    if (typeof window === 'undefined') {
        console.error('Attempting to access localStorage on the server');
        return null;
    }

    try {
        const userStr = localStorage.getItem('auth-user');
        // console.log('Raw auth-user from localStorage:', userStr);

        if (!userStr) {
            return null;
        }

        const user = JSON.parse(userStr);
        // console.log('Parsed user object:', user);
        return user;
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
    }
}

export function getCurrentUserCompany() {
    try {
        const companyStr = localStorage.getItem('auth-company');
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