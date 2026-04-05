"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
// Better Auth v1.5.6 imports - runs alongside Clerk
import { BetterAuthUserButton } from "@/components/better-auth-user-button";
import { useSession } from "@/components/better-auth-provider";

const navLinks = [
  { href: "/", label: "Welcome" },
  { href: "/analytics", label: "Analytics", protected: true },
  { href: "/buy-keys", label: "Buy Keys", protected: true },
  { href: "/download", label: "Download", protected: true },
  { href: "/dashboard", label: "Dashboard", protected: true },
  { href: "/account", label: "Account", protected: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Better Auth v1.5.6 session - runs alongside Clerk
  const { data: betterAuthSession } = useSession();
  const isBetterAuthSignedIn = !!betterAuthSession?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">StegoProxy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <SignedOut>
            {/* Better Auth v1.5.6: SignedOut alternative sign in when not signed in with either system */}
            {isBetterAuthSignedIn ? (
              <BetterAuthUserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Link href="/sign-in">
                  <button className="w-24 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="w-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          {/* Better Auth v1.5.6: SignedOut Better Auth user button when signed in with Better Auth but not Clerk */}
          {!isBetterAuthSignedIn && (
            <SignedOut>
              <></>
            </SignedOut>
          )}
          {isBetterAuthSignedIn && (
            <BetterAuthUserButton afterSignOutUrl="/" />
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <SignedOut>
                {/* Better Auth v1.5.6: SignedOut Mobile auth options */}
                {isBetterAuthSignedIn ? (
                  <BetterAuthUserButton afterSignOutUrl="/" />
                ) : (
                  <div className="space-y-2">
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                      <button className="block w-full text-left text-sm font-medium text-muted-foreground">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      <button className="block w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              {/* Better Auth v1.5.6: SignedOut Better Auth user button when signed in with Better Auth but not Clerk */}
              {isBetterAuthSignedIn && (
                <BetterAuthUserButton afterSignOutUrl="/" />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
