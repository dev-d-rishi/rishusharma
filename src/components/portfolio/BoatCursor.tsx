"use client";

import { useEffect, useRef, useState } from "react";
import {
  getIsOverWaves,
  updateCursorSnapshot,
} from "@/src/components/portfolio/cursorStore";

const MIN_MOVE = 4;
const VELOCITY_SMOOTH = 0.2;
const BASE_SIZE = 36;
const MAX_SIZE_BONUS = 24; // boat can grow up to 60px when moving fast
const VELOCITY_SCALE = 0.012; // px per px/ms

export function BoatCursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const prevPos = useRef({ x: 0, y: 0, t: 0 });
  const prevAngle = useRef(0);
  const prevVel = useRef(0);
  const isFirstMove = useRef(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.innerWidth >= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      document.body.classList.add("boat-cursor-active");
    } else {
      document.body.classList.remove("boat-cursor-active");
    }
    return () => document.body.classList.remove("boat-cursor-active");
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: MouseEvent) => {
      const el = elRef.current;
      const img = imgRef.current;
      if (!el || !img) return;

      const now = performance.now();
      if (isFirstMove.current) {
        prevPos.current = { x: e.clientX, y: e.clientY, t: now };
        isFirstMove.current = false;
      }

      const { x, y, t } = prevPos.current;
      const dt = (now - t) / 1000 || 0.016;
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const instantVel = dt > 0 ? dist / dt : 0;
      const smoothVel = prevVel.current * (1 - VELOCITY_SMOOTH) + instantVel * VELOCITY_SMOOTH;
      prevVel.current = smoothVel;

      let angle = prevAngle.current;
      if (dist >= MIN_MOVE) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI) * 1.1;
        prevAngle.current = angle;
      }
      prevPos.current = { x: e.clientX, y: e.clientY, t: now };

      const sizeBonus = Math.min(smoothVel * VELOCITY_SCALE, MAX_SIZE_BONUS);
      const size = BASE_SIZE + sizeBonus;

      updateCursorSnapshot({
        x: e.clientX,
        y: e.clientY,
        velocity: smoothVel,
        isOverWaves: getIsOverWaves(e.clientY),
      });

      img.style.width = `${size}px`;
      img.style.height = `${size}px`;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{
        transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
      }}
      aria-hidden
    >
      <img
        ref={imgRef}
        src="/assets/images/ship.png"
        alt=""
        className="select-none transition-[width,height] duration-100"
        style={{ width: 36, height: 36 }}
        draggable={false}
      />
    </div>
  );
}
