# Deployment Guide: Viral Query Generator

## Quick Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub

1. Create a new repository on GitHub (e.g., `viral-query-generator`)
2. Initialize git and push:

```bash
cd /root/.openclaw-dev/projects/viral-query-generator
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/viral-query-generator.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your `viral-query-generator` repository
5. Add Environment Variable:
   - Name: `GROQ_API_KEY`
   - Value: [Your Groq API key from https://console.groq.com]
6. Click "Deploy"

### Step 3: Done!

Your app will be live at: `https://viral-query-generator-YOUR_USERNAME.vercel.app`

Share this link with anyone!

---

## Get Your Groq API Key (Free)

1. Go to https://console.groq.com
2. Sign up (free account)
3. Create a new API key
4. Copy the key and add it to Vercel environment variables

Free tier includes:
- 1,000,000 tokens/month
- More than enough for this app

---

## Alternative: Deploy to Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist` or `.next`
7. Add environment variable `GROQ_API_KEY`
8. Deploy

---

## Testing Locally

```bash
# Install dependencies
npm install

# Add your API key to .env.local
echo "GROQ_API_KEY=your_key_here" > .env.local

# Run dev server
npm run dev

# Open http://localhost:3000
```

---

## Troubleshooting

### Build fails on Vercel
- Make sure `next.config.js` exists
- Check that all files are committed to git
- Verify `GROQ_API_KEY` is set in environment variables

### API errors
- Check Groq API key is valid
- Verify API key has credits available
- Check browser console for error messages

### Styling issues
- Ensure `globals.css` imports Tailwind directives
- Check `tailwind.config.js` content paths

---

## Features

✨ AI-powered query generation
🎵 Platform-specific optimization (TikTok, Amazon, Google)
📋 One-click copy to clipboard
🔍 Direct search links
🎨 Beautiful dark gradient UI
📱 Mobile responsive
⚡ Fast performance

---

## Next Steps

After deployment, you can:
1. Share the link with your team
2. Add custom categories
3. Integrate with Google Trends API
4. Add query history/favorites
5. Export results to CSV

---

Built for Proto Trading 🚀
