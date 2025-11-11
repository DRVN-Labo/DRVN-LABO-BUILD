/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAccount, useReadContract, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Car,
  TrendingUp,
  ChevronDown,
  Coins,
  Key,
  //   Trophy,
} from "lucide-react";
import Image from "next/image";
import deployedContracts from "../../contracts/deployedContracts";
import ETHPriceDisplay from "../../service/priceService";
import { useState } from "react";
import { BusterSwapModal } from "./modals/token-swap-modal";
import { HeroHeader } from "./ui/hero-header";

// Type for the reward config tuple returned by the contract
type RewardConfig = [
  string, // bstr
  string, // vault
  boolean, // isContract
  bigint, // perUnit
  boolean, // enabled
  boolean, // onAirdrop
  boolean, // strict
];

/**
 * My NFT Keys Component
 * Displays user's owned NFT keys from all three DRVN collections
 */
function MyNFTKeys() {
  const { address, isConnected } = useAccount();

  // Contract addresses for the three collections
  const steelConfig = deployedContracts[8453].SteelBuster;
  const carbonConfig = deployedContracts[8453].CarbonBuster;
  const titaniumConfig = deployedContracts[8453].TitaniumBuster;

  // Read balances from all three contracts
  const { data: steelBalance } = useReadContract({
    address: steelConfig.address as `0x${string}`,
    abi: steelConfig.abi,
    functionName: "balanceOfKey",
    args: address ? [address] : undefined,
    query: { refetchInterval: 30000 },
  });

  const { data: carbonBalance } = useReadContract({
    address: carbonConfig.address as `0x${string}`,
    abi: carbonConfig.abi,
    functionName: "balanceOfKey",
    args: address ? [address] : undefined,
    query: { refetchInterval: 30000 },
  });

  const { data: titaniumBalance } = useReadContract({
    address: titaniumConfig.address as `0x${string}`,
    abi: titaniumConfig.abi,
    functionName: "balanceOfKey",
    args: address ? [address] : undefined,
    query: { refetchInterval: 30000 },
  });

  // Read reward configuration from contracts
  const { data: steelRewardConfig } = useReadContract({
    address: steelConfig.address as `0x${string}`,
    abi: steelConfig.abi,
    functionName: "rewardConfig",
    query: { refetchInterval: 30000 },
  });

  const { data: carbonRewardConfig } = useReadContract({
    address: carbonConfig.address as `0x${string}`,
    abi: carbonConfig.abi,
    functionName: "rewardConfig",
    query: { refetchInterval: 30000 },
  });

  const { data: titaniumRewardConfig } = useReadContract({
    address: titaniumConfig.address as `0x${string}`,
    abi: titaniumConfig.abi,
    functionName: "rewardConfig",
    query: { refetchInterval: 30000 },
  });

  // Calculate BSTR rewards (assuming 9 decimals for BSTR, displayed with 4 decimals)
  const calculateBSTRRewards = (
    balance: bigint | undefined,
    rewardPerUnit: bigint | undefined,
  ) => {
    if (!balance || !rewardPerUnit) return "0";
    const totalRewards = balance * rewardPerUnit;
    const formattedRewards = formatUnits(totalRewards, 9);
    // Limit to 4 decimal places for better readability
    const parts = formattedRewards.split(".");
    if (parts[1] && parts[1].length > 4) {
      return parts[0] + "." + parts[1].substring(0, 4);
    }
    return formattedRewards;
  };

  // Helper function to safely extract reward per unit from the tuple
  const getRewardPerUnit = (
    config: RewardConfig | undefined,
  ): bigint | undefined => {
    if (!config || !Array.isArray(config) || config.length < 4)
      return undefined;
    return config[3]; // perUnit is at index 3
  };

  // Extract reward per unit values from contract calls
  const steelPerUnit = getRewardPerUnit(
    steelRewardConfig as RewardConfig | undefined,
  );
  const carbonPerUnit = getRewardPerUnit(
    carbonRewardConfig as RewardConfig | undefined,
  );
  const titaniumPerUnit = getRewardPerUnit(
    titaniumRewardConfig as RewardConfig | undefined,
  );

  // Ensure we have bigint values for the calculation
  const steelPerUnitBigInt =
    steelPerUnit && typeof steelPerUnit === "bigint" ? steelPerUnit : undefined;
  const carbonPerUnitBigInt =
    carbonPerUnit && typeof carbonPerUnit === "bigint"
      ? carbonPerUnit
      : undefined;
  const titaniumPerUnitBigInt =
    titaniumPerUnit && typeof titaniumPerUnit === "bigint"
      ? titaniumPerUnit
      : undefined;

  // Calculate rewards for each collection
  const steelRewards = calculateBSTRRewards(
    steelBalance as bigint | undefined,
    steelPerUnitBigInt,
  );
  const carbonRewards = calculateBSTRRewards(
    carbonBalance as bigint | undefined,
    carbonPerUnitBigInt,
  );
  const titaniumRewards = calculateBSTRRewards(
    titaniumBalance as bigint | undefined,
    titaniumPerUnitBigInt,
  );

  // Total keys owned (commented out as not currently used)
  // const totalKeys = (Number(steelBalance || 0) + Number(carbonBalance || 0) + Number(titaniumBalance || 0));

  if (!isConnected) {
    return (
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-gray-400 font-mono">
            <Key className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p>Signin / Sign Up + Connect your wallet to view your NFT keys</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-mono">
            Digital Collectibles
          </h2>
          {/* <div className="flex items-center gap-2">
            <IoIosKey className="w-5 h-5 text-yellow-500" />
            <span className="text-green-400 font-mono font-bold">
              {totalKeys} Total Keys
            </span>
          </div> */}
        </div>

        {/* Grand Total BSTR Rewards - Small version under header */}
        {/* <div className="mb-6 flex justify-end">
          <div className="flex items-center gap-1 px-2 py-2 bg-none rounded-lg border-b border-gray-700">
            <GiReceiveMoney className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-400 font-mono">BSTR Total Mint Rewards:</span>
            <span className="text-sm font-bold text-green-400 font-mono">
              {(() => {
                const steelReward = parseFloat(steelRewards || "0");
                const carbonReward = parseFloat(carbonRewards || "0");
                const titaniumReward = parseFloat(titaniumRewards || "0");
                const total = steelReward + carbonReward + titaniumReward;
                return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              })()}
            </span>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Steel Keys */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700">
                  <Image
                    src="/Cars/Steel.gif"
                    alt="Steel Key"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-white font-mono font-bold">Steel</span>
              </div>
              <span className="text-2xl font-bold text-white font-mono">
                {steelBalance ? Number(steelBalance) : 0}
              </span>
            </div>
            <div className="text-sm text-gray-300 font-mono">
              BSTR Rewards: {steelRewards}
            </div>
          </div>

          {/* Carbon Keys */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-r from-green-600 to-green-700">
                  <Image
                    src="/Cars/Carbon.gif"
                    alt="Carbon Key"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-white font-mono font-bold">Carbon</span>
              </div>
              <span className="text-2xl font-bold text-white font-mono">
                {carbonBalance ? Number(carbonBalance) : 0}
              </span>
            </div>
            <div className="text-sm text-gray-300 font-mono">
              BSTR Rewards: {carbonRewards}
            </div>
          </div>

          {/* Titanium Keys */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700">
                  <Image
                    src="/Cars/Titanium.gif"
                    alt="Titanium Key"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-white font-mono font-bold">Titanium</span>
              </div>
              <span className="text-2xl font-bold text-white font-mono">
                {titaniumBalance ? Number(titaniumBalance) : 0}
              </span>
            </div>
            <div className="text-sm text-gray-300 font-mono">
              BSTR Rewards: {titaniumRewards}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        {/* <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white font-mono">
                {steelBalance ? Number(steelBalance) : 0}
              </div>
              <div className="text-sm text-gray-400 font-mono">Steel Keys</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">
                {carbonBalance ? Number(carbonBalance) : 0}
              </div>
              <div className="text-sm text-gray-400 font-mono">Carbon Keys</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">
                {titaniumBalance ? Number(titaniumBalance) : 0}
              </div>
              <div className="text-sm text-gray-400 font-mono">Titanium Keys</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 font-mono">
                {totalKeys}
              </div>
              <div className="text-sm text-gray-400 font-mono">Total Keys</div>
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}

/**
 * Garage Component
 *
 * This component displays the user's garage with:
 * - Hero image of the garage
 * - Vehicle Collection stats (static for now)
 * - Assets Vault with real-time wallet balances (USDC + Base ETH)
 * - My NFT Keys showing owned keys and BSTR rewards
 *
 * Features:
 * - Real-time wallet balance updates
 * - Professional garage aesthetic
 * - Responsive design
 */
interface GarageProps {
  currentUser: any;
  isAuthenticated: boolean;
}

export function Garage({ currentUser, isAuthenticated }: GarageProps) {
  const { address, isConnected } = useAccount();
  const [showSwapModal, setShowSwapModal] = useState(false);

  // Contract addresses
  const usdcConfig = deployedContracts[8453].USDC;
  const usdcAddress = usdcConfig.address as `0x${string}`;

  // Fetch real wallet balances using wagmi hooks
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

  // Calculate total portfolio value
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
  const totalValue = (ethValue + usdcValue).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Banner Section */}
        <HeroHeader
          title="DRVN Garage"
          subtitle="Your personal collection of premium vehicles and digital assets"
          backgroundImage="/Cars/GarageV12.jpg"
        />

        {/* Vehicle Collection Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Vehicle Collection */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white font-mono">
                    Vehicle Collection
                  </h2>
                  <Button
                    className="bg-[#00daa2] hover:bg-[#00b894] text-black font-mono"
                    size="sm"
                  >
                    Marketplace
                  </Button>
                </div>

                {/* Summary Value */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-white font-mono mb-1">
                    $0
                  </div>
                  <div className="text-lg text-[#00daa2] font-mono">
                    0% 24hr
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-4">
                  {/* Cars Owned */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-none rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-red-500" />
                      </div>
                      <span className="text-white font-mono">Cars Owned</span>
                    </div>
                    <span className="text-white font-mono font-bold">0</span>
                  </div>

                  {/* 30 Day Performance */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-none rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[#00daa2]" />
                      </div>
                      <span className="text-white font-mono">
                        30 Day Performance
                      </span>
                    </div>
                    <span className="text-[#00daa2] font-mono font-bold">
                      0%
                    </span>
                  </div>

                  {/* Collection List */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-none rounded-lg flex items-center justify-center">
                        <Coins className="w-7 h-7 text-white/80" />
                      </div>
                      <span className="text-[#00daa2] font-mono">
                        Collection List
                      </span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-[#00daa2]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Assets Vault */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white font-mono mb-6">
                  Assets Vault
                </h2>

                {/* Total Value */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-white font-mono mb-1">
                    {isConnected ? (
                      `$${parseFloat(totalValue).toLocaleString()}`
                    ) : (
                      <span className="text-gray-400">Connect Wallet</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 font-mono">
                    Total Portfolio Value
                  </div>
                </div>

                {/* Asset Breakdown */}
                <div className="space-y-4">
                  {/* USDC Balance */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Image
                          src="/Cars/usdc.png"
                          alt="USDC"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                      <span className="text-white font-mono text-sm">
                        Base USDC
                      </span>
                    </div>
                    <span className="text-white font-mono font-bold">
                      {isConnected ? (
                        `$${parseFloat(usdcBalance).toLocaleString()}`
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </span>
                  </div>

                  {/* ETH Balance */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Image
                          src="/Cars/base-logo.png"
                          alt="Base ETH"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                      <span className="text-white font-mono text-sm">
                        Base ETH
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-mono font-bold">
                        {isConnected ? (
                          `${parseFloat(ethBalance).toFixed(4)}`
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                      {isConnected && parseFloat(ethBalance) > 0 && (
                        <ETHPriceDisplay
                          ethAmount={ethBalance}
                          className="text-xs text-[#00daa2] font-mono"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {!isConnected ? (
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-mono"
                      size="sm"
                    >
                      Connect Wallet
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-[#00daa2] hover:bg-[#00b894] text-black font-mono"
                      size="sm"
                      onClick={() => setShowSwapModal(true)}
                    >
                      Swap
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My NFT Keys Section */}
        <MyNFTKeys />
      </div>

      {/* Swap Modal - Placed outside main container for full viewport coverage */}
      <BusterSwapModal
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        swapType="buy"
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
      />
    </div>
  );
}
