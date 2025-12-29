
import React, { useState, useEffect } from 'react';
import { searchVeterans } from './services/geminiService';
import { SearchResult } from './types';
import { VeteranDisplay } from './components/VeteranCard';
import { SourceLinks } from './components/SourceLinks';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickQueries = [
    "Penerima Medal of Honor Hidup",
    "Veteran WW2 Centenarian",
    "POW Vietnam Masih Hidup",
    "Veteran Wanita Ternama"
  ];

  const handleSearch = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = customQuery || query;
    if (customQuery) setQuery(customQuery);
    
    setLoading(true);
    setError(null);
    try {
      const data = await searchVeterans(finalQuery);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Gagal menghubungkan ke satelit data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(undefined, "Daftar 3 veteran AS terkemuka yang masih hidup (Living Veterans)");
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30">
      {/* Top Ticker */}
      <div className="bg-red-600/10 border-b border-red-600/20 text-red-500 text-[9px] py-1 mono font-bold text-center uppercase tracking-[0.4em] overflow-hidden whitespace-nowrap">
        <span className="animate-pulse">●</span> SECURE INTEL FEED ACTIVE // ENCRYPTION AES-256 // CONNECTION STABLE
      </div>

      <header className="relative py-12 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="relative">
                <div className="w-14 h-14 glass border-red-600/30 rounded-xl flex items-center justify-center relative border shadow-2xl group-hover:scale-105 transition-all">
                  <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                  </svg>
                </div>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                VET<span className="text-red-600">INTEL</span>
              </h1>
              <p className="mono text-white/30 text-[8px] tracking-[0.2em] uppercase mt-1">Veteran Surveillance Archive</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-lg w-full">
            <form onSubmit={(e) => handleSearch(e)} className="relative group">
              <input
                type="text"
                placeholder="INPUT COMMAND..."
                className="relative w-full glass border-white/10 rounded-xl py-3.5 px-12 focus:outline-none focus:border-cyan-500/50 transition-all text-white font-bold mono text-xs placeholder:text-white/10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg mono text-[9px] font-black text-white uppercase tracking-widest transition-all"
              >
                {loading ? '...' : 'EXEC'}
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
              {quickQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSearch(undefined, q)}
                  className="mono text-[7px] font-bold glass text-white/30 hover:text-cyan-400 px-2 py-1 rounded border border-white/5 hover:border-cyan-500/30 transition-all uppercase tracking-tight"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full py-8 px-6">
        {loading ? (
          <div className="text-center py-32">
            <div className="w-16 h-16 border-2 border-white/5 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
            <h3 className="mono text-white/40 font-bold uppercase tracking-[0.3em] text-xs mt-8 animate-pulse">Scanning Nodes...</h3>
          </div>
        ) : error ? (
          <div className="glass border-red-500/20 p-10 rounded-3xl max-w-md mx-auto text-center">
            <h3 className="font-bold text-xl text-white mb-2 uppercase">Link Failure</h3>
            <p className="text-white/30 mono text-[10px] mb-6">{error}</p>
            <button onClick={() => handleSearch()} className="bg-red-600 text-white px-6 py-2 rounded-lg mono font-black text-[10px] uppercase tracking-widest">Retry</button>
          </div>
        ) : result ? (
          <div className="space-y-12">
            <div className="flex items-end justify-between border-b border-white/5 pb-6">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Report</h2>
                <p className="mono text-white/20 text-[9px] uppercase mt-1">{result.veterans.length} Decrypted Entries</p>
              </div>
              <div className="hidden sm:flex gap-3">
                <StatusNode label="Network" status="STABLE" color="text-cyan-400" />
              </div>
            </div>
            
            <VeteranDisplay veterans={result.veterans} />
            <SourceLinks sources={result.sources} />
          </div>
        ) : null}
      </main>

      <footer className="glass border-t border-white/5 py-12 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mono text-[8px] text-white/10 font-bold uppercase tracking-[0.3em]">
          <span>VETINTEL UNIT // 2025</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Uplink Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatusNode = ({ label, status, color }: any) => (
  <div className="glass px-4 py-1.5 rounded-lg border border-white/5">
    <p className="mono text-[7px] text-white/20 uppercase tracking-tighter">{label}</p>
    <p className={`mono text-[9px] font-black ${color}`}>{status}</p>
  </div>
);

export default App;
