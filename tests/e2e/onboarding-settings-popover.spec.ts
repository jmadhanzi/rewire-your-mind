import { test, expect, type Page } from "@playwright/test";

/**
 * Verifies that the OnboardingSettingsButton (gear icon) in every onboarding
 * step header opens with Enter and Space, and dismisses with Escape.
 *
 * Each route is seeded with the onboarding store state required by the
 * `/onboarding` layout guard so the page renders instead of redirecting.
 */

type OnboardingState = {
  goals?: string[];
  challenges?: string[];
  identity?: string;
  timeCommitment?: string;
  baselineScore?: number | null;
  brainProfile?: Record<string, unknown>;
};

const FULL_STATE: Required<OnboardingState> = {
  goals: ["focus"],
  challenges: ["Mind wanders constantly"],
  identity: "adhd",
  timeCommitment: "10",
  baselineScore: 72,
  brainProfile: {},
};

const STEPS: Array<{ name: string; path: string; state: OnboardingState }> = [
  { name: "goals", path: "/onboarding/goals", state: {} },
  {
    name: "challenges",
    path: "/onboarding/challenges",
    state: { goals: FULL_STATE.goals },
  },
  {
    name: "identity",
    path: "/onboarding/identity",
    state: { goals: FULL_STATE.goals, challenges: FULL_STATE.challenges },
  },
  {
    name: "time",
    path: "/onboarding/time",
    state: {
      goals: FULL_STATE.goals,
      challenges: FULL_STATE.challenges,
      identity: FULL_STATE.identity,
    },
  },
  {
    name: "game",
    path: "/onboarding/game",
    state: {
      goals: FULL_STATE.goals,
      challenges: FULL_STATE.challenges,
      identity: FULL_STATE.identity,
      timeCommitment: FULL_STATE.timeCommitment,
    },
  },
  {
    name: "processing",
    path: "/onboarding/processing",
    state: FULL_STATE,
  },
  {
    name: "profile",
    path: "/onboarding/profile",
    state: FULL_STATE,
  },
];

async function seedOnboarding(page: Page, state: OnboardingState) {
  // Seed zustand-persist storage BEFORE the app boots so the layout guard
  // doesn't redirect us back to /onboarding/goals.
  await page.addInitScript((seed) => {
    const merged = {
      goals: [],
      challenges: [],
      identity: "",
      timeCommitment: "",
      baselineScore: null,
      brainProfile: {},
      ...seed,
    };
    window.localStorage.setItem(
      "rewire-onboarding",
      JSON.stringify({ state: merged, version: 0 }),
    );
  }, state);
}

for (const step of STEPS) {
  test.describe(`onboarding settings popover — ${step.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await seedOnboarding(page, step.state);
      await page.goto(step.path);
      // Wait for the gear button to be present.
      await expect(
        page.getByRole("button", { name: "Onboarding settings" }),
      ).toBeVisible();
    });

    test("Enter opens the popover and Escape dismisses it", async ({ page }) => {
      const trigger = page.getByRole("button", { name: "Onboarding settings" });
      await trigger.focus();
      await expect(trigger).toBeFocused();

      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog", { name: /onboarding settings/i });
      await expect(dialog).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });

    test("Space opens the popover and Escape dismisses it", async ({ page }) => {
      const trigger = page.getByRole("button", { name: "Onboarding settings" });
      await trigger.focus();
      await expect(trigger).toBeFocused();

      await page.keyboard.press("Space");
      const dialog = page.getByRole("dialog", { name: /onboarding settings/i });
      await expect(dialog).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });
  });
}