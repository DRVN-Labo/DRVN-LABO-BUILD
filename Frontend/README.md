# DRVN VHCLS Mini App Powered by Base & Buster's ERC20 Token.

A premium automotive marketplace and social platform built on Base, featuring exclusive car collections, real-time trading, and community-driven content.

## 🚗 About DRVN VHCLS

DRVN VHCLS is a next-generation automotive platform that combines the thrill of car culture with the power of Web3 technology. Built for car enthusiasts, collectors, and investors, our platform offers:

- **Exclusive Car Collections**: Curated selection of rare and iconic vehicles
- **Real-Time Trading**: Seamless buying and selling of car tokens
- **Community Features**: Social interactions, content sharing, and community engagement
- **Web3 Integration**: Wallet-based authentication and blockchain-powered transactions
- **Premium Content**: Articles, videos, and exclusive automotive content

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.7](https://nextjs.org/) with App Router
- **React**: [React 19.2.3](https://react.dev/) (Security patched)
- **Styling**: [Tailwind CSS 4.1.17](https://tailwindcss.com/) with custom theme
- **Web3**: [OnchainKit 1.0.3](https://www.base.org/builders/onchainkit) for wallet integration
- **Blockchain**: [Base](https://base.org/) network
- **State Management**: [Wagmi 2.16.0](https://wagmi.sh/) & [TanStack Query 5](https://tanstack.com/query)
- **Authentication**: Wallet-based with MongoDB user management
- **Notifications**: Redis-powered real-time notifications
- **File Storage**: IPFS via Pinata for profile images
- **UI Components**: Custom component library with Radix UI and Lucide React icons

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x or higher
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/decentralbros/drvn-mini-app.git
   cd drvn-mini-app
   ```

2. **Install dependencies**

   ```bash
   cd Frontend
   npm install
   ```

3. **Set up environment variables**

   Rename the `.env.example` file to `.env.local` in the Frontend directory:

   ```bash
   cd Frontend
   cp .env.example .env.local
   ```

   Then edit `.env.local` and fill in your actual values. See `example.md` for a complete reference, or use the following required variables:

   ```env
   # Shared/OnchainKit Variables
   # Get your API key from: https://portal.cdp.coinbase.com/
   NEXT_PUBLIC_PROJECT_NAME=
   NEXT_PUBLIC_URL=http://localhost:3000
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=
   NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=
   # NEXT_PUBLIC_ICON_URL=

   # Redis Configuration
   # Get your Redis URL and token from: https://console.upstash.com/
   REDIS_URL=
   REDIS_TOKEN=

   # MongoDB Database
   # Format: mongodb+srv://username:password@cluster.mongodb.net/database
   MONGODB_URI=
   ENCRYPTION_KEY=

   # IPFS/Pinata Configuration
   # Get your API keys from: https://app.pinata.cloud/
   NEXT_PUBLIC_PINATA_API_KEY=
   NEXT_PUBLIC_PINATA_SECRET_KEY=
   PINATA_JWT=
   NEXT_PUBLIC_IPFS_GATEWAY=

   # Reown Wallet Key
   NEXT_PUBLIC_PROJECT_ID=

   # Alchemy API Key
   # Get your API key from: https://www.alchemy.com/
   ALCHEMY_API_KEY=
   NEXT_PUBLIC_BASE_RPC_URL=

   # Buster Token Variables
   NEXT_PUBLIC_BSTR_CONTRACT_ADDRESS=
   NEXT_PUBLIC_BSTR_ETH_POOL_ADDRESS=
   NEXT_PUBLIC_BSTR_USDC_POOL_ADDRESS=

   # RS1 Presale Variables
   NEXT_PUBLIC_RS1_TOKEN_ADDRESS=
   NEXT_PUBLIC_RS1_PRESALE_VAULT_ADDRESS=
   NEXT_PUBLIC_RS1_FUNDS_VAULT_ADDRESS=
   NEXT_PUBLIC_USDC_ADDRESS=

   # Didit.me KYC Configuration
   DIDIT_API_KEY=
   DIDIT_WEBHOOK_SECRET=
   DIDIT_WORKFLOW_ID=
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
drvn-mini-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── notify/               # Notification system
│   │   └── webhook/              # Webhook handlers
│   ├── cars/                     # Car detail pages
│   ├── components/               # React components
│   │   ├── modals/              # Authentication modals
│   │   └── ui/                  # UI components
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # App providers
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
│   ├── models/                  # Database models
│   ├── mongodb.ts              # Database connection
│   ├── notification.ts         # Notification utilities
│   └── utils.ts               # Helper functions
├── public/                     # Static assets
│   ├── Articles/              # Article images
│   └── Cars/                  # Car images
└── utils/                      # Additional utilities
```

## 🎨 Features

### 🏎️ Automotive Marketplace

- **Exclusive Collections**: Paul Walker Ferrari 360 Modena, Nissan R34 GT-R, Honda NSX Type S
- **Detailed Specifications**: Comprehensive car specs with interactive displays
- **Trading Interface**: Buy/sell car tokens with USDC
- **Market Analytics**: Real-time pricing and market data

### 🚀 RS1 Presale System

- **Multi-Stage Presale**: Three-stage presale with tiered pricing
- **Stage Access Control**: BSTR token or NFT key requirements for each stage
  - Stage 1: 5M BSTR or 1 Steel Key NFT
  - Stage 2: 3M BSTR or 1 Carbon Key NFT
  - Stage 3: 1M BSTR or 1 Titanium Key NFT
- **KYC Verification**: Didit.me integration for identity verification
- **Share-Based Purchasing**: Purchase RS1 tokens in share units (1 share = 1M RS1)
- **Real-Time Progress**: Live share meter and stage progress tracking
- **Claim System**: Claim purchased tokens after presale completion

### 🔐 KYC Integration

- **Didit.me Verification**: Full KYC integration with Didit.me
- **Webhook Support**: Real-time status updates via webhooks
- **Multi-Status Tracking**: Track verification status (not_started, pending, approved, rejected)
- **Session Management**: Secure session handling for verification flow
- **Database Integration**: User KYC status stored in MongoDB

### 👥 User Management

- **Wallet Authentication**: Seamless Web3 login with Base network
- **Profile Management**: Customizable user profiles with IPFS image uploads
- **User Dashboard**: Personalized experience with saved preferences
- **KYC Status**: Track and display user verification status

### 📱 Mobile-First Design

- **Responsive Layout**: Optimized for all device sizes
- **Touch Interactions**: Intuitive mobile navigation
- **Progressive Web App**: Installable on mobile devices

### 🔔 Real-Time Features

- **Notifications**: Redis-powered notification system
- **Live Updates**: Real-time market data and trading activity
- **Social Features**: Community interactions and content sharing

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Format code with Prettier
npm run format

# Check Prettier formatting
npm run format:check
```

## 🚀 Vercel Deployment Guide

### Prerequisites

- Node.js 22.x or higher installed
- npm (comes with Node.js)
- Git repository connected to GitHub/GitLab
- Vercel account (free tier available)

### Step 1: Install Vercel CLI

```bash
# Install Vercel CLI globally using npm
npm install -g vercel

# Verify installation
vercel --version
```

### Step 2: Login to Vercel

```bash
# Login to your Vercel account
vercel login

# Follow the browser prompt to authenticate
# This will open your browser to complete the login process
```

### Step 3: Initialize Vercel Project

```bash
# Navigate to your project directory
cd drvn-mini-app

# Initialize Vercel project (first time setup)
vercel

# This will prompt you with several questions:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No (for new projects)
# - What's your project's name? → drvn-mini-app
# - In which directory is your code located? → ./
# - Want to override the settings? → No
```

### Step 4: Configure Environment Variables

```bash
# Add required environment variables to Vercel
vercel env add NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME
vercel env add NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY
vercel env add NEXT_ONCHAINKIT_API_KEY
vercel env add NEXT_PUBLIC_URL
vercel env add MONGODB_URI
vercel env add REDIS_URL
vercel env add REDIS_TOKEN
vercel env add NEXT_PUBLIC_PINATA_API_KEY
vercel env add NEXT_PUBLIC_PINATA_SECRET_KEY
vercel env add ALCHEMY_API_KEY
vercel env add NEXT_PUBLIC_BSTR_CONTRACT_ADDRESS

# Optional variables
vercel env add NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT
vercel env add ENCRYPTION_KEY
vercel env add FARCASTER_HEADER
vercel env add FARCASTER_PAYLOAD
vercel env add FARCASTER_SIGNATURE

# Add all other environment variables as needed
# Each command will prompt you to enter the value
```

### Step 5: Deploy to Staging (Preview)

```bash
# Deploy to staging/preview environment
vercel

# This creates a preview deployment
# You'll get a unique URL for testing
# Example: https://drvn-mini-app-git-feature-branch-yourusername.vercel.app
```

### Step 6: Deploy to Production

```bash
# Deploy to production environment
vercel --prod

# This deploys to your main production URL
# Example: https://drvn-mini-app.vercel.app
```

### Step 7: Configure Custom Domain (Optional)

```bash
# Add custom domain
vercel domains add yourdomain.com

# Follow the DNS configuration instructions
# Update your domain's DNS records as prompted
```

### Step 8: Set Up Automatic Deployments

```bash
# Link to Git repository for automatic deployments
vercel --link

# This connects your local project to Vercel
# Future git pushes will trigger automatic deployments
```

### Step 9: Environment-Specific Deployments

```bash
# Deploy to specific environment
vercel --target production
vercel --target preview
vercel --target development

# Pull environment variables
vercel env pull .env.local

# List all deployments
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

### Step 10: Advanced Vercel Commands

```bash
# View project information
vercel info

# List all projects
vercel ls

# Remove project
vercel remove

# View deployment status
vercel inspect [deployment-url]

# Download deployment files
vercel pull

# View real-time logs
vercel logs --follow

# Scale deployment
vercel scale

# View analytics
vercel analytics
```

### Step 11: Troubleshooting Commands

```bash
# Clear Vercel cache
vercel --clear-cache

# Force rebuild
vercel --force

# Debug deployment issues
vercel logs --debug

# Check build status
vercel build

# View project settings
vercel project ls
```

### Step 12: Production Deployment Workflow

```bash
# 1. Build and test locally
npm run build
npm run start

# 2. Commit and push changes
git add .
git commit -m "Update for production deployment"
git push origin main

# 3. Deploy to production
vercel --prod

# 4. Verify deployment
# Check the production URL and test functionality
```

### Environment Variables Setup

Create a `vercel.json` file in your project root for advanced configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME": "@drvn-onchainkit-project-name",
    "NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID": "@drvn-onchainkit-project-id",
    "NEXT_PUBLIC_ONCHAINKIT_API_KEY": "@drvn-onchainkit-api-key",
    "NEXT_ONCHAINKIT_API_KEY": "@drvn-onchainkit-api-key",
    "NEXT_PUBLIC_URL": "@drvn-public-url",
    "MONGODB_URI": "@drvn-mongodb-uri",
    "REDIS_URL": "@drvn-redis-url",
    "REDIS_TOKEN": "@drvn-redis-token",
    "NEXT_PUBLIC_PINATA_API_KEY": "@drvn-pinata-api-key",
    "NEXT_PUBLIC_PINATA_SECRET_KEY": "@drvn-pinata-secret-key",
    "ALCHEMY_API_KEY": "@drvn-alchemy-api-key",
    "NEXT_PUBLIC_BSTR_CONTRACT_ADDRESS": "@drvn-bstr-contract-address"
  }
}
```

### Deployment Checklist

- [ ] Vercel CLI installed and logged in
- [ ] Project initialized with `vercel`
- [ ] Environment variables configured
- [ ] Local build successful (`npm run build`)
- [ ] Staging deployment tested
- [ ] Production deployment completed
- [ ] Custom domain configured (if needed)
- [ ] Automatic deployments enabled
- [ ] Monitoring and analytics set up

### Common Issues & Solutions

**Build Failures:**

```bash
# Check build logs
vercel logs --debug

# Clear cache and rebuild
vercel --clear-cache --force
```

**Environment Variables:**

```bash
# List current env vars
vercel env ls

# Remove problematic env var
vercel env rm VARIABLE_NAME

# Add new env var
vercel env add VARIABLE_NAME
```

**Domain Issues:**

```bash
# Check domain configuration
vercel domains ls

# Remove and re-add domain
vercel domains rm yourdomain.com
vercel domains add yourdomain.com
```

## 🔧 Configuration

### Environment Variables

The application requires several environment variables for full functionality:

- **OnchainKit**: Web3 wallet integration and Frame metadata
- **MongoDB**: User data, application state, and KYC status
- **Redis**: Real-time notifications and caching
- **Pinata/IPFS**: Profile image storage
- **Farcaster**: Social features and Frame integration
- **Didit.me**: KYC verification service (API key, webhook secret, workflow ID)
- **RS1 Contracts**: RS1 token, presale vault, and funds vault addresses
- **USDC**: USDC token contract address for presale purchases

### Database Setup

1. Create a MongoDB database
2. Set up collections for users, cars, and transactions
3. Configure indexes for optimal performance

### IPFS Setup

1. Create a Pinata account at [https://app.pinata.cloud/](https://app.pinata.cloud/)
2. Generate API keys for image uploads
3. Configure IPFS gateway settings

## 🎯 Key Components

### Authentication System

- Wallet-based authentication with Base network
- User profile management with IPFS image uploads
- Session management and security

### Marketplace Engine

- Car collection management
- Trading interface with USDC integration
- Market analytics and pricing

### Notification System

- Real-time notifications via Redis
- Webhook integration for external services
- Push notifications for mobile users

### Content Management

- Article and video content
- Community features and social interactions
- Premium content access control

### RS1 Presale System

- Multi-stage presale with access control
- KYC verification integration
- Share-based token purchasing
- Real-time progress tracking
- Token claiming after presale

### KYC Verification

- Didit.me integration
- Webhook-based status updates
- User verification tracking
- Secure session management

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Configure your reverse proxy (nginx/Apache)
4. Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary software created and copyrighted by **Justin Taylor** and **Decentral Bros LLC**.

**Copyright © 2025 Justin Taylor, Decentral Bros LLC. All rights reserved.**

For licensing inquiries, contact: **team@decentralbros.xyz**

## 📞 Support

- **Email**: team@decentralbros.xyz
- **Documentation**: [https://docs.drvnvhcls.com](https://docs.drvnvhcls.com)
- **Community**: [https://discord.gg/drvnvhcls](https://discord.gg/drvnvhcls)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [OnchainKit](https://www.base.org/builders/onchainkit)
- Powered by [Base](https://base.org/) blockchain
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)

---

**DRVN VHCLS** - Where Cars Meet Culture 🚗✨
