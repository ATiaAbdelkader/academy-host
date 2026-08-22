import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Trophy, Zap, Target, CheckCircle, Gift } from "lucide-react";

export default function Challenges() {
  const { user } = useAuth(); const userId = user?._id;
  const challenges = useQuery(api.challenges.activeChallenges, {});
  const myProgress = useQuery(api.challenges.myProgress, userId ? { userId } : "skip");
  const joinChallenge = useMutation(api.challenges.join);
  const claimReward = useMutation(api.challenges.claimReward);

  const progressMap = new Map(myProgress?.map((p) => [p.challengeId, p]));

  const typeIcons: Record<string, string> = {
    quiz: "📝", journal: "📔", streak: "🔥", review: "📖", quizComp: "⚡",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Weekly Challenges</h1>
          <p className="text-muted-foreground font-mono text-sm">Complete challenges to earn points and badges</p>
        </div>

        {!challenges ? (
          <div className="text-center py-12 text-muted-foreground font-mono">Loading challenges...</div>
        ) : challenges.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-mono">No active challenges right now. Check back soon!</div>
        ) : (
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const prog: any = progressMap.get(challenge._id);
              const pct = prog ? Math.min(100, (prog.progress / challenge.targetValue) * 100) : 0;
              return (
                <div key={challenge._id} className="border border-border rounded-lg p-6 bg-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{typeIcons[challenge.type] || "🎯"}</span>
                      <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs font-mono text-muted-foreground">
                          <span className="flex items-center gap-1"><Target className="w-3 h-3" />{challenge.targetValue} {challenge.type === "streak" ? "days" : "completions"}</span>
                          <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-amber-500" />{challenge.pointsReward} pts</span>
                          {challenge.badgeReward && <span className="flex items-center gap-1"><Gift className="w-3 h-3" />{challenge.badgeReward}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right min-w-[120px]">
                      {prog?.claimed ? (
                        <span className="text-xs font-mono text-green-600 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" />Claimed</span>
                      ) : prog?.completed ? (
                        <button onClick={() => claimReward({ participationId: prog._id })} className="px-3 py-1 bg-amber-500 text-white rounded text-xs font-mono hover:bg-amber-600">
                          Claim Reward
                        </button>
                      ) : prog ? (
                        <button onClick={() => joinChallenge({ challengeId: challenge._id, userId: userId! })} className="px-3 py-1 bg-green-600 text-white rounded text-xs font-mono hover:bg-green-700">
                          In Progress
                        </button>
                      ) : (
                        <button onClick={() => joinChallenge({ challengeId: challenge._id, userId: userId! })} className="px-3 py-1 bg-green-600 text-white rounded text-xs font-mono hover:bg-green-700">
                          Join Challenge
                        </button>
                      )}
                    </div>
                  </div>
                  {prog && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
                        <span>{prog.progress} / {challenge.targetValue}</span>
                        <span>{Math.round(pct)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
