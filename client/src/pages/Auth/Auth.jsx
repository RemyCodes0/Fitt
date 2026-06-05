import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/chat";
  const prompt = searchParams.get("prompt") || "";

  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  // TODO: wire up your auth logic here
  setTimeout(() => {
    setLoading(false);
    if (mode === "signup") {
      navigate("/onboarding");
    } else {
      navigate(redirect);
    }
  }, 800);
};

  const handleGoogle = () => {
    setLoading(true);
    // TODO: wire up Google OAuth here
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-4 border-b border-border">
        <Link to="/" className="font-display italic text-2xl">
          Fitt
        </Link>
      </nav>

      <main className="flex-1 grid place-items-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Header */}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 text-center">
            {mode === "signin" ? "Welcome back" : "Join Fitt"}
          </p>
          <h1 className="text-3xl lg:text-4xl font-display italic text-center mb-2">
            {mode === "signin" ? "Sign in to your studio" : "Create your studio"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-10">
            Your AI stylist remembers every conversation.
          </p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full bg-foreground text-background rounded-full py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors disabled:opacity-50 mb-4"
          >
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              or
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Signup-only fields */}
            {mode === "signup" && (
              <>
                {/* First + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Alex"
                      value={form.firstName}
                      onChange={handleChange}
                      className="bg-card border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Dupont"
                      value={form.lastName}
                      onChange={handleChange}
                      className="bg-card border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      @
                    </span>
                    <input
                      type="text"
                      name="username"
                      required
                      placeholder="alexdupont"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-lg pl-8 pr-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Gender + Birthdate */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      required
                      value={form.gender}
                      onChange={handleChange}
                      className="bg-card border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="" disabled>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="nonbinary">Non-binary</option>
                      <option value="prefer_not">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      required
                      value={form.birthdate}
                      onChange={handleChange}
                      className="bg-card border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email — both modes */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="alex@email.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Password — both modes */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Confirm password — signup only */}
            {mode === "signup" && (
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pl-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                />
              </div>
            )}

            {/* Forgot password — signin only */}
            {mode === "signin" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[11px] text-muted-foreground hover:text-accent underline-offset-4 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-card border border-border rounded-full py-3.5 text-xs uppercase tracking-widest font-medium hover:border-accent hover:text-accent transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {mode === "signin" ? "New to Fitt?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-accent hover:underline underline-offset-4 font-medium"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>

          {/* Terms — signup only */}
          {mode === "signup" && (
            <p className="mt-4 text-center text-[10px] text-muted-foreground leading-relaxed">
              By creating an account you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-accent transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>
      </main>
    </div>
  );
}