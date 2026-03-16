#!/bin/bash

# Script to manually push updates to GitHub with uniform messaging
echo "🚀 Starting professional synchronization (v1.2.9)..."

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
git commit -m "fix: resolve check-in button hang and fix component imports v1.2.9" || true

# Force trigger build by pushing even if local commit was empty (due to previous partial pushes)
git commit --allow-empty -m "chore: force redeploy v1.2.9" || true

# Push to the main branch explicitly
echo "📤 Pushing to GitHub (main branch)..."
git push -u origin main

echo "✅ Successfully updated GitHub repository!"
echo "👉 Now, check your Vercel dashboard: https://vercel.com/riccircatimons-projects/library-proj-ten/deployments"
echo "👉 Look for a NEW deployment labeled 'v1.2.9'."
echo "👉 Once it finishes, visit: https://library-proj-ten.vercel.app"
