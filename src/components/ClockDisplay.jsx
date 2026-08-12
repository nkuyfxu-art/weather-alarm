import React, { useState, useEffect } from 'react';

export default function ClockDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('zh-CN', { hour12: false });
  const dateString = time.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-slate-900/40 rounded-3xl border border-slate-800/60 backdrop-blur-sm">
      <div className="text-6xl md:text-7xl font-extrabold tracking-tight font-mono text-slate-100">
        {timeString}
      </div>
      <div className="mt-2 text-sm md:text-base font-medium text-slate-400">
        {dateString}
      </div>
    </div>
  );
}
