import React, { useState, useEffect, useMemo } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  X,
  ArrowRight,
  BookOpen,
  RefreshCw,
  GitFork,
  Star,
  Code2,
} from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';

/**
 * High-Precision Engineering Schematic & Sumi-e Ink Blueprint Artwork for each project
 */
function ProjectInkIllustration({ projectId }) {
  if (projectId === 'erecpass-mobile') {
    return (
      <svg
        viewBox="0 0 540 250"
        className="project-ink-illustration"
        role="img"
        aria-label="Engineering blueprint of ERecPass Mobile connecting Capacitor Mobile Client, Supabase Auth JWT Gate, and PostgreSQL Row-Level Security tables"
      >
        <defs>
          <pattern id=" gridErec" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--border-ink)"
              strokeWidth="0.6"
              opacity="0.45"
            />
          </pattern>
        </defs>

        {/* Subtle Architectural Grid & Ink Wash Base */}
        <rect x="8" y="8" width="524" height="234" fill="url(#gridErec)" />
        <path
          d="M8,205 C140,175 310,215 532,182 L532,242 L8,242 Z"
          fill="var(--mountain-far)"
          opacity="0.28"
        />

        {/* Blueprint Header Stamp */}
        <text x="22" y="26" fontSize="8.5" fill="var(--gold-accent)" fontFamily="var(--font-mono)" letterSpacing="0.08em">
          ARCH // ERECPASS-MOBILE • HYBRID CAPACITOR + SUPABASE RLS
        </text>

        {/* Node 1: Capacitor Mobile Client */}
        <g transform="translate(24, 44)">
          <rect
            x="0"
            y="0"
            width="126"
            height="162"
            rx="4"
            fill="var(--bg-canvas)"
            stroke="var(--ink-strong)"
            strokeWidth="1.8"
          />
          <rect x="0" y="0" width="126" height="24" rx="4" fill="var(--ink-strong)" />
          <text x="63" y="15.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--bg-canvas)" fontFamily="var(--font-mono)">
            CAPACITOR 7 UI
          </text>

          {/* Emergency Status Badge Inside Screen */}
          <rect x="12" y="34" width="102" height="32" rx="3" fill="var(--bg-subpanel-glass)" stroke="var(--bamboo-green)" strokeWidth="1.2" />
          <circle cx="24" cy="50" r="4.5" fill="var(--bamboo-green)" />
          <text x="34" y="47" fontSize="8.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            PASS: GREEN
          </text>
          <text x="34" y="58" fontSize="7.5" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            Patient Verified
          </text>

          {/* LocalStorage & Sync Layer */}
          <rect x="12" y="76" width="102" height="34" rx="3" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="63" y="91" textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            Appointment Form
          </text>
          <text x="63" y="102" textAnchor="middle" fontSize="7.2" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            Offline Fallback
          </text>

          <line x1="14" y1="126" x2="112" y2="126" stroke="var(--border-ink)" strokeWidth="1" />
          <text x="63" y="142" textAnchor="middle" fontSize="8" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
            Android / iOS WebView
          </text>
        </g>

        {/* Bus 1: HTTPS / JWT Session Bus */}
        <g>
          <path
            d="M150,112 L212,112"
            stroke="var(--gold-accent)"
            strokeWidth="2"
            strokeDasharray="4 3"
            fill="none"
          />
          <polygon points="212,112 205,108 205,116" fill="var(--gold-accent)" />
          <text x="181" y="103" textAnchor="middle" fontSize="7.5" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
            JWT Bearer
          </text>
        </g>

        {/* Node 2: Supabase Auth Security Gate */}
        <g transform="translate(214, 58)">
          <rect
            x="0"
            y="0"
            width="112"
            height="134"
            rx="4"
            fill="var(--bg-canvas)"
            stroke="var(--ink-strong)"
            strokeWidth="1.8"
          />
          {/* Torii-Inspired Security Header Bar */}
          <path d="M10,18 L102,18 M16,25 L96,25" stroke="var(--seal-red)" strokeWidth="2.4" strokeLinecap="round" />
          <text x="56" y="45" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            SUPABASE AUTH
          </text>
          <rect x="14" y="56" width="84" height="28" rx="3" fill="var(--gold-soft)" stroke="var(--gold-accent)" strokeWidth="1" />
          <text x="56" y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            auth.uid()
          </text>
          <text x="56" y="104" textAnchor="middle" fontSize="7.8" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            UUID Session Policy
          </text>
          <text x="56" y="118" textAnchor="middle" fontSize="7.5" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
            RLS Enforcement
          </text>
        </g>

        {/* Bus 2: Scoped SQL Query Bus */}
        <g>
          <path
            d="M326,112 L386,112"
            stroke="var(--bamboo-green)"
            strokeWidth="2"
            strokeDasharray="4 3"
            fill="none"
          />
          <polygon points="386,112 379,108 379,116" fill="var(--bamboo-green)" />
          <text x="356" y="103" textAnchor="middle" fontSize="7.5" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
            RLS Policy
          </text>
        </g>

        {/* Node 3: PostgreSQL Relational Vault */}
        <g transform="translate(388, 44)">
          <rect
            x="0"
            y="0"
            width="128"
            height="162"
            rx="4"
            fill="var(--bg-canvas)"
            stroke="var(--ink-strong)"
            strokeWidth="1.8"
          />
          <rect x="0" y="0" width="128" height="24" rx="4" fill="var(--bamboo-deep)" />
          <text x="64" y="15.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#F5EFE2" fontFamily="var(--font-mono)">
            POSTGRESQL DB
          </text>

          <rect x="12" y="36" width="104" height="44" rx="3" fill="none" stroke="var(--bamboo-green)" strokeWidth="1.3" />
          <text x="64" y="53" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            public.patients
          </text>
          <text x="64" y="68" textAnchor="middle" fontSize="7.2" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            FK: auth_user_id
          </text>

          <rect x="12" y="90" width="104" height="44" rx="3" fill="none" stroke="var(--gold-accent)" strokeWidth="1.3" />
          <text x="64" y="107" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            public.appointments
          </text>
          <text x="64" y="122" textAnchor="middle" fontSize="7.2" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            FK: user_id (Scoped)
          </text>

          <text x="64" y="150" textAnchor="middle" fontSize="7.5" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            Strict Tenant Isolation
          </text>
        </g>
      </svg>
    );
  }

  if (projectId === 'esp32-s3-sensor-system') {
    return (
      <svg
        viewBox="0 0 540 250"
        className="project-ink-illustration"
        role="img"
        aria-label="Hardware schematic of ESP32-S3 microcontroller connected to AMG8833 thermal array, INMP441 I2S microphone, push button, WS2812B RGB LED, vibration motor, and 18650 battery"
      >
        <defs>
          <pattern id="gridEsp" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--border-ink)"
              strokeWidth="0.6"
              opacity="0.45"
            />
          </pattern>
        </defs>

        <rect x="8" y="8" width="524" height="234" fill="url(#gridEsp)" />
        <text x="22" y="25" fontSize="8.5" fill="var(--gold-accent)" fontFamily="var(--font-mono)" letterSpacing="0.08em">
          SCHEMATIC // ESP32-S3 MULTI-MODAL SENSOR &amp; HAPTIC NODE
        </text>

        {/* Left Peripherals (Inputs) */}
        <g transform="translate(20, 38)">
          {/* AMG8833 */}
          <rect x="0" y="0" width="136" height="48" rx="3" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
          <text x="12" y="19" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            AMG8833 IR 8×8
          </text>
          <text x="12" y="34" fontSize="7.8" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
            I2C Bus (SDA / SCL)
          </text>

          {/* INMP441 */}
          <rect x="0" y="60" width="136" height="48" rx="3" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
          <text x="12" y="79" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            INMP441 MEMS Mic
          </text>
          <text x="12" y="94" fontSize="7.8" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
            I2S Bus (WS / SCK / SD)
          </text>

          {/* Tactile Push Button */}
          <rect x="0" y="120" width="136" height="48" rx="3" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
          <text x="12" y="139" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            Tactile Button
          </text>
          <text x="12" y="154" fontSize="7.8" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            GPIO Hardware ISR
          </text>
        </g>

        {/* Center Microcontroller Unit: ESP32-S3 */}
        <g transform="translate(202, 38)">
          <rect x="0" y="0" width="136" height="168" rx="5" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="2.2" />
          <rect x="14" y="14" width="108" height="72" rx="3" fill="var(--bg-subpanel-glass)" stroke="var(--gold-accent)" strokeWidth="1.4" />
          <text x="68" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            ESP32-S3
          </text>
          <text x="68" y="58" textAnchor="middle" fontSize="8" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
            Dual-Core Xtensa LX7
          </text>
          <text x="68" y="74" textAnchor="middle" fontSize="7.5" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            + Onboard RGB Status LED
          </text>

          {/* Power Supply Module */}
          <rect x="14" y="100" width="108" height="52" rx="3" fill="none" stroke="var(--bamboo-green)" strokeWidth="1.3" />
          <text x="68" y="122" textAnchor="middle" fontSize="9.2" fontWeight="700" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
            18650 Li-Ion Cell
          </text>
          <text x="68" y="138" textAnchor="middle" fontSize="7.5" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            3.7V Portable Power Rail
          </text>
        </g>

        {/* Right Peripherals (Actuators & Visual/Haptic Outputs) */}
        <g transform="translate(384, 48)">
          <rect x="0" y="0" width="136" height="64" rx="3" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
          <text x="12" y="23" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            WS2812B RGB LED
          </text>
          <text x="12" y="39" fontSize="7.8" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
            800kHz Single-Wire RMT
          </text>
          <text x="12" y="53" fontSize="7.2" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            Thermal / Audio Visual Alert
          </text>

          <rect x="0" y="84" width="136" height="64" rx="3" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
          <text x="12" y="107" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            Vibration Motor
          </text>
          <text x="12" y="123" fontSize="7.8" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
            PWM / Transistor Driver
          </text>
          <text x="12" y="137" fontSize="7.2" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            Tactile Haptic Feedback
          </text>
        </g>

        {/* Signal Bus Traces */}
        <path d="M156,62 L202,62 M156,122 L202,122 M156,182 L202,162" stroke="var(--gold-accent)" strokeWidth="1.8" fill="none" />
        <path d="M338,80 L384,80 M338,148 L384,164" stroke="var(--bamboo-green)" strokeWidth="1.8" fill="none" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 540 250"
      className="project-ink-illustration"
      role="img"
      aria-label="Architecture diagram of the Sumi-e Portfolio State Machine and Bamboo Scroll Engine"
    >
      <path
        d="M8,195 C150,150 320,210 532,165 L532,242 L8,242 Z"
        fill="var(--mountain-mid)"
        opacity="0.35"
      />
      <circle cx="445" cy="72" r="32" fill="var(--gold-accent)" opacity="0.35" />

      <text x="24" y="32" fontSize="8.5" fill="var(--gold-accent)" fontFamily="var(--font-mono)" letterSpacing="0.08em">
        ENGINE // DETERMINISTIC SCROLL &amp; THEME STATE MACHINE
      </text>

      {/* State Machine Pipeline Boxes */}
      <g transform="translate(24, 56)">
        <rect x="0" y="0" width="148" height="118" rx="4" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
        <text x="74" y="26" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
          BAMBOO CONTROLLER
        </text>
        <text x="74" y="48" textAnchor="middle" fontSize="8" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
          2–12 Dynamic Segments
        </text>
        <text x="74" y="68" textAnchor="middle" fontSize="7.8" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          Scroll Up: Sprout + Burst
        </text>
        <text x="74" y="84" textAnchor="middle" fontSize="7.8" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          Scroll Down: Retract
        </text>
      </g>

      <g transform="translate(196, 56)">
        <rect x="0" y="0" width="148" height="118" rx="4" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
        <text x="74" y="26" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
          KASUMI TRANSITION
        </text>
        <text x="74" y="48" textAnchor="middle" fontSize="8" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
          IDLE → COVERING
        </text>
        <text x="74" y="66" textAnchor="middle" fontSize="8" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
          SWITCHING → REVEALING
        </text>
        <text x="74" y="86" textAnchor="middle" fontSize="7.5" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          100% Viewport Occlusion
        </text>
      </g>

      <g transform="translate(368, 56)">
        <rect x="0" y="0" width="148" height="118" rx="4" fill="var(--bg-canvas)" stroke="var(--ink-strong)" strokeWidth="1.6" />
        <text x="74" y="26" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
          LIVE GITHUB SYNC
        </text>
        <text x="74" y="48" textAnchor="middle" fontSize="8" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
          REST API v3 (@Zxmos)
        </text>
        <text x="74" y="68" textAnchor="middle" fontSize="7.8" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          Session Cache + Fallback
        </text>
        <text x="74" y="84" textAnchor="middle" fontSize="7.8" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          GitHub Pages CI/CD
        </text>
      </g>
    </svg>
  );
}

