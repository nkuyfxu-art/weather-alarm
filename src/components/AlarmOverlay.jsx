import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { mockWeatherData } from '../mock/weatherData';

export default function AlarmOverlay({ networkMode, onClose }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getTTSScript = () => {
    if (networkMode === 'A') {
      const data = mockWeatherData.modeA;
      return `早上好！今天是 8 月 12 日星期三。当前新加坡天气${data.current.conditionText}，温度 ${data.current.temp} 度，预计今天最高 ${data.todayOverview.tempMax} 度。降水概率 ${data.todayOverview.pop}%，出门记得带伞哦。`;
    } else if (networkMode === 'B') {
      const data = mockWeatherData.modeB;
      return `早上好！今天是 8 月 12 日星期三。根据稍早前的天气预测，今天新加坡最高 ${data.todayOverview.tempMax} 度，天气多云。祝您拥有愉快的一天！`;
    } else {
      return `早上好！今天是 8 月 12 日星期三，现在是早上 7 点整。该起床啦，祝您拥有愉快的一天！`;
    }
  };

  const speakWeather = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text = getTTSScript();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => speakWeather(), 500);
    return () => {
      clearTimeout(timer);
      stopSpeech();
    };
  }, [networkMode]);

  const handleDismiss = () => {
    stopSpeech();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-6 md:p-12 text-white animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-xs font-semibold text-blue-400">闹钟响铃中</span>
        </div>
        <span className="text-xs text-slate-500">模式 {networkMode} 驱动</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center space-y-6 my-auto">
        <div className="text-7xl md:text-9xl font-black font-mono tracking-tighter text-blue-400 animate-pulse-fast">
          07:00
        </div>

        <div className="max-w-md w-full bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-3">
          {networkMode === 'A' && (
            <>
              <div className="text-xl font-bold text-slate-100">⛅ 多云 28°C</div>
              <div className="text-sm text-slate-300">最高 32°C / 最低 26°C │ 降水概率 60%</div>
              <div className="text-xs text-blue-300 bg-blue-900/30 p-2.5 rounded-xl border border-blue-800/40">
                💡 天气较热，建议穿短袖，出门记得带伞。
              </div>
            </>
          )}

          {networkMode === 'B' && (
            <>
              <div className="text-lg font-bold text-amber-400">⛅ 多云 (离线预测)</div>
              <div className="text-sm text-slate-300">预计最高温度 32°C</div>
            </>
          )}

          {networkMode === 'C' && (
            <div className="text-sm text-slate-400 py-2">
              ⚠️ 当前处于无网降级模式，已关闭天气播报。
            </div>
          )}
        </div>

        <button
          onClick={isSpeaking ? stopSpeech : speakWeather}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition"
        >
          {isSpeaking ? (
            <>
              <Volume2 className="w-4 h-4 text-blue-400 animate-bounce" />
              <span>正在语音播报... (点击暂停)</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>重新播放天气播报</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-md w-full mx-auto space-y-3">
        <button
          onClick={handleDismiss}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-2xl transition border border-slate-700"
        >
          进入贪睡模式 (5分钟后再次响起)
        </button>

        <button
          onClick={handleDismiss}
          className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-rose-600/30 transition transform active:scale-95"
        >
          关闭闹钟
        </button>
      </div>
    </div>
  );
}
