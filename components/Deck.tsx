"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { slides } from "./slides";

const STAGE_W = 1920;
const STAGE_H = 1080;

function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

function readHash() {
  const n = parseInt(window.location.hash.slice(1), 10);
  return Number.isNaN(n) ? 0 : Math.min(slides.length - 1, Math.max(0, n - 1));
}

export default function Deck() {
  // The URL hash is the source of truth (#3 = third slide), so refresh and deep links work.
  const index = useSyncExternalStore(subscribeHash, readHash, () => 0);
  const [scale, setScale] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const go = useCallback((next: number) => {
    const clamped = Math.min(slides.length - 1, Math.max(0, next));
    window.location.hash = `#${clamped + 1}`;
  }, []);

  // Fit the fixed 1920x1080 stage to whatever window or projector we get.
  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(index + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(index - 1);
          break;
        case "Home":
          go(0);
          break;
        case "End":
          go(slides.length - 1);
          break;
        case "n":
        case "N":
          setShowNotes((v) => !v);
          break;
        case "o":
        case "O":
          setShowGrid((v) => !v);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen?.();
          break;
        case "Escape":
          setShowGrid(false);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const slide = slides[index];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale || 0.5})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        <div className="relative h-full w-full overflow-hidden bg-background">
          <div className="absolute inset-x-0 top-0 h-[6px] bg-line">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${((index + 1) / slides.length) * 100}%` }}
            />
          </div>

          <div key={index} className="h-full w-full px-[120px] pb-[96px] pt-[84px]">
            {slide.content}
          </div>

          <div className="absolute inset-x-[120px] bottom-[36px] flex items-center justify-between text-[22px] text-muted">
            <span>AI in Development · Week 0 · Kickoff &amp; Baseline</span>
            <span className="font-mono">
              {index + 1} / {slides.length}
            </span>
          </div>

          {showNotes && (
            <div className="absolute inset-x-0 bottom-0 z-10 max-h-[46%] overflow-auto border-t-2 border-accent-2 bg-[#0f1a2e]/95 px-[120px] py-[28px] text-[30px] leading-snug text-slate-200">
              <div className="mb-2 text-[22px] font-semibold uppercase tracking-widest text-accent-2">
                Speaker notes · {slide.minutes} min
              </div>
              <ul className="list-disc space-y-1 pl-8">
                {slide.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          {showGrid && (
            <div className="absolute inset-0 z-20 overflow-auto bg-background p-[60px]">
              <div className="grid grid-cols-4 gap-6">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => {
                      go(i);
                      setShowGrid(false);
                    }}
                    className={`rounded-xl border-2 p-5 text-left text-[26px] ${
                      i === index ? "border-accent bg-card" : "border-line bg-card/50"
                    }`}
                  >
                    <div className="font-mono text-[20px] text-muted">{i + 1}</div>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click zones for mouse / touch navigation */}
      <button
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-0 top-0 h-full w-[5%] cursor-w-resize opacity-0"
      />
      <button
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-0 top-0 h-full w-[5%] cursor-e-resize opacity-0"
      />
    </div>
  );
}
