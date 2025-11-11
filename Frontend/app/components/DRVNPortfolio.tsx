/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAccount, useBalance, useReadContract } from "wagmi";
import { TokenChip, formatAmount } from "@coinbase/onchainkit/token";
import { DRVN_TOKENS } from "../swap/types/swap-types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Car, Vault } from "lucide-react";
import { formatUnits } from "viem";
import deployedContracts from "../../contracts/deployedContracts";
import Image from "next/image";
import ETHPriceDisplay from "../../service/priceService";

/**
 * User interface representing the structure of user data
 * This matches the MongoDB schema and API responses
 * Note: This interface is duplicated from Settings.tsx - consider moving to a shared types file
 */
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
 * Props interface for the DRVNPortfolio component
 * @param currentUser - The currently authenticated user's data
 * @param isAuthenticated - Boolean indicating if user is authenticated
 */
interface DRVNPortfolioProps {
  currentUser: User | null;
  isAuthenticated: boolean;
  onNavigate?: (page: string) => void;
}

/**
 * DRVN Portfolio Component
 *
 * This component displays a user's DRVN ecosystem portfolio including:
 * - BSTR (DRVN ecosystem token) balance - 9 decimals (real-time from blockchain)
 * - Car Collection balance - placeholder for future NFT collection data
 * - Vault Balance - placeholder for future vault/staking data
 *
 * The component features:
 * - Real-time BSTR balance fetching using Wagmi hooks
 * - Placeholder displays for future features (Car Collection, Vault)
 * - Responsive grid layout for different screen sizes
 * - User identification display
 * - Animated visual indicators
 * - Consistent styling with DRVN brand colors
 *
 * Authentication Requirements:
 * - Wallet must be connected
 * - User must be authenticated
 * - Current user data must be available
 */
