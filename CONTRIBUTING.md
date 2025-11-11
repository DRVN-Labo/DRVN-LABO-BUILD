# Contributing to DRVN VHCLS

<div align="center">

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Contributors](https://img.shields.io/github/contributors/Mr-Web3/DRVN-LABO-MINI-APP-TWO)](https://github.com/Mr-Web3/DRVN-LABO-MINI-APP-TWO/graphs/contributors)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**Thank you for your interest in contributing to DRVN VHCLS!**

</div>

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:list.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:list.svg?color=%23000000" width="18" height="18" alt="" /></picture> Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming](#branch-naming)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:shield.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:shield.svg?color=%23000000" width="18" height="18" alt="" /></picture> Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:rocket.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:rocket.svg?color=%23000000" width="18" height="18" alt="" /></picture> Getting Started

### Prerequisites

| Requirement | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 22.x | Runtime environment |
| **Git** | Latest | Version control |
| **npm** | Latest | Frontend package manager |
| **yarn** | Latest | Hardhat package manager |
| **Code Editor** | - | VS Code recommended |
| **Knowledge** | - | React/Next.js, Solidity/Hardhat, TypeScript/JavaScript |

### Fork and Clone

#### Step 1: Fork the Repository

Fork the repository on GitHub to create your own copy.

#### Step 2: Clone Your Fork

```bash
git clone https://github.com/your-username/DRVN-MINI-APP.git
cd DRVN-MINI-APP
```

#### Step 3: Add Upstream Remote

```bash
git remote add upstream https://github.com/original-org/DRVN-MINI-APP.git
```

#### Step 4: Install Dependencies

**Frontend:**
```bash
cd Frontend
npm install
cd ..
```

**Hardhat:**
```bash
cd Hardhat
yarn install
cd ..
```

#### Step 5: Set Up Environment Variables

| Workspace | Action | File |
|-----------|--------|------|
| **Frontend** | Copy `.env.example` to `.env.local` | `Frontend/.env.local` |
| **Hardhat** | Copy `.env.example` to `.env` | `Hardhat/.env` |

Fill in placeholder values (see workspace READMEs for details).

#### Step 6: Set Up Accounts for 3-in-1 Development

This project is a **3-in-1 build** that runs as:

| Platform | Access Method | Status |
|----------|--------------|--------|
| **dApp** | localhost:3000 | ✅ Standard web app |
| **Farcaster Mini App** | Via Farcaster preview | ✅ Mini app |
| **Base Mini App** | Via Base.dev preview | ✅ Mini app |

**Required Accounts:**

| Account | Purpose | Where to Get |
|---------|---------|--------------|
| **Farcaster** | Mini app preview | [farcaster.xyz](https://farcaster.xyz) |
| **Base.dev** | Base mini app preview | [base.org](https://base.org) |
| **ngrok** | Local development tunneling | [dashboard.ngrok.com](https://dashboard.ngrok.com/) |

See [Local Development Setup](#local-development-setup) below.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:settings.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:settings.svg?color=%23000000" width="18" height="18" alt="" /></picture> Local Development Setup

### Understanding the 3-in-1 Architecture

Before making changes, understand that this codebase serves **three different environments simultaneously**:

1. **dApp** - Standard web application accessible at `http://localhost:3000`
2. **Farcaster Mini App** - Previewed through Farcaster developer tools
3. **Base Mini App** - Previewed through Base.dev preview tool

**All three views share the same codebase and hot-reload together.** When you make a change, you should see it update in all three environments.

### ngrok Setup for Local Development

#### Step 1: Install ngrok CLI

| OS | Instructions |
|----|--------------|
| **macOS** | [Setup Guide](https://dashboard.ngrok.com/get-started/setup/macos) |
| **Windows** | [Setup Guide](https://dashboard.ngrok.com/get-started/setup/windows) |
| **Linux** | [Setup Guide](https://dashboard.ngrok.com/get-started/setup/linux) |

#### Step 2: Create Reserved Domain

1. Go to [https://dashboard.ngrok.com/domains](https://dashboard.ngrok.com/domains)
2. Create a reserved domain (e.g., `loop.ngrok.dev`)
3. Copy your domain name

#### Step 3: Start Development Environment

**Terminal 1 - Start Frontend Dev Server:**
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

#### Step 4: Configure Preview Tools

| Platform | Steps |
|----------|-------|
| **Farcaster** | 1. Open Farcaster developer tools/preview<br>2. Enter ngrok URL: `https://your-domain.ngrok.dev`<br>3. Launch the preview |
| **Base.dev** | 1. Open Base.dev preview tool<br>2. Enter ngrok URL: `https://your-domain.ngrok.dev`<br>3. Launch the preview |

### Real-Time Development Workflow

Once set up correctly:

1. **Make code changes** in your editor
2. **Save the file** - Next.js hot-reloads automatically
3. **See changes instantly** in:
   - dApp at `http://localhost:3000`
   - Farcaster mini app (via preview tool)
   - Base mini app (via preview tool)

**Important**: Keep both terminals running:
- Terminal 1: `npm run dev` (Frontend dev server)
- Terminal 2: `ngrok http --url=your-domain.ngrok.dev 3000` (ngrok tunnel)

### Testing Your Changes

Before committing, test your changes in **all three environments**:

| Environment | Status | How to Test |
|-------------|--------|-------------|
| **dApp** | ✅ Required | Open `http://localhost:3000` in browser |
| **Farcaster** | ✅ Required | Test in Farcaster preview tool |
| **Base** | ✅ Required | Test in Base.dev preview tool |

This ensures your changes work correctly across all platforms.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:code.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:code.svg?color=%23000000" width="18" height="18" alt="" /></picture> Development Workflow

### 1. Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Create a Feature Branch

**Important**: Always create a new branch from `main` for your work.

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes

- Write clean, readable code
- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation as needed

### 4. Test Your Changes

Before committing, ensure all checks pass:

**Frontend:**
```bash
cd Frontend
npm run lint
npm run format:check
npm run typecheck
npm run build
```

**Hardhat:**
```bash
cd Hardhat
yarn lint
yarn format:check
yarn test
yarn compile
```

### 5. Commit Your Changes

Use [Conventional Commits](#commit-message-guidelines) format:

```bash
git add .
git commit -m "feat: add new car collection feature"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:git-branch.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:git-branch.svg?color=%23000000" width="18" height="18" alt="" /></picture> Branch Naming

**Required**: All branches must follow this naming convention:

| Type | Format | Example |
|------|--------|---------|
| **Features** | `feature/description-of-feature` | `feature/add-user-profile-page` |
| **Bug Fixes** | `fix/description-of-fix` | `fix/resolve-wallet-connection-issue` |
| **Documentation** | `docs/description-of-docs` | `docs/update-api-documentation` |
| **Refactoring** | `refactor/description-of-refactor` | `refactor/simplify-auth-logic` |
| **Tests** | `test/description-of-tests` | `test/add-contract-integration-tests` |
| **Chores** | `chore/description-of-chore` | `chore/update-dependencies` |

**Rules:**
- Use lowercase
- Separate words with hyphens (`-`)
- Be descriptive but concise
- Start with the type prefix (`feature/`, `fix/`, etc.)
- **Do NOT** use `main` or `master` as branch names
- **Do NOT** push directly to `main` branch (use PRs)

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:message-square.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:message-square.svg?color=%23000000" width="18" height="18" alt="" /></picture> Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Code style changes (formatting, missing semicolons, etc.) |
| `refactor` | Code refactoring without changing functionality |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks, dependency updates |
| `ci` | CI/CD changes |
| `build` | Build system changes |

### Scope (Optional)

The scope should be the name of the workspace or component affected:

| Scope | Description |
|-------|-------------|
| `frontend` | Frontend changes |
| `contracts` | Smart contract changes |
| `auth` | Authentication-related |
| `ui` | UI component changes |
| `api` | API route changes |

### Examples

```bash
# Feature
git commit -m "feat(frontend): add car detail modal component"

# Bug fix
git commit -m "fix(contracts): resolve mint limit validation issue"

# Documentation
git commit -m "docs: update installation instructions in README"

# Multiple changes
git commit -m "feat(frontend): add user profile page

- Add profile component with avatar upload
- Integrate IPFS for image storage
- Add profile update API endpoint

Closes #123"
```

### PR Title Format

Pull Request titles must also follow Conventional Commits format:

| Status | Example |
|--------|---------|
| ✅ Valid | `feat(frontend): add car collection gallery` |
| ✅ Valid | `fix(contracts): resolve deployment script error` |
| ❌ Invalid | `Added car gallery` (missing type) |
| ❌ Invalid | `fix: bug` (too vague) |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:git-pull-request.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:git-pull-request.svg?color=%23000000" width="18" height="18" alt="" /></picture> Pull Request Process

### Before Opening a PR

1. **Ensure all checks pass locally**
   ```bash
   # Frontend
   cd Frontend && npm run lint && npm run format:check && npm run typecheck && npm run build
   
   # Hardhat (if you modified contracts)
   cd Hardhat && yarn lint && yarn format:check && yarn test && yarn compile
   ```

2. **Update documentation** if your changes affect:
   - API endpoints
   - Configuration options
   - User-facing features
   - Installation/setup process

3. **Add tests** for new features or bug fixes

4. **Check for secrets** - ensure no API keys, private keys, or sensitive data are committed

5. **Rebase on latest main** (if needed)
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### PR Checklist

When opening a PR, ensure:

- [ ] PR title follows Conventional Commits format
- [ ] PR description clearly explains what changed and why
- [ ] All CI checks pass (lint, format, typecheck, tests, build)
- [ ] Code follows project style guidelines
- [ ] Documentation updated (if applicable)
- [ ] Tests added/updated (if applicable)
- [ ] No secrets or sensitive data committed
- [ ] Screenshots included (for UI changes)
- [ ] Branch is up to date with `main`

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
Related to #456
```

### Review Process

| Step | Description | Requirement |
|------|-------------|-------------|
| **1. Automated Checks** | CI runs linting, formatting, type checking, tests, and builds | All checks must pass (enforced by branch protection) |
| **2. PR Title Validation** | Commitlint workflow validates PR title | Must follow Conventional Commits (validated automatically) |
| **3. Code Review** | At least one CODEOWNER must approve | Enforced by branch protection |
| **4. Address Feedback** | Make requested changes and push updates | Required before merge |
| **5. Merge** | Once approved and CI passes, a maintainer will merge | Final step |

**Important**: 
- PRs **must** have all CI checks passing before they can be merged (enforced by branch protection rules)
- PR titles **must** follow Conventional Commits format (validated automatically)
- At least one CODEOWNER **must** approve (enforced by branch protection)
- No force pushes to `main` branch (enforced by branch protection)

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:file-code.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:file-code.svg?color=%23000000" width="18" height="18" alt="" /></picture> Coding Standards

### Frontend (TypeScript/React)

| Aspect | Standard |
|--------|----------|
| **TypeScript** | Use TypeScript for all new code. Avoid `any` types. |
| **Components** | Use functional components with hooks |
| **Naming** | Components: PascalCase (`UserProfile.tsx`)<br>Functions/variables: camelCase (`getUserData`)<br>Constants: UPPER_SNAKE_CASE (`MAX_RETRIES`) |
| **Imports** | Group imports (external, internal, relative) |
| **Formatting** | Use Prettier (configured in `.prettierrc`) |

### Contracts (Solidity)

| Aspect | Standard |
|--------|----------|
| **Solidity Version** | 0.8.20 |
| **Naming** | Contracts: PascalCase (`CarCollection.sol`)<br>Functions: camelCase (`mintToken`)<br>Variables: camelCase (`tokenId`)<br>Constants: UPPER_SNAKE_CASE (`MAX_SUPPLY`) |
| **Security** | Follow OpenZeppelin best practices |
| **Formatting** | Use Prettier with `prettier-plugin-solidity` |

### General

- **Comments**: Write clear, concise comments for complex logic
- **DRY**: Don't Repeat Yourself - extract reusable code
- **Error Handling**: Handle errors gracefully with meaningful messages
- **Accessibility**: Follow WCAG guidelines for UI components

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:flask-conical.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:flask-conical.svg?color=%23000000" width="18" height="18" alt="" /></picture> Testing Requirements

### Frontend

| Requirement | Command | Purpose |
|-------------|---------|---------|
| **Type Checking** | `npm run typecheck` | All TypeScript must pass type checking |
| **Linting** | `npm run lint` | ESLint must pass with no errors |
| **Formatting** | `npm run format:check` | Prettier must pass |
| **Build** | `npm run build` | Production build must succeed |

### Contracts

| Requirement | Description |
|-------------|-------------|
| **Unit Tests** | All new functions must have tests |
| **Integration Tests** | Test contract interactions |
| **Gas Optimization** | Consider gas costs in contract design |
| **Coverage** | Aim for >80% test coverage |

### Running Tests

```bash
# Frontend
cd Frontend
npm run typecheck
npm run lint

# Hardhat
cd Hardhat
yarn test
```

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:book.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:book.svg?color=%23000000" width="18" height="18" alt="" /></picture> Documentation

### When to Update Documentation

Update documentation when you:
- Add new features
- Change API endpoints
- Modify configuration options
- Change installation/setup process
- Fix bugs that affect user experience

### Documentation Locations

| Location | Purpose |
|----------|---------|
| **README.md** | Project overview, quick start, scripts |
| **CONTRIBUTING.md** | This file |
| **Workspace READMEs** | `Frontend/README.md`, `Hardhat/README.md` |
| **Code Comments** | Inline documentation for complex logic |
| **API Documentation** | JSDoc comments for functions |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:life-buoy.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:life-buoy.svg?color=%23000000" width="18" height="18" alt="" /></picture> Getting Help

| Resource | Link |
|---------|------|
| **Questions** | [GitHub Discussion](https://github.com/your-org/DRVN-MINI-APP/discussions) |
| **Bugs** | [GitHub Issue](https://github.com/your-org/DRVN-MINI-APP/issues) |
| **Security** | See [SECURITY.md](SECURITY.md) |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:users.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:users.svg?color=%23000000" width="18" height="18" alt="" /></picture> Project Maintainers

**Lead Developer**: Justin Taylor (Decentral Bros LLC)  
Working with DRVN Labo LLC & Alex (REX)

| Contact | Link |
|---------|------|
| **Email** | [development@decentralbros.tech](mailto:development@decentralbros.tech) |
| **Personal Website** | [justin.dbro.dev](https://justin.dbro.dev) |
| **Company Website** | [www.decentralbros.io](https://www.decentralbros.io) |
| **X (Twitter)** | [@DecentralBros_](https://www.x.com/DecentralBros_) |

---

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://api.iconify.design/lucide:heart.svg?color=%2300daa2"><img src="https://api.iconify.design/lucide:heart.svg?color=%23000000" width="18" height="18" alt="" /></picture> Recognition

Contributors will be:
- Listed in the project's contributors (if you consent)
- Credited in release notes for significant contributions
- Appreciated by the maintainers and community!

**Thank you for contributing to DRVN VHCLS!**

---

<div align="center">

<sub><b>DRVN VHCLS — Where Contributions Drive Innovation</b></sub>

</div>
