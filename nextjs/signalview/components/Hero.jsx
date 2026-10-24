import Backdrop from "./Backdrop";

const WORDS = ["Your", "Personal", "Market", "Researcher"];

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Backdrop />
      <div className="hero-copy">
        <h1>
          {WORDS.map((w, i) => (
            <span key={w}>
              <span className="w" style={{ "--i": i }}><span>{w}</span></span>{" "}
            </span>
          ))}
        </h1>
        <p className="sub">Live market data, clean charts, and clear answers from real data, in plain words.</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#start">Start Free <Arrow /></a>
          <a className="btn btn-ghost" href="#how">Explore Features <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
