import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Minimize2 } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  enabled: boolean;
  onToggleFrame: () => void;
  appName?: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  enabled,
  onToggleFrame,
}) => {
  const [time, setTime] = useState("");
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On real mobile screens or if phone frame is disabled, render clean responsive web layout for PC/Mobile
  if (!enabled || isMobileScreen) {
    return (
      <div className="w-full min-h-screen bg-zinc-100/70 text-zinc-900 font-sans flex flex-col items-center py-0 md:py-6 px-0 md:px-6 transition-all">
        <div className="w-full max-w-5xl min-h-screen md:min-h-[92vh] bg-white md:border border-zinc-200/90 md:rounded-3xl shadow-sm flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-4 px-2 sm:px-6 flex flex-col items-center justify-center font-sans">
      {/* Outer Phone Shell */}
      <div className="relative w-full max-w-[420px] h-[850px] bg-white border-[8px] border-zinc-800 rounded-[48px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/20">
        
        {/* Android Top Notch / Camera Cutout */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-50 flex items-center justify-center gap-2 border-b border-zinc-800">
          <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
        </div>

        {/* Status Bar */}
        <div className="w-full h-8 bg-white/95 backdrop-blur-md text-zinc-800 text-xs px-6 pt-1 flex items-center justify-between select-none z-40 border-b border-zinc-100">
          <span className="font-bold text-zinc-900 tracking-wide text-[11px]">
            {time || "10:42"}
          </span>
          <div className="flex items-center gap-2 text-[11px] text-zinc-600 font-medium">
            <Signal className="w-3 h-3 text-zinc-700" />
            <Wifi className="w-3 h-3 text-zinc-700" />
            <div className="flex items-center gap-1">
              <span className="text-[10px]">85%</span>
              <BatteryMedium className="w-3.5 h-3.5 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Android App Viewport */}
        <div className="flex-1 w-full bg-zinc-50 overflow-y-auto overflow-x-hidden flex flex-col relative scrollbar-thin scrollbar-thumb-zinc-300">
          {children}
        </div>

        {/* Android Navigation Bar / Bottom Gesture Line */}
        <div className="w-full h-7 bg-white flex items-center justify-center z-40 select-none border-t border-zinc-100">
          <div className="w-28 h-1 bg-zinc-300 rounded-full" />
        </div>
      </div>

      {/* Frame Controls Info */}
      <div className="mt-3 flex items-center gap-3 text-xs text-zinc-300 bg-zinc-800/90 px-4 py-2 rounded-full border border-zinc-700/80">
        <Smartphone className="w-4 h-4 text-indigo-400" />
        <span>Vista Modo Android activa</span>
        <button
          onClick={onToggleFrame}
          className="ml-2 text-indigo-300 hover:text-white font-medium underline flex items-center gap-1 cursor-pointer"
        >
          <Minimize2 className="w-3 h-3" />
          Ver en pantalla completa
        </button>
      </div>
    </div>
  );
};

