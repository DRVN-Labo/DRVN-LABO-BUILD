"use client";

import { SwapInterface } from "../../swap/components/swap-interface";
import { X } from "lucide-react";

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
 * Props interface for the BusterSwapModal component
 * @param currentUser - The currently authenticated user's data
 * @param isAuthenticated - Boolean indicating if user is authenticated
 * @param swapType - Whether this is a 'buy' or 'sell' operation
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to close the modal
 */
interface BusterSwapModalProps {
  currentUser: User | null;
  isAuthenticated: boolean;
  swapType: "buy" | "sell";
  isOpen: boolean;
  onClose: () => void;
}

/**
 * BusterSwapModal Component
 *
 * This component provides a focused swap interface specifically for the Buster Club
 * It only shows ETH and BSTR tokens for a clean, focused trading experience
 *
 * Features:
 * - ETH ↔ BSTR swapping only
 * - Real-time price updates
 * - Slippage settings
 * - Transaction status
 * - Responsive design for PC and mobile
 */
export function BusterSwapModal({
  currentUser,
  isAuthenticated,
  swapType,
  isOpen,
  onClose,
}: BusterSwapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-950 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-950 relative z-[999999]">
          <div>
            <h2 className="text-xl font-bold text-white">
              {swapType === "buy" ? "Buy BSTR" : "Sell BSTR"}
            </h2>
            <p className="text-gray-400 text-sm">
              {swapType === "buy"
                ? "Swap ETH for BSTR tokens"
                : "Swap BSTR tokens for ETH"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-400 p-2 border border-red-500 hover:border-red-400 rounded-full transition-colors w-8 h-8 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Swap Interface - Using full SwapInterface with all available tokens */}
        <div className="p-6 relative z-[999999]">
          <SwapInterface
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
