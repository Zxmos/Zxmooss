import React, { useState } from 'react';
import { Mail, ExternalLink, Copy, Check, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactSection({ theme }) {
  const [copied, setCopied] = useState(false);
  const isNight = theme === 'night';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="scroll-section contact-scroll-section">
      {/* Peaceful Final Scroll Artwork: Bamboo Grove, Distant Mountains & Sun/Moon */}
      <div className="contact-landscape-backdrop" aria-hidden="true">
        <div
          className={`contact-celestial-orb ${
            isNight ? 'contact-moon' : 'contact-sun'
          }`}
        />

        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="contact-mountains-svg"
        >
          <path
            d="M0,250 L210,125 L430,215 L720,90 L1010,210 L1240,120 L1440,220 L1440,320 L0,320 Z"
            fill="var(--mountain-far)"
            opacity="0.45"
          />
          <path
            d="M0,285 C310,210 620,275 940,205 C1150,165 1320,245 1440,235 L1440,320 L0,320 Z"
            fill="var(--mountain-mid)"
            opacity="0.65"
          />
        </svg>
      </div>

      <div className="scroll-container contact-scroll-wrapper">
        <div className="final-scroll-panel">
          <span className="section-scroll-tag">Final Scroll • 縁</span>

          <h2 className="contact-invitation-heading">
            “Have an idea worth building? Let’s create something meaningful.”
          </h2>

          <p className="contact-invitation-sub">
            Whether it involves embedded hardware, ESP32 sensor systems, cross-platform
            mobile apps, or Computer Engineering collaborations, you can reach me directly
            through my verified channels below.
          </p>

          {/* Final Brushstroke Divider */}
          <div className="ink-brush-divider centered-brush" aria-hidden="true" />

          <div className="contact-cards-grid">
            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-scroll-card"
            >
              <div className="contact-card-top">
                <span className="contact-seal-icon">源</span>
                <ExternalLink size={16} className="contact-ext-icon" />
              </div>
              <h3 className="contact-channel-label">GitHub Profile</h3>
              <p className="contact-channel-value">github.com/{PERSONAL_INFO.githubUsername}</p>
              <span className="contact-channel-hint">
                Explore repositories, ERecPass Mobile &amp; source code
              </span>
            </a>

            {/* Direct Email Card */}
            <div className="contact-scroll-card">
              <div className="contact-card-top">
                <span className="contact-seal-icon">信</span>
                <Mail size={16} className="contact-ext-icon" />
              </div>
              <h3 className="contact-channel-label">Electronic Mail</h3>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="contact-channel-value contact-email-link"
              >
                {PERSONAL_INFO.email}
              </a>
              <div className="contact-email-actions">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="btn-sumi-primary btn-xs"
                >
                  <Mail size={13} /> Compose Email
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn-sumi-secondary btn-xs"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* Location & Academic Base Card */}
            <div className="contact-scroll-card">
              <div className="contact-card-top">
                <span className="contact-seal-icon">処</span>
                <MapPin size={16} className="contact-ext-icon" />
              </div>
              <h3 className="contact-channel-label">Academic Base</h3>
              <p className="contact-channel-value">
                {PERSONAL_INFO.school} • {PERSONAL_INFO.location}
              </p>
              <span className="contact-channel-hint">
                {PERSONAL_INFO.degree}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
