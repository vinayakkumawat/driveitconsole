import { fetchApi } from './api';
import type { User, LoginCredentials } from '@/lib/types';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
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
            const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));

            // Store authentication data
            if (typeof window !== 'undefined') {
                localStorage.setItem(TOKEN_KEY, token);
                localStorage.setItem(USER_KEY, JSON.stringify(user));

                // Set cookie for server-side authentication
                document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; samesite=strict`;
            }

            return user;
        }

        return null;
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
}

export function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}

export function getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}