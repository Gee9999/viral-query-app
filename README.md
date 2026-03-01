# Viral Query Generator

Generate optimized search queries to find viral products on TikTok and Amazon.

## Features

- 🎯 AI-powered query expansion
- 📱 Platform-specific optimizations (TikTok, Amazon, Google)
- 🔥 Trending patterns built-in
- 📋 One-click copy to clipboard
- 🎨 Clean, modern UI

## How to Use

1. Enter a product seed term (e.g., "kitchen gadget", "phone stand")
2. Select product category
3. Get 10+ optimized search queries
4. Click to copy and search on your platform of choice

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variable:
   - `GROQ_API_KEY` - Your Groq API key
4. Deploy!

### Local Development

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Get your API key at: https://console.groq.com

## License

MIT
// Redeploy Sun Mar  1 22:17:56 UTC 2026
