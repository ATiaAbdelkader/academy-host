"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { vly } from "../lib/vly-integrations";

/**
 * AI study assistant. Students ask questions about a course and get a
 * grounded answer. Uses an OpenAI-compatible chat completions endpoint
 * (OpenAI by default); the model and base URL are configurable through
 * environment variables so the academy can point it at any compatible
 * provider without code changes.
 *
 *   VLY_INTEGRATION_KEY — auto-injected by the platform; the assistant uses
 *                         the platform's AI gateway first, so it works with
 *                         zero extra setup and is billed automatically.
 *   OPENAI_API_KEY      — optional fallback: if no gateway key is present,
 *                         the assistant calls OpenAI directly instead.
 *   OPENAI_MODEL        — optional, defaults to "gpt-4o-mini".
 *   OPENAI_BASE_URL     — optional, defaults to "https://api.openai.com/v1".
 *
 * The action never throws on configuration/network problems: it returns a
 * typed error the UI can show inline, so the course page never crashes.
 */

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const HISTORY_LIMIT = 12;

/**
 * Ask the assistant about a course (or the academy generally). The course's
 * title, description, and module outline are injected as context so answers
 * stay on-topic; the last few turns of conversation are kept for continuity.
 * Chat history lives in aiChat.ts (recordExchange / myMessages) — queries and
 * mutations can't share a "use node" file with actions.
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

    const vlyKey = process.env.VLY_INTEGRATION_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!vlyKey && !openaiKey) {
      return {
        ok: false as const,
        error:
          "The AI assistant is not configured yet. Add an OPENAI_API_KEY in the project's Keys tab to enable it.",
      };
    }

    // Context: what the assistant knows about the student's question.
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
    } else {
      // Global mode: the full catalog so the assistant can compare courses,
      // recommend a track, or point at the right module for a topic.
      const catalog = await ctx.runQuery(api.courses.list).catch(() => []);
      const visible = catalog.filter((c) => c.published);
      courseContext = visible.length
        ? `The academy catalog (${
            visible.length
          } courses; price in USD, duration in minutes):\n` +
          visible
            .map(
              (c) =>
                `  - ${c.title} [${c.category}] ${c.durationMinutes}m ${
                  c.priceCents === 0 ? "free" : `$${(c.priceCents / 100).toFixed(2)}`
                } — ${c.description}`,
            )
            .join("\n")
        : "";
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
      const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
      if (vlyKey) {
        // Preferred path: the platform's AI gateway (auto-injected key, billed
        // automatically). Falls back to direct OpenAI below when absent.
        const completion = await vly.ai.completion({
          model,
          messages,
          temperature: 0.4,
          maxTokens: 600,
        });
        if (!completion.success || !completion.data) {
          return {
            ok: false as const,
            error: completion.error
              ? `The assistant failed: ${completion.error}`
              : "The assistant failed to respond. Try again shortly.",
          };
        }
        const content = completion.data.choices?.[0]?.message?.content?.trim();
        if (!content) {
          return {
            ok: false as const,
            error: "The assistant returned an empty answer. Try again.",
          };
        }
        answer = content;
      } else {
        // Fallback: direct OpenAI-compatible call.
        const baseUrl = (process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
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
          return {
            ok: false as const,
            error: "The assistant returned an empty answer. Try again.",
          };
        }
        answer = content;
      }
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

    await ctx.runMutation(api.aiChat.recordExchange, {
      courseId,
      userMessage: trimmed,
      assistantMessage: answer,
    }).catch(() => {});
    return { ok: true as const, answer };
  },
});
