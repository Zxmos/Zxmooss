import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Volume2, VolumeX, Square } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'contact', label: 'Contact' },
];

export default function ScrollNavbar({
  theme,
  onToggleTheme,
  isTransitioning,
  soundEnabled = true,
  isPlaying = false,
  onToggleSound,
  onStopSound,
}) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const scrollPos = window.scrollY + 220;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(NAV_ITEMS[i].id);
        if (sectionEl && sectionEl.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const isNight = theme === 'night';

  return (
    <header className={`scroll-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="scroll-container header-inner">
        {/* Brand Identity + Traditional Red Hanko Seal */}
        <a
          href="#home"
          className="scroll-brand"
          aria-label="Mark Anthony L. Duhig Jr. — Home"
        >
          <span className="hanko-seal" aria-hidden="true">
            {PERSONAL_INFO.sealText}
          </span>
          <div className="brand-text-group">
            <span className="brand-name">Mark Anthony L. Duhig Jr.</span>
            <span className="brand-sub">Computer Engineering Scroll</span>
          </div>
        </a>

        {/* Desktop Scroll Signboard Navigation */}
        <nav className="scroll-nav-desktop" aria-label="Primary navigation">
          <ul className="scroll-nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`scroll-nav-link ${isActive ? 'nav-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="nav-label-text">{item.label}</span>
                    <span className="nav-brush-accent" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sound Controls + Theme Toggle + Mobile Menu Trigger */}
        <div className="header-controls">
          {isPlaying && onStopSound && (
            <button
              type="button"
              onClick={onStopSound}
              className="sound-stop-btn"
              aria-label="Stop soundtrack playback"
              title="Stop Grand Line / Gear 5 audio playback"
            >
              <Square size={12} fill="currentColor" />
              <span>Stop</span>
            </button>
          )}

          {onToggleSound && (
            <button
              type="button"
              onClick={onToggleSound}
              className={`sound-scroll-toggle ${
                soundEnabled ? 'sound-active' : 'sound-muted'
              }`}
              aria-label={
                soundEnabled
                  ? 'Disable theme soundtrack'
                  : 'Enable theme soundtrack'
              }
              title={
                soundEnabled
                  ? 'Sound Active: One Piece / Gear 5 theme plays on Dark Mode'
                  : 'Sound Muted: Click to enable theme soundtrack'
              }
            >
              <span className="sound-toggle-icon" aria-hidden="true">
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </span>
              <span className="sound-toggle-text">
                {soundEnabled ? 'SFX On' : 'Mute'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            disabled={isTransitioning}
            className="theme-scroll-toggle"
            aria-label={
              isNight
                ? 'Switch to Light theme (Headphones Portrait & Sunlit Parchment)'
                : 'Switch to Dark theme (Straw-Hat Gear 5 Portrait & Midnight Ink)'
            }
            title={
              isNight
                ? 'Return to Light Mode (Headphones Portrait)'
                : 'Enter Dark Mode (Straw-Hat Gear 5 Transformation)'
            }
          >
            <span className="theme-toggle-orb" aria-hidden="true">
              {isNight ? <Moon size={15} /> : <Sun size={15} />}
            </span>
            <span className="theme-toggle-text">
              {isNight ? 'Night • 夜' : 'Day • 昼'}
            </span>
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Wooden Signboard Drawer */}
      {mobileMenuOpen && (
        <nav className="scroll-nav-mobile" aria-label="Mobile navigation">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    className={`mobile-nav-link ${isActive ? 'nav-active' : ''}`}
                  >
                    <span className="mobile-bamboo-dot" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
