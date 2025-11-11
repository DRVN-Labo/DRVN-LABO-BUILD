/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export function useFarcasterSDK() {
  useEffect(() => {
    // Call ready() to dismiss the splash screen when app is fully loaded
    const initializeFarcaster = async () => {
      try {
        await sdk.actions.ready();
        console.log(
          "✅ Farcaster SDK ready() called - splash screen dismissed",
        );
      } catch (error) {
        console.log(
          "ℹ️ Not running in Farcaster environment or SDK not available",
        );
      }
    };

    initializeFarcaster();
  }, []);
}
