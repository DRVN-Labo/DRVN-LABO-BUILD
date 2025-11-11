"use client";

import {
  useOpenUrl,
  useComposeCast,
  useViewProfile,
} from "@coinbase/onchainkit/minikit";

export function useMiniKitNavigation() {
  const openUrl = useOpenUrl();
  const composeCastHook = useComposeCast();
  const viewProfile = useViewProfile();

  const handleExternalLink = (url: string) => {
    if (openUrl) {
      openUrl(url);
    } else {
      // Fallback for non-MiniKit environments
      window.open(url, "_blank");
    }
  };

  const handleShare = (text: string, url?: string) => {
    try {
      // Check if composeCastHook is available and has a mutate function
      if (
        composeCastHook &&
        "mutate" in composeCastHook &&
        typeof composeCastHook.mutate === "function"
      ) {
        composeCastHook.mutate({
          text,
          embeds: url ? [url] : [window.location.href],
        });
      } else {
        // Fallback for non-MiniKit environments
        if (navigator.share) {
          navigator.share({
            title: "DRVN/VHCLS",
            text,
            url: url || window.location.href,
          });
        } else {
          // Copy to clipboard fallback
          navigator.clipboard.writeText(url || window.location.href);
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback to clipboard
      navigator.clipboard.writeText(url || window.location.href);
    }
  };

  const handleViewProfile = (fid: number) => {
    if (viewProfile) {
      viewProfile(fid);
    } else {
      // Fallback for non-MiniKit environments
      window.open(`https://warpcast.com/${fid}`, "_blank");
    }
  };

  return {
    handleExternalLink,
    handleShare,
    handleViewProfile,
    openUrl,
    composeCast: composeCastHook,
    viewProfile,
  };
}
