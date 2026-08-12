import React, { useState } from 'react';
import Header from './components/Header';
import ClockDisplay from './components/ClockDisplay';
import WeatherCard from './components/WeatherCard';
import AlarmList from './components/AlarmList';
import AddAlarmModal from './components/AddAlarmModal';
import AlarmOverlay from './components/AlarmOverlay';

export default function App() {
  const [networkMode, setNetworkMode] = useState('A');
  const [isRinging, setIsRinging] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00', label: '工作日闹钟', repeat: '工作日', ttsEnabled: true, active: true },
    { id: 2, time: '08:30', label: '周末晨练', repeat: '周末', ttsEnabled: true, active: false }
  ]);

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleAddAlarm = (newAlarm) => {
    setAlarms([...alarms, { ...newAlarm, id: Date.now(), active: true }]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Header networkMode={networkMode} setNetworkMode={setNetworkMode} />
        <ClockDisplay />
        <WeatherCard networkMode={networkMode} />
        <AlarmList
          alarms={alarms}
          toggleAlarm={toggleAlarm}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onTriggerRing={() => setIsRinging(true)}
        />
      </div>

      {isAddModalOpen && (
        <AddAlarmModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddAlarm}
        />
      )}

      {isRinging && (
        <AlarmOverlay
          networkMode={networkMode}
          onClose={() => setIsRinging(false)}
        />
      )}
    </div>
  );
}
