// Helper for SpeechSynthesis with voice selection, Chrome bug workarounds & resume keep-alive

let speechKeepAliveInterval: any = null;

export const stopSpeech = () => {
  if (speechKeepAliveInterval) {
    clearInterval(speechKeepAliveInterval);
    speechKeepAliveInterval = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speakText = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): (() => void) => {
  if (!('speechSynthesis' in window)) {
    alert('Tu navegador no soporta lectura por voz.');
    return () => {};
  }

  // Stop any existing speech
  stopSpeech();

  // Force resume if paused
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  // Clean text slightly for better pronunciation
  const cleanText = text.replace(/[\#\*\_]/g, ' ').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'es-ES';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const assignSpanishVoice = () => {
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        // Priority order: Spanish voices
        const spanishVoice = 
          voices.find(v => v.lang.startsWith('es-ES')) ||
          voices.find(v => v.lang.startsWith('es-MX')) ||
          voices.find(v => v.lang.startsWith('es-US')) ||
          voices.find(v => v.lang.startsWith('es')) ||
          voices.find(v => v.name.toLowerCase().includes('spanish'));

        if (spanishVoice) {
          utterance.voice = spanishVoice;
          utterance.lang = spanishVoice.lang;
        }
      }
    } catch (e) {
      console.warn('Could not assign speech voice:', e);
    }
  };

  assignSpanishVoice();

  // In Chrome, voices might load asynchronously
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      assignSpanishVoice();
    };
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    stopSpeech();
    if (onEnd) onEnd();
  };

  utterance.onerror = (event) => {
    console.warn('SpeechSynthesis error event:', event);
    stopSpeech();
    if (onError) onError(event);
  };

  try {
    // Resume again before speak
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);

    if (onStart) onStart();

    // Chrome workaround: long text stops speaking after 15 seconds unless periodically resumed
    speechKeepAliveInterval = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        stopSpeech();
      } else {
        window.speechSynthesis.resume();
      }
    }, 4000);
  } catch (err) {
    console.error('Failed to invoke speech synthesis:', err);
    stopSpeech();
    if (onError) onError(err);
  }

  return () => {
    stopSpeech();
  };
};
