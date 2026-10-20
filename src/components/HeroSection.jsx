import React, { useState } from 'react';
import {
  ArrowDownRight,
  ExternalLink,
  MapPin,
  GraduationCap,
  Cpu,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import Gear5CloudPortrait from './Gear5CloudPortrait';

export default function HeroSection({ theme, transitionState, githubData }) {
  const [imgSrc, setImgSrc] = useState(PERSONAL_INFO.profilePhoto);
  const isNight = theme === 'night';
  const ghProfile = githubData?.profile;
  const ghStatus = githubData?.status;

  const handleImageError = () => {
    if (imgSrc !== PERSONAL_INFO.githubAvatar) {
      setImgSrc(PERSONAL_INFO.githubAvatar);
    }
  };

  return (
    <section id="home" className="hero-scroll-section">
      {/* Background Living Sumi-e Landscape Artwork (Sansui-ga Mountains, Sun/Moon, Kasumi Clouds & Bamboo Grove) */}
      <div className="hero-landscape-backdrop" aria-hidden="true">
        {/* Celestial Sun (Day) or Full Moon + Stars (Night) */}
        <div
          className={`celestial-disc ${
            isNight ? 'celestial-moon' : 'celestial-sun'
          }`}
        />

        {isNight && (
          <div className="night-moonlight-motes">
            <span className="mote m-1" />
            <span className="mote m-2" />
            <span className="mote m-3" />
            <span className="mote m-4" />
            <span className="mote m-5" />
            <span className="mote m-6" />
          </div>
        )}

        {/* Traditional Japanese Horizontal Kasumi (霞) Drifting Clouds */}
        <svg
          viewBox="0 0 1440 380"
          className="hero-drifting-clouds cloud-drift-slow"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Left Kasumi Scroll Cloud */}
          <g opacity="0.65">
            <path
              d="M40,125 L360,125 C395,125 410,145 385,158 C365,168 425,172 425,192 C425,212 390,220 340,220 L80,220 C45,220 30,200 55,186 C75,175 15,170 15,148 C15,132 25,125 40,125 Z"
              fill="var(--cloud-tint)"
            />
            <path
              d="M75,155 L340,155"
              stroke="var(--gold-accent)"
              strokeWidth="1.2"
              opacity="0.45"
            />
          </g>

          {/* Right Kasumi Scroll Cloud */}
          <g opacity="0.55">
            <path
              d="M890,82 L1250,82 C1290,82 1305,102 1278,116 C1255,126 1320,132 1320,152 C1320,172 1280,180 1225,180 L930,180 C895,180 878,160 902,146 C922,135 860,130 860,108 C860,92 872,82 890,82 Z"
              fill="var(--cloud-tint)"
            />
            <path
              d="M935,115 L1230,115"
              stroke="var(--gold-accent)"
              strokeWidth="1.2"
              opacity="0.45"
            />
          </g>
        </svg>

        {/* Sansui-ga (山水画) Ink-Wash Layered Mountain Range with Atmospheric Mist */}
        <svg
          viewBox="0 0 1440 480"
          preserveAspectRatio="none"
          className="hero-mountains-svg"
        >
          <defs>
            {/* Vertical Ink-Wash Gradients so mountain bases dissolve into mist */}
            <linearGradient id="mtFarWash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--mountain-far)" stopOpacity="0.88" />
              <stop offset="65%" stopColor="var(--mountain-far)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="mtMidWash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--mountain-mid)" stopOpacity="0.92" />
              <stop offset="72%" stopColor="var(--mountain-mid)" stopOpacity="0.48" />
              <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="mtNearWash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--mountain-near)" stopOpacity="0.95" />
              <stop offset="85%" stopColor="var(--mountain-near)" stopOpacity="0.72" />
              <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Layer 1: Distant Misty Peaks (Organic Cubic Bézier Ridgeline) */}
          <path
            d="M0,340 C95,295 155,205 235,195 C315,185 375,268 455,245 C545,220 615,108 710,104 C805,100 875,235 965,240 C1050,245 1125,138 1215,142 C1305,146 1375,235 1440,265 L1440,480 L0,480 Z"
            fill="url(#mtFarWash)"
          />

          {/* Drifting Valley Mist Ribbon 1 */}
          <path
            d="M0,295 C320,265 640,325 980,285 C1190,260 1340,295 1440,280 L1440,360 L0,360 Z"
            fill="var(--bg-canvas)"
            opacity="0.48"
          />

          {/* Layer 2: Mid Charcoal Ink Ridge + Subtle Cliffside Torii Silhouette */}
          <path
            d="M0,380 C120,340 205,238 305,232 C405,226 470,315 575,302 C680,289 755,172 860,168 C965,164 1035,288 1135,282 C1235,276 1320,210 1440,245 L1440,480 L0,480 Z"
            fill="url(#mtMidWash)"
          />

          {/* Subtle Traditional Torii Gate Silhouette on Mid-Mountain Ridge (x=850, y=148) */}
          <g transform="translate(846, 144)" opacity="0.65" fill="var(--ink-silhouette)">
            <path d="M0,6 Q14,2 28,6 L27,9 Q14,5 1,9 Z" />
            <rect x="4" y="11" width="20" height="2.2" />
            <rect x="6.5" y="8" width="2.4" height="18" />
            <rect x="19" y="8" width="2.4" height="18" />
          </g>

          {/* Drifting Valley Mist Ribbon 2 */}
          <path
            d="M0,375 C280,340 590,395 920,355 C1160,325 1320,365 1440,350 L1440,425 L0,425 Z"
            fill="var(--bg-canvas)"
            opacity="0.52"
          />

          {/* Layer 3: Foreground Sumi-e Mountain Silhouette */}
          <path
            d="M0,425 C180,370 340,415 530,365 C720,315 890,385 1090,335 C1240,298 1355,345 1440,330 L1440,480 L0,480 Z"
            fill="url(#mtNearWash)"
          />
        </svg>

        {/* Left Framing Sumi-e Bamboo Stalks & Leaves */}
        <svg
          viewBox="0 0 240 700"
          className="hero-bamboo-frame frame-left"
          preserveAspectRatio="xMinYMax meet"
        >
          {/* Primary Stalk with Nodes */}
          <path
            d="M34,700 Q42,480 52,270 Q62,120 76,15"
            stroke="var(--ink-silhouette)"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.28"
          />
          <path d="M39,520 L49,518 M46,360 L56,358 M55,210 L65,208" stroke="var(--ink-silhouette)" strokeWidth="2.5" opacity="0.38" />

          {/* Secondary Slender Stalk */}
          <path
            d="M72,700 Q66,460 84,240 Q96,130 112,55"
            stroke="var(--ink-silhouette)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.2"
          />

          {/* Painterly Multi-Blade Bamboo Leaf Clusters */}
          <g className="ambient-bamboo-leaves" fill="var(--ink-silhouette)">
            <path d="M58,145 Q98,122 142,146 Q98,154 58,145 Z" opacity="0.28" />
            <path d="M56,150 Q92,168 128,196 Q84,180 56,150 Z" opacity="0.22" />
            <path d="M54,148 Q74,182 88,218 Q64,190 54,148 Z" opacity="0.18" />

            <path d="M48,295 Q92,274 134,298 Q88,306 48,295 Z" opacity="0.24" />
            <path d="M47,300 Q80,320 112,346 Q74,332 47,300 Z" opacity="0.19" />
          </g>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="scroll-container hero-grid">
        {/* Left Column: Introduction & Call to Action inside >=80% Transparent Banner */}
        <div className="hero-copy-column hero-banner">
          {/* Silk-Brocade Scroll Corner Ornaments */}
          <span className="scroll-corner corner-tl" aria-hidden="true" />
          <span className="scroll-corner corner-tr" aria-hidden="true" />
          <span className="scroll-corner corner-bl" aria-hidden="true" />
          <span className="scroll-corner corner-br" aria-hidden="true" />

          <div className="hero-role-banner">
            <span className="role-brush-dot" aria-hidden="true" />
            <span className="hero-role-text">{PERSONAL_INFO.role}</span>
          </div>

          <p className="hero-name-kicker">{PERSONAL_INFO.name}</p>

          <h1 className="hero-main-heading">
            <span className="heading-ink-reveal">
              {PERSONAL_INFO.heroHeading}
            </span>
            <svg
              viewBox="0 0 420 18"
              className="heading-brush-underline"
              aria-hidden="true"
            >
              <path
                d="M4,12 C110,4 275,16 414,7"
                stroke="var(--gold-accent)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </h1>

          <p className="hero-intro-paragraph">{PERSONAL_INFO.heroIntro}</p>

          <div className="hero-credentials-strip">
            <span className="credential-pill">
              <GraduationCap size={15} />
              <span>
                {PERSONAL_INFO.degree} • {PERSONAL_INFO.school}
              </span>
            </span>
            <span className="credential-pill">
              <MapPin size={15} />
              <span>{PERSONAL_INFO.location}</span>
            </span>
          </div>

          {/* Verified Engineering Highlights Strip */}
          <div className="hero-highlights-grid">
            <div className="hero-highlight-item">
              <Cpu size={15} className="highlight-icon" />
              <div>
                <span className="highlight-title">Embedded &amp; IoT</span>
                <span className="highlight-sub">ESP32-S3 • I2C / I2S Sensors</span>
              </div>
            </div>
            <div className="hero-highlight-item">
              <ShieldCheck size={15} className="highlight-icon" />
              <div>
                <span className="highlight-title">Cloud &amp; Security</span>
                <span className="highlight-sub">Supabase Auth • PostgreSQL RLS</span>
              </div>
            </div>
            <div className="hero-highlight-item">
              <Code2 size={15} className="highlight-icon" />
              <div>
                <span className="highlight-title">Cross-Platform</span>
                <span className="highlight-sub">React 19 • Capacitor Mobile</span>
              </div>
            </div>
          </div>

          <div className="hero-cta-row">
            <a href="#projects" className="btn-sumi-primary">
              <span>Explore Engineering Scrolls</span>
              <ArrowDownRight size={17} />
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-sumi-secondary"
            >
              <span>GitHub (@{PERSONAL_INFO.githubUsername})</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Right Column: Integrated Portrait inside an Ensō Ink Circle & Hanging Kakejiku Scroll Frame */}
        <div className="hero-portrait-column">
          <div className="scroll-portrait-frame">
            {/* Hanging Silk Cord */}
            <div className="kakejiku-hanging-cord" aria-hidden="true" />

            {/* Top Wooden Scroll Rod with Bone/Gold Finials */}
            <div className="scroll-wooden-rod rod-top" aria-hidden="true" />

            <div className="scroll-parchment-panel">
              <span className="kakejiku-subtitle-tag">
                {isNight
                  ? 'Gear 5 Liberation Form • ギア5'
                  : 'Computer Engineering Kakejiku • 掛軸'}
              </span>

              {/* Gear 5 Cloud Frame & Straw Hat Portrait */}
              <Gear5CloudPortrait
                theme={theme}
                transitionState={transitionState}
                imgSrc={imgSrc}
                onImageError={handleImageError}
              />

              <div className="portrait-scroll-caption">
                <p className="caption-name">{PERSONAL_INFO.name}</p>
                <p className="caption-detail">
                  4th Year BSCpE • {PERSONAL_INFO.school}
                </p>
                <p className="caption-handle">
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="github-live-pill"
                  >
                    <span
                      className={`gh-sync-dot ${
                        ghStatus === 'live' || ghStatus === 'cached'
                          ? 'gh-online'
                          : 'gh-fallback'
                      }`}
                      aria-hidden="true"
                    />
                    <span>
                      @{PERSONAL_INFO.githubUsername}
                      {ghProfile?.public_repos
                        ? ` • ${ghProfile.public_repos} Public Repos`
                        : ''}
                    </span>
                  </a>
                </p>
              </div>
            </div>

            {/* Bottom Wooden Scroll Roller Rod */}
            <div className="scroll-wooden-rod rod-bottom" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
