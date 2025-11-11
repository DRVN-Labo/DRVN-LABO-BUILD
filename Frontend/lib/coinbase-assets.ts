/**
 * OnChainKit Token Utilities
 *
 * This module provides functions to fetch token data and images from OnChainKit's API.
 * It's used to dynamically get official token data for Base network tokens in the DRVN platform.
 */

export interface OnChainKitToken {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  image: string;
  chainId: number;
}

/**
 * Check if OnChainKit API is properly configured
 * @returns boolean - True if API key is available
 */
export function isOnChainKitConfigured(): boolean {
  const apiKey = process.env.NEXT_ONCHAINKIT_API_KEY;
  return !!apiKey;
}

/**
 * Fetch token data from OnChainKit API
 * @param searchTerm - The search term (symbol, name, or address)
 * @returns Promise<OnChainKitToken | null> - The token data or null if not found
 */
export async function getOnChainKitToken(
  searchTerm: string,
): Promise<OnChainKitToken | null> {
  try {
    console.log(`🔄 Fetching OnChainKit token data for ${searchTerm}...`);

    // Get API key from environment
    const apiKey = process.env.NEXT_ONCHAINKIT_API_KEY;
    if (!apiKey) {
      console.error("❌ OnChainKit API key not found in environment variables");
      return null;
    }

    // Use OnChainKit's getTokens API with authentication
    const response = await fetch(
      `https://api.onchainkit.com/v1/getTokens?search=${encodeURIComponent(searchTerm)}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.log(
        `⚠️ Token ${searchTerm} not found in OnChainKit API (${response.status})`,
      );
      return null;
    }

    const tokens = await response.json();

    if (tokens && tokens.length > 0) {
      const token = tokens[0];
      console.log(`✅ Found token for ${searchTerm}:`, token);
      return token;
    } else {
      console.log(`⚠️ No token found for ${searchTerm}`);
      return null;
    }
  } catch (error) {
    console.error(
      `❌ Error fetching OnChainKit token data for ${searchTerm}:`,
      error,
    );
    return null;
  }
}

/**
 * Fetch multiple tokens in batch from OnChainKit API
 * @param searchTerms - Array of search terms (symbols, names, or addresses)
 * @returns Promise<Record<string, OnChainKitToken>> - Object mapping search terms to token data
 */
export async function getOnChainKitTokens(
  searchTerms: string[],
): Promise<Record<string, OnChainKitToken>> {
  const results: Record<string, OnChainKitToken> = {};

  // Check if API is configured
  if (!isOnChainKitConfigured()) {
    console.error("❌ OnChainKit API not configured - cannot fetch tokens");
    return results;
  }

  console.log(`🔄 Fetching ${searchTerms.length} OnChainKit tokens...`);

  // Fetch tokens in parallel for better performance
  const promises = searchTerms.map(async (searchTerm) => {
    const token = await getOnChainKitToken(searchTerm);
    if (token) {
      results[searchTerm] = token;
    }
  });

  await Promise.all(promises);

  console.log(`✅ Fetched ${Object.keys(results).length} tokens`);
  return results;
}

/**
 * Fallback token data for common assets
 * These are used when the OnChainKit API doesn't have the token
 */
export const FALLBACK_TOKENS: Record<string, Partial<OnChainKitToken>> = {
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    chainId: 8453,
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    chainId: 8453,
    image:
      "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
  },
  CBBTC: {
    name: "Coinbase Wrapped BTC",
    symbol: "cbBTC",
    decimals: 8,
    chainId: 8453,
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  },
  DBRO: {
    name: "Decentral Bros",
    symbol: "DBRO",
    decimals: 8,
    chainId: 8453,
    image: "/Cars/DRVNWHITE.png", // Using DRVN logo as placeholder - update with actual DBRO logo
  },
};

/**
 * Get token data with fallback
 * @param searchTerm - The search term
 * @param fallbackToken - Optional fallback token data
 * @returns Promise<OnChainKitToken | null> - The token data or null
 */
export async function getTokenWithFallback(
  searchTerm: string,
  fallbackToken?: OnChainKitToken,
): Promise<OnChainKitToken | null> {
  // Try OnChainKit API first if configured
  if (isOnChainKitConfigured()) {
    const onchainToken = await getOnChainKitToken(searchTerm);
    if (onchainToken) {
      return onchainToken;
    }
  } else {
    console.log("⚠️ OnChainKit API not configured, using fallback data");
  }

  // Use provided fallback
  if (fallbackToken) {
    return fallbackToken;
  }

  return null;
}

/**
 * Test OnChainKit API connection and fetch sample tokens
 * This function helps verify that the API is working correctly
 */
export async function testOnChainKitConnection(): Promise<void> {
  console.log("🧪 Testing OnChainKit API connection...");

  if (!isOnChainKitConfigured()) {
    console.error("❌ OnChainKit API not configured");
    return;
  }

  try {
    // Test with a simple token search
    const testTokens = ["ETH", "USDC", "DBRO"];

    for (const token of testTokens) {
      console.log(`\n🔍 Testing search for ${token}...`);
      const result = await getOnChainKitToken(token);

      if (result) {
        console.log(`✅ ${token} found:`, {
          name: result.name,
          symbol: result.symbol,
          decimals: result.decimals,
          image: result.image ? "✅" : "❌",
        });
      } else {
        console.log(`⚠️ ${token} not found in OnChainKit API`);
      }
    }

    console.log("\n🎉 OnChainKit API test completed!");
  } catch (error) {
    console.error("❌ Error testing OnChainKit API:", error);
  }
}
