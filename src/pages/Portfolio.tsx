import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Award, BookOpen, Star, Flame } from "lucide-react";
import { Link } from "react-router";

export default function Portfolio() {
  const { user } = useAuth(); const userId = user?._id;
  const stats = useQuery(api.gamification.myStats);
  const progress = useQuery(api.progress.myProgress);
  const courses = useQuery(api.courses.list, {});

  const completedCourses = progress?.filter((p: any) => p.status === "completed") ?? [];
  const inProgressCourses = progress?.filter((p: any) => p.status === "started") ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">S</div>
          <h1 className="text-2xl font-bold">My Learning Portfolio</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">Your achievements and progress at AgriSkills Academy</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Points", value: stats?.points ?? 0, icon: <Star className="w-5 h-5 text-amber-500" />, color: "bg-amber-500/10" },
            { label: "Courses Done", value: stats?.coursesCompleted ?? 0, icon: <BookOpen className="w-5 h-5 text-blue-500" />, color: "bg-blue-500/10" },
            { label: "Quizzes Passed", value: stats?.quizPasses ?? 0, icon: <Award className="w-5 h-5 text-green-600" />, color: "bg-green-500/10" },
            { label: "Best Streak", value: `${stats?.bestStreak ?? 0}d`, icon: <Flame className="w-5 h-5 text-orange-500" />, color: "bg-orange-500/10" },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-lg ${s.color} border border-border`}>
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs font-mono text-muted-foreground">{s.label}</span></div>
              <div className="text-2xl font-bold font-mono">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        {stats?.badges && stats.badges.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold mb-3">Badges Earned</h2>
            <div className="flex flex-wrap gap-2">
              {stats.badges.map((badge: string) => (
                <span key={badge} className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-sm font-mono text-green-600">{badge}</span>
              ))}
            </div>
          </div>
        )}

        {/* Completed Courses as "Certificates" */}
        <div className="mb-8">
          <h2 className="font-semibold mb-3">Certificates</h2>
          {completedCourses.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm">No certificates yet. Complete courses to earn them!</p>
          ) : (
            <div className="space-y-3">
              {completedCourses.map((cert: any) => {
                const course = courses?.find((c: any) => c._id === cert.courseId);
                return (
                  <Link key={cert._id} to={`/certificate/${cert.courseId}`} className="block p-4 border border-border rounded-lg bg-card hover:border-green-500/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{course?.title ?? "Completed Course"}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">Completed</div>
                      </div>
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* In Progress */}
        <div className="mb-8">
          <h2 className="font-semibold mb-3">In Progress</h2>
          {inProgressCourses.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm">No courses in progress.</p>
          ) : (
            <div className="space-y-2">
              {inProgressCourses.map((p: any) => {
                const course = courses?.find((c: any) => c._id === p.courseId);
                return (
                  <div key={p._id} className="flex items-center justify-between p-3 border border-border rounded bg-card">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <Link to={`/courses/${course?.slug ?? ""}`} className="text-sm font-mono hover:text-green-600">{course?.title ?? "Course"}</Link>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">Module {p.lastModuleIndex ?? 0}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
