// DRVN Swap Types - Custom types for our platform
import type { Token } from "@coinbase/onchainkit/token";

// Import OnChainKit token interface
interface OnChainKitToken {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  image: string;
  chainId: number;
}

// DRVN specific tokens in OnChainKit format
export const DRVN_TOKENS: Record<string, Token> = {
  ETH: {
    name: "Ethereum",
    address: "", // Native ETH has empty address
    symbol: "ETH",
    decimals: 18,
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
    chainId: 8453, // Base mainnet
  },
  BSTR: {
    name: "Buster",
    address: "0xbfc5cd421bbc91a2ca976c4ab1754748634b7d41", // Actual BSTR contract address
    symbol: "BSTR",
    decimals: 9,
    image: "/Cars/BSTR-Logo-Official.png", // Local image path
    chainId: 8453, // Base mainnet
  },
  USDC: {
    name: "USD Coin",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base USDC
    symbol: "USDC",
    decimals: 6,
    image:
      "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
    chainId: 8453,
  },
  CBBTC: {
    name: "Coinbase Wrapped BTC",
    address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    symbol: "cbBTC",
    decimals: 8,
    image: "/Cars/cbbtc.webp",
    chainId: 8453,
  },
  DBRO: {
    name: "Decentral Bros",
    address: "0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F",
    symbol: "DBRO",
    decimals: 8,
    image: "/Cars/DBRO.jpg",
    chainId: 8453,
  },
};

/**
 * Get dynamic token data from OnChainKit API
 * This function fetches the latest official token data for supported assets
 */
export async function getDynamicTokenData(): Promise<
  Record<string, Partial<OnChainKitToken>>
> {
  // Import the utility function
  const { getOnChainKitTokens, FALLBACK_TOKENS } = await import(
    "../../../lib/coinbase-assets"
  );

  // Define which tokens to fetch from OnChainKit
  const onchainTokens = ["ETH", "USDC", "CBBTC", "DBRO"];

  try {
    // Fetch tokens from OnChainKit API
    const onchainData = await getOnChainKitTokens(onchainTokens);

    // Combine with fallbacks and local images
    const result: Record<string, Partial<OnChainKitToken>> = {};

    // Add OnChainKit data
    Object.entries(onchainData).forEach(([key, token]) => {
      result[key] = token;
    });

    // Add fallbacks for missing tokens
    Object.entries(FALLBACK_TOKENS).forEach(([key, fallback]) => {
      if (!result[key]) {
        result[key] = fallback;
      }
    });

    // Add BSTR (local token)
    result.BSTR = {
      name: "Buster",
      symbol: "BSTR",
      decimals: 9,
      chainId: 8453,
      image: "/Cars/BSTR-Logo-Official.png",
    };

    return result;
  } catch (error) {
    console.error("Error fetching dynamic token data:", error);
    // Return fallbacks if API fails
    return {
      ...FALLBACK_TOKENS,
      BSTR: {
        name: "Buster",
        symbol: "BSTR",
        decimals: 9,
        chainId: 8453,
        image: "/Cars/BSTR-Logo-Official.png",
      },
    };
  }
}

/**
 * Update token data dynamically
 * Call this function to refresh all token data from OnChainKit
 */
export async function updateTokenData(): Promise<void> {
  try {
    const dynamicTokens = await getDynamicTokenData();

    // Update the DRVN_TOKENS with fresh data
    Object.keys(DRVN_TOKENS).forEach((tokenKey) => {
      if (dynamicTokens[tokenKey]) {
        const newToken = dynamicTokens[tokenKey];
        if (newToken.image) {
          DRVN_TOKENS[tokenKey].image = newToken.image;
        }
        if (newToken.decimals) {
          DRVN_TOKENS[tokenKey].decimals = newToken.decimals;
        }
        if (newToken.name) {
          DRVN_TOKENS[tokenKey].name = newToken.name;
        }
      }
    });

    console.log("✅ Token data updated successfully");
  } catch (error) {
    console.error("❌ Error updating token data:", error);
  }
}
