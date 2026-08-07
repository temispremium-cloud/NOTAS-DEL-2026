import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon, Save, Calendar, Tag, Quote, Pin } from 'lucide-react';
import { NoteItem, YearNumber } from '../types';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: NoteItem) => void;
  noteToEdit?: NoteItem | null;
  defaultYear: YearNumber;
  onOpenAiHelperForNote: (currentContent: string, currentYear: YearNumber) => void;
}

export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  noteToEdit,
  defaultYear,
  onOpenAiHelperForNote
}) => {
  const [year, setYear] = useState<YearNumber>(defaultYear);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<NoteItem['mood']>('Reflexión');
  const [quote, setQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setYear(noteToEdit.year);
      setDate(noteToEdit.date);
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setMood(noteToEdit.mood);
      setQuote(noteToEdit.quote || '');
      setIsImportant(!!noteToEdit.isImportant);
      if (noteToEdit.images && noteToEdit.images.length > 0) {
        setImageUrl(noteToEdit.images[0].url);
        setImageCaption(noteToEdit.images[0].caption);
      } else {
        setImageUrl('');
        setImageCaption('');
      }
    } else {
      setYear(defaultYear);
      setDate(`${new Date().getDate()} de Agosto, ${defaultYear}`);
      setTitle('');
      setContent('');
      setMood('Reflexión');
      setQuote('');
      setImageUrl('');
      setImageCaption('');
      setIsImportant(false);
    }
  }, [noteToEdit, defaultYear, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa el título y el contenido de la nota.');
      return;
    }

    const noteData: NoteItem = {
      id: noteToEdit ? noteToEdit.id : `note-${Date.now()}`,
      year,
      date: date || `Agosto, ${year}`,
      title,
      content,
      mood,
      quote: quote.trim() ? quote.trim() : undefined,
      isImportant,
      images: imageUrl.trim()
        ? [
            {
              id: `img-${Date.now()}`,
              url: imageUrl.trim(),
              caption: imageCaption.trim() || 'Imagen adjunta'
            }
          ]
        : []
    };

    onSave(noteData);
    onClose();
  };

  const moodsList: NoteItem['mood'][] = [
    'Inicio', 'Nostalgia', 'Desafío', 'Reflexión', 'Disculpa', 'Gratitud', 'Madurez', 'Cierre'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-5 py-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <span>{noteToEdit ? 'Editar Nota' : 'Nueva Nota de Explicación'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
              Año {year}
            </span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs text-zinc-700 max-h-[80vh] overflow-y-auto">
          {/* Year & Date Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Año
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value) as YearNumber)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
              >
                {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map(y => (
                  <option key={y} value={y}>
                    Año {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                Fecha o Momento
              </label>
              <input
                type="text"
                placeholder="Ej: 14 de Mayo, 2020"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1">
              Título de la Nota
            </label>
            <input
              type="text"
              placeholder="Ej: Explicación sincera sobre mi distancia..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
            />
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-indigo-600" />
              Sentimiento o Tono
            </label>
            <div className="flex flex-wrap gap-1.5">
              {moodsList.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                    mood === m
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area with AI Helper button */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-zinc-700">
                Mensaje o Explicación Completa
              </label>
              <button
                type="button"
                onClick={() => onOpenAiHelperForNote(content, year)}
                className="text-[11px] text-indigo-700 hover:text-indigo-900 flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200 cursor-pointer font-semibold"
              >
                <Sparkles className="w-3 h-3 text-indigo-600" />
                <span>Ayuda IA para redactar</span>
              </button>
            </div>
            <textarea
              rows={5}
              placeholder="Escribe libremente lo que vivieron, lo que sentías, tus disculpas o tus palabras sinceras..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 leading-relaxed shadow-xs"
            />
          </div>

          {/* Quote */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1 flex items-center gap-1">
              <Quote className="w-3.5 h-3.5 text-indigo-600" />
              Frase Destacada (Opcional)
            </label>
            <input
              type="text"
              placeholder='Ej: "El tiempo pone cada sentimiento en su lugar."'
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
            />
          </div>

          {/* Image URL & Caption */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
            <span className="text-[11px] font-bold text-zinc-700 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              Foto o Recuerdo (Opcional)
            </span>
            <input
              type="url"
              placeholder="URL de la imagen (ej: https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
            />
            {imageUrl && (
              <input
                type="text"
                placeholder="Descripción de la foto (ej: Aquella tarde en el parque)"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
              />
            )}
          </div>

          {/* Pin as Important */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isImportantCheck"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-zinc-300 cursor-pointer"
            />
            <label htmlFor="isImportantCheck" className="text-xs text-zinc-700 font-semibold cursor-pointer flex items-center gap-1">
              <Pin className="w-3.5 h-3.5 text-indigo-600" />
              Marcar como nota destacada / importante
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Nota</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

