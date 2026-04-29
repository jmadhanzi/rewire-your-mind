import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/rewire/Logo";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
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
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#7858FF]/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#00D9A3]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-14">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <Logo size={56} />
          <h1 className="mt-5 text-[30px] font-black leading-tight" style={{ letterSpacing: "-0.8px" }}>
            Welcome back
          </h1>
          <p className="mt-1.5 text-[14px] text-white/50">
            Sign in to continue your training
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={onSubmit}
          className="mt-10 space-y-3"
        >
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/[0.08] bg-[#131A2E] pl-11 pr-4 py-4 text-[15px] text-white placeholder:text-white/25 focus:border-[#7858FF]/60 focus:outline-none focus:ring-2 focus:ring-[#7858FF]/20 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
            <input
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/[0.08] bg-[#131A2E] pl-11 pr-12 py-4 text-[15px] text-white placeholder:text-white/25 focus:border-[#7858FF]/60 focus:outline-none focus:ring-2 focus:ring-[#7858FF]/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[#FF6B6B]/25 bg-[#FF6B6B]/10 px-4 py-3 text-[13px] text-[#FF6B6B]"
            >
              {error}
            </motion.div>
          )}

          <div className="pt-1">
            <PrimaryButton disabled={submitting} type="submit">
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                </span>
              ) : (
                "Sign in →"
              )}
            </PrimaryButton>
          </div>
        </motion.form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/25">or</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Alternative */}
        <button
          type="button"
          onClick={() => navigate({ to: "/welcome" })}
          className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 text-[14px] font-semibold text-white/60 hover:bg-white/[0.06] hover:text-white/80 transition-all"
        >
          Create a new account
        </button>

        <p className="mt-auto pt-10 text-center text-[13px] text-white/40">
          New here?{" "}
          <Link to="/" className="font-bold text-[#A78BFA] hover:text-[#C4B5FD] transition-colors">
            Start your free journey
          </Link>
        </p>
      </div>
    </main>
  );
}
