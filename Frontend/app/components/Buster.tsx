"use client";

import { useState, useEffect } from "react";
import { DRVN_TOKENS } from "../swap/types/swap-types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  TrendingUp,
  BarChart3,
  Users,
  Droplets,
  // RefreshCw
} from "lucide-react";
import Image from "next/image";
import { fetchTokenData, TokenData } from "../../lib/token-data";
import { BusterSwapModal } from "./modals/buster-swap-modal";
import { NFTMintGrid } from "./NFTMintCard";
import TotalKeysMinted from "./web3/TotalKeysMinted";
import { HeroHeader } from "./ui/hero-header";

// Add User interface for authentication
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  xHandle?: string;
  profileImage?: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Props interface for the Buster component
 * @param currentUser - The currently authenticated user's data
 * @param isAuthenticated - Boolean indicating if user is authenticated
 */
interface BusterProps {
  currentUser: User | null;
  isAuthenticated: boolean;
}

/**
 * Buster Component
 *
 * This component displays comprehensive information about the BSTR token including:
 * - Hero banner with DRVN ecosystem messaging
 * - Token price in USD and ETH
 * - Market data (Market Cap, 24HR Volume, Holders, Liquidity)
 * - Action buttons (Connect Wallet, Buy, Sell)
 *
 * Data Sources:
 * - Primary: OnChainKit for token info and basic data
 * - Fallback: Alchemy RPC for detailed contract data if needed
 *
 * Features:
 * - Real-time price updates
 * - Market statistics
 * - Interactive trading buttons
 * - Responsive design
 */
export function Buster({ currentUser, isAuthenticated }: BusterProps) {
  // Props are used in the SwapInterface modal below

  // Token data state - start with empty data to show loading states
  const [tokenData, setTokenData] = useState<TokenData>({
    usdPrice: "Loading...",
    ethPrice: "Loading...",
    priceChange: "Loading...",
    marketCap: "Loading...",
    volume24h: "Loading...",
    holders: "Loading...",
    liquidity: "Loading...",
  });

  const [isLoading, setIsLoading] = useState(true);
  // const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Modal state for swap interface
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapType, setSwapType] = useState<"buy" | "sell">("buy");

  // Fetch token data on component mount and set up real-time refresh
  useEffect(() => {
    loadTokenData();

    // Set up real-time data refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      loadTokenData();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  /**
   * Load token data using the utility functions
   * This will attempt multiple data sources in order of preference
   */
  const loadTokenData = async () => {
    setIsLoading(true);
    console.log("🔄 Starting to load token data...");

    try {
      const data = await fetchTokenData();
      console.log("✅ Token data received:", data);
      setTokenData(data);
      // setLastUpdated(new Date())
    } catch (error) {
      console.error("❌ Error loading token data:", error);
      // Token data already has fallback values
    } finally {
      setIsLoading(false);
      console.log("🏁 Finished loading token data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Banner Section */}
        <HeroHeader
          title="Buster Club"
          subtitle="Buy, trade, earn, and hold $BSTR to unlock greater benefits, larger rewards, and more voting power within the DRVN DAO."
          backgroundImage="/Cars/BusterHero2.jpg"
        />

        {/* Token Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Token Info and Price */}
          <div className="lg:col-span-1 space-y-4">
            {/* Token Identification and Price */}
            <Card className="bg-gray-900/50 border border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Token Icon - Larger and more prominent */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-[#000000]">
                      <Image
                        src={DRVN_TOKENS.BSTR.image || ""}
                        alt="BSTR Token"
                        width={80}
                        height={80}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Price Information */}
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-white font-mono mb-2">
                      {isLoading ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : (
                        `$${tokenData.usdPrice}`
                      )}
                    </div>
                    <div className="text-lg text-gray-300 font-mono mb-1">
                      {isLoading ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : (
                        `◆${tokenData.ethPrice}`
                      )}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {isLoading ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : (
                        tokenData.priceChange
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-[#00daa2] hover:bg-[#00b894] text-black font-mono py-2"
                  size="sm"
                  onClick={() => {
                    setSwapType("buy");
                    setShowSwapModal(true);
                  }}
                >
                  Buy
                </Button>
                <Button
                  variant="outline"
                  className="border-[#00daa2] text-[#00daa2] hover:bg-[#00daa2] hover:text-black font-mono py-2"
                  size="sm"
                  onClick={() => {
                    setSwapType("sell");
                    setShowSwapModal(true);
                  }}
                >
                  Sell
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Market Data */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column - Market Cap & Volume */}
                  <div className="space-y-6">
                    {/* Market Cap */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm font-mono">
                          Market Cap
                        </div>
                        <div className="text-white font-bold font-mono">
                          {isLoading ? "Loading..." : tokenData.marketCap}
                        </div>
                      </div>
                    </div>

                    {/* 24 HR Volume */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm font-mono">
                          24 HR Volume
                        </div>
                        <div className="text-white font-bold font-mono">
                          {isLoading ? "Loading..." : tokenData.volume24h}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Holders & Liquidity */}
                  <div className="space-y-6">
                    {/* Holders */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm font-mono">
                          Holders
                        </div>
                        <div className="text-white font-bold font-mono">
                          {isLoading ? "Loading..." : tokenData.holders}
                        </div>
                      </div>
                    </div>

                    {/* Liquidity */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm font-mono">
                          Liquidity
                        </div>
                        <div className="text-white font-bold font-mono">
                          {isLoading ? "Loading..." : tokenData.liquidity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Founder's Club Keys Section */}
        <div className="mt-8">
          <NFTMintGrid />
        </div>
        <TotalKeysMinted />
      </div>

      {/* Buster Swap Modal */}
      <BusterSwapModal
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        swapType={swapType}
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
      />
    </div>
  );
}
