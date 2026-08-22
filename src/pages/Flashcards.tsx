"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import {
  Brain,
  CheckCircle2,
  Clock,
  Eye,
  Flame,
  Layers,
  RotateCcw,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Card = {
  _id: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  moduleTitle: string;
  question: string;
  options: string[];
  answerIndex: number;
  due: number;
  state: {
    difficulty: number;
    stability: number;
    reps: number;
    lapses: number;
  };
};

export default function Flashcards() {
  const dueCards = useQuery(api.flashcards.dueCards);
  const stats = useQuery(api.flashcards.myStats);
  const courseCards = useQuery(api.flashcards.byCourse);
  const reviewCard = useMutation(api.flashcards.reviewCard);
  const deleteCard = useMutation(api.flashcards.deleteCard);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);
  const [view, setView] = useState<"review" | "browse">("review");

  const cards = dueCards ?? [];
  const currentCard = cards[currentIndex] as Card | undefined;

  const handleReview = async (grade: number) => {
    if (!currentCard) return;
    setIsReviewing(true);
    try {
      await reviewCard({ cardId: currentCard._id as any, grade });
      toast.success(
        grade >= 3 ? "Nice! Card scheduled for later." : "Card will appear again soon."
      );

      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
        setSelectedOption(null);
      } else {
        setReviewComplete(true);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to review card.");
    } finally {
      setIsReviewing(false);
    }
  };

  const handleDelete = async (cardId: string) => {
    try {
      await deleteCard({ cardId: cardId as any });
      toast.success("Card removed.");
      if (currentIndex >= cards.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } catch (err) {
      toast.error("Failed to delete card.");
    }
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelectedOption(null);
    setReviewComplete(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/flashcards" />

      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-term-green">
          <Brain className="size-4" />
          <span>spaced repetition engine — FSRS algorithm</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">Flashcards</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review wrong quiz answers at optimal intervals. Cards you struggle
          with appear more often; mastered cards fade into the background.
        </p>

        {/* ── Stats ──────────────────────────────────────────── */}
        {stats && stats.total > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            <StatCard
              icon={<Layers className="size-3.5 text-term-green" />}
              label="total cards"
              value={String(stats.total)}
            />
            <StatCard
              icon={<Clock className="size-3.5 text-term-amber" />}
              label="due now"
              value={String(stats.due)}
            />
            <StatCard
              icon={<CheckCircle2 className="size-3.5 text-term-green" />}
              label="mastered"
              value={String(stats.mastered)}
            />
            <StatCard
              icon={<Flame className="size-3.5 text-term-amber" />}
              label="learning"
              value={String(stats.learning)}
            />
          </div>
        )}

        {/* ── View Toggle ────────────────────────────────────── */}
        <div className="mt-6 flex items-center gap-2">
          <Button
            variant={view === "review" ? "default" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => setView("review")}
          >
            <Zap className="size-3.5" />
            review due
          </Button>
          <Button
            variant={view === "browse" ? "default" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => setView("browse")}
          >
            <Eye className="size-3.5" />
            browse all
          </Button>
        </div>

        {/* ── Review Mode ────────────────────────────────────── */}
        {view === "review" && (
          <div className="mt-6">
            {cards.length === 0 && (
              <div className="border border-border bg-card p-8 text-center">
                <Sparkles className="mx-auto size-8 text-term-green" />
                <p className="mt-3 text-sm font-semibold">All caught up!</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  No flashcards due for review. Take some quizzes to generate
                  new cards from missed questions.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4 text-xs"
                >
                  <Link href="/courses">browse courses</Link>
                </Button>
              </div>
            )}

            {reviewComplete && (
              <div className="border border-term-green/40 bg-term-green/[0.03] p-8 text-center">
                <CheckCircle2 className="mx-auto size-8 text-term-green" />
                <p className="mt-3 text-sm font-semibold">
                  Review session complete!
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  You reviewed {cards.length} card
                  {cards.length !== 1 ? "s" : ""}. Come back later for the
                  next optimal review window.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={resetSession}
                  >
                    <RotateCcw className="size-3.5" />
                    review again
                  </Button>
                  <Button asChild size="sm" className="text-xs">
                    <Link href="/dashboard">back to dashboard</Link>
                  </Button>
                </div>
              </div>
            )}

            {cards.length > 0 && !reviewComplete && currentCard && (
              <div className="border border-border bg-card">
                {/* Progress bar */}
                <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
                  <span className="text-[11px] text-muted-foreground">
                    card {currentIndex + 1} of {cards.length}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {currentCard.courseTitle} — {currentCard.moduleTitle}
                  </span>
                </div>

                {/* Progress bar visual */}
                <div className="h-1 bg-muted">
                  <div
                    className="h-full bg-term-green transition-all"
                    style={{
                      width: `${((currentIndex + 1) / cards.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question */}
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    question
                  </p>
                  <p className="mt-2 text-lg font-medium">
                    {currentCard.question}
                  </p>
                </div>

                {/* Answer options */}
                <div className="border-t border-border px-6 pb-6">
                  {!showAnswer ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 text-xs"
                      onClick={() => setShowAnswer(true)}
                    >
                      show answer
                    </Button>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs uppercase tracking-wider text-term-green">
                        answer options
                      </p>
                      {currentCard.options.map((option, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`w-full border px-4 py-3 text-left text-sm transition-colors ${
                            i === currentCard.answerIndex
                              ? "border-term-green/60 bg-term-green/10 text-term-green"
                              : selectedOption === i
                                ? "border-destructive/60 bg-destructive/10 text-destructive"
                                : "border-border hover:bg-accent/50"
                          }`}
                          onClick={() => setSelectedOption(i)}
                        >
                          <span className="mr-2 font-mono text-xs text-muted-foreground">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          {option}
                        </button>
                      ))}

                      {/* Review buttons */}
                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs"
                          disabled={isReviewing}
                          onClick={() => handleReview(1)}
                        >
                          <RotateCcw className="size-3" />
                          again
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs"
                          disabled={isReviewing}
                          onClick={() => handleReview(2)}
                        >
                          hard
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1.5 text-xs"
                          disabled={isReviewing}
                          onClick={() => handleReview(3)}
                        >
                          good
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="gap-1.5 text-xs"
                          disabled={isReviewing}
                          onClick={() => handleReview(4)}
                        >
                          <Zap className="size-3" />
                          easy
                        </Button>
                        <div className="ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(currentCard._id)}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card metadata */}
                <div className="border-t border-border bg-muted px-4 py-2 text-[10px] text-muted-foreground">
                  stability: {currentCard.state.stability.toFixed(1)} · reps:{" "}
                  {currentCard.state.reps} · lapses:{" "}
                  {currentCard.state.lapses}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Browse Mode ────────────────────────────────────── */}
        {view === "browse" && (
          <div className="mt-6 space-y-4">
            {courseCards === undefined && (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse bg-muted" />
                ))}
              </div>
            )}

            {courseCards !== undefined && courseCards.length === 0 && (
              <div className="border border-border bg-card p-8 text-center">
                <Brain className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-semibold">No flashcards yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Flashcards are automatically created when you miss quiz
                  questions. Take a quiz to start building your deck.
                </p>
              </div>
            )}

            {courseCards !== undefined &&
              courseCards.map((course) => (
                <div key={course.courseId} className="border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
                    <div>
                      <Link href={`/courses/${course.courseSlug}`}
                        className="text-sm font-semibold underline-offset-4 hover:underline"
                      >
                        {course.courseTitle}
                      </Link>
                      <p className="text-[10px] text-muted-foreground">
                        {course.totalCards} cards · {course.dueCards} due ·{" "}
                        {course.masteredCards} mastered
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-[11px]"
                    >
                      <Link href={`/courses/${course.courseSlug}`}
                      >
                        study
                      </Link>
                    </Button>
                  </div>
                  {/* Mini progress bar */}
                  <div className="h-1 bg-muted">
                    <div
                      className="h-full bg-term-green/60"
                      style={{
                        width: course.totalCards > 0
                          ? `${(course.masteredCards / course.totalCards) * 100}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-card px-4 py-3">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-mono text-xl font-semibold">{value}</p>
    </div>
  );
}


