import React, { useState } from 'react';
import { Mail, ExternalLink, Copy, Check, MapPin, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const INQUIRY_TOPICS = [
  'Embedded Systems & ESP32',
  'Mobile & Supabase Dev',
  'Computer Engineering Collaboration',
  'General Opportunity',
];

export default function ContactSection({ theme }) {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(INQUIRY_TOPICS[0]);
  const isNight = theme === 'night';

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PERSONAL_INFO.email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = PERSONAL_INFO.email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${selectedTopic} — Mark Anthony L. Duhig Jr.`
  )}`;

  return (
    <section id="contact" className="scroll-section contact-scroll-section">
      {/* Peaceful Final Scroll Artwork: Sansui-ga Ink-Wash Mountains & Sun/Moon */}
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
          <defs>
            <linearGradient id="contactMtFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--mountain-far)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="contactMtMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--mountain-mid)" stopOpacity="0.78" />
              <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M0,245 C140,195 235,115 350,118 C465,121 545,210 675,195 C805,180 890,82 1015,86 C1140,90 1265,195 1440,215 L1440,320 L0,320 Z"
            fill="url(#contactMtFar)"
          />
          <path
            d="M0,285 C260,215 540,275 860,205 C1110,152 1295,235 1440,225 L1440,320 L0,320 Z"
            fill="url(#contactMtMid)"
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
            mobile apps, or Computer Engineering collaborations, select a topic or reach me
            directly through my verified channels below.
          </p>

          {/* Interactive Inquiry Topic Selector */}
          <div className="contact-topic-selector" role="group" aria-label="Select inquiry subject">
            <span className="topic-selector-label">Subject Topic:</span>
            <div className="topic-pills-row">
              {INQUIRY_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`topic-pill-btn ${
                    selectedTopic === topic ? 'topic-active' : ''
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

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
              <p className="contact-channel-value">
                github.com/{PERSONAL_INFO.githubUsername}
              </p>
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
                href={mailtoHref}
                className="contact-channel-value contact-email-link"
              >
                {PERSONAL_INFO.email}
              </a>
              <div className="contact-email-actions">
                <a href={mailtoHref} className="btn-sumi-primary btn-xs">
                  <Send size={13} /> Compose ({selectedTopic.split(' ')[0]})
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn-sumi-secondary btn-xs"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
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
              <span className="contact-channel-hint">{PERSONAL_INFO.degree}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