export default function ProjectsSection({ githubData }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const ghProfile = githubData?.profile;
  const ghRepos = githubData?.repos || [];
  const ghStatus = githubData?.status || 'loading';
  const refreshGitHub = githubData?.refreshGitHub;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(PROJECTS.map((p) => p.category)));
    return ['ALL', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Close modal on Escape key & lock background scroll while open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="scroll-section projects-scroll-section">
      <div className="scroll-container">
        <div className="projects-header-row">
          <div className="scroll-section-header">
            <span className="section-scroll-tag">Chapter III • 作</span>
            <h2 className="section-brush-title">Paintings of Engineering</h2>
            <p className="section-brush-subtitle">
              Each project is documented with its real architecture, verified hardware and
              software components, engineering challenges, and transparent development status.
            </p>
          </div>

          {/* Interactive Category Filter Bar */}
          <div
            className="project-filter-tabs"
            role="tablist"
            aria-label="Filter projects by engineering discipline"
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-tab-btn ${isSelected ? 'tab-active' : ''}`}
                >
                  {cat === 'ALL' ? `All Scrolls (${PROJECTS.length})` : cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="projects-scroll-list">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`project-scroll-masterpiece ${
                project.featured ? 'project-featured' : ''
              }`}
            >
              {/* Left / Top Illustration & Scroll Seal */}
              <div className="project-artwork-pane">
                <div className="project-scroll-number-banner">
                  <span className="scroll-num-kanji">{project.scrollNumber}</span>
                  <span className="scroll-category-label">{project.category}</span>
                </div>

                <div className="project-illustration-frame">
                  <ProjectInkIllustration projectId={project.id} />
                </div>

                {/* Architecture Flow Strip (Input -> Processing -> Output) */}
                <div className="architecture-flow-strip" aria-label="System Architecture Flow">
                  {project.architectureFlow.map((node, index) => (
                    <React.Fragment key={node.stage}>
                      <div className="arch-flow-step">
                        <span className="arch-step-title">{node.stage}</span>
                        <span className="arch-step-detail">{node.detail}</span>
                      </div>
                      {index < project.architectureFlow.length - 1 && (
                        <ArrowRight size={16} className="arch-flow-arrow" aria-hidden="true" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Right / Content Documentation Pane */}
              <div className="project-details-pane">
                <div className="project-status-pill">
                  <span className="status-ink-dot" aria-hidden="true" />
                  <span>{project.status}</span>
                </div>

                <h3 className="project-brush-heading">
                  <span className="project-title-text">{project.title}</span>
                  {/* Custom Sumi-e SVG Bamboo Leaf Calligraphy Ornament */}
                  <svg
                    viewBox="0 0 28 18"
                    className="bamboo-hover-ornament"
                    aria-hidden="true"
                  >
                    <path
                      d="M2,14 Q12,3 26,4 Q15,13 2,14 Z"
                      fill="var(--bamboo-green)"
                    />
                    <path
                      d="M6,15 Q16,10 24,12 Q15,17 6,15 Z"
                      fill="var(--gold-accent)"
                      opacity="0.8"
                    />
                  </svg>
                </h3>

                <p className="project-subtitle-text">{project.subtitle}</p>

                <p className="project-summary-text">{project.summary}</p>

                <div className="project-problem-role-grid">
                  <div className="project-info-box">
                    <h4 className="info-box-heading">Problem Addressed</h4>
                    <p>{project.problem}</p>
                  </div>
                  <div className="project-info-box">
                    <h4 className="info-box-heading">My Role &amp; Contribution</h4>
                    <p>{project.role}</p>
                  </div>
                </div>

                {/* Tech & Hardware Tags */}
                <div className="project-stack-group">
                  <div className="stack-row">
                    <span className="stack-label">
                      <Layers size={14} /> Software / Tech:
                    </span>
                    <div className="stack-tags">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="ink-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.hardware && project.hardware.length > 0 && (
                    <div className="stack-row">
                      <span className="stack-label">
                        <Cpu size={14} /> Hardware / Target:
                      </span>
                      <div className="stack-tags">
                        {project.hardware.map((hw) => (
                          <span key={hw} className="ink-tech-tag hardware-tag">
                            {hw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="project-actions-bar">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn-sumi-primary btn-compact"
                  >
                    <BookOpen size={15} />
                    <span>Inspect Engineering Scroll</span>
                  </button>

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-sumi-secondary btn-compact"
                    >
                      <span>GitHub Repository</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Live Connected GitHub Repository Scroll (@Zxmos) */}
        <div className="github-live-ledger" aria-label="Live GitHub Repositories">
          <div className="github-ledger-header">
            <div>
              <span className="section-scroll-tag">
                GitHub Sync • @{PERSONAL_INFO.githubUsername}
              </span>
              <h3 className="github-ledger-title">
                Live GitHub Repository Scroll
              </h3>
              <p className="github-ledger-sub">
                Directly connected to{' '}
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ledger-inline-link"
                >
                  github.com/{PERSONAL_INFO.githubUsername}
                </a>{' '}
                — automatically displaying public repositories and updates.
              </p>
            </div>

            <div className="github-ledger-actions">
              <span
                className={`github-sync-badge status-${ghStatus}`}
                title={
                  ghStatus === 'live' || ghStatus === 'cached'
                    ? 'Synced with GitHub REST API'
                    : 'Using verified local repository snapshot'
                }
              >
                <span className="gh-sync-dot gh-online" aria-hidden="true" />
                <span>
                  {ghStatus === 'loading'
                    ? 'Syncing GitHub...'
                    : ghStatus === 'live' || ghStatus === 'cached'
                    ? `Connected • ${ghProfile?.public_repos ?? ghRepos.length} Public Repos`
                    : 'Verified Local Snapshot'}
                </span>
              </span>

              {refreshGitHub && (
                <button
                  type="button"
                  onClick={refreshGitHub}
                  disabled={ghStatus === 'loading'}
                  className="btn-sumi-secondary btn-xs"
                  aria-label="Refresh GitHub repositories"
                >
                  <RefreshCw
                    size={13}
                    className={ghStatus === 'loading' ? 'spin-icon' : ''}
                  />
                  <span>Sync Now</span>
                </button>
              )}
            </div>
          </div>

          <div className="github-repos-grid">
            {ghRepos.map((repo) => {
              const updatedDate = repo.updated_at
                ? new Date(repo.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : 'Recent';

              return (
                <article key={repo.id || repo.name} className="github-repo-card">
                  <div className="github-repo-top">
                    <span className="github-repo-lang">
                      <Code2 size={13} />
                      <span>{repo.language || 'Repository'}</span>
                    </span>
                    <span className="github-repo-date">Updated {updatedDate}</span>
                  </div>

                  <h4 className="github-repo-name">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>

                  <p className="github-repo-desc">{repo.description}</p>

                  <div className="github-repo-footer">
                    <div className="github-repo-stats">
                      <span title="Stars">
                        <Star size={13} /> {repo.stargazers_count || 0}
                      </span>
                      <span title="Forks">
                        <GitFork size={13} /> {repo.forks_count || 0}
                      </span>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="github-repo-link"
                    >
                      <span>Open on GitHub</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Project Scroll Modal */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-scroll-header">
              <div>
                <span className="section-scroll-tag">
                  Scroll {selectedProject.scrollNumber} • {selectedProject.category}
                </span>
                <h3 id="modal-project-title" className="modal-project-title">
                  {selectedProject.title}
                </h3>
                <p className="modal-project-subtitle">{selectedProject.subtitle}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-scroll-body">
              <div className="modal-status-banner">
                <strong>Current Status:</strong> {selectedProject.status}
              </div>

              <div className="modal-columns">
                <div className="modal-feature-col">
                  <h4 className="modal-col-heading verified-heading">
                    <CheckCircle2 size={16} /> Implemented &amp; Verified Features
                  </h4>
                  <ul className="modal-bullet-list">
                    {selectedProject.implementedFeatures.map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-feature-col">
                  <h4 className="modal-col-heading planned-heading">
                    <Clock size={16} /> Proposed / Unfinished / Next Milestones
                  </h4>
                  <ul className="modal-bullet-list">
                    {selectedProject.inProgressFeatures.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="modal-reflection-grid">
                <div className="modal-reflection-box">
                  <h4>Engineering Challenges Encountered</h4>
                  <p>{selectedProject.challenges}</p>
                </div>
                <div className="modal-reflection-box">
                  <h4>Lessons Learned</h4>
                  <p>{selectedProject.learnings}</p>
                </div>
              </div>
            </div>

            <div className="modal-scroll-footer">
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-sumi-primary btn-compact"
                >
                  <span>View Source on GitHub</span>
                  <ExternalLink size={15} />
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="btn-sumi-secondary btn-compact"
              >
                Close Scroll
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
