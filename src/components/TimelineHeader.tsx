import React, { useEffect, useRef } from 'react';
import { Calendar, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { YearNumber, YearOverview } from '../types';

interface TimelineHeaderProps {
  years: YearOverview[];
  selectedYear: YearNumber;
  onSelectYear: (year: YearNumber) => void;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  years,
  selectedYear,
  onSelectYear
}) => {
  const selectedOverview = years.find(y => y.year === selectedYear) || years[0];
  const yearList: YearNumber[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const activeIndex = yearList.indexOf(selectedYear);
  const progressPercent = Math.round(((activeIndex + 1) / yearList.length) * 100);

  const activeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedYear]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      onSelectYear(yearList[activeIndex - 1]);
    }
  };

  const handleNext = () => {
    if (activeIndex < yearList.length - 1) {
      onSelectYear(yearList[activeIndex + 1]);
    }
  };

  return (
    <div className="bg-zinc-50 border-b border-zinc-200 px-3 py-2.5 select-none">
      {/* Year Selector Pills Slider */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          title="Año anterior"
          className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-500 disabled:hover:bg-white transition-all cursor-pointer shrink-0 shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 overflow-x-auto py-1 px-1 no-scrollbar scroll-smooth w-full">
          {yearList.map((yr) => {
            const isSelected = yr === selectedYear;
            const isClosure = yr === 2026;
            return (
              <button
                key={yr}
                ref={isSelected ? activeBtnRef : null}
                onClick={() => onSelectYear(yr)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {isClosure && <Sparkles className="w-3 h-3 text-amber-200" />}
                <span>{yr}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={activeIndex === yearList.length - 1}
          title="Siguiente año"
          className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-500 disabled:hover:bg-white transition-all cursor-pointer shrink-0 shadow-2xs"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar & Theme Highlight */}
      <div className="mt-2 pt-2 border-t border-zinc-200/60">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
          <span className="font-semibold text-indigo-700 flex items-center gap-1 truncate pr-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{selectedYear}: {selectedOverview.themeTitle}</span>
          </span>
          <span className="font-mono text-[10px] text-zinc-400 font-semibold shrink-0">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};


