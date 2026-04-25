import { Settings2 } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

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