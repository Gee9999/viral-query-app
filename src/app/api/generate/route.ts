import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Lazy initialization - only create client when needed
let groq: Groq | null = null;

function getGroqClient() {
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }
    groq = new Groq({ apiKey });
  }
  return groq;
}

export async function POST(request: Request) {
  try {
    const { seed, category, platform } = await request.json();

    if (!seed) {
      return NextResponse.json(
        { error: 'Seed term is required' },
        { status: 400 }
      );
    }

    const prompt = `Generate 10 optimized search queries to find viral ${category || 'products'} related to "${seed}".

Target platform: ${platform || 'TikTok and Amazon'}

Create queries that:
1. Use platform-native language (hashtags for TikTok, descriptive for Amazon)
2. Include emotional triggers and problem-solving angles
3. Add recency indicators (2025, viral, trending)
4. Mix price points and use cases
5. Include comparison and review queries

Format: Return ONLY a JSON array of objects with "query" and "platform" fields.
Example: [{"query": "#TikTokMadeMeBuyIt mini blender 2025", "platform": "TikTok"}, ...]

Make each query unique and specific. Avoid generic terms.`;

    const completion = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert in viral product discovery and search optimization. Generate highly specific, platform-optimized search queries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const queries = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Error generating queries:', error);
    return NextResponse.json(
      { error: 'Failed to generate queries' },
      { status: 500 }
    );
  }
}
