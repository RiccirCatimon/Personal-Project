#!/bin/bash

# Script to manually push updates to GitHub with uniform messaging
echo "🚀 Starting professional synchronization (v1.2.2)..."

# Ensure permissions (self-healing)
chmod +x "$0"

# Pull latest changes to avoid conflicts
echo "📥 Pulling latest changes from remote..."
git pull origin main --rebase || true

# Add all changes
echo "📁 Staging files..."
git add .

# Commit with a uniform, professional message
echo "📝 Committing changes..."
git commit -m "chore: synchronize system to v1.2.2 for deployment verification" || true

# Push to the main branch
echo "📤 Pushing to GitHub (main branch)..."
git push origin main

echo "✅ Successfully updated GitHub repository!"
echo "👉 Now, check https://vercel.com/riccircatimons-projects/personal-roject/deployments"
echo "👉 Wait for the build to finish, then visit: https://personal-roject.vercel.app"
