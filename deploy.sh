#!/bin/bash

echo "🚀 Viral Query Generator - Quick Deploy Script"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git initialized"
    echo ""
fi

echo "📋 Next steps to deploy:"
echo ""
echo "1. Create a GitHub repository:"
echo "   https://github.com/new"
echo "   Name it: viral-query-generator"
echo ""
echo "2. Connect and push:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/viral-query-generator.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   https://vercel.com/new"
echo "   - Import your GitHub repo"
echo "   - Add GROQ_API_KEY environment variable"
echo "   - Click Deploy"
echo ""
echo "4. Get your free Groq API key:"
echo "   https://console.groq.com"
echo ""
echo "📖 Full instructions in DEPLOY.md"
echo ""
