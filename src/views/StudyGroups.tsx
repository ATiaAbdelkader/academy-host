import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Users, Plus, MessageCircle, Send } from "lucide-react";

export default function StudyGroups() {
  const { user } = useAuth(); const userId = user?._id;
  const groups = useQuery(api.studyGroups.list, {});
  const myGroups = useQuery(api.studyGroups.myGroups, userId ? { userId } : "skip");
  const createGroup = useMutation(api.studyGroups.create);
  const joinGroup = useMutation(api.studyGroups.join);
  const sendMessage = useMutation(api.studyGroups.sendMessage);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [messages, setMessages] = useState<string>("");
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const groupMessages = useQuery(
    api.studyGroups.getMessages,
    selectedGroup ? { groupId: selectedGroup as any } : "skip"
  );

  const handleCreate = async () => {
    if (!userId || !newName) return;
    await createGroup({
      creatorId: userId,
      creatorName: "Student",
      name: newName,
      description: newDesc,
      maxMembers: 20,
      isPublic: true,
      tags: [],
    });
    setNewName(""); setNewDesc(""); setShowCreate(false);
  };

  const handleSend = async () => {
    if (!userId || !selectedGroup || !messages) return;
    await sendMessage({ groupId: selectedGroup as any, userId, authorName: "Student", text: messages });
    setMessages("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Study Groups</h1>
            <p className="text-muted-foreground font-mono text-sm">Learn together with fellow students</p>
          </div>
          <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded text-sm font-mono">
            <Plus className="w-4 h-4" /> Create Group
          </button>
        </div>

        {showCreate && (
          <div className="border border-border rounded-lg p-4 bg-card mb-6">
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Group name" className="w-full p-2 bg-muted border border-border rounded font-mono text-sm mb-2" />
            <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description" className="w-full p-2 bg-muted border border-border rounded font-mono text-sm mb-2" />
            <button onClick={handleCreate} className="px-4 py-1.5 bg-green-600 text-white rounded text-sm font-mono">Create</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-semibold text-sm font-mono text-muted-foreground">Available Groups</h2>
            {groups?.map((group) => (
              <div key={group._id}
                onClick={() => setSelectedGroup(group._id)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedGroup === group._id ? "border-green-500 bg-green-500/5" : "border-border hover:border-green-500/30"
                } bg-card`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{group.name}</h3>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />{group.memberCount}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{group.description}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 border border-border rounded-lg bg-card flex flex-col" style={{ height: "600px" }}>
            {selectedGroup ? (
              <>
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Group Chat</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {groupMessages?.map((msg) => (
                    <div key={msg._id} className="text-sm">
                      <span className="font-semibold text-green-600 font-mono">{msg.authorName}: </span>
                      <span>{msg.text}</span>
                      <span className="text-xs text-muted-foreground ml-2">{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border flex gap-2">
                  <input value={messages} onChange={(e) => setMessages(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type a message..." className="flex-1 p-2 bg-muted border border-border rounded font-mono text-sm" />
                  <button onClick={handleSend} className="px-3 bg-green-600 text-white rounded"><Send className="w-4 h-4" /></button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm">
                Select a group to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
