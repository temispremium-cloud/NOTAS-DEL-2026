import React, { useState } from 'react';
import { X, Copy, Check, Download, Share2, FileText, Printer } from 'lucide-react';
import { NoteItem, YearOverview } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  years: YearOverview[];
  notes: NoteItem[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  years,
  notes
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateFullText = () => {
    let output = `=================================================\n`;
    output += `BITÁCORA DE NOTAS Y EXPLICACIÓN (2020 - 2026)\n`;
    output += `=================================================\n\n`;

    years.forEach(yr => {
      output += `-------------------------------------------------\n`;
      output += `AÑO ${yr.year}: ${yr.themeTitle}\n`;
      output += `"${yr.themeSubtitle}"\n`;
      output += `-------------------------------------------------\n\n`;
      output += `RESUMEN DEL AÑO:\n${yr.summary}\n\n`;
      output += `LO QUE APRENDÍ:\n`;
      yr.keyLessons.forEach((k) => {
        output += ` - ${k}\n`;
      });
      output += `\nFRASE DEL AÑO: "${yr.finalThought}"\n\n`;

      const yearNotes = notes.filter(n => n.year === yr.year);
      if (yearNotes.length > 0) {
        output += `NOTAS Y VIVENCIAS DE ESTE AÑO:\n`;
        yearNotes.forEach(n => {
          output += `\n* [${n.date}] - ${n.title} (${n.mood})\n`;
          output += `${n.content}\n`;
          if (n.quote) output += `  Frase: "${n.quote}"\n`;
        });
      }
      output += `\n\n`;
    });

    output += `=================================================\n`;
    output += `FIN DE LA BITÁCORA - GRACIAS POR TODO LO VIVIDO\n`;
    output += `=================================================\n`;

    return output;
  };

  const fullText = generateFullText();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Bitacora_Notas_Explicacion_2020_2026.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-5 py-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">Exportar Bitácora Completa</h3>
              <p className="text-[11px] text-zinc-500 font-medium">Guardar o compartir la historia 2020-2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-zinc-700">
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Vista previa del formato de texto
              </span>
              <span className="text-[10px] text-zinc-500 font-mono font-semibold">
                {notes.length} notas en total
              </span>
            </div>
            <textarea
              readOnly
              rows={8}
              value={fullText}
              className="w-full bg-white border border-zinc-200 rounded-xl p-2.5 font-mono text-[11px] text-zinc-800 leading-relaxed focus:outline-none resize-none shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copiar Texto</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .TXT</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

