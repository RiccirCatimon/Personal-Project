#!/bin/bash

# Script to manually push updates to GitHub
echo "🚀 Starting manual push to GitHub..."

# Add all changes
git add .

# Commit with a descriptive message
# We use || true to prevent the script from stopping if there are no changes to commit
git commit -m "chore: update documentation and apply deployment fixes" || true

# Push to the current branch and set it as upstream to fix the error you saw
git push --set-upstream origin main

echo "✅ Successfully pushed to GitHub!"
