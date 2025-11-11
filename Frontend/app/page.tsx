"use client";

import { useMiniKit, useIsInMiniApp } from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import { DRVNDashboard } from "./components/DRVNDashboard";

export default function HomePage() {
  const { context, isFrameReady, setFrameReady } = useMiniKit();
  const { isInMiniApp } = useIsInMiniApp();

  useEffect(() => {
    console.log("🚀 Frame ready status:", isFrameReady);
    console.log("🚀 Is in mini app:", isInMiniApp);
    console.log("🚀 Context available:", !!context);

    if (!isFrameReady) {
      console.log("🚀 Setting frame ready...");
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady, isInMiniApp, context]);

  // Debug context data when available
  useEffect(() => {
    if (context) {
      console.log("🚀 Context data:", {
        user: context.user,
        client: context.client,
        location: context.location,
      });
    }
  }, [context]);

  // Always check for context availability when in mini app
  if (isInMiniApp && !context) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00daa2] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm font-sans">
            Loading DRVN VHCLS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Frame Status Indicator - Only show in mini app */}
      {/* {isInMiniApp && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-mono">
          Frame Ready ✅
        </div>
      )} */}

      {/* Main Dashboard Content */}
      <main className="flex-1">
        <DRVNDashboard />
      </main>
    </div>
  );
}
