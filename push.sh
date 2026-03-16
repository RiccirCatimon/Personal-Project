#!/bin/bash

# Script to manually push updates to GitHub with uniform messaging
echo "🚀 Starting professional synchronization (v1.2.4)..."

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
git commit -m "chore: synchronize system to v1.2.4 for final domain verification" || true

# Push to the main branch explicitly
echo "📤 Pushing to GitHub (main branch)..."
git push -u origin main

echo "✅ Successfully updated GitHub repository!"
echo "👉 Now, check your Vercel dashboard: https://vercel.com/riccircatimons-projects/personal-roject/deployments"
echo "👉 You should see a NEW deployment starting 'less than a minute ago'."
echo "👉 Once it finishes, visit: https://personal-roject.vercel.app"
