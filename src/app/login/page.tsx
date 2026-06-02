"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

const AUTH_DEBUG = process.env.NEXT_PUBLIC_AUTH_DEBUG === "true";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (AUTH_DEBUG) {
      console.debug("[LoginPage] login button clicked/form submitted", {
        email,
        passwordPresent: Boolean(password)
      });
    }

    try {
      const user = await login({ email, password });
      if (AUTH_DEBUG) console.debug("[LoginPage] frontend received login response", { userId: user.id });
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again.";
      if (AUTH_DEBUG) console.error("[LoginPage] login failed", err);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stonewash pt-32">
        <section className="container grid min-h-[calc(100vh-8rem)] place-items-center pb-16">
          <Card className="w-full max-w-md">
            <CardContent>
              <Button asChild variant="ghost" size="sm" className="mb-6 px-0">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back home
                </Link>
              </Button>
              <h1 className="text-3xl font-semibold">Login to ARCHINEPAL</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use the account you registered with the backend API.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <label className="grid gap-2 text-sm font-medium">
                  Email
                  <Input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Password
                  <Input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    required
                  />
                </label>
                {error ? (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
