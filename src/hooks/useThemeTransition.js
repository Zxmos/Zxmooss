import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'mark-sumi-e-theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'day' || saved === 'night') {
      return saved;
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'night';
    }
  } catch {
    // Fallback to day if storage is unavailable
  }
  return 'day';
}

/**
 * Deterministic Day/Night Theme Transition State Machine
 *
 * Explicit States:
 * - IDLE: normal page interaction, overlay unmounted
 * - COVERING: multi-layer Japanese Kasumi clouds sweep in from left & right to cover 100% of viewport
 * - SWITCHING: viewport is 100% covered; palette swaps seamlessly behind the cloud curtain
 * - REVEALING: clouds part smoothly in opposite directions to reveal the new theme
 */
export function useThemeTransition(onNightActivation) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [machineState, setMachineState] = useState('IDLE');
  const [transitionMeta, setTransitionMeta] = useState({
    direction: 'to-night',
    targetTheme: 'night',
  });
  const [announcement, setAnnouncement] = useState('');

  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  // Sync theme attribute on document root & persist in localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  // Cleanup any active transition timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const toggleTheme = useCallback(() => {
    // Prevent overlapping toggle clicks while transition is in progress
    if (machineState !== 'IDLE') {
      return;
    }

    const nextTheme = theme === 'day' ? 'night' : 'day';
    const direction = nextTheme === 'night' ? 'to-night' : 'to-day';

    // Synchronously trigger Gear 5 transformation sound when entering night mode
    if (nextTheme === 'night' && typeof onNightActivation === 'function') {
      onNightActivation();
    }

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTheme(nextTheme);
      setAnnouncement(
        nextTheme === 'night'
          ? 'Night theme enabled (Midnight Sumi Ink)'
          : 'Day theme enabled (Sunlit Aged Parchment)'
      );
      return;
    }

    clearTimers();

    // Phase 1: COVERING (0ms -> 560ms) — Kasumi clouds converge from both sides to occlude 100% of screen
    setTransitionMeta({ direction, targetTheme: nextTheme });
    setMachineState('COVERING');

    // Phase 2: SWITCHING (560ms -> 820ms) — 100% covered; swap palette while curtain is locked
    const switchTimer = window.setTimeout(() => {
      setMachineState('SWITCHING');
      setTheme(nextTheme);
      setAnnouncement(
        nextTheme === 'night'
          ? 'Night theme enabled (Midnight Sumi Ink)'
          : 'Day theme enabled (Sunlit Aged Parchment)'
      );
    }, 560);

    // Phase 3: REVEALING (820ms -> 1500ms) — clouds part smoothly to unveil the transformed scroll
    const revealTimer = window.setTimeout(() => {
      setMachineState('REVEALING');
    }, 820);

    // Phase 4: IDLE (1500ms) — unmount overlay completely so zero elements block interaction
    const idleTimer = window.setTimeout(() => {
      setMachineState('IDLE');
    }, 1500);

    timersRef.current = [switchTimer, revealTimer, idleTimer];
  }, [theme, machineState, clearTimers, onNightActivation]);

  return {
    theme,
    machineState,
    isTransitioning: machineState !== 'IDLE',
    transitionState: {
      active: machineState !== 'IDLE',
      phase: machineState,
      direction: transitionMeta.direction,
      targetTheme: transitionMeta.targetTheme,
    },
    announcement,
    toggleTheme,
  };
}
