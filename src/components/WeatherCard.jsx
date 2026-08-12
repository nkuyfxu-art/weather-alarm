import React from 'react';
import { Cloud, AlertTriangle, CloudOff } from 'lucide-react';
import { mockWeatherData } from '../mock/weatherData';

export default function WeatherCard({ networkMode }) {
  if (networkMode === 'C') {
    return (
      <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/60 flex items-center justify-between text-slate-400">
        <div className="flex items-center space-x-3">
          <CloudOff className="w-6 h-6 text-slate-500" />
          <div>
            <div className="text-sm font-semibold text-slate-300">网络未连接</div>
            <div className="text-xs text-slate-500">无法获取实时天气数据，已降级为基础闹钟模式</div>
          </div>
        </div>
        <span className="px-2.5 py-1 text-xs rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          模式 C
        </span>
      </div>
    );
  }

  const isModeA = networkMode === 'A';
  const data = isModeA ? mockWeatherData.modeA : mockWeatherData.modeB;

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-3xl border border-slate-800/80 shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-slate-200">{data.location.cityName}</span>
          {!isModeA && (
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md">
              缓存数据
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400">{data.current.conditionText}</span>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline space-x-2">
          <span className="text-5xl font-extrabold text-white">{data.current.temp}°</span>
          <span className="text-sm text-slate-400">
            {data.todayOverview.tempMin}° / {data.todayOverview.tempMax}°
          </span>
        </div>
        <div className="text-right text-xs text-slate-400 space-y-0.5">
          <div>降水概率: <span className="text-blue-400 font-semibold">{data.todayOverview.pop}%</span></div>
          {isModeA && <div>空气质量: <span className="text-emerald-400 font-semibold">{data.current.aqi} ({data.current.aqiLevel})</span></div>}
        </div>
      </div>

      {isModeA && (
        <div className="pt-3 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="bg-slate-800/30 p-2.5 rounded-xl border border-slate-800">
            💡 {data.todayOverview.dressingAdvice}
          </div>
          <div className="bg-slate-800/30 p-2.5 rounded-xl border border-slate-800">
            ☔ {data.todayOverview.umbrellaAdvice}
          </div>
        </div>
      )}

      {isModeA && data.alerts && data.alerts.length > 0 && (
        <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs">
          <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold">{data.alerts[0].title}:</span>
          <span className="truncate">{data.alerts[0].description}</span>
        </div>
      )}
    </div>
  );
}
