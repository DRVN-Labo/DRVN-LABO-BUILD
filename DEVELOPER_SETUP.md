# Developer Setup & Workflow Guide

<div align="center">

[![Contributing](https://img.shields.io/badge/Contributing-Guide-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

**Complete setup and workflow instructions for DRVN VHCLS developers**

</div>

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:rocket.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:rocket.svg?color=%23000000" width="18" height="18" alt="" /></picture> Quick Start Checklist

- [ ] Clone the repository
- [ ] Install dependencies (Frontend & Hardhat)
- [ ] Set up environment variables
- [ ] Verify local setup works
- [ ] Read branch naming & commit guidelines
- [ ] Understand PR process

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:download.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:download.svg?color=%23000000" width="18" height="18" alt="" /></picture> Initial Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/DRVN-Labo/DRVN-LABO-BUILD.git
cd DRVN-LABO-BUILD
```

### Step 2: Install Dependencies

**Frontend (Required for all frontend work):**
```bash
cd Frontend
npm install
cd ..
```

**Hardhat (Required for contract development):**
```bash
cd Hardhat
yarn install
cd ..
```

### Step 3: Environment Variables Setup

#### Frontend Environment Variables

```bash
cd Frontend
cp .env.example .env.local
```

**Required variables to fill in:**

| Variable | Where to Get | Required |
|----------|--------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` | Set to "DRVN VHCLS" | ✅ Yes |
| `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID` | [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/) | ✅ Yes |
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/) | ✅ Yes |
| `NEXT_ONCHAINKIT_API_KEY` | [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/) | ✅ Yes |
| `NEXT_PUBLIC_URL` | Your app URL (localhost:3000 for dev) | ✅ Yes |
| `MONGODB_URI` | Contact DBRO/DRVN Labo | ✅ Yes |
| `REDIS_URL` | [console.upstash.com](https://console.upstash.com/) | ✅ Yes |
| `REDIS_TOKEN` | [console.upstash.com](https://console.upstash.com/) | ✅ Yes |
| `NEXT_PUBLIC_PINATA_API_KEY` | [app.pinata.cloud](https://app.pinata.cloud/) | ✅ Yes |
| `NEXT_PUBLIC_PINATA_SECRET_KEY` | [app.pinata.cloud](https://app.pinata.cloud/) | ✅ Yes |
| `ALCHEMY_API_KEY` | [alchemy.com](https://www.alchemy.com/) | ✅ Yes |
| `NEXT_PUBLIC_BSTR_CONTRACT_ADDRESS` | From contract deployment | ✅ Yes |
| `NEXT_PUBLIC_RS1_TOKEN_ADDRESS` | RS1 token contract | ✅ Yes |
| `NEXT_PUBLIC_RS1_PRESALE_VAULT_ADDRESS` | RS1 presale vault contract | ✅ Yes |
| `NEXT_PUBLIC_RS1_FUNDS_VAULT_ADDRESS` | RS1 funds vault contract | ✅ Yes |
| `NEXT_PUBLIC_USDC_ADDRESS` | USDC token contract (Base) | ✅ Yes |
| `DIDIT_API_KEY` | [business.didit.me](https://business.didit.me) | ✅ Yes |
| `DIDIT_WEBHOOK_SECRET` | Didit console | ✅ Yes |
| `DIDIT_WORKFLOW_ID` | Didit console | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | App URL for webhooks | ✅ Yes |
| `ENCRYPTION_KEY` | Auto-generated if not provided (32 chars) | ⚠️ Optional |
| `NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT` | For gasless transactions | ⚠️ Optional |

**See `Frontend/.env.example` for complete list.**

#### Hardhat Environment Variables

```bash
cd Hardhat
cp .env.example .env
```

**Required variables to fill in:**

| Variable | Where to Get | Required |
|----------|--------------|----------|
| `ALCHEMY_API_KEY` | [alchemy.com](https://www.alchemy.com/) | ✅ Yes |
| `DEPLOYER_PRIVATE_KEY` | Your wallet (without 0x prefix) | ✅ Yes |
| `ETHERSCAN_API_KEY` | [basescan.org/myapikey](https://basescan.org/myapikey) | ✅ Yes |

**See `Hardhat/.env.example` for complete list.**

> **⚠️ IMPORTANT**: Never commit `.env` or `.env.local` files. They are in `.gitignore`.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:code.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:code.svg?color=%23000000" width="18" height="18" alt="" /></picture> Development Workflow

### For Frontend Developers

#### 1. Start Development Server

```bash
cd Frontend
npm run dev
```

Your app will be available at: `http://localhost:3000`

#### 2. Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |

#### 3. Before Committing (Required Checks)

```bash
cd Frontend
npm run lint          # Must pass
npm run format:check  # Must pass
npm run typecheck     # Must pass
npm run build         # Must pass
```

**All checks must pass before pushing!**

#### 4. Frontend Project Structure

```
Frontend/
├── app/              # Next.js App Router pages and components
│   ├── api/          # API routes
│   ├── components/   # React components
│   └── ...
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries and services
├── public/           # Static assets
└── ...
```

---

### For Smart Contract Developers (Hardhat)

#### 1. Compile Contracts

```bash
cd Hardhat
yarn compile
```

#### 2. Run Tests

```bash
cd Hardhat
yarn test
```

#### 3. Deploy Contracts

**To Base Sepolia (Testnet):**
```bash
cd Hardhat
yarn deploy
```

**To Base Mainnet:**
```bash
cd Hardhat
yarn deploy --network base
```

#### 4. Verify Contracts

```bash
cd Hardhat
yarn verify
```

#### 5. Available Scripts

| Command | Purpose |
|---------|---------|
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

#### 6. Before Committing (Required Checks)

```bash
cd Hardhat
yarn lint          # Must pass
yarn format:check  # Must pass
yarn test          # Must pass
yarn compile       # Must pass
```

**All checks must pass before pushing!**

#### 7. Contract Project Structure

```
Hardhat/
├── contracts/      # Solidity smart contracts
├── deploy/         # Deployment scripts
├── scripts/        # Utility scripts
├── test/           # Contract tests
└── ...
```

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:git-branch.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:git-branch.svg?color=%23000000" width="18" height="18" alt="" /></picture> Branch Naming (REQUIRED)

**All branches MUST follow this format:**

| Type | Format | Example |
|------|--------|---------|
| **Features** | `feature/description` | `feature/add-user-profile` |
| **Bug Fixes** | `fix/description` | `fix/wallet-connection-issue` |
| **Documentation** | `docs/description` | `docs/update-api-docs` |
| **Refactoring** | `refactor/description` | `refactor/simplify-auth` |
| **Tests** | `test/description` | `test/add-integration-tests` |
| **Chores** | `chore/description` | `chore/update-dependencies` |

**Rules:**
- ✅ Use lowercase
- ✅ Separate words with hyphens (`-`)
- ✅ Be descriptive but concise
- ❌ **NEVER** use `main` or `master` as branch names
- ❌ **NEVER** push directly to `main` (use PRs)

**Example workflow:**
```bash
git checkout main
git pull origin main
git checkout -b feature/add-car-detail-page
# Make your changes
git add .
git commit -m "feat(frontend): add car detail page"
git push origin feature/add-car-detail-page
```

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:message-square.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:message-square.svg?color=%23000000" width="18" height="18" alt="" /></picture> Commit Messages (REQUIRED)

**We use [Conventional Commits](https://www.conventionalcommits.org/) format:**

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | When to Use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, etc.) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding/updating tests |
| `chore` | Maintenance tasks |
| `ci` | CI/CD changes |
| `build` | Build system changes |

### Scope (Optional but Recommended)

| Scope | Description |
|-------|-------------|
| `frontend` | Frontend changes |
| `contracts` | Smart contract changes |
| `auth` | Authentication-related |
| `ui` | UI component changes |
| `api` | API route changes |

### Examples

**✅ Good:**
```bash
git commit -m "feat(frontend): add car collection gallery"
git commit -m "fix(contracts): resolve mint limit validation"
git commit -m "docs: update installation instructions"
```

**❌ Bad:**
```bash
git commit -m "Added car gallery"           # Missing type
git commit -m "fix: bug"                    # Too vague
git commit -m "updated stuff"                # No type, vague
```

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:git-pull-request.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:git-pull-request.svg?color=%23000000" width="18" height="18" alt="" /></picture> Pull Request Process

### Before Opening a PR

**1. Run all checks locally:**

**If you modified Frontend:**
```bash
cd Frontend
npm run lint          # Must pass
npm run format:check  # Must pass
npm run typecheck     # Must pass
npm run build         # Must pass
```

**If you modified Hardhat:**
```bash
cd Hardhat
yarn lint
yarn format:check
yarn test
yarn compile
```

**2. Ensure your branch is up to date:**
```bash
git checkout main
git pull origin main
git checkout your-branch-name
git rebase main  # or merge main into your branch
```

**3. Push your branch:**
```bash
git push origin your-branch-name
```

### PR Checklist

Before opening a PR, ensure:

- [ ] **Branch name** follows convention (`feature/`, `fix/`, etc.)
- [ ] **PR title** follows Conventional Commits format
- [ ] **All local checks pass** (lint, format, typecheck, test, build)
- [ ] **No secrets** committed (API keys, private keys, etc.)
- [ ] **Documentation updated** (if applicable)
- [ ] **Tests added/updated** (if applicable)
- [ ] **Screenshots included** (for UI changes)

### PR Title Format

**✅ Valid:**
- `feat(frontend): add car collection gallery`
- `fix(contracts): resolve deployment script error`
- `docs: update installation instructions`

**❌ Invalid:**
- `Added car gallery` (missing type)
- `fix: bug` (too vague)
- `My changes` (no format)

### PR Description Template

```markdown
## Summary
Brief description of what this PR does.

## Changes
- Change 1
- Change 2
- Change 3

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Related Issues
Closes #123
```

### What Happens After You Open a PR

1. **Automated CI checks run** (lint, format, typecheck, test, build)
   - ⚠️ **All checks MUST pass** before merge
2. **Code review required**
   - At least one CODEOWNER must approve
3. **Address feedback** (if any)
4. **Merge** (once approved and checks pass)

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:file-code.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:file-code.svg?color=%23000000" width="18" height="18" alt="" /></picture> Coding Standards

### Frontend (TypeScript/React)

| Standard | Rule |
|----------|------|
| **TypeScript** | Use TypeScript for all new code. Avoid `any` types |
| **React** | React 19.2.3 (Security patched) with Next.js 15.5.7 App Router |
| **Components** | Use functional components with hooks |
| **Styling** | Tailwind CSS 4.1.17 with custom theme |
| **Web3** | OnchainKit 1.0.3 for wallet integration |
| **Naming** | Components: `PascalCase.tsx`<br>Functions: `camelCase`<br>Constants: `UPPER_SNAKE_CASE` |
| **Imports** | Group imports (external, internal, relative) |
| **Formatting** | Prettier auto-formats on save |

### Contracts (Solidity)

| Standard | Rule |
|----------|------|
| **Solidity Version** | 0.8.20 |
| **Naming** | Contracts: `PascalCase.sol`<br>Functions: `camelCase`<br>Variables: `camelCase`<br>Constants: `UPPER_SNAKE_CASE` |
| **Security** | Follow OpenZeppelin best practices |
| **Formatting** | Prettier with `prettier-plugin-solidity` |

### General Rules

- ✅ Write clear comments for complex logic
- ✅ Extract reusable code (DRY principle)
- ✅ Handle errors gracefully
- ✅ Follow WCAG guidelines for accessibility
- ❌ Never commit secrets or sensitive data
- ❌ Never commit `.env` files

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:flask-conical.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:flask-conical.svg?color=%23000000" width="18" height="18" alt="" /></picture> Testing Requirements

### Frontend Testing

**Before every commit:**
```bash
cd Frontend
npm run typecheck     # TypeScript must pass
npm run lint          # ESLint must pass
npm run format:check  # Prettier must pass
npm run build         # Build must succeed
```

### Contract Testing

**Before every commit:**
```bash
cd Hardhat
yarn test          # All tests must pass
yarn compile       # Contracts must compile
```

**Test Coverage:**
- Aim for >80% test coverage
- All new functions must have tests
- Test both unit and integration scenarios

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:settings.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:settings.svg?color=%23000000" width="18" height="18" alt="" /></picture> Environment-Specific Notes

### Frontend Developers

**Required Services:**
- OnchainKit API key (Coinbase Developer Portal)
- MongoDB connection (contact DBRO/DRVN Labo)
- Redis (Upstash)
- Pinata (IPFS)
- Alchemy API key

**Local Development:**
- Runs on `http://localhost:3000`
- Hot reload enabled
- TypeScript strict mode
- Next.js 15.5.7 with React 19.2.3 (Security patched)
- Tailwind CSS 4.1.17 with PostCSS
- OnchainKit 1.0.3 for wallet integration
- RS1 Presale system with KYC integration
- Didit.me KYC verification

### Contract Developers

**Required Services:**
- Alchemy API key
- Etherscan/Basescan API key (for verification)
- Wallet with testnet ETH (for deployments)

**Networks:**
- **Base Sepolia** (Testnet): `84532`
- **Base Mainnet**: `8453`

**Deployment:**
- Always test on Base Sepolia first
- Verify contracts after deployment
- Update contract addresses in Frontend `.env.local`

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:alert-circle.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:alert-circle.svg?color=%23000000" width="18" height="18" alt="" /></picture> Common Issues & Solutions

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Frontend
cd Frontend
rm -rf node_modules package-lock.json
npm install

# Hardhat
cd Hardhat
rm -rf node_modules yarn.lock
yarn install
```

### Issue: TypeScript errors

**Solution:**
```bash
cd Frontend
npm run typecheck  # See specific errors
# Fix the errors, then:
npm run build
```

### Issue: Linting/formatting errors

**Solution:**
```bash
# Frontend
cd Frontend
npm run format     # Auto-fix formatting
npm run lint       # See lint errors

# Hardhat
cd Hardhat
yarn format        # Auto-fix formatting
yarn lint          # See lint errors
```

### Issue: Tests failing

**Solution:**
```bash
cd Hardhat
yarn test --grep "specific-test-name"  # Run specific test
yarn test --verbose                    # See detailed output
```

### Issue: Build fails

**Solution:**
```bash
# Frontend
cd Frontend
npm run build  # See specific build errors
# Fix errors and rebuild
```

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:life-buoy.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:life-buoy.svg?color=%23000000" width="18" height="18" alt="" /></picture> Getting Help

| Resource | Link |
|---------|------|
| **Questions** | Open a [GitHub Discussion](https://github.com/DRVN-Labo/DRVN-LABO-BUILD/discussions) |
| **Bugs** | Open a [GitHub Issue](https://github.com/DRVN-Labo/DRVN-LABO-BUILD/issues) |
| **Security** | See [SECURITY.md](SECURITY.md) |
| **Contributing Guide** | See [CONTRIBUTING.md](CONTRIBUTING.md) |
| **Code of Conduct** | See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:checklist.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:checklist.svg?color=%23000000" width="18" height="18" alt="" /></picture> Quick Reference Checklist

### Before Every Commit

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Linting passes
- [ ] Formatting is correct
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] No secrets committed
- [ ] Commit message follows convention

### Before Every PR

- [ ] Branch name follows convention
- [ ] All local checks pass
- [ ] Branch is up to date with `main`
- [ ] PR title follows Conventional Commits
- [ ] PR description is complete
- [ ] Screenshots included (if UI changes)
- [ ] Documentation updated (if needed)

---

<div align="center">

<sub><b>DRVN VHCLS — Building Together, Driving Forward</b></sub>

</div>