export function DRVNPortfolio({
  currentUser,
  isAuthenticated,
  onNavigate,
}: DRVNPortfolioProps) {
  // Wagmi hook to get connected wallet information
  const { address, isConnected } = useAccount();

  // Contract addresses for vault assets
  const usdcConfig = deployedContracts[8453].USDC;
  const usdcAddress = usdcConfig.address as `0x${string}`;

  // Token balance fetching using Wagmi's useBalance hook
  // BSTR token balance - DRVN ecosystem token
  const { data: bstrBalance } = useBalance({
    address,
    token: DRVN_TOKENS.BSTR.address as `0x${string}`,
  });

  // Vault asset balances - USDC and ETH
  const { data: usdcBalanceData } = useReadContract({
    address: usdcAddress,
    abi: usdcConfig.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      refetchInterval: 30000, // Refresh every 30 seconds
    },
  });

  const { data: ethBalanceData } = useBalance({
    address: address,
    query: {
      refetchInterval: 30000, // Refresh every 30 seconds
    },
  });

  // Early return if wallet not connected or user not authenticated
  // This prevents the component from rendering without proper authentication
  if (!isConnected || !isAuthenticated || !currentUser) {
    return null;
  }

  // Calculate vault values
  const usdcBalance = usdcBalanceData
    ? formatUnits(usdcBalanceData as unknown as bigint, 6)
    : "0";
  const ethBalance = ethBalanceData
    ? formatUnits(ethBalanceData.value, 18)
    : "0";

  // For demo purposes, assuming 1 ETH = $3000 (you can integrate with a price API later)
  const ethPrice = 3000;
  const ethValue = parseFloat(ethBalance) * ethPrice;
  const usdcValue = parseFloat(usdcBalance);
  const totalVaultValue = (ethValue + usdcValue).toFixed(2);

  /**
   * Helper function to format token balances using OnChainKit's formatAmount
   * Applies the correct decimal precision for each token type
   * BSTR is limited to 4 decimal places for better readability
   * @param balance - The balance data from Wagmi useBalance hook
   * @param decimals - The number of decimals for the specific token
   * @returns Formatted balance string with proper decimal precision
   */
  const formatBalance = (balance: any, decimals: number) => {
    if (!balance?.formatted) return "0.00";

    // For BSTR token, limit to 4 decimal places for better readability
    const maxDecimals = decimals === 9 ? 4 : Math.min(decimals, 4);

    // Use OnChainKit's formatAmount for consistent formatting
    // This handles locale-specific formatting and proper decimal precision
    return formatAmount(balance.formatted, {
      minimumFractionDigits: Math.min(maxDecimals, 2), // Show at least 2 decimals
      maximumFractionDigits: maxDecimals, // Limit to 4 decimals for BSTR
    });
  };

  return (
    <Card className="bg-none backdrop-blur-sm border-none">
      <CardHeader className="pb-4">
        {/* Portfolio Title with Animated Indicator */}
        <CardTitle className="text-white font-mono text-lg flex items-center gap-2 uppercase">
          <div className="w-2 h-2 bg-[#00daa2] rounded-full animate-pulse"></div>
          Portfolio
        </CardTitle>

        {/* Wallet Address Display - Truncated for security */}
        {/* <p className="text-gray-400 text-sm font-sans">
          Wallet: {address?.slice(0, 6)}...{address?.slice(-5)}
        </p> */}
      </CardHeader>

      <CardContent>
        {/* Token Balance Grid - Responsive 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BSTR Balance Card - DRVN ecosystem token (9 decimals) */}
          <div
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 cursor-pointer hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-200"
            onClick={() => onNavigate?.("buster-club")}
          >
            <div className="flex items-center justify-between mb-2">
              <TokenChip token={DRVN_TOKENS.BSTR} />
              <span className="text-gray-400 text-xs font-sans">Balance</span>
            </div>
            {/* Main balance display - Uses BSTR's 9 decimals with formatAmount */}
            <div className="text-2xl font-bold text-white font-mono">
              {formatBalance(bstrBalance, DRVN_TOKENS.BSTR.decimals)}
            </div>
          </div>

          {/* Car Collection Card - Placeholder for future implementation */}
          <div
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 cursor-pointer hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-200"
            onClick={() => onNavigate?.("garage")}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-950 rounded-lg flex items-center justify-center">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">Car Collection</span>
              </div>
              <span className="text-gray-400 text-xs font-sans">Balance</span>
            </div>
            {/* Placeholder balance - will be updated when car collection data is available */}
            <div className="text-2xl font-bold text-white font-mono">0</div>
          </div>

          {/* Vault Balance Card - Real-time vault values */}
          <div
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 cursor-pointer hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-200"
            onClick={() => onNavigate?.("garage")}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-950 rounded-lg flex items-center justify-center">
                  <Vault className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">Vault Balance</span>
              </div>
              <span className="text-gray-400 text-xs font-sans">
                Total Value
              </span>
            </div>
            {/* Real-time vault balance - USDC + ETH value */}
            <div className="text-2xl font-bold text-white font-mono">
              ${parseFloat(totalVaultValue).toLocaleString()}
            </div>
            {/* Asset breakdown */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Image
                    src="/Cars/usdc.png"
                    alt="USDC"
                    width={12}
                    height={12}
                    className="w-3 h-3 rounded-full"
                  />
                  <span className="text-gray-400">USDC</span>
                </div>
                <span className="text-gray-300 font-mono">
                  ${parseFloat(usdcBalance).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Image
                    src="/Cars/base-logo.png"
                    alt="Base ETH"
                    width={12}
                    height={12}
                    className="w-3 h-3 rounded-full"
                  />
                  <span className="text-gray-400">ETH</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-300 font-mono">
                    {parseFloat(ethBalance).toFixed(4)}
                  </div>
                  {parseFloat(ethBalance) > 0 && (
                    <ETHPriceDisplay
                      ethAmount={ethBalance}
                      className="text-xs text-green-400 font-mono"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Summary Section - User identification */}
        {/* <div className="mt-2 border border-gray-700/50 p-2 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-sans text-sm">
              Connected Account:
            </span>
            <span className="text-[#00daa2] font-mono font-semibold">
              {currentUser.username ||
                `${currentUser.firstName} ${currentUser.lastName}`}
            </span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
