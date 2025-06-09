#!/bin/bash
# ElizaOS WSL2 Setup Script
# This script installs all required system packages, global tools, and project dependencies for ElizaOS development and testing on WSL2.
# Run this script from your home directory or the root of your ElizaOS project.

set -e

# --- System Packages ---
echo "[1/5] Installing system packages (unzip, build-essential, python3, dos2unix)..."
sudo apt update
sudo apt install -y unzip build-essential python3 dos2unix curl git

# --- Bun (JS runtime & package manager) ---
echo "[2/5] Installing Bun..."
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# --- Turbo (Monorepo build orchestrator) ---
echo "[3/5] Installing Turbo globally..."
bun add -g turbo || npm install -g turbo

# --- ElizaOS CLI (for running tests and commands) ---
echo "[4/5] Installing ElizaOS CLI globally..."
npm install -g @elizaos/cli@beta

# --- Project Dependencies ---
echo "[5/5] Installing project dependencies with Bun..."
# IMPORTANT: Run this from the root of your ElizaOS project directory!
# If you are not in the project root, cd there first:
#   cd /path/to/eliza
bun clean
bun install

# --- Provider Plugins (Anthropic, OpenAI, etc.) ---
echo "[6/6] Installing provider plugins (Anthropic, OpenAI)..."
bun add @elizaos/plugin-anthropic@beta || npm install @elizaos/plugin-anthropic@beta
echo "Installed @elizaos/plugin-anthropic."
bun add @elizaos/plugin-openai@beta || npm install @elizaos/plugin-openai@beta
echo "Installed @elizaos/plugin-openai."

# --- Note on npm install test (cowsay) one directory up ---
# When testing npm registry/network access, you may need to run 'npm install cowsay' OUTSIDE the monorepo root.
# This is because monorepo roots with workspaces (like ElizaOS) do not support classic npm install syntax for single packages.
# If you see 'EUNSUPPORTEDPROTOCOL' or 'Unsupported URL Type "workspace:"',
# try running 'npm install cowsay' from your home directory (cd ~) instead.

echo "\nSetup complete! You can now build and run ElizaOS."
echo "To run tests:"
echo "  bun run test"
echo "Or, for the CLI:"
echo "  elizaos test" 