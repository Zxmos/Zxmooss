import React from 'react';
import ScrollNavbar from './components/ScrollNavbar';
import CloudTransition from './components/CloudTransition';
import CloudCursor from './components/CloudCursor';
import BambooScrollIndicator from './components/BambooScrollIndicator';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperimentsSection from './components/ExperimentsSection';
import ContactSection from './components/ContactSection';
import ScrollFooter from './components/ScrollFooter';
import WaveDivider from './components/WaveDivider';
import { useThemeTransition } from './hooks/useThemeTransition';
import { useGitHubProfile } from './hooks/useGitHubProfile';
import { useGear5Sound } from './hooks/useGear5Sound';

export default function App() {
  const {
    soundEnabled,
    isPlaying,
    toggleSound,
    stopSound,
    playSoundOnNightActivation,
    stopSoundOnDayActivation,
  } = useGear5Sound();

  const {
    theme,
    isTransitioning,
    transitionState,
    announcement,
    toggleTheme,
  } = useThemeTransition({
    onNightActivation: playSoundOnNightActivation,
    onDayActivation: stopSoundOnDayActivation,
  });

  const githubData = useGitHubProfile();

  return (
    <div className={`sumi-scroll-app theme-${theme}`}>
      {/* Polite Accessible Live Region for Theme State Announcements */}
      <div className="sr-only-live" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Custom Cloud Cursor Follower (Desktop fine-pointer only) */}
      <CloudCursor theme={theme} />

      {/* Global SVG Filters for Aged Parchment Grain & Imperfect Sumi-e Brush Edges */}
      <svg className="svg-Hidden-defs" aria-hidden="true">
        <defs>
          <filter id="sumiBrushEdge" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Subtle Weathered Washi / Canvas Grain Overlay */}
      <div className="canvas-paper-grain" aria-hidden="true" />

      {/* Cinematic Day <-> Night Ink Cloud Transition Overlay (IDLE -> COVERING -> SWITCHING -> REVEALING) */}
      <CloudTransition transitionState={transitionState} />

      {/* Deterministic Bidirectional Growing Bamboo Scroll Indicator (2-12 segments) */}
      <BambooScrollIndicator minSegments={2} maxSegments={12} />

      {/* Traditional Scroll Navigation Header with Gear 5 Sound Toggle & Stop Control */}
      <ScrollNavbar
        theme={theme}
        onToggleTheme={toggleTheme}
        isTransitioning={isTransitioning}
        soundEnabled={soundEnabled}
        isPlaying={isPlaying}
        onToggleSound={toggleSound}
        onStopSound={stopSound}
      />

      {/* Main Living Painting Scroll */}
      <main id="main-content">
        <HeroSection
          theme={theme}
          transitionState={transitionState}
          githubData={githubData}
        />

        <WaveDivider variant="primary" />

        <AboutSection />

        <WaveDivider flip variant="secondary" />

        <SkillsSection />

        <WaveDivider variant="primary" />

        <ProjectsSection githubData={githubData} />

        <WaveDivider flip variant="secondary" />

        <ExperimentsSection />

        <WaveDivider variant="primary" />

        <ContactSection theme={theme} githubData={githubData} />
      </main>

      <ScrollFooter />
    </div>
  );
}
