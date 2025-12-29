
import React from 'react';
import { GroundingChunk } from '../types';

interface SourceLinksProps {
  sources: GroundingChunk[];
}

export const SourceLinks: React.FC<SourceLinksProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-20 relative">
      <div className="flex items-center gap-4 mb-8">
        <h4 className="mono text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Official Data Repositories</h4>
        <div className="h-px flex-grow bg-white/10"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sources.map((source, index) => (
          source.web && (
            <a
              key={index}
              href={source.web.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-lg border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="mono text-[7px] px-1 py-0.5 rounded bg-green-500/10 text-green-400 uppercase font-bold">Encrypted Link</span>
                <svg className="w-3 h-3 text-white/20 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-[11px] font-bold text-white/60 group-hover:text-white transition-colors leading-tight truncate">
                {source.web.title}
              </p>
              <p className="mono text-[8px] text-white/20 truncate mt-2">{source.web.uri}</p>
            </a>
          )
        ))}
      </div>
      
      {/* Verification Protocol Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-xl border border-white/5">
          <div className="text-green-400 text-sm mb-2 font-black mono uppercase">01. DoD Cross-Check</div>
          <p className="mono text-[9px] text-white/30 leading-relaxed uppercase">Verifikasi otomatis melalui Department of Defense Manpower Data Center (DMDC).</p>
        </div>
        <div className="glass p-4 rounded-xl border border-white/5">
          <div className="text-green-400 text-sm mb-2 font-black mono uppercase">02. Valor Registry</div>
          <p className="mono text-[9px] text-white/30 leading-relaxed uppercase">Sinkronisasi data dengan Military Times Hall of Valor untuk record medali tertinggi.</p>
        </div>
        <div className="glass p-4 rounded-xl border border-white/5">
          <div className="text-green-400 text-sm mb-2 font-black mono uppercase">03. NARA Access</div>
          <p className="mono text-[9px] text-white/30 leading-relaxed uppercase">Pencarian record arsip nasional untuk identitas militer yang dideklasifikasi.</p>
        </div>
      </div>
    </div>
  );
};
