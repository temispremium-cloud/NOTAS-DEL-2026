import React, { useState, useEffect } from 'react';
import { YearNumber, YearOverview, NoteItem, AppSettings } from './types';
import { INITIAL_YEARS_OVERVIEW, INITIAL_NOTES } from './data/initialYearsData';
import { ambientSound } from './utils/audioSynthesizer';
import { AndroidFrame } from './components/AndroidFrame';
import { Navbar } from './components/Navbar';
import { TimelineHeader } from './components/TimelineHeader';
import { YearView } from './components/YearView';
import { NoteEditorModal } from './components/NoteEditorModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { PinLockModal } from './components/PinLockModal';
import { ExportModal } from './components/ExportModal';
import { FinalCarta2026 } from './components/FinalCarta2026';
import { Lock, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<YearNumber>(2020);

  // Persistent Years Overview
  const [yearsOverview, setYearsOverview] = useState<YearOverview[]>(() => {
    try {
      const stored = localStorage.getItem('saved_years_overview');
      return stored ? JSON.parse(stored) : INITIAL_YEARS_OVERVIEW;
    } catch {
      return INITIAL_YEARS_OVERVIEW;
    }
  });

  // Persistent Notes
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const stored = localStorage.getItem('saved_notes_2020_2026');
      return stored ? JSON.parse(stored) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  // Persistent Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem('app_settings_2020_2026');
      return stored
        ? JSON.parse(stored)
        : {
            pinCode: '1234',
            isPinRequired: false,
            isUnlocked: true,
            activeMode: 'reader',
            androidFrameVisible: true,
            bgTheme: 'rose',
            isAudioPlaying: false,
            volume: 0.8
          };
    } catch {
      return {
        pinCode: '1234',
        isPinRequired: false,
        isUnlocked: true,
        activeMode: 'reader',
        androidFrameVisible: true,
        bgTheme: 'rose',
        isAudioPlaying: false,
        volume: 0.8
      };
    }
  });

  // Modal States
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteItem | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalTopic, setAiModalTopic] = useState('');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCarta2026Open, setIsCarta2026Open] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('saved_notes_2020_2026', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('saved_years_overview', JSON.stringify(yearsOverview));
  }, [yearsOverview]);

  useEffect(() => {
    localStorage.setItem('app_settings_2020_2026', JSON.stringify(settings));
  }, [settings]);

  // Audio ambient toggle
  const handleToggleAudio = () => {
    const playing = ambientSound.toggle();
    setSettings(prev => ({ ...prev, isAudioPlaying: playing }));
  };

  const handleUpdateSettings = (newPartial: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newPartial }));
  };

  // Note CRUD
  const handleOpenNoteEditor = (existingNote?: NoteItem) => {
    setNoteToEdit(existingNote || null);
    setIsNoteEditorOpen(true);
  };

  const handleSaveNote = (savedNote: NoteItem) => {
    setNotes(prev => {
      const exists = prev.some(n => n.id === savedNote.id);
      if (exists) {
        return prev.map(n => (n.id === savedNote.id ? savedNote : n));
      } else {
        return [savedNote, ...prev];
      }
    });
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm('¿Deseas eliminar esta nota de la bitácora?')) {
      setNotes(prev => prev.filter(n => n.id !== noteId));
    }
  };

  const handleOpenAiHelperForNote = (content: string, year: YearNumber) => {
    setAiModalTopic(content);
    setSelectedYear(year);
    setIsAiModalOpen(true);
  };

  const handleApplyGeneratedNote = (gen: {
    year: YearNumber;
    title: string;
    content: string;
    mood: any;
    quote?: string;
  }) => {
    const newNote: NoteItem = {
      id: `ai-note-${Date.now()}`,
      year: gen.year,
      date: `Nota del ${gen.year}`,
      title: gen.title,
      content: gen.content,
      mood: gen.mood,
      quote: gen.quote,
      isImportant: true
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedYear(gen.year);
  };

  const activeOverview =
    yearsOverview.find(y => y.year === selectedYear) || yearsOverview[0];
  const activeYearNotes = notes.filter(n => n.year === selectedYear);
  const carta2026Note = notes.find(n => n.year === 2026 && n.isLetter);

  return (
    <AndroidFrame
      enabled={settings.androidFrameVisible}
      onToggleFrame={() =>
        handleUpdateSettings({ androidFrameVisible: !settings.androidFrameVisible })
      }
    >
      <div className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 font-sans selection:bg-indigo-500 selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onToggleAudio={handleToggleAudio}
          onOpenPinModal={() => setIsPinModalOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenAiModal={() => {
            setAiModalTopic('');
            setIsAiModalOpen(true);
          }}
        />

        {/* Locked Screen Guard */}
        {!settings.isUnlocked ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-zinc-50">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center animate-bounce shadow-xs">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900">Bitácora de Notas Protegida</h2>
              <p className="text-xs text-zinc-500 font-medium mt-1 max-w-xs mx-auto">
                Esta historia está resguardada con clave PIN para proteger la privacidad del mensaje.
              </p>
            </div>
            <button
              onClick={() => setIsPinModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              Ingresar PIN (1234 por defecto)
            </button>
          </div>
        ) : (
          /* Unlocked Content Area */
          <main className="flex-1 flex flex-col">
            {/* Timeline Header (2020..2026 Slider) */}
            <TimelineHeader
              years={yearsOverview}
              selectedYear={selectedYear}
              onSelectYear={(y) => setSelectedYear(y)}
            />

            {/* Active Year View */}
            <div className="flex-1">
              <YearView
                overview={activeOverview}
                notes={activeYearNotes}
                settings={settings}
                onOpenNoteEditor={handleOpenNoteEditor}
                onDeleteNote={handleDeleteNote}
                onOpenCarta2026={() => setIsCarta2026Open(true)}
              />
            </div>
          </main>
        )}

        {/* Modals */}
        <NoteEditorModal
          isOpen={isNoteEditorOpen}
          onClose={() => setIsNoteEditorOpen(false)}
          onSave={handleSaveNote}
          noteToEdit={noteToEdit}
          defaultYear={selectedYear}
          onOpenAiHelperForNote={handleOpenAiHelperForNote}
        />

        <AiAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          defaultYear={selectedYear}
          initialTopic={aiModalTopic}
          onApplyGeneratedNote={handleApplyGeneratedNote}
        />

        <PinLockModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
        />

        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          years={yearsOverview}
          notes={notes}
        />

        <FinalCarta2026
          isOpen={isCarta2026Open}
          onClose={() => setIsCarta2026Open(false)}
          cartaNote={carta2026Note}
        />
      </div>
    </AndroidFrame>
  );
}
