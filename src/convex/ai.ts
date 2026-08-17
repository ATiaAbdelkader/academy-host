import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

// With Convex Auth, the users table's id is the auth subject.
function userIdOf(subject: string): Id<"users"> {
  return subject as Id<"users">;
}

/**
 * AI study assistant. Students ask questions about a course and get a
 * grounded answer. Uses an OpenAI-compatible chat completions endpoint
 * (OpenAI by default); the model and base URL are configurable through
 * environment variables so the academy can point it at any compatible
 * provider without code changes.
 *
 *   OPENAI_API_KEY  — required. Set it in the project's Keys/API keys tab.
 *   OPENAI_MODEL    — optional, defaults to "gpt-4o-mini".
 *   OPENAI_BASE_URL — optional, defaults to "https://api.openai.com/v1".
 *
 * The action never throws on configuration/network problems: it returns a
 * typed error the UI can show inline, so the course page never crashes.
 */

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const HISTORY_LIMIT = 12;

/** Store one exchange (question + answer) in the student's chat history. */
export const recordExchange = mutation({
  args: {
    courseId: v.optional(v.id("courses")),
    userMessage: v.string(),
    assistantMessage: v.string(),
  },
  handler: async (ctx, { courseId, userMessage, assistantMessage }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Sign in to chat with the assistant.");
    }
    const now = Date.now();
    const userId = userIdOf(user.subject);
    await ctx.db.insert("aiMessages", {
      userId,
      role: "user",
      content: userMessage,
      courseId,
      createdAt: now,
    });
    await ctx.db.insert("aiMessages", {
      userId,
      role: "assistant",
      content: assistantMessage,
      courseId,
      createdAt: now + 1,
    });
  },
});

/** The signed-in student's recent assistant conversation, oldest first. */
export const myMessages = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return null;
    }
    const messages = await ctx.db
      .query("aiMessages")
      .withIndex("by_user", (q) => q.eq("userId", userIdOf(user.subject)))
      .order("desc")
      .take(60);
    return messages.reverse();
  },
});

/**
 * Ask the assistant about a course (or the academy generally). The course's
 * title, description, and module outline are injected as context so answers
 * stay on-topic; the last few turns of conversation are kept for continuity.
 */
export const ask = action({
  args: {
    question: v.string(),
    courseId: v.optional(v.id("courses")),
    history: v.optional(
      v.array(
        v.object({
          role: v.union(v.literal("user"), v.literal("assistant")),
          content: v.string(),
        }),
      ),
    ),
  },
  handler: async (ctx, { question, courseId, history }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { ok: false as const, error: "Sign in to chat with the assistant." };
    }
    const trimmed = question.trim();
    if (trimmed.length === 0 || trimmed.length > 2000) {
      return {
        ok: false as const,
        error: "Keep your question between 1 and 2,000 characters.",
      };
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return {
        ok: false as const,
        error:
          "The AI assistant is not configured yet. Add an OPENAI_API_KEY in the project's Keys tab to enable it.",
      };
    }

    // Course context: what the assistant knows about the current lesson.
    let courseContext = "";
    if (courseId) {
      const course = await ctx.runQuery(api.courses.getById, {
        courseId,
      }).catch(() => null);
      if (course) {
        const outline = (course.modules ?? [])
          .map((module, i) => `  ${i + 1}. ${module.title}`)
          .join("\n");
        courseContext = [
          `Course: ${course.title}`,
          course.description ? `Description: ${course.description}` : null,
          `Instructor: ${course.instructor ?? "Academy staff"}`,
          "Module outline:",
          outline,
        ]
          .filter((line): line is string => line !== null)
          .join("\n");
      }
    }

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: [
          "You are the study assistant for AgriSkills Academy, an agriculture training academy.",
          "You help students understand course material, prepare for module quizzes, and apply concepts on the farm.",
          courseContext
            ? `\nThe student is asking about this course:\n${courseContext}\n`
            : "",
          "Answer clearly and concretely. Use short paragraphs and bullet points where helpful.",
          "If a question is outside the course material, say so and steer back to the training topics.",
          "Never invent facts about the academy's schedule, prices, or policies.",
        ].join("\n"),
      },
      ...(history ?? []).slice(-HISTORY_LIMIT),
      { role: "user", content: trimmed },
    ];

    let answer: string;
    try {
      const baseUrl = (process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
      const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 600,
          temperature: 0.4,
        }),
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        return {
          ok: false as const,
          error: `The assistant API returned ${response.status}. ${detail.slice(0, 200)}`,
        };
      }
      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) {
        return { ok: false as const, error: "The assistant returned an empty answer. Try again." };
      }
      answer = content;
    } catch (error) {
      return {
        ok: false as const,
        error:
          error instanceof Error && error.name === "TimeoutError"
            ? "The assistant took too long. Try a shorter question."
            : error instanceof Error
              ? error.message
              : "Could not reach the assistant. Try again shortly.",
      };
    }

    await ctx.runMutation(api.ai.recordExchange, {
      courseId,
      userMessage: trimmed,
      assistantMessage: answer,
    }).catch(() => {});
    return { ok: true as const, answer };
  },
});
