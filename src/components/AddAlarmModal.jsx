import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddAlarmModal({ onClose, onAdd }) {
  const [time, setTime] = useState('08:00');
  const [label, setLabel] = useState('早起闹钟');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ time, label, repeat: '工作日', ttsEnabled: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">新建闹钟</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">响铃时间</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xl font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">闹钟标签</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition"
          >
            保存闹钟
          </button>
        </form>
      </div>
    </div>
  );
}
