export type YearNumber = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026;

export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
}

export interface NoteItem {
  id: string;
  year: YearNumber;
  date: string; // e.g. "14 de Mayo, 2020"
  title: string;
  content: string;
  mood: 'Inicio' | 'Nostalgia' | 'Desafío' | 'Reflexión' | 'Disculpa' | 'Gratitud' | 'Madurez' | 'Cierre';
  isImportant?: boolean;
  isLetter?: boolean; // Main year letter
  images?: PhotoMemory[];
  quote?: string;
  audioNoteText?: string;
}

export interface YearOverview {
  year: YearNumber;
  themeTitle: string;
  themeSubtitle: string;
  summary: string;
  coverImage: string;
  keyLessons: string[];
  finalThought: string;
}

export interface AppSettings {
  pinCode: string; // e.g., "1234"
  isPinRequired: boolean;
  isUnlocked: boolean;
  activeMode: 'reader' | 'editor'; // Reader mode (for her) vs Editor mode (for author)
  androidFrameVisible: boolean;
  bgTheme: 'rose' | 'sand' | 'dusk' | 'sage' | 'midnight';
  isAudioPlaying: boolean;
  volume: number;
}
