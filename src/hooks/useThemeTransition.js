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
 * Deterministic Day/Night Theme Transition State Machine (9A.3)
 *
 * Explicit States:
 * - IDLE: normal page interaction, overlay unmounted
 * - COVERING: clouds sweep across and cover 100% of the viewport
 * - SWITCHING: viewport is 100% covered; palette swaps seamlessly without flash
 * - REVEALING: clouds part to reveal the updated theme before returning to IDLE
 */
export function useThemeTransition() {
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
    // Ignore overlapping toggle requests while transition is active
    if (machineState !== 'IDLE') {
      return;
    }

    const nextTheme = theme === 'day' ? 'night' : 'day';
    const direction = nextTheme === 'night' ? 'to-night' : 'to-day';

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

    // Phase 1: COVERING — clouds sweep in across the entire viewport
    setTransitionMeta({ direction, targetTheme: nextTheme });
    setMachineState('COVERING');

    // Phase 2: SWITCHING — clouds cover 100% of viewport; swap theme variables cleanly
    const switchTimer = window.setTimeout(() => {
      setMachineState('SWITCHING');
      setTheme(nextTheme);
      setAnnouncement(
        nextTheme === 'night'
          ? 'Night theme enabled (Midnight Sumi Ink)'
          : 'Day theme enabled (Sunlit Aged Parchment)'
      );
    }, 520);

    // Phase 3: REVEALING — clouds part to unveil the new scene
    const revealTimer = window.setTimeout(() => {
      setMachineState('REVEALING');
    }, 680);

    // Phase 4: Return to IDLE & unmount overlay completely
    const idleTimer = window.setTimeout(() => {
      setMachineState('IDLE');
    }, 1300);

    timersRef.current = [switchTimer, revealTimer, idleTimer];
  }, [theme, machineState, clearTimers]);

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
