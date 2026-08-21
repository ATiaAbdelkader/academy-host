import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Shield, Search, CheckCircle2, XCircle, Award,
  User, BookOpen, Calendar, Hash
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export default function EmployerVerify() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [verifyKey, setVerifyKey] = useState(0);

  const verification = useQuery(
    api.employerVerify.verifyCredential,
    verifyKey > 0 && studentId && courseId
      ? { studentId: studentId as Id<"users">, courseId: courseId as Id<"courses"> }
      : "skip"
  );

  const handleVerify = () => {
    if (studentId && courseId) {
      setVerifyKey((k) => k + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-[var(--color-foreground)] font-mono">
            Credential Verification
          </h1>
          <p className="text-[var(--color-muted-foreground)] mt-2 font-mono text-sm">
            Verify a student's academy credentials and course completions
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 space-y-4">
          <h2 className="font-mono font-bold text-[var(--color-foreground)] flex items-center gap-2">
            <Search className="w-4 h-4" />
            Enter Verification Details
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-[var(--color-muted-foreground)] mb-1">
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. k57abc123def..."
                className="w-full px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg font-mono text-sm text-[var(--color-foreground)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--color-muted-foreground)] mb-1">
                Course ID
              </label>
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="e.g. k57xyz789abc..."
                className="w-full px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg font-mono text-sm text-[var(--color-foreground)]"
              />
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={!studentId || !courseId}
            className="w-full py-2 bg-green-600 text-white rounded-lg font-mono text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Verify Credential
          </button>
        </div>

        {/* Verification Result */}
        {verifyKey > 0 && studentId && courseId && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            {verification === undefined ? (
              <div className="text-center py-4">
                <div className="animate-pulse text-[var(--color-muted-foreground)] font-mono text-sm">
                  Verifying...
                </div>
              </div>
            ) : verification === null ? (
              <div className="text-center py-4">
                <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                <p className="font-mono font-bold text-red-700">Verification Failed</p>
                <p className="text-sm text-[var(--color-muted-foreground)] font-mono mt-1">
                  Could not find this credential in our system
                </p>
              </div>
            ) : !verification.verified ? (
              <div className="text-center py-4">
                <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                <p className="font-mono font-bold text-red-700">Not Verified</p>
                <p className="text-sm text-[var(--color-muted-foreground)] font-mono mt-1">
                  {verification.message}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <p className="font-mono font-bold text-green-700 text-lg">✓ Credential Verified</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-mono text-green-700 font-bold">Course</span>
                    </div>
                    <p className="font-mono text-sm text-green-800">{verification.course?.title}</p>
                    <p className="text-[10px] font-mono text-green-600">{verification.course?.category}</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-mono text-green-700 font-bold">Completed</span>
                    </div>
                    <p className="font-mono text-sm text-green-800">
                      {verification.completedAt
                        ? new Date(verification.completedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  {verification.score && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-mono text-green-700 font-bold">Score</span>
                      </div>
                      <p className="font-mono text-sm text-green-800">{verification.score}</p>
                    </div>
                  )}

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Hash className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-mono text-green-700 font-bold">Student ID</span>
                    </div>
                    <p className="font-mono text-xs text-green-800 truncate">{verification.studentId}</p>
                  </div>
                </div>

                <div className="text-center text-[10px] font-mono text-[var(--color-muted-foreground)] pt-2 border-t border-[var(--color-border)]">
                  Verified by AgriTech Academy • {new Date().toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-mono text-sm font-bold text-amber-800 mb-2">How to verify</h3>
          <ol className="text-xs font-mono text-amber-700 space-y-1 list-decimal list-inside">
            <li>Ask the student for their Student ID (found in their profile)</li>
            <li>Enter the Course ID from the certificate they claim to have completed</li>
            <li>Click "Verify Credential" to confirm completion</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
