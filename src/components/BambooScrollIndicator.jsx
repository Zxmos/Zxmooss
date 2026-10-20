import React, { useEffect, useState, useRef, useMemo } from 'react';

// Deterministic bone-meal-inspired particle offsets (pale bamboo green, aged ivory, antique gold)
const BONEMEAL_MOTES = [
  { id: 'm1', dx: -26, dy: -22, size: 4.5, color: 'var(--bamboo-green)', delay: '0ms', shape: 'star' },
  { id: 'm2', dx: 24, dy: -18, size: 4.0, color: 'var(--gold-accent)', delay: '45ms', shape: 'diamond' },
  { id: 'm3', dx: -16, dy: -36, size: 3.5, color: 'var(--aged-ivory)', delay: '80ms', shape: 'circle' },
  { id: 'm4', dx: 19, dy: -34, size: 4.8, color: 'var(--bamboo-green)', delay: '25ms', shape: 'star' },
  { id: 'm5', dx: -30, dy: 4, size: 3.2, color: 'var(--gold-accent)', delay: '95ms', shape: 'circle' },
  { id: 'm6', dx: 29, dy: 6, size: 3.8, color: 'var(--aged-ivory)', delay: '60ms', shape: 'diamond' },
  { id: 'm7', dx: 0, dy: -44, size: 5.0, color: 'var(--gold-accent)', delay: '15ms', shape: 'star' },
];

/**
 * Deterministic Bamboo Scroll Controller (9A.2)
 *
 * - Calculates normalized document scroll progress between 0 and 1.
 * - At the top of the page (scrollProgress = 0), displays bamboo at maximum configured height (maxSegments).
 * - Scrolling DOWN progressively reduces bamboo height and visible segment count (down to minSegments).
 * - Scrolling UP progressively increases bamboo height, reveals segments, and triggers the
 *   Minecraft bone-meal-inspired particle burst only when meaningful upward growth creates new segments.
 */
export default function BambooScrollIndicator({
  minSegments = 2,
  maxSegments = 12,
}) {
  const safeMax = Math.max(4, Math.min(16, maxSegments));
  const safeMin = Math.max(1, Math.min(safeMax - 1, minSegments));

  // Precompute deterministic segment geometry so the stalk is never rebuilt on scroll
  const segments = useMemo(() => {
    const totalDrawableHeight = 504;
    const slotHeight = totalDrawableHeight / safeMax;
    const bodyHeight = Math.max(20, slotHeight - 4);

    return Array.from({ length: safeMax }, (_, idx) => {
      const segBottom = 536 - idx * slotHeight;
      const segTop = segBottom - bodyHeight;
      const threshold = (idx + 1 - safeMin) / Math.max(1, safeMax - safeMin);
      return {
        id: idx + 1,
        index: idx,
        segBottom,
        segTop,
        threshold: Math.max(0, Math.min(1, threshold)),
        leafSide: idx % 2 === 0 ? 'left' : 'right',
      };
    });
  }, [safeMin, safeMax]);

  const [growthProgress, setGrowthProgress] = useState(1);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [targetSegmentCount, setTargetSegmentCount] = useState(safeMax);
  const [renderedSegmentCount, setRenderedSegmentCount] = useState(safeMax);
  const [bursts, setBursts] = useState([]);

  const lastScrollYRef = useRef(0);
  const targetCountRef = useRef(safeMax);
  const lastBurstSegmentRef = useRef(safeMax);
  const lastBurstTimeRef = useRef(0);
  const burstIdCounterRef = useRef(0);

  // Step renderedSegmentCount smoothly toward targetSegmentCount
  useEffect(() => {
    if (renderedSegmentCount === targetSegmentCount) return undefined;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const immId = window.setTimeout(() => {
        setRenderedSegmentCount(targetSegmentCount);
      }, 0);
      return () => window.clearTimeout(immId);
    }

    const stepTimer = window.setTimeout(() => {
      setRenderedSegmentCount((prev) => {
        if (prev < targetSegmentCount) return prev + 1;
        if (prev > targetSegmentCount) return prev - 1;
        return prev;
      });
    }, 32);

    return () => window.clearTimeout(stepTimer);
  }, [renderedSegmentCount, targetSegmentCount]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const normalizedScroll =
        docHeight > 0 ? Math.min(1, Math.max(0, currentY / docHeight)) : 0;

      // Reverse growth mapping:
      // Top of page (normalizedScroll = 0) -> growth = 1.0 (maxSegments)
      // Bottom of page (normalizedScroll = 1) -> growth = 0.0 (minSegments)
      const nextGrowth = 1 - normalizedScroll;
      const nextTargetSegments = Math.round(
        safeMin + nextGrowth * (safeMax - safeMin)
      );

      const deltaY = currentY - lastScrollYRef.current;
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (Math.abs(deltaY) > 1) {
        const dir = deltaY < 0 ? 'up' : 'down';
        setScrollDirection(dir);

        if (dir === 'down') {
          // Immediately dissipate bone-meal particles when scrolling downward
          setBursts((prev) => (prev.length > 0 ? [] : prev));
          lastBurstSegmentRef.current = nextTargetSegments;
        } else if (
          dir === 'up' &&
          !prefersReducedMotion &&
          nextTargetSegments > targetCountRef.current &&
          nextTargetSegments > lastBurstSegmentRef.current
        ) {
          // Trigger bone-meal burst only when upward scrolling creates a new segment
          const now = performance.now();
          if (now - lastBurstTimeRef.current > 160) {
            lastBurstTimeRef.current = now;
            lastBurstSegmentRef.current = nextTargetSegments;

            const topSegIndex = Math.min(safeMax - 1, nextTargetSegments - 1);
            const activeSeg = segments[topSegIndex];
            const burstY = activeSeg ? activeSeg.segTop + 6 : 80;
            const burstId = ++burstIdCounterRef.current;

            setBursts((prev) => [
              ...prev.slice(-2),
              {
                id: burstId,
                y: Math.max(30, burstY),
                segId: nextTargetSegments,
              },
            ]);

            window.setTimeout(() => {
              setBursts((prev) => prev.filter((b) => b.id !== burstId));
            }, 820);
          }
        }

        lastScrollYRef.current = currentY;
      }

      targetCountRef.current = nextTargetSegments;
      setTargetSegmentCount(nextTargetSegments);
      setGrowthProgress(nextGrowth);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [safeMin, safeMax, segments]);

  const minHeightPx = Math.round((safeMin / safeMax) * 504);
  const grownHeight = Math.max(
    minHeightPx,
    minHeightPx + growthProgress * (504 - minHeightPx)
  );
  const growthPercentage = Math.round(growthProgress * 100);
  const tipY = Math.max(28, 536 - grownHeight);

  return (
    <aside
      className={`bamboo-scroll-rail direction-${scrollDirection} ${
        bursts.length > 0 ? 'bamboo-bonemeal-active' : ''
      }`}
      aria-label={`Bamboo vitality: ${growthPercentage}% (${renderedSegmentCount} of ${safeMax} segments)`}
      title={`Bamboo Growth: ${growthPercentage}% (${renderedSegmentCount}/${safeMax} segments) — Scroll up to grow, scroll down to shrink`}
    >
      <div className="bamboo-percentage-tag">
        <span className="bamboo-kanji">竹</span>
        <span className="bamboo-pct-num">{growthPercentage}%</span>
      </div>

      <div className="bamboo-svg-wrapper">
        <svg viewBox="0 0 90 560" className="bamboo-svg" aria-hidden="true">
          <defs>
            <linearGradient id="bambooStemGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--bamboo-deep)" />
              <stop offset="60%" stopColor="var(--bamboo-green)" />
              <stop offset="100%" stopColor="var(--gold-accent)" />
            </linearGradient>

            <radialGradient id="bonemealAuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.65" />
              <stop offset="55%" stopColor="var(--bamboo-green)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--bamboo-green)" stopOpacity="0" />
            </radialGradient>

            {/* Clip path that reveals bamboo upward from the root (y=536) to current tip */}
            <clipPath id="bambooGrowthClip">
              <rect
                x="0"
                y={536 - grownHeight}
                width="90"
                height={grownHeight + 24}
              />
            </clipPath>
          </defs>

          {/* Faint Ink Guide Line */}
          <line
            x1="45"
            y1="28"
            x2="45"
            y2="536"
            stroke="var(--border-ink)"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.45"
          />

          {/* Living Bamboo Stalk Group (grows on scroll UP, shrinks on scroll DOWN) */}
          <g clipPath="url(#bambooGrowthClip)" className="bamboo-growing-group">
            {segments.map((seg, idx) => {
              const isVisible = idx < renderedSegmentCount;
              const reverseIdx = safeMax - 1 - idx;
              const delayMs =
                scrollDirection === 'up' ? idx * 16 : reverseIdx * 12;

              return (
                <g
                  key={seg.id}
                  className={`bamboo-segment-group ${
                    isVisible ? 'segment-grown' : 'segment-retracted'
                  }`}
                  style={{
                    transitionDelay: `${delayMs}ms`,
                  }}
                >
                  {/* Bamboo Hollow Culm Segment */}
                  <path
                    d={`M42,${seg.segBottom} C41,${seg.segBottom - 12} 42,${
                      seg.segTop + 12
                    } 42.5,${seg.segTop} L47.5,${seg.segTop} C48,${
                      seg.segTop + 12
                    } 49,${seg.segBottom - 12} 48,${seg.segBottom} Z`}
                    fill="url(#bambooStemGrad)"
                  />

                  {/* Sumi Ink Edge Highlight */}
                  <line
                    x1="42.5"
                    y1={seg.segBottom}
                    x2="42.5"
                    y2={seg.segTop}
                    stroke="var(--ink-strong)"
                    strokeWidth="1.1"
                    opacity="0.65"
                  />

                  {/* Bamboo Node Ring (staggered pop when growing upward) */}
                  <g
                    className={`bamboo-node-ring ${
                      isVisible ? 'node-popped' : 'node-folded'
                    }`}
                  >
                    <path
                      d={`M39,${seg.segTop} Q45,${seg.segTop - 2.2} 51,${seg.segTop}`}
                      stroke="var(--ink-strong)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d={`M40,${seg.segTop + 2.2} Q45,${seg.segTop + 0.8} 50,${
                        seg.segTop + 2.2
                      }`}
                      stroke="var(--bamboo-green)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>

                  {/* Sprouting Twig & Ink Bamboo Leaves */}
                  <g
                    className={`bamboo-leaf-cluster ${
                      isVisible ? 'leaf-visible' : 'leaf-hidden'
                    }`}
                    style={{
                      transformOrigin: `45px ${seg.segTop + 5}px`,
                      transform: `scale(${isVisible ? 1 : 0.25}) rotate(${
                        isVisible ? 0 : seg.leafSide === 'left' ? 18 : -18
                      }deg)`,
                    }}
                  >
                    {seg.leafSide === 'left' ? (
                      <g className="leaf-sway-left">
                        <path
                          d={`M42,${seg.segTop + 5} Q30,${seg.segTop - 4} 20,${
                            seg.segTop - 7
                          }`}
                          stroke="var(--ink-strong)"
                          strokeWidth="1.1"
                          fill="none"
                        />
                        <path
                          d={`M28,${seg.segTop - 2} Q14,${seg.segTop - 10} 5,${
                            seg.segTop - 1
                          } Q16,${seg.segTop + 3} 28,${seg.segTop - 2} Z`}
                          fill="var(--bamboo-green)"
                        />
                        <path
                          d={`M31,${seg.segTop + 1} Q20,${seg.segTop + 8} 12,${
                            seg.segTop + 12
                          } Q23,${seg.segTop + 9} 31,${seg.segTop + 1} Z`}
                          fill="var(--ink-strong)"
                          opacity="0.78"
                        />
                      </g>
                    ) : (
                      <g className="leaf-sway-right">
                        <path
                          d={`M48,${seg.segTop + 5} Q60,${seg.segTop - 4} 70,${
                            seg.segTop - 7
                          }`}
                          stroke="var(--ink-strong)"
                          strokeWidth="1.1"
                          fill="none"
                        />
                        <path
                          d={`M62,${seg.segTop - 2} Q76,${seg.segTop - 10} 85,${
                            seg.segTop - 1
                          } Q74,${seg.segTop + 3} 62,${seg.segTop - 2} Z`}
                          fill="var(--bamboo-green)"
                        />
                        <path
                          d={`M59,${seg.segTop + 1} Q70,${seg.segTop + 8} 78,${
                            seg.segTop + 12
                          } Q67,${seg.segTop + 9} 59,${seg.segTop + 1} Z`}
                          fill="var(--ink-strong)"
                          opacity="0.78"
                        />
                      </g>
                    )}
                  </g>
                </g>
              );
            })}
          </g>

          {/* Bone-Meal-Inspired Magical Ink & Gold Growth Particle Bursts (on upward scroll) */}
          {bursts.map((burst) => (
            <g
              key={burst.id}
              transform={`translate(45, ${burst.y})`}
              className="bonemeal-burst-group"
            >
              {/* Soft Ink-Brush Glow Flourish */}
              <circle
                cx="0"
                cy="0"
                r="26"
                fill="url(#bonemealAuraGrad)"
                className="bonemeal-glow-ring"
              />

              {BONEMEAL_MOTES.map((mote) => (
                <g
                  key={mote.id}
                  className="bonemeal-mote"
                  style={{
                    '--dx': `${mote.dx}px`,
                    '--dy': `${mote.dy}px`,
                    animationDelay: mote.delay,
                  }}
                >
                  {mote.shape === 'star' && (
                    <path
                      d={`M0,${-mote.size} L${mote.size * 0.35},${
                        -mote.size * 0.35
                      } L${mote.size},0 L${mote.size * 0.35},${
                        mote.size * 0.35
                      } L0,${mote.size} L${-mote.size * 0.35},${
                        mote.size * 0.35
                      } L${-mote.size},0 L${-mote.size * 0.35},${
                        -mote.size * 0.35
                      } Z`}
                      fill={mote.color}
                    />
                  )}
                  {mote.shape === 'diamond' && (
                    <polygon
                      points={`0,${-mote.size} ${mote.size * 0.75},0 0,${
                        mote.size
                      } ${-mote.size * 0.75},0`}
                      fill={mote.color}
                    />
                  )}
                  {mote.shape === 'circle' && (
                    <circle cx="0" cy="0" r={mote.size * 0.65} fill={mote.color} />
                  )}
                </g>
              ))}
            </g>
          ))}

          {/* Moving Bamboo Shoot Tip Marker */}
          <circle
            cx="45"
            cy={tipY}
            r={bursts.length > 0 ? '5' : '3.5'}
            fill="var(--gold-accent)"
            className="bamboo-tip-orb"
          />

          {/* Root Ink Brush Base Mound */}
          <path
            d="M26,540 Q45,532 64,540 Q45,544 26,540 Z"
            fill="var(--ink-strong)"
            opacity="0.8"
          />
        </svg>
      </div>
    </aside>
  );
}
