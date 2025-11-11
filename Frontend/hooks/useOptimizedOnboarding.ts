"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { useMiniKit, useIsInMiniApp } from "@coinbase/onchainkit/minikit";
import { useAutoWalletAuth } from "./useAutoWalletAuth";

interface OnboardingState {
  hasSeenFirstRender: boolean;
  hasTriggeredProtectedAction: boolean;
  hasCompletedFirstAction: boolean;
  showAuthPrompt: boolean;
  showWalletPrompt: boolean;
}

export function useOptimizedOnboarding() {
  const { isConnected } = useAccount();
  const { context, isFrameReady, setFrameReady } = useMiniKit();
  const { isInMiniApp } = useIsInMiniApp();

  // Import the auto wallet auth hook to check custom authentication
  const { isAuthenticated } = useAutoWalletAuth();

  const [state, setState] = useState<OnboardingState>({
    hasSeenFirstRender: false,
    hasTriggeredProtectedAction: false,
    hasCompletedFirstAction: false,
    showAuthPrompt: false,
    showWalletPrompt: false,
  });

  // Track first render and ensure frame is ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    if (!state.hasSeenFirstRender) {
      setState((prev) => ({ ...prev, hasSeenFirstRender: true }));
    }
  }, [state.hasSeenFirstRender]);

  // Progressive disclosure: only show auth when needed for protected actions
  const triggerProtectedAction = useCallback(
    (actionType: "buy" | "post" | "personalize" | "trade") => {
      setState((prev) => ({ ...prev, hasTriggeredProtectedAction: true }));

      // Check if authentication is needed based on action type
      if (actionType === "buy" || actionType === "trade") {
        // For onchain actions, check if wallet is connected
        if (!isConnected) {
          setState((prev) => ({ ...prev, showWalletPrompt: true }));
          return false; // Action blocked, show wallet prompt
        }
      }

      if (actionType === "post" || actionType === "personalize") {
        // For social actions, check if user is authenticated
        if (!context?.user?.fid) {
          setState((prev) => ({ ...prev, showAuthPrompt: true }));
          return false; // Action blocked, show auth prompt
        }
      }

      return true; // Action can proceed
    },
    [isConnected, context?.user?.fid],
  );

  // Mark action as completed
  const markActionCompleted = useCallback(() => {
    setState((prev) => ({
      ...prev,
      hasCompletedFirstAction: true,
      showAuthPrompt: false,
      showWalletPrompt: false,
    }));
  }, []);

  // Dismiss prompts
  const dismissAuthPrompt = useCallback(() => {
    setState((prev) => ({ ...prev, showAuthPrompt: false }));
  }, []);

  const dismissWalletPrompt = useCallback(() => {
    setState((prev) => ({ ...prev, showWalletPrompt: false }));
  }, []);

  // Get personalized content based on context
  const getPersonalizedContent = useCallback(() => {
    if (context?.user?.fid) {
      return {
        isPersonalized: true,
        userName: context.user.fid,
        welcomeMessage: `Welcome back! Ready to explore more cars?`,
      };
    }

    return {
      isPersonalized: false,
      userName: null,
      welcomeMessage:
        "Welcome to DRVN VHCLS! Explore our exclusive car collections.",
    };
  }, [context?.user?.fid]);

  // Check if user can access protected features
  const canAccessProtectedFeature = useCallback(
    (feature: "marketplace" | "garage" | "trading" | "social") => {
      switch (feature) {
        case "marketplace":
        case "trading":
          return isConnected; // Need wallet for onchain actions
        case "garage":
        case "social":
          // Check for either Farcaster authentication OR custom authentication
          return context?.user?.fid || isAuthenticated;
        default:
          return true; // Public features
      }
    },
    [isConnected, context?.user?.fid, isAuthenticated],
  );

  // Check if we're in a mini app and context is loading
  const isLoading = isInMiniApp && !context;

  return {
    ...state,
    triggerProtectedAction,
    markActionCompleted,
    dismissAuthPrompt,
    dismissWalletPrompt,
    getPersonalizedContent,
    canAccessProtectedFeature,
    // Context data
    isConnected,
    userFid: context?.user?.fid,
    isBaseApp: !!context?.client?.clientFid,
    // Loading and context states
    isLoading,
    isInMiniApp,
    context,
    isFrameReady,
  };
}
