import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom Floating Cloud & Ruby-Spark Cursor Follower
 *
 * - Activates only on fine-pointer desktop/laptop devices (`(pointer: fine)`).
 * - Automatically disabled when `prefers-reduced-motion: reduce` is active or on touch screens.
 * - Uses requestAnimationFrame and GPU-accelerated translate3d() with pointer-events: none.
 */
export default function CloudCursor({ theme }) {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const finePointer =
      window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    const reducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      return undefined;
    }

    const enableTimer = window.setTimeout(() => setEnabled(true), 0);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = null;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const targetEl = e.target;
      if (targetEl && typeof targetEl.closest === 'function') {
        const interactive = Boolean(
          targetEl.closest('a, button, input, textarea, select, [role="tab"]')
        );
        setIsHoveringInteractive(interactive);
      }
    };

    const animateCursor = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = window.requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = window.requestAnimationFrame(animateCursor);

    return () => {
      window.clearTimeout(enableTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  if (!enabled) return null;

  const isNight = theme === 'night';

  return (
    <div
      ref={cursorRef}
      className={`custom-cloud-cursor ${isNight ? 'cursor-night' : 'cursor-day'} ${
        isHoveringInteractive ? 'cursor-interactive' : ''
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 32" className="cloud-cursor-svg">
        <path
          d="M12,24 C7.5,24 4,20.8 4,16.8 C4,13.2 6.8,10.2 10.4,9.8 C11.8,6.2 15.5,3.8 19.8,3.8 C25.2,3.8 29.6,7.8 30.2,13 C33.5,13.4 36,16.1 36,19.4 C36,22.9 33.1,24 29.5,24 Z"
          fill={isNight ? 'rgba(255, 255, 255, 0.88)' : 'rgba(232, 221, 197, 0.92)'}
          stroke={isNight ? 'var(--seal-red)' : 'var(--gold-accent)'}
          strokeWidth="1.6"
        />
        <circle
          cx="38"
          cy="8"
          r="2.4"
          fill="var(--seal-red)"
          className="cursor-ruby-mote"
        />
      </svg>
    </div>
  );
}
