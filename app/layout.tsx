import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
// Better Auth v1.5.6 provider - runs alongside Clerk
import { BetterAuthProvider } from "@/components/better-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StegoProxy Masker - Secure File Tracking & Proxy Management",
  description: "Professional steganography and proxy management system with stealth tracking capabilities.",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* Better Auth v1.5.6: Provider runs alongside ClerkProvider */}
      <BetterAuthProvider>
        <html lang="en" className="dark">
          <body className={`${inter.className} bg-background text-foreground min-h-screen`}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </body>
        </html>
      </BetterAuthProvider>
    </ClerkProvider>
  );
}
