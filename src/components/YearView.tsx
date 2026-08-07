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
  BookOpen
} from 'lucide-react';

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

  // Text-To-Speech handler using browser SpeechSynthesis
  const handleReadAloud = (note: NoteItem) => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta lectura por voz.');
      return;
    }

    if (readingNoteId === note.id) {
      window.speechSynthesis.cancel();
      setReadingNoteId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${note.title}. ${note.content} ${note.quote ? `. Frase destacada: ${note.quote}` : ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 0.92; // Slightly slower, calm emotional pace

    utterance.onend = () => setReadingNoteId(null);
    utterance.onerror = () => setReadingNoteId(null);

    setReadingNoteId(note.id);
    window.speechSynthesis.speak(utterance);
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

  return (
    <div className="p-4 space-y-5 pb-20">
      {/* Year Banner Card */}
      <div className="relative rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
          <img
            src={overview.coverImage}
            alt={overview.themeTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-900/40 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-semibold text-xs mb-1 shadow-sm">
              Año {overview.year}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {overview.themeTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 mt-0.5 line-clamp-2">
              {overview.themeSubtitle}
            </p>
          </div>
        </div>

        {/* Overview Summary */}
        <div className="p-4 space-y-3">
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {overview.summary}
          </p>

          {/* Key Lessons */}
          <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 space-y-2">
            <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Aprendizajes clave del {overview.year}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-700 font-medium">
              {overview.keyLessons.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="italic text-xs text-indigo-900 bg-indigo-50/70 p-3 rounded-xl border border-indigo-100 font-medium">
            "{overview.finalThought}"
          </div>
        </div>
      </div>

      {/* Special 2026 Closure Banner */}
      {overview.year === 2026 && (
        <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white fill-white/20" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Carta Especial de Cierre (2026)
              </h3>
              <p className="text-xs text-indigo-100">
                Un mensaje abierto y honesto para dar paso a la paz
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCarta2026}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>Leer Carta Completa</span>
          </button>
        </div>
      )}

      {/* Search & Actions Bar for Notes */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Buscar notas del ${overview.year}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-xs"
          />
        </div>

        {/* Add Note Button (Editor Mode) */}
        {settings.activeMode === 'editor' && (
          <button
            onClick={() => onOpenNoteEditor()}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
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
            <p className="text-xs font-medium">No hay notas registradas para este año aún.</p>
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
              className={`bg-white rounded-2xl p-4.5 border transition-all shadow-xs relative ${
                note.isImportant
                  ? 'border-indigo-300 shadow-sm ring-1 ring-indigo-200'
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {/* Header inside Note Card */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {note.date}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold ${getMoodBadgeClass(note.mood)}`}>
                      {note.mood}
                    </span>
                    {note.isImportant && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 flex items-center gap-0.5">
                        <Pin className="w-3 h-3 text-indigo-600" /> Destacada
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                    {note.title}
                  </h3>
                </div>

                {/* Speech Reader & Editor Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleReadAloud(note)}
                    title={readingNoteId === note.id ? "Detener lectura" : "Escuchar esta nota"}
                    className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                      readingNoteId === note.id
                        ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
                        : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                    }`}
                  >
                    {readingNoteId === note.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  {settings.activeMode === 'editor' && (
                    <>
                      <button
                        onClick={() => onOpenNoteEditor(note)}
                        title="Editar esta nota"
                        className="p-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        title="Eliminar esta nota"
                        className="p-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-rose-600 hover:border-rose-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Note Content */}
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans whitespace-pre-line my-3">
                {note.content}
              </p>

              {/* Quote box if present */}
              {note.quote && (
                <div className="my-3 p-3.5 rounded-xl bg-zinc-50 border-l-3 border-indigo-600 text-zinc-700 text-xs italic flex items-start gap-2.5 font-medium">
                  <Quote className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>"{note.quote}"</span>
                </div>
              )}

              {/* Images attached if present */}
              {note.images && note.images.length > 0 && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {note.images.map((img) => (
                    <div key={img.id} className="relative rounded-xl overflow-hidden border border-zinc-200 group">
                      <img
                        src={img.url}
                        alt={img.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-36 object-cover filter group-hover:scale-105 transition-transform duration-300"
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-zinc-900/80 px-2.5 py-1 text-[10px] text-white truncate font-medium">
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

