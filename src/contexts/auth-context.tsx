'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initiateLogin, verifyCode, logout as authLogout, getCurrentUser } from '@/lib/auth';
import type { User, LoginCredentials } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; verificationId?: string }>;
  verifyLoginCode: (verificationId: string, code: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { user, verificationId } = await initiateLogin(credentials);
      if (!user || !verificationId) {
        throw new Error('Invalid credentials');
      }
      return { success: true, verificationId };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  };

  const verifyLoginCode = async (verificationId: string, code: string) => {
    try {
      const verifiedUser = await verifyCode(verificationId, code);
      if (!verifiedUser) {
        return false;
      }
      setUser(verifiedUser);
      router.push('/');
      return true;
    } catch (error) {
      console.error('Verification error:', error);
      return false;
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, verifyLoginCode, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}