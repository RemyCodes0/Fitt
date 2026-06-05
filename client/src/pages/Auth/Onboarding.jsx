import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Step definitions ────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    tag: "Step 01 / 05",
    title: "Your style identity",
    subtitle: "How would you describe your personal style? Pick everything that resonates.",
    type: "multi_card",
    field: "styleIdentity",
    options: [
      { value: "minimal", label: "Minimal", sub: "Clean lines, neutral palette" },
      { value: "streetwear", label: "Streetwear", sub: "Bold, graphic, urban" },
      { value: "old_money", label: "Old Money", sub: "Quiet luxury, timeless" },
      { value: "bohemian", label: "Bohemian", sub: "Layered, free-spirited" },
      { value: "workwear", label: "Workwear", sub: "Smart, professional" },
      { value: "casual", label: "Casual Cool", sub: "Effortless, relaxed" },
      { value: "avant_garde", label: "Avant-Garde", sub: "Experimental, artistic" },
      { value: "preppy", label: "Preppy", sub: "Classic collegiate" },
    ],
  },
  {
    id: 2,
    tag: "Step 02 / 05",
    title: "Your color world",
    subtitle: "Which palettes do you gravitate toward most?",
    type: "multi_card",
    field: "colorPalette",
    options: [
      { value: "neutrals", label: "Neutrals", sub: "Black, white, grey, beige", swatch: ["#1a1a1a", "#f5f0eb", "#9e9e9e", "#d4c5b0"] },
      { value: "earth", label: "Earth Tones", sub: "Rust, olive, camel, brown", swatch: ["#8b4513", "#6b7c3a", "#c19a6b", "#a0522d"] },
      { value: "monochrome", label: "Monochrome", sub: "One color, many shades", swatch: ["#1a1a2e", "#16213e", "#0f3460", "#533483"] },
      { value: "pastels", label: "Pastels", sub: "Soft, muted, dreamy", swatch: ["#ffd1dc", "#b5ead7", "#c7ceea", "#ffeaa7"] },
      { value: "bold", label: "Bold & Vivid", sub: "High contrast, statement", swatch: ["#e63946", "#f4a261", "#2a9d8f", "#e9c46a"] },
      { value: "dark", label: "Dark Palette", sub: "Deep, moody, rich", swatch: ["#1b1b2f", "#2d2d44", "#3d3d5c", "#4a4a6a"] },
    ],
  },
  {
    id: 3,
    tag: "Step 03 / 05",
    title: "How you dress day to day",
    subtitle: "Tell us about your lifestyle and the occasions you dress for most.",
    type: "mixed",
    field: "lifestyle",
    checkboxes: {
      label: "Occasions you dress for regularly",
      field: "occasions",
      options: [
        "Office / Work", "Casual weekends", "Dates & evenings out",
        "Gym & active wear", "Formal events", "Travel", "Creative workspace", "Going out / nightlife",
      ],
    },
    radio: {
      label: "How often do you shop for clothes?",
      field: "shoppingFrequency",
      options: ["Monthly", "Every few months", "Seasonally", "Only when I need something"],
    },
  },
  {
    id: 4,
    tag: "Step 04 / 05",
    title: "Budget & retailers",
    subtitle: "Where do you usually shop and how much do you typically spend per outfit?",
    type: "mixed",
    field: "budget",
    radio: {
      label: "Typical budget per complete outfit",
      field: "budgetRange",
      options: ["Under $50", "$50 – $150", "$150 – $300", "$300 – $500", "$500+"],
    },
    addList: {
      label: "Retailers you love",
      field: "favoriteRetailers",
      placeholder: "e.g. Zara, COS, Uniqlo…",
      suggestions: ["Zara", "ASOS", "H&M", "Uniqlo", "COS", "& Other Stories", "Mango", "SSENSE", "Arket", "Weekday"],
    },
  },
  {
    id: 5,
    tag: "Step 05 / 05",
    title: "Fit & sizing",
    subtitle: "Help us recommend pieces that actually fit you well.",
    type: "sizing",
    field: "sizing",
    fields: [
      { label: "Top size", field: "topSize", options: ["XS", "S", "M", "L", "XL", "XXL"] },
      { label: "Bottom size", field: "bottomSize", options: ["XS / 26", "S / 28", "M / 30", "L / 32", "XL / 34", "XXL / 36"] },
      { label: "Shoe size (EU)", field: "shoeSize", type: "number", placeholder: "e.g. 42" },
    ],
    radio: {
      label: "Preferred fit",
      field: "fitPreference",
      options: ["Slim / Fitted", "Regular", "Relaxed / Oversized", "Mix — depends on the piece"],
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MultiCard({ options, value = [], onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map((opt) => {
        const selected = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(toggle(value, opt.value))}
            className={`relative text-left p-4 rounded-lg border transition-all duration-200 group
              ${selected
                ? "border-accent bg-accent/5 shadow-[0_0_0_1px] shadow-accent"
                : "border-border bg-card hover:border-foreground/30"
              }`}
          >
            {opt.swatch && (
              <div className="flex gap-1 mb-3">
                {opt.swatch.map((c) => (
                  <span key={c} className="size-3 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
            )}
            <p className="text-sm font-medium leading-tight">{opt.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{opt.sub}</p>
            {selected && (
              <span className="absolute top-2 right-2 size-4 rounded-full bg-accent grid place-items-center">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Checkboxes({ label, options, value = [], onChange }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const checked = value.includes(opt);
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                ${checked ? "border-accent bg-accent/5" : "border-border bg-card hover:border-foreground/30"}`}
            >
              <span className={`size-4 rounded border flex-shrink-0 grid place-items-center transition-colors
                ${checked ? "bg-accent border-accent" : "border-border"}`}>
                {checked && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => onChange(toggle(value, opt))} />
              <span className="text-xs font-medium">{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full border text-xs font-medium transition-all
              ${value === opt
                ? "border-accent bg-accent/5 text-accent"
                : "border-border bg-card hover:border-foreground/30"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function AddList({ label, field, placeholder, suggestions, value = [], onChange }) {
  const [input, setInput] = useState("");

  const add = (val) => {
    const trimmed = val.trim();
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed]);
    setInput("");
  };

  const remove = (val) => onChange(value.filter((v) => v !== val));

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{label}</p>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-3">
        {suggestions.filter((s) => !value.includes(s)).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => add(s)}
            className="px-3 py-1.5 rounded-full border border-dashed border-border text-[11px] text-muted-foreground hover:border-accent hover:text-accent transition-colors"
          >
            + {s}
          </button>
        ))}
      </div>

      {/* Added items */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((v) => (
            <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-[11px] font-medium text-accent">
              {v}
              <button type="button" onClick={() => remove(v)} className="hover:text-foreground transition-colors">×</button>
            </span>
          ))}
        </div>
      )}

      {/* Custom input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add(input))}
          placeholder={placeholder}
          className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
        />
        <button
          type="button"
          onClick={() => add(input)}
          className="px-4 py-2.5 bg-card border border-border rounded-lg text-xs font-medium hover:border-accent hover:text-accent transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function SizingFields({ fields, radio, value = {}, onChange }) {
  const set = (field, val) => onChange({ ...value, [field]: val });
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {fields.map((f) => (
          <div key={f.field}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{f.label}</p>
            {f.options ? (
              <div className="flex flex-wrap gap-2">
                {f.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set(f.field, opt)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all
                      ${value[f.field] === opt
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-border bg-card hover:border-foreground/30"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="number"
                placeholder={f.placeholder}
                value={value[f.field] || ""}
                onChange={(e) => set(f.field, e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
            )}
          </div>
        ))}
      </div>
      <RadioGroup
        label={radio.label}
        options={radio.options}
        value={value[radio.field]}
        onChange={(v) => set(radio.field, v)}
      />
    </div>
  );
}

// ─── Completion animation ─────────────────────────────────────────────────────

function CompletionScreen({ onDone }) {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center gap-6 animate-fade-in">
      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scale-in { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes draw { from { stroke-dashoffset: 60 } to { stroke-dashoffset: 0 } }
        @keyframes expand { from { transform: scale(0) } to { transform: scale(40) } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .animate-fade-in { animation: fade-in 0.4s ease forwards; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
        .animate-draw { animation: draw 0.5s ease 0.7s both; }
        .animate-expand { animation: expand 0.8s cubic-bezier(0.4,0,0.2,1) 1.2s both; }
        .animate-slide-up-1 { animation: slide-up 0.5s ease 1.0s both; }
        .animate-slide-up-2 { animation: slide-up 0.5s ease 1.2s both; }
        .animate-slide-up-3 { animation: slide-up 0.5s ease 1.8s both; }
      `}</style>

      {/* Circle burst */}
      <div className="relative">
        <div className="animate-scale-in size-24 rounded-full bg-accent/10 border border-accent/30 grid place-items-center relative overflow-hidden">
          <div className="animate-expand absolute size-3 rounded-full bg-accent/20" />
          <svg className="animate-scale-in relative z-10" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" className="text-accent/30" />
            <path
              className="animate-draw text-accent"
              d="M12 20l6 6 10-12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
            />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="animate-slide-up-1 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Style Profile Complete
        </p>
        <h2 className="animate-slide-up-2 text-3xl font-display italic">
          Your studio is ready.
        </h2>
        <p className="animate-slide-up-3 text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Fitt has built your style DNA. Every recommendation from here is made for you.
        </p>
      </div>

      <button
        onClick={onDone}
        className="animate-slide-up-3 mt-4 px-8 py-3 bg-foreground text-background rounded-full text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors"
      >
        Enter Fitt →
      </button>
    </div>
  );
}

// ─── Main Onboarding component ────────────────────────────────────────────────

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState({
    styleIdentity: [],
    colorPalette: [],
    occasions: [],
    shoppingFrequency: "",
    budgetRange: "",
    favoriteRetailers: [],
    sizing: {},
  });

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const setField = (field, val) => setAnswers((prev) => ({ ...prev, [field]: val }));

  const canProceed = () => {
    if (current.type === "multi_card") return answers[current.field]?.length > 0;
    if (current.type === "mixed") {
      if (current.checkboxes) return answers[current.checkboxes.field]?.length > 0;
      if (current.radio) return !!answers[current.radio.field];
    }
    if (current.type === "sizing") return !!answers.sizing?.fitPreference;
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
      // TODO: save answers to your backend here
      console.log("Onboarding complete:", answers);
    }
  };

  const handleBack = () => setStep((s) => s - 1);

  if (done) {
    return <CompletionScreen onDone={() => navigate("/chat")} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Progress bar */}
      <div className="h-0.5 bg-border w-full">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-border">
        <span className="font-display italic text-2xl">Fitt</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {current.tag}
        </span>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 lg:py-16">
        {/* Step header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            {current.tag}
          </p>
          <h1 className="text-3xl lg:text-4xl font-display italic mb-2">
            {current.title}
          </h1>
          <p className="text-sm text-muted-foreground">{current.subtitle}</p>
        </div>

        {/* Step body */}
        <div className="space-y-8">

          {/* Multi card */}
          {current.type === "multi_card" && (
            <MultiCard
              options={current.options}
              value={answers[current.field]}
              onChange={(v) => setField(current.field, v)}
            />
          )}

          {/* Mixed: checkboxes + radio */}
          {current.type === "mixed" && (
            <>
              {current.checkboxes && (
                <Checkboxes
                  label={current.checkboxes.label}
                  options={current.checkboxes.options}
                  value={answers[current.checkboxes.field]}
                  onChange={(v) => setField(current.checkboxes.field, v)}
                />
              )}
              {current.radio && (
                <RadioGroup
                  label={current.radio.label}
                  options={current.radio.options}
                  value={answers[current.radio.field]}
                  onChange={(v) => setField(current.radio.field, v)}
                />
              )}
              {current.addList && (
                <AddList
                  label={current.addList.label}
                  placeholder={current.addList.placeholder}
                  suggestions={current.addList.suggestions}
                  value={answers[current.addList.field]}
                  onChange={(v) => setField(current.addList.field, v)}
                />
              )}
            </>
          )}

          {/* Sizing */}
          {current.type === "sizing" && (
            <SizingFields
              fields={current.fields}
              radio={current.radio}
              value={answers.sizing}
              onChange={(v) => setField("sizing", v)}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="text-[11px] uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === step
                    ? "size-2 bg-accent"
                    : i < step
                    ? "size-1.5 bg-accent/40"
                    : "size-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-2.5 bg-foreground text-background rounded-full text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            {step === STEPS.length - 1 ? "Finish" : "Continue →"}
          </button>
        </div>
      </main>
    </div>
  );
}