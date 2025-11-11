"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X, Wrench, Car, Key, Home, Settings } from "lucide-react";
import { SignupModal } from "./signup-modal";
import { SigninModal } from "./signin-modal";
import { useAccount, useDisconnect } from "wagmi";
import Image from "next/image";
import { ConnectButton } from "../web3/ConnectButton";

interface AuthChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthChoiceModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthChoiceModalProps) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "signup" | "signin" | null
  >(null);

  // Check if user exists when wallet connects
  useEffect(() => {
    const checkUserExists = async () => {
      if (address && isOpen && userExists === null) {
        setIsChecking(true);
        try {
          const response = await fetch("/api/auth/check-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: address }),
          });

          if (response.ok) {
            const data = await response.json();
            setUserExists(data.exists);

            // If user has an existing account, automatically sign them in
            if (data.exists) {
              // Auto-sign in the user since account exists
              onSuccess();
              onClose();
              return;
            }

            // If no account exists and user selected signup, show signup modal
            if (selectedAction === "signup") {
              setShowSignupModal(true);
            }
            // If no account exists and user selected signin, show error and disconnect
            else if (selectedAction === "signin") {
              disconnect();
              setUserExists(null);
              setSelectedAction(null);
              alert(
                "No account found for this wallet address. Please create a new account.",
              );
              return;
            }
            // If no action selected yet and no account exists, show signup modal
            else if (!selectedAction) {
              setShowSignupModal(true);
              setSelectedAction("signup");
            }
          }
        } catch (error) {
          console.error("Error checking user existence:", error);
          setUserExists(false); // Default to signup if error
          if (selectedAction === "signin") {
            // Auto-disconnect wallet since we can't verify
            disconnect();
            setUserExists(null);
            setSelectedAction(null);
            alert("Unable to verify account. Please try again.");
          } else {
            setShowSignupModal(true);
          }
        } finally {
          setIsChecking(false);
        }
      }
    };

    checkUserExists();
  }, [
    address,
    isOpen,
    userExists,
    selectedAction,
    disconnect,
    onSuccess,
    onClose,
  ]);

  const handleSignupClick = () => {
    setSelectedAction("signup");
    // Don't show modal yet - wait for wallet connection
  };

  const handleSigninClick = () => {
    setSelectedAction("signin");
    // Don't show modal yet - wait for wallet connection
  };

  const handleSignupClose = () => {
    setShowSignupModal(false);
    setUserExists(null); // Reset for next time
    setSelectedAction(null);
  };

  const handleSigninClose = () => {
    setShowSigninModal(false);
    setUserExists(null); // Reset for next time
    setSelectedAction(null);
  };

  const handleSignupSuccess = () => {
    onSuccess();
    setShowSignupModal(false);
    setUserExists(null);
    setSelectedAction(null);
  };

  const handleSigninSuccess = () => {
    onSuccess();
    setShowSignupModal(false);
    setUserExists(null);
    setSelectedAction(null);
  };

  // If wallet is not connected, show the choice modal with wallet connection
  if (!address) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 p-4">
        {/* Garage Door Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-60"></div>

        {/* Car background overlay */}
        {/* <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/newHero.png')",
              filter: "blur(2px) brightness(0.3)",
            }}
          ></div>
        </div> */}

        <Card className="w-full max-w-lg bg-gradient-to-b from-gray-900 to-black border border-white/50 relative overflow-hidden">
          {/* Garage Door Lines */}
          {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00daa2] to-transparent opacity-40"></div>
          <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00daa2] to-transparent opacity-20"></div>
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00daa2] to-transparent opacity-10"></div> */}

          {/* Close Button - Styled like a garage door handle */}
          <div className="flex flex-row justify-end mt-4 mr-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-transform"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardHeader className="flex items-center justify-center space-y-0 pb-0">
            <CardTitle className="text-[#00daa2] text-center text-2xl font-mono mb-2 -mt-5">
              GARAGE ACCESS
            </CardTitle>
          </CardHeader>

          {/* Logo with garage styling */}
          <div className="flex justify-center mb-4 relative">
            <div className="relative">
              <Image
                src="/Cars/DRVNWHITE.png"
                alt="DRVN VHCLS"
                width={100}
                height={100}
                className="mx-auto w-auto h-auto"
              />
              {/* Garage door effect around logo */}
              {/* <div className="absolute inset-0 border-2 border-[#00daa2]/20 rounded-full animate-pulse"></div> */}
            </div>
          </div>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-300 text-sm font-sans mb-6 tracking-wide">
                Welcome to the home of onchain car culture!
              </p>
            </div>

            <div className="space-y-4">
              {/* Create Account - Styled like a garage key */}
              <Button
                onClick={handleSignupClick}
                className="w-full bg-gradient-to-r from-[#00daa2] to-[#00b894] text-black hover:from-[#00b894] hover:to-[#00daa2] font-bold font-mono h-10 text-lg shadow-lg shadow-[#00daa2]/30 transition-all duration-300 border-2 border-[#00daa2]/50 hover:border-[#00daa2] hover:scale-[1.02]"
              >
                <Home className="h-5 w-5 mr-3" />
                Create New Garage
              </Button>

              {/* Sign In - Styled like a garage access card */}
              <Button
                onClick={handleSigninClick}
                variant="outline"
                className="w-full border-2 border-[#00daa2] text-[#00daa2] bg-transparent font-bold font-mono h-10 text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#00daa2]/20"
              >
                <Key className="h-5 w-5 mr-3" />
                Unlock Your Garage
              </Button>
            </div>

            {/* Wallet Connection Section - Styled like a garage security system */}
            {selectedAction && (
              <div className="space-y-4 pt-6 border-t-2 border-[#00daa2]/30">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    {/* <Zap className="h-5 w-5 text-[#00daa2] mr-2 animate-pulse" /> */}
                    <p className="text-[#00daa2] text-sm font-mono font-bold">
                      {selectedAction === "signup"
                        ? "🔧 Connect or Create New Wallet to Unlock Your Garage"
                        : "🔐 Login to Your Existing Garage"}
                    </p>
                    {/* <Zap className="h-5 w-5 text-[#00daa2] ml-2 animate-pulse" /> */}
                  </div>
                </div>

                <div>
                  <ConnectButton />
                </div>
              </div>
            )}

            {/* Footer - Garage mechanic style */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-xs font-sans tracking-wide">
                <span className="text-[#00daa2] font-bold">CONNECT</span> your
                wallet to access your{" "}
                <span className="text-[#00daa2] font-bold">
                  AUTOMOTIVE WORKSHOP
                </span>
              </p>
              <div className="flex justify-center mt-2 space-x-2">
                <Car className="h-4 w-4 text-[#00daa2]" />
                <Wrench className="h-4 w-4 text-[#00daa2]" />
                <Settings className="h-4 w-4 text-[#00daa2]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If wallet is connected but we're still checking, show loading with garage theme
  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 p-4">
        <Card className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-2 border-[#00daa2]/30 shadow-2xl shadow-[#00daa2]/20">
          <CardContent className="space-y-6 text-center py-8">
            {/* Garage door loading animation */}
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00daa2]/20 border-t-[#00daa2] mx-auto"></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#00daa2]/10 animate-ping"></div>
            </div>
            <p className="text-[#00daa2] text-sm font-mono font-bold tracking-wide">
              🔧 SCANNING GARAGE ACCESS CREDENTIALS...
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-[#00daa2] rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-[#00daa2] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#00daa2] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If wallet is connected and we know the user status, show appropriate modal
  return (
    <>
      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleSignupClose}
        onSwitchToSignin={() => {
          setShowSignupModal(false);
          setShowSigninModal(true);
        }}
        onSuccess={handleSignupSuccess}
      />

      {/* Signin Modal */}
      <SigninModal
        isOpen={showSigninModal}
        onClose={handleSigninClose}
        onSwitchToSignup={() => {
          setShowSigninModal(false);
          setShowSignupModal(true);
        }}
        onSuccess={handleSigninSuccess}
      />
    </>
  );
}
