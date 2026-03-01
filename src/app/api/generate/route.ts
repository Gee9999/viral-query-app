import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { seed, category, platform } = await request.json();

    if (!seed) {
      return NextResponse.json({ error: 'Seed required' }, { status: 400 });
    }

    // Generate queries
    const queries = [
      { query: `#TikTokMadeMeBuyIt ${seed} 2025`, platform: 'TikTok' },
      { query: `viral ${seed} trending now`, platform: 'TikTok' },
      { query: `${seed} amazon finds under $30`, platform: 'Amazon' },
      { query: `best ${seed} 2025 reviews`, platform: 'Amazon' },
      { query: `cheap ${seed} that actually works`, platform: 'Google' },
      { query: `${seed} vs expensive alternative`, platform: 'Google' },
      { query: `${seed} must have`, platform: 'TikTok' },
      { query: `where to buy ${seed} cheap`, platform: 'Google' },
    ];

    return NextResponse.json({ queries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
