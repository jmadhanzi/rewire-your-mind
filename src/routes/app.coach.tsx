import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Sparkles, Lock, Trash2, Pencil, X, Check } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { MotionScreen } from "@/components/rewire/MotionScreen";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { GhostButton } from "@/components/rewire/GhostButton";
import { useUserStore } from "@/store/user";
import { isPro } from "@/lib/freemium";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/coach")({
  component: Page,
});

type Msg = { role: "user" | "assistant"; content: string };
type DbMsg = Msg & { id: string; created_at: string };

const STARTERS = [
  "Which game should I play right now?",
  "How do I improve my focus score?",
  "Tips to protect my streak today",
  "I feel mentally foggy — help",
];

function Page() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const brainScores = useUserStore((s) => s.brainScores);
  const streak = useUserStore((s) => s.streak);
  const pro = isPro(subscriptionTier);

  const [messages, setMessages] = useState<DbMsg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load persisted chat history when user is available
  useEffect(() => {
    if (!user) {
      setHistoryLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("coach_messages")
        .select("id, role, content, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      if (cancelled) return;
      if (error) {
        console.error("load coach history", error);
      } else if (data) {
        setMessages(
          data.map((m) => ({
            id: m.id,
            role: m.role as "user" | "assistant",
            content: m.content,
            created_at: m.created_at,
          })),
        );
      }
      setHistoryLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const persistMessage = async (msg: Msg): Promise<DbMsg | null> => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("coach_messages")
      .insert({ user_id: user.id, role: msg.role, content: msg.content })
      .select("id, role, content, created_at")
      .single();
    if (error) {
      console.error("persist coach message", error);
      return null;
    }
    return {
      id: data.id,
      role: data.role as "user" | "assistant",
      content: data.content,
      created_at: data.created_at,
    };
  };

  const clearHistory = async () => {
    if (!user || isStreaming) return;
    const prev = messages;
    setMessages([]);
    const { error } = await supabase.from("coach_messages").delete().eq("user_id", user.id);
    if (error) {
      console.error("clear coach history", error);
      setMessages(prev);
      toast.error("Couldn't clear history.");
    }
  };

  if (!pro) {
    return (
      <MotionScreen className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7858FF]/20 shadow-[0_0_28px_rgba(120,88,255,0.55)]">
          <Lock className="h-7 w-7 text-[#A78BFA]" />
        </div>
        <h1 className="mt-4 text-[22px] font-black" style={{ letterSpacing: "-0.5px" }}>
          AI Coach is Pro
        </h1>
        <p className="mt-2 max-w-[280px] text-[13px] text-white/60">
          Get personalized cognitive coaching, game recommendations and habit tips powered by AI.
        </p>
        <div className="mt-6 w-full max-w-xs space-y-3">
          <PrimaryButton onClick={() => navigate({ to: "/paywall" })}>
            Upgrade to Pro →
          </PrimaryButton>
          <GhostButton onClick={() => navigate({ to: "/app/home" })}>Back home</GhostButton>
        </div>
      </MotionScreen>
    );
  }

  const runStream = async (history: DbMsg[]) => {
    setIsStreaming(true);
    const context = `User context: streak ${streak} days. Brain scores — focus ${brainScores.focus}, memory ${brainScores.memory}, speed ${brainScores.speed}, logic ${brainScores.logic}, calm ${brainScores.calm}.`;
    const payload: Msg[] = [
      { role: "user", content: context },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ];

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // Optimistic placeholder for streaming assistant
    const placeholderId = `pending-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: placeholderId, role: "assistant", content: "", created_at: new Date().toISOString() },
    ]);

    let assistantSoFar = "";
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-coach`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: payload }),
          signal: controller.signal,
        },
      );

      if (resp.status === 429) {
        toast.error("Rate limit reached. Try again in a moment.");
        setMessages((prev) => prev.filter((m) => m.id !== placeholderId));
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted.");
        setMessages((prev) => prev.filter((m) => m.id !== placeholderId));
        return;
      }
      if (!resp.ok || !resp.body) {
        toast.error("Coach is unavailable. Try again.");
        setMessages((prev) => prev.filter((m) => m.id !== placeholderId));
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      const upsert = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages((prev) =>
          prev.map((m) => (m.id === placeholderId ? { ...m, content: assistantSoFar } : m)),
        );
        scrollToBottom();
      };

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, nl);
          textBuffer = textBuffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (assistantSoFar.trim()) {
        const persisted = await persistMessage({ role: "assistant", content: assistantSoFar });
        if (persisted) {
          setMessages((prev) => prev.map((m) => (m.id === placeholderId ? persisted : m)));
        }
      } else {
        setMessages((prev) => prev.filter((m) => m.id !== placeholderId));
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        toast.error("Connection lost.");
      }
      setMessages((prev) => prev.filter((m) => m.id !== placeholderId));
    } finally {
      setIsStreaming(false);
    }
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    setInput("");
    const persisted = await persistMessage({ role: "user", content: trimmed });
    if (!persisted) {
      toast.error("Couldn't send message.");
      return;
    }
    const next = [...messages, persisted];
    setMessages(next);
    await runStream(next);
  };

  const startEdit = (m: DbMsg) => {
    if (isStreaming) return;
    setEditingId(m.id);
    setEditingDraft(m.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingDraft("");
  };

  const saveEdit = async () => {
    if (!user || !editingId) return;
    const trimmed = editingDraft.trim();
    if (!trimmed || isStreaming) return;

    const idx = messages.findIndex((m) => m.id === editingId);
    if (idx === -1) return;
    const target = messages[idx];
    const tail = messages.slice(idx); // messages to remove (edited + everything after)
    const tailIds = tail.map((m) => m.id).filter((id) => !id.startsWith("pending-"));

    // Remove from DB: the edited message and everything after it (by created_at >=)
    const { error: delErr } = await supabase
      .from("coach_messages")
      .delete()
      .eq("user_id", user.id)
      .gte("created_at", target.created_at);
    if (delErr) {
      console.error("delete tail", delErr);
      toast.error("Couldn't save edit.");
      return;
    }
    // Belt-and-suspenders: also delete by id list in case of timestamp ties
    if (tailIds.length > 0) {
      await supabase.from("coach_messages").delete().in("id", tailIds);
    }

    const head = messages.slice(0, idx);
    setMessages(head);
    cancelEdit();

    // Re-insert edited message and stream a new reply
    const persisted = await persistMessage({ role: "user", content: trimmed });
    if (!persisted) {
      toast.error("Couldn't save edit.");
      return;
    }
    const next = [...head, persisted];
    setMessages(next);
    await runStream(next);
  };

  return (
    <MotionScreen className="flex h-[calc(100vh-88px)] flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7858FF]/20 shadow-[0_0_18px_rgba(120,88,255,0.5)]">
              <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            </div>
            <div>
              <h1 className="text-[18px] font-black leading-tight" style={{ letterSpacing: "-0.4px" }}>
                AI Coach
              </h1>
              <p className="text-[11px] text-white/40">Personalized cognitive guidance</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearHistory}
              disabled={isStreaming}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 disabled:opacity-40"
              aria-label="Clear chat history"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-4">
        {historyLoading ? (
          <div className="mt-6 space-y-2">
            <div className="h-12 w-full animate-pulse rounded-[14px] bg-white/[0.04]" />
            <div className="h-12 w-full animate-pulse rounded-[14px] bg-white/[0.04]" />
            <div className="h-12 w-full animate-pulse rounded-[14px] bg-white/[0.04]" />
          </div>
        ) : messages.length === 0 ? (
          <div className="mt-6">
            <p className="text-[13px] text-white/60">
              Hey {user?.user_metadata?.display_name || "there"} 👋 — ask me anything about your training.
            </p>
            <div className="mt-4 space-y-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="w-full rounded-[14px] border border-white/[0.07] bg-[#131A2E] px-4 py-3 text-left text-[13px] text-white/80 transition-colors hover:border-[#7858FF]/40 hover:bg-[#7858FF]/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "group flex items-end gap-1.5",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {m.role === "user" && editingId !== m.id && !isStreaming && (
                    <button
                      onClick={() => startEdit(m)}
                      className="mb-1 flex h-7 w-7 items-center justify-center rounded-full text-white/30 opacity-0 transition-all hover:bg-white/5 hover:text-white/80 group-hover:opacity-100"
                      aria-label="Edit message"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-[16px] px-3.5 py-2.5 text-[13px] leading-relaxed",
                      m.role === "user"
                        ? "bg-[#7858FF] text-white"
                        : "border border-white/[0.07] bg-[#131A2E] text-white/90",
                    )}
                  >
                    {editingId === m.id ? (
                      <div className="flex w-[260px] flex-col gap-2">
                        <textarea
                          value={editingDraft}
                          onChange={(e) => setEditingDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              saveEdit();
                            }
                            if (e.key === "Escape") {
                              e.preventDefault();
                              cancelEdit();
                            }
                          }}
                          rows={3}
                          autoFocus
                          className="w-full resize-none rounded-[10px] bg-white/15 p-2 text-[13px] text-white placeholder:text-white/40 focus:outline-none"
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={cancelEdit}
                            className="flex h-7 items-center gap-1 rounded-full bg-white/10 px-2.5 text-[11px] text-white/80 hover:bg-white/20"
                          >
                            <X className="h-3 w-3" /> Cancel
                          </button>
                          <button
                            onClick={saveEdit}
                            disabled={!editingDraft.trim()}
                            className="flex h-7 items-center gap-1 rounded-full bg-white px-2.5 text-[11px] font-semibold text-[#7858FF] disabled:opacity-50"
                          >
                            <Check className="h-3 w-3" /> Save & regenerate
                          </button>
                        </div>
                      </div>
                    ) : m.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1">
                        <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-[16px] border border-white/[0.07] bg-[#131A2E] px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-white/[0.07] bg-[#0D1226] px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask your coach…"
            rows={1}
            className="max-h-32 flex-1 resize-none rounded-[18px] border border-white/[0.07] bg-[#131A2E] px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#7858FF]/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7858FF] text-white shadow-[0_0_18px_rgba(120,88,255,0.55)] transition-opacity disabled:opacity-40"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>
      </div>
    </MotionScreen>
  );
}