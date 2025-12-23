# DRVN VHCLS Mini App

<div align="center">

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black)](https://nextjs.org/)
[![Base](https://img.shields.io/badge/Built%20on-Base-0052FF)](https://base.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.19.4-yellow)](https://hardhat.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Contributors](https://img.shields.io/github/contributors/Mr-Web3/DRVN-LABO-MINI-APP-TWO)](https://github.com/Mr-Web3/DRVN-LABO-MINI-APP-TWO/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/Mr-Web3/DRVN-LABO-MINI-APP-TWO)](https://github.com/Mr-Web3/DRVN-LABO-MINI-APP-TWO/commits/main)

**Tokenizing Real-World Automotive Assets (RWA) on Base Blockchain**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:list.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:list.svg?color=%23000000" width="18" height="18" alt="" /></picture> Table of Contents

- [About DRVN VHCLS](#about-drvn-vhcls)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Development](#development)
  - [Local Development with ngrok](#local-development-with-ngrok)
  - [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:info.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:info.svg?color=%23000000" width="18" height="18" alt="" /></picture> About DRVN VHCLS

DRVN VHCLS is a next-generation automotive platform that **tokenizes real-world automotive assets (RWA) on-chain**, bringing car culture into the Web3 era. Built for car enthusiasts, collectors, and investors.

### Core Value Proposition

| Feature | Description | Status |
|---------|-------------|--------|
| **RWA Tokenization** | Real-world cars represented as on-chain digital assets | ✅ Active |
| **Exclusive Collections** | Curated rare and iconic vehicles as NFTs | ✅ Active |
| **Real-Time Trading** | Seamless buying/selling of car tokens on Base | ✅ Active |
| **Community Features** | Social interactions and content sharing | ✅ Active |
| **Web3 Integration** | Wallet-based authentication & blockchain transactions | ✅ Active |
| **DAO Integration** | Community governance with Decent DAO | <img src="https://img.shields.io/badge/Status-Coming%20Soon-orange" alt="Coming Soon" /> |
| **Premium Content** | Articles, videos, and exclusive automotive content | ✅ Active |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:sparkles.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:sparkles.svg?color=%23000000" width="18" height="18" alt="" /></picture> Features

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:car.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:car.svg?color=%23000000" width="18" height="18" alt="" /></picture> Automotive Marketplace

- **Exclusive Collections**: Paul Walker Ferrari 360 Modena, Nissan R34 GT-R, Honda NSX Type S
- **Detailed Specifications**: Comprehensive car specs with interactive displays
- **Trading Interface**: Buy/sell car tokens with USDC
- **Market Analytics**: Real-time pricing and market data

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:rocket.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:rocket.svg?color=%23000000" width="18" height="18" alt="" /></picture> RS1 Presale System

- **Multi-Stage Presale**: Three-stage presale with tiered pricing and access control
- **Stage Requirements**: BSTR token or NFT key requirements for each stage
  - Stage 1: 5M BSTR or 1 Steel Key NFT
  - Stage 2: 3M BSTR or 1 Carbon Key NFT
  - Stage 3: 1M BSTR or 1 Titanium Key NFT
- **KYC Integration**: Didit.me verification required for participation
- **Share-Based Purchasing**: Purchase RS1 tokens in share units (1 share = 1M RS1)
- **Real-Time Progress**: Live share meter and stage progress tracking
- **Token Claiming**: Claim purchased tokens after presale completion

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:shield.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:shield.svg?color=%23000000" width="18" height="18" alt="" /></picture> KYC Verification

- **Didit.me Integration**: Full KYC verification system
- **Webhook Support**: Real-time status updates via webhooks
- **Multi-Status Tracking**: Track verification status (not_started, pending, approved, rejected)
- **Secure Sessions**: Secure session handling for verification flow
- **Database Integration**: User KYC status stored in MongoDB

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:users.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:users.svg?color=%23000000" width="18" height="18" alt="" /></picture> User Management

- **Wallet Authentication**: Seamless Web3 login with Base network
- **Profile Management**: Customizable user profiles with IPFS image uploads
- **User Dashboard**: Personalized experience with saved preferences
- **KYC Status**: Track and display user verification status

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:smartphone.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:smartphone.svg?color=%23000000" width="18" height="18" alt="" /></picture> Multi-Platform Support

| Platform | Access Method | Status |
|----------|--------------|--------|
| **dApp** | Standard web application (localhost:3000) | ✅ Active |
| **Farcaster Mini App** | Via Farcaster preview tool | ✅ Active |
| **Base Mini App** | Via Base.dev preview tool | ✅ Active |

**All three views share the same codebase and hot-reload together during development.**

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:network.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:network.svg?color=%23000000" width="18" height="18" alt="" /></picture> Architecture

### Repository Structure

```
DRVN-MINI-APP/
├── Frontend/              # Next.js 15.5.7 frontend application
│   ├── app/               # Next.js App Router pages and components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries and services
│   └── public/             # Static assets
│
├── Hardhat/                # Smart contracts workspace
│   ├── contracts/          # Solidity smart contracts
│   ├── deploy/             # Deployment scripts
│   ├── scripts/            # Utility scripts
│   └── test/               # Contract tests
│
└── mints/                  # Additional contract-related files
```

### Workspace Details

<details>
<summary><b>Frontend Workspace</b></summary>

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Next.js | 15.5.7 |
| React | React | 19.2.3 (Security patched) |
| Styling | Tailwind CSS | 4.1.17 |
| Web3 | OnchainKit | 1.0.3 |
| Blockchain | Base Network | Mainnet/Testnet |
| Authentication | Wallet-based + MongoDB | - |
| State Management | TanStack Query | 5.x |
| Web3 Library | Wagmi | 2.16.0 |
| UI Components | Radix UI | Latest |
| Language | TypeScript | Latest |

</details>

<details>
<summary><b>Hardhat Workspace</b></summary>

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Hardhat | 2.19.4 |
| Language | Solidity | 0.8.20 |
| Networks | Base Mainnet, Base Sepolia | - |
| Testing | Hardhat Chai Matchers | Latest |
| Verification | Etherscan/Basescan | - |

</details>

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:wrench.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:wrench.svg?color=%23000000" width="18" height="18" alt="" /></picture> Tech Stack

### Frontend Technologies

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org/) | React framework with App Router |
| **Web3** | [OnchainKit](https://www.base.org/builders/onchainkit) | Wallet integration |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| **UI** | [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | Server state management |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety |

### Smart Contracts

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | [Hardhat](https://hardhat.org/) | Development environment |
| **Language** | [Solidity](https://soliditylang.org/) | Smart contract language |
| **Libraries** | [OpenZeppelin](https://www.openzeppelin.com/) | Security libraries |
| **Ethereum** | [Ethers.js](https://docs.ethers.org/) | Ethereum library |

### Infrastructure

| Service | Purpose |
|---------|---------|
| [Base](https://base.org/) | Layer 2 blockchain |
| [MongoDB](https://www.mongodb.com/) | Database |
| [Redis](https://redis.io/) | Caching and notifications |
| [IPFS/Pinata](https://www.pinata.cloud/) | Decentralized storage |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:rocket.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:rocket.svg?color=%23000000" width="18" height="18" alt="" /></picture> Quick Start

### Prerequisites

| Requirement | Version | Purpose | Where to Get |
|------------|---------|---------|--------------|
| **Node.js** | 22.x | Runtime environment | [nodejs.org](https://nodejs.org/) |
| **npm** | Latest | Frontend package manager | Comes with Node.js |
| **yarn** | Latest | Hardhat package manager | [yarnpkg.com](https://yarnpkg.com/) |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com/) |
| **Farcaster Account** | - | Mini app preview | [farcaster.xyz](https://farcaster.xyz/) |
| **Base.dev Account** | - | Base mini app preview | [base.org](https://base.org/) |
| **ngrok Account** | Pay-as-you-go | Local development tunneling | [ngrok.com](https://ngrok.com/) |

### Installation

#### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd DRVN-MINI-APP
```

#### Step 2: Install Dependencies

**Frontend:**
```bash
cd Frontend
npm install
```

**Hardhat:**
```bash
cd ../Hardhat
yarn install
```

#### Step 3: Environment Setup

**Frontend Environment Variables:**

```bash
cd Frontend
cp .env.example .env.local
# Edit .env.local and fill in your actual values
```

> **Note**: If you need database access, reach out to DBRO or DRVN Labo.

**Hardhat Environment Variables:**

```bash
cd Hardhat
cp .env.example .env
# Edit .env and fill in your actual values
```

See [Environment Setup](#environment-setup) section for detailed variable descriptions.

#### Step 4: Start Development

**Frontend:**
```bash
cd Frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for dApp view

**Hardhat (local node):**
```bash
cd Hardhat
yarn chain
```

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:settings.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:settings.svg?color=%23000000" width="18" height="18" alt="" /></picture> Environment Setup

### Frontend Environment Variables

| Variable | Required | Description | Where to Get |
|----------|-----------|-------------|--------------|
| `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` | ✅ | Project name | Your choice |
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | ✅ | OnchainKit API key | [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/) |
| `NEXT_ONCHAINKIT_API_KEY` | ✅ | Additional OnchainKit key | [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/) |
| `NEXT_PUBLIC_URL` | ✅ | Application URL | Your deployment URL |
| `NEXT_PUBLIC_ICON_URL` | ✅ | App icon URL | Your CDN/hosting |
| `MONGODB_URI` | ✅ | MongoDB connection string | Contact DBRO/DRVN Labo |
| `REDIS_URL` | ✅ | Redis connection URL | [console.upstash.com](https://console.upstash.com/) |
| `REDIS_TOKEN` | ✅ | Redis authentication token | [console.upstash.com](https://console.upstash.com/) |
| `NEXT_PUBLIC_PINATA_API_KEY` | ✅ | Pinata API key | [app.pinata.cloud](https://app.pinata.cloud/) |
| `NEXT_PUBLIC_PINATA_SECRET_KEY` | ✅ | Pinata secret key | [app.pinata.cloud](https://app.pinata.cloud/) |
| `NEXT_PUBLIC_IPFS_GATEWAY` | ✅ | IPFS gateway URL | Your Pinata gateway |
| `ENCRYPTION_KEY` | ⚠️ | Encryption key (32+ chars) | Generate securely |
| `ALCHEMY_API_KEY` | ✅ | Alchemy API key | [alchemy.com](https://www.alchemy.com/) |
| `NEXT_PUBLIC_BSTR_CONTRACT_ADDRESS` | ✅ | BSTR token contract | Contract deployment |
| `NEXT_PUBLIC_RS1_TOKEN_ADDRESS` | ✅ | RS1 token contract | Contract deployment |
| `NEXT_PUBLIC_RS1_PRESALE_VAULT_ADDRESS` | ✅ | RS1 presale vault contract | Contract deployment |
| `NEXT_PUBLIC_RS1_FUNDS_VAULT_ADDRESS` | ✅ | RS1 funds vault contract | Contract deployment |
| `NEXT_PUBLIC_USDC_ADDRESS` | ✅ | USDC token contract | Base network USDC |
| `DIDIT_API_KEY` | ✅ | Didit.me API key | [business.didit.me](https://business.didit.me) |
| `DIDIT_WEBHOOK_SECRET` | ✅ | Didit webhook secret | Didit console |
| `DIDIT_WORKFLOW_ID` | ✅ | Didit workflow ID | Didit console |
| `NEXT_PUBLIC_APP_URL` | ✅ | App URL for webhooks | Your deployment URL |
| `FARCASTER_HEADER` | ❌ | Farcaster header (optional) | Farcaster dev tools |
| `FARCASTER_PAYLOAD` | ❌ | Farcaster payload (optional) | Farcaster dev tools |
| `FARCASTER_SIGNATURE` | ❌ | Farcaster signature (optional) | Farcaster dev tools |

### Hardhat Environment Variables

| Variable | Required | Description | Where to Get |
|----------|-----------|-------------|--------------|
| `ALCHEMY_API_KEY` | ✅ | Alchemy API key | [alchemy.com](https://www.alchemy.com/) |
| `DEPLOYER_PRIVATE_KEY` | ✅ | Deployer wallet private key | Your wallet (without 0x) |
| `ETHERSCAN_API_KEY` | ✅ | Etherscan/Basescan API key | [basescan.org/myapikey](https://basescan.org/myapikey) |
| `MAINNET_FORKING_ENABLED` | ❌ | Enable mainnet forking | Set to "true" or "false" |

> **⚠️ Security Note**: Never commit `.env` or `.env.local` files. They are already in `.gitignore`.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:code.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:code.svg?color=%23000000" width="18" height="18" alt="" /></picture> Development

### Local Development with ngrok

To see your changes live in all three environments (dApp, Farcaster, and Base mini apps), you need to set up ngrok tunneling.

#### Setup Steps

| Step | Action | Details |
|------|--------|---------|
| **1** | Create ngrok Account | Sign up at [dashboard.ngrok.com](https://dashboard.ngrok.com/) |
| **2** | Choose Billing Plan | Select "Pay as you go" and add payment method |
| **3** | Install ngrok CLI | Follow OS-specific instructions: [macOS](https://dashboard.ngrok.com/get-started/setup/macos) \| [Windows](https://dashboard.ngrok.com/get-started/setup/windows) \| [Linux](https://dashboard.ngrok.com/get-started/setup/linux) |
| **4** | Create Reserved Domain | Go to [domains](https://dashboard.ngrok.com/domains) and create a reserved domain |
| **5** | Start Development | See commands below |

#### Development Commands

**Terminal 1 - Start Frontend:**
```bash
cd Frontend
npm run dev
```

**Terminal 2 - Start ngrok Tunnel:**
```bash
cd Frontend
ngrok http --url=your-domain.ngrok.dev 3000
```

Replace `your-domain.ngrok.dev` with your actual reserved domain.

#### Preview Configuration

| Platform | Steps |
|----------|-------|
| **Farcaster** | 1. Open Farcaster developer tools<br>2. Enter ngrok URL: `https://your-domain.ngrok.dev`<br>3. Launch preview |
| **Base.dev** | 1. Open Base.dev preview tool<br>2. Enter ngrok URL: `https://your-domain.ngrok.dev`<br>3. Launch preview |

#### Real-Time Development

Once set up, you'll have:

- **dApp**: Live at `http://localhost:3000` with hot reload
- **Farcaster Mini App**: Live at `https://your-domain.ngrok.dev` via Farcaster preview
- **Base Mini App**: Live at `https://your-domain.ngrok.dev` via Base.dev preview

> **Tip**: All three views update simultaneously when you make code changes!

### Available Scripts

#### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |

#### Hardhat Scripts

| Command | Description |
|---------|-------------|
| `yarn compile` | Compile Solidity contracts |
| `yarn test` | Run contract tests with gas reporting |
| `yarn deploy` | Deploy contracts to configured network |
| `yarn lint` | Run ESLint on TypeScript files |
| `yarn format` | Format code with Prettier (including Solidity) |
| `yarn format:check` | Check code formatting |
| `yarn chain` | Start local Hardhat node |
| `yarn verify` | Verify contracts on Etherscan/Basescan |
| `yarn account` | List Hardhat accounts |
| `yarn generate` | Generate new account |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:flask-conical.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:flask-conical.svg?color=%23000000" width="18" height="18" alt="" /></picture> Testing

### Frontend Testing

```bash
cd Frontend
npm run typecheck  # Type checking
npm run lint       # Linting
npm run build      # Build verification
```

### Contract Testing

```bash
cd Hardhat
yarn test                    # Run all tests
yarn test --grep "specific" # Run specific test
```

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:ship.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:ship.svg?color=%23000000" width="18" height="18" alt="" /></picture> Deployment

### Frontend Deployment

```bash
cd Frontend
npm run build
npm run start
```

### Contract Deployment

```bash
cd Hardhat
yarn compile
yarn deploy  # Deploy to Base Sepolia testnet
```

### Network Configuration

| Network | Network ID | RPC URL | Explorer |
|---------|-----------|---------|----------|
| **Base Sepolia** | 84532 | https://sepolia.base.org | https://sepolia.basescan.org |
| **Base Mainnet** | 8453 | https://mainnet.base.org | https://basescan.org |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:git-branch.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:git-branch.svg?color=%23000000" width="18" height="18" alt="" /></picture> Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### PR Requirements Checklist

- [ ] **Branch naming**: Use `feature/*`, `fix/*`, `docs/*`, `refactor/*`, etc.
- [ ] **PR title**: Follows [Conventional Commits](https://www.conventionalcommits.org/) format
  - ✅ Valid: `feat(frontend): add car collection gallery`
  - ✅ Valid: `fix(contracts): resolve deployment script error`
  - ❌ Invalid: `Added car gallery` (missing type)
- [ ] **Local checks pass**:
  ```bash
  # Frontend
  cd Frontend && npm run lint && npm run format:check && npm run typecheck && npm run build
  
  # Hardhat (if modified)
  cd Hardhat && yarn lint && yarn format:check && yarn test && yarn compile
  ```
- [ ] **CI must be green**: All GitHub Actions checks pass
- [ ] **CODEOWNERS review**: At least one code owner approves
- [ ] **No secrets**: No API keys or sensitive data committed

### Quick Contribution Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting and tests (see commands above)
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with a Conventional Commit title

See [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:book.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:book.svg?color=%23000000" width="18" height="18" alt="" /></picture> Documentation

| Document | Description |
|----------|-------------|
| [Frontend README](Frontend/README.md) | Frontend-specific documentation |
| [Hardhat README](Hardhat/README.md) | Smart contracts documentation |
| [Contributing Guide](CONTRIBUTING.md) | Contribution guidelines |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community standards |
| [Security Policy](SECURITY.md) | Security reporting process |
| [KYC Setup Guide](Frontend/KYC_SETUP.md) | Didit.me KYC integration setup |
| [KYC Troubleshooting](Frontend/KYC_TROUBLESHOOTING.md) | KYC integration troubleshooting |
| [Webhook Setup](Frontend/WEBHOOK_SETUP.md) | Webhook configuration for KYC |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:shield.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:shield.svg?color=%23000000" width="18" height="18" alt="" /></picture> Security

We take security seriously. Please review our [Security Policy](SECURITY.md) for:

- Supported versions
- How to report vulnerabilities
- Security best practices

> **⚠️ Important**: Do not report security vulnerabilities publicly. Use the process outlined in [SECURITY.md](SECURITY.md).

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:file-text.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:file-text.svg?color=%23000000" width="18" height="18" alt="" /></picture> License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE.md) file for details.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:life-buoy.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:life-buoy.svg?color=%23000000" width="18" height="18" alt="" /></picture> Support

| Resource | Link |
|---------|------|
| **Documentation** | See workspace-specific READMEs in `Frontend/README.md` and `Hardhat/README.md` |
| **Issues** | [GitHub Issues](https://github.com/your-org/DRVN-MINI-APP/issues) |
| **Discussions** | [GitHub Discussions](https://github.com/your-org/DRVN-MINI-APP/discussions) |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:users.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:users.svg?color=%23000000" width="18" height="18" alt="" /></picture> Project Maintainers

**Lead Developer**: Justin Taylor (Decentral Bros LLC)  
Working with DRVN Labo LLC & Alex (REX)

| Contact | Link |
|---------|------|
| **Email** | development@decentralbros.tech |
| **Personal Website** | [justin.dbro.dev](https://justin.dbro.dev) |
| **Company Website** | [www.decentralbros.io](https://www.decentralbros.io) |
| **X (Twitter)** | [@DecentralBros_](https://www.x.com/DecentralBros_) |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:heart.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:heart.svg?color=%23000000" width="18" height="18" alt="" /></picture> Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [OnchainKit](https://www.base.org/builders/onchainkit)
- Powered by [Base](https://base.org/) blockchain
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)
- Developed by **Justin Taylor** (Decentral Bros LLC) in collaboration with **DRVN Labo LLC & Alex (REX)**

---

<div align="center">

<sub><b>DRVN VHCLS — Where Cars Meet Culture</b></sub>

</div>
