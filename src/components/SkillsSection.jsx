import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-section skills-scroll-section">
      <div className="scroll-container">
        <div className="scroll-section-header">
          <span className="section-scroll-tag">Chapter II • 技</span>
          <h2 className="section-brush-title">Tools of the Craft</h2>
          <p className="section-brush-subtitle">
            Just as a sumi-e painter relies on brush, inkstone, and paper, these are the
            verified languages, hardware components, and platforms used across my engineering work.
          </p>
        </div>

        <div className="skills-scroll-grid">
          {SKILL_CATEGORIES.map((category) => (
            <article key={category.id} className="skill-parchment-card">
              {/* Top Bamboo Joint Accent Bar */}
              <div className="bamboo-joint-divider" aria-hidden="true">
                <span className="joint-node" />
              </div>

              <div className="skill-card-head">
                <span className="skill-kanji-badge" aria-hidden="true">
                  {category.kanji}
                </span>
                <div>
                  <h3 className="skill-category-name">{category.title}</h3>
                  <p className="skill-category-sub">{category.subtitle}</p>
                </div>
              </div>

              <p className="skill-category-desc">{category.description}</p>

              <ul className="skill-ink-list">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="skill-ink-item">
                    <div className="skill-item-top">
                      <span className="skill-bamboo-leaf-bullet" aria-hidden="true" />
                      <span className="skill-item-name">{skill.name}</span>
                    </div>
                    <span className="skill-item-context">{skill.context}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
