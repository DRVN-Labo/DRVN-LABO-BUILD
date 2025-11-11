"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useOptimizedOnboarding } from "../../hooks/useOptimizedOnboarding";

interface ProgressiveActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  actionType: "buy" | "post" | "personalize" | "trade" | "explore";
  feature: "marketplace" | "garage" | "trading" | "social" | "public";
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export function ProgressiveActionButton({
  children,
  onClick,
  actionType,
  feature,
  className,
  variant = "default",
  size = "default",
  disabled = false,
}: ProgressiveActionButtonProps) {
  const {
    triggerProtectedAction,
    canAccessProtectedFeature,
    showAuthPrompt,
    showWalletPrompt,
    dismissAuthPrompt,
    dismissWalletPrompt,
  } = useOptimizedOnboarding();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (disabled || isProcessing) return;

    // For public features, allow immediate action
    if (feature === "public" || actionType === "explore") {
      if (onClick) {
        onClick();
      }
      return;
    }

    // Check if user can access this feature
    if (!canAccessProtectedFeature(feature)) {
      // Trigger progressive disclosure
      const canProceed = triggerProtectedAction(actionType);

      if (!canProceed) {
        // Show appropriate prompt (handled by the hook)
        return;
      }
    }

    // User has access, proceed with action
    setIsProcessing(true);
    try {
      if (onClick) {
        await onClick();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Show appropriate prompt based on what's needed
  if (showAuthPrompt && (feature === "garage" || feature === "social")) {
    return (
      <div className="space-y-3">
        <Button
          onClick={handleClick}
          className={className}
          variant={variant}
          size={size}
          disabled={disabled || isProcessing}
        >
          {isProcessing ? "Processing..." : children}
        </Button>
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">
            Sign in to{" "}
            {actionType === "personalize"
              ? "personalize your experience"
              : "access this feature"}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={dismissAuthPrompt}
              className="text-xs"
            >
              Maybe Later
            </Button>
            <Button
              size="sm"
              onClick={() => {
                // Trigger the existing auth modal system
                const event = new CustomEvent("showAuthModal");
                window.dispatchEvent(event);
                dismissAuthPrompt();
              }}
              className="text-xs bg-[#00daa2] hover:bg-[#00b894] text-black"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (
    showWalletPrompt &&
    (feature === "marketplace" || feature === "trading")
  ) {
    return (
      <div className="space-y-3">
        <Button
          onClick={handleClick}
          className={className}
          variant={variant}
          size={size}
          disabled={disabled || isProcessing}
        >
          {isProcessing ? "Processing..." : children}
        </Button>
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">
            Connect your wallet to{" "}
            {actionType === "buy" ? "make purchases" : "trade tokens"}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={dismissWalletPrompt}
              className="text-xs"
            >
              Browse Only
            </Button>
            <Button
              size="sm"
              onClick={() => {
                // Trigger wallet connection
                const event = new CustomEvent("connectWallet");
                window.dispatchEvent(event);
                dismissWalletPrompt();
              }}
              className="text-xs bg-[#00daa2] hover:bg-[#00b894] text-black"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default button
  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
      disabled={disabled || isProcessing}
    >
      {isProcessing ? "Processing..." : children}
    </Button>
  );
}
