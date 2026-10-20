import React from 'react';

/**
 * Traditional Japanese Woodblock (Ukiyo-e) & Seigaiha Ink-Wash Wave Divider
 *
 * Uses soft vertical ink-wash gradients, curled wave crests, and antique-gold / moonlight foam contours
 * so section transitions flow like a continuous painted scroll rather than a hard block.
 */
export default function WaveDivider({ flip = false, variant = 'primary' }) {
  const gradIdBack = `waveBackGrad-${variant}-${flip ? 'f' : 'n'}`;
  const gradIdFront = `waveFrontGrad-${variant}-${flip ? 'f' : 'n'}`;

  return (
    <div
      className={`ukiyo-wave-divider ${flip ? 'wave-flipped' : ''} wave-${variant}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="ukiyo-wave-svg"
      >
        <defs>
          <linearGradient id={gradIdBack} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--wave-back)" stopOpacity="0.38" />
            <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={gradIdFront} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--wave-mid)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Distant Ink-Wash Swell */}
        <path
          d="M0,54 C180,14 340,92 540,48 C740,6 920,90 1140,44 C1280,16 1370,54 1440,38 L1440,110 L0,110 Z"
          fill={`url(#${gradIdBack})`}
        />

        {/* Mid Ukiyo-e Sculpted Swell */}
        <path
          d="M0,68 C210,28 380,98 600,58 C810,20 1010,96 1230,54 C1335,34 1395,58 1440,66 L1440,110 L0,110 Z"
          fill={`url(#${gradIdFront})`}
        />

        {/* Delicate Sumi-e Brush Contour Line */}
        <path
          d="M0,54 C180,14 340,92 540,48 C740,6 920,90 1140,44 C1280,16 1370,54 1440,38"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.2"
          opacity="0.55"
        />

        {/* Antique Gold / Moonlight Silver Crest Filigree */}
        <path
          d="M0,68 C210,28 380,98 600,58 C810,20 1010,96 1230,54 C1335,34 1395,58 1440,66"
          fill="none"
          stroke="var(--gold-accent)"
          strokeWidth="1.6"
          strokeDasharray="18 8 4 8"
          opacity="0.65"
        />
      </svg>
    </div>
  );
}
