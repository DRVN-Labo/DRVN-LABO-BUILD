# Pay-Block Smart Contracts

Smart contract deployment and verification configuration for the Pay-Block platform, licensed by Decentral Bros LLC.

## License and Usage

This codebase is proprietary and licensed through Decentral Bros LLC. Any use of this code in production requires explicit permission from Decentral Bros LLC. Unauthorized use or distribution is prohibited.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- MetaMask or similar Web3 wallet
- Base Sepolia testnet ETH
- Base mainnet ETH

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd hardhat
```

2. Install dependencies:

```bash
yarn install
```

3. Configure environment variables:

```bash
# Rename .env.example to .env
cp .env.example .env

# Edit .env and fill in your actual values:
# - ALCHEMY_API_KEY: Get from https://www.alchemy.com/
# - DEPLOYER_PRIVATE_KEY: Your wallet private key (without 0x prefix)
# - ETHERSCAN_API_KEY: Get from https://basescan.org/myapikey
```

## Deployment Instructions

### Testnet Deployment (Base Sepolia)

```bash
yarn deploy --network baseSepolia
```

### Mainnet Deployment (Base)

```bash
yarn deploy --network base
```

## Contract Verification

### Testnet Verification

```bash
yarn verify --api-url https://api-sepolia.basescan.org
```

### Mainnet Verification

```bash
yarn verify --api-url https://api.basescan.org
```

## Contract Configuration

### Minting Limits

- Maximum of 1 NFT per wallet address
- This limit is enforced to prevent mass collection and ensure fair distribution
- Helps maintain the value proposition of revenue sharing

### Fund Distribution

The smart contract implements the following fund distribution mechanism:

1. Primary revenue sharing distribution to NFT holders
2. Any remaining USDC is automatically sent to the designated wallet (Gabe's Coinbase wallet)
3. This ensures no funds are left stranded in the contract

## Network Configuration

### Base Sepolia Testnet

- Network ID: 84532
- RPC URL: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org

### Base Mainnet

- Network ID: 8453
- RPC URL: https://mainnet.base.org
- Explorer: https://basescan.org

## Development Commands

```bash
# Compile contracts
yarn compile

# Run tests
yarn test

# Run tests with coverage
yarn coverage

# Clean build artifacts
yarn clean
```

## Security Considerations

- All contracts are thoroughly tested before deployment
- Minting limits are enforced at the contract level
- Fund distribution is automated and transparent
- Regular security audits are performed

## Support

For support, licensing inquiries, or permission requests, please contact Decentral Bros LLC.

---

© 2025 Decentral Bros LLC & DRVN Labo LLC All rights reserved.
