/**
 * Gear 5 Transformation Sound Engine
 *
 * Behavior:
 * - Plays only when the user deliberately triggers night mode.
 * - Checks for a custom file at './audio/gear5-transformation.mp3'.
 * - If the audio file is missing or blocked, gracefully uses a royalty-free Web Audio API
 *   synthesized sound effect (energetic punchy liberation drum + playful cartoon spring chime).
 * - Avoids overlapping playback and respects user's sound toggle and reduced motion.
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
  // Default to enabled so visitors experience the feature
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
let audioContextInstance = null;
let lastPlayTimestamp = 0;

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

/**
 * Royalty-free Web Audio API synthesized "Gear 5" inspired transformation sound:
 * 1. Resonant Liberation drumbeat ("DON!")
 * 2. Playful cartoon rising pitch-bend ("BOING/SPRING!")
 * 3. Shimmering celestial aura chime
 */
function playSynthesizedGear5Sound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // --- 1. Resonant Liberation Taiko Drum Pulse ---
    const drumOsc = ctx.createOscillator();
    const drumGain = ctx.createGain();
    drumOsc.type = 'sine';
    drumOsc.frequency.setValueAtTime(110, now);
    drumOsc.frequency.exponentialRampToValueAtTime(38, now + 0.38);

    drumGain.gain.setValueAtTime(0.42, now);
    drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    drumOsc.connect(drumGain);
    drumGain.connect(ctx.destination);

    drumOsc.start(now);
    drumOsc.stop(now + 0.46);

    // --- 2. Playful Cartoon Spring Bounce (Rubber / Nika vibe) ---
    const bounceOsc = ctx.createOscillator();
    const bounceGain = ctx.createGain();
    bounceOsc.type = 'triangle';
    bounceOsc.frequency.setValueAtTime(260, now + 0.08);
    bounceOsc.frequency.exponentialRampToValueAtTime(680, now + 0.28);
    bounceOsc.frequency.exponentialRampToValueAtTime(520, now + 0.48);

    bounceGain.gain.setValueAtTime(0.001, now + 0.08);
    bounceGain.gain.linearRampToValueAtTime(0.24, now + 0.14);
    bounceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

    bounceOsc.connect(bounceGain);
    bounceGain.connect(ctx.destination);

    bounceOsc.start(now + 0.08);
    bounceOsc.stop(now + 0.53);

    // --- 3. Celestial Cloud Aura Shimmer ---
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chimeFreqs.forEach((freq, idx) => {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, now + 0.18 + idx * 0.04);

      chimeGain.gain.setValueAtTime(0.001, now + 0.18 + idx * 0.04);
      chimeGain.gain.linearRampToValueAtTime(0.08, now + 0.22 + idx * 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75 + idx * 0.04);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chimeOsc.start(now + 0.18 + idx * 0.04);
      chimeOsc.stop(now + 0.8 + idx * 0.04);
    });
  } catch {
    // Graceful degradation if audio context is blocked
  }
}

/**
 * Trigger the Gear 5 Transformation Sound
 */
export function playGear5TransformationSound(isSoundEnabled = true) {
  if (!isSoundEnabled) return;

  const now = Date.now();
  // Prevent duplicate overlapping triggers within 700ms
  if (now - lastPlayTimestamp < 700) {
    return;
  }
  lastPlayTimestamp = now;

  // Stop any currently playing audio element
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {
      // Ignore
    }
  }

  // Try custom MP3 asset first
  try {
    const audio = new Audio('./audio/gear5-transformation.mp3');
    activeAudioElement = audio;
    audio.volume = 0.65;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // MP3 missing, 404, or blocked: fall back to synthesized Web Audio API
        playSynthesizedGear5Sound();
      });
    }
  } catch {
    // Fall back to Web Audio API
    playSynthesizedGear5Sound();
  }
}
