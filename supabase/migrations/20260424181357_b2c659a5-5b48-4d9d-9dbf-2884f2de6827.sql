CREATE TABLE public.coach_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_coach_messages_user_created ON public.coach_messages(user_id, created_at);

ALTER TABLE public.coach_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own coach messages"
ON public.coach_messages FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own coach messages"
ON public.coach_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own coach messages"
ON public.coach_messages FOR DELETE
USING (auth.uid() = user_id);