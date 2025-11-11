"use client";

import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  xHandle?: string;
  profileImage?: string;
  walletAddress: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

interface AutoWalletAuthState {
  isChecking: boolean;
  userExists: boolean | null;
  currentUser: User | null;
  isAuthenticated: boolean;
  shouldShowSignup: boolean;
  error: string | null;
}

export function useAutoWalletAuth() {
  const { address, isConnected } = useAccount();
  const [state, setState] = useState<AutoWalletAuthState>({
    isChecking: false,
    userExists: null,
    currentUser: null,
    isAuthenticated: false,
    shouldShowSignup: false,
    error: null,
  });

  const checkUserAccount = useCallback(async () => {
    if (!address || !isConnected) {
      setState((prev) => ({
        ...prev,
        isChecking: false,
        userExists: null,
        currentUser: null,
        isAuthenticated: false,
        shouldShowSignup: false,
        error: null,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isChecking: true, error: null }));

    try {
      // First check if user exists
      const checkResponse = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: address }),
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();

        if (checkData.exists) {
          // User exists, fetch their full profile
          const userResponse = await fetch("/api/auth/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: address }),
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setState((prev) => ({
              ...prev,
              isChecking: false,
              userExists: true,
              currentUser: userData.user,
              isAuthenticated: true,
              shouldShowSignup: false,
              error: null,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              isChecking: false,
              userExists: true,
              currentUser: null,
              isAuthenticated: false,
              shouldShowSignup: false,
              error: "Failed to fetch user profile",
            }));
          }
        } else {
          // User doesn't exist, should show signup
          setState((prev) => ({
            ...prev,
            isChecking: false,
            userExists: false,
            currentUser: null,
            isAuthenticated: false,
            shouldShowSignup: true,
            error: null,
          }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          isChecking: false,
          userExists: null,
          currentUser: null,
          isAuthenticated: false,
          shouldShowSignup: false,
          error: "Failed to check user account",
        }));
      }
    } catch (error) {
      console.error("Error checking user account:", error);
      setState((prev) => ({
        ...prev,
        isChecking: false,
        userExists: null,
        currentUser: null,
        isAuthenticated: false,
        shouldShowSignup: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  }, [address, isConnected]);

  const handleSignupSuccess = useCallback(() => {
    // Refresh user data after successful signup
    checkUserAccount();
  }, [checkUserAccount]);

  const handleSigninSuccess = useCallback(() => {
    // Refresh user data after successful signin
    checkUserAccount();
  }, [checkUserAccount]);

  const resetAuthState = useCallback(() => {
    setState({
      isChecking: false,
      userExists: null,
      currentUser: null,
      isAuthenticated: false,
      shouldShowSignup: false,
      error: null,
    });
  }, []);

  // Auto-check when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      checkUserAccount();
    } else {
      resetAuthState();
    }
  }, [isConnected, address, checkUserAccount, resetAuthState]);

  return {
    ...state,
    checkUserAccount,
    handleSignupSuccess,
    handleSigninSuccess,
    resetAuthState,
  };
}
