import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

const CURRENT_YEAR = new Date().getFullYear();

export default function ScrollFooter() {

  return (
    <footer className="scroll-footer">
      <div className="scroll-container footer-inner">
        <div className="footer-brand-row">
          <span className="footer-hanko-mark" aria-hidden="true">
            {PERSONAL_INFO.sealText}
          </span>
          <div>
            <p className="footer-author-name">{PERSONAL_INFO.name}</p>
            <p className="footer-author-meta">
              {PERSONAL_INFO.degree} • {PERSONAL_INFO.school}
            </p>
          </div>
        </div>

        <div className="footer-right-row">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-github-link"
          >
            github.com/{PERSONAL_INFO.githubUsername}
          </a>
          <span className="footer-divider" aria-hidden="true">•</span>
          <span className="footer-copyright">
            &copy; {CURRENT_YEAR} {PERSONAL_INFO.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
