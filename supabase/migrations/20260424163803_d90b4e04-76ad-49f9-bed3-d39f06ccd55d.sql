ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS last_session_date date,
  ADD COLUMN IF NOT EXISTS streak_savers_remaining integer NOT NULL DEFAULT 2,
  ADD COLUMN IF NOT EXISTS streak_savers_reset_at timestamp with time zone NOT NULL DEFAULT now();