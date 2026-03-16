#!/bin/bash

# Script to manually push updates to GitHub with uniform messaging
echo "🚀 Starting professional synchronization..."

# Ensure permissions (self-healing)
chmod +x "$0"

# Pull latest changes to avoid conflicts
git pull origin main --rebase || true

# Add all changes
git add .

# Commit with a uniform, professional message
git commit -m "chore: synchronize system documentation and core application logic" || true

# Push to the main branch
git push origin main

echo "✅ Successfully updated GitHub repository!"
