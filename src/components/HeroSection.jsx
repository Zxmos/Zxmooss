import React, { useState } from 'react';
import { ArrowDownRight, ExternalLink, MapPin, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function HeroSection({ theme, githubData }) {
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
      {/* Background Living Sumi-e Landscape Artwork (Mountains, Sun/Moon, Clouds & Bamboo Grove) */}
      <div className="hero-landscape-backdrop" aria-hidden="true">
        {/* Celestial Sun (Day) or Full Moon + Stars (Night) */}
        <div className={`celestial-disc ${isNight ? 'celestial-moon' : 'celestial-sun'}`} />

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

        {/* Drifting Traditional Japanese Clouds */}
        <svg
          viewBox="0 0 1440 360"
          className="hero-drifting-clouds cloud-drift-slow"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M90,140 Q150,95 230,125 T380,120 T510,145 L90,145 Z"
            fill="var(--cloud-tint)"
            opacity="0.55"
          />
          <path
            d="M880,95 Q960,50 1060,85 T1240,80 T1360,105 L880,105 Z"
            fill="var(--cloud-tint)"
            opacity="0.45"
          />
        </svg>

        {/* Sumi-e Layered Mountain Range */}
        <svg
          viewBox="0 0 1440 460"
          preserveAspectRatio="none"
          className="hero-mountains-svg"
        >
          {/* Distant Misty Peak */}
          <path
            d="M0,360 L180,210 L350,290 L590,130 L840,280 L1110,155 L1310,265 L1440,210 L1440,460 L0,460 Z"
            fill="var(--mountain-far)"
          />
          {/* Mid Charcoal Ink Ridge */}
          <path
            d="M0,395 L260,250 L490,340 L780,195 L1030,325 L1250,235 L1440,320 L1440,460 L0,460 Z"
            fill="var(--mountain-mid)"
          />
          {/* Foreground Sumi-e Mountain Silhouette */}
          <path
            d="M0,425 C240,350 420,410 690,335 C950,265 1190,375 1440,340 L1440,460 L0,460 Z"
            fill="var(--mountain-near)"
          />
        </svg>

        {/* Left & Right Framing Bamboo Silhouette Stalks */}
        <svg
          viewBox="0 0 220 680"
          className="hero-bamboo-frame frame-left"
          preserveAspectRatio="xMinYMax meet"
        >
          <path
            d="M36,680 Q44,350 62,20"
            stroke="var(--ink-silhouette)"
            strokeWidth="5"
            fill="none"
            opacity="0.32"
          />
          <path
            d="M78,680 Q68,390 95,85"
            stroke="var(--ink-silhouette)"
            strokeWidth="3.5"
            fill="none"
            opacity="0.22"
          />
          <g className="ambient-bamboo-leaves">
            <path d="M55,140 Q95,120 130,148 Q90,154 55,140 Z" fill="var(--ink-silhouette)" opacity="0.3" />
            <path d="M52,152 Q85,172 115,195 Q78,182 52,152 Z" fill="var(--ink-silhouette)" opacity="0.24" />
            <path d="M48,290 Q92,272 125,296 Q84,302 48,290 Z" fill="var(--ink-silhouette)" opacity="0.26" />
          </g>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="scroll-container hero-grid">
        {/* Left Column: Introduction & Call to Action inside >=80% Transparent Banner */}
        <div className="hero-copy-column hero-banner">
          <div className="hero-role-banner">
            <span className="role-brush-dot" aria-hidden="true" />
            <span className="hero-role-text">{PERSONAL_INFO.role}</span>
          </div>

          <p className="hero-name-kicker">
            {PERSONAL_INFO.name}
          </p>

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
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </h1>

          <p className="hero-intro-paragraph">
            {PERSONAL_INFO.heroIntro}
          </p>

          <div className="hero-credentials-strip">
            <span className="credential-pill">
              <GraduationCap size={15} />
              <span>{PERSONAL_INFO.degree} • {PERSONAL_INFO.school}</span>
            </span>
            <span className="credential-pill">
              <MapPin size={15} />
              <span>{PERSONAL_INFO.location}</span>
            </span>
          </div>

          <div className="hero-cta-row">
            <a href="#projects" className="btn-sumi-primary">
              <span>Explore My Work</span>
              <ArrowDownRight size={17} />
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-sumi-secondary"
            >
              <span>Visit My GitHub</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Right Column: Integrated Portrait inside an Ensō Ink Circle & Hanging Scroll Frame */}
        <div className="hero-portrait-column">
          <div className="scroll-portrait-frame">
            {/* Top Wooden Scroll Rod */}
            <div className="scroll-wooden-rod rod-top" aria-hidden="true" />

            <div className="scroll-parchment-panel">
              {/* Hand-drawn SVG Ensō (Zen Ink Brush Circle) surrounding portrait */}
              <div className="enso-portrait-wrapper">
                <svg
                  viewBox="0 0 260 260"
                  className="enso-brush-ring"
                  aria-hidden="true"
                >
                  <path
                    d="M 130,16 C 195,14 246,66 244,132 C 242,196 188,246 124,244 C 60,242 14,190 18,125 C 21,72 58,28 108,19"
                    fill="none"
                    stroke="var(--ink-strong)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="680 40"
                  />
                  <path
                    d="M 130,24 C 190,24 236,72 234,132 C 232,190 184,236 124,234 C 66,232 24,184 26,125"
                    fill="none"
                    stroke="var(--gold-accent)"
                    strokeWidth="1.6"
                    strokeDasharray="12 8"
                    opacity="0.75"
                  />
                </svg>

                <div className="portrait-image-container">
                  <img
                    src={imgSrc}
                    onError={handleImageError}
                    alt="Portrait of Mark Anthony L. Duhig Jr., Computer Engineering Student"
                    className="portrait-photograph"
                  />
                </div>

                {/* Red Artist Seal Stamp (Hanko) */}
                <div className="portrait-hanko-stamp" title="Mark Anthony L. Duhig Jr.">
                  <span>{PERSONAL_INFO.sealText}</span>
                </div>
              </div>

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

            {/* Bottom Wooden Scroll Rod */}
            <div className="scroll-wooden-rod rod-bottom" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
