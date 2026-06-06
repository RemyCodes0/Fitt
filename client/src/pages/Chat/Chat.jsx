import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowUp, Menu, Plus, Trash2, LogOut, X } from "lucide-react";
import { OutfitMessage, parseOutfit } from "@/components/OutfitMessage";

// ─── Mock data (replace with real API calls) ──────────────────────────────────

const MOCK_CONVERSATIONS = [
  { id: "1", title: "Summer wedding in Tuscany" },
  { id: "2", title: "Minimalist workwear capsule" },
  { id: "3", title: "First date, autumn in Paris" },
];

const MOCK_OUTFIT = {
  intro: "Here's a complete look for a tech interview in Berlin — professional but creative.",
  products: [
    { category: "Top", name: "Heavy Twill Overshirt", retailer: "Zara", material: "Cotton", price: 89, currency: "USD", description: "A structured overshirt in heavy twill.", image_query: "overshirt zara cotton" },
    { category: "Bottom", name: "Relaxed Fit Trouser", retailer: "Uniqlo", material: "Wool", price: 59, currency: "USD", description: "Tailored relaxed trousers in wool blend.", image_query: "relaxed trouser uniqlo wool" },
    { category: "Shoes", name: "Lug-Sole Derby Loafer", retailer: "SSENSE", material: "Leather", price: 145, currency: "USD", description: "Derby loafer with a chunky lug sole.", image_query: "derby loafer leather shoes" },
    { category: "Accessory", name: "Silver Frame Specs", retailer: "ASOS", material: "Acetate", price: 19, currency: "USD", description: "Thin silver frame glasses, acetate.", image_query: "silver frame glasses acetate" },
  ],
  styling_notes: "Keep the palette muted — the overshirt does the talking.",
  refinements: ["More casual", "Switch to earth tones", "Shoes under $80", "Add a coat"],
};

const EXAMPLE_PROMPTS = [
  "Summer wedding in Tuscany",
  "Minimalist workwear capsule",
  "First date, autumn in Paris",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ role }) {
  if (role === "user") {
    return (
      <div className="size-8 rounded-full bg-foreground text-background grid place-items-center text-xs font-medium shrink-0 animate-avatar-pop transition-transform hover:scale-110">
        You
      </div>
    );
  }
  return (
    <div className="size-8 rounded-full bg-accent/10 text-accent grid place-items-center font-display italic text-sm shrink-0 animate-avatar-pop animate-glow transition-transform hover:scale-110 hover:rotate-6">
      F
    </div>
  );
}

// ─── Outfit card ──────────────────────────────────────────────────────────────

