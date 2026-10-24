"use client";
import { useEffect, useRef, useState } from "react";

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 14 L6 14 L8.5 7 L12 18 L14.5 10 L16 14 L22 14" />
    </svg>
  );
}

// Glass pill that shrinks to a small pill once you scroll, and opens again on tap.
export default function Nav() {
  const [collapsed, setCollapsed] = useState(false);
  const forcedAt = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (forcedAt.current !== null) {
        if (Math.abs(y - forcedAt.current) > 40) forcedAt.current = null;
        else return;
      }
      setCollapsed(y > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const expand = () => {
    forcedAt.current = window.scrollY;
    setCollapsed(false);
  };

  return (
    <header className={"nav" + (collapsed ? " is-collapsed" : "")}>
      <div className="nav-inner" aria-hidden={collapsed}>
        <a className="brand" href="#top"><Mark /><span>SignalView AI</span></a>
        <a className="open" href="#start" tabIndex={collapsed ? -1 : 0}>Open App</a>
      </div>
      <button className="nav-dot" aria-label="Open navigation" onClick={expand} tabIndex={collapsed ? 0 : -1}>
        <span />
      </button>
    </header>
  );
}
