import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, BookOpen, Lightbulb, History } from "lucide-react";
import { toast } from "sonner";

const QUICK_PROMPTS = [
  "Explain crop rotation and why it matters",
  "What are the best soil testing methods?",
  "How do I calculate fertilizer requirements?",
  "What is integrated pest management (IPM)?",
  "How can I improve water efficiency on my farm?",
  "What are organic certification requirements?",
];

function getLocalReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("crop rotation")) return "Crop rotation is the practice of growing different types of crops in the same area across seasons. It helps break pest cycles, improves soil health, prevents nutrient depletion, and can increase yields by 10-25%. A common pattern is: legumes → leafy greens → root vegetables → fruiting crops.";
  if (lower.includes("soil test")) return "The best soil testing methods include: 1) Laboratory analysis — most accurate, sends samples to a certified lab. 2) Home test kits — quick pH and nutrient checks. 3) Electronic soil meters — measure pH, moisture, and light. For professional farming, lab analysis every 1-2 years is recommended. Test at 6-8 inches depth for row crops.";
  if (lower.includes("fertilizer") || lower.includes("npk")) return "Calculate fertilizer needs based on: 1) Current soil nutrient levels (from soil test). 2) Crop nutrient requirements. 3) Expected yield target. Formula: Required nutrients (kg/ha) = (Crop uptake × Target yield) − Soil supply − Manure contribution. Always follow the 4R principle: Right source, Right rate, Right time, Right place.";
  if (lower.includes("ipm") || lower.includes("pest management")) return "Integrated Pest Management (IPM) combines: 1) Biological control (natural predators), 2) Cultural practices (crop rotation, resistant varieties), 3) Mechanical methods (traps, barriers), 4) Chemical control as last resort. Monitor regularly, set economic thresholds, and always identify the pest before treating.";
  if (lower.includes("water") || lower.includes("irrigation")) return "Improve water efficiency by: 1) Drip irrigation (90-95% efficiency vs 60% for flood). 2) Mulching to reduce evaporation by 25-50%. 3) Rainwater harvesting. 4) Scheduling irrigation based on soil moisture sensors. 5) Deficit irrigation during less critical growth stages. 6) Using drought-resistant varieties.";
  if (lower.includes("organic") || lower.includes("certification")) return "Organic certification typically requires: 1) 3-year transition period with no synthetic chemicals. 2) Detailed record keeping. 3) Approved input list only. 4) Regular inspections. 5) Buffer zones from conventional farms. Costs vary: $750-$2,000/year depending on certification body and farm size.";
  return `Great question about agriculture! Here's what I recommend:\n\n1. Start with understanding the fundamentals — check relevant courses in our catalog\n2. Consider your local climate, soil type, and market conditions\n3. Connect with experienced farmers in your area\n4. Keep detailed records of what works and what doesn't\n\nWould you like me to point you to a specific course module that covers this topic?`;
}

export default function AiAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordExchange = useMutation(api.aiChat.recordExchange);
  const history = useQuery(api.aiChat.myMessages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    // Simulate AI response with local knowledge
    setTimeout(async () => {
      const reply = getLocalReply(msg);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
      try {
        await recordExchange({ userMessage: msg, assistantMessage: reply });
      } catch {
        // Ignore recording errors
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Bot className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">AI Study Assistant</h1>
        </div>

        {/* Quick Prompts */}
        {messages.length === 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1">
              <Lightbulb className="w-4 h-4" /> Quick Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:border-green-400 hover:bg-green-50 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Window */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col" style={{ height: messages.length > 0 ? "500px" : "auto" }}>
          {messages.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                      <div className="flex items-center gap-1 mb-1">
                        {m.role === "assistant" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        <span className="text-xs font-bold">{m.role === "assistant" ? "AI Assistant" : "You"}</span>
                      </div>
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2">
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 animate-pulse">
                      <Bot className="w-3 h-3 inline mr-1" /> Thinking...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-gray-200 p-3 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
                  className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500"
                  placeholder="Ask about farming, crops, soil, business..."
                  disabled={loading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="bg-[var(--color-primary,#16a34a)] text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <Bot className="w-12 h-12 text-green-200 mx-auto mb-3" />
              <h3 className="font-bold text-gray-700 mb-1">Ask me anything about agriculture</h3>
              <p className="text-xs text-gray-500">I can help with soil management, crop planning, pest control, business strategy, and more.</p>
            </div>
          )}
        </div>

        {/* Conversation History */}
        {messages.length === 0 && history && history.length > 0 && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <History className="w-4 h-4 text-gray-500" />
              <h2 className="font-bold text-sm uppercase tracking-wider">Recent Conversations</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {history.slice(-20).map((m) => (
                <div key={m._id} className={`px-4 py-2 text-sm ${m.role === "user" ? "bg-green-50/50" : ""}`}>
                  <span className="text-xs font-bold text-gray-400">{m.role === "user" ? "You" : "AI"}:</span>{" "}
                  <span className="text-gray-700 truncate">{m.content.slice(0, 100)}...</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
