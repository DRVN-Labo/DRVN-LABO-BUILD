# 🚨 MANDATORY SECURITY UPDATE - Action Required

<div align="center">

[![Security](https://img.shields.io/badge/Security-Critical-red)](https://github.com/DRVN-Labo/DRVN-MINI-APP/security)
[![Status](https://img.shields.io/badge/Status-Mandatory-orange)](https://github.com/DRVN-Labo/DRVN-MINI-APP)

**⚠️ CRITICAL: All contributors must update their code before submitting PRs**

</div>

---

## 📋 Overview

This document explains the **mandatory security update** that has been applied to the main branch. All contributors working on feature branches **MUST** pull these changes and update their code before submitting Pull Requests.

### Why This Update is Mandatory

- **Security Vulnerabilities**: Previous versions of React, Next.js, and other SDK packages contained known security vulnerabilities
- **Vercel Security Notice**: Vercel flagged compromised package versions that pose security risks
- **Dependency Conflicts**: Outdated packages cause build failures and runtime errors
- **Compatibility**: New versions ensure compatibility with Base Mini App and Farcaster Mini App requirements

---

## 🔄 What Changed

### Critical Package Updates

| Package | Old Version | New Version | Reason |
|---------|-----------|-------------|--------|
| **Next.js** | < 15.5.7 | **15.5.7** | Security vulnerabilities, compromised versions |
| **React** | < 19.2.3 | **19.2.3** | Security vulnerabilities (CVE-2025-55184, CVE-2025-67779, CVE-2025-55183) |
| **React-DOM** | < 19.2.3 | **19.2.3** | Must match React version |
| **Tailwind CSS** | < 4.1.17 | **4.1.17** | Major version update, new features |
| **OnchainKit** | Various | **1.0.3** | Exact version required for Base Mini App |
| **Wagmi** | < 2.16.0 | **2.16.0** | Compatibility with React 19 |
| **Viem** | < 2.27.2 | **2.27.2** | Security updates, compatibility |
| **Node.js** | 18.x / 20.x | **22.x** | Required for new package versions |

### Additional Changes

- Updated environment variable structure
- Updated OnchainKit configuration
- Updated Tailwind CSS configuration (v4)
- Updated TypeScript types for React 19
- Updated ESLint configuration for Next.js 15

---

## ✅ Required Actions for Contributors

### Step 1: Update Your Local Repository

```bash
# 1. Save your current work
git add .
git commit -m "WIP: work in progress before security update"

# 2. Switch to main branch
git checkout main

# 3. Pull latest changes from remote
git pull origin main

# 4. Switch back to your feature branch
git checkout your-branch-name

# 5. Merge main into your branch
git merge main
```

**If you encounter merge conflicts:**
```bash
# Resolve conflicts manually, then:
git add .
git commit -m "chore: merge security update from main"
```

### Step 2: Update Dependencies

```bash
# Navigate to Frontend directory
cd Frontend

# Remove old dependencies
rm -rf node_modules package-lock.json

# Install updated dependencies
npm install

# Verify versions
npm list next react react-dom tailwindcss @coinbase/onchainkit wagmi viem
```

**Expected output:**
```
drvn-mini-app@0.1.0
├── next@15.5.7
├── react@19.2.3
├── react-dom@19.2.3
├── tailwindcss@4.1.17
├── @coinbase/onchainkit@1.0.3
├── wagmi@2.16.0
└── viem@2.27.2
```

### Step 3: Fix Breaking Changes

#### React 19 Changes

- **Component Props**: Some component prop types have changed
- **Hooks**: `useEffect` and other hooks behavior may differ
- **TypeScript**: Update type definitions for React 19

**Common fixes:**
```typescript
// Old (React 18)
import { FC } from 'react';

// New (React 19) - FC is still valid but types are stricter
import { FC, ReactNode } from 'react';

// Update component types if needed
interface Props {
  children: ReactNode;
}
```

#### Next.js 15 Changes

- **App Router**: Some API changes in App Router
- **Metadata**: Metadata API may have minor changes
- **Server Components**: Default behavior changes

**Common fixes:**
```typescript
// Ensure async components are properly typed
export default async function Page() {
  // ...
}
```

#### Tailwind CSS 4 Changes

- **Configuration**: New `tailwind.config.ts` structure
- **PostCSS**: Updated PostCSS configuration
- **CSS Imports**: New `@import "tailwindcss"` syntax

**No code changes needed** - configuration files have been updated.

### Step 4: Test Your Changes

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run formatting check
npm run format:check

# Build the application
npm run build

# Test locally
npm run dev
```

**All checks must pass before pushing!**

### Step 5: Update Your PR

```bash
# Commit your fixes
git add .
git commit -m "fix(frontend): update code for React 19 and Next.js 15 compatibility"

# Push to your branch
git push origin your-branch-name
```

---

## 🔍 Version Check Automation

Our GitHub Actions workflows will **automatically check** your PR for correct package versions. If your PR fails the version check:

1. **Check the workflow logs** for specific version mismatches
2. **Follow the error messages** to update your `package.json`
3. **Run `npm install`** to update `package-lock.json`
4. **Push the updated files** to your branch

### What Gets Checked

- ✅ Next.js version (must be ^15.5.7)
- ✅ React version (must be ^19.2.3)
- ✅ React-DOM version (must be ^19.2.3)
- ✅ Tailwind CSS version (must be ^4.1.17)
- ✅ OnchainKit version (must be exactly 1.0.3)
- ✅ Wagmi version (must be ^2.16.0)
- ✅ Viem version (must be ^2.27.2)
- ✅ Node.js version requirement (must be 22.x)

---

## 🐛 Common Issues & Solutions

### Issue: "Package version mismatch" error

**Solution:**
```bash
cd Frontend
npm install next@^15.5.7 react@^19.2.3 react-dom@^19.2.3
npm install -D tailwindcss@^4.1.17
npm install @coinbase/onchainkit@1.0.3
npm install wagmi@^2.16.0 viem@^2.27.2
```

### Issue: TypeScript errors after update

**Solution:**
```bash
# Update TypeScript types
npm install -D @types/react@^19 @types/react-dom@^19 @types/node@^22

# Run type check
npm run typecheck
```

### Issue: Build failures

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Issue: Tailwind CSS not working

**Solution:**
- Ensure `tailwind.config.ts` exists and is properly configured
- Check `postcss.config.mjs` has `@tailwindcss/postcss` plugin
- Verify `globals.css` has `@import "tailwindcss"` at the top

### Issue: OnchainKit errors

**Solution:**
- Verify `@coinbase/onchainkit` is exactly version `1.0.3`
- Check environment variables are set correctly
- Ensure `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID` is set

---

## 📝 PR Checklist

Before submitting your PR, ensure:

- [ ] You've pulled the latest changes from `main`
- [ ] All package versions match the required versions
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] Your code works locally with `npm run dev`
- [ ] You've tested in all three environments (dApp, Farcaster, Base)
- [ ] No merge conflicts with `main`
- [ ] PR title follows Conventional Commits format

---

## 🚫 What Happens If You Don't Update

**Your PR will be automatically rejected** by our CI/CD pipeline:

1. ❌ Version check workflow will fail
2. ❌ Build will fail
3. ❌ PR cannot be merged until versions are fixed

**We cannot merge PRs with outdated/compromised package versions for security reasons.**

---

## 📞 Need Help?

If you encounter issues during the update:

1. **Check the error messages** in GitHub Actions workflow logs
2. **Review this document** for common solutions
3. **Open a GitHub Discussion** for questions
4. **Contact maintainers** if you need assistance

**Contact:**
- Email: [development@decentralbros.tech](mailto:development@decentralbros.tech)
- GitHub Discussions: [Create a discussion](https://github.com/DRVN-Labo/DRVN-MINI-APP/discussions)

---

## 📅 Timeline

- **Update Applied**: [Date of main branch update]
- **Deadline for PRs**: All PRs submitted after this date must include the security update
- **Grace Period**: 7 days from update date for existing PRs to be updated

---

## 🙏 Thank You

Thank you for your patience and cooperation with this mandatory security update. Keeping our dependencies up-to-date ensures:

- 🔒 **Security**: Protection against known vulnerabilities
- 🚀 **Performance**: Latest optimizations and improvements
- 🛠️ **Compatibility**: Support for new features and platforms
- 📦 **Stability**: Reduced dependency conflicts

**Your contributions are valuable, and we appreciate your help in maintaining a secure codebase!**

---

<div align="center">

<sub><b>DRVN VHCLS — Security First, Innovation Always</b></sub>

</div>

