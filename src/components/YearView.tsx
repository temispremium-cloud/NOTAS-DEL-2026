import React, { useState } from 'react';
import { 
  YearOverview, 
  NoteItem, 
  AppSettings 
} from '../types';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  Plus, 
  Edit3, 
  Trash2, 
  Quote, 
  CheckCircle2, 
  Search, 
  Pin, 
  Sparkles,
  Calendar,
  BookOpen,
  Type
} from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speechUtils';

interface YearViewProps {
  overview: YearOverview;
  notes: NoteItem[];
  settings: AppSettings;
  onOpenNoteEditor: (noteToEdit?: NoteItem) => void;
  onDeleteNote: (noteId: string) => void;
  onOpenCarta2026: () => void;
}

export const YearView: React.FC<YearViewProps> = ({
  overview,
  notes,
  settings,
  onOpenNoteEditor,
  onDeleteNote,
  onOpenCarta2026
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [readingNoteId, setReadingNoteId] = useState<string | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'grande' | 'muy-grande'>('grande');

  // Text-To-Speech handler using browser SpeechSynthesis with robust Spanish voice selection
  const handleReadAloud = (note: NoteItem) => {
    if (readingNoteId === note.id) {
      stopSpeech();
      setReadingNoteId(null);
      return;
    }

    const textToSpeak = `${note.title}. ${note.content} ${note.quote ? `. Frase destacada: ${note.quote}` : ''}`;
    
    setReadingNoteId(note.id);
    speakText(
      textToSpeak,
      () => setReadingNoteId(note.id),
      () => setReadingNoteId(null),
      () => setReadingNoteId(null)
    );
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.mood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMoodBadgeClass = (mood: NoteItem['mood']) => {
    switch (mood) {
      case 'Inicio': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Gratitud': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Disculpa': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Reflexión': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Madurez': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Desafío': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Cierre': return 'bg-indigo-100 text-indigo-800 border-indigo-300 font-semibold';
      default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const getContentFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'normal': return 'text-base leading-relaxed text-zinc-900 font-sans';
      case 'grande': return 'text-lg sm:text-xl leading-relaxed sm:leading-loose text-zinc-900 font-sans';
      case 'muy-grande': return 'text-xl sm:text-2xl leading-relaxed sm:leading-loose text-zinc-900 font-sans';
      default: return 'text-lg leading-relaxed text-zinc-900 font-sans';
    }
  };

  return (
    <div className="p-3 sm:p-5 space-y-5 pb-20">
      {/* Year Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
        <div className="relative h-44 sm:h-56 w-full overflow-hidden">
          <img
            src={overview.coverImage}
            alt={overview.themeTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-900/40 to-transparent" />
          
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-xs mb-1.5 shadow-sm">
              Año {overview.year}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm leading-snug">
              {overview.themeTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 mt-0.5 line-clamp-2 font-medium">
              {overview.themeSubtitle}
            </p>
          </div>
        </div>

        {/* Overview Summary */}
        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-base sm:text-lg text-zinc-900 leading-relaxed font-normal">
            {overview.summary}
          </p>

          {/* Key Lessons */}
          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-2.5">
            <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Aprendizajes clave del {overview.year}</span>
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-zinc-800 font-medium">
              {overview.keyLessons.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="italic text-sm sm:text-base text-indigo-950 bg-indigo-50/80 p-3.5 rounded-2xl border border-indigo-200 font-medium">
            "{overview.finalThought}"
          </div>
        </div>
      </div>

      {/* Special 2026 Closure Banner */}
      {overview.year === 2026 && (
        <div className="bg-indigo-600 p-4 sm:p-5 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white fill-white/20" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Carta Especial de Cierre (2026)
              </h3>
              <p className="text-xs text-indigo-100">
                Un mensaje abierto y honesto para dar paso a la paz
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCarta2026}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs sm:text-sm hover:bg-indigo-50 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>Leer Carta Completa</span>
          </button>
        </div>
      )}

      {/* Font Size Selector Control Bar */}
      <div className="bg-white rounded-2xl p-3 border border-zinc-200 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-800">
          <Type className="w-4 h-4 text-indigo-600" />
          <span>Tamaño de letra en pantalla:</span>
        </div>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setFontSizeLevel('normal')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              fontSizeLevel === 'normal'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            Normal (16px)
          </button>
          <button
            onClick={() => setFontSizeLevel('grande')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              fontSizeLevel === 'grande'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            Grande (18px)
          </button>
          <button
            onClick={() => setFontSizeLevel('muy-grande')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              fontSizeLevel === 'muy-grande'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            Muy Grande (20px)
          </button>
        </div>
      </div>

      {/* Search & Actions Bar for Notes */}
      <div className="flex items-center justify-between gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Buscar notas del ${overview.year}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-2xs"
          />
        </div>

        {/* Add Note Button (Editor Mode) */}
        {settings.activeMode === 'editor' && (
          <button
            onClick={() => onOpenNoteEditor()}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Nota</span>
          </button>
        )}
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-zinc-300 p-6 text-zinc-500">
            <p className="text-sm font-medium">No hay notas registradas para este año aún.</p>
            {settings.activeMode === 'editor' && (
              <button
                onClick={() => onOpenNoteEditor()}
                className="mt-3 text-xs text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Escribir la primera nota del {overview.year}
              </button>
            )}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`bg-white rounded-3xl p-4.5 sm:p-6 border transition-all shadow-xs relative ${
                note.isImportant
                  ? 'border-indigo-300 shadow-sm ring-1 ring-indigo-200'
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {/* Header inside Note Card - Mobile Responsive Stack */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 mb-3 border-b border-zinc-100">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-zinc-600 flex items-center gap-1 bg-zinc-100 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {note.date}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${getMoodBadgeClass(note.mood)}`}>
                      {note.mood}
                    </span>
                    {note.isImportant && (
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 flex items-center gap-1">
                        <Pin className="w-3.5 h-3.5 text-indigo-600" /> Destacada
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                    {note.title}
                  </h3>
                </div>

                {/* Speech Reader & Editor Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
                  <button
                    onClick={() => handleReadAloud(note)}
                    title={readingNoteId === note.id ? "Detener reproducción de voz" : "Escuchar esta nota leída en voz alta"}
                    className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                      readingNoteId === note.id
                        ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100'
                    }`}
                  >
                    {readingNoteId === note.id ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Detener voz</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Escuchar en voz alta</span>
                      </>
                    )}
                  </button>

                  {settings.activeMode === 'editor' && (
                    <>
                      <button
                        onClick={() => onOpenNoteEditor(note)}
                        title="Editar esta nota"
                        className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        title="Eliminar esta nota"
                        className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-rose-600 hover:border-rose-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Note Content */}
              <p className={`whitespace-pre-line my-4 font-normal ${getContentFontSizeClass()}`}>
                {note.content}
              </p>

              {/* Quote box if present */}
              {note.quote && (
                <div className="my-4 p-4 rounded-2xl bg-zinc-50 border-l-4 border-indigo-600 text-zinc-900 text-sm sm:text-base italic flex items-start gap-3 font-medium">
                  <Quote className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>"{note.quote}"</span>
                </div>
              )}

              {/* Images attached if present */}
              {note.images && note.images.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {note.images.map((img) => (
                    <div key={img.id} className="relative rounded-2xl overflow-hidden border border-zinc-200 group">
                      <img
                        src={img.url}
                        alt={img.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-44 object-cover filter group-hover:scale-105 transition-transform duration-300"
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-zinc-900/80 px-3 py-1.5 text-xs text-white truncate font-medium">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

