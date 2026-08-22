import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Lightbulb, Calendar, Users, GraduationCap, Award, BookOpen, MessageCircle, MapPin, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type Tab = "lessons" | "office" | "teaching" | "alumni" | "credentials";

export default function MicroLearning() {
  const { user } = useAuth();
  const userId = user?._id;
  const [tab, setTab] = useState<Tab>("lessons");

  const lessons = useQuery(api.microLessons.recent, userId ? { userId, limit: 14 } : "skip");
  const officeHours = useQuery(api.officeHours.listAvailable, {});
  const myBookings = useQuery(api.officeHours.myBookings, userId ? { userId } : "skip");
  const myAnswers = useQuery(api.peerTeaching.myAnswers, userId ? { userId } : "skip");
  const alumni = useQuery(api.alumni.directory, {});
  const myCreds = useQuery(api.microCredentials.myCredentials, userId ? { userId } : "skip");
  const allCreds = useQuery(api.microCredentials.list, {});
  const markViewed = useMutation(api.microLessons.markViewed);
  const bookOffice = useMutation(api.officeHours.book);
  const seedLessons = useMutation(api.microLessons.seed);
  const seedOffice = useMutation(api.officeHours.seed);
  const seedCreds = useMutation(api.microCredentials.seed);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "lessons", label: "Daily Tips", icon: <Lightbulb className="w-4 h-4" /> },
    { key: "office", label: "Office Hours", icon: <Calendar className="w-4 h-4" /> },
    { key: "teaching", label: "My Answers", icon: <MessageCircle className="w-4 h-4" /> },
    { key: "alumni", label: "Alumni", icon: <Users className="w-4 h-4" /> },
    { key: "credentials", label: "Micro-Creds", icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ok] learning tools & network</p>
          <h1 className="text-2xl font-bold mt-1">Learn & Connect</h1>
          <p className="text-muted-foreground font-mono text-sm">Daily tips, mentor access, and professional credentials</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => { setTab(t.key); if (t.key === "lessons") seedLessons({}); if (t.key === "office") { seedOffice({}); } if (t.key === "credentials") seedCreds({}); }} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono whitespace-nowrap border transition-colors ${tab === t.key ? "border-term-green bg-term-green/5 text-term-green" : "border-border hover:bg-muted"}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {tab === "lessons" && (
          <div className="space-y-3">
            {lessons?.map((l) => (
              <div key={l._id} className={`border border-border bg-card p-4 ${!l.viewed ? "border-l-2 border-l-term-green" : ""}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-muted">{l.category}</span>
                    <h3 className="text-sm font-semibold mt-2">{l.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{l.tip}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground font-mono">
                      <span className="px-1.5 py-0.5 bg-muted">{l.difficulty}</span>
                      <span>{new Date(l.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {!l.viewed && userId && (
                    <button onClick={() => markViewed({ userId, lessonId: l._id })} className="text-[10px] font-mono text-term-green hover:underline px-2 py-1">mark read +2pts</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "office" && (
          <div className="space-y-3">
            {myBookings && myBookings.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-semibold mb-2">My Bookings</h2>
                {myBookings.map((b) => (
                  <div key={b._id} className="border border-term-green/40 bg-term-green/5 p-3 mb-2">
                    <p className="text-sm font-semibold">{b.officeHour?.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">{b.officeHour ? new Date(b.officeHour.startsAt).toLocaleString() : ""} · {b.topic || "General"}</p>
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-sm font-semibold">Available Sessions</h2>
            {officeHours?.map((oh) => (
              <div key={oh._id} className="border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{oh.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{oh.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-mono text-muted-foreground">{new Date(oh.startsAt).toLocaleString()} · {oh.durationMinutes}min · {oh.maxStudents} slots</span>
                  {userId && (
                    <button onClick={() => bookOffice({ officeHourId: oh._id, userId, studentName: "Student" }).then(() => toast.success("Booked!")).catch(() => toast.error("Failed"))} className="text-xs font-mono text-term-green border border-term-green px-3 py-1 hover:bg-term-green/5">Book</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "teaching" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">My Peer Answers</h2>
            {myAnswers && myAnswers.length === 0 && <p className="text-sm text-muted-foreground">You haven't posted any answers yet. Help fellow students in course Q&A discussions!</p>}
            {myAnswers?.map((a) => (
              <div key={a._id} className="border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground font-mono">Q: {a.questionText}</p>
                <p className="text-sm mt-1">{a.answerText}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-muted-foreground">
                  <span>{a.upvotes} upvotes</span>
                  <span>{a.pointsEarned} pts earned</span>
                  {a.verified && <span className="text-term-green">✓ verified</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "alumni" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Alumni Directory</h2>
            {alumni && alumni.length === 0 && <p className="text-sm text-muted-foreground">No alumni profiles yet. Complete a course to join the network!</p>}
            {alumni?.map((a) => (
              <div key={a._id} className="border border-border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{a.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">Class of {a.graduationYear} · {a.location || "Location not specified"}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {a.expertise.map((e) => <span key={e} className="text-[10px] font-mono px-1.5 py-0.5 bg-muted">{e}</span>)}
                    </div>
                  </div>
                  {a.availableForMentoring && <span className="text-[10px] font-mono text-term-green px-2 py-0.5 bg-term-green/10">Available to Mentor</span>}
                </div>
                {a.linkedinUrl && <a href={a.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-term-green mt-2 inline-flex items-center gap-1 hover:underline"><ExternalLink className="w-3 h-3" />LinkedIn</a>}
              </div>
            ))}
          </div>
        )}

        {tab === "credentials" && (
          <div className="space-y-3">
            {myCreds && myCreds.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-semibold mb-2">Earned</h2>
                {myCreds.map((c) => (
                  <div key={c._id} className="border border-term-green/40 bg-term-green/5 p-4 flex items-center gap-3 mb-2">
                    <span className="text-2xl">{c.credential?.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold">{c.credential?.name}</h3>
                      <p className="text-xs text-muted-foreground">{c.credential?.description}</p>
                      <p className="text-[10px] font-mono text-term-green mt-1">Earned {new Date(c.earnedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-sm font-semibold">Available Credentials</h2>
            {allCreds?.map((c) => {
              const earned = myCreds?.some((e) => e.credentialId === c._id);
              return (
                <div key={c._id} className={`border bg-card p-4 flex items-center gap-3 ${earned ? "border-term-green/40" : "border-border"}`}>
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1">Requires {c.requiredCompetencies.length} skills at level {c.requiredLevel}+</p>
                  </div>
                  {earned && <Award className="w-5 h-5 text-term-green" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
