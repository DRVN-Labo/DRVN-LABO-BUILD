"use client";

import { useAccount } from "wagmi";
import { DRVN_TOKENS } from "../types/swap-types";
import { SwapCard } from "./swap-card";
import {
  Swap,
  SwapAmountInput,
  SwapToggleButton,
  SwapButton,
  SwapMessage,
  SwapToast,
  SwapSettings,
  SwapSettingsSlippageDescription,
  SwapSettingsSlippageInput,
  SwapSettingsSlippageTitle,
} from "@coinbase/onchainkit/swap";
import { ConnectButton } from "../../components/web3/ConnectButton";

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

interface SwapInterfaceProps {
  isAuthenticated?: boolean;
  currentUser?: User | null;
}

export function SwapInterface({
  isAuthenticated = false,
  currentUser = null,
}: SwapInterfaceProps) {
  const { address, isConnected } = useAccount();

  // Convert DRVN tokens to array format for OnChainKit
  const swappableTokens = Object.values(DRVN_TOKENS);

  // If wallet not connected, show connect message
  if (!isConnected || !address) {
    return (
      <SwapCard>
        <div className="text-center py-8">
          <div className="text-gray-400 text-sm mb-4">
            Connect your wallet to start swapping
          </div>
          <div className="text-sm mb-6">
            You need to connect your wallet to swap ETH ↔ BSTR
          </div>
          <div className="mb-6">
            <ConnectButton />
          </div>
          <div className="text-xs text-gray-500">
            Connect your wallet to access the DRVN swap interface
          </div>
        </div>
      </SwapCard>
    );
  }

  // If wallet connected but not authenticated, show authentication message
  if (!isAuthenticated || !currentUser) {
    return (
      <SwapCard>
        <div className="text-center py-8">
          <div className="text-gray-400 text-sm mb-4">
            Setting up your account...
          </div>
          <div className="text-sm mb-6">
            Please wait while we verify your wallet connection
          </div>
          <div className="text-xs text-gray-500">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
      </SwapCard>
    );
  }

  // User is connected and authenticated - show swap interface
  return (
    <div className="space-y-6">
      <SwapCard>
        <div className="relative" style={{ zIndex: 9999 }}>
          <Swap
            experimental={{
              useAggregator: true, // Use 0x aggregator for better quotes
            }}
            onSuccess={(transactionReceipt) => {
              console.log("Swap completed successfully:", transactionReceipt);
            }}
            onError={(error) => {
              console.error("Swap failed:", error);
            }}
          >
            {/* Swap Settings */}
            <SwapSettings>
              <SwapSettingsSlippageTitle>
                Max. slippage
              </SwapSettingsSlippageTitle>
              <SwapSettingsSlippageDescription>
                Your swap will revert if the prices change by more than the
                selected percentage.
              </SwapSettingsSlippageDescription>
              <SwapSettingsSlippageInput />
            </SwapSettings>

            {/* From Token Input */}
            <SwapAmountInput
              label="You Pay"
              swappableTokens={swappableTokens}
              token={DRVN_TOKENS.ETH} // Default to ETH
              type="from"
            />

            {/* Toggle Button */}
            <SwapToggleButton />

            {/* To Token Input */}
            <SwapAmountInput
              label="You Receive"
              swappableTokens={swappableTokens}
              token={DRVN_TOKENS.BSTR} // Default to BSTR
              type="to"
            />

            {/* Swap Button */}
            <SwapButton />

            {/* Swap Message */}
            <SwapMessage />

            {/* Swap Toast */}
            <SwapToast />
          </Swap>
        </div>
      </SwapCard>
    </div>
  );
}
