import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "ethers";

/**
 * Deploys:
 *  - BSTRVault (multi-minter)
 *  - DRVNSteel (ID 0)
 *  - DRVNCarbon (ID 1)
 *  - DRVNTitanium (ID 2)
 * Wires vault ⇄ mints, sets USDC prices in 6‑decimals, and (optionally) reward config.
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, ethers, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  // Get current nonce to ensure we're using the right one
  const currentNonce = await network.provider.send("eth_getTransactionCount", [deployer, "latest"]);
  log(`📊 Current nonce for deployer: ${parseInt(currentNonce, 16)}`);

  const toUSDC = (n: string | number): BigNumber => ethers.utils.parseUnits(String(n), 6); // 6‑decimals
  const toBSTR = (n: string | number): BigNumber => ethers.utils.parseUnits(String(n), 9); // 9‑decimals

  // -----------------------------
  // 🔗 Addresses (edit per chain)
  // -----------------------------
  const BSTR = "0xbfc5cd421bbc91a2ca976c4ab1754748634b7d41"; // 9‑dec ERC20
  const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // 6‑dec ERC20 (same for all 3)

  // -----------------------------
  // Steel (ID 0)
  // -----------------------------
  const Steel = {
    name: "DRVN Steel Key",
    symbol: "Steel",
    baseURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreicdzxjph6vjutybhyusr74hrpdyyalernyfuomm37w2c6qhfvnufu/", // e.g. ipfs://CID/
    contractURI:
      "https://drvnlabo.mypinata.cloud/ipfs/bafkreic76uhhdcpjgb3z5zlwowas24w3ow2d7kw2222zhda6arjlb4lqne/",
    owner: deployer,
    usdc: USDC,
    funds: deployer,
    royaltyBps: 500,
    maxSupply: 62,
    mintPrice: toUSDC(450), // 450 USDC
    rewardPerUnit: toBSTR(500000), // 500K BSTR Tokens
  };

  // -----------------------------
  // Carbon (ID 1)
  // -----------------------------
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
    mintPrice: toUSDC(1100), // 1100 USDC
    rewardPerUnit: toBSTR(1250000), // 1.25M BSTR Tokens
  };

  // -----------------------------
  // Titanium (ID 2)
  // -----------------------------
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
    mintPrice: toUSDC(4000), // 4000 USDC
    rewardPerUnit: toBSTR(4750000), // 4.75M BSTR Tokens
  };

  // -----------------------------
  // 🚀 1) Deploy Vault (multi-minter)
  // -----------------------------
  log("🔐 Deploying BSTRVault...");
  const vaultDep = await deploy("BSTRVault", {
    from: deployer,
    args: [deployer, BSTR, []], // owner, BSTR token, initial minters[]
    log: true,
    waitConfirmations: 2, // Wait for 2 confirmations
  });

  // Wait for vault deployment to be fully mined
  log("⏳ Waiting for BSTRVault deployment to be mined...");
  await new Promise((resolve) => setTimeout(resolve, 8000)); // Increased wait time

  // -----------------------------
  // 🚀 2) Deploy Mints
  // -----------------------------
  log("💿 Deploying DRVNSteel (ID 0)...");
  const steelDep = await deploy("DRVNSteel", {
    from: deployer,
    args: [
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
    ],
    log: true,
    waitConfirmations: 2,
  });

  // Wait for DRVNSteel deployment
  log("⏳ Waiting for DRVNSteel deployment to be mined...");
  await new Promise((resolve) => setTimeout(resolve, 8000)); // Increased wait time

  log("🧪 Deploying DRVNCarbon (ID 1)...");
  const carbonDep = await deploy("DRVNCarbon", {
    from: deployer,
    args: [
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
    ],
    log: true,
    waitConfirmations: 2,
  });

  // Wait for DRVNCarbon deployment
  log("⏳ Waiting for DRVNCarbon deployment to be mined...");
  await new Promise((resolve) => setTimeout(resolve, 8000)); // Increased wait time

  log("🏭 Deploying DRVNTitanium (ID 2)...");
  const titaniumDep = await deploy("DRVNTitanium", {
    from: deployer,
    args: [
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
    ],
    log: true,
    waitConfirmations: 2,
  });

  // Wait for DRVNTitanium deployment
  log("⏳ Waiting for DRVNTitanium deployment to be mined...");
  await new Promise((resolve) => setTimeout(resolve, 8000)); // Increased wait time

  // ✅ Output summary
  log("✅ BSTRVault:        " + vaultDep.address);
  log("✅ DRVNSteel:      " + steelDep.address);
  log("✅ DRVNCarbon:     " + carbonDep.address);
  log("✅ DRVNTitanium:   " + titaniumDep.address);

  log("🔗 Contracts deployed successfully!");
  log("📝 ABI generation will happen automatically via 99_generateTsAbis.ts");
};

export default func;

func.tags = ["BSTRVault", "DRVNSteel", "DRVNCarbon", "DRVNTitanium"];
