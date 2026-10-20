import { CONTACT_CONFIG } from '../data/portfolioData';

/**
 * One Piece "To the Grand Line" / Gear 5 Soundtrack & Audio Controller
 *
 * Behavior:
 * - Plays ONLY when the user deliberately switches from Light Mode (day) to Dark Mode (night).
 * - Checks for './audio/one-piece-to-the-grand-line.mp3' first (and './audio/gear5-transformation.mp3' second).
 * - If no local MP3 file is present yet, plays an original, royalty-free Web Audio API
 *   adventure brass & taiko fanfare inspired by the Grand Line theme.
 * - Smoothly fades out and stops when switching back to Light Mode (day) or when the user clicks Stop/Mute.
 * - Never autoplays on page load and prevents overlapping instances.
 */

const STORAGE_SOUND_KEY = 'mark-gear5-sound-enabled';

export function getInitialSoundPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_SOUND_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
  } catch {
    // Ignore localStorage errors
  }
  return true;
}

export function setSoundPreference(enabled) {
  try {
    localStorage.setItem(STORAGE_SOUND_KEY, enabled ? 'true' : 'false');
  } catch {
    // Ignore localStorage errors
  }
}

let activeAudioElement = null;
let fadeIntervalId = null;
let audioContextInstance = null;
let activeSynthNodes = [];
let synthTimeoutId = null;
let lastPlayTimestamp = 0;
let playbackStateListeners = new Set();
let currentPlaybackState = { isPlaying: false, mode: null };

function notifyListeners(nextState) {
  currentPlaybackState = nextState;
  playbackStateListeners.forEach((fn) => {
    try {
      fn(currentPlaybackState);
    } catch {
      // Ignore listener errors
    }
  });
}

export function subscribeAudioState(listener) {
  playbackStateListeners.add(listener);
  listener(currentPlaybackState);
  return () => {
    playbackStateListeners.delete(listener);
  };
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContextInstance || audioContextInstance.state === 'closed') {
    audioContextInstance = new AudioCtx();
  }
  if (audioContextInstance.state === 'suspended') {
    audioContextInstance.resume().catch(() => {});
  }
  return audioContextInstance;
}

function clearSynthNodes() {
  if (synthTimeoutId) {
    window.clearTimeout(synthTimeoutId);
    synthTimeoutId = null;
  }
  activeSynthNodes.forEach((node) => {
    try {
      node.stop();
      node.disconnect();
    } catch {
      // Ignore already stopped nodes
    }
  });
  activeSynthNodes = [];
}

/**
 * Stop any active MP3 or synthesized soundtrack immediately or with a smooth fade-out
 */
export function stopGear5Sound(smoothFade = true) {
  if (fadeIntervalId) {
    window.clearInterval(fadeIntervalId);
    fadeIntervalId = null;
  }

  clearSynthNodes();

  if (activeAudioElement) {
    const audio = activeAudioElement;
    if (!smoothFade || audio.paused) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // Ignore
      }
      activeAudioElement = null;
      notifyListeners({ isPlaying: false, mode: null });
      return;
    }

    // Smooth 320ms fade out when returning to Light mode
    fadeIntervalId = window.setInterval(() => {
      try {
        if (audio.volume > 0.08) {
          audio.volume = Math.max(0, audio.volume - 0.08);
        } else {
          window.clearInterval(fadeIntervalId);
          fadeIntervalId = null;
          audio.pause();
          audio.currentTime = 0;
          activeAudioElement = null;
          notifyListeners({ isPlaying: false, mode: null });
        }
      } catch {
        window.clearInterval(fadeIntervalId);
        fadeIntervalId = null;
        activeAudioElement = null;
        notifyListeners({ isPlaying: false, mode: null });
      }
    }, 35);
  } else {
    notifyListeners({ isPlaying: false, mode: null });
  }
}

/**
 * Original, royalty-free Web Audio API orchestral adventure fanfare & Liberation drums
 * (Used when public/audio/one-piece-to-the-grand-line.mp3 is not present on disk)
 */
function playSynthesizedGrandLineFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    clearSynthNodes();
    const now = ctx.currentTime;
    notifyListeners({ isPlaying: true, mode: 'synth' });

    // 1. Deep Taiko Drum Roll ("DON! DO-DON!")
    const drumHits = [
      { t: 0.0, fStart: 105, fEnd: 38, dur: 0.35, gain: 0.38 },
      { t: 0.28, fStart: 95, fEnd: 36, dur: 0.25, gain: 0.28 },
      { t: 0.52, fStart: 118, fEnd: 40, dur: 0.55, gain: 0.42 },
    ];

    drumHits.forEach((hit) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(hit.fStart, now + hit.t);
      osc.frequency.exponentialRampToValueAtTime(hit.fEnd, now + hit.t + hit.dur);

      gain.gain.setValueAtTime(hit.gain, now + hit.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + hit.t + hit.dur + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + hit.t);
      osc.stop(now + hit.t + hit.dur + 0.05);
      activeSynthNodes.push(osc);
    });

    // 2. Heroic Adventure Brass Fanfare Progression (D Minor -> Bb Major -> C Major -> D5)
    const brassNotes = [
      { t: 0.05, freq: 293.66, dur: 0.42, gain: 0.12 }, // D4
      { t: 0.50, freq: 440.00, dur: 0.42, gain: 0.13 }, // A4
      { t: 0.95, freq: 466.16, dur: 0.38, gain: 0.13 }, // Bb4
      { t: 1.35, freq: 440.00, dur: 0.32, gain: 0.12 }, // A4
      { t: 1.70, freq: 392.00, dur: 0.35, gain: 0.12 }, // G4
      { t: 2.08, freq: 523.25, dur: 0.42, gain: 0.13 }, // C5
      { t: 2.52, freq: 587.33, dur: 0.95, gain: 0.16 }, // D5 (Grand Line Climax)
    ];

    brassNotes.forEach((note) => {
      // Layer sawtooth + triangle through a warm lowpass brass filter
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(note.freq, now + note.t);
      osc2.frequency.setValueAtTime(note.freq * 0.5, now + note.t); // Sub-octave warmth

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1450, now + note.t);

      gain.gain.setValueAtTime(0.001, now + note.t);
      gain.gain.linearRampToValueAtTime(note.gain, now + note.t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.dur);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now + note.t);
      osc2.start(now + note.t);
      osc1.stop(now + note.t + note.dur + 0.02);
      osc2.stop(now + note.t + note.dur + 0.02);
      activeSynthNodes.push(osc1, osc2);
    });

    synthTimeoutId = window.setTimeout(() => {
      notifyListeners({ isPlaying: false, mode: null });
    }, 3550);
  } catch {
    notifyListeners({ isPlaying: false, mode: null });
  }
}

/**
 * Helper to attempt playing a single audio URL and return a boolean promise
 */
function tryPlayAudioUrl(url) {
  return new Promise((resolve) => {
    try {
      const audio = new Audio(url);
      audio.volume = 0.55;
      audio.preload = 'auto';

      const cleanupListeners = () => {
        audio.oncanplaythrough = null;
        audio.onerror = null;
      };

      audio.onended = () => {
        if (activeAudioElement === audio) {
          activeAudioElement = null;
          notifyListeners({ isPlaying: false, mode: null });
        }
      };

      audio.onerror = () => {
        cleanupListeners();
        resolve(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            cleanupListeners();
            activeAudioElement = audio;
            notifyListeners({ isPlaying: true, mode: 'mp3' });
            resolve(true);
          })
          .catch(() => {
            cleanupListeners();
            resolve(false);
          });
      } else {
        resolve(false);
      }
    } catch {
      resolve(false);
    }
  });
}

/**
 * Trigger the One Piece / Gear 5 Transformation Soundtrack when entering Dark Mode
 */
export async function playGear5TransformationSound(isSoundEnabled = true) {
  if (!isSoundEnabled) return;

  const now = Date.now();
  if (now - lastPlayTimestamp < 650) {
    return;
  }
  lastPlayTimestamp = now;

  // Stop any existing playback before starting
  stopGear5Sound(false);

  // 1. Try primary local asset: ./audio/one-piece-to-the-grand-line.mp3
  const primaryPlayed = await tryPlayAudioUrl(CONTACT_CONFIG.soundtrackPath);
  if (primaryPlayed) return;

  // 2. Try secondary local asset: ./audio/gear5-transformation.mp3
  const secondaryPlayed = await tryPlayAudioUrl(CONTACT_CONFIG.fallbackSoundtrackPath);
  if (secondaryPlayed) return;

  // 3. Fallback to royalty-free Web Audio API Grand Line Fanfare
  playSynthesizedGrandLineFanfare();
}
