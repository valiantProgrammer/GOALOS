"use client";

import React, { useState } from "react";
import { SidebarNav } from "@/components/ui/SidebarNav";
import { TopBar } from "@/components/ui/TopBar";
import { BottomNav } from "@/components/ui/BottomNav";
import {
  Sparkles,
  Send,
  Calendar,
  Target,
  Flame,
  BookOpen,
  Award,
  BarChart3,
  Bot,
  User,
  CheckCircle2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
  suggestedTasks?: Array<{
    title: string;
    category: string;
    difficulty: string;
    xp: number;
    deadline?: string;
  }>;
  milestones?: Array<{
    title: string;
    targetDate: string;
    xpReward: number;
  }>;
  routineRecommendations?: string[];
  insights?: string[];
}

export default function AssistantPage() {
  const [activeTab, setActiveTab] = useState("chat");
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      role: "assistant",
      text: "How can I help you today, Hunter? Select a protocol below or ask any tactical question.",
    },
  ]);

  const quickPrompts = [
    { label: "Plan my day", icon: Calendar, query: "Plan my day" },
    { label: "Break down a big goal", icon: Target, query: "Break down a big goal" },
    { label: "Suggest a better routine", icon: Flame, query: "Suggest a better routine" },
    { label: "Explain a concept", icon: BookOpen, query: "Explain a complex concept simply" },
    { label: "Motivate me", icon: Award, query: "Motivate me" },
    { label: "Analyze my progress", icon: BarChart3, query: "Analyze my progress" },
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          text: json.data.message,
          suggestedTasks: json.data.suggestedTasks,
          milestones: json.data.milestones,
          routineRecommendations: json.data.routineRecommendations,
          insights: json.data.insights,
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          text: "System response: Maintain your focus and discipline. All scheduled daily tasks will advance your ranking.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#030712] text-slate-100 overflow-hidden font-sans">
      <SidebarNav activeRoute="/dashboard" />

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar searchPlaceholder="Search system assistant..." />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">AI System Assistant</h1>
            <p className="text-xs text-slate-400 mt-1">Autonomous intelligence guiding your hunter progression</p>
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-2">
            {[
              { id: "chat", label: "Chat" },
              { id: "plan", label: "Plan" },
              { id: "analyze", label: "Analyze" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "plan") handleSend("Plan my day");
                  if (tab.id === "analyze") handleSend("Analyze my progress");
                }}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-[#0b1528] text-slate-400 hover:text-slate-200 border border-slate-800/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Chat & Interactive Assistant Workspace */}
            <div className="lg:col-span-8 bg-[#070e1c] border border-blue-900/40 rounded-2xl p-6 flex flex-col justify-between min-h-[560px] shadow-2xl relative overflow-hidden">
              {/* Message Thread */}
              <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
                {messages.map((m) => {
                  const isAi = m.role === "assistant";

                  return (
                    <div
                      key={m.id}
                      className={`flex items-start gap-3 ${isAi ? "justify-start" : "justify-end"}`}
                    >
                      {isAi && (
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl p-4 max-w-[85%] text-xs space-y-3 ${
                          isAi
                            ? "bg-[#0c182e] border border-blue-800/50 text-slate-200 shadow-lg"
                            : "bg-blue-600 text-white font-medium"
                        }`}
                      >
                        <p className="leading-relaxed">{m.text}</p>

                        {/* If AI suggested tasks */}
                        {m.suggestedTasks && (
                          <div className="space-y-2 pt-2 border-t border-slate-800">
                            <span className="font-bold text-sky-400 uppercase tracking-wider text-[10px]">
                              Recommended Quests:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {m.suggestedTasks.map((task, idx) => (
                                <div
                                  key={idx}
                                  className="bg-[#070e1c] border border-blue-900/40 p-2.5 rounded-xl flex items-center justify-between"
                                >
                                  <div>
                                    <div className="font-bold text-white text-[11px]">{task.title}</div>
                                    <div className="text-[10px] text-slate-400">
                                      {task.category} • {task.difficulty}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/50">
                                    +{task.xp} XP
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* If AI suggested milestones */}
                        {m.milestones && (
                          <div className="space-y-2 pt-2 border-t border-slate-800">
                            <span className="font-bold text-purple-400 uppercase tracking-wider text-[10px]">
                              Objective Milestones:
                            </span>
                            <div className="space-y-1.5">
                              {m.milestones.map((ms, idx) => (
                                <div
                                  key={idx}
                                  className="bg-[#070e1c] border border-slate-800 p-2 rounded-xl flex items-center justify-between text-[11px]"
                                >
                                  <span className="text-slate-300 font-medium">{ms.title}</span>
                                  <span className="text-purple-400 font-bold">+{ms.xpReward} XP</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Insights */}
                        {m.insights && (
                          <div className="pt-2 border-t border-slate-800/60 space-y-1">
                            {m.insights.map((ins, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[10px] text-cyan-300">
                                <Sparkles className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                                <span>{ins}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {!isAi && (
                        <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Input Box */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center gap-2">
                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-[#050b17] border border-blue-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>

            {/* Right Quick Protocols Panel (matching MM-20 tile menu) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-5 space-y-4 shadow-2xl">
                <h2 className="text-sm font-bold text-white tracking-wide uppercase">Quick Protocols</h2>

                <div className="space-y-2">
                  {quickPrompts.map((q, idx) => {
                    const Icon = q.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSend(q.query)}
                        className="w-full bg-[#0b162c] hover:bg-[#102040] border border-blue-900/30 hover:border-blue-600 p-3 rounded-xl flex items-center gap-3 transition text-left text-xs font-semibold text-slate-200"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/50 flex items-center justify-center text-blue-400">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{q.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Art Panel with Motivational Quote */}
              <div className="bg-[#070e1c] border border-blue-900/40 rounded-2xl p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-end shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#07132a]/60 to-[#0c224a]/80" />
                <div className="relative z-10 text-center space-y-1">
                  <div className="text-xs font-black tracking-widest text-sky-400 uppercase drop-shadow-[0_0_8px_#38bdf8]">
                    A STRONGER YOU
                  </div>
                  <div className="text-xs font-black tracking-widest text-sky-400 uppercase drop-shadow-[0_0_8px_#38bdf8]">
                    BUILDS A BRIGHTER TOMORROW
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
