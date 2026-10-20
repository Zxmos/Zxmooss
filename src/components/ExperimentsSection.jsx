import React from 'react';
import { FlaskConical } from 'lucide-react';
import { EXPERIMENTS } from '../data/portfolioData';

export default function ExperimentsSection() {
  return (
    <section id="experiments" className="scroll-section workshop-scroll-section">
      <div className="scroll-container">
        <div className="scroll-section-header">
          <span className="section-scroll-tag">Chapter IV • 試</span>
          <h2 className="section-brush-title">The Artist’s Workshop &amp; Field Notes</h2>
          <p className="section-brush-subtitle">
            An informal workbench of ongoing circuit tests, sensor calibrations, database
            sketches, and hardware explorations—distinct from completed projects.
          </p>
        </div>

        <div className="workshop-notes-grid">
          {EXPERIMENTS.map((item) => (
            <article key={item.id} className="workshop-sketch-card">
              {/* Top Bamboo Paper Tape Label */}
              <div className="sketch-paper-tape" aria-hidden="true" />

              <div className="sketch-card-meta">
                <span className="sketch-tag">
                  <FlaskConical size={13} /> {item.tag}
                </span>
                <span className="sketch-status-badge">{item.status}</span>
              </div>

              <h3 className="sketch-title">{item.title}</h3>
              <p className="sketch-notes">{item.notes}</p>

              <div className="sketch-tools-strip">
                {item.tools.map((tool) => (
                  <span key={tool} className="sketch-tool-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
