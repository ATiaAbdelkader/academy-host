import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useAction, useQuery } from "@/lib/convex-react-safe";
import { Bot, Loader2, MessageSquare, Send, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChatTurn = { role: "user" | "assistant"; content: string };

/** Default prompts when no module context is available. */
const DEFAULT_PROMPTS = [
  "Summarize the module I just read in three bullet points",
  "Quiz me on this module's key concepts",
  "Give me a real-farm example of this idea",
];

/** Context-aware prompts when a module index is provided. */
const MODULE_PROMPTS = [
  "Explain the key concept from this module in simple terms",
  "What are the most likely quiz questions for this module?",
  "How does this module connect to the previous one?",
  "Give me a practical example I can use on the farm",
];

/**
 * The AI study assistant: a terminal-styled chat that answers questions about
 * the course it is mounted on. History persists per student (reactive via
 * Convex); the underlying model call happens in the `ai.ask` action.
 */
export function AiAssistant({
  courseId,
  courseTitle,
}: {
  courseId?: Id<"courses">;
  courseTitle?: string;
}) {
  const history = useQuery(api.aiChat.myMessages);
  const ask = useAction(api.ai.ask);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<ChatTurn[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [moduleIndex, setModuleIndex] = useState<number | undefined>(undefined);
  const [showHistory, setShowHistory] = useState(false);

  // Parse module index from URL search params when on a course page.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mod = params.get("module");
    if (mod) setModuleIndex(parseInt(mod, 10));
  }, []);

  const quickPrompts = moduleIndex != null ? MODULE_PROMPTS : DEFAULT_PROMPTS;

  // Keep the view pinned to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history, pending, sending]);

  const historyTurns: ChatTurn[] = (history ?? []).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const visible: ChatTurn[] = [...historyTurns, ...pending];

  const handleSend = async (raw?: string) => {
    const question = (raw ?? input).trim();
    if (!question || sending) return;
    setInput("");
    setError(null);
    setSending(true);
    const turn: ChatTurn = { role: "user", content: question };
    setPending((prev) => [...prev, turn]);
    try {
      const result = await ask({
        question,
        courseId,
        history: [...historyTurns, turn].slice(-12),
      });
      if (result.ok) {
        // The exchange is persisted by the action; the reactive query will
        // surface it, so the optimistic copy can drop.
        setPending([]);
      } else {
        setPending((prev) => prev.slice(0, -1));
        setError(result.error);
      }
    } catch (err) {
      setPending((prev) => prev.slice(0, -1));
      setError(
        err instanceof Error ? err.message : "Could not reach the assistant.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted px-4 py-2.5">
        <span className="flex items-center gap-2 text-xs font-semibold">
          <Sparkles className="size-3.5 text-term-green" />
          ai study assistant
          {courseTitle && (
            <span className="hidden truncate font-normal text-muted-foreground sm:inline">
              — {courseTitle}
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          {history && history.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MessageSquare className="size-3" />
              {history.length} messages
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowHistory((v) => !v)}
            className="text-[10px] text-muted-foreground hover:text-foreground"
            title="toggle conversation history"
          >
            {showHistory ? "hide" : "show"} history
          </button>
          <span className="flex items-center gap-1 text-[10px] text-term-green">
            <span className="inline-block size-1.5 bg-term-green" />
            online
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="max-h-72 space-y-3 overflow-y-auto px-4 py-3"
      >
        {visible.length === 0 && (
          <div className="space-y-3 py-1">
            <div className="flex gap-2">
              <Bot className="mt-0.5 size-4 shrink-0 text-term-green" />
              <p className="text-xs leading-5 text-muted-foreground">
                Ask anything about this course — concepts, quiz prep, or how it
                applies on a real farm. {moduleIndex != null && (
                  <span className="text-term-green">[module {moduleIndex + 1} context active]</span>
                )} Try one of these to get started:
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="border border-border px-2 py-1 text-left text-[11px] text-muted-foreground transition-colors hover:border-term-green/50 hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        {visible.map((turn, index) => (
          <div key={`${index}-${turn.content.slice(0, 16)}`} className="flex gap-2">
            <span
              className={`mt-1 shrink-0 font-mono text-[10px] ${
                turn.role === "user" ? "text-term-amber" : "text-term-green"
              }`}
            >
              {turn.role === "user" ? "you$" : "[ai]"}
            </span>
            <p className="min-w-0 flex-1 whitespace-pre-wrap text-xs leading-5 text-foreground">
              {turn.content}
            </p>
          </div>
        ))}
        {sending && (
          <div className="flex gap-2">
            <span className="mt-1 shrink-0 font-mono text-[10px] text-term-green">
              [ai]
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              thinking
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="border-t border-term-amber/40 bg-term-amber/[0.07] px-4 py-2 text-[11px] text-term-amber">
          {error}
        </div>
      )}

      <form
        className="flex items-center gap-2 border-t border-border px-3 py-2.5"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSend();
        }}
      >
        <span className="font-mono text-xs text-term-green">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask about this course…"
          className="h-8 min-w-0 flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          maxLength={2000}
        />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 px-2 text-[11px]"
          disabled={sending || input.trim().length === 0}
        >
          {sending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <Send className="size-3" />
          )}
          ask
        </Button>
      </form>
    </div>
  );
}

/** Small dismissible launcher used to open/close the assistant inline. */
export function AssistantToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-7 gap-1.5 px-2 text-[11px]"
      onClick={onToggle}
    >
      {open ? (
        <X className="size-3" />
      ) : (
        <Bot className="size-3 text-term-green" />
      )}
      {open ? "close assistant" : "ask the assistant"}
    </Button>
  );
}
