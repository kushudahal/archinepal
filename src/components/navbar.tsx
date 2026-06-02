"use client";

import Link from "next/link";
import { Menu, Search, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container pt-4">
        <nav className="glass flex h-16 items-center justify-between rounded-xl px-4 shadow-soft">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-charcoal text-sm font-bold text-white">AN</span>
            <span className="text-sm font-semibold tracking-[0.18em] text-charcoal">ARCHINEPAL</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm text-charcoal/70 transition hover:bg-white/70 hover:text-charcoal">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href={user ? "/dashboard" : "/login"}>
                <UserRound className="h-4 w-4" />
                {user ? user.name.split(" ")[0] : "Login"}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
