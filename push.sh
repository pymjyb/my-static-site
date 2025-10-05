#!/bin/bash

# --------------------------------------
# Push latest local project to GitHub
# --------------------------------------

# Step 1: Navigate to the project folder
# (optional if you run the script from the project folder)
cd "$(dirname "$0")" || exit

echo "Starting Git upload..."

# Step 2: Check git status
git status

# Step 3: Stage all changes
git add .

# Step 4: Commit with a timestamped message
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Update project: $TIMESTAMP"

# Step 5: Push to main branch
git push origin main

echo "✅ Project pushed successfully!"
