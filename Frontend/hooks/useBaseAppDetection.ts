"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";

export function useBaseAppDetection() {
  const { context } = useMiniKit();

  // Base App client FID is 309857
  const isBaseApp = context?.client?.clientFid === 309857;

  return {
    isBaseApp,
    context,
    clientFid: context?.client?.clientFid,
  };
}
