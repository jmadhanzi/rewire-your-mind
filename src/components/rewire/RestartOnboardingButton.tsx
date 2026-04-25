import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding";
import { useSettingsStore } from "@/store/settings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

export function RestartOnboardingButton() {
  const navigate = useNavigate();
  const reset = useOnboardingStore((s) => s.reset);
  const skipConfirm = useSettingsStore((s) => s.skipRestartConfirm);
  const setSkipConfirm = useSettingsStore((s) => s.setSkipRestartConfirm);
  const [open, setOpen] = useState(false);
  const [dontAsk, setDontAsk] = useState(false);

  const doRestart = () => {
    reset();
    navigate({ to: "/onboarding/goals" });
  };

  const onClick = () => {
    if (skipConfirm) {
      doRestart();
      return;
    }
    setDontAsk(false);
    setOpen(true);
  };

  const onConfirm = () => {
    if (dontAsk) setSkipConfirm(true);
    setOpen(false);
    doRestart();
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/60 transition hover:bg-white/[0.1] hover:text-white"
        aria-label="Restart onboarding"
      >
        <RotateCcw className="h-3 w-3" />
        Restart
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restart onboarding?</AlertDialogTitle>
            <AlertDialogDescription>
              Your answers so far will be cleared and you'll start over from step 2.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox
              checked={dontAsk}
              onCheckedChange={(v) => setDontAsk(v === true)}
            />
            Don't ask me again
          </label>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Restart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}