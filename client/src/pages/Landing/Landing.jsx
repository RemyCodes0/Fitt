import { useState, useEffect, useRef } from "react";

const examplePrompts = [
  "Summer wedding in Tuscany",
  "Minimalist workwear capsule",
  "Old money aesthetic for fall",
  "Streetwear date night in Tokyo",
  "Desert festival looks on a budget",
];

const outfit = [
  { category: "Top", name: "Heavy Twill Overshirt", retailer: "Zara", material: "Cotton", price: "$89", bg: "oklch(0.82 0.025 60)" },
  { category: "Bottom", name: "Relaxed Fit Trouser", retailer: "Uniqlo", material: "Wool blend", price: "$59", bg: "oklch(0.35 0.01 60)" },
  { category: "Shoes", name: "Lug-Sole Derby Loafer", retailer: "SSENSE", material: "Full-grain leather", price: "$145", bg: "oklch(0.22 0.01 50)" },
  { category: "Accessory", name: "Silver Frame Specs", retailer: "ASOS", material: "Acetate + steel", price: "$19", bg: "oklch(0.60 0.005 60)" },
];

const refinements = [
  "More casual", "Switch to earth tones", "Shoes under $80",
  "Add a coat", "Make it all black", "Warmer fabrics",
];

const retailers = [
  { name: "Zara", role: "Global Partner", items: "2.4M items" },
  { name: "SSENSE", role: "Premium Curator", items: "340K items" },
  { name: "Uniqlo", role: "Essentials Partner", items: "890K items" },
  { name: "ASOS", role: "Trend Partner", items: "1.8M items" },
  { name: "H&M", role: "Staples Partner", items: "1.1M items" },
  { name: "Mr Porter", role: "Luxury Curator", items: "210K items" },
  { name: "Net-a-Porter", role: "Luxury Curator", items: "190K items" },
];

const testimonials = [
  { quote: "I described 'Copenhagen gallery opening, semi-formal, not trying too hard' and it nailed it. Every piece.", author: "Maren H.", label: "Designer, Berlin" },
  { quote: "Finally something that gets that 'expensive but effortless' isn't a contradiction.", author: "James T.", label: "Creative Director, London" },
  { quote: "It learned my palette in two sessions. Now it barely needs a prompt.", author: "Sofia K.", label: "Architect, Milan" },
];

const howItWorks = [
  { step: "01", title: "Describe the context", body: "Write naturally. 'A rooftop dinner in June, smart-casual, I run warm' is a perfect prompt. Fitt reads between the lines." },
  { step: "02", title: "The engine curates", body: "Our model cross-references 6M+ items across our retailer network, filtering by your stored preferences, budget, and body profile." },
  { step: "03", title: "Refine in conversation", body: "Tell it what you like and don't. It adapts in real time. Each session trains your style DNA for better future results." },
  { step: "04", title: "Buy directly", body: "Every item links out to the retailer. No markups. No middleman. Fitt is affiliate-supported — but ranking is never for sale." },
];

const dnaTraits = [
  { label: "Palette", value: "Neutral / Warm Earth" },
  { label: "Silhouette", value: "Relaxed / Structured" },
  { label: "Budget tier", value: "Mid-range" },
  { label: "Fit profile", value: "Slightly oversized" },
  { label: "Texture bias", value: "Natural fibres" },
  { label: "Brand affinity", value: "Quiet luxury" },
  { label: "Sessions", value: "14 — still learning" },
];

const stats = [
  { value: "6M+", label: "indexed items" },
  { value: "47", label: "retail partners" },
  { value: "94%", label: "satisfaction rate" },
  { value: "< 3s", label: "time to outfit" },
];

