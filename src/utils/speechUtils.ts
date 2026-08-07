// Helper for SpeechSynthesis with mobile sentence chunking, Android/iOS TTS bug workarounds & keep-alive

let speechQueue: string[] = [];
let isCurrentlySpeaking = false;
let activeOnStart: (() => void) | null = null;
let activeOnEnd: (() => void) | null = null;
let activeOnError: ((err: any) => void) | null = null;
let keepAliveTimer: any = null;

export const stopSpeech = () => {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
  speechQueue = [];
  isCurrentlySpeaking = false;

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('Error stopping speech synthesis:', e);
    }
  }

  if (activeOnEnd) {
    const cb = activeOnEnd;
    activeOnEnd = null;
    cb();
  }
};

export const speakText = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): (() => void) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('Tu navegador o dispositivo no admite la lectura en voz alta.');
    return () => {};
  }

  try {
    // Stop any active speech
    stopSpeech();

    // Clean text from markdown formatting
    const clean = text.replace(/[\#\*\_]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return () => {};

    // Break text into sentences safely WITHOUT regex lookbehinds (which crash older Safari/Android JS engines)
    const rawMatches = clean.match(/[^.!?]+[.!?]*/g) || [clean];
    const chunks: string[] = [];

    for (const matchStr of rawMatches) {
      const trimmed = matchStr.trim();
      if (!trimmed) continue;

      if (trimmed.length > 160) {
        // Split long sentence by commas, semicolons or spaces
        const parts = trimmed.match(/.{1,140}(?:\s+|$)/g) || [trimmed];
        for (const p of parts) {
          const pt = p.trim();
          if (pt) chunks.push(pt);
        }
      } else {
        chunks.push(trimmed);
      }
    }

    if (chunks.length === 0) return () => {};

    speechQueue = [...chunks];
    isCurrentlySpeaking = true;
    activeOnStart = onStart || null;
    activeOnEnd = onEnd || null;
    activeOnError = onError || null;

    // Mobile gesture unlock
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {}

    if (activeOnStart) {
      activeOnStart();
    }

    const speakNextSentence = () => {
      if (!isCurrentlySpeaking || speechQueue.length === 0) {
        const cb = activeOnEnd;
        activeOnEnd = null;
        isCurrentlySpeaking = false;
        if (keepAliveTimer) {
          clearInterval(keepAliveTimer);
          keepAliveTimer = null;
        }
        if (cb) cb();
        return;
      }

      const currentSentence = speechQueue.shift();
      if (!currentSentence) {
        speakNextSentence();
        return;
      }

      try {
        const utterance = new SpeechSynthesisUtterance(currentSentence);
        utterance.lang = 'es-ES';
        utterance.rate = 0.92;
        utterance.volume = 1.0;
        utterance.pitch = 1.0;

        // Try Spanish voice selection safely
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const spanishVoice =
              voices.find(v => v.lang && v.lang.toLowerCase().startsWith('es')) ||
              voices.find(v => v.name && (v.name.toLowerCase().includes('spanish') || v.name.toLowerCase().includes('español')));

            if (spanishVoice) {
              utterance.voice = spanishVoice;
              utterance.lang = spanishVoice.lang || 'es-ES';
            }
          }
        } catch (vErr) {
          console.warn('Voice retrieval error:', vErr);
        }

        utterance.onend = () => {
          if (isCurrentlySpeaking) {
            setTimeout(speakNextSentence, 100);
          }
        };

        utterance.onerror = (event) => {
          console.warn('Speech chunk warning/error:', event);
          if (speechQueue.length > 0 && isCurrentlySpeaking) {
            setTimeout(speakNextSentence, 100);
          } else {
            stopSpeech();
            if (activeOnError) activeOnError(event);
          }
        };

        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Utterance failure:', err);
        if (speechQueue.length > 0 && isCurrentlySpeaking) {
          setTimeout(speakNextSentence, 100);
        } else {
          stopSpeech();
          if (activeOnError) activeOnError(err);
        }
      }
    };

    speakNextSentence();

    // Android background keep-alive to avoid speech truncation on long texts
    keepAliveTimer = setInterval(() => {
      try {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.resume();
          }
        }
      } catch (e) {}
    }, 2000);

  } catch (globalErr) {
    console.error('Fatal error in speakText:', globalErr);
    stopSpeech();
    if (onError) onError(globalErr);
  }

  return () => {
    stopSpeech();
  };
};
