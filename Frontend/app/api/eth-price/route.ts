import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔄 Fetching ETH price from CoinGecko...");

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error("❌ CoinGecko API request failed:", response.status);
      return NextResponse.json(
        { error: "Failed to fetch ETH price" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const ethPrice = data.ethereum?.usd;

    if (!ethPrice) {
      console.error("❌ Invalid ETH price data:", data);
      return NextResponse.json(
        { error: "Invalid price data" },
        { status: 500 },
      );
    }

    console.log(`✅ ETH price fetched: $${ethPrice}`);

    return NextResponse.json({
      price: ethPrice,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("❌ Error fetching ETH price:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
