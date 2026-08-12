import React from 'react';
import { Bell, Plus, Volume2, Play } from 'lucide-react';

export default function AlarmList({ alarms, toggleAlarm, onOpenAddModal, onTriggerRing }) {
  return (
    <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/60 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-slate-200">闹钟列表</h2>
        </div>
        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>新建闹钟</span>
        </button>
      </div>

      <div className="space-y-3">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${
              alarm.active
                ? 'bg-slate-800/50 border-slate-700/80'
                : 'bg-slate-900/20 border-slate-800/40 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold font-mono text-white">{alarm.time}</span>
                <span className="text-xs text-slate-400">{alarm.label}</span>
              </div>
              <div className="flex items-center space-x-3 mt-1 text-xs text-slate-400">
                <span>{alarm.repeat}</span>
                {alarm.ttsEnabled && (
                  <span className="flex items-center text-blue-400 space-x-0.5">
                    <Volume2 className="w-3 h-3" />
                    <span>TTS播报</span>
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => toggleAlarm(alarm.id)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                alarm.active ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  alarm.active ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onTriggerRing}
        className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 transition"
      >
        <Play className="w-4 h-4 fill-current" />
        <span>⚡ 立即测试响铃 UI 与 TTS 播报</span>
      </button>
    </div>
  );
}
