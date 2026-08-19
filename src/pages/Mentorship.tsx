import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { UserCheck, Star, Users, MessageCircle } from "lucide-react";

export default function Mentorship() {
  const { user } = useAuth(); const userId = user?._id;
  const mentors = useQuery(api.mentorships.listMentors, {});
  const myData = useQuery(api.mentorships.myMentorships, userId ? { userId } : "skip");
  const requestMentorship = useMutation(api.mentorships.requestMentorship);
  const updateStatus = useMutation(api.mentorships.updateStatus);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Mentorship</h1>
        <p className="text-muted-foreground font-mono text-sm mb-6">Connect with experienced mentors for guided learning</p>

        {/* My Mentorships */}
        {myData?.asMentee && myData.asMentee.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold mb-3">My Mentorships</h2>
            <div className="space-y-3">
              {myData.asMentee.map((m) => (
                <div key={m._id} className="p-4 border border-border rounded-lg bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-xs font-mono ${m.status === "active" ? "bg-green-500/10 text-green-600" : m.status === "pending" ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"}`}>
                        {m.status}
                      </span>
                      {m.goals && <p className="text-sm text-muted-foreground mt-2">{m.goals}</p>}
                    </div>
                    {m.status === "pending" && (
                      <button onClick={() => updateStatus({ mentorshipId: m._id, status: "completed" })} className="px-3 py-1 text-xs font-mono bg-muted rounded hover:bg-muted/80">End</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Mentors */}
        <h2 className="font-semibold mb-3">Available Mentors</h2>
        {!mentors ? (
          <div className="text-center py-12 text-muted-foreground font-mono">Loading...</div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-mono">No mentors available yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentors.map((mentor) => (
              <div key={mentor._id} className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {mentor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{mentor.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-amber-500" />{mentor.rating.toFixed(1)} · <Users className="w-3 h-3" />{mentor.menteeCount}/{mentor.maxMentees}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{mentor.bio}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.expertise.map((e) => (
                    <span key={e} className="px-2 py-0.5 bg-muted rounded text-[10px] font-mono">{e}</span>
                  ))}
                </div>
                <button
                  onClick={() => requestMentorship({ mentorId: mentor._id, menteeId: userId! })}
                  disabled={!mentor.available || mentor.menteeCount >= mentor.maxMentees}
                  className="w-full px-3 py-1.5 bg-green-600 text-white rounded text-xs font-mono hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground"
                >
                  {mentor.available && mentor.menteeCount < mentor.maxMentees ? "Request Mentorship" : "At Capacity"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
