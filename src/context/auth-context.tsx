"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "@/services/auth.service";
import { getMe, type AuthUser } from "@/services/users.service";

const AUTH_DEBUG = process.env.NEXT_PUBLIC_AUTH_DEBUG === "true";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (input: authService.LoginInput) => Promise<AuthUser>;
  register: (input: authService.RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    if (AUTH_DEBUG) console.debug("[AuthProvider] checking current user via /users/me");
    const currentUser = await getMe();
    if (AUTH_DEBUG) console.debug("[AuthProvider] current user result", { hasUser: Boolean(currentUser), userId: currentUser?.id });
    setUser(currentUser);
    return currentUser;
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (input: authService.LoginInput) => {
    if (AUTH_DEBUG) console.debug("[AuthProvider] login requested", { email: input.email });
    const result = await authService.login(input);
    if (AUTH_DEBUG) console.debug("[AuthProvider] login succeeded", { userId: result.user.id });
    setUser(result.user);
    return result.user;
  }, []);

  const register = useCallback(async (input: authService.RegisterInput) => {
    const createdUser = await authService.register(input);
    setUser(createdUser);
    return createdUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout, refreshUser }),
    [user, isLoading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
