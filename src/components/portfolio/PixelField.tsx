"use client";

import { useEffect, useRef } from "react";

/**
 * Full-page pixel field behind the content.
 *
 * A grid of small square cells drawn in document space on a fixed canvas,
 * so it scrolls with the page. Cells are faint and get fainter further down
 * the page. Inside the top band (roughly the hero) a handful of cells pulse
 * in the glow colours at any one time. Once the band is scrolled away the
 * animation loop stops and the canvas only redraws on scroll or resize.
 * Reduced motion: the static grid only.
 */

const CELL = 12; // grid pitch in CSS px
const GAP = 2;
const BAND = 1100; // document px that get animated cells
const SPARKS = 36;
const COLORS = ["#8b7cff", "#4fd8e8", "#f5f5f7"] as const;

type Spark = {
  ix: number;
  iy: number;
  color: string;
  born: number;
  life: number;
  run: number;
};

/** Deterministic 0..1 noise per cell. */
function hash(x: number, y: number) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

export function PixelField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dpr = 1;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let needsDraw = true;
    const sparks: Spark[] = [];

    const cols = () => Math.ceil(w / CELL) + 1;

    const spawn = (s: Spark, now: number) => {
      s.ix = Math.floor(Math.random() * cols());
      s.iy = Math.floor((Math.random() * BAND) / CELL);
      s.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      s.born = now;
      s.life = 1400 + Math.random() * 2200;
      s.run = Math.random() < 0.2 ? 2 + Math.floor(Math.random() * 3) : 1;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsDraw = true;
    };

    const draw = (now: number) => {
      const scroll = window.scrollY;
      const firstRow = Math.floor(scroll / CELL);
      const rows = Math.ceil(h / CELL) + 2;
      const nCols = cols();
      const size = CELL - GAP;

      ctx.clearRect(0, 0, w, h);

      // Static cells: alpha from per-cell noise, times a falloff down the page.
      for (let r = 0; r < rows; r++) {
        const iy = firstRow + r;
        const docY = iy * CELL;
        const fall = 0.3 + 0.7 * Math.max(0, 1 - docY / 2600);
        const y = docY - scroll;
        for (let ix = 0; ix < nCols; ix++) {
          const n = hash(ix, iy);
          if (n < 0.55) continue; // leave most cells empty
          const a = (0.025 + (n - 0.55) * 0.16) * fall;
          ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
          ctx.fillRect(ix * CELL, y, size, size);
        }
      }

      // Animated cells in the top band.
      if (!reduce.matches) {
        for (const s of sparks) {
          const t = (now - s.born) / s.life;
          if (t >= 1) {
            spawn(s, now);
            continue;
          }
          const y = s.iy * CELL - scroll;
          if (y < -CELL || y > h) continue;
          const a = Math.sin(t * Math.PI) * 0.5;
          ctx.fillStyle = s.color;
          ctx.globalAlpha = a;
          for (let k = 0; k < s.run; k++) {
            ctx.fillRect((s.ix + k) * CELL, y, size, size);
          }
          ctx.globalAlpha = 1;
        }
      }
    };

    const bandVisible = () => window.scrollY < BAND && !reduce.matches;

    const loop = (now: number) => {
      if (!running) return;
      draw(now);
      needsDraw = false;
      if (bandVisible() && !document.hidden) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (bandVisible()) start();
      else if (!running) {
        needsDraw = true;
        raf = requestAnimationFrame((t) => {
          if (needsDraw) draw(t);
          needsDraw = false;
        });
      }
    };

    resize();
    const now = performance.now();
    // Fewer pulsing cells on narrow screens, where the band holds more text.
    const count = Math.max(14, Math.round((SPARKS * w) / 1440));
    for (let i = 0; i < count; i++) {
      const s: Spark = { ix: 0, iy: 0, color: COLORS[0], born: 0, life: 1, run: 1 };
      spawn(s, now);
      // Stagger so they don't all start together.
      s.born = now - Math.random() * s.life;
      sparks.push(s);
    }
    start();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onScroll);
    reduce.addEventListener("change", onScroll);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
