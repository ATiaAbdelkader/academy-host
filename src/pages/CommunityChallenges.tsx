import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Trophy, Users, Clock, Target, Flame, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function CommunityChallenges() {
  const { user } = useAuth();
  const userId = user?._id;

  const challenges = useQuery(api.challenges.activeChallenges);
  const myParticipations = useQuery(api.challenges.myProgress, userId ? { userId } : "skip");
  const leaderboard = useQuery(api.gamification.leaderboard);
  const joinChallenge = useMutation(api.challenges.join);
  const claimReward = useMutation(api.challenges.claimReward);

  const handleJoin = async (challengeId: string) => {
    if (!userId) return;
    try {
      await joinChallenge({ challengeId: challengeId as never, userId });
      toast.success("Challenge joined!");
    } catch (e: unknown) {
      toast.error((e as Error).message);
    }
  };

  const handleClaim = async (participationId: string) => {
    if (!userId) return;
    try {
      await claimReward({ participationId: participationId as never });
      toast.success("Reward claimed!");
    } catch (e: unknown) {
      toast.error((e as Error).message);
    }
  };

  const typeIcons: Record<string, React.ReactNode> = {
    quiz: <Target className="w-4 h-4 text-blue-500" />,
    journal: <Flame className="w-4 h-4 text-orange-500" />,
    streak: <Flame className="w-4 h-4 text-red-500" />,
    review: <Users className="w-4 h-4 text-purple-500" />,
    quizComp: <Trophy className="w-4 h-4 text-amber-500" />,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[community] challenges</p>
          <h1 className="text-2xl font-bold mt-1">Community Challenges</h1>
          <p className="text-muted-foreground font-mono text-sm">Compete, earn points, and climb the leaderboard</p>
        </div>

        {/* Top 3 Leaderboard */}
        <div className="border border-border bg-card p-4 mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Trophy className="w-4 h-4 text-amber-500" />Leaderboard</h2>
          <div className="grid grid-cols-3 gap-3">
            {(leaderboard?.rows || []).slice(0, 3).map((entry, i) => (
              <div key={entry.name + i} className={`border p-3 text-center ${i === 0 ? "border-amber-400 bg-amber-50" : i === 1 ? "border-gray-300 bg-gray-50" : "border-orange-300 bg-orange-50"}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold font-mono ${i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-gray-400 text-white" : "bg-orange-400 text-white"}`}>{i + 1}</div>
                <p className="text-sm font-bold font-mono mt-2 truncate">{entry.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{entry.points} pts · {entry.streakDays}d streak</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Challenges */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Target className="w-4 h-4" />Active Challenges</h2>
          {challenges && challenges.length > 0 ? (
            <div className="space-y-3">
              {challenges.map((challenge) => {
                const myPart = myParticipations?.find((p) => p.challengeId === challenge._id);
                const progress = myPart ? (myPart.progress / challenge.targetValue) * 100 : 0;
                const isComplete = myPart?.completed || false;
                const isClaimed = myPart?.claimed || false;
                const daysLeft = Math.max(0, Math.ceil((challenge.endDate - Date.now()) / (24 * 60 * 60 * 1000)));

                return (
                  <div key={challenge._id} className={`border bg-card p-4 ${isComplete ? "border-term-green" : "border-border"}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {typeIcons[challenge.type] || typeIcons.quiz}
                        <div>
                          <h3 className="text-sm font-bold font-mono">{challenge.title}</h3>
                          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{challenge.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-amber-600 font-bold">+{challenge.pointsReward} pts</span>
                        {challenge.badgeReward && (
                          <p className="text-[10px] font-mono text-purple-600">🏆 {challenge.badgeReward}</p>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-muted-foreground">{myPart?.progress || 0} / {challenge.targetValue}</span>
                        <span className="text-[10px] font-mono text-muted-foreground"><Clock className="w-3 h-3 inline mr-1" />{daysLeft}d left</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded">
                        <div className={`h-2 rounded transition-all ${isComplete ? "bg-term-green" : "bg-amber-500"}`} style={{ width: `${Math.min(100, progress)}%` }} />
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-2">
                      {!myPart && !isComplete && (
                        <button onClick={() => handleJoin(challenge._id)} className="px-4 py-1.5 bg-term-green text-white text-xs font-mono font-semibold hover:bg-term-green/90">Join Challenge</button>
                      )}
                      {isComplete && !isClaimed && (
                        <button onClick={() => handleClaim(myPart?._id || "")} className="px-4 py-1.5 bg-amber-500 text-white text-xs font-mono font-semibold hover:bg-amber-600">Claim Reward</button>
                      )}
                      {isClaimed && (
                        <span className="text-xs font-mono text-term-green flex items-center gap-1"><ChevronRight className="w-3 h-3" />Reward Claimed!</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-border bg-card p-6 text-center">
              <Trophy className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground font-mono">No active challenges right now. Check back soon!</p>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="border border-term-green/30 bg-term-green/5 p-4">
          <h2 className="text-sm font-semibold mb-2">How Challenges Work</h2>
          <ul className="text-xs font-mono text-muted-foreground space-y-1">
            <li>• Join a challenge to start tracking your progress</li>
            <li>• Complete the target (pass quizzes, maintain streaks, etc.)</li>
            <li>• Earn points and climb the leaderboard</li>
            <li>• Claim rewards when you finish — badges, titles, and more</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
