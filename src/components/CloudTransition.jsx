import React from 'react';

/**
 * Full-Screen Ink-Cloud & Sumi-Smoke Theme Transition Component
 *
 * - Covers 100% of the viewport (navigation, banner, content, and artwork) during theme switch.
 * - Uses layered Japanese clouds, irregular sumi-ink washes, warm ivory, charcoal black,
 *   muted gray, and subtle bamboo-green accents moving at different speeds.
 * - Theme swap occurs while the clouds completely cover the viewport, preventing any abrupt flash.
 * - Unmounts completely once finished so no invisible overlay blocks clicks.
 */
export default function CloudTransition({ transitionState }) {
  const { active, direction, targetTheme } = transitionState;

  if (!active) return null;

  const isToNight = direction === 'to-night' || targetTheme === 'night';

  return (
    <div
      className={`ink-transition-stage ${
        isToNight ? 'direction-to-night' : 'direction-to-day'
      }`}
      aria-hidden="true"
    >
      {/* Full-viewport opaque ink & parchment wash curtain at peak coverage */}
      <div className="ink-wash-veil" />

      {/* Layer 1: Upper Sumi-e Cloud Canopy */}
      <div className="ink-cloud-band band-top">
        <svg
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
          className="cloud-svg"
        >
          <path
            d="M-160,0 L1760,0 L1760,440 C1520,560 1290,510 1060,410 C840,540 560,550 320,420 C140,510 -20,490 -160,390 Z"
            fill="var(--cloud-layer-primary)"
          />
          <path
            d="M-140,0 L1740,0 L1740,360 C1460,470 1180,450 930,340 C690,460 410,440 160,330 C20,410 -80,380 -140,310 Z"
            fill="var(--cloud-layer-secondary)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Layer 2: Center Full-Viewport Billowing Traditional Japanese Cloud Scroll */}
      <div className="ink-cloud-band band-center">
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          className="cloud-svg"
        >
          {/* Solid core body ensuring 100% viewport occlusion at mid-transition */}
          <rect
            x="-150"
            y="80"
            width="1900"
            height="740"
            fill="var(--cloud-layer-primary)"
          />
          {/* Organic billowing upper & lower cloud contours */}
          <circle cx="180" cy="160" r="240" fill="var(--cloud-layer-primary)" />
          <circle cx="520" cy="120" r="280" fill="var(--cloud-layer-secondary)" />
          <circle cx="890" cy="135" r="290" fill="var(--cloud-layer-primary)" />
          <circle cx="1260" cy="150" r="270" fill="var(--cloud-layer-secondary)" />
          <circle cx="1520" cy="180" r="240" fill="var(--cloud-layer-primary)" />

          <circle cx="240" cy="740" r="250" fill="var(--cloud-layer-secondary)" />
          <circle cx="640" cy="770" r="290" fill="var(--cloud-layer-primary)" />
          <circle cx="1040" cy="760" r="280" fill="var(--cloud-layer-secondary)" />
          <circle cx="1410" cy="735" r="250" fill="var(--cloud-layer-primary)" />

          {/* Subtle Bamboo-Green & Antique-Gold / Moonlight Mist Ribbons */}
          <path
            d="M-100,430 C220,310 540,530 880,410 C1180,300 1420,490 1700,390"
            stroke="var(--cloud-layer-accent)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M-80,520 C260,620 610,420 960,540 C1240,630 1460,470 1680,530"
            stroke="var(--bamboo-green)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Layer 3: Lower Rising Ink Mist & Mountain Fog Bank */}
      <div className="ink-cloud-band band-bottom">
        <svg
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
          className="cloud-svg"
        >
          <path
            d="M-160,600 L1760,600 L1760,170 C1510,60 1240,90 980,210 C730,70 450,80 190,200 C30,120 -70,140 -160,220 Z"
            fill="var(--cloud-layer-primary)"
          />
          <path
            d="M-140,600 L1740,600 L1740,250 C1440,140 1150,160 890,270 C620,150 340,170 90,280 Z"
            fill="var(--cloud-layer-secondary)"
            opacity="0.88"
          />
        </svg>
      </div>

      {/* Atmospheric Seal Emblem at Peak Coverage */}
      <div className="transition-emblem">
        <span className="transition-kanji">{isToNight ? '夜' : '昼'}</span>
        <span className="transition-caption">
          {isToNight ? 'Moonlit Sumi Scroll' : 'Sunlit Aged Parchment'}
        </span>
      </div>
    </div>
  );
}
