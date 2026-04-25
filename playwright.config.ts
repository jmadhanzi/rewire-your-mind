import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for Rewire onboarding e2e tests.
 *
 * Local usage:
 *   1. Install browsers once: `bunx playwright install chromium`
 *   2. Start the dev server in another terminal: `bun run dev`
 *      (or let Playwright start it automatically via webServer below).
 *   3. Run the suite: `bunx playwright test`
 *
 * Override the base URL with PLAYWRIGHT_BASE_URL when testing a deployed
 * preview, e.g.:
 *   PLAYWRIGHT_BASE_URL=https://your-preview.lovable.app bunx playwright test
 */
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const useLocalServer = !process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: useLocalServer
    ? {
        command: "bun run dev",
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
});