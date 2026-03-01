import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Fallback queries if API fails
const getFallbackQueries = (seed: string, category: string, platform: string) => {
  const platforms = platform === 'all' ? ['TikTok', 'Amazon', 'Google'] : [platform];
  
  return [
    { query: `#TikTokMadeMeBuyIt ${seed} 2025`, platform: 'TikTok' },
    { query: `viral ${seed} trending now`, platform: 'TikTok' },
    { query: `${seed} amazon finds under $30`, platform: 'Amazon' },
    { query: `best ${seed} 2025 reviews`, platform: 'Amazon' },
    { query: `cheap ${seed} that actually works`, platform: 'Google' },
    { query: `${seed} vs expensive alternative`, platform: 'Google' },
    { query: `${seed} must have ${category}`, platform: 'TikTok' },
    { query: `where to buy ${seed} cheap`, platform: 'Google' },
    { query: `${seed} unboxing review`, platform: 'TikTok' },
    { query: `${seed} worth it or hype`, platform: 'Amazon' },
  ];
};

export async function POST(request: Request) {
  try {
    const { seed, category, platform } = await request.json();

    if (!seed) {
      return NextResponse.json(
        { error: 'Seed term is required' },
        { status: 400 }
      );
    }

    // Check if API key exists
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn('GROQ_API_KEY not set, using fallback queries');
      return NextResponse.json({ 
        queries: getFallbackQueries(seed, category || 'products', platform || 'all'),
        fallback: true 
      });
    }

    const groq = new Groq({ apiKey });

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

    const completion = await groq.chat.completions.create({
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
    let queries = [];
    
    if (jsonMatch) {
      try {
        queries = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        queries = getFallbackQueries(seed, category || 'products', platform || 'all');
      }
    } else {
      queries = getFallbackQueries(seed, category || 'products', platform || 'all');
    }

    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Error generating queries:', error);
    // Return fallback instead of error
    return NextResponse.json({ 
      queries: getFallbackQueries(seed, 'products', 'all'),
      fallback: true 
    });
  }
}
