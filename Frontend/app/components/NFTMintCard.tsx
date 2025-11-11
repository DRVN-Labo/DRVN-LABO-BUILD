"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatUnits } from "viem";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/toast-context";
import deployedContracts from "../../contracts/deployedContracts";
import Confetti from "react-confetti";
import Image from "next/image";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Coins,
  Gift,
  Users,
  Wallet,
} from "lucide-react";
import { AllBenefitsModal } from "./modals/all-benefits-modal";
import { BenefitsModal } from "./modals/benefits-modal";

// Contract addresses from your deployed contracts
const CONTRACTS = {
  SteelBuster: {
    address: "0x7923976a80cefFd50B31fD02B6cf7Cf5e0596280" as `0x${string}`,
    name: "DRVN Steel Key",
    image: "/Cars/Steel.gif",
    color: "from-gray-900 to-black",
    borderColor: "border-gray-500",
  },
  CarbonBuster: {
    address: "0xc2C24F1b84f6641f449bB75971deC9F059084F9B" as `0x${string}`,
    name: "DRVN Carbon Key",
    image: "/Cars/Carbon.gif",
    color: "from-gray-900 to-black",
    borderColor: "border-gray-600",
  },
  TitaniumBuster: {
    address: "0xa4CF51a9a3baF3b8eaab318e296ac3f56E3c029d" as `0x${string}`,
    name: "DRVN Titanium Key",
    image: "/Cars/Titanium.gif",
    color: "from-gray-900 to-black",
    borderColor: "border-gray-700",
  },
};

interface MintCardProps {
  contractName: "SteelBuster" | "CarbonBuster" | "TitaniumBuster";
  onMintSuccess?: () => void;
}

