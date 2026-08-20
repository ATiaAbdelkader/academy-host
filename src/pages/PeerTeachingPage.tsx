import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Users, ThumbsUp, Award, MessageSquare, Plus, CheckCircle2, GraduationCap } from "lucide-react";
import { toast } from "sonner";

export default function PeerTeachingPage() {
  const { user } = useAuth();
  const userId = user?._id;
  const courses = useQuery(api.courses.list);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const answers = useQuery(
    api.peerTeaching.byCourse,
    selectedCourse ? { courseId: selectedCourse as any } : "skip"
  );
  const myAnswers = useQuery(
    api.peerTeaching.myAnswers,
    userId ? { userId } : "skip"
  );

  const postAnswer = useMutation(api.peerTeaching.postAnswer);
  const upvote = useMutation(api.peerTeaching.upvote);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "" });

  const handlePost = async () => {
    if (!userId || !form.question || !form.answer || !selectedCourse) {
      toast.error("Fill in all fields and select a course");
      return;
    }
    const name = user?.name ?? "Student";
    await postAnswer({
      userId,
      authorName: name,
      courseId: selectedCourse as any,
      questionText: form.question,
      answerText: form.answer,
    });
    toast.success("Answer posted! Earn points when others upvote you.");
    setForm({ question: "", answer: "" });
    setShowForm(false);
  };

  const handleUpvote = async (answerId: string) => {
    await upvote({ answerId: answerId as any });
    toast.success("+1 upvote!");
  };

  const totalPoints = myAnswers?.reduce((sum, a) => sum + (a.pointsEarned ?? 0), 0) ?? 0;

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
            <h1 className="text-2xl font-bold tracking-tight">Peer Teaching Rewards</h1>
          </div>
          {userId && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded px-3 py-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">{totalPoints} pts earned</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <MessageSquare className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{myAnswers?.length ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Answers Posted</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <ThumbsUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{myAnswers?.reduce((s, a) => s + (a.upvotes ?? 0), 0) ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Total Upvotes</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <GraduationCap className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{myAnswers?.filter((a) => a.verified).length ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Verified</div>
          </div>
        </div>

        {/* Course Selector */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Select Course</label>
          <select
            value={selectedCourse ?? ""}
            onChange={(e) => setSelectedCourse(e.target.value || null)}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500"
          >
            <option value="">Choose a course...</option>
            {courses?.slice(0, 30).map((c: any) => (
              <option key={c._id} value={c._id}>{c.title}</option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <>
            {/* Post Answer Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[var(--color-primary,#16a34a)] text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700 transition-colors mb-4"
            >
              <Plus className="w-4 h-4 inline mr-1" /> Post an Answer
            </button>

            {showForm && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono mb-2 focus:outline-none focus:border-green-500"
                  placeholder="Question being answered..."
                />
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono h-24 focus:outline-none focus:border-green-500"
                  placeholder="Your detailed answer..."
                />
                <button onClick={handlePost} className="mt-2 bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700">
                  Submit Answer
                </button>
              </div>
            )}

            {/* Answers */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h2 className="font-bold text-sm uppercase tracking-wider">Community Answers</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {answers && answers.length > 0 ? (
                  answers.map((a) => (
                    <div key={a._id} className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{a.authorName}</span>
                        {a.verified && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                        <span className="text-xs text-gray-400 ml-auto">{a.pointsEarned} pts</span>
                      </div>
                      <div className="text-xs text-gray-600 font-semibold mb-1">Q: {a.questionText}</div>
                      <div className="text-sm text-gray-800">{a.answerText}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => handleUpvote(a._id)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" /> {a.upvotes}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    No answers yet for this course. Be the first to help!
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
