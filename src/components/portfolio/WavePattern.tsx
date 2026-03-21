"use client";

import { useEffect, useRef } from "react";
import { getCursorSnapshot } from "@/src/components/portfolio/cursorStore";

/**
 * WavePattern — animated wave section inspired by "The Great Wave off Kanagawa"
 *
 * Design:
 *   - 6 layered wave paths (parallax depth)
 *   - Hokusai-style claw crest tips + foam scatter dots
 *   - Matte navy/ocean/soft-blue palette with subtle gradients
 *   - Pure CSS infinite scroll animation (no JS dependency for base motion)
 *   - GSAP + ScrollTrigger scroll interaction (if GSAP is available)
 *
 * Usage (in your Page layout, replaces the old <WavePattern />):
 *   <WavePattern />
 *
 * The component is `position: relative` so it occupies natural flow space
 * between <ContactSection /> and <SiteFooter />. Adjust height via the
 * outer div's `height` prop or className if needed.
 */
export function WavePattern({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const disruptRef = useRef<HTMLDivElement>(null);

  /* ─── Cursor-driven wave disruption ───────────────────────────────────── */
  useEffect(() => {
    const el = disruptRef.current;
    if (!el) return;

    let rafId: number;
    const tick = () => {
      const { x, y, isOverWaves, velocity } = getCursorSnapshot();
      if (isOverWaves) {
        el.style.display = "block";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        const radius = 40 + Math.min(velocity * 0.08, 30);
        el.style.width = `${radius * 2}px`;
        el.style.height = `${radius * 2}px`;
        el.style.marginLeft = `-${radius}px`;
        el.style.marginTop = `-${radius}px`;
        el.style.opacity = String(0.2 + Math.min(velocity * 0.0003, 0.25));
      } else {
        el.style.display = "none";
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ─── GSAP scroll interaction ─────────────────────────────────────────── */
  useEffect(() => {
    let ctx: { revert?: () => void } = {};

    (async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const el = wrapRef.current;
        if (!el) return;

        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReduced) return;

        const layer1 = el.querySelector<SVGGElement>(".wl1");
        const layer2 = el.querySelector<SVGGElement>(".wl2");
        const layer3 = el.querySelector<SVGGElement>(".wl3");
        const layer4 = el.querySelector<SVGGElement>(".wl4");
        const layer5 = el.querySelector<SVGGElement>(".wl5");
        const layer6 = el.querySelector<SVGGElement>(".wl6");

        ctx = gsap.context(() => {
          // Whole section drifts down slightly on scroll (calm, natural)
          gsap.to(el, {
            y: 28,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          // Front wave: slight extra horizontal shift + subtle rotation
          if (layer1) {
            gsap.to(layer1, {
              x: -24,
              rotation: -0.4,
              transformOrigin: "center bottom",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              },
            });
          }

          // Mid wave: medium shift, opposite direction
          if (layer2) {
            gsap.to(layer2, {
              x: 14,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 3,
              },
            });
          }

          // Back wave: subtle parallax
          if (layer3) {
            gsap.to(layer3, {
              x: -8,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 4,
              },
            });
          }

          // Layer 4: between back and mid
          if (layer4) {
            gsap.to(layer4, {
              x: 6,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 3.5,
              },
            });
          }

          // Layer 5: between mid and front
          if (layer5) {
            gsap.to(layer5, {
              x: -16,
              rotation: 0.2,
              transformOrigin: "center bottom",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 2.5,
              },
            });
          }

          // Layer 6: massive foreground wave
          if (layer6) {
            gsap.to(layer6, {
              x: -32,
              rotation: -0.5,
              transformOrigin: "center bottom",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            });
          }
        }, el);
      } catch {
        // GSAP not available — CSS animation alone is sufficient
      }
    })();

    return () => ctx.revert?.();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none fixed bottom-0 left-0 w-full overflow-hidden h-[120px] sm:h-[150px] md:h-[180px] lg:h-[220px] ${className}`}
    >
      {/* Cursor disruption overlay — wake/splash when boat moves through waves */}
      <div
        ref={disruptRef}
        aria-hidden
        className="pointer-events-none fixed z-[9998] rounded-full border-2 border-[#6FA3C8]/50 bg-[#E8F2F8]/60 mix-blend-multiply"
        style={{
          display: "none",
          left: 0,
          top: 0,
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          transform: "translate3d(0,0,0)",
        }}
      />
      <svg
        width="200%"
        height="100%"
        viewBox="0 0 2440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0"
        shapeRendering="geometricPrecision"
      >
        <defs>
          {/* Gradient fills — matte, no neon */}
          <linearGradient id="wg6" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="wg5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="wg4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2C5F7C" stopOpacity="0.50" />
            <stop offset="100%" stopColor="#2C5F7C" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="wg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6FA3C8" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#6FA3C8" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2C5F7C" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#2C5F7C" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* ── LAYER 3 — back, slowest, blurred ───────────────────────── */}
        <g
          className="wl3"
          style={{
            opacity: 0.22,
            filter: "blur(1.2px)",
            animation: "waveScroll3 22s linear infinite",
          }}
        >
          {/* Wave path repeated twice for seamless scroll loop.
              Start and end both at y=90 so the tile joins invisibly. */}
          {[0, 1220].map((offset) => (
            <path
              key={offset}
              transform={`translate(${offset}, 0)`}
              d="
                M0,90
                C50,80 90,62 150,68
                C200,74 225,96 275,100
                C325,104 358,80 415,72
                C468,65 505,84 558,87
                C608,90 638,74 695,65
                C745,57 782,76 838,80
                C888,84 912,67 965,60
                C1015,53 1052,74 1105,78
                C1155,82 1185,66 1220,90
                L1220,220 L0,220 Z
              "
              fill="url(#wg3)"
            />
          ))}
        </g>

        {/* ── LAYER 4 — between back and mid ─────────────────────────── */}
        <g
          className="wl4"
          style={{
            opacity: 0.35,
            filter: "blur(0.8px)",
            animation: "waveScroll4 19s linear infinite",
          }}
        >
          {[0, 1220].map((offset) => (
            <path
              key={offset}
              transform={`translate(${offset}, 0)`}
              d="
                M0,100
                C45,88 78,68 135,70
                C185,72 212,92 260,96
                C305,100 335,78 395,68
                C445,59 475,82 530,85
                C580,88 605,70 665,62
                C715,55 745,74 801,78
                C846,82 865,65 925,58
                C975,51 1005,72 1055,76
                C1105,80 1125,64 1220,100
                L1220,220 L0,220 Z
              "
              fill="url(#wg4)"
            />
          ))}
        </g>

        {/* ── LAYER 2 — mid depth ─────────────────────────────────────── */}
        <g
          className="wl2"
          style={{
            opacity: 0.6,
            filter: "blur(0.4px)",
            animation: "waveScroll2 17s linear infinite",
          }}
        >
          {/* Start and end both at y=115 for a seamless tile join. */}
          {[0, 1220].map((offset) => (
            <g key={offset} transform={`translate(${offset}, 0)`}>
              <path
                d="
                  M0,115
                  C38,100 72,80 128,76
                  C178,72 208,96 253,102
                  C298,108 332,82 392,72
                  C442,63 478,88 533,92
                  C583,96 608,76 668,68
                  C718,61 752,82 808,86
                  C853,90 878,70 938,64
                  C988,58 1018,80 1068,84
                  C1118,88 1143,70 1220,115
                  L1220,220 L0,220 Z
                "
                fill="url(#wg2)"
              />
              {/* <path
                d="
                  M0,115
                  C38,100 72,80 128,76
                  C178,72 208,96 253,102
                  C298,108 332,82 392,72
                  C442,63 478,88 533,92
                  C583,96 608,76 668,68
                  C718,61 752,82 808,86
                  C853,90 878,70 938,64
                  C988,58 1018,80 1068,84
                  C1118,88 1143,70 1220,115
                "
                fill="none"
                stroke="#2C5F7C"
                strokeWidth="1.2"
                strokeOpacity="0.35"
              /> */}
            </g>
          ))}
        </g>

        {/* ── LAYER 5 — between mid and front ────────────────────────── */}
        <g
          className="wl5"
          style={{
            opacity: 0.8,
            filter: "blur(0.2px)",
            animation: "waveScroll5 15s linear infinite",
          }}
        >
          {[0, 1220].map((offset) => (
            <path
              key={offset}
              transform={`translate(${offset}, 0)`}
              d="
                M0,105
                C35,115 65,95 120,88
                C170,82 195,102 240,108
                C285,114 315,92 375,82
                C425,73 455,98 510,102
                C560,106 580,86 640,78
                C690,71 720,92 776,96
                C821,100 840,80 900,74
                C950,68 975,90 1025,94
                C1075,98 1095,80 1220,105
                L1220,220 L0,220 Z
              "
              fill="url(#wg5)"
            />
          ))}
        </g>

        {/* ── LAYER 1 — foreground dominant wave ─────────────────────── */}
        <g
          className="wl1"
          style={{
            opacity: 1,
            animation: "waveScroll1 13s linear infinite",
          }}
        >
          {/* Start and end both at y=130 — the wave rises into crests
              then gently descends back to the same entry height. */}
          {[0, 1220].map((offset) => (
            <g key={offset} transform={`translate(${offset}, 0)`}>
              <path
                d="
                  M0,95
                  C22,118 44,105 68,97
                  C90,89 112,88 132,92
                  C152,96 162,110 178,114
                  C194,118 208,104 228,88
                  C250,70 268,52 295,42
                  C318,34 340,35 358,43
                  C376,51 385,65 396,73
                  C406,80 416,78 430,68
                  C443,57 456,42 474,34
                  C492,25 510,22 527,28
                  C546,35 556,53 566,66
                  C574,76 580,82 592,84
                  C606,86 620,76 637,66
                  C652,56 666,46 687,40
                  C706,34 722,34 740,40
                  C758,47 770,60 780,70
                  C788,78 794,84 806,86
                  C820,89 832,80 850,70
                  C867,60 882,48 902,42
                  C922,36 940,36 958,44
                  C976,52 986,64 996,74
                  C1006,85 1016,92 1032,94
                  C1050,97 1064,86 1082,74
                  C1098,63 1114,48 1133,40
                  C1152,32 1170,31 1190,45
                  C1208,60 1216,90 1220,94
                  L1220,220 L0,220 Z
                "
                fill="url(#wg1)"
                // stroke="#1E3A5F"
                // strokeWidth="1.2"
                // strokeOpacity="0.5"
              />

              {/* ── Hokusai claw-crest foam tips ───────────────────── */}
              {/* Crest A — large dominant peak at ~x=295 */}
              {/* <g opacity="0.5">
                <path
                  d="M280,47 Q286,32 295,28 Q304,24 312,30 Q306,38 299,43 Q292,47 280,47Z"
                  fill="#E6F0F7"
                />
                <path
                  d="M295,28 Q303,19 314,21 Q320,26 315,34"
                  fill="none"
                  stroke="#E6F0F7"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M308,23 Q317,14 327,18 Q331,24 326,32"
                  fill="none"
                  stroke="#E6F0F7"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                <circle
                  cx="338"
                  cy="44"
                  r="2.2"
                  fill="#E6F0F7"
                  opacity="0.45"
                />
                <circle
                  cx="356"
                  cy="40"
                  r="1.5"
                  fill="#E6F0F7"
                  opacity="0.35"
                />
                <circle cx="372" cy="46" r="1.8" fill="#E6F0F7" opacity="0.3" />
              </g> */}

              {/* Crest B — ~x=472 */}
              {/* <g opacity="0.50">
                <path
                  d="M458,37 Q464,22 474,18 Q483,14 490,20 Q484,28 477,33 Q470,38 458,37Z"
                  fill="#E6F0F7"
                />
                <path
                  d="M474,18 Q482,9 493,11 Q499,16 494,24"
                  fill="none"
                  stroke="#E6F0F7"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M487,14 Q496,6 506,10 Q510,16 505,24"
                  fill="none"
                  stroke="#E6F0F7"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                <circle
                  cx="520"
                  cy="32"
                  r="2.0"
                  fill="#E6F0F7"
                  opacity="0.40"
                />
                <circle
                  cx="536"
                  cy="27"
                  r="1.4"
                  fill="#E6F0F7"
                  opacity="0.30"
                />
              </g> */}

              {/* Crest C — ~x=685 */}
              {/* <g opacity="0.48">
                <path
                  d="M670,43 Q676,28 686,24 Q695,20 702,26 Q696,34 689,39 Q682,44 670,43Z"
                  fill="#E6F0F7"
                />
                <path
                  d="M686,24 Q694,15 705,17 Q711,22 706,30"
                  fill="none"
                  stroke="#E6F0F7"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <circle
                  cx="720"
                  cy="38"
                  r="2.0"
                  fill="#E6F0F7"
                  opacity="0.38"
                />
                <circle
                  cx="738"
                  cy="32"
                  r="1.5"
                  fill="#E6F0F7"
                  opacity="0.28"
                />
              </g> */}

              {/* Crest D — ~x=900 */}
              {/* <g opacity="0.46">
                <path
                  d="M885,45 Q891,30 901,26 Q910,22 917,28 Q911,36 904,41 Q897,46 885,45Z"
                  fill="#E6F0F7"
                />
                <path
                  d="M901,26 Q909,17 920,19 Q926,24 921,32"
                  fill="none"
                  stroke="#E6F0F7"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <circle
                  cx="935"
                  cy="40"
                  r="1.8"
                  fill="#E6F0F7"
                  opacity="0.36"
                />
              </g> */}

              {/* Crest E — ~x=1130 (smaller, near loop edge) */}
              {/* <g opacity="0.40">
                <path
                  d="M1115,43 Q1120,30 1130,26 Q1139,22 1146,28 Q1140,36 1133,41 Q1126,45 1115,43Z"
                  fill="#E6F0F7"
                />
                <path
                  d="M1130,26 Q1137,18 1148,20 Q1153,25 1148,33"
                  fill="none"
                  stroke="#E6F0F7"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </g> */}
            </g>
          ))}
        </g>

        {/* ── LAYER 6 — massive foreground wave ─────────────────────── */}
        <g
          className="wl6"
          style={{
            opacity: 0.95,
            animation: "waveScroll6 11s linear infinite",
          }}
        >
          {[0, 1220].map((offset) => (
            <g key={offset} transform={`translate(${offset}, 0)`}>
              <path
                d="
                  M0,125
                  C25,125 50,110 75,95
                  C100,80 125,75 150,85
                  C175,95 195,120 220,125
                  C245,130 265,110 290,95
                  C315,80 335,70 365,75
                  C390,80 410,100 435,110
                  C460,120 480,115 510,105
                  C535,95 555,85 585,80
                  C610,75 630,85 655,95
                  C680,105 695,125 720,130
                  C745,135 765,115 790,100
                  C815,85 835,75 865,80
                  C890,85 910,105 935,115
                  C960,125 980,120 1010,110
                  C1035,100 1055,90 1085,85
                  C1110,80 1130,90 1155,100
                  C1180,110 1195,130 1220,125
                  L1220,220 L0,220 Z
                "
                fill="url(#wg6)"
              />
            </g>
          ))}
        </g>
      </svg>

      {/* CSS keyframes injected via a style tag (Next.js App Router safe) */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes waveScroll1 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes waveScroll2 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes waveScroll3 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes waveScroll4 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes waveScroll5 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes waveScroll6 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        }
      `}</style>
    </div>
  );
}
