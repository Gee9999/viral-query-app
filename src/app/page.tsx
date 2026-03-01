'use client';

import { useState } from 'react';

export default function Home() {
  const [seed, setSeed] = useState('');
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQueries = async () => {
    if (!seed.trim()) return;
    setLoading(true);
    
    // Simple fallback queries
    const newQueries = [
      { query: `#TikTokMadeMeBuyIt ${seed} 2025`, platform: 'TikTok' },
      { query: `viral ${seed} trending`, platform: 'TikTok' },
      { query: `${seed} amazon finds`, platform: 'Amazon' },
      { query: `best ${seed} 2025`, platform: 'Amazon' },
      { query: `cheap ${seed} that works`, platform: 'Google' },
      { query: `${seed} vs alternative`, platform: 'Google' },
    ];
    
    setQueries(newQueries);
    setLoading(false);
  };

  const copyQuery = (query) => {
    navigator.clipboard.writeText(query);
    alert('Copied!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Viral Query Generator</h1>
        <p className="text-gray-400 mb-8">Find trending products before they peak</p>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Enter product (e.g., kitchen gadget)"
            className="w-full px-4 py-3 bg-gray-700 rounded text-white mb-4"
          />
          <button
            onClick={generateQueries}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Queries'}
          </button>
        </div>

        {queries.length > 0 && (
          <div className="space-y-2">
            {queries.map((q, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-medium">{q.query}</p>
                  <p className="text-sm text-gray-400">{q.platform}</p>
                </div>
                <button
                  onClick={() => copyQuery(q.query)}
                  className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// Sun Mar  1 22:16:03 UTC 2026
