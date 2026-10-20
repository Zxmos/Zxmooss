import React from 'react';

/**
 * Traditional Japanese Woodblock (Ukiyo-e) & Sumi-e Ink Wave Divider
 *
 * Uses aged ivory negative space, irregular ink edges, and antique gold / moonlight crests.
 */
export default function WaveDivider({ flip = false, variant = 'primary' }) {
  return (
    <div
      className={`ukiyo-wave-divider ${flip ? 'wave-flipped' : ''} wave-${variant}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 135"
        preserveAspectRatio="none"
        className="ukiyo-wave-svg"
      >
        {/* Distant Ink Swell */}
        <path
          className="wave-layer-back"
          d="M0,74 C160,18 320,120 510,64 C710,8 890,118 1110,56 C1260,14 1360,68 1440,52 L1440,135 L0,135 Z"
        />

        {/* Mid Woodblock Crest with Irregular Brush Contour */}
        <path
          className="wave-layer-mid"
          d="M0,92 C190,42 340,124 560,78 C770,34 980,120 1210,72 C1320,50 1390,74 1440,86 L1440,135 L0,135 Z"
        />

        {/* Antique Gold / Silver Moonlight Foam Line */}
        <path
          className="wave-crest-accent"
          d="M0,90 C190,40 340,122 560,76 C770,32 980,118 1210,70 C1320,48 1390,72 1440,84"
          fill="none"
          strokeWidth="2.2"
          strokeDasharray="16 8 6 6"
        />

        {/* Foreground Deep Sumi Ink Wave */}
        <path
          className="wave-layer-front"
          d="M0,108 C220,76 430,132 690,98 C930,66 1170,128 1440,96 L1440,135 L0,135 Z"
        />
      </svg>
    </div>
  );
}
