import React, { useState, useEffect } from 'react';
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
 * Custom Japanese Ink + Technical Schematic Artwork for each project
 */
function ProjectInkIllustration({ projectId }) {
  if (projectId === 'erecpass-mobile') {
    return (
      <svg
        viewBox="0 0 520 240"
        className="project-ink-illustration"
        role="img"
        aria-label="Ink illustration of ERecPass Mobile architecture connecting Mobile UI, Supabase Auth, and PostgreSQL RLS"
      >
        {/* Aged Parchment Grid & Ink Wash */}
        <path
          d="M15,195 Q140,165 270,190 T505,180 L505,235 L15,235 Z"
          fill="var(--mountain-far)"
          opacity="0.35"
        />
        {/* Node 1: Mobile Scroll Card */}
        <g transform="translate(36, 38)">
          <rect
            x="0"
            y="0"
            width="105"
            height="145"
            rx="6"
            fill="var(--bg-scroll-panel)"
            stroke="var(--ink-strong)"
            strokeWidth="2.2"
          />
          <line x1="20" y1="22" x2="85" y2="22" stroke="var(--gold-accent)" strokeWidth="3" />
          <circle cx="52" cy="58" r="18" fill="none" stroke="var(--bamboo-green)" strokeWidth="2" />
          <path d="M45,58 L50,63 L61,52" stroke="var(--bamboo-green)" strokeWidth="2.2" fill="none" />
          <line x1="22" y1="95" x2="83" y2="95" stroke="var(--ink-muted)" strokeWidth="2" />
          <line x1="22" y1="112" x2="68" y2="112" stroke="var(--ink-muted)" strokeWidth="2" />
          <text x="52" y="135" textAnchor="middle" fontSize="10" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            Capacitor UI
          </text>
        </g>

        {/* Flowing Ink Brush Connection 1 */}
        <path
          d="M148,110 C175,95 190,95 215,110"
          stroke="var(--gold-accent)"
          strokeWidth="2.5"
          strokeDasharray="5 4"
          fill="none"
        />

        {/* Node 2: Supabase Auth Gate (Torii-inspired Seal) */}
        <g transform="translate(220, 52)">
          <rect
            x="0"
            y="0"
            width="96"
            height="115"
            rx="4"
            fill="var(--bg-scroll-panel)"
            stroke="var(--ink-strong)"
            strokeWidth="2"
          />
          <path d="M12,24 L84,24 M18,32 L78,32" stroke="var(--seal-red)" strokeWidth="3" strokeLinecap="round" />
          <text x="48" y="64" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink-strong)">
            auth.uid()
          </text>
          <text x="48" y="84" textAnchor="middle" fontSize="9.5" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            Supabase Auth
          </text>
        </g>

        {/* Flowing Ink Brush Connection 2 */}
        <path
          d="M322,110 C345,125 362,125 384,110"
          stroke="var(--bamboo-green)"
          strokeWidth="2.5"
          strokeDasharray="5 4"
          fill="none"
        />

        {/* Node 3: PostgreSQL RLS Vault */}
        <g transform="translate(388, 38)">
          <rect
            x="0"
            y="0"
            width="104"
            height="145"
            rx="4"
            fill="var(--bg-scroll-panel)"
            stroke="var(--ink-strong)"
            strokeWidth="2.2"
          />
          <text x="52" y="30" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--gold-accent)" fontFamily="var(--font-mono)">
            PostgreSQL
          </text>
          <rect x="14" y="44" width="76" height="28" rx="3" fill="none" stroke="var(--bamboo-green)" strokeWidth="1.5" />
          <text x="52" y="62" textAnchor="middle" fontSize="9.5" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            patients (RLS)
          </text>
          <rect x="14" y="82" width="76" height="28" rx="3" fill="none" stroke="var(--bamboo-green)" strokeWidth="1.5" />
          <text x="52" y="100" textAnchor="middle" fontSize="9.5" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            appointments
          </text>
          <text x="52" y="132" textAnchor="middle" fontSize="9" fill="var(--ink-muted)">
            Scoped by User ID
          </text>
        </g>
      </svg>
    );
  }

  if (projectId === 'esp32-s3-sensor-system') {
    return (
      <svg
        viewBox="0 0 520 240"
        className="project-ink-illustration"
        role="img"
        aria-label="Ink schematic of ESP32-S3 connected to AMG8833 thermal sensor, INMP441 microphone, WS2812B LED, vibration motor, push button, and 18650 battery"
      >
        {/* Background Ink Wave Wash */}
        <path
          d="M10,200 Q160,170 310,198 T510,185 L510,235 L10,235 Z"
          fill="var(--mountain-far)"
          opacity="0.35"
        />

        {/* Left Inputs: AMG8833, INMP441, Push Button */}
        <g transform="translate(22, 24)">
          <rect x="0" y="0" width="128" height="44" rx="4" fill="var(--bg-scroll-panel)" stroke="var(--ink-strong)" strokeWidth="1.8" />
          <text x="64" y="20" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--ink-strong)">AMG8833 Thermal</text>
          <text x="64" y="35" textAnchor="middle" fontSize="9" fill="var(--gold-accent)" fontFamily="var(--font-mono)">I2C 8x8 IR Matrix</text>

          <rect x="0" y="62" width="128" height="44" rx="4" fill="var(--bg-scroll-panel)" stroke="var(--ink-strong)" strokeWidth="1.8" />
          <text x="64" y="82" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--ink-strong)">INMP441 Mic</text>
          <text x="64" y="97" textAnchor="middle" fontSize="9" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">I2S Digital Audio</text>

          <rect x="0" y="124" width="128" height="44" rx="4" fill="var(--bg-scroll-panel)" stroke="var(--ink-strong)" strokeWidth="1.8" />
          <text x="64" y="144" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--ink-strong)">Push Button</text>
          <text x="64" y="159" textAnchor="middle" fontSize="9" fill="var(--ink-muted)" fontFamily="var(--font-mono)">GPIO Trigger Input</text>
        </g>

        {/* Center MCU: ESP32-S3 */}
        <g transform="translate(198, 42)">
          <rect x="0" y="0" width="124" height="148" rx="6" fill="var(--bg-scroll-panel)" stroke="var(--ink-strong)" strokeWidth="2.6" />
          <rect x="16" y="16" width="92" height="58" rx="3" fill="none" stroke="var(--gold-accent)" strokeWidth="1.6" />
          <text x="62" y="44" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-mono)">
            ESP32-S3
          </text>
          <text x="62" y="62" textAnchor="middle" fontSize="8.5" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
            Built-in RGB LED
          </text>
          <line x1="20" y1="96" x2="104" y2="96" stroke="var(--border-ink)" strokeWidth="1.5" />
          <text x="62" y="116" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">
            18650 Li-Ion
          </text>
          <text x="62" y="132" textAnchor="middle" fontSize="8.5" fill="var(--ink-muted)">
            Portable Power Rail
          </text>
        </g>

        {/* Right Outputs: WS2812B & Vibration Motor */}
        <g transform="translate(370, 38)">
          <rect x="0" y="0" width="128" height="62" rx="4" fill="var(--bg-scroll-panel)" stroke="var(--ink-strong)" strokeWidth="1.8" />
          <text x="64" y="25" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--ink-strong)">WS2812B RGB LED</text>
          <text x="64" y="43" textAnchor="middle" fontSize="9" fill="var(--gold-accent)" fontFamily="var(--font-mono)">Visual Status Pulse</text>

          <rect x="0" y="84" width="128" height="62" rx="4" fill="var(--bg-scroll-panel)" stroke="var(--ink-strong)" strokeWidth="1.8" />
          <text x="64" y="109" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--ink-strong)">Vibration Motor</text>
          <text x="64" y="127" textAnchor="middle" fontSize="9" fill="var(--bamboo-green)" fontFamily="var(--font-mono)">Haptic Alert Output</text>
        </g>

        {/* Connecting Ink Traces */}
        <path d="M150,46 L198,72 M150,108 L198,108 M150,168 L198,142" stroke="var(--gold-accent)" strokeWidth="2" fill="none" />
        <path d="M322,86 L370,68 M322,130 L370,148" stroke="var(--bamboo-green)" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 520 240"
      className="project-ink-illustration"
      role="img"
      aria-label="Sumi-e landscape and bamboo scroll illustration"
    >
      <circle cx="410" cy="68" r="34" fill="var(--gold-accent)" opacity="0.55" />
      <path
        d="M0,185 L120,95 L245,155 L390,72 L520,165 L520,240 L0,240 Z"
        fill="var(--mountain-mid)"
        opacity="0.65"
      />
      <path
        d="M0,210 C150,165 340,225 520,175 L520,240 L0,240 Z"
        fill="var(--mountain-near)"
      />
      <text x="42" y="75" fontSize="15" fontWeight="700" fill="var(--ink-strong)" fontFamily="var(--font-display)">
        Sumi-e Day &amp; Night Scroll Engine
      </text>
      <text x="42" y="102" fontSize="11" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
        React 19 • SVG Cloud Transitions • Bamboo Scroll Tracker
      </text>
    </svg>
  );
}

export default function ProjectsSection({ githubData }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const ghProfile = githubData?.profile;
  const ghRepos = githubData?.repos || [];
  const ghStatus = githubData?.status || 'loading';
  const refreshGitHub = githubData?.refreshGitHub;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="scroll-section projects-scroll-section">
      <div className="scroll-container">
        <div className="scroll-section-header">
          <span className="section-scroll-tag">Chapter III • 作</span>
          <h2 className="section-brush-title">Paintings of Engineering</h2>
          <p className="section-brush-subtitle">
            Each project is documented with its real architecture, verified hardware and
            software components, engineering challenges, and transparent development status.
          </p>
        </div>

        <div className="projects-scroll-list">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={`project-scroll-masterpiece ${
                project.featured ? 'project-featured' : ''
              }`}
            >
              {/* Decorative Drifting Cloud Accent on Hover */}
              <div className="project-hover-cloud" aria-hidden="true" />

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
                  <span className="bamboo-hover-leaf" aria-hidden="true">
                    🎋
                  </span>
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
                    <span>Inspect Full Engineering Scroll</span>
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
