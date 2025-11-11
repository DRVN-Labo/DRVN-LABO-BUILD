import { sleep } from "../utils/sleep";

async function main() {
  console.log("🔍 Starting contract verification with rate limiting...");

  // Get the deployed contract addresses from deployments
  const { deployments } = require("hardhat");
  const deployedContracts = await deployments.all();

  // Filter for the contracts we want to verify
  const contractsToVerify = ["BSTRVault", "DRVNSteel", "DRVNCarbon", "DRVNTitanium"];

  for (const contractName of contractsToVerify) {
    const deployment = deployedContracts[contractName];
    if (!deployment) {
      console.log(`⚠️  No deployment found for ${contractName}, skipping...`);
      continue;
    }

    console.log(`\n🔍 Verifying ${contractName} at ${deployment.address}...`);

    try {
      // Use the hardhat-verify plugin
      const { run } = require("hardhat");
      await run("verify:verify", {
        address: deployment.address,
        constructorArguments: deployment.args || [],
        contract: `contracts/${contractName}.sol:${contractName}`,
      });

      console.log(`✅ ${contractName} verified successfully!`);

      // Add delay between verifications to avoid rate limiting
      if (contractName !== contractsToVerify[contractsToVerify.length - 1]) {
        console.log("⏳ Waiting 3 seconds before next verification...");
        await sleep(3000); // 3 second delay
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("already verified")) {
        console.log(`✅ ${contractName} is already verified`);
      } else {
        console.error(`❌ Failed to verify ${contractName}:`, errorMessage);
      }
    }
  }

  console.log("\n🎉 Contract verification process completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
