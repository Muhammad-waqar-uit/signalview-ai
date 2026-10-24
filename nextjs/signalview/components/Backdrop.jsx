"use client";
import { useEffect, useRef } from "react";

// Deterministic pseudo-random so server and client render the same markup.
function rng(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const round = (n) => Math.round(n * 10) / 10;

const r = rng(11);
const LEAF_COLORS = ["#6b7630", "#8a8838", "#b49a45", "#4c5827", "#c8ad5a", "#7d7f33"];
const LEAVES = Array.from({ length: 78 }, (_, i) => {
  const left = i % 2 === 0;
  return {
    x: round(left ? r() * 36 - 4 : 60 + r() * 44),
    y: round(left ? 50 + r() * 42 : 44 + r() * 46),
    w: round(14 + r() * 26),
    h: round(6 + r() * 11),
    a: Math.round(r() * 180),
    c: LEAF_COLORS[Math.floor(r() * LEAF_COLORS.length)],
    blur: r() > 0.7 ? 3 : 0.6,
    o: round(0.62 + r() * 0.34)
  };
});
const BOKEH = Array.from({ length: 20 }, () => ({
  x: round(r() * 100),
  y: round(58 + r() * 40),
  s: Math.round(14 + r() * 58),
  d: round(r() * 5),
  o: round(0.35 + r() * 0.5)
}));

export default function Backdrop() {
  const layer = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        if (layer.current) layer.current.style.transform = `translate3d(0, ${y * 0.2}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="bd" aria-hidden="true">
      <div className="bd-layers" ref={layer}>
        <div className="bd-sky" />
        <i className="cloud c1" /><i className="cloud c2" /><i className="cloud c3" /><i className="cloud c4" />
        <div className="bd-leaves">
          {LEAVES.map((l, i) => (
            <b
              key={i}
              style={{
                left: l.x + "%", top: l.y + "%", width: l.w, height: l.h, background: l.c,
                opacity: l.o, transform: `rotate(${l.a}deg)`, filter: `blur(${l.blur}px)`
              }}
            />
          ))}
        </div>
        <div className="bd-bokeh">
          {BOKEH.map((b, i) => (
            <u key={i} style={{ left: b.x + "%", top: b.y + "%", width: b.s, height: b.s, animationDelay: b.d + "s", ["--o"]: b.o }} />
          ))}
        </div>
        <i className="flare" />
      </div>
      <div className="bd-grain" />
      <div className="bd-shade" />
    </div>
  );
}
