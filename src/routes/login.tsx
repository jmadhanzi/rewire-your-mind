import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/rewire/Logo";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) navigate({ to: "/app/home" });
  }, [authLoading, user, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setError(error.message);
    else navigate({ to: "/app/home" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07091A] text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#7858FF]/25 blur-[120px]" />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-14">
        <div className="flex flex-col items-center text-center">
          <Logo size={64} />
          <h1
            className="mt-6 text-[28px] font-black leading-tight"
            style={{ letterSpacing: "-0.8px" }}
          >
            Welcome back
          </h1>
          <p className="mt-2 text-[14px] text-white/55">Sign in to continue your training</p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-3">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/[0.07] bg-[#131A2E] px-4 py-4 text-[15px] text-white placeholder:text-white/30 focus:border-[#7858FF]/50 focus:outline-none"
          />
          <input
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/[0.07] bg-[#131A2E] px-4 py-4 text-[15px] text-white placeholder:text-white/30 focus:border-[#7858FF]/50 focus:outline-none"
          />
          {error && (
            <p className="rounded-xl border border-[#FF6B6B]/30 bg-[#FF6B6B]/10 px-3 py-2 text-[12px] text-[#FF6B6B]">
              {error}
            </p>
          )}
          <PrimaryButton disabled={submitting} type="submit">
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
              </span>
            ) : (
              "Sign in →"
            )}
          </PrimaryButton>
        </form>

        <p className="mt-auto pt-10 text-center text-[13px] text-white/50">
          New here?{" "}
          <Link to="/" className="font-semibold text-[#A78BFA]">
            Start your free journey
          </Link>
        </p>
      </div>
    </main>
  );
}