import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, Users, Video, ExternalLink } from "lucide-react";

export default function LiveSessions() {
  const sessions = useQuery(api.liveSessions.list, {});
  const rsvp = useMutation(api.liveSessions.rsvp);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filtered = sessions?.filter((s) => {
    if (filter === "upcoming") return s.startsAt > Date.now();
    if (filter === "past") return s.startsAt < Date.now();
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Live Sessions</h1>
            <p className="text-muted-foreground mt-1">Join live webinars and training sessions with instructors</p>
          </div>
          <div className="flex gap-2">
            {(["all", "upcoming", "past"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                  filter === f
                    ? "bg-green-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {!sessions ? (
          <div className="text-center py-12 text-muted-foreground font-mono">Loading sessions...</div>
        ) : filtered?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-mono">No sessions found</div>
        ) : (
          <div className="space-y-4">
            {filtered?.map((session) => (
              <div
                key={session._id}
                className="border border-border rounded-lg p-6 bg-card hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                        session.status === "live"
                          ? "bg-red-500/10 text-red-500"
                          : session.status === "scheduled"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {session.status === "live" ? "● LIVE" : session.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{session.title}</h3>
                    {session.description && (
                      <p className="text-muted-foreground text-sm mt-1">{session.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(session.startsAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(session.startsAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {session.durationMinutes}min
                      </span>
                    </div>
                    {session.tags.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {session.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-muted rounded text-xs font-mono">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {session.startsAt > Date.now() && session.meetingUrl && (
                      <a
                        href={session.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm font-mono hover:bg-green-700 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {session.recordingUrl && (
                      <a
                        href={session.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded text-sm font-mono hover:bg-muted/80 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Recording
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
