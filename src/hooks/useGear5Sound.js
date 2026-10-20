import { useState, useEffect, useCallback } from 'react';
import {
  getInitialSoundPreference,
  setSoundPreference,
  playGear5TransformationSound,
  stopGear5Sound,
  subscribeAudioState,
} from '../utils/gear5Audio';

/**
 * Hook for managing One Piece / Gear 5 transformation soundtrack state,
 * mute/unmute preference, and stop controls.
 */
export function useGear5Sound() {
  const [soundEnabled, setSoundEnabled] = useState(getInitialSoundPreference);
  const [playbackState, setPlaybackState] = useState({
    isPlaying: false,
    mode: null,
  });

  useEffect(() => {
    return subscribeAudioState((nextState) => {
      setPlaybackState(nextState);
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      setSoundPreference(next);
      if (!next) {
        stopGear5Sound(false);
      }
      return next;
    });
  }, []);

  const stopSound = useCallback(() => {
    stopGear5Sound(false);
  }, []);

  const playSoundOnNightActivation = useCallback(() => {
    if (soundEnabled) {
      playGear5TransformationSound(true);
    }
  }, [soundEnabled]);

  const stopSoundOnDayActivation = useCallback(() => {
    stopGear5Sound(true);
  }, []);

  return {
    soundEnabled,
    isPlaying: playbackState.isPlaying,
    audioMode: playbackState.mode,
    toggleSound,
    stopSound,
    playSoundOnNightActivation,
    stopSoundOnDayActivation,
  };
}
