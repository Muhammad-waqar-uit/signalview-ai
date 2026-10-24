"use client";
import { useEffect, useRef, useState } from "react";

const ROWS = [
  { name: "Brent crude", val: "82.40", chg: "+1.2%", up: true, src: "Exchange feed" },
  { name: "US 10Y yield", val: "4.31%", chg: "-0.04", up: false, src: "Treasury" },
  { name: "Gold spot", val: "2,412", chg: "+0.3%", up: true, src: "Exchange feed" }
];

function Ask() {
  return (
    <div className="viz viz-ask">
      <div className="bubble">How did oil react to last week's rate decision?</div>
      <div className="typing"><i /><i /><i /></div>
    </div>
  );
}

function Pull() {
  return (
    <div className="viz viz-pull">
      {ROWS.map((r) => (
        <div className="row" key={r.name}>
          <span className="n">{r.name}</span>
          <span className="v">{r.val}</span>
          <span className={"c " + (r.up ? "up" : "down")}>{r.chg}</span>
          <span className="s">{r.src}</span>
        </div>
      ))}
    </div>
  );
}

function Chart() {
  const line = "M0 74 C30 68 48 84 78 62 S128 44 158 52 S208 24 238 30 S280 14 300 8";
  return (
    <div className="viz viz-chart">
      <svg viewBox="0 0 300 96" role="img" aria-label="Sample price line rising over the week">
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f7a8c" stopOpacity=".28" />
            <stop offset="1" stopColor="#1f7a8c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[24, 48, 72].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#e6e8ea" strokeWidth="1" />)}
        <path d={line + " L300 96 L0 96Z"} fill="url(#area)" />
        <path className="draw" d={line} pathLength="1" fill="none" stroke="#1f7a8c" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="300" cy="8" r="4.5" fill="#1f7a8c" />
      </svg>
      <p className="note">Oil rose most on Tuesday, after the decision. Sources listed below the chart.</p>
    </div>
  );
}

const STEPS = [
  { t: "Ask in plain words", d: "Type the question the way you would say it to a colleague. No filters or query syntax.", v: <Ask /> },
  { t: "We pull live data", d: "SignalView reads current prices and filings, and keeps the source next to every number.", v: <Pull /> },
  { t: "Read a clean answer", d: "You get a chart and a short summary you can check against the sources.", v: <Chart /> }
];

export default function HowItWorks() {
  const root = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const els = root.current.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.18 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className={ready ? "ready" : ""}>
      <section className="how" id="how">
        <p className="eyebrow rv">HOW IT WORKS</p>
        <h2 className="rv">From a question to a checked answer in seconds.</h2>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step rv" key={s.t} style={{ transitionDelay: i * 90 + "ms" }}>
              <span className="idx">{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              {s.v}
              <span className="tag">Sample</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="start" id="start">
        <h2 className="rv">Start with one question.</h2>
        <p className="rv">Free to try. No card needed.</p>
        <a className="btn-dark rv" href="#top">Start Free</a>
        <footer>SignalView AI · Sample figures shown for illustration only</footer>
      </section>
    </div>
  );
}
