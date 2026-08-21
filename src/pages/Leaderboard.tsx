import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Trophy, Medal, Flame, BookOpen, Award, Star } from "lucide-react";

export default function Leaderboard() {
  const leaderboard = useQuery(api.leaderboard.global);
  const myRank = useQuery(api.leaderboard.myRank);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/leaderboard" />
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] leaderboard — student rankings & achievements
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          See how you rank among fellow students. Points are earned through
          course completion, quiz scores, and consistent study habits.
        </p>

        {/* My Rank Card */}
        {myRank && (
          <div className="mt-6 border-2 border-term-green bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center border-2 border-term-green bg-term-green/10 text-2xl font-bold text-term-green">
                #{myRank.rank}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{myRank.name}</h2>
                <p className="text-xs text-muted-foreground">
                  Rank {myRank.rank} of {myRank.totalStudents} students
                </p>
              </div>
              <div className="flex gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-term-amber">
                    {myRank.points}
                  </p>
                  <p className="text-[10px] text-muted-foreground">POINTS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-term-green">
                    {myRank.coursesCompleted}
                  </p>
                  <p className="text-[10px] text-muted-foreground">COURSES</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {myRank.streak}
                  </p>
                  <p className="text-[10px] text-muted-foreground">STREAK</p>
                </div>
              </div>
            </div>
            {myRank.badges.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {myRank.badges.map((b) => (
                  <span
                    key={b}
                    className="flex items-center gap-1 border border-term-amber/30 bg-term-amber/10 px-2 py-0.5 text-[10px] font-medium text-term-amber"
                  >
                    <Award className="size-2.5" />
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="mt-6 border border-border bg-card">
          <div className="grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] items-center gap-3 border-b border-border bg-muted px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="text-center">Rank</span>
            <span>Student</span>
            <span className="text-right">Points</span>
            <span className="text-right">Courses</span>
            <span className="text-right">Quizzes</span>
            <span className="text-right">Streak</span>
          </div>
          {leaderboard === undefined && (
            <div className="space-y-3 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 animate-pulse bg-muted" />
              ))}
            </div>
          )}
          {leaderboard?.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              <Trophy className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-4">
                No rankings yet — be the first to earn points!
              </p>
            </div>
          )}
          {leaderboard?.map((entry) => {
            const isTop3 = entry.rank <= 3;
            const isMe =
              myRank && entry.name === myRank.name && entry.points === myRank.points;
            return (
              <div
                key={entry.rank}
                className={`grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 ${
                  isMe ? "bg-term-green/5" : "hover:bg-accent/30"
                }`}
              >
                <span className="text-center">
                  {entry.rank === 1 && (
                    <Medal className="mx-auto size-5 text-term-amber" />
                  )}
                  {entry.rank === 2 && (
                    <Medal className="mx-auto size-5 text-gray-400" />
                  )}
                  {entry.rank === 3 && (
                    <Medal className="mx-auto size-5 text-amber-600" />
                  )}
                  {entry.rank > 3 && (
                    <span className="text-sm text-muted-foreground">
                      {entry.rank}
                    </span>
                  )}
                </span>
                <div>
                  <span
                    className={`text-sm font-medium ${isMe ? "text-term-green" : ""}`}
                  >
                    {entry.name}
                    {isMe && (
                      <span className="ml-2 text-[10px] font-normal text-term-green">
                        (you)
                      </span>
                    )}
                  </span>
                  {entry.badges.length > 0 && (
                    <div className="mt-0.5 flex flex-wrap gap-0.5">
                      {entry.badges.slice(0, 3).map((b) => (
                        <span
                          key={b}
                          className="text-[9px] text-muted-foreground"
                        >
                          ★ {b}
                        </span>
                      ))}
                      {entry.badges.length > 3 && (
                        <span className="text-[9px] text-muted-foreground">
                          +{entry.badges.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <span
                  className={`text-right text-sm font-semibold ${isTop3 ? "text-term-amber" : ""}`}
                >
                  {entry.points}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {entry.coursesCompleted}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {entry.quizzesPassed}
                </span>
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  {entry.streak > 0 && (
                    <Flame className="size-3 text-term-amber" />
                  )}
                  {entry.streak}d
                </span>
              </div>
            );
          })}
        </div>

        {/* How Points Work */}
        <div className="mt-8 border border-border bg-card p-6">
          <h3 className="text-sm font-semibold">How Points Work</h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 size-4 text-term-green" />
              <div>
                <p className="text-xs font-medium">Course Completion</p>
                <p className="text-[11px] text-muted-foreground">
                  +500 points per course completed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 size-4 text-term-amber" />
              <div>
                <p className="text-xs font-medium">Quiz Performance</p>
                <p className="text-[11px] text-muted-foreground">
                  +10 points per quiz passed, bonus for perfect scores
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Flame className="mt-0.5 size-4 text-orange-500" />
              <div>
                <p className="text-xs font-medium">Study Streak</p>
                <p className="text-[11px] text-muted-foreground">
                  +5 points per consecutive day studied
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          [ok] rankings update as students complete courses and quizzes
        </p>
      </div>
    </main>
  );
}
