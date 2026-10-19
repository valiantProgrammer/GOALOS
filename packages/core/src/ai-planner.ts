/**
 * GoalOS AI System Assistant & Planner
 * Supports Google Gemini API with robust rule-based fallback.
 */

export interface AiPlanRequest {
  prompt: string;
  category?: string;
  hunterLevel?: number;
  hunterStats?: Record<string, number>;
  currentStreak?: number;
}

export interface AiPlanResponse {
  message: string;
  suggestedTasks?: Array<{
    title: string;
    category: "study" | "health" | "work" | "personal" | "finance";
    difficulty: "easy" | "medium" | "hard";
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

export async function generateHunterAiResponse(req: AiPlanRequest): Promise<AiPlanResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const promptLower = req.prompt.toLowerCase();

  // If Gemini API Key is configured in environment, attempt live LLM call
  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the GoalOS Hunter System AI Assistant inspired by RPG leveling mechanics. Address the user as 'Hunter'. Current level: ${req.hunterLevel ?? 32}, Streak: ${req.currentStreak ?? 12} days. Respond with crisp, structured tactical advice, daily plan, or goal breakdown. User prompt: "${req.prompt}"`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return parseGeminiTextToHunterResponse(text, req);
        }
      }
    } catch {
      // Fallback silently to rule-based engine
    }
  }

  // Authoritative Rule-Based Fallback Engine
  return generateRuleBasedResponse(req, promptLower);
}

function parseGeminiTextToHunterResponse(text: string, req: AiPlanRequest): AiPlanResponse {
  return {
    message: text,
    suggestedTasks: [
      {
        title: "Deep Work Sprint (60m)",
        category: "study",
        difficulty: "hard",
        xp: 150,
      },
      {
        title: "Physical Calibration / Mobility",
        category: "health",
        difficulty: "easy",
        xp: 50,
      },
    ],
    insights: [
      "Consistency over intensity: Your current streak multiplies all rewards.",
      "Complete high-priority quests during peak morning focus hours.",
    ],
  };
}

function generateRuleBasedResponse(req: AiPlanRequest, promptLower: string): AiPlanResponse {
  if (promptLower.includes("plan") || promptLower.includes("day") || promptLower.includes("schedule")) {
    return {
      message:
        "Tactical Daily Battle Plan generated, Hunter. High cognitive tasks have been allocated to your peak morning hours, followed by stamina calibration and evening decompression.",
      suggestedTasks: [
        {
          title: "Study DSA & Algorithm Paradigms (60 min)",
          category: "study",
          difficulty: "medium",
          xp: 100,
          deadline: "10:00 AM",
        },
        {
          title: "Full Body Mobility & Core Conditioning",
          category: "health",
          difficulty: "medium",
          xp: 80,
          deadline: "04:00 PM",
        },
        {
          title: "System Design / Project Engineering",
          category: "work",
          difficulty: "hard",
          xp: 150,
          deadline: "07:00 PM",
        },
        {
          title: "Evening Reflection & Tomorrow's Quests",
          category: "personal",
          difficulty: "easy",
          xp: 40,
          deadline: "09:30 PM",
        },
      ],
      insights: [
        "Completing all 4 planned quests today triggers the +50 Daily Completion XP bonus.",
        "Your 12-day streak applies a 1.2x multiplier to today's total XP output.",
      ],
    };
  }

  if (promptLower.includes("goal") || promptLower.includes("break down") || promptLower.includes("milestone")) {
    return {
      message:
        "Deconstructing target objective into calibrated milestone nodes. Each milestone acts as a dungeon checkpoint with designated XP bounty.",
      milestones: [
        { title: "Milestone 1: Architectural Foundations & Schema Design", targetDate: "Week 1", xpReward: 250 },
        { title: "Milestone 2: Core Engine & API Pipeline Construction", targetDate: "Week 2", xpReward: 500 },
        { title: "Milestone 3: UI Implementation & Mockup-Exact Polish", targetDate: "Week 3", xpReward: 750 },
        { title: "Milestone 4: End-to-End Stress Testing & Production Deployment", targetDate: "Week 4", xpReward: 1000 },
      ],
      insights: [
        "Decomposed goals experience an 84% higher completion rate among ranked hunters.",
      ],
    };
  }

  if (promptLower.includes("routine") || promptLower.includes("habit")) {
    return {
      message:
        "Routine diagnostic complete. To maximize willpower conservation, sequence high-effort habits immediately after established anchors.",
      routineRecommendations: [
        "06:00 AM — Immediate hydration (500ml water) + 5 min sunlight exposure",
        "06:30 AM — 25 min High Focus Deep Work block before checking notifications",
        "12:30 PM — Nutrition + 15 min restorative physical movement",
        "09:30 PM — Digital sunset + 10 min gratitude and quest scheduling",
      ],
      insights: [
        "Habit chaining reduces cognitive resistance by treating routines as a single compound action.",
      ],
    };
  }

  if (promptLower.includes("motivate") || promptLower.includes("tired") || promptLower.includes("hard")) {
    return {
      message:
        "Remember why you awakened, Hunter. Every rep, every completed line of code, and every minute of focused attention is quietly forging your monarch title. The gap between your current rank and the next tier is simply accumulated discipline.",
      insights: [
        "A stronger you builds a brighter tomorrow.",
        "Discipline unlocks hidden potential.",
      ],
    };
  }

  if (promptLower.includes("analyze") || promptLower.includes("progress") || promptLower.includes("review")) {
    return {
      message:
        "Hunter Performance Diagnostic: Lv. 32 Shadow Hunter with 12-day active streak. Your habit consistency index is at 75%, and study focus accounts for 45% of total dedicated time. You are 2,570 XP away from C-Rank advancement.",
      insights: [
        "Top recommendation: Increase physical stamina quests to balance your high intelligence stat.",
        "Maintain current streak for 2 more days to unlock the '2-Week Sovereign' title bonus.",
      ],
    };
  }

  // Default tactical response
  return {
    message: `System standby active, Hunter. How can I assist your ascension today? Select a tactical protocol below or ask any question.`,
    insights: [
      "Available commands: Plan My Day, Break Down Goal, Routine Optimization, Performance Review.",
    ],
  };
}
