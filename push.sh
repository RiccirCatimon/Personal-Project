#!/bin/bash

# Script to manually push updates to GitHub
echo "🚀 Starting manual push to GitHub..."

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "chore: update documentation and apply deployment fixes"

# Push to the current branch (usually main or master)
git push

echo "✅ Successfully pushed to GitHub!"
