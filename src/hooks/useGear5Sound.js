import { useState, useCallback } from 'react';
import {
  getInitialSoundPreference,
  setSoundPreference,
  playGear5TransformationSound,
} from '../utils/gear5Audio';

/**
 * Hook for managing Gear 5 transformation sound state and playback
 */
export function useGear5Sound() {
  const [soundEnabled, setSoundEnabled] = useState(getInitialSoundPreference);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      setSoundPreference(next);
      return next;
    });
  }, []);

  const playSoundOnNightActivation = useCallback(() => {
    if (soundEnabled) {
      playGear5TransformationSound(true);
    }
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playSoundOnNightActivation,
  };
}
