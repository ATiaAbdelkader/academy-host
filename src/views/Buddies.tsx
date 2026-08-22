import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Users, UserPlus, MessageCircle, Send, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Buddies() {
  const { user } = useAuth();
  const userId = user?._id;
  const buddies = useQuery(api.buddies.myBuddies);
  const requestBuddy = useMutation(api.buddies.requestBuddy);
  const sendMessage = useMutation(api.buddies.sendCheckIn);

  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState("");
  const [level, setLevel] = useState("beginner");
  const [chatGroupId, setChatGroupId] = useState<string | null>(null);
  const [chatMsg, setChatMsg] = useState("");

  const messages = useQuery(
    api.buddies.getMessages,
    chatGroupId ? { groupId: chatGroupId as any } : "skip"
  );

  const handleRequest = async () => {
    if (!goals) { toast.error("Enter at least one goal"); return; }
    const result = await requestBuddy({
      goals: goals.split(",").map((g) => g.trim()),
      experienceLevel: level,
    });
    toast.success(result.message);
    setShowForm(false);
  };

  const handleSend = async () => {
    if (!chatGroupId || !chatMsg) return;
    await sendMessage({ groupId: chatGroupId as any, message: chatMsg });
    setChatMsg("");
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">Learning Buddies</h1>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[var(--color-primary,#16a34a)] text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700 transition-colors mb-4"
        >
          <UserPlus className="w-4 h-4 inline mr-1" /> Find a Buddy
        </button>

        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Learning Goals (comma-separated)</label>
              <input
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500"
                placeholder="e.g. Soil health, Crop rotation, Business planning"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Experience Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <button onClick={handleRequest} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700">
              Request Match
            </button>
          </div>
        )}

        {/* Buddy Pairs */}
        <div className="space-y-3">
          {buddies && buddies.length > 0 ? (
            buddies.map((b) => (
              <div key={b._id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-sm">{b.name}</span>
                    {b.memberCount < 2 && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Waiting for match
                      </span>
                    )}
                  </div>
                  {b.memberCount >= 2 && (
                    <button
                      onClick={() => setChatGroupId(chatGroupId === b._id ? null : b._id)}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" /> Check-in
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-500">{b.description}</div>
                {b.buddyName && (
                  <div className="text-xs text-gray-600 mt-1">Buddy: <strong>{b.buddyName}</strong></div>
                )}

                {/* Chat */}
                {chatGroupId === b._id && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <div className="max-h-48 overflow-y-auto space-y-2 mb-2">
                      {messages && messages.length > 0 ? messages.map((m) => (
                        <div key={m._id} className={`text-xs p-2 rounded ${m.userId === userId ? "bg-green-50 ml-8" : "bg-gray-50 mr-8"}`}>
                          <div className="font-bold">{m.authorName}</div>
                          <div className="text-gray-700">{m.text}</div>
                          <div className="text-gray-400 mt-0.5">{new Date(m.createdAt).toLocaleTimeString()}</div>
                        </div>
                      )) : (
                        <div className="text-xs text-gray-400 text-center">No messages yet</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={chatMsg}
                        onChange={(e) => setChatMsg(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-green-500"
                        placeholder="How did your week go?"
                      />
                      <button onClick={handleSend} className="bg-green-600 text-white px-3 py-1.5 rounded text-sm">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 text-sm">
              No buddies yet. Click "Find a Buddy" to get matched with a learning partner!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
