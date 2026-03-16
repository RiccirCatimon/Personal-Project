#!/bin/bash

# Script to manually push updates to GitHub with uniform messaging
echo "🚀 Starting professional synchronization..."

# Ensure permissions (self-healing)
chmod +x "$0"

# Add all changes
git add .

# Commit with a uniform, professional message
git commit -m "chore: synchronize system documentation and core application logic" || true

# Push to the current branch and set upstream if needed
git push --set-upstream origin main

echo "✅ Successfully updated GitHub repository!"
