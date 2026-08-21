import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { FileText, CheckCircle, Clock, Star } from "lucide-react";

export default function PeerReviews() {
  const { user } = useAuth(); const userId = user?._id;
  const mySubmissions = useQuery(api.peerReviews.mySubmissions, userId ? { userId } : "skip");
  const pendingReviews = useQuery(api.peerReviews.pendingReviews, userId ? { reviewerId: userId } : "skip");
  const submit = useMutation(api.peerReviews.submit);
  const grade = useMutation(api.peerReviews.grade);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewGrade, setReviewGrade] = useState(80);
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!userId || !title || !content) return;
    await submit({ authorId: userId, authorName: "Student", courseId: "any" as any, moduleId: 0, title, content });
    setTitle(""); setContent(""); setShowSubmit(false);
  };

  const handleGrade = async (reviewId: string) => {
    if (!userId) return;
    await grade({ reviewId: reviewId as any, reviewerId: userId, reviewerName: "Student", grade: reviewGrade, feedback: reviewText });
    setActiveReviewId(null); setReviewText(""); setReviewGrade(80);
  };

  const statusIcon = (s: string) => {
    if (s === "graded") return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (s === "under_review") return <Clock className="w-4 h-4 text-amber-500" />;
    return <FileText className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Peer Reviews</h1>
            <p className="text-muted-foreground font-mono text-sm">Submit work and review classmates' assignments</p>
          </div>
          <button onClick={() => setShowSubmit(!showSubmit)} className="px-3 py-1.5 bg-green-600 text-white rounded text-sm font-mono">Submit Work</button>
        </div>

        {showSubmit && (
          <div className="border border-border rounded-lg p-4 bg-card mb-6 space-y-3">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Assignment title" className="w-full p-2 bg-muted border border-border rounded font-mono text-sm" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Your work..." rows={5} className="w-full p-2 bg-muted border border-border rounded font-mono text-sm" />
            <button onClick={handleSubmit} className="px-4 py-1.5 bg-green-600 text-white rounded text-sm font-mono">Submit for Review</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Submissions */}
          <div>
            <h2 className="font-semibold mb-3">My Submissions</h2>
            <div className="space-y-3">
              {mySubmissions?.map((sub) => (
                <div key={sub._id} className="p-4 border border-border rounded-lg bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    {statusIcon(sub.status)}
                    <h3 className="font-semibold text-sm">{sub.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{sub.content}</p>
                  {sub.grade !== undefined && sub.grade !== null && (
                    <div className="mt-2 flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-mono text-sm">{sub.grade}/100</span>
                    </div>
                  )}
                  {sub.feedback && <p className="mt-2 text-xs bg-muted p-2 rounded">{sub.feedback}</p>}
                </div>
              ))}
              {mySubmissions?.length === 0 && <p className="text-muted-foreground font-mono text-sm">No submissions yet</p>}
            </div>
          </div>

          {/* To Review */}
          <div>
            <h2 className="font-semibold mb-3">To Review</h2>
            <div className="space-y-3">
              {pendingReviews?.map((sub) => (
                <div key={sub._id} className="p-4 border border-border rounded-lg bg-card">
                  <h3 className="font-semibold text-sm mb-2">{sub.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3">{sub.content}</p>
                  {activeReviewId === sub._id ? (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-mono text-muted-foreground">Grade:</label>
                        <input type="number" min="0" max="100" value={reviewGrade} onChange={(e) => setReviewGrade(parseInt(e.target.value))} className="w-16 p-1 bg-muted border border-border rounded text-sm font-mono" />
                      </div>
                      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Feedback..." rows={2} className="w-full p-2 bg-muted border border-border rounded font-mono text-xs" />
                      <div className="flex gap-2">
                        <button onClick={() => handleGrade(sub._id)} className="px-3 py-1 bg-green-600 text-white rounded text-xs font-mono">Submit Review</button>
                        <button onClick={() => setActiveReviewId(null)} className="px-3 py-1 bg-muted rounded text-xs font-mono">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setActiveReviewId(sub._id)} className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-xs font-mono">Review</button>
                  )}
                </div>
              ))}
              {pendingReviews?.length === 0 && <p className="text-muted-foreground font-mono text-sm">Nothing to review right now</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
