import { Settings2 } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * OnboardingSettingsButton
 *
 * Used in the header of every onboarding step route:
 *   /onboarding/goals
 *   /onboarding/challenges
 *   /onboarding/identity
 *   /onboarding/time
 *   /onboarding/game
 *   /onboarding/processing
 *   /onboarding/profile
 *
 * Manual keyboard QA checklist (run on each route above):
 *   [ ] Tab focuses the gear button (visible focus ring).
 *   [ ] Enter on focused gear → popover opens, focus moves into content.
 *   [ ] Space on focused gear → popover opens, focus moves into content.
 *   [ ] Tab inside popover cycles through interactive elements (focus trap).
 *   [ ] Escape → popover dismisses and focus returns to the gear button.
 *   [ ] Click outside → popover dismisses.
 *   [ ] Toggling "Skip restart confirmation" persists across reloads
 *       (stored in `rewire-settings` via useSettingsStore).
 *
 * Behavior is provided by Radix Popover (shadcn/ui wrapper); no custom
 * keyboard handling is required.
 */
export function OnboardingSettingsButton() {
  const skipConfirm = useSettingsStore((s) => s.skipRestartConfirm);
  const setSkipConfirm = useSettingsStore((s) => s.setSkipRestartConfirm);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Onboarding settings"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
        >
          <Settings2 className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold">Onboarding settings</p>
            <p className="text-xs text-muted-foreground">
              Saved to your device.
            </p>
          </div>
          <label className="flex items-start gap-2 text-sm">
            <Checkbox
              checked={skipConfirm}
              onCheckedChange={(v) => setSkipConfirm(v === true)}
              className="mt-0.5"
            />
            <span>
              <span className="font-medium">Skip restart confirmation</span>
              <span className="block text-xs text-muted-foreground">
                Restart immediately without asking.
              </span>
            </span>
          </label>
        </div>
      </PopoverContent>
    </Popover>
  );
}