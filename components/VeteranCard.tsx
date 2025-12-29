
import React from 'react';
import { VeteranData } from '../types';

interface VeteranCardProps {
  veterans: VeteranData[];
}

export const VeteranDisplay: React.FC<VeteranCardProps> = ({ veterans }) => {
  if (!veterans || veterans.length === 0) return null;

  return (
    <div className="space-y-6">
      {veterans.map((v, idx) => {
        const isLiving = v.dod.toLowerCase().includes('hidup') || v.dod.toLowerCase().includes('living');
        
        return (
          <div key={idx} className="relative group animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className={`absolute -inset-0.5 rounded-xl opacity-5 group-hover:opacity-15 transition duration-500 blur-md ${isLiving ? 'bg-cyan-500' : 'bg-red-600'}`}></div>
            
            <div className="relative glass rounded-xl overflow-hidden border border-white/10">
              {/* Compact Header with Source Badge */}
              <div className="flex flex-col md:flex-row border-b border-white/5 bg-white/[0.01]">
                <div className={`p-3 flex items-center justify-center md:border-r border-white/5 w-full md:w-14 ${isLiving ? 'bg-cyan-500/10' : 'bg-red-900/10'}`}>
                  <span className={`mono text-lg font-bold ${isLiving ? 'text-cyan-400' : 'text-red-500'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex-grow p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-bold tracking-tight text-white uppercase">{v.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-tighter ${isLiving ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}>
                        {isLiving ? '● ACTIVE' : '● DECEASED'}
                      </span>
                      {v.sourceOrigin && (
                        <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-[4px]">
                          <svg className="w-2 h-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="mono text-[7px] text-white/40 uppercase font-bold">{v.sourceOrigin}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:text-right">
                    <div className="text-white/70 text-xs font-bold tracking-wide">{v.rankBranch}</div>
                  </div>
                </div>
              </div>

              {/* Ultra Compact Data Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/5">
                <DataPoint label="Born" value={v.dob} />
                <DataPoint label="Status" value={v.dod} highlight={isLiving ? 'text-cyan-400' : 'text-red-500'} />
                <DataPoint label="Comm" value={v.telephone} isLink />
                <DataPoint label="Primary Source" value={v.sourceOrigin} highlight="text-green-400/80" />
              </div>

              {/* Bio Section */}
              <div className="p-4 bg-black/10">
                <p className="text-slate-400 leading-relaxed text-xs font-light italic">
                  "{v.biography}"
                </p>
                
                {v.serviceHighlights && v.serviceHighlights.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {v.serviceHighlights.map((point, pIdx) => (
                      <span key={pIdx} className="mono text-[8px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/50">
                        {point}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DataPoint = ({ label, value, className = "", highlight = "text-white/80", isLink = false }: any) => {
  if (!value || value === "N/A" || value === "") return null;
  return (
    <div className={`p-2.5 border-r border-b border-white/5 last:border-r-0 ${className}`}>
      <div className="mono text-[7px] text-white/20 uppercase tracking-widest mb-0.5 font-bold">{label}</div>
      <div className={`text-[10px] font-medium tracking-tight truncate ${highlight}`}>
        {isLink ? (
          <a href={`tel:${value}`} className="hover:text-cyan-400 transition-colors">
            {value}
          </a>
        ) : value}
      </div>
    </div>
  );
};
