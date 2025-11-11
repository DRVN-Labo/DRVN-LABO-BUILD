"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X } from "lucide-react";
import { useAccount } from "wagmi";
import {} from // Wallet,
// WalletDropdown,
// WalletDropdownDisconnect,
// ConnectWallet,
"@coinbase/onchainkit/wallet";
import {} from // Name,
// Identity,
// Avatar,
// Address,
// EthBalance,
"@coinbase/onchainkit/identity";
import { ConnectButton } from "../web3/ConnectButton";

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onSuccess: () => void;
}

export function SigninModal({
  isOpen,
  onClose,
  onSwitchToSignup,
  onSuccess,
}: SigninModalProps) {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignin = async () => {
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signin failed");
      }

      setSuccess(true);

      // Call onSuccess callback and close modal after a short delay
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Signin failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex-col justify-center items-center fixed inset-0 bg-black/50 flex z-50 p-4">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-end space-y-0 pb-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="text-red-500 border border-red-500 rounded-full size-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardTitle className="text-white text-xl font-mono text-center w-full mb-2">
          Sign In
        </CardTitle>
        <CardContent className="space-y-6 text-center">
          {success ? (
            <div className="py-8">
              <div className="text-green-400 text-lg font-mono mb-2">
                Success!
              </div>
              <div className="text-gray-300 text-sm font-mono">
                You have been signed in successfully.
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-gray-300 text-sm font-mono">
                  <a className="text-[#00daa2]">Connect</a> your wallet to sign
                  in
                </div>
                <div className="text-red-500 text-xs font-mono">
                  You must use the wallet address registered to your account!
                </div>
              </div>

              <div className="space-y-4">
                {address ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="text-center">
                        <div className="text-green-400 text-sm font-mono font-medium">
                          Connected
                        </div>
                        <div className="text-gray-400 text-xs font-mono">
                          {address.slice(0, 6)}...{address.slice(-4)}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSignin}
                      disabled={isLoading}
                      className="w-full max-w-xs bg-[#00daa2] text-black hover:bg-[#00daa2] font-medium font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <ConnectButton />
                  </div>
                )}
              </div>

              {error && (
                <div className="text-red-400 text-sm font-mono">{error}</div>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-gray-700">
            <span className="text-gray-400 text-sm font-mono">
              Don&apos;t have an account?{" "}
            </span>
            <button
              onClick={onSwitchToSignup}
              className="text-green-400 hover:text-green-300 text-sm font-medium font-mono"
            >
              Sign Up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
