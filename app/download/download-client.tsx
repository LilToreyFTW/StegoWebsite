"use client";

/**
 * Final Master Build – Updated in existing files only
 * Download page client component
 * Handles license key redemption and tool download
 * Connects to NeonDB API for key validation
 */

import { useState } from "react";
import { Download, Key, Check, AlertCircle, Lock, Shield } from "lucide-react";

interface LicenseKey {
  id: string;
  key: string;
  type: string;
  status: "active" | "redeemed" | "expired";
  redeemedAt?: string;
}

export function DownloadClient() {
  const [redeemKey, setRedeemKey] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [keys, setKeys] = useState<LicenseKey[]>([
    {
      id: "key_001",
      key: "SPM-XXXX-XXXX-XXXX",
      type: "Lifetime",
      status: "active"
    }
  ]);
  const [canDownload, setCanDownload] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemKey.trim()) return;

    setRedeeming(true);
    setError(null);

    try {
      // Final Master Build: Connect to NeonDB API for key redemption
      const response = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: redeemKey }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const newKey: LicenseKey = {
          id: result.key.id || `key_${Date.now()}`,
          key: redeemKey,
          type: result.key.type || "24-Hour",
          status: "redeemed",
          redeemedAt: new Date().toISOString().split("T")[0]
        };

        setKeys([...keys, newKey]);
        setCanDownload(true);
        setShowSuccess(true);
        setRedeemKey("");
      } else {
        setError(result.error || "Failed to redeem key. Please check your key and try again.");
      }
    } catch (err) {
      console.error("Redemption error:", err);
      setError("Network error. Please try again later.");
    } finally {
      setRedeeming(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const handleDownload = () => {
    // Final Master Build: Tool download initiation
    // In production with CLOUDFLARE R2 configured:
    // window.location.href = `${process.env.NEXT_PUBLIC_TOOL_DOWNLOAD_URL}/StegoProxyMasker-v4.0.exe`;
    
    const link = document.createElement("a");
    link.href = "/api/download/tool";
    link.download = "StegoProxyMasker-v4.0.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveKey = keys.some(k => k.status === "active" || k.status === "redeemed");

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Download StegoProxy Masker</h1>
        <p className="text-muted-foreground">
          Download the desktop application after redeeming your license key.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Redeem Key Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full bg-primary/10 p-2">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Redeem Your Key</h2>
          </div>

          {showSuccess && (
            <div className="rounded-md bg-green-500/10 border border-green-500/20 text-green-400 p-4 mb-6">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                Key redeemed successfully! You can now download the tool.
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 text-red-400 p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleRedeem} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">License Key</label>
              <input
                type="text"
                value={redeemKey}
                onChange={(e) => setRedeemKey(e.target.value.toUpperCase())}
                placeholder="SPM-XXXX-XXXX-XXXX"
                className="w-full rounded-md border border-border bg-background px-4 py-2 font-mono"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the key you received via email after payment verification.
              </p>
            </div>

            <button
              type="submit"
              disabled={redeeming || !redeemKey.trim()}
              className="w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {redeeming ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Redeeming...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4" />
                  Redeem Key
                </>
              )}
            </button>
          </form>

          {/* Key List */}
          {keys.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium mb-3">Your Keys</h3>
              <div className="space-y-2">
                {keys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="font-mono">{key.key}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        key.status === "active" ? "bg-green-500/10 text-green-400" :
                        key.status === "redeemed" ? "bg-blue-500/10 text-blue-400" :
                        "bg-red-500/10 text-red-400"
                      }`}>
                        {key.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`rounded-full p-2 ${canDownload || hasActiveKey ? "bg-primary/10" : "bg-muted"}`}>
              <Download className={`h-5 w-5 ${canDownload || hasActiveKey ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <h2 className="text-xl font-semibold">Download Tool</h2>
          </div>

          {!hasActiveKey && !canDownload ? (
            <div className="text-center py-12">
              <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Download Locked</h3>
              <p className="text-muted-foreground text-sm mb-4">
                You need to purchase and redeem a license key to download the tool.
              </p>
              <a
                href="/buy-keys"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                Buy Keys
              </a>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="rounded-full bg-green-500/10 p-4 w-fit mx-auto mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Download</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Your license is active. Download the StegoProxy Masker desktop application.
              </p>
              
              <div className="bg-muted rounded-md p-4 mb-6 text-left">
                <h4 className="text-sm font-medium mb-2">System Requirements:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Windows 10/11 (64-bit)</li>
                  <li>• 4GB RAM minimum</li>
                  <li>• 100MB disk space</li>
                  <li>• Internet connection for license verification</li>
                </ul>
              </div>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-5 w-5" />
                Download v4.0 (.exe)
              </button>
              
              <p className="text-xs text-muted-foreground mt-4">
                File size: ~45MB • Version 4.0 (Final)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 rounded-lg border border-border bg-muted/50 p-6">
        <h3 className="text-lg font-semibold mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <div className="rounded-full bg-primary/10 text-primary w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium mb-1">Purchase</h4>
              <p className="text-sm text-muted-foreground">
                Buy a license key via Buy Me a Coffee and upload your receipt.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="rounded-full bg-primary/10 text-primary w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium mb-1">Wait for Verification</h4>
              <p className="text-sm text-muted-foreground">
                Your receipt will be manually verified (usually within 24 hours).
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="rounded-full bg-primary/10 text-primary w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium mb-1">Redeem & Download</h4>
              <p className="text-sm text-muted-foreground">
                Redeem your key on this page and download the desktop tool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
