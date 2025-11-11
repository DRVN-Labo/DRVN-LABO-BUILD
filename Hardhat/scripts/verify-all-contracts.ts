import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

async function main() {
  console.log("🔍 Starting contract verification with constructor arguments...");

  const hre = require("hardhat") as HardhatRuntimeEnvironment;
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  // Helper functions to format values (same as deployment script)
  const toUSDC = (n: string | number) => ethers.utils.parseUnits(String(n), 6); // 6‑decimals
  const toBSTR = (n: string | number) => ethers.utils.parseUnits(String(n), 9); // 9‑decimals

  // -----------------------------
  // 🔗 Addresses (same as deployment)
  // -----------------------------
  const BSTR = "0xbfc5cd421bbc91a2ca976c4ab1754748634b7d41"; // 9‑dec ERC20
  const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // 6‑dec ERC20

  // -----------------------------
  // Contract configurations (same as deployment)
  // -----------------------------
  const Steel = {
    name: "DRVN Steel Key",
    symbol: "Steel",
    baseURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreicdzxjph6vjutybhyusr74hrpdyyalernyfuomm37w2c6qhfvnufu/",
    contractURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreic76uhhdcpjgb3z5zlwowas24w3ow2d7kw2222zhda6arjlb4lqne/",
    owner: deployer,
    usdc: USDC,
    funds: deployer,
    royaltyBps: 500,
    maxSupply: 62,
    mintPrice: toUSDC(450),
    rewardPerUnit: toBSTR(500000),
  };

  const Carbon = {
    name: "DRVN Carbon Key",
    symbol: "Carbon",
    baseURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreihvtv2nk42zselxofww2dibs6r32x6yudwhzjrcqon33iorqgjxpi/",
    contractURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreiepwquub22atfdxloyqca5hlakn4nzps42re4nvdtwtfefonbkcxi/",
    owner: deployer,
    usdc: USDC,
    funds: deployer,
    royaltyBps: 500,
    maxSupply: 24,
    mintPrice: toUSDC(1100),
    rewardPerUnit: toBSTR(1250000),
  };

  const Titanium = {
    name: "DRVN Titanium Key",
    symbol: "Titanium",
    baseURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreigfhls2uxkhgd63gqfk4moe7tne5gcsxmorthz5qx6c6ug7z3qjq4/",
    contractURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreic33mbfqhjzogxqf2wq5ds2xyvsnuvajicu6li7wv56ms6w7j3pde/",
    owner: deployer,
    usdc: USDC,
    funds: deployer,
    royaltyBps: 500,
    maxSupply: 7,
    mintPrice: toUSDC(4000),
    rewardPerUnit: toBSTR(4750000),
  };

  // -----------------------------
  // Get deployed contract addresses
  // -----------------------------
  const { deployments } = hre;
  const deployedContracts = await deployments.all();

  // Sleep function for rate limiting
  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Verification function with retry logic
  async function verifyContract(
    contractName: string,
    address: string,
    constructorArgs: unknown[],
    contractPath?: string
  ) {
    console.log(`\n🔍 Verifying ${contractName} at ${address}...`);
    console.log(`📝 Constructor args: ${JSON.stringify(constructorArgs, null, 2)}`);

    try {
      const verifyOptions: {
        address: string;
        constructorArguments: unknown[];
        contract?: string;
      } = {
        address: address,
        constructorArguments: constructorArgs,
      };

      if (contractPath) {
        verifyOptions.contract = contractPath;
      }

      await hre.run("verify:verify", verifyOptions);
      console.log(`✅ ${contractName} verified successfully!`);
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("already verified")) {
        console.log(`✅ ${contractName} is already verified`);
        return true;
      } else if (errorMessage.includes("rate limit")) {
        console.log(`⚠️  Rate limit hit for ${contractName}, waiting 5 seconds and retrying...`);
        await sleep(5000);
        return verifyContract(contractName, address, constructorArgs, contractPath);
      } else {
        console.error(`❌ Failed to verify ${contractName}:`, errorMessage);
        return false;
      }
    }
  }

  // -----------------------------
  // Verify BSTRVault
  // -----------------------------
  if (deployedContracts.BSTRVault) {
    const bstrVaultArgs = [deployer, BSTR, []]; // owner, BSTR token, initial minters[]
    await verifyContract(
      "BSTRVault",
      deployedContracts.BSTRVault.address,
      bstrVaultArgs,
      "contracts/BSTRVault.sol:BSTRVault"
    );
    await sleep(3000); // Wait 3 seconds between verifications
  }

  // -----------------------------
  // Verify DRVNSteel
  // -----------------------------
  if (deployedContracts.DRVNSteel) {
    const steelArgs = [
      Steel.name,
      Steel.symbol,
      Steel.baseURI,
      Steel.contractURI,
      Steel.owner,
      Steel.usdc,
      Steel.funds,
      Steel.royaltyBps,
      Steel.maxSupply,
      Steel.mintPrice,
    ];

    await verifyContract(
      "DRVNSteel",
      deployedContracts.DRVNSteel.address,
      steelArgs,
      "contracts/DRVNSteel.sol:DRVNSteel"
    );
    await sleep(3000);
  }

  // -----------------------------
  // Verify DRVNCarbon
  // -----------------------------
  if (deployedContracts.DRVNCarbon) {
    const carbonArgs = [
      Carbon.name,
      Carbon.symbol,
      Carbon.baseURI,
      Carbon.contractURI,
      Carbon.owner,
      Carbon.usdc,
      Carbon.funds,
      Carbon.royaltyBps,
      Carbon.maxSupply,
      Carbon.mintPrice,
    ];

    await verifyContract(
      "DRVNCarbon",
      deployedContracts.DRVNCarbon.address,
      carbonArgs,
      "contracts/DRVNCarbon.sol:DRVNCarbon"
    );
    await sleep(3000);
  }

  // -----------------------------
  // Verify DRVNTitanium
  // -----------------------------
  if (deployedContracts.DRVNTitanium) {
    const titaniumArgs = [
      Titanium.name,
      Titanium.symbol,
      Titanium.baseURI,
      Titanium.contractURI,
      Titanium.owner,
      Titanium.usdc,
      Titanium.funds,
      Titanium.royaltyBps,
      Titanium.maxSupply,
      Titanium.mintPrice,
    ];

    await verifyContract(
      "DRVNTitanium",
      deployedContracts.DRVNTitanium.address,
      titaniumArgs,
      "contracts/DRVNTitanium.sol:DRVNTitanium"
    );
  }

  console.log("\n🎉 Contract verification process completed!");
  console.log("\n📋 Summary:");
  console.log("✅ BSTRVault - Multi-minter vault contract");
  console.log("✅ DRVNSteel - ID 0, Max Supply: 62, Price: 450 USDC");
  console.log("✅ DRVNCarbon - ID 1, Max Supply: 24, Price: 1100 USDC");
  console.log("✅ DRVNTitanium - ID 2, Max Supply: 7, Price: 4000 USDC");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification script failed:", error);
    process.exit(1);
  });
