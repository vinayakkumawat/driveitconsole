"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  initiateLogin,
  verifyCode,
  logout as authLogout,
  getCurrentUser,
  getAuthToken,
} from "@/lib/auth";
import type { User, LoginCredentials } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; verificationId?: string }>;
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
      try {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { user, verificationId } = await initiateLogin(credentials);
      if (!user) {
        return { success: false };
      }

      // Check if this was a direct login
      if (verificationId === "direct-login") {
        setUser(user);
        sessionStorage.setItem("auth-user", JSON.stringify(user)); // 🔹 Store user session
        localStorage.setItem(
          "auth-token",
          btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }))
        );
        
        await new Promise(resolve => setTimeout(resolve, 200));

        router.push("/");
        return { success: true };
      }

      // Normal flow with verification
      return { success: true, verificationId };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  };

  const verifyLoginCode = async (verificationId: string, code: string) => {
    try {
      const verifiedUser = await verifyCode(verificationId, code);
      if (!verifiedUser) {
        return false;
      }

      // Set user in context
      setUser(verifiedUser);

      // Wait to ensure local storage is updated
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Get the auth token that was set during verification
      const authToken = getAuthToken();
      if (!authToken) {
        console.error("No auth token found after verification");
        return false;
      }

      // Update server-side authentication
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: authToken }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error("Server did not set auth-token cookie");
        return false;
      }

      router.push("/");
      return true;
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Clear server-side authentication first
      await fetch("/api/auth", { method: "DELETE" });
      authLogout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, verifyLoginCode, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
