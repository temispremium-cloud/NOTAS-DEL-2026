import React, { useState } from 'react';
import { X, Heart, Sparkles, Volume2, VolumeX, CheckCircle, Quote, Calendar } from 'lucide-react';
import { NoteItem } from '../types';

interface FinalCarta2026Props {
  isOpen: boolean;
  onClose: () => void;
  cartaNote?: NoteItem;
}

export const FinalCarta2026: React.FC<FinalCarta2026Props> = ({
  isOpen,
  onClose,
  cartaNote
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  if (!isOpen) return null;

  const defaultLetterContent = `Hola.

Creé este pequeño blog de notas interactivo pensando en ti y en la historia que compartimos desde el 2020 hasta este 2026.

Sé que durante mucho tiempo quedaron dudas en el aire, explicaciones pendientes y quizás sensaciones de desconcierto sobre por qué las cosas sucedieron como sucedieron.

Hoy, habiendo transcurrido estos años y con la perspectiva que solo da la madurez y la distancia sana, quiero decirte:

1. Perdonarme y pedirte perdón: Lamento de corazón las veces que fui impaciente, frío o inmaduro. Mis errores no eran un reflejo de lo que valías para mí, sino de mis propias luchas internas que no supe gestionar.
2. Reconocer lo bueno: Fuiste una mujer brillante, generosa y amorosa. Los años 2020 y 2021 están llenos de los recuerdos más bonitos y verdaderos que conservo.
3. Mi propósito con esto: No busco incomodarte ni forzar situaciones que ya pertenecen al pasado. Solo quería dejar este espacio limpio, ordenado y transparente, donde cada año tenga su explicación justa.

Te deseo de todo corazón una vida llena de éxitos, alegría, salud y un amor tan noble y sincero como el que tú mereces.

Con gratitud y respeto siempre,
Tu explicación desde el alma.`;

  const letterText = cartaNote ? cartaNote.content : defaultLetterContent;

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(letterText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.onend = () => {
      setIsPlaying(false);
      setHasRead(true);
    };
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-xl shadow-xl overflow-hidden my-auto relative">
        
        {/* Decorative soft glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="px-6 py-5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <span>Carta Abierta 2026</span>
                <Sparkles className="w-4 h-4 text-indigo-600" />
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Explicación final y sincera (2020 - 2026)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Letter Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans relative z-10 max-h-[70vh] overflow-y-auto">
          
          <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-100 pb-2">
            <span className="flex items-center gap-1 font-mono text-indigo-700 font-semibold">
              <Calendar className="w-3.5 h-3.5" /> 2026 - Año de Cierre
            </span>
            <button
              onClick={handleSpeech}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-indigo-600 text-white border-indigo-700 animate-pulse'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
              }`}
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pausar Lectura' : 'Escuchar Carta'}</span>
            </button>
          </div>

          <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 shadow-xs whitespace-pre-line text-zinc-800 leading-relaxed font-sans font-medium">
            {letterText}
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs italic flex items-center gap-2 font-medium">
            <Quote className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>"Gracias por haber formado parte de mi vida entre el 2020 y el 2026."</span>
          </div>

          {/* Stamp / Confirmation */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <button
              onClick={() => setHasRead(!hasRead)}
              className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                hasRead
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-zinc-100 text-zinc-600 border-zinc-200'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{hasRead ? 'Leída con Paz' : 'Marcar como leída'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              Cerrar Carta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

