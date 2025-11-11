import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY;
    const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_BSTR_CONTRACT_ADDRESS;

    if (!ALCHEMY_KEY || !TOKEN_ADDRESS) {
      return NextResponse.json(
        { error: "Alchemy API key or BSTR contract address not configured" },
        { status: 500 },
      );
    }

    console.log("🔄 Proxying Alchemy RPC request for holder count...");

    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getAssetTransfers",
          params: [
            {
              fromBlock: "0x0",
              toBlock: "latest",
              contractAddresses: [TOKEN_ADDRESS],
              category: ["erc20"],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.error("❌ Alchemy RPC request failed:", response.status);
      return NextResponse.json(
        { error: "Alchemy RPC failed" },
        { status: response.status },
      );
    }

    const json = await response.json();
    const transfers = json.result?.transfers || [];

    console.log(`📊 Alchemy returned ${transfers.length} transfers`);

    // Count unique addresses from transfers
    const unique = new Set<string>();
    transfers.forEach((t: { to?: string; from?: string }) => {
      if (t.to) unique.add(t.to.toLowerCase());
      if (t.from) unique.add(t.from.toLowerCase());
    });

    const holderCount = unique.size;
    console.log(`✅ Calculated holder count: ${holderCount}`);

    return NextResponse.json({ holders: holderCount });
  } catch (error) {
    console.error("❌ Error in holders API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
