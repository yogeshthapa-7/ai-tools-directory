---
description: Repository Information Overview
alwaysApply: true
---

# AI Forge Information

## Summary
**AI Forge** is a high-end AI Tools Directory built with **Next.js 15**, **React 19**, **Framer Motion**, and **TypeScript**. It features a premium user interface with advanced animations, a dynamic routing system for individual tool pages, and a sophisticated filtering system.

## Structure
- **ai-tools/**: The main Next.js application directory.
  - **src/app/**: App Router with dynamic routes for tools (`/tools/[slug]`).
  - **src/components/**: Premium UI components with Framer Motion animations.
  - **src/lib/**: Data store and utilities.
  - **src/hooks/**: Custom hooks for local storage and state.
- **.qodo/**, **.zencoder/**, **.zenflow/**: AI-driven development configuration.

## Language & Runtime
**Language**: TypeScript  
**Version**: Node.js 20+, Next.js 15.1.6, React 19.2.3  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- **next**: 15.1.6
- **react**: 19.2.3
- **framer-motion**: For high-end animations
- **lucide-react**: Icon library
- **zod**: Schema validation
- **tailwind-merge / clsx**: Utility for styling

## Build & Installation
```bash
# Navigate to the app directory
cd ai-tools

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Navigation & Entry Points
- **Homepage**: `ai-tools/src/app/page.tsx` - Features a curated directory with animations.
- **Tool Details**: `ai-tools/src/app/tools/[slug]/page.tsx` - Dynamic detailed view for each AI tool.
- **Layout**: `ai-tools/src/app/layout.tsx` - Root layout with global metadata.