export default function NFTMintCard({
  contractName,
  onMintSuccess,
}: MintCardProps) {
  const { address, isConnected } = useAccount();
  const [showBenefits, setShowBenefits] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [isApproving, setIsApproving] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [pendingMintAmount, setPendingMintAmount] = useState(1);
  const [hasTriggeredSuccess, setHasTriggeredSuccess] = useState(false);
  const { addToast, removeToastByType } = useToast();

  const contract = CONTRACTS[contractName];
  const contractConfig = deployedContracts[8453][contractName];
  const contractAddress = contractConfig.address as `0x${string}`;
  const usdcConfig = deployedContracts[8453].USDC;
  const usdcAddress = usdcConfig.address as `0x${string}`;

  // Read contract data
  const { data: mintPrice } = useReadContract({
    address: contractAddress,
    abi: contractConfig.abi,
    functionName: "mintPrice",
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: bigint | undefined };

  const { data: maxSupply } = useReadContract({
    address: contractAddress,
    abi: contractConfig.abi,
    functionName: "maxSupply",
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: bigint | undefined };

  const { data: totalMinted } = useReadContract({
    address: contractAddress,
    abi: contractConfig.abi,
    functionName: "totalMinted",
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: bigint | undefined };

  const { data: saleActive } = useReadContract({
    address: contractAddress,
    abi: contractConfig.abi,
    functionName: "saleActive",
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: boolean | undefined };

  const { data: rewardStatus } = useReadContract({
    address: contractAddress,
    abi: contractConfig.abi,
    functionName: "rewardStatusForMint",
    args: [BigInt(mintAmount)],
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: [boolean, bigint] | undefined };

  const { data: airdropFlag } = useReadContract({
    address: contractAddress,
    abi: contractConfig.abi,
    functionName: "airdropFlag",
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: boolean | undefined };

  // Check USDC allowance
  const { data: allowance } = useReadContract({
    address: usdcAddress,
    abi: usdcConfig.abi,
    functionName: "allowance",
    args:
      address && usdcAddress
        ? ([address, contractAddress] as const)
        : undefined,
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: bigint | undefined };

  // Add USDC balance check
  const { data: usdcBalance } = useReadContract({
    address: usdcAddress,
    abi: usdcConfig.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: bigint | undefined };

  // Add BSTR token balance check
  const { data: bstrBalance } = useReadContract({
    address: deployedContracts[8453].BUSTERToken.address as `0x${string}`,
    abi: deployedContracts[8453].BUSTERToken.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      refetchInterval: 15000,
      staleTime: 0,
    },
  }) as { data: bigint | undefined };

  // USDC approval
  const {
    writeContract: approveUSDC,
    data: approveData,
    isPending: isApprovingTx,
  } = useWriteContract();

  // Mint function
  const {
    writeContract: mint,
    data: mintData,
    isPending: isMintingTx,
  } = useWriteContract();

  // Wait for transactions
  const {
    isLoading: isApprovingReceipt,
    isSuccess: isApprovalSuccess,
    isError: isApprovalError,
  } = useWaitForTransactionReceipt({
    hash: approveData,
  });

  const {
    isLoading: isMintingReceipt,
    isSuccess: isMintingSuccess,
    isError: isMintingError,
  } = useWaitForTransactionReceipt({
    hash: mintData,
  });

  // Reset success flag when mintData changes (new mint attempt)
  useEffect(() => {
    if (mintData) {
      setHasTriggeredSuccess(false);
    }
  }, [mintData]);

  // Cleanup toasts when component unmounts
  useEffect(() => {
    return () => {
      removeToastByType("minting", contractName);
      removeToastByType("approve", contractName);
      setHasTriggeredSuccess(false); // Reset success flag on unmount
    };
  }, [removeToastByType, contractName]);

  // Handle approval flow
  useEffect(() => {
    if (approveData && !isApprovingReceipt) {
      if (isApprovalSuccess) {
        setIsApproving(false);
        // Remove the "approve" toast and show success
        removeToastByType("approve", contractName);
        addToast({
          type: "success",
          title: "USDC Approved Successfully",
          message: `USDC approved for ${contract.name} minting`,
          contractName: contractName,
        });
        // Force a refresh of the allowance data
        // This will trigger a re-render and show the mint button
        console.log(
          `Approval successful for ${contractName}, allowance should update soon`,
        );
      } else if (isApprovalError) {
        setIsApproving(false);
        // Remove the "approve" toast and show error
        removeToastByType("approve", contractName);
        addToast({
          type: "error",
          title: "Approval Failed",
          message: `Failed to approve USDC for ${contract.name}`,
          contractName: contractName,
        });
      }
    }
  }, [
    approveData,
    isApprovingReceipt,
    isApprovalSuccess,
    isApprovalError,
    addToast,
    removeToastByType,
    contract.name,
    contractName,
  ]);

  // Handle minting flow
  useEffect(() => {
    if (mintData && !isMintingReceipt) {
      if (isMintingSuccess && !hasTriggeredSuccess) {
        setIsMinting(false);
        setMintAmount(1);
        setPendingMintAmount(1); // Reset pending amount
        setHasTriggeredSuccess(true); // Mark success as triggered

        // Remove the "minting" toast and show success
        removeToastByType("minting", contractName);
        addToast({
          type: "success",
          title: "Minting Successful!",
          message: `Successfully minted ${pendingMintAmount} ${contract.name} key${pendingMintAmount > 1 ? "s" : ""}`,
          contractName: contractName,
          quantity: pendingMintAmount,
          hash: mintData,
        });
        onMintSuccess?.(); // Call the prop function
      } else if (isMintingError) {
        setIsMinting(false);
        setPendingMintAmount(1); // Reset pending amount
        // Remove the "minting" toast and show error
        removeToastByType("minting", contractName);
        addToast({
          type: "error",
          title: "Minting Failed",
          message: `Failed to mint ${contract.name} key${pendingMintAmount > 1 ? "s" : ""}`,
          contractName: contractName,
          quantity: pendingMintAmount,
        });
      }
    }
  }, [
    mintData,
    isMintingReceipt,
    isMintingSuccess,
    isMintingError,
    addToast,
    removeToastByType,
    contract.name,
    contractName,
    pendingMintAmount,
    onMintSuccess,
    hasTriggeredSuccess,
  ]);

  // Calculate available supply for minting
  const availableSupply =
    maxSupply && totalMinted !== undefined
      ? Number(maxSupply) - Number(totalMinted)
      : 0;

  // Calculate total cost
  const totalCost =
    mintPrice && mintAmount ? mintPrice * BigInt(mintAmount) : BigInt(0);
  const hasEnoughAllowance =
    allowance && totalCost ? allowance >= totalCost : false;

  // Button states - directly follow transaction status
  const isApprovalPending = isApproving || isApprovingTx || isApprovingReceipt;
  const isMintingPending = isMinting || isMintingTx || isMintingReceipt;

  // Show approve button only when needed and not pending
  const showApproveButton =
    !hasEnoughAllowance && !isApprovalPending && !isMintingPending;

  // Show mint button only when approved and not pending
  const showMintButton =
    hasEnoughAllowance && !isMintingPending && !isApprovalPending;

  // Handle retry scenarios after errors
  const showRetryApproval =
    !hasEnoughAllowance &&
    !isApprovalPending &&
    (isApprovalError || isMintingError);
  const showRetryMint =
    hasEnoughAllowance && !isMintingPending && isMintingError;

  // Debug logging for button states
  useEffect(() => {
    console.log(`${contractName} Button States:`, {
      hasEnoughAllowance,
      isApprovalPending,
      isMintingPending,
      showApproveButton,
      showMintButton,
      allowance: allowance?.toString(),
      totalCost: totalCost?.toString(),
    });
  }, [
    contractName,
    hasEnoughAllowance,
    isApprovalPending,
    isMintingPending,
    showApproveButton,
    showMintButton,
    allowance,
    totalCost,
  ]);

  // Handle USDC approval
  const handleApprove = () => {
    if (!mintPrice || !mintAmount || !isConnected || hasEnoughAllowance) return;

    setIsApproving(true);
    const totalCost = mintPrice * BigInt(mintAmount);

    // Show approval toast
    addToast({
      type: "approve",
      title: "Approve USDC",
      message: `Approving USDC for ${contract.name} minting...`,
      contractName: contractName,
      quantity: mintAmount,
    });

    approveUSDC({
      address: usdcAddress,
      abi: usdcConfig.abi,
      functionName: "approve",
      args: [contractAddress, totalCost] as const,
    });
  };

  // Handle mint
  const handleMint = () => {
    if (!mintAmount || !hasEnoughAllowance || !isConnected) return;

    setIsMinting(true);
    setPendingMintAmount(mintAmount);
    setHasTriggeredSuccess(false); // Reset success flag for new mint
    removeToastByType("minting", contractName);

    // Show minting toast
    addToast({
      type: "minting",
      title: "Minting in Progress",
      message: `Minting ${mintAmount} ${contract.name} key${mintAmount > 1 ? "s" : ""}...`,
      contractName: contractName,
      quantity: mintAmount,
    });

    mint({
      address: contractAddress,
      abi: contractConfig.abi,
      functionName: "mint",
      args: [BigInt(mintAmount)] as const,
    });
  };

  // Format reward status
  const formatRewardStatus = () => {
    if (!rewardStatus) return "Loading...";

    const [active, totalRewards] = rewardStatus;

    if (!active) return "Rewards disabled";

    const totalRewardAmount = formatUnits(totalRewards, 9);

    // Limit BSTR to 4 decimal places for better readability
    const parts = totalRewardAmount.split(".");
    const formattedAmount =
      parts[1] && parts[1].length > 4
        ? parts[0] + "." + parts[1].substring(0, 4)
        : totalRewardAmount;

    return `${formattedAmount} BSTR`;
  };

  // Format USDC price
  const formatPrice = (price: bigint) => {
    return formatUnits(price, 6); // USDC has 6 decimals
  };

  // Format percentage
  const formatPercentage = (minted: bigint, max: bigint) => {
    if (!minted || !max) return "0%";
    const percentage = (Number(minted) / Number(max)) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <>
      <Card
        className={`bg-gradient-to-br ${contract.color} border ${contract.borderColor} hover:border-gray-400 transition-all duration-300 hover:shadow-xl`}
      >
        <CardContent className="p-4">
          {/* Header with Image and Name */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={contract.image}
                alt={contract.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {contract.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Coins className="w-3 h-3" />
                <span>
                  Key #
                  {contractName === "SteelBuster"
                    ? "0"
                    : contractName === "CarbonBuster"
                      ? "1"
                      : "2"}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-gray-400 text-xs mb-1">Supply</div>
              <div className="text-white font-bold text-sm">
                {maxSupply?.toString() || "0"}
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-gray-400 text-xs mb-1">Minted</div>
              <div className="text-white font-bold text-sm">
                {totalMinted?.toString() || "0"}
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-gray-400 text-xs mb-1">Available</div>
              <div className="text-white font-bold text-sm">
                {availableSupply}
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-gray-400 text-xs mb-1">Price</div>
              <div className="text-white font-bold text-sm">
                {mintPrice ? `${formatPrice(mintPrice)} USDC` : "..."}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>
                {totalMinted && maxSupply
                  ? `${formatPercentage(totalMinted, maxSupply)}`
                  : "0%"}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width:
                    maxSupply && totalMinted
                      ? `${(Number(totalMinted) / Number(maxSupply)) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-black/20 rounded-lg p-2">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-3 h-3 text-yellow-400" />
                <span className="text-gray-400 text-xs">Mint Rewards</span>
              </div>
              <div className="text-white text-xs">{formatRewardStatus()}</div>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-3 h-3 text-green-400" />
                <span className="text-gray-400 text-xs">Auto Airdrop</span>
              </div>
              <div className="text-white text-xs">
                {airdropFlag ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs">Yes</span>
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-xs">No</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sale Status */}
          <div className="bg-black/20 rounded-lg p-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">Sale Status</span>
              <span
                className={`text-xs font-medium ${saleActive ? "text-green-400" : "text-red-400"}`}
              >
                {saleActive ? "🟢 Active" : "🔴 Inactive"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-1">
            <Wallet className="w-3 h-3 text-green-400" />
            <p className="text-gray-300 text-xs">Wallet Balances</p>
          </div>

          {/* Wallet Balances - Only show when connected */}
          {isConnected && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-black/20 rounded-lg p-2">
                <div className="text-gray-400 text-xs mb-1">USDC</div>
                <div className="text-white font-bold text-sm">
                  {usdcBalance
                    ? `$${Number(formatUnits(usdcBalance, 6)).toLocaleString()}`
                    : "$0.00"}
                </div>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <div className="text-gray-400 text-xs mb-1">BSTR</div>
                <div className="text-white font-bold text-sm">
                  {bstrBalance
                    ? Number(formatUnits(bstrBalance, 9)).toLocaleString()
                    : "0"}
                </div>
              </div>
            </div>
          )}

          {/* Minting Interface */}
          {isConnected && saleActive ? (
            <div className="space-y-3">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <label className="text-gray-300 text-xs font-medium">
                  Quantity:
                </label>
                <Input
                  type="number"
                  min="1"
                  max={availableSupply || 100}
                  value={mintAmount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    // Allow typing while data is loading, validate on blur or submit
                    if (value >= 0) {
                      setMintAmount(value);
                    }
                  }}
                  onBlur={(e) => {
                    // Validate on blur to ensure value is within bounds
                    const value = parseInt(e.target.value) || 1;
                    if (availableSupply && value > availableSupply) {
                      setMintAmount(availableSupply);
                    } else if (value < 1) {
                      setMintAmount(1);
                    }
                  }}
                  className="w-20 bg-black/20 border-gray-600 text-white text-center text-sm"
                  placeholder="Enter amount"
                />
                <span className="text-green-400 text-xs">
                  / {availableSupply}
                </span>
              </div>

              {/* Total Cost */}
              <div className="bg-black/20 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs">Total Cost</span>
                  <span className="text-white font-bold text-sm">
                    ${totalCost ? `${formatPrice(totalCost)} USDC` : "0 USDC"}
                  </span>
                </div>
              </div>

              {/* View Benefits Button */}
              <div className="mb-4">
                <Button
                  onClick={() => setShowBenefits(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-mono"
                  size="sm"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  View Benefits
                </Button>
              </div>

              {/* Action Buttons */}
              {showApproveButton && (
                <Button
                  onClick={handleApprove}
                  disabled={isApprovalPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 text-sm"
                >
                  {isApprovalPending ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    "Approve USDC"
                  )}
                </Button>
              )}
              {showRetryApproval && (
                <Button
                  onClick={handleApprove}
                  disabled={isApprovalPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 text-sm"
                >
                  {isApprovalPending ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    "Retry Approval"
                  )}
                </Button>
              )}
              {showMintButton && (
                <Button
                  onClick={handleMint}
                  disabled={isMintingPending}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 text-sm"
                >
                  {isMintingPending ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    `Mint ${mintAmount} Key${mintAmount > 1 ? "s" : ""}`
                  )}
                </Button>
              )}
              {showRetryMint && (
                <Button
                  onClick={handleMint}
                  disabled={isMintingPending}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 text-sm"
                >
                  {isMintingPending ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    `Retry Mint`
                  )}
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-3">
              {!isConnected ? (
                <div className="text-gray-400 text-xs">
                  Connect wallet to mint
                </div>
              ) : !saleActive ? (
                <div className="text-red-400 text-xs">
                  Sale is currently inactive
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benefits Modal */}
      {showBenefits && (
        <BenefitsModal
          isOpen={showBenefits}
          onClose={() => setShowBenefits(false)}
          keyType={
            contractName.toLowerCase().replace("buster", "") as
              | "steel"
              | "carbon"
              | "titanium"
          }
        />
      )}
    </>
  );
}

// Main component that renders all three mint cards
export function NFTMintGrid() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showBenefits, setShowBenefits] = useState(false);

  // Set window dimensions on mount
  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // Function to trigger confetti from child components
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Confetti Effect */}
      {showConfetti && windowDimensions.width > 0 && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={[
            "#00daa2",
            "#00b894",
            "#ff6b6b",
            "#4ecdc4",
            "#45b7d1",
            "#96ceb4",
            "#feca57",
            "#ff9ff3",
          ]}
        />
      )}

      {/* Header */}
      <div className="text-left mb-8 mt-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Founder&apos;s Club Keys
        </h1>
        <p className="text-left text-gray-400 max-w-2xl">
          Collect your DRVN Founder&apos;s Club keys to unlock exclusive
          benefits, larger rewards, and voting power within the DRVN DAO.
        </p>
      </div>

      {/* Mint Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <NFTMintCard
          contractName="SteelBuster"
          onMintSuccess={triggerConfetti}
        />
        <NFTMintCard
          contractName="CarbonBuster"
          onMintSuccess={triggerConfetti}
        />
        <NFTMintCard
          contractName="TitaniumBuster"
          onMintSuccess={triggerConfetti}
        />
      </div>

      {/* Holder Benefits Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setShowBenefits(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-mono px-8 py-3 text-lg"
          size="lg"
        >
          <Gift className="w-5 h-5 mr-2" />
          Holder Benefits
        </Button>
      </div>

      {/* Additional Info */}
      {/* <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-2">3</div>
            <div className="text-gray-400 text-sm">Unique Key Types</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2">200</div>
            <div className="text-gray-400 text-sm">Total Supply</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2">BSTR</div>
            <div className="text-gray-400 text-sm">Reward Token</div>
          </div>
        </div>
      </div> */}

      {/* All Benefits Modal */}
      <AllBenefitsModal
        isOpen={showBenefits}
        onClose={() => setShowBenefits(false)}
      />
    </div>
  );
}
