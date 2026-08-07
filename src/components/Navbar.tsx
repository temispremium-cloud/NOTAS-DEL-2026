import React from 'react';
import { 
  Heart, 
  BookOpen, 
  Edit3, 
  Music, 
  VolumeX, 
  Lock, 
  Unlock, 
  Share2, 
  Smartphone, 
  Maximize2,
  Sparkles
} from 'lucide-react';
import { AppSettings } from '../types';

interface NavbarProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onToggleAudio: () => void;
  onOpenPinModal: () => void;
  onOpenExportModal: () => void;
  onOpenAiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onUpdateSettings,
  onToggleAudio,
  onOpenPinModal,
  onOpenExportModal,
  onOpenAiModal
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-30 px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        {/* App Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 shadow-md shadow-indigo-200 flex items-center justify-center text-white">
            <Heart className="w-5 h-5 fill-white/20 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 tracking-tight leading-tight flex items-center gap-1.5">
              <span>Recuerdos & Promesas</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                2020 — 2026
              </span>
            </h1>
            <p className="text-[11px] text-zinc-500 font-medium">Un diario para nosotros • Bitácora de explicaciones</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Ambient Audio Button */}
          <button
            onClick={onToggleAudio}
            title={settings.isAudioPlaying ? "Música de fondo activa (Haz clic para apagar)" : "Activar música suave de fondo"}
            className={`p-2 rounded-xl transition-all border ${
              settings.isAudioPlaying
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm'
                : 'bg-zinc-100/80 border-zinc-200/80 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            {settings.isAudioPlaying ? <Music className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* AI Helper (Only visible in Editor Mode) */}
          {settings.activeMode === 'editor' && (
            <button
              onClick={onOpenAiModal}
              title="Asistente de IA para redacción empática"
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1.5 text-xs shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Asistente IA</span>
            </button>
          )}

          {/* Export / Share Button */}
          <button
            onClick={onOpenExportModal}
            title="Exportar historia completa"
            className="p-2 rounded-xl bg-zinc-100/80 border border-zinc-200/80 text-zinc-700 hover:bg-zinc-200 transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* PIN Lock status */}
          <button
            onClick={onOpenPinModal}
            title={settings.isUnlocked ? "Diario Desbloqueado (Clic para bloquear)" : "Diario Protegido con PIN"}
            className={`p-2 rounded-xl border transition-all ${
              settings.isUnlocked
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            {settings.isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>

          {/* Android Frame Switch */}
          <button
            onClick={() => onUpdateSettings({ androidFrameVisible: !settings.androidFrameVisible })}
            title={settings.androidFrameVisible ? "Ver en pantalla completa" : "Ver en marco estilo Android"}
            className="p-2 rounded-xl bg-zinc-100/80 border border-zinc-200/80 text-zinc-700 hover:bg-zinc-200 transition-all hidden sm:flex"
          >
            {settings.androidFrameVisible ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode Switch Bar */}
      <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
        <div className="flex bg-zinc-100 p-0.5 rounded-xl border border-zinc-200/80 w-full max-w-xs">
          <button
            onClick={() => onUpdateSettings({ activeMode: 'reader' })}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              settings.activeMode === 'reader'
                ? 'bg-white text-indigo-700 shadow-xs border border-zinc-200/80'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Modo Lectura</span>
          </button>
          <button
            onClick={() => onUpdateSettings({ activeMode: 'editor' })}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              settings.activeMode === 'editor'
                ? 'bg-white text-indigo-700 shadow-xs border border-zinc-200/80'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modo Autor</span>
          </button>
        </div>

        <span className="text-[11px] text-zinc-500 hidden sm:inline font-medium">
          {settings.activeMode === 'reader' 
            ? "📖 Lectura fluida con diseño Sleek Interface"
            : "✏️ Edición y personalización de notas"}
        </span>
      </div>
    </header>
  );
};

