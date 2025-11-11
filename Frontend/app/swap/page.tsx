"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { SwapInterface } from "./components/swap-interface";
// import { useRouter } from "next/navigation";
import { HeroHeader } from "../components/ui/hero-header";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  xHandle?: string;
  profileImage?: string;
  walletAddress: string;
  bio?: string; // Add bio field
  createdAt: string;
  updatedAt: string;
}

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  // const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data when wallet is connected
  useEffect(() => {
    const fetchUserData = async () => {
      if (address && isConnected) {
        try {
          const response = await fetch("/api/auth/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: address }),
          });

          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData.user);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [address, isConnected]);

  // const handleBackClick = () => {
  //   router.push("/");
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00daa2] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm">Loading swap interface...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Header */}
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <HeroHeader
            title="DRVN Swap"
            subtitle="Swap ETH for BSTR tokens and manage your digital assets"
            backgroundImage="/Cars/SupraHero2.jpg"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex justify-center">
          <SwapInterface
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
