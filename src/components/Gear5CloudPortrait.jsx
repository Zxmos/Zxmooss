import React, { useState, useEffect, useMemo } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Deterministic Gear 5 transformation particle sparks (white vapor puffs + ruby-red liberation sparks)
const GEAR5_SPARKS = [
  { id: 's1', dx: -68, dy: -45, size: 7.5, color: '#FFFFFF', delay: '0ms', type: 'cloud' },
  { id: 's2', dx: 72, dy: -38, size: 6.0, color: 'var(--seal-red)', delay: '40ms', type: 'spark' },
  { id: 's3', dx: -78, dy: 35, size: 8.0, color: '#FFFDF7', delay: '75ms', type: 'cloud' },
  { id: 's4', dx: 65, dy: 48, size: 5.5, color: 'var(--seal-red)', delay: '25ms', type: 'spark' },
  { id: 's5', dx: 0, dy: -82, size: 9.0, color: '#FFFFFF', delay: '90ms', type: 'cloud' },
  { id: 's6', dx: -45, dy: -70, size: 4.8, color: 'var(--seal-red)', delay: '60ms', type: 'spark' },
  { id: 's7', dx: 52, dy: -68, size: 7.0, color: '#FFFDF7', delay: '110ms', type: 'cloud' },
  { id: 's8', dx: -18, dy: 84, size: 6.5, color: 'var(--seal-red)', delay: '30ms', type: 'spark' },
  { id: 's9', dx: 38, dy: 78, size: 8.5, color: '#FFFFFF', delay: '85ms', type: 'cloud' },
];

/**
 * Dual-Portrait Gear 5 Cloud Transformation Component
 *
 * - Light Mode (Day): Displays Mark's headphones portrait (./images/profile-headphones.png)
 *   with a restrained cloud border and aged-canvas / ruby-red accents.
 * - Dark Mode (Night): Displays Mark's straw-hat portrait (./images/profile-strawhat.png)
 *   with the animated white Gear 5 cloud border (Hagoromo), floating particles, and ruby sparks.
 * - Preloads both portraits in memory and keeps both mounted in stacked layers so swapping
 *   during the cloud transition has 0ms decode lag and zero layout shift.
 */
export default function Gear5CloudPortrait({ theme, transitionState }) {
  const [lightSrc, setLightSrc] = useState(
    PERSONAL_INFO.profilePhotoLight || './images/profile-headphones.png'
  );
  const [darkSrc, setDarkSrc] = useState(
    PERSONAL_INFO.profilePhotoDark || './images/profile-strawhat.png'
  );

  // Preload both portraits on mount for instantaneous zero-flicker switching
  useEffect(() => {
    const imgLight = new Image();
    imgLight.src = lightSrc;
    const imgDark = new Image();
    imgDark.src = darkSrc;
  }, [lightSrc, darkSrc]);

  const handleLightError = () => {
    if (lightSrc !== './images/profile-headphones.webp') {
      setLightSrc('./images/profile-headphones.webp');
    } else if (lightSrc !== PERSONAL_INFO.githubAvatar) {
      setLightSrc(PERSONAL_INFO.githubAvatar);
    }
  };

  const handleDarkError = () => {
    if (darkSrc !== './images/profile-strawhat.jpg') {
      setDarkSrc('./images/profile-strawhat.jpg');
    } else if (darkSrc !== PERSONAL_INFO.githubAvatar) {
      setDarkSrc(PERSONAL_INFO.githubAvatar);
    }
  };

  const isNight = theme === 'night';
  const isTransforming = Boolean(transitionState?.active);
  const isToNight = transitionState?.direction === 'to-night';
  const isToDay = transitionState?.direction === 'to-day';

  const transformationClass = useMemo(() => {
    if (isTransforming && isToNight) {
      return 'gear5-transforming-to-night';
    }
    if (isTransforming && isToDay) {
      return 'gear5-transforming-to-day';
    }
    return isNight ? 'gear5-mode-night' : 'gear5-mode-day';
  }, [isTransforming, isToNight, isToDay, isNight]);

  return (
    <div
      className={`gear5-portrait-container ${transformationClass}`}
      role="figure"
      aria-label={
        isNight
          ? 'Portrait of Mark Anthony L. Duhig Jr. wearing straw hat with Gear 5 cloud border'
          : 'Portrait of Mark Anthony L. Duhig Jr. wearing headphones'
      }
    >
      {/* Outer Floating Gear 5 Cloud Hagoromo Scarf (SVG Organic Billowing Clouds) */}
      <div className="gear5-hagoromo-wrapper" aria-hidden="true">
        <svg
          viewBox="0 0 340 340"
          className="gear5-cloud-scarf-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gear5CloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#FFFDF7" />
              <stop offset="85%" stopColor="#F5EFE2" />
              <stop offset="100%" stopColor="#E4D7C2" />
            </linearGradient>

            <radialGradient id="gear5AuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="60%" stopColor="var(--gold-soft)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <filter id="gear5VaporGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Ambient Celestial Cloud Aura */}
          <circle
            cx="170"
            cy="170"
            r="142"
            fill="url(#gear5AuraGrad)"
            className="gear5-aura-backdrop"
          />

          {/* Primary Swirling Cloud Scarf (Hagoromo 飛衣) Outer Ring */}
          <g className="gear5-cloud-outer-swirl" filter="url(#gear5VaporGlow)">
            <path
              d="M170,30 C215,22 255,48 274,86 C292,122 284,158 266,182 C252,200 248,222 260,244 C272,266 260,294 234,306 C206,318 175,302 162,284 C150,268 135,274 120,290 C96,312 60,306 44,280 C28,252 40,220 62,204 C78,192 84,172 74,154 C60,130 68,98 94,82 C116,68 144,78 158,95 C164,102 172,100 174,90 C178,65 158,35 170,30 Z"
              fill="url(#gear5CloudGrad)"
              opacity="0.94"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />

            <path
              d="M176,46 C210,40 245,62 258,94 C270,124 260,150 244,170 C228,190 226,215 238,236 C248,255 238,278 218,288 C195,298 170,286 160,270"
              fill="none"
              stroke="rgba(23, 23, 20, 0.12)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M125,272 C104,288 75,282 62,262 C48,240 58,214 76,200 C92,188 96,168 86,150 C74,130 82,106 102,94"
              fill="none"
              stroke="rgba(23, 23, 20, 0.12)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>

          {/* Secondary Swirling Vapor Filaments with Ruby-Red Liberation Sparkles */}
          <g className="gear5-cloud-inner-drift">
            <path
              d="M140,55 C185,42 225,68 238,102 C250,135 234,168 215,188"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M102,230 C85,255 96,282 124,288 C155,294 178,275 190,250"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            <circle cx="282" cy="115" r="4.2" fill="var(--seal-red)" className="ruby-spark s-1" />
            <circle cx="58" cy="235" r="3.8" fill="var(--seal-red)" className="ruby-spark s-2" />
            <circle cx="240" cy="275" r="3.2" fill="var(--gold-accent)" className="ruby-spark s-3" />
          </g>
        </svg>
      </div>

      {/* Center Portrait Image Frame (Dual Preloaded Portraits: Headphones in Day, Straw-Hat in Night) */}
      <div className="gear5-photo-frame">
        <div className="gear5-inner-halo" aria-hidden="true" />

        <div className="gear5-image-clipper">
          {/* Light Mode Portrait: Headphones Photograph */}
          <img
            src={lightSrc}
            onError={handleLightError}
            alt="Mark Anthony L. Duhig Jr. wearing headphones (Light Mode portrait)"
            className={`gear5-actual-portrait portrait-layer-light ${
              !isNight ? 'portrait-layer-active' : 'portrait-layer-hidden'
            }`}
            loading="eager"
          />

          {/* Dark Mode Portrait: Straw-Hat Photograph */}
          <img
            src={darkSrc}
            onError={handleDarkError}
            alt="Mark Anthony L. Duhig Jr. wearing straw hat (Dark Mode Gear 5 portrait)"
            className={`gear5-actual-portrait portrait-layer-dark ${
              isNight ? 'portrait-layer-active' : 'portrait-layer-hidden'
            }`}
            loading="eager"
          />

          {/* Local Cloud Curtain that veils the portrait during the exact swap moment */}
          <div
            className={`portrait-swap-cloud-veil ${
              isTransforming ? 'veil-covering' : ''
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Hanko Seal Badge (Ruby Red) */}
        <div
          className="gear5-hanko-seal"
          title="Mark Anthony L. Duhig Jr. — Engineer Seal"
          aria-hidden="true"
        >
          <span>{PERSONAL_INFO.sealText}</span>
        </div>
      </div>

      {/* Gear 5 Burst Particles (Sparks & Cloud Puffs on Mode Activation) */}
      <div className="gear5-spark-burst-stage" aria-hidden="true">
        {GEAR5_SPARKS.map((spark) => (
          <span
            key={spark.id}
            className={`gear5-particle ${spark.type === 'spark' ? 'part-spark' : 'part-cloud'}`}
            style={{
              '--dx': `${spark.dx}px`,
              '--dy': `${spark.dy}px`,
              '--size': `${spark.size}px`,
              '--color': spark.color,
              animationDelay: spark.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
