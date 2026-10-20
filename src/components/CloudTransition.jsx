import React from 'react';

/**
 * Gallery-Grade Japanese Kasumi (霞) & Sumi-e Ink Cloud Transition Overlay
 *
 * State Machine Phases (driven by useThemeTransition):
 * - COVERING: Left & right traditional Kasumi cloud banks + upper/lower ink mist converge to cover 100% of viewport.
 * - SWITCHING: Full-viewport occlusion holds while the Day/Night palette swaps seamlessly with zero flicker.
 * - REVEALING: Cloud banks part along opposite vectors, unveiling the newly transformed painting before unmounting.
 */
export default function CloudTransition({ transitionState }) {
  const { active, phase = 'COVERING', direction, targetTheme } = transitionState;

  if (!active) return null;

  const isToNight = direction === 'to-night' || targetTheme === 'night';
  const phaseClass = `phase-${phase.toLowerCase()}`;

  return (
    <div
      className={`ink-transition-stage ${
        isToNight ? 'direction-to-night' : 'direction-to-day'
      } ${phaseClass}`}
      aria-hidden="true"
    >
      {/* Full-viewport ink & parchment wash curtain guaranteeing 100% occlusion during SWITCHING */}
      <div className="ink-wash-veil" />

      {/* Wing 1 (Left-to-Center): Traditional Layered Kasumi Scroll Clouds & Ink Billows */}
      <div className="kasumi-cloud-wing wing-left">
        <svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
          className="kasumi-wing-svg"
        >
          <defs>
            <linearGradient id="kasumiGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--cloud-layer-primary)" stopOpacity="1" />
              <stop offset="82%" stopColor="var(--cloud-layer-primary)" stopOpacity="1" />
              <stop offset="96%" stopColor="var(--cloud-layer-secondary)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--cloud-layer-secondary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Deep Back Ink-Wash Cloud Bank */}
          <path
            d="M0,0 L1060,0 C1140,75 1020,145 1095,220 C1175,295 1040,380 1120,455 C1190,530 1050,615 1130,695 C1185,765 1065,835 1110,900 L0,900 Z"
            fill="url(#kasumiGradLeft)"
          />

          {/* Secondary Sculpted Ukiyo-e Kasumi Cloud Band */}
          <path
            d="M0,60 L920,60 C995,60 1030,115 975,155 C925,190 1045,215 1065,280 C1085,345 960,385 1015,445 C1070,505 1095,580 1010,635 C940,680 1045,745 990,810 L0,840 Z"
            fill="var(--cloud-layer-secondary)"
            opacity="0.92"
          />

          {/* Traditional Japanese Horizontal Kasumi Cloud Strips (霞) */}
          <g className="kasumi-scroll-bars" opacity="0.88">
            <path
              d="M-40,185 L840,185 C895,185 920,215 880,235 C850,250 935,255 935,285 C935,315 885,325 820,325 L-40,325 Z"
              fill="var(--cloud-layer-primary)"
              stroke="var(--cloud-layer-accent)"
              strokeWidth="1.8"
            />
            <path
              d="M-40,540 L890,540 C950,540 975,570 930,595 C895,612 985,620 985,650 C985,682 925,692 860,692 L-40,692 Z"
              fill="var(--cloud-layer-primary)"
              stroke="var(--cloud-layer-accent)"
              strokeWidth="1.8"
            />
          </g>

          {/* Gold-Leaf (Kimpaku) & Bamboo Mist Brush Filaments */}
          <path
            d="M40,260 C280,210 520,310 820,245 C920,222 995,260 1045,250"
            stroke="var(--cloud-layer-accent)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M80,625 C340,680 590,575 870,635 C955,655 1015,625 1060,635"
            stroke="var(--bamboo-green)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* Wing 2 (Right-to-Center): Mirroring Layered Kasumi Scroll Clouds & Ink Billows */}
      <div className="kasumi-cloud-wing wing-right">
        <svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
          className="kasumi-wing-svg"
        >
          <defs>
            <linearGradient id="kasumiGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--cloud-layer-primary)" stopOpacity="1" />
              <stop offset="82%" stopColor="var(--cloud-layer-primary)" stopOpacity="1" />
              <stop offset="96%" stopColor="var(--cloud-layer-secondary)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--cloud-layer-secondary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Deep Back Ink-Wash Cloud Bank */}
          <path
            d="M1200,0 L140,0 C60,75 180,145 105,220 C25,295 160,380 80,455 C10,530 150,615 70,695 C15,765 135,835 90,900 L1200,900 Z"
            fill="url(#kasumiGradRight)"
          />

          {/* Secondary Sculpted Ukiyo-e Kasumi Cloud Band */}
          <path
            d="M1200,50 L280,50 C205,50 170,110 225,150 C275,185 155,215 135,280 C115,345 240,385 185,445 C130,505 105,580 190,635 C260,680 155,745 210,815 L1200,845 Z"
            fill="var(--cloud-layer-secondary)"
            opacity="0.92"
          />

          {/* Traditional Japanese Horizontal Kasumi Cloud Strips (霞) */}
          <g className="kasumi-scroll-bars" opacity="0.88">
            <path
              d="M1240,340 L340,340 C285,340 260,370 300,390 C330,405 245,410 245,440 C245,470 295,480 360,480 L1240,480 Z"
              fill="var(--cloud-layer-primary)"
              stroke="var(--cloud-layer-accent)"
              strokeWidth="1.8"
            />
            <path
              d="M1240,680 L390,680 C330,680 305,710 350,735 C385,752 295,760 295,790 C295,822 355,832 420,832 L1240,832 Z"
              fill="var(--cloud-layer-primary)"
              stroke="var(--cloud-layer-accent)"
              strokeWidth="1.8"
            />
          </g>

          {/* Gold-Leaf (Kimpaku) & Bamboo Mist Brush Filaments */}
          <path
            d="M1160,410 C920,360 680,460 380,395 C280,372 205,410 155,400"
            stroke="var(--cloud-layer-accent)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M1120,755 C860,810 610,705 330,765 C245,785 185,755 140,765"
            stroke="var(--bamboo-green)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* Central Ensō & Hanko Seal Medallion at Peak Coverage */}
      <div className="transition-emblem">
        <div className="transition-enso-ring">
          <svg viewBox="0 0 120 120" className="transition-enso-svg">
            <path
              d="M60,10 C88,9 111,32 110,61 C109,89 85,111 57,110 C29,109 9,86 11,58 C13,34 31,15 52,11"
              fill="none"
              stroke="var(--antique-gold)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="280 24"
            />
          </svg>
          <span className="transition-kanji">{isToNight ? '夜' : '昼'}</span>
        </div>
        <span className="transition-caption">
          {isToNight ? 'Moonlit Sumi Scroll' : 'Sunlit Aged Parchment'}
        </span>
      </div>
    </div>
  );
}