function OutfitCard({ outfit, onRefine }) {
  return (
    <div className="mt-2 space-y-4">
      {/* Header */}
      <div className="pb-3 border-b border-border">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
          Complete Look
        </p>
        <h3 className="text-lg font-display italic">{outfit.label}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Curated from {outfit.retailers} retailers · Total: {outfit.total}
        </p>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-3">
        {outfit.items.map((item) => (
          <div
            key={item.name}
            className="bg-card border border-border rounded-lg p-3 hover:border-accent/40 transition-colors"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent">
              {item.category}
            </span>
            <p className="text-sm font-medium mt-0.5 leading-tight">{item.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {item.retailer} · {item.material}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium">{item.price}</span>
              <a
                href="#"
                className="text-[10px] uppercase tracking-widest text-accent hover:underline underline-offset-4"
              >
                Buy →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Refinement chips */}
      {outfit.refinements?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground self-center">
            Refine:
          </span>
          {outfit.refinements.map((r) => (
            <button
              key={r}
              onClick={() => onRefine(r)}
              className="px-3 py-1.5 bg-card border border-border rounded-full text-[11px] font-medium hover:border-accent hover:text-accent transition-colors"
            >
              + {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Message ──────────────────────────────────────────────────────────────────

function Message({ role, content, onRefine }) {
  if (role === "system") return null;
  const isUser = role === "user";
  const outfit = !isUser ? parseOutfit(content) : null;

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 animate-slide-right">
        <div className="max-w-[78%] min-w-0 flex flex-col items-end">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
            You
          </p>
          <div className="bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
          </div>
        </div>
        <Avatar role="user" />
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3 animate-slide-left">
      <Avatar role="assistant" />
      <div className="flex-1 min-w-0 max-w-[88%]">
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1.5">
          Fitt
        </p>
        {outfit ? (
          <OutfitCard outfit={outfit} onRefine={onRefine} />
        ) : (
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 transition-all hover:border-accent/40 hover:shadow-sm">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-slide-left">
      <Avatar role="assistant" />
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shimmer-bg">
        <span className="size-1.5 bg-accent rounded-full animate-bounce-dot" />
        <span
          className="size-1.5 bg-accent rounded-full animate-bounce-dot"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="size-1.5 bg-accent rounded-full animate-bounce-dot"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onPrompt }) {
  return (
    <div className="text-center pt-24">
      <p
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 animate-reveal"
        style={{ animationDelay: "0ms" }}
      >
        Your Personal Stylist
      </p>
      <h2
        className="text-3xl lg:text-4xl font-display italic mb-3 animate-reveal"
        style={{ animationDelay: "120ms" }}
      >
        What should you wear?
      </h2>
      <p
        className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed animate-reveal"
        style={{ animationDelay: "240ms" }}
      >
        Describe an occasion, mood, or vibe. I'll build a complete outfit from real
        retailers — and refine it together with you.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {EXAMPLE_PROMPTS.map((p, i) => (
          <button
            key={p}
            onClick={() => onPrompt(p)}
            className="text-xs border border-border rounded-full px-4 py-2 hover:border-accent hover:text-accent hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 animate-pop"
            style={{ animationDelay: `${360 + i * 100}ms` }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Chat Page ───────────────────────────────────────────────────────────

export default function ChatPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeId = searchParams.get("c") || "";
  const initialPrompt = searchParams.get("prompt") || "";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);

  const scrollRef = useRef(null);
  const sentInitial = useRef(false);
  const textareaRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  // Fire initial prompt from onboarding/landing
  useEffect(() => {
    if (initialPrompt && !sentInitial.current && !activeId) {
      sentInitial.current = true;
      handleSend(initialPrompt);
      navigate("/chat", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleSend = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || sending) return;

    setSending(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed, id: generateId() }]);

    // TODO: replace this mock response with your real API call
    setTimeout(() => {
      const mockResponse = `Here's a complete look for you:\n\`\`\`outfit\n${JSON.stringify(MOCK_OUTFIT)}\n\`\`\``;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: mockResponse, id: generateId() },
      ]);
      setSending(false);

      if (!activeId) {
        const newId = generateId();
        setConversations((prev) => [
          { id: newId, title: trimmed.slice(0, 40) },
          ...prev,
        ]);
        navigate(`/chat?c=${newId}`, { replace: true });
      }
    }, 1200);
  };

  const handleNewChat = () => {
    setMessages([]);
    navigate("/chat");
  };

  const handleDelete = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (id === activeId) handleNewChat();
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">

      {/* ── Sidebar ── */}
      <aside
        className={`${sidebarOpen ? "w-72" : "w-0"} transition-all duration-300 overflow-hidden border-r border-border bg-card flex-shrink-0`}
      >
        <div className="w-72 h-full flex flex-col">
          {/* Sidebar header */}
          <div className="p-4 flex items-center justify-between border-b border-border">
            <Link to="/" className="font-display italic text-xl">
              Fitt
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded hover:bg-background transition-colors"
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* New chat */}
          <button
            onClick={handleNewChat}
            className="m-3 flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors text-xs uppercase tracking-widest font-medium"
          >
            <Plus className="size-3.5" />
            New chat
          </button>

          {/* Conversation history */}
          <div className="flex-1 overflow-y-auto px-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-2">
              History
            </p>
            <ul className="space-y-1">
              {conversations.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigate(`/chat?c=${c.id}`)}
                    className={`group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-left hover:bg-background transition-colors
                      ${activeId === c.id ? "bg-background" : ""}`}
                  >
                    <span className="truncate flex-1">{c.title}</span>
                    <span
                      role="button"
                      tabIndex={0} 
                      onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                      onKeyDown={(e) => e.key === "Enter" && (e.stopPropagation(), handleDelete(c.id))}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                    >
                      <Trash2 className="size-3.5" />
                    </span>
                  </button>
                </li>
              ))}
              {conversations.length === 0 && (
                <li className="px-3 py-2 text-xs text-muted-foreground">No chats yet</li>
              )}
            </ul>
          </div>

          {/* Sign out */}
          <div className="p-3 border-t border-border">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            >
              <LogOut className="size-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded hover:bg-card transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="size-4" />
            </button>
          )}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex-1">
            Fitt Stylist
          </p>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8 space-y-10">
            {messages.length === 0 && !sending && (
              <EmptyState onPrompt={handleSend} />
            )}
            {messages.map((m) => (
              <Message
                key={m.id}
                role={m.role}
                content={m.content}
                onRefine={(t) => handleSend(t)}
              />
            ))}
            {sending && <TypingIndicator />}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-background">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="max-w-3xl mx-auto px-4 lg:px-8 py-4"
          >
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                rows={1}
                placeholder="Describe a look, or refine the last one…"
                className="w-full resize-none bg-card border border-border rounded-2xl py-4 pl-5 pr-14 text-sm outline-none focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_12%,transparent)] transition-all duration-300 max-h-40"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="absolute right-2 bottom-2 size-9 grid place-items-center bg-foreground text-background rounded-full hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 enabled:animate-glow"
                aria-label="Send"
              >
                <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-center mt-3">
              Fitt sources from real retailers — verify availability before purchase.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}