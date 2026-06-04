import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import productTop from "@/assets/product-top.jpg";
import productBottom from "@/assets/product-bottom.jpg";
import productShoes from "@/assets/product-shoes.jpg";
import productAccessory from "@/assets/product-accessory.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fitt — Describe your vibe. We'll build the look." },
      {
        name: "description",
        content:
          "Fitt is an AI personal stylist. Describe how you want to look and get a complete outfit sourced from real retailers like Zara, ASOS, Uniqlo and more.",
      },
      { property: "og:title", content: "Fitt — Describe your vibe. We'll build the look." },
      {
        property: "og:description",
        content:
          "AI-powered fashion discovery. Describe an occasion, mood, or vibe — get a complete, coordinated outfit you can buy right now.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

const examplePrompts = [
  "Summer wedding in Tuscany",
  "Minimalist workwear capsule",
  "Old money aesthetic for fall",
];

const outfit = [
  {
    category: "Top",
    name: "Heavy Twill Overshirt",
    retailer: "Zara",
    material: "Cotton",
    price: "$89",
    image: productTop,
  },
  {
    category: "Bottom",
    name: "Relaxed Fit Trouser",
    retailer: "Uniqlo",
    material: "Wool",
    price: "$59",
    image: productBottom,
  },
  {
    category: "Shoes",
    name: "Lug-Sole Derby Loafer",
    retailer: "SSENSE",
    material: "Leather",
    price: "$145",
    image: productShoes,
  },
  {
    category: "Accessory",
    name: "Silver Frame Specs",
    retailer: "ASOS",
    material: "Acetate",
    price: "$19",
    image: productAccessory,
  },
];

const refinements = [
  "More casual",
  "Switch to earth tones",
  "Shoes under $80",
  "Add a coat",
];

const retailers = [
  { name: "Zara", role: "Global Partner" },
  { name: "SSENSE", role: "Premium Curator" },
  { name: "Uniqlo", role: "Essentials Partner" },
  { name: "ASOS", role: "Trend Partner" },
  { name: "H&M", role: "Staples Partner" },
];

export function Landing() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(
    "A tech interview in Berlin. Professional but creative.",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/auth", search: { redirect: "/chat", prompt: query } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-baseline gap-3">
          <span className="font-display italic text-2xl leading-none">Fitt</span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hidden sm:inline">
            Intelligence v1.0
          </span>
        </div>
        <div className="flex items-center gap-8">
          <a
            href="#look"
            className="text-[11px] uppercase tracking-wider font-medium hover:text-accent transition-colors"
          >
            Look
          </a>
          <a
            href="#network"
            className="text-[11px] uppercase tracking-wider font-medium hover:text-accent transition-colors"
          >
            Network
          </a>
          <a
            href="#profile"
            className="text-[11px] uppercase tracking-wider font-medium hover:text-accent transition-colors"
          >
            Profile
          </a>
          <Link
            to="/auth"
            search={{ redirect: "/chat", prompt: "" }}
            className="text-[11px] uppercase tracking-wider font-medium px-3 py-1.5 bg-foreground text-background rounded-full hover:bg-accent transition-colors"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-28">
        {/* Hero */}
        <section className="relative mb-32">
          <h1
            aria-hidden
            className="absolute -top-16 left-1/2 -translate-x-1/2 font-display italic select-none pointer-events-none whitespace-nowrap text-foreground/[0.04]"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 1 }}
          >
            The New Standard
          </h1>

          <div className="relative max-w-2xl mx-auto text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-6 text-accent animate-reveal">
              Personal Styling Engine
            </p>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-balance mb-12 animate-reveal" style={{ animationDelay: "100ms" }}>
              Describe your vibe.
              <br />
              We'll build the look.
            </h2>

            <form
              onSubmit={handleSubmit}
              className="relative group animate-reveal"
              style={{ animationDelay: "200ms" }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="A tech interview in Berlin. Professional but creative."
                className="w-full bg-card border border-border rounded-full py-5 pl-8 pr-32 text-base lg:text-lg outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm group-hover:shadow-md"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-foreground text-background rounded-full text-xs font-medium uppercase tracking-widest hover:bg-accent transition-all"
              >
                Find
              </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-3 animate-reveal" style={{ animationDelay: "300ms" }}>
              <span className="text-[10px] font-mono text-muted-foreground py-2 uppercase tracking-widest">
                Try:
              </span>
              {examplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => setQuery(p)}
                  className="text-[11px] font-medium border border-border rounded-full px-4 py-1.5 hover:bg-card transition-colors text-muted-foreground hover:text-foreground"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Outfit Results */}
        <section id="look" className="mb-32 scroll-mt-24">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                Response 01
              </p>
              <h3 className="text-2xl lg:text-3xl font-display italic">
                The Berlin Creative Look
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Curated from 4 retailers • Total: $312.00
              </p>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous look"
                className="size-9 rounded-full border border-border grid place-items-center hover:bg-card transition-colors text-xs"
              >
                ←
              </button>
              <button
                aria-label="Next look"
                className="size-9 rounded-full border border-border grid place-items-center hover:bg-card transition-colors text-xs"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outfit.map((item, i) => (
              <article
                key={item.name}
                className="group animate-reveal"
                style={{ animationDelay: `${400 + i * 100}ms` }}
              >
                <div className="aspect-[4/5] bg-surface rounded-sm overflow-hidden mb-4 relative ring-1 ring-black/5">
                  <img
                    src={item.image}
                    alt={`${item.name} from ${item.retailer}`}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase text-foreground/70 tracking-widest bg-background/80 backdrop-blur px-2 py-0.5 rounded-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
                      {item.retailer} / {item.material}
                    </p>
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  </div>
                  <p className="text-sm font-medium shrink-0">{item.price}</p>
                </div>
                <a
                  href="#"
                  className="mt-3 inline-block text-[10px] uppercase tracking-widest text-accent hover:underline underline-offset-4"
                >
                  Buy at {item.retailer} →
                </a>
              </article>
            ))}
          </div>

          {/* Refinement */}
          <div
            className="mt-12 p-6 bg-card border border-border rounded-lg flex flex-col md:flex-row md:items-center gap-6 animate-reveal"
            style={{ animationDelay: "800ms" }}
          >
            <p className="text-lg font-display italic shrink-0">Refine the look:</p>
            <div className="flex flex-wrap items-center gap-2">
              {refinements.map((r) => (
                <button
                  key={r}
                  className="px-4 py-2 bg-surface border border-border rounded-full text-xs font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  + {r}
                </button>
              ))}
              <input
                type="text"
                placeholder="Type follow-up..."
                className="bg-transparent text-xs font-medium outline-none border-b border-border ml-2 w-32 focus:w-56 focus:border-accent transition-all py-2"
              />
            </div>
          </div>
        </section>

        {/* Cross-retailer + Style Identity */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div id="network" className="animate-reveal scroll-mt-24" style={{ animationDelay: "900ms" }}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Retailer Network
            </h3>
            <ul className="space-y-0">
              {retailers.map((r, i) => (
                <li
                  key={r.name}
                  className={`flex items-center justify-between group cursor-default py-5 ${i !== 0 ? "border-t border-border" : ""}`}
                >
                  <span className="text-xl tracking-tight group-hover:text-accent transition-colors">
                    {r.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {r.role}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Fitt aggregates inventory across global retailers and ranks results by
              relevance and quality — never by who paid more.
            </p>
          </div>

          <div id="profile" className="animate-reveal scroll-mt-24" style={{ animationDelay: "1000ms" }}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Your Style Identity
            </h3>
            <div className="bg-foreground text-background p-8 rounded-sm">
              <div className="mb-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-50 mb-2">
                  Calculated DNA
                </p>
                <h4 className="text-3xl font-display italic">Modernist / Functionalist</h4>
              </div>
              <dl className="space-y-0">
                <div className="flex justify-between items-center py-4">
                  <dt className="text-xs uppercase tracking-wider opacity-70">Color Palette</dt>
                  <dd className="flex gap-1.5">
                    <span className="size-3.5 rounded-full bg-slate-800 ring-1 ring-white/20" />
                    <span className="size-3.5 rounded-full bg-stone-300 ring-1 ring-white/20" />
                    <span className="size-3.5 rounded-full bg-orange-900 ring-1 ring-white/20" />
                  </dd>
                </div>
                <div className="flex justify-between items-center border-t border-background/10 py-4">
                  <dt className="text-xs uppercase tracking-wider opacity-70">Budget Tier</dt>
                  <dd className="text-xs font-mono">Mid-Range</dd>
                </div>
                <div className="flex justify-between items-center border-t border-background/10 py-4">
                  <dt className="text-xs uppercase tracking-wider opacity-70">Fit Profile</dt>
                  <dd className="text-xs font-mono">Relaxed / Structured</dd>
                </div>
                <div className="flex justify-between items-center border-t border-background/10 py-4">
                  <dt className="text-xs uppercase tracking-wider opacity-70">Sessions</dt>
                  <dd className="text-xs font-mono">14 — learning</dd>
                </div>
              </dl>
              <button className="mt-8 w-full text-[11px] uppercase tracking-widest font-medium border border-background/20 rounded-full py-3 hover:bg-background hover:text-foreground transition-colors">
                Refine Style Profile
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Fitt Intelligence © 2026 • Built for the discerning.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Affiliate-supported. Always on your side.
          </p>
        </div>
      </footer>
    </div>
  );
}


