'use client';

import { useState } from 'react';

interface Query {
  query: string;
  platform: string;
}

export default function Home() {
  const [seed, setSeed] = useState('');
  const [category, setCategory] = useState('gadgets');
  const [platform, setPlatform] = useState('all');
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generateQueries = async () => {
    if (!seed.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed, category, platform }),
      });
      
      const data = await response.json();
      setQueries(data.queries || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const copyToClipboard = (query: string, index: number) => {
    navigator.clipboard.writeText(query);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const searchOnPlatform = (query: string, platform: string) => {
    const encoded = encodeURIComponent(query);
    let url = '';
    
    switch (platform.toLowerCase()) {
      case 'tiktok':
        url = `https://www.tiktok.com/search?q=${encoded}`;
        break;
      case 'amazon':
        url = `https://www.amazon.com/s?k=${encoded}`;
        break;
      case 'google':
        url = `https://www.google.com/search?q=${encoded}`;
        break;
      default:
        url = `https://www.google.com/search?q=${encoded}`;
    }
    
    window.open(url, '_blank');
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tiktok':
        return '🎵';
      case 'amazon':
        return '📦';
      case 'google':
        return '🔍';
      default:
        return '💡';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Viral Query Generator
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover viral products before they peak. Enter any product idea and get 
            optimized search queries for TikTok, Amazon, and Google.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Seed Input */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Product Seed
              </label>
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="e.g., kitchen gadget, phone stand"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                onKeyPress={(e) => e.key === 'Enter' && generateQueries()}
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="gadgets" className="bg-gray-800">🔧 Gadgets</option>
                <option value="home" className="bg-gray-800">🏠 Home & Kitchen</option>
                <option value="beauty" className="bg-gray-800">💄 Beauty</option>
                <option value="fitness" className="bg-gray-800">💪 Fitness</option>
                <option value="toys" className="bg-gray-800">🧸 Toys</option>
                <option value="pets" className="bg-gray-800">🐾 Pets</option>
                <option value="electronics" className="bg-gray-800">📱 Electronics</option>
              </select>
            </div>

            {/* Platform Select */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Platform Focus
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="all" className="bg-gray-800">🌐 All Platforms</option>
                <option value="TikTok" className="bg-gray-800">🎵 TikTok</option>
                <option value="Amazon" className="bg-gray-800">📦 Amazon</option>
                <option value="Google" className="bg-gray-800">🔍 Google</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateQueries}
            disabled={loading || !seed.trim()}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              '✨ Generate Viral Queries'
            )}
          </button>
        </div>

        {/* Results Section */}
        {queries.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-2">🎯</span>
              Generated Search Queries
              <span className="ml-auto text-sm font-normal text-gray-400">
                {queries.length} results
              </span>
            </h2>

            <div className="space-y-3">
              {queries.map((query, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors"
                >
                  <span className="text-2xl">{getPlatformIcon(query.platform)}</span>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{query.query}</p>
                    <p className="text-xs text-gray-400 capitalize">{query.platform}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(query.query, index)}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied === index ? '✅ Copied!' : '📋'}
                    </button>
                    
                    <button
                      onClick={() => searchOnPlatform(query.query, query.platform)}
                      className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-sm transition-colors"
                      title={`Search on ${query.platform}`}
                    >
                      🔍 Search
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h3 className="font-semibold text-yellow-300 mb-2">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Click "Search" to open the query directly on the platform</li>
                <li>• Filter results by "This week" on TikTok for latest trends</li>
                <li>• Look for products with 100k+ views and high engagement</li>
                <li>• Check comments for "where to buy" = purchase intent</li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built for Proto Trading • Find viral products before they peak</p>
        </footer>
      </div>
    </main>
  );
}
