'use client';

import { useState } from 'react';

interface Query {
  query: string;
  platform: string;
}

const categories = [
  { value: 'gadgets', label: 'Gadgets', icon: '🔧' },
  { value: 'home', label: 'Home & Kitchen', icon: '🏠' },
  { value: 'beauty', label: 'Beauty', icon: '💄' },
  { value: 'fitness', label: 'Fitness', icon: '💪' },
  { value: 'toys', label: 'Toys', icon: '🧸' },
  { value: 'pets', label: 'Pets', icon: '🐾' },
  { value: 'electronics', label: 'Electronics', icon: '📱' },
];

const platforms = [
  { value: 'all', label: 'All Platforms', icon: '🌐' },
  { value: 'TikTok', label: 'TikTok', icon: '🎵' },
  { value: 'Amazon', label: 'Amazon', icon: '📦' },
  { value: 'Google', label: 'Google', icon: '🔍' },
];

export default function Home() {
  const [seed, setSeed] = useState('');
  const [category, setCategory] = useState('gadgets');
  const [platform, setPlatform] = useState('all');
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState('');

  const generateQueries = async () => {
    if (!seed.trim()) {
      setError('Please enter a product idea');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed, category, platform }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate queries');
      }
      
      const data = await response.json();
      setQueries(data.queries || []);
      
      if (data.queries?.length === 0) {
        setError('No queries generated. Try a different product idea.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    }
    
    setLoading(false);
  };

  const copyToClipboard = async (query: string, index: number) => {
    try {
      await navigator.clipboard.writeText(query);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const searchOnPlatform = (query: string, platform: string) => {
    const encoded = encodeURIComponent(query);
    const urls: Record<string, string> = {
      tiktok: `https://www.tiktok.com/search?q=${encoded}`,
      amazon: `https://www.amazon.com/s?k=${encoded}`,
      google: `https://www.google.com/search?q=${encoded}`,
    };
    
    const url = urls[platform.toLowerCase()] || urls.google;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tiktok':
        return 'from-pink-500 to-rose-500';
      case 'amazon':
        return 'from-orange-400 to-amber-500';
      case 'google':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-violet-500 to-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl">
                🔥
              </div>
              <h1 className="text-2xl font-bold text-white">Viral Query Generator</h1>
            </div>
            <span className="text-slate-400 text-sm hidden sm:block">Find trending products</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Discover Viral Products
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Enter any product idea and get optimized search queries for TikTok, Amazon, and Google. 
            Spot trends before they peak.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl shadow-black/20 overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            {/* Product Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What product are you looking for?
              </label>
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="e.g., portable blender, phone stand, kitchen gadget..."
                className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                onKeyDown={(e) => e.key === 'Enter' && generateQueries()}
              />
            </div>

            {/* Category & Platform */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Platform
                </label>
                <div className="relative">
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer"
                  >
                    {platforms.map((plat) => (
                      <option key={plat.value} value={plat.value}>
                        {plat.icon} {plat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateQueries}
              disabled={loading || !seed.trim()}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate Queries</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {queries.length > 0 && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl shadow-black/20 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Generated Search Queries
                </h3>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-400">
                  {queries.length} results
                </span>
              </div>

              <div className="space-y-3">
                {queries.map((query, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200"
                  >
                    {/* Platform Badge */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${getPlatformColor(query.platform)} flex items-center justify-center text-lg`}>
                      {query.platform.toLowerCase() === 'tiktok' && '🎵'}
                      {query.platform.toLowerCase() === 'amazon' && '📦'}
                      {query.platform.toLowerCase() === 'google' && '🔍'}
                      {!['tiktok', 'amazon', 'google'].includes(query.platform.toLowerCase()) && '💡'}
                    </div>

                    {/* Query Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate group-hover:text-violet-400 transition-colors">
                        {query.query}
                      </p>
                      <p className="text-xs text-slate-500 capitalize mt-0.5">
                        {query.platform}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(query.query, index)}
                        className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === index ? '✓ Copied' : '📋 Copy'}
                      </button>
                      
                      <button
                        onClick={() => searchOnPlatform(query.query, query.platform)}
                        className="px-3 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all duration-200"
                        title={`Search on ${query.platform}`}
                      >
                        🔍 Search
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                <h4 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                  💡 Pro Tips
                </h4>
                <ul className="text-sm text-slate-400 space-y-1.5">
                  <li>• Click "Search" to open directly on the platform</li>
                  <li>• Filter TikTok by "This week" for latest trends</li>
                  <li>• Look for products with 100k+ views and high engagement</li>
                  <li>• Comments saying "where to buy" = high purchase intent</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            Built for Proto Trading • Find viral products before they peak 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}
