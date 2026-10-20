import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="scroll-section about-scroll-section">
      {/* Subtle Distant Ink Mountains & Bamboo Accents */}
      <div className="section-ink-decor" aria-hidden="true">
        <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className="about-distant-peaks">
          <path
            d="M0,180 L140,85 L290,145 L480,55 L710,150 L920,70 L1200,160 L1200,180 Z"
            fill="var(--mountain-far)"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="scroll-container">
        {/* Section Heading */}
        <div className="scroll-section-header">
          <span className="section-scroll-tag">Chapter I • 志</span>
          <h2 className="section-brush-title">The Person Behind the Work</h2>
          <p className="section-brush-subtitle">
            Where software logic meets physical circuits, sensors, and embedded hardware.
          </p>
        </div>

        <div className="about-scroll-layout">
          {/* Primary Parchment Biography Panel */}
          <article className="parchment-bio-panel">
            <p className="bio-lead-paragraph">
              I am <strong>{PERSONAL_INFO.name}</strong>, a 4th-year{' '}
              <strong>Bachelor of Science in Computer Engineering</strong> student at{' '}
              <strong>{PERSONAL_INFO.school}</strong> in the {PERSONAL_INFO.location}.
            </p>

            {/* Brushstroke Divider */}
            <div className="ink-brush-divider" aria-hidden="true" />

            <p className="bio-body-paragraph">
              My fascination with technology began with a simple question:{' '}
              <em>how do lines of code cross the boundary into the physical world?</em> As a
              Computer Engineering student, I enjoy working at that exact crossroads—writing
              application logic and database rules on one side, and wiring microcontrollers,
              sensors, and actuators on the other.
            </p>

            <p className="bio-body-paragraph">
              Whether I am structuring authenticated patient and appointment tables with
              Row-Level Security in <strong>ERecPass Mobile</strong> or interfacing an{' '}
              <strong>ESP32-S3</strong> with thermal arrays, digital I2S microphones, addressable
              LEDs, and haptic motors, I learn best by building, testing, and debugging real
              prototypes.
            </p>

            <div className="ink-brush-divider" aria-hidden="true" />

            <p className="bio-body-paragraph">
              Every project is a study in patience and craftsmanship—much like traditional ink
              painting. You plan the architecture, test each connection carefully, learn from
              unexpected behavior, and refine the system until hardware and software move together
              harmoniously.
            </p>
          </article>

          {/* Right Column: Engineering Ledger & Focus Scroll */}
          <aside className="about-ledger-column">
            <div className="ledger-scroll-card">
              <div className="ledger-card-header">
                <span className="ledger-seal">録</span>
                <h3 className="ledger-title">Engineering Ledger</h3>
              </div>

              <dl className="ledger-definition-list">
                <div className="ledger-row">
                  <dt>Full Name</dt>
                  <dd>{PERSONAL_INFO.name}</dd>
                </div>
                <div className="ledger-row">
                  <dt>Academic Standing</dt>
                  <dd>{PERSONAL_INFO.degree}</dd>
                </div>
                <div className="ledger-row">
                  <dt>Institution</dt>
                  <dd>{PERSONAL_INFO.school}</dd>
                </div>
                <div className="ledger-row">
                  <dt>Location</dt>
                  <dd>{PERSONAL_INFO.location}</dd>
                </div>
                <div className="ledger-row">
                  <dt>Core Interests</dt>
                  <dd>Embedded Systems, IoT, Sensors, Mobile &amp; Web Engineering</dd>
                </div>
                <div className="ledger-row">
                  <dt>GitHub</dt>
                  <dd>
                    <a
                      href={PERSONAL_INFO.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ledger-inline-link"
                    >
                      github.com/{PERSONAL_INFO.githubUsername}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="philosophy-scroll-card">
              <h3 className="philosophy-title">How I Approach Engineering</h3>
              <ol className="philosophy-steps">
                <li>
                  <strong>Observe &amp; Define:</strong> Understand the real constraint—whether
                  it is protecting patient records or reading a noisy sensor bus.
                </li>
                <li>
                  <strong>Prototype Hands-On:</strong> Wire the breadboard, write the schema, and
                  test with real inputs early.
                </li>
                <li>
                  <strong>Refine &amp; Document:</strong> Separate verified functionality from
                  work-in-progress goals honestly and clearly.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
