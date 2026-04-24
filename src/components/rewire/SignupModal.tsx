import { useState, type FormEvent } from "react";
import { Loader2, X } from "lucide-react";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useAuth } from "@/hooks/use-auth";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  subtitle?: string;
};

export function SignupModal({
  open,
  onClose,
  onSuccess,
  title = "Create your account",
  subtitle = "Save your progress and start your free trial",
}: Props) {
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signupError } = await signUp(email, password);
    if (signupError) {
      setSubmitting(false);
      setError(signupError.message);
      return;
    }
    // Try immediate sign-in (works when email confirmation is off)
    const { error: signinError } = await signIn(email, password);
    setSubmitting(false);
    if (signinError) {
      setError("Account created. Please check your email to confirm, then sign in.");
      return;
    }
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
      <div
        className="w-full max-w-md rounded-t-[28px] border border-white/[0.07] bg-[#0D1226] p-6 sm:rounded-[28px]"
        style={{ animation: "fadeUp 350ms ease-out" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              className="text-[22px] font-black leading-tight"
              style={{ letterSpacing: "-0.6px" }}
            >
              {title}
            </h2>
            <p className="mt-1 text-[13px] text-white/55">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-[#131A2E] text-white/60"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
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
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="Password (min 6 chars)"
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
                <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
              </span>
            ) : (
              "Create account & continue →"
            )}
          </PrimaryButton>
        </form>

        <p className="mt-4 text-center text-[11px] text-white/40">
          By continuing you agree to our terms. 7-day free trial.
        </p>
      </div>
    </div>
  );
}