import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useOnboardingStore } from "@/store/onboarding";

// Ordered onboarding steps. Index 0 = /welcome (step 1).
// Each step lists its path and the prerequisite predicate that must be true
// for the user to be allowed to land on it directly.
const STEPS: Array<{
  path: string;
  requires: (s: ReturnType<typeof useOnboardingStore.getState>) => boolean;
}> = [
  { path: "/onboarding/goals", requires: () => true },
  { path: "/onboarding/challenges", requires: (s) => s.goals.length > 0 },
  {
    path: "/onboarding/identity",
    requires: (s) => s.goals.length > 0 && s.challenges.length > 0,
  },
  {
    path: "/onboarding/time",
    requires: (s) =>
      s.goals.length > 0 && s.challenges.length > 0 && !!s.identity,
  },
  {
    path: "/onboarding/game",
    requires: (s) =>
      s.goals.length > 0 &&
      s.challenges.length > 0 &&
      !!s.identity &&
      !!s.timeCommitment,
  },
  {
    path: "/onboarding/processing",
    requires: (s) =>
      s.goals.length > 0 &&
      s.challenges.length > 0 &&
      !!s.identity &&
      !!s.timeCommitment &&
      s.baselineScore !== null,
  },
  {
    path: "/onboarding/profile",
    requires: (s) =>
      s.goals.length > 0 &&
      s.challenges.length > 0 &&
      !!s.identity &&
      !!s.timeCommitment &&
      s.baselineScore !== null,
  },
];

export const Route = createFileRoute("/onboarding")({
  beforeLoad: ({ location }) => {
    const state = useOnboardingStore.getState();
    const target = STEPS.find((s) => s.path === location.pathname);

    // Unknown /onboarding/* path — send to first step.
    if (!target) {
      throw redirect({ to: "/onboarding/goals" });
    }

    // Validate prerequisites; if missing, redirect to the earliest
    // step the user is actually allowed to be on.
    if (!target.requires(state)) {
      const firstAllowed = [...STEPS]
        .reverse()
        .find((s) => s.requires(state))?.path ?? "/onboarding/goals";
      throw redirect({ to: firstAllowed });
    }
  },
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return <Outlet />;
}