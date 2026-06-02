import { apiFetch } from "@/lib/api";
import type { AuthUser } from "./users.service";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role?: "architect" | "civil_engineer" | "interior_designer" | "student" | "firm_owner";
};

export type LoginInput = {
  email: string;
  password: string;
};

export async function register(input: RegisterInput): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/register", { method: "POST", body: JSON.stringify(input) });
}

export async function login(input: LoginInput): Promise<{ user: AuthUser }> {
  return apiFetch<{ user: AuthUser }>("/auth/login", { method: "POST", body: JSON.stringify(input) });
}

export async function logout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" });
}

export async function refresh(): Promise<{ accessToken: string }> {
  return apiFetch<{ accessToken: string }>("/auth/refresh", { method: "POST", body: JSON.stringify({}) });
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
}

export async function resetPassword(token: string, password: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, password }) });
}
