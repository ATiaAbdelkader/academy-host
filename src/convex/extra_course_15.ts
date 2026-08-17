import type { CourseModule } from "./schema";

type ExtraCourse = {
  category: string;
  title: string;
  description: string;
  priceCents: number;
  durationMinutes: number;
  order: number;
  instructor: string;
  instructorTitle: string;
  modules: CourseModule[];
};

export const extraCourse15: ExtraCourse = {
  category: "Business & Management",
  title: "Managing an Agriculture Project",
  description:
    "Take an agri idea from scope to handover: goals, plans, budgets, tracking, risk, and the lessons that make the next project cheaper.",
  priceCents: 6900,
  durationMinutes: 26,
  order: 15,
  instructor: "Dr. Paulo Ferreira",
  instructorTitle: "Project Management Specialist",
  modules: [
    {
      title: "Projects versus operations",
      content: [
        {
          type: "paragraph",
          text: "A project is a temporary effort with a start, an end, and a defined result — a new irrigation system, a packhouse, a certification rollout. Operations are the ongoing work that keeps the farm running. The mistake is managing a project like a routine and a routine like a project. Know which one you are in before you start.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=bw-NvGvLHtM",
          caption: "What project management is — explained in ten minutes.",
        },
        {
          type: "list",
          items: [
            "Projects have a start date, an end date, and a deliverable.",
            "Operations repeat and never 'finish'.",
            "A project needs a single owner and a clear scope.",
            "Routine tasks inside a project are still project work.",
          ],
        },
        {
          type: "quiz",
          title: "Project vs operation",
          passPercent: 60,
          questions: [
            {
              question: "What defines a project?",
              options: [
                "A temporary effort with a defined result",
                "Anything done on the farm",
                "Work that repeats weekly",
                "Only construction work",
              ],
              answerIndex: 0,
            },
            {
              question: "Which of these is an operation, not a project?",
              options: [
                "Building a new packhouse",
                "Installing drip irrigation across a new block",
                "Weekly irrigation rounds",
                "Getting organic certification",
              ],
              answerIndex: 2,
            },
            {
              question: "Who should own a project?",
              options: [
                "A single owner with clear scope",
                "Everyone on the farm",
                "No one — it runs itself",
                "The bank",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Scope, goals & success criteria",
      content: [
        {
          type: "paragraph",
          text: "Start with the finish line. Write the goal in one sentence, list what is in scope and — just as important — what is out of scope, and define how you will know it worked. Success criteria are measurable: hectares irrigated, tonnes through the packhouse, days to market. If you cannot measure it, you cannot manage it.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=UTSKQe8aJXQ",
          caption: "The essential steps every project beginner needs.",
        },
        {
          type: "code",
          prompt: true,
          text: "project init --name drip-block-4\n[ok] goal       irrigate block 4 (14 ha) by season start\n[ok] in scope   mainline, laterals, pump, controller\n[ok] out        block 5 and the borehole upgrade\n[ok] success    90% of block irrigated on schedule, ≤ $31k",
        },
        {
          type: "quiz",
          title: "Scope & success",
          passPercent: 60,
          questions: [
            {
              question: "Why define out-of-scope items?",
              options: [
                "So the project does not quietly grow",
                "To look busy",
                "They are always included anyway",
                "It is a bank requirement",
              ],
              answerIndex: 0,
            },
            {
              question: "A good success criterion is:",
              options: [
                "Measurable",
                "Vague",
                "Unwritten",
                "Decided at the end",
              ],
              answerIndex: 0,
            },
            {
              question: "The sample project lists block 5 as:",
              options: [
                "Out of scope",
                "The main deliverable",
                "The success metric",
                "The owner",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Planning: time, budget & resources",
      content: [
        {
          type: "paragraph",
          text: "The plan is a promise you make to yourself before the money moves. Break the work into tasks, order them, and estimate time and cost for each. Budget for the weather — literally: a wet week stalls earthworks, a dry one delays planting. Add a contingency of ten to fifteen percent and treat it as part of the budget, not a surprise.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=_FRIhI28OpU",
          caption: "How to create a farm business plan — University of Maine Cooperative Extension.",
        },
        {
          type: "list",
          items: [
            "Break the work into tasks small enough to estimate.",
            "Sequence tasks: what must finish before the next starts?",
            "Budget the calendar — seasons set your deadlines.",
            "Hold a 10–15% contingency, and say so out loud.",
          ],
        },
        {
          type: "quiz",
          title: "Planning",
          passPercent: 60,
          questions: [
            {
              question: "Why break work into small tasks?",
              options: [
                "So each one can be estimated and tracked",
                "To create more paperwork",
                "So the plan looks impressive",
                "Tasks should stay large",
              ],
              answerIndex: 0,
            },
            {
              question: "The recommended contingency is:",
              options: [
                "10–15% of the budget",
                "0% — plans are exact",
                "50% or more",
                "Whatever is left over",
              ],
              answerIndex: 0,
            },
            {
              question: "In agriculture, what often sets your deadlines?",
              options: [
                "The seasons",
                "The bank's calendar",
                "The equipment dealer",
                "Nothing at all",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Executing & tracking",
      content: [
        {
          type: "paragraph",
          text: "A plan you never look at is a wish. Track progress weekly against the plan: tasks done, money spent, days used. One simple rule keeps projects honest — when reality differs from the plan, update the plan and tell the owner. Small weekly corrections beat one large rescue at the end.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=lGeXD34J1V8",
          caption: "Keeping production records — the backbone of tracking.",
        },
        {
          type: "code",
          prompt: true,
          text: "project status --drip-block-4\n[ok] week 3/6 · tasks 58% · budget 61% · on pace\n[ok] mainline  complete\n[ok] laterals   on schedule\n[warn] pump delivery delayed 4 days — re-sequence laterals first",
        },
        {
          type: "quiz",
          title: "Tracking",
          passPercent: 60,
          questions: [
            {
              question: "How often should progress be checked?",
              options: [
                "Weekly, against the plan",
                "Once at the end",
                "Never — plans are self-executing",
                "Only when something breaks",
              ],
              answerIndex: 0,
            },
            {
              question: "When reality differs from the plan, you should:",
              options: [
                "Update the plan and tell the owner",
                "Hide the difference",
                "Blame the weather",
                "Stop tracking",
              ],
              answerIndex: 0,
            },
            {
              question: "The status check flagged what?",
              options: [
                "A delayed pump delivery",
                "A budget overrun",
                "A failed crop",
                "Nothing — all green",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Risk & change management",
      content: [
        {
          type: "paragraph",
          text: "Every project has a short list of risks that could actually stop it: a late input, a price collapse, a contractor no-show, a permit delay. Write them down at the start, score them, and give each one an owner and a response. When things change — and they will — route the change through a simple rule: does it change scope, time, or budget? If yes, the owner decides, in writing.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Nwl7PquhU5U",
          caption: "An introduction to project risk management.",
        },
        {
          type: "note",
          tone: "warn",
          text: "An unmanaged change is a new project hiding inside your project. Scope, time, and budget move together — never change one silently.",
        },
        {
          type: "quiz",
          title: "Risk & change",
          passPercent: 60,
          questions: [
            {
              question: "What should every major risk have?",
              options: [
                "An owner and a response",
                "A prayer",
                "A bigger budget",
                "No one — risks vanish",
              ],
              answerIndex: 0,
            },
            {
              question: "When does a change need the owner's sign-off?",
              options: [
                "When it moves scope, time, or budget",
                "Only when it costs money",
                "Only if it is someone else's idea",
                "Never — changes are free",
              ],
              answerIndex: 0,
            },
            {
              question: "How are risks handled best?",
              options: [
                "Written down, scored, and assigned early",
                "Ignored until they happen",
                "Shared only at the end",
                "Moved to next season",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Closing, handover & lessons",
      content: [
        {
          type: "paragraph",
          text: "A project ends twice: when the work stops, and when the records close. Sign off the deliverable against the success criteria, hand over the operation — who runs the new irrigation, who keeps the packhouse records — and write the lessons before everyone forgets. The next project is cheaper because this one was documented.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=OyrKGopOGpQ",
          caption: "Project management basics, terminology, and the full lifecycle.",
        },
        {
          type: "list",
          items: [
            "Close against the success criteria, not the calendar.",
            "Hand over operations to a named owner with training.",
            "Capture lessons within two weeks of finishing.",
            "Archive the plan, the budget, and the changes.",
          ],
        },
        {
          type: "quiz",
          title: "Closing",
          passPercent: 60,
          questions: [
            {
              question: "What should you close the project against?",
              options: [
                "The success criteria",
                "The season calendar",
                "The bank's deadline",
                "Nothing — just stop",
              ],
              answerIndex: 0,
            },
            {
              question: "Who should take over operations at handover?",
              options: [
                "A named owner with training",
                "Whoever is free that week",
                "The original contractor",
                "No one — it runs itself",
              ],
              answerIndex: 0,
            },
            {
              question: "Lessons should be captured:",
              options: [
                "Within two weeks of finishing",
                "Next season",
                "Only if problems occurred",
                "Never",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
