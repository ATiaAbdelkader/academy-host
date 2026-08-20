import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/RequireAuth";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Catalog = lazy(() => import("./pages/Catalog.tsx"));
const Bundles = lazy(() => import("./pages/Bundles.tsx"));
const Verify = lazy(() => import("./pages/Verify.tsx"));
const Instructors = lazy(() => import("./pages/Instructors.tsx"));
const Course = lazy(() => import("./pages/Course.tsx"));
const Booking = lazy(() => import("./pages/Booking.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const StudyPlan = lazy(() => import("./pages/StudyPlan.tsx"));
const Certificates = lazy(() => import("./pages/Certificates.tsx"));
const Analytics = lazy(() => import("./pages/Analytics.tsx"));
const Exports = lazy(() => import("./pages/Exports.tsx"));
const Flashcards = lazy(() => import("./pages/Flashcards.tsx"));
const LearningPaths = lazy(() => import("./pages/LearningPaths.tsx"));
const FieldJournal = lazy(() => import("./pages/FieldJournal.tsx"));
const Leaderboard = lazy(() => import("./pages/Leaderboard.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Certificate = lazy(() => import("./pages/Certificate.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));
const Notifications = lazy(() => import("./pages/Notifications.tsx"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase.tsx"));
const CourseCompare = lazy(() => import("./pages/CourseCompare.tsx"));
const LiveSessions = lazy(() => import("./pages/LiveSessions.tsx"));
const Mentorship = lazy(() => import("./pages/Mentorship.tsx"));
const PeerReviews = lazy(() => import("./pages/PeerReviews.tsx"));
const Store = lazy(() => import("./pages/Store.tsx"));
const StudyGroups = lazy(() => import("./pages/StudyGroups.tsx"));
const Challenges = lazy(() => import("./pages/Challenges.tsx"));
const Portfolio = lazy(() => import("./pages/Portfolio.tsx"));
const Tools = lazy(() => import("./pages/Tools.tsx"));
const Revenue = lazy(() => import("./pages/Revenue.tsx"));
const Competencies = lazy(() => import("./pages/Competencies.tsx"));
const CaseStudies = lazy(() => import("./pages/CaseStudies.tsx"));
const VirtualLabs = lazy(() => import("./pages/VirtualLabs.tsx"));
const FarmTools = lazy(() => import("./pages/FarmTools.tsx"));
const MicroLearning = lazy(() => import("./pages/MicroLearning.tsx"));
const SkillsTranscript = lazy(() => import("./pages/SkillsTranscript.tsx"));
const SeasonalChallenges = lazy(() => import("./pages/SeasonalChallenges.tsx"));
const ShowcaseWall = lazy(() => import("./pages/ShowcaseWall.tsx"));
const MarketPrices = lazy(() => import("./pages/MarketPrices.tsx"));
const KnowledgeGaps = lazy(() => import("./pages/KnowledgeGaps.tsx"));
const EmployerVerify = lazy(() => import("./pages/EmployerVerify.tsx"));
const FarmSimulator = lazy(() => import("./pages/FarmSimulator.tsx"));
const CropDoctor = lazy(() => import("./pages/CropDoctor.tsx"));
const Advisory = lazy(() => import("./pages/Advisory.tsx"));
const FarmDashboard = lazy(() => import("./pages/FarmDashboard.tsx"));
const CompetencyPassport = lazy(() => import("./pages/CompetencyPassport.tsx"));
const StudyReminders = lazy(() => import("./pages/StudyReminders.tsx"));
const CommunityChallenges = lazy(() => import("./pages/CommunityChallenges.tsx"));
const Nudges = lazy(() => import("./pages/Nudges.tsx"));
const Assessments = lazy(() => import("./pages/Assessments.tsx"));
const PeerTeachingPage = lazy(() => import("./pages/PeerTeachingPage.tsx"));
const FarmProgress = lazy(() => import("./pages/FarmProgress.tsx"));
const Buddies = lazy(() => import("./pages/Buddies.tsx"));
const Badges = lazy(() => import("./pages/Badges.tsx"));
const AiAssistant = lazy(() => import("./pages/AiAssistant.tsx"));
const InstructorAnalytics = lazy(() => import("./pages/InstructorAnalytics.tsx"));
const Gamification = lazy(() => import("./pages/Gamification.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

/** Silent error boundary — if VlyToolbar crashes it renders nothing instead of
 *  crashing the whole app (e.g. hook errors in WebContainer environment). */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[WebContainer preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);



function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <RouteSyncer />
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/auth"
                element={<AuthPage redirectAfterAuth="/courses" />}
              />
              <Route path="/courses" element={<Catalog />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/bundles/:slug" element={<Bundles />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/courses/:slug" element={<Course />} />
              <Route
                path="/booking/:bookingId"
                element={
                  <RequireAuth>
                    <Booking />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/study"
                element={
                  <RequireAuth>
                    <StudyPlan />
                  </RequireAuth>
                }
              />
              <Route
                path="/analytics"
                element={
                  <RequireAuth>
                    <Analytics />
                  </RequireAuth>
                }
              />
              <Route
                path="/exports"
                element={
                  <RequireAuth>
                    <Exports />
                  </RequireAuth>
                }
              />
              <Route
                path="/flashcards"
                element={
                  <RequireAuth>
                    <Flashcards />
                  </RequireAuth>
                }
              />          <Route path="/learning-paths" element={<RequireAuth><LearningPaths /></RequireAuth>} />
          <Route path="/field-journal" element={<RequireAuth><FieldJournal /></RequireAuth>} />
          <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
          <Route path="/knowledge-base" element={<RequireAuth><KnowledgeBase /></RequireAuth>} />
          <Route path="/compare" element={<RequireAuth><CourseCompare /></RequireAuth>} />
              <Route
                path="/certificates"
                element={
                  <RequireAuth>
                    <Certificates />
                  </RequireAuth>
                }
              />
              <Route
                path="/certificate/:courseId"
                element={
                  <RequireAuth>
                    <Certificate />
                  </RequireAuth>
                }
              />
              <Route
                path="/settings"
                element={
                  <RequireAuth>
                    <Settings />
                  </RequireAuth>
                }
              />
              <Route
                path="/notifications"
                element={
                  <RequireAuth>
                    <Notifications />
                  </RequireAuth>
                }
              />
              <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
              <Route path="/live-sessions" element={<RequireAuth><LiveSessions /></RequireAuth>} />
              <Route path="/mentorship" element={<RequireAuth><Mentorship /></RequireAuth>} />
              <Route path="/peer-reviews" element={<RequireAuth><PeerReviews /></RequireAuth>} />
              <Route path="/store" element={<RequireAuth><Store /></RequireAuth>} />
              <Route path="/study-groups" element={<RequireAuth><StudyGroups /></RequireAuth>} />
              <Route path="/challenges" element={<RequireAuth><Challenges /></RequireAuth>} />
              <Route path="/portfolio" element={<RequireAuth><Portfolio /></RequireAuth>} />
              <Route path="/tools" element={<RequireAuth><Tools /></RequireAuth>} />
              <Route path="/revenue" element={<RequireAuth><Revenue /></RequireAuth>} />
              <Route path="/skills" element={<RequireAuth><Competencies /></RequireAuth>} />
              <Route path="/case-studies" element={<RequireAuth><CaseStudies /></RequireAuth>} />
              <Route path="/labs" element={<RequireAuth><VirtualLabs /></RequireAuth>} />
              <Route path="/farm-tools" element={<RequireAuth><FarmTools /></RequireAuth>} />
              <Route path="/learn" element={<RequireAuth><MicroLearning /></RequireAuth>} />
              <Route path="/transcript" element={<RequireAuth><SkillsTranscript /></RequireAuth>} />
              <Route path="/seasonal" element={<RequireAuth><SeasonalChallenges /></RequireAuth>} />
              <Route path="/showcase" element={<RequireAuth><ShowcaseWall /></RequireAuth>} />
              <Route path="/market" element={<MarketPrices />} />
              <Route path="/knowledge-gaps" element={<RequireAuth><KnowledgeGaps /></RequireAuth>} />
              <Route path="/verify-credential" element={<EmployerVerify />} />
              <Route path="/farm-simulator" element={<RequireAuth><FarmSimulator /></RequireAuth>} />
              <Route path="/crop-doctor" element={<RequireAuth><CropDoctor /></RequireAuth>} />
              <Route path="/advisory" element={<RequireAuth><Advisory /></RequireAuth>} />
              <Route path="/farm-hub" element={<RequireAuth><FarmDashboard /></RequireAuth>} />
              <Route path="/passport" element={<RequireAuth><CompetencyPassport /></RequireAuth>} />
              <Route path="/reminders" element={<RequireAuth><StudyReminders /></RequireAuth>} />
              <Route path="/community-challenges" element={<RequireAuth><CommunityChallenges /></RequireAuth>} />
              <Route path="/nudges" element={<RequireAuth><Nudges /></RequireAuth>} />
              <Route path="/assessments" element={<RequireAuth><Assessments /></RequireAuth>} />
              <Route path="/peer-teaching" element={<RequireAuth><PeerTeachingPage /></RequireAuth>} />
              <Route path="/farm-progress" element={<RequireAuth><FarmProgress /></RequireAuth>} />
              <Route path="/buddies" element={<RequireAuth><Buddies /></RequireAuth>} />
              <Route path="/badges" element={<RequireAuth><Badges /></RequireAuth>} />
              <Route path="/ai-assistant" element={<RequireAuth><AiAssistant /></RequireAuth>} />
              <Route path="/instructor-analytics" element={<RequireAuth><InstructorAnalytics /></RequireAuth>} />
              <Route path="/gamification" element={<RequireAuth><Gamification /></RequireAuth>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
      </ConvexAuthProvider>
    </RootErrorBoundary>
  </StrictMode>,
);
