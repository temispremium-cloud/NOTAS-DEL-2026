import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { YearNumber } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultYear?: YearNumber;
  initialTopic?: string;
  onApplyGeneratedNote: (generated: {
    year: YearNumber;
    title: string;
    content: string;
    mood: any;
    quote?: string;
  }) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  defaultYear = 2022,
  initialTopic = '',
  onApplyGeneratedNote
}) => {
  const [selectedYear, setSelectedYear] = useState<YearNumber>(defaultYear);
  const [topic, setTopic] = useState(initialTopic);
  const [tone, setTone] = useState('Respetuoso, humano, maduro y directo');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    title: string;
    content: string;
    mood: string;
    quote?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/assist-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: selectedYear,
          topic: topic || 'Explicación sincera sobre lo vivido, asumir responsabilidad por los errores del pasado y expresar gratitud.',
          tone
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Error al conectar con la IA');
      }

      setResult({
        title: data.title || `Explicación ${selectedYear}`,
        content: data.content || '',
        mood: data.mood || 'Reflexión',
        quote: data.quote || undefined
      });
    } catch (err: any) {
      console.warn('Fallback local generation:', err);
      // Fallback respectful text if server endpoint fails or API key is not set
      setResult({
        title: `Reflexión sincera del ${selectedYear}`,
        content: `Quiero dedicarte unas palabras respecto al año ${selectedYear}. A veces la vida y la inmadurez nos llevan por caminos difíciles, pero hoy con el tiempo y la paz en el corazón, entiendo mejor lo que sucedió. No busco excusas, solo darte la transparencia que te mereces. Gracias por todo lo bonito que me enseñaste.`,
        mood: 'Reflexión',
        quote: 'La verdad dicha con humildad sana el pasado.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!result) return;
    onApplyGeneratedNote({
      year: selectedYear,
      title: result.title,
      content: result.content,
      mood: result.mood as any,
      quote: result.quote
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-5 py-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">Asistente de Redacción IA</h3>
              <p className="text-[11px] text-zinc-500 font-medium">Te ayuda a expresar explicaciones con empatía y madurez</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-zinc-700">
          {/* Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                Año a referenciar
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value) as YearNumber)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
              >
                {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map(y => (
                  <option key={y} value={y}>Año {y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                Tono sugerido
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 shadow-xs font-medium"
              >
                <option value="Respetuoso, humano, maduro y directo">Humano & Maduro</option>
                <option value="Agradecido y nostálgico">Agradecido & Nostálgico</option>
                <option value="Disculpa sincera sin excusas">Disculpa Sincera</option>
                <option value="Cierre definitivo en paz y bendiciones">Cierre & Paz</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 mb-1">
              ¿Qué te gustaría explicar o transmitir para este año?
            </label>
            <textarea
              rows={3}
              placeholder="Ej: Quiero explicarle por qué en 2022 me encerré en mis problemas de trabajo y no supe comunicarme. Pedirle disculpas sinceras..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-indigo-600 leading-relaxed shadow-xs"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Generando texto empático...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Redactar Propuesta de Nota con Gemini</span>
              </>
            )}
          </button>

          {/* Generated Result */}
          {result && (
            <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                <span className="text-xs font-bold text-indigo-900">{result.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200">
                  {result.mood}
                </span>
              </div>

              <p className="text-xs text-zinc-800 leading-relaxed whitespace-pre-line font-medium">
                {result.content}
              </p>

              {result.quote && (
                <div className="text-xs italic text-indigo-900 bg-white p-2.5 rounded-lg border-l-3 border-indigo-600 font-medium">
                  "{result.quote}"
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={handleApply}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Insertar en la Bitácora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

