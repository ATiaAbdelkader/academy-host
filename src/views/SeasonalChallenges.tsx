import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "@/convex/_generated/api";
import { useAuth } from "../hooks/use-auth";
import {
  Leaf, Sun, Droplets, Snowflake, Clock, Award,
  CheckCircle2, Users, Flame, TreePine, Sprout, Tractor,
  ChevronDown, ChevronRight, Calendar, Target
} from "lucide-react";

const SEASON_CONFIG: Record<string, { icon: typeof Leaf; color: string; bg: string; label: string }> = {
  spring: { icon: Sprout, color: "text-green-700", bg: "bg-green-50 border-green-200", label: "Spring" },
  summer: { icon: Sun, color: "text-amber-700", bg: "bg-amber-50 border-amber-200", label: "Summer" },
  fall: { icon: TreePine, color: "text-orange-700", bg: "bg-orange-50 border-orange-200", label: "Fall" },
  winter: { icon: Snowflake, color: "text-blue-700", bg: "bg-blue-50 border-blue-200", label: "Winter" },
};

export default function SeasonalChallenges() {
  const { user } = useAuth();
  const challenges = useQuery(api.seasonalChallenges.listActive);
  const myAttempts = useQuery(api.seasonalChallenges.myAttempts);
  const submitMutation = useMutation(api.seasonalChallenges.submit);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentMonth = new Date().getMonth();
  const currentSeason =
    currentMonth >= 2 && currentMonth <= 4
      ? "spring"
      : currentMonth >= 5 && currentMonth <= 7
      ? "summer"
      : currentMonth >= 8 && currentMonth <= 10
      ? "fall"
      : "winter";

  // Map challenge types to rough seasons
  const challengeToSeason = (type: string): string => {
    if (type === "quiz") return "spring";
    if (type === "quizComp") return "summer";
    if (type === "journal") return "fall";
    return "winter";
  };

  const filteredChallenges = useMemo(() => {
    if (!challenges) return [];
    return challenges.filter((c) => {
      if (selectedSeason === null) return true;
      return challengeToSeason(c.type) === selectedSeason;
    });
  }, [challenges, selectedSeason]);

  const handleSubmit = async (challengeId: string) => {
    if (!user?._id) return;
    setSubmitting(true);
    try {
      const mcAnswers = Object.entries(answers)
        .filter(([k, v]) => k.startsWith("mc_") && v)
        .map(([k, v]) => ({ questionIndex: parseInt(k.replace("mc_", "")), selectedAnswer: parseInt(v) }));
      const textAnswers = Object.entries(answers)
        .filter(([k, v]) => k.startsWith("text_") && v)
        .map(([k, v]) => ({ questionIndex: parseInt(k.replace("text_", "")), textAnswer: v }));

      await submitMutation({
        challengeId: challengeId as any,
        answers: [...mcAnswers, ...textAnswers],
      });
      setSubmitted(challengeId);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)] font-mono flex items-center gap-3">
            <Calendar className="w-8 h-8 text-green-600" />
            Seasonal Challenges
          </h1>
          <p className="text-[var(--color-muted-foreground)] mt-2 font-mono text-sm">
            Time-limited challenges tied to real farming seasons. Complete them before the season ends!
          </p>
        </div>

        {/* Season Tabs */}
        <div className="flex flex-wrap gap-2">
          {(["spring", "summer", "fall", "winter"] as const).map((season) => {
            const config = SEASON_CONFIG[season];
            const Icon = config.icon;
            const isActive = season === currentSeason;
            return (
              <button
                key={season}
                onClick={() => setSelectedSeason(season === selectedSeason ? null : season)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-sm transition-colors ${
                  selectedSeason === season
                    ? `${config.bg} ${config.color} font-semibold`
                    : isActive
                    ? "bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-foreground)] ring-2 ring-green-300"
                    : "bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {config.label}
                {isActive && <span className="text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded">NOW</span>}
              </button>
            );
          })}
        </div>

        {/* Challenge List */}
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => {
            const seasonKey = challengeToSeason(challenge.type);
            const config = SEASON_CONFIG[seasonKey];
            const Icon = config.icon;
            const isExpanded = expandedChallenge === challenge._id;
            const attempt = myAttempts?.find((a) => a.challengeId === challenge._id);
            const isCompleted = attempt?.completed === true;
            const isUpcoming = new Date(challenge.startDate) > new Date();

            return (
              <div
                key={challenge._id}
                className={`${config.bg} border rounded-xl overflow-hidden`}
              >
                <button
                  onClick={() => setExpandedChallenge(isExpanded ? null : challenge._id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <div>
                      <h3 className="font-mono font-bold text-[var(--color-foreground)]">{challenge.title}</h3>
                      <p className="text-xs text-[var(--color-muted-foreground)] font-mono">
                        {challenge.pointsReward} points • {challenge.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {isUpcoming && <span className="text-xs bg-[var(--color-muted)] px-2 py-1 rounded font-mono">Upcoming</span>}
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-[var(--color-border)]">
                    <p className="text-sm text-[var(--color-foreground)] mb-4 font-mono">{challenge.description}</p>

                    <div className="flex items-center gap-4 mb-4 text-xs font-mono text-[var(--color-muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Target: {challenge.targetValue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Badge: {challenge.badgeReward}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Ends: {new Date(challenge.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    {submitted === challenge._id ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="font-mono font-bold text-green-800">Challenge Submitted!</p>
                        <p className="text-sm text-green-700 font-mono">+{challenge.pointsReward} points added to your score</p>
                      </div>
                    ) : isCompleted ? (
                      <div className="bg-[var(--color-muted)] rounded-lg p-4">
                        <p className="font-mono text-sm text-[var(--color-foreground)]">
                          ✓ Completed • Progress: {attempt?.progress}%
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-3">
                          <p className="font-mono text-sm text-[var(--color-foreground)]">
                            Progress: {attempt?.progress ?? 0}% • Complete course modules to advance this challenge.
                          </p>
                        </div>
                        <button
                          onClick={() => handleSubmit(challenge._id)}
                          disabled={submitting}
                          className="w-full py-2 bg-green-600 text-white rounded-lg font-mono text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {submitting ? "Submitting..." : `Join Challenge (${challenge.pointsReward} pts)`}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredChallenges.length === 0 && (
            <div className="text-center py-12 text-[var(--color-muted-foreground)] font-mono">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No challenges available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