const marqueeItems = ["Zara", "SSENSE", "Uniqlo", "ASOS", "H&M", "Mr Porter", "Net-a-Porter", "Matches", "Browns", "Farfetch", "COS", "Arket"];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.8s cubic-bezier(0.19,1,0.22,1) ${delay}ms, transform 0.8s cubic-bezier(0.19,1,0.22,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Landing() {
  const [query, setQuery] = useState("A tech interview in Berlin. Professional but creative.");
  const [activeOutfit, setActiveOutfit] = useState(0);
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTickerIdx(t => (t + 1) % examplePrompts.length), 3000);
    return () => clearInterval(id);
  }, []);

  // CSS vars matching the theme
  const theme = {
    bg: "oklch(0.973 0.005 85)",
    fg: "oklch(0.18 0.005 60)",
    muted: "oklch(0.55 0.008 60)",
    accent: "oklch(0.55 0.14 38)",
    accentFg: "oklch(0.98 0 0)",
    border: "oklch(0.18 0.005 60 / 0.10)",
    card: "oklch(1 0 0)",
    surface: "oklch(0.955 0.006 85)",
    primary: "oklch(0.18 0.005 60)",
    primaryFg: "oklch(0.98 0 0)",
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.fg, fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=JetBrains+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Playfair Display', ui-serif, Georgia, serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .nav-link { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: oklch(0.55 0.008 60); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: oklch(0.18 0.005 60); }
        .btn-primary { background: oklch(0.18 0.005 60); color: oklch(0.98 0 0); border: none; border-radius: 999px; padding: 10px 24px; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
        .btn-primary:hover { background: oklch(0.55 0.14 38); }
        .btn-ghost { background: transparent; border: 1px solid oklch(0.18 0.005 60 / 0.12); border-radius: 999px; padding: 7px 16px; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: oklch(0.55 0.008 60); cursor: pointer; transition: border-color 0.2s, color 0.2s; white-space: nowrap; }
        .btn-ghost:hover { border-color: oklch(0.18 0.005 60 / 0.35); color: oklch(0.18 0.005 60); }
        .search-wrap { position: relative; display: flex; align-items: center; background: oklch(1 0 0); border: 1px solid oklch(0.18 0.005 60 / 0.12); border-radius: 999px; padding: 6px 6px 6px 24px; gap: 10px; transition: border-color 0.2s, box-shadow 0.2s; }
        .search-wrap:focus-within { border-color: oklch(0.55 0.14 38 / 0.4); box-shadow: 0 0 0 3px oklch(0.55 0.14 38 / 0.08); }
        .search-input { background: transparent; border: none; outline: none; font-family: 'Inter', sans-serif; font-size: 15px; color: oklch(0.18 0.005 60); flex: 1; min-width: 0; }
        .search-input::placeholder { color: oklch(0.55 0.008 60 / 0.6); }
        .divider { border: none; border-top: 1px solid oklch(0.18 0.005 60 / 0.08); }
        .outfit-card { background: oklch(1 0 0); border: 1px solid oklch(0.18 0.005 60 / 0.10); border-radius: 2px; overflow: hidden; cursor: pointer; transition: border-color 0.25s, box-shadow 0.25s; }
        .outfit-card:hover { border-color: oklch(0.18 0.005 60 / 0.25); }
        .outfit-card.active { border-color: oklch(0.55 0.14 38 / 0.5); box-shadow: 0 0 0 1px oklch(0.55 0.14 38 / 0.15); }
        .refinement-pill { background: transparent; border: 1px solid oklch(0.18 0.005 60 / 0.12); border-radius: 999px; padding: 7px 14px; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: oklch(0.55 0.008 60); cursor: pointer; white-space: nowrap; transition: border-color 0.2s, color 0.2s; }
        .refinement-pill:hover { border-color: oklch(0.55 0.14 38 / 0.5); color: oklch(0.55 0.14 38); }
        .retailer-row { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-top: 1px solid oklch(0.18 0.005 60 / 0.08); transition: all 0.2s; cursor: default; }
        .retailer-row:hover .retailer-name { color: oklch(0.55 0.14 38); }
        .retailer-name { font-family: 'Playfair Display', serif; font-size: 20px; color: oklch(0.18 0.005 60); font-style: italic; transition: color 0.2s; }
        .stat-card { background: oklch(1 0 0); border: 1px solid oklch(0.18 0.005 60 / 0.08); border-radius: 2px; padding: 24px 20px; text-align: center; }
        .testimonial-card { background: oklch(1 0 0); border: 1px solid oklch(0.18 0.005 60 / 0.08); border-radius: 2px; padding: 28px; }
        .how-step { padding: 28px 0; border-top: 1px solid oklch(0.18 0.005 60 / 0.08); display: grid; grid-template-columns: 52px 1fr; gap: 20px; align-items: start; }
        .dna-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-top: 1px solid rgba(0,0,0,0.06); }
        .tag-mono { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-reveal { animation: slideUp 0.8s cubic-bezier(0.19,1,0.22,1) both; }
        .accent-link { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: oklch(0.55 0.14 38); text-decoration: none; }
        .accent-link:hover { text-decoration: underline; text-underline-offset: 3px; }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px",
        background: "oklch(0.973 0.005 85 / 0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.18 0.005 60 / 0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span className="font-display" style={{ fontSize: 24, fontStyle: "italic", color: theme.fg }}>Fitt</span>
          <span className="tag-mono" style={{ color: theme.muted }}>Intelligence v1.0</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[["Look", "#look"], ["How it works", "#how-it-works"], ["Network", "#network"], ["Profile", "#profile"]].map(([l, h]) => (
            <a key={l} href={h} className="nav-link">{l}</a>
          ))}
          <button className="btn-primary" style={{ padding: "8px 18px" }}>Sign in</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "96px 24px 72px", textAlign: "center" }}>
        <p className="tag-mono hero-reveal" style={{ color: theme.accent, marginBottom: 18, animationDelay: "0ms" }}>
          Personal Styling Engine
        </p>
        <h1 className="font-display hero-reveal" style={{
          fontSize: "clamp(2.6rem, 6vw, 4rem)", fontStyle: "italic", fontWeight: 400,
          lineHeight: 1.08, letterSpacing: "-0.01em", color: theme.fg,
          marginBottom: 20, animationDelay: "80ms",
        }}>
          Describe your vibe.<br />We'll build the look.
        </h1>
        <p className="hero-reveal" style={{
          fontSize: 15, color: theme.muted, fontWeight: 300, lineHeight: 1.75,
          maxWidth: 440, margin: "0 auto 44px", animationDelay: "160ms",
        }}>
          Tell Fitt where you're going and how you want to feel. It curates a full outfit from 6M+ items across 47 retail partners — in seconds.
        </p>

        {/* Search */}
        <div className="search-wrap hero-reveal" style={{ animationDelay: "240ms" }}>
          <input
            className="search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Describe the occasion, the vibe, the feeling…"
          />
          <button className="btn-primary">Find</button>
        </div>

        {/* Example prompts */}
        <div className="hero-reveal" style={{ marginTop: 18, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, alignItems: "center", animationDelay: "320ms" }}>
          <span className="tag-mono" style={{ color: theme.muted, opacity: 0.6 }}>Try:</span>
          {examplePrompts.map(p => (
            <button key={p} className="btn-ghost" onClick={() => setQuery(p)}>{p}</button>
          ))}
        </div>

        {/* Animated ticker */}
        <div className="hero-reveal" style={{ marginTop: 40, height: 18, overflow: "hidden", animationDelay: "400ms" }}>
          <div className="tag-mono" style={{
            color: theme.accent, opacity: 0.55,
            transform: `translateY(-${tickerIdx * 18}px)`,
            transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}>
            {examplePrompts.map(p => <div key={p} style={{ height: 18, lineHeight: "18px" }}>↳ {p}</div>)}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div style={{ borderTop: "1px solid oklch(0.18 0.005 60 / 0.07)", borderBottom: "1px solid oklch(0.18 0.005 60 / 0.07)", padding: "11px 0", overflow: "hidden", background: theme.surface }}>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((r, i) => (
            <span key={i} className="tag-mono" style={{ color: theme.muted, opacity: 0.5, marginRight: 48 }}>{r} &nbsp;·</span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {stats.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 70}>
              <div className="stat-card">
                <p className="font-display" style={{ fontSize: 30, fontStyle: "italic", fontWeight: 400, color: theme.fg, marginBottom: 6 }}>{value}</p>
                <p className="tag-mono" style={{ color: theme.muted, opacity: 0.7 }}>{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: 960, margin: "0 auto" }} />

      {/* ── Outfit ── */}
      <section id="look" style={{ maxWidth: 960, margin: "0 auto", padding: "80px 24px" }}>
        {/* Header */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, paddingBottom: 24, borderBottom: "1px solid oklch(0.18 0.005 60 / 0.08)" }}>
            <div>
              <p className="tag-mono" style={{ color: theme.accent, marginBottom: 8 }}>Response 01</p>
              <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontStyle: "italic", fontWeight: 400, color: theme.fg }}>The Berlin Creative Look</h2>
              <p style={{ fontSize: 13, color: theme.muted, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>Curated from 4 retailers · Total: $312.00</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-ghost" style={{ width: 36, height: 36, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
              <button className="btn-ghost" style={{ width: 36, height: 36, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
            </div>
          </div>
        </Reveal>

        {/* Outfit grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 16 }}>
          {outfit.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <article className={`outfit-card${activeOutfit === i ? " active" : ""}`} onClick={() => setActiveOutfit(i)}>
                <div style={{ width: "100%", aspectRatio: "4/5", background: item.bg, position: "relative", display: "flex", alignItems: "flex-start", padding: 12 }}>
                  <span className="tag-mono" style={{
                    fontSize: 9, color: "rgba(255,255,255,0.75)",
                    background: "rgba(0,0,0,0.28)", backdropFilter: "blur(4px)",
                    padding: "3px 8px", borderRadius: 2,
                  }}>{item.category}</span>
                </div>
                <div style={{ padding: "14px 14px 16px" }}>
                  <p className="tag-mono" style={{ fontSize: 9, color: theme.muted, marginBottom: 4 }}>{item.retailer} / {item.material}</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: theme.fg, marginBottom: 10 }}>{item.name}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: theme.fg }}>{item.price}</span>
                    <a href="#" className="accent-link">Buy at {item.retailer} →</a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Active item detail */}
        <Reveal>
          <div style={{
            background: theme.card, border: "1px solid oklch(0.18 0.005 60 / 0.08)",
            borderRadius: 2, padding: "20px 24px", display: "flex",
            alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 2, background: outfit[activeOutfit].bg, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: theme.fg }}>{outfit[activeOutfit].name}</p>
                <p className="tag-mono" style={{ fontSize: 9, color: theme.muted, marginTop: 3 }}>
                  {outfit[activeOutfit].retailer} · {outfit[activeOutfit].material}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: theme.fg }}>{outfit[activeOutfit].price}</span>
              <button className="btn-primary" style={{ padding: "8px 18px" }}>Shop now</button>
            </div>
          </div>
        </Reveal>

        {/* Refine */}
        <Reveal>
          <div style={{ background: theme.card, border: "1px solid oklch(0.18 0.005 60 / 0.08)", borderRadius: 2, padding: "22px 24px" }}>
            <p className="font-display" style={{ fontSize: 18, fontStyle: "italic", fontWeight: 400, color: theme.fg, marginBottom: 16 }}>Refine the look:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              {refinements.map(r => <button key={r} className="refinement-pill">+ {r}</button>)}
              <input
                type="text"
                placeholder="Type a follow-up…"
                style={{
                  background: "transparent", border: "none",
                  borderBottom: "1px solid oklch(0.18 0.005 60 / 0.15)",
                  outline: "none", color: theme.fg, fontFamily: "'Inter', sans-serif",
                  fontSize: 13, padding: "5px 2px", marginLeft: 8, width: 150,
                  transition: "border-color 0.2s",
                }}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <hr className="divider" style={{ maxWidth: 960, margin: "0 auto" }} />

      {/* ── How it works ── */}
      <section id="how-it-works" style={{ maxWidth: 960, margin: "0 auto", padding: "80px 24px" }}>
        <Reveal>
          <p className="tag-mono" style={{ color: theme.muted, opacity: 0.6, marginBottom: 14 }}>Process</p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontStyle: "italic", fontWeight: 400, color: theme.fg, maxWidth: 420, marginBottom: 48 }}>
            How Fitt builds your look
          </h2>
        </Reveal>
        {howItWorks.map((s, i) => (
          <Reveal key={s.step} delay={i * 60}>
            <div className="how-step">
              <span className="tag-mono" style={{ color: theme.accent, paddingTop: 2 }}>{s.step}</span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 500, color: theme.fg, marginBottom: 6 }}>{s.title}</p>
                <p style={{ fontSize: 14, color: theme.muted, fontWeight: 400, lineHeight: 1.7, maxWidth: 520 }}>{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <hr className="divider" style={{ maxWidth: 960, margin: "0 auto" }} />

      {/* ── Retailer Network + DNA ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>

        {/* Network */}
        <div id="network">
          <Reveal>
            <p className="tag-mono" style={{ color: theme.muted, opacity: 0.6, marginBottom: 28 }}>Retailer Network</p>
          </Reveal>
          {retailers.map((r, i) => (
            <Reveal key={r.name} delay={i * 45}>
              <div className="retailer-row">
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span className="retailer-name">{r.name}</span>
                  <span className="tag-mono" style={{ fontSize: 9, color: theme.muted, opacity: 0.5 }}>{r.items}</span>
                </div>
                <span className="tag-mono" style={{ fontSize: 9, color: theme.muted, opacity: 0.7 }}>{r.role}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={350}>
            <p style={{ fontSize: 13, color: theme.muted, fontWeight: 300, lineHeight: 1.7, maxWidth: 340, marginTop: 24 }}>
              Fitt aggregates inventory across global retailers and ranks results by relevance and quality — never by who paid more.
            </p>
          </Reveal>
        </div>

        {/* Style DNA */}
        <div id="profile">
          <Reveal>
            <p className="tag-mono" style={{ color: theme.muted, opacity: 0.6, marginBottom: 28 }}>Your Style Identity</p>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ background: theme.primary, color: theme.primaryFg, borderRadius: 2, padding: "32px 28px" }}>
              <div style={{ marginBottom: 22 }}>
                <p className="tag-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Calculated DNA</p>
                <h3 className="font-display" style={{ fontSize: 26, fontStyle: "italic", fontWeight: 400, color: theme.primaryFg, lineHeight: 1.1 }}>
                  Modernist<br />Functionalist
                </h3>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                {["oklch(0.82 0.025 60)", "oklch(0.55 0.025 55)", "oklch(0.38 0.02 50)", "oklch(0.22 0.01 50)"].map((c, i) => (
                  <span key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "1.5px solid rgba(255,255,255,0.15)", display: "inline-block" }} />
                ))}
              </div>
              {dnaTraits.map(t => (
                <div key={t.label} className="dna-row" style={{ borderTopColor: "rgba(255,255,255,0.07)" }}>
                  <span className="tag-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.45)" }}>{t.label}</span>
                  <span className="tag-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.8)" }}>{t.value}</span>
                </div>
              ))}
              <button
                className="tag-mono"
                style={{
                  marginTop: 24, width: "100%", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.18)", borderRadius: 999,
                  padding: "12px 0", fontSize: 10, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.7)",
                  cursor: "pointer", transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                Refine style profile
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: 960, margin: "0 auto" }} />

      {/* ── Testimonials ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "80px 24px" }}>
        <Reveal>
          <p className="tag-mono" style={{ color: theme.muted, opacity: 0.6, marginBottom: 44 }}>What people say</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 80}>
              <div className="testimonial-card">
                <p className="font-display" style={{ fontSize: 15, fontStyle: "italic", fontWeight: 400, color: theme.fg, lineHeight: 1.7, marginBottom: 20 }}>
                  "{t.quote}"
                </p>
                <p style={{ fontSize: 13, fontWeight: 500, color: theme.fg }}>{t.author}</p>
                <p className="tag-mono" style={{ fontSize: 9, color: theme.muted, marginTop: 3 }}>{t.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: 960, margin: "0 auto" }} />

      {/* ── CTA ── */}
      <section style={{ maxWidth: 560, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <Reveal>
          <p className="tag-mono" style={{ color: theme.accent, marginBottom: 18 }}>Get started free</p>
          <h2 className="font-display" style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", fontWeight: 400,
            color: theme.fg, lineHeight: 1.1, marginBottom: 18,
          }}>
            Your wardrobe,<br />finally intelligent.
          </h2>
          <p style={{ fontSize: 15, color: theme.muted, fontWeight: 300, lineHeight: 1.7, maxWidth: 380, margin: "0 auto 40px" }}>
            It learns with every session. The more you use it, the fewer words you need.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ padding: "13px 32px", fontSize: 11 }}>Create your profile</button>
            <button className="btn-ghost" style={{ padding: "13px 28px" }}>Browse example looks</button>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid oklch(0.18 0.005 60 / 0.08)", padding: "28px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="font-display" style={{ fontSize: 18, fontStyle: "italic", color: theme.fg }}>Fitt</span>
            <span className="tag-mono" style={{ color: theme.muted, opacity: 0.5 }}>Intelligence © 2026 · Built for the discerning.</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Affiliate disclosure", "Press"].map(l => (
              <a key={l} href="#" className="nav-link" style={{ opacity: 0.6 }}>{l}</a>
            ))}
          </div>
          <span className="tag-mono" style={{ color: theme.muted, opacity: 0.5 }}>Affiliate-supported. Always on your side.</span>
        </div>
      </footer>
    </div>
  );
}