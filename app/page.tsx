"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";
import { Shield, FileKey, Globe, Eye, ArrowRight, Coffee } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 lg:pt-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              StegoProxy <span className="text-primary">Masker</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Professional-grade steganography and proxy management system. 
              Secure your files with invisible tracking and world-class proxy protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="rounded-md border border-border bg-secondary px-6 py-3 text-base font-medium hover:bg-secondary/80 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/buy-keys"
                  className="rounded-md border border-border bg-secondary px-6 py-3 text-base font-medium hover:bg-secondary/80 transition-colors"
                >
                  Buy Keys
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure file management and tracking
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileKey className="h-8 w-8" />}
              title="Steganography"
              description="Hide sensitive data within images and PDFs using advanced encryption techniques."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Proxy Management"
              description="Worldwide proxy network with automatic rotation and health monitoring."
            />
            <FeatureCard
              icon={<Eye className="h-8 w-8" />}
              title="Stealth Tracking"
              description="Track when and where your files are opened with invisible beacon technology."
            />
          </div>
        </div>
      </section>

      {/* BuyMeACoffee Section */}
      <section className="py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Support the Project</h2>
            <p className="text-muted-foreground mb-8">
              StegoProxy Masker is developed and maintained by a single developer. 
              Your support helps keep the project alive and improving.
            </p>
            <a
              href="https://buymeacoffee.com/toreyftw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#FFDD00] text-black px-6 py-3 text-base font-medium hover:bg-[#FFDD00]/90 transition-colors"
            >
              <Coffee className="h-5 w-5" />
              Buy Me a Coffee
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
