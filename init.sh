#!/bin/bash

# Must run from the project root directory
echo "🪝 Copying .github/pre-commit to .git/hooks/"
cp .github/pre-commit .git/hooks/pre-commit

echo "📥 Installing Node modules"
npm install

echo "🚀 Starting the app..."
npm start
