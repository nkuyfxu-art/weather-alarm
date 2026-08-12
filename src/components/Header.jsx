import React from 'react';
import { Cloud, Wifi, WifiOff, Database } from 'lucide-react';

export default function Header({ networkMode, setNetworkMode }) {
  const modes = [
    { id: 'A', name: '模式 A (全功能在线)', icon: Wifi, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'B', name: '模式 B (离线缓存)', icon: Database, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'C', name: '模式 C (无网保底)', icon: WifiOff, color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  ];

  return (
    <header className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-slate-800 gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
          <Cloud className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            天气闹钟
          </h1>
          <p className="text-xs text-slate-400">Weather Alarm Clock Platform</p>
        </div>
      </div>

      <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 space-x-1">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = networkMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setNetworkMode(mode.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? `${mode.color} border shadow-sm`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.name}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
