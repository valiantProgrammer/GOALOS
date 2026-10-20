import { HunterProfile, Quest, Habit } from "@goalos/types";
import { DEMO_HUNTER } from "@goalos/config";

export interface SystemNotificationItem {
  id: string;
  category: "quests" | "achievements" | "social" | "system";
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  timeAgo: string;
  group: "Today" | "Yesterday" | "This Week";
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "unlocked" | "in_progress" | "locked";
  unlockedAt?: string;
  progress?: number;
  total?: number;
  badgeIcon: string;
}

export interface RoutineItem {
  id: string;
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  timeStr: string;
  title: string;
  enabled: boolean;
  order: number;
}

// In-memory single-source-of-truth store (works instantly without Atlas, can sync with MongoDB)
class HunterStore {
  private profile: HunterProfile = {
    ...DEMO_HUNTER,
    updatedAt: new Date().toISOString(),
  };

  private quests: Quest[] = [
    {
      id: "q-1",
      userId: DEMO_HUNTER.userId,
      title: "Morning Workout",
      description: "100 pushups, 100 situps, 100 squats, 10km run. Build baseline hunter strength.",
      category: "health",
      type: "daily",
      difficulty: "medium",
      baseXp: 80,
      coins: 20,
      deadline: "Today, 10:00 PM",
      repeat: "daily",
      status: "completed",
      checklist: [
        { id: "s1", title: "100 Pushups", completed: true },
        { id: "s2", title: "100 Situps", completed: true },
        { id: "s3", title: "100 Squats", completed: true },
      ],
      notes: "Completed at 7:30 AM with high energy.",
      createdAt: "2026-10-14T06:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
    {
      id: "q-2",
      userId: DEMO_HUNTER.userId,
      title: "Study DSA (1 hour)",
      description: "Complete 1 hour of DSA practice to strengthen your problem solving skills.",
      category: "study",
      type: "daily",
      difficulty: "medium",
      baseXp: 100,
      coins: 25,
      deadline: "Today, 10:00 PM",
      repeat: "daily",
      status: "in_progress",
      checklist: [
        { id: "s1", title: "Study for 60 minutes", completed: true },
        { id: "s2", title: "Solve at least 3 problems", completed: false },
        { id: "s3", title: "Mark as completed", completed: false },
      ],
      notes: "Focusing on Dynamic Programming and Binary Trees.",
      createdAt: "2026-10-14T08:00:00Z",
      updatedAt: "2026-10-14T08:00:00Z",
    },
    {
      id: "q-3",
      userId: DEMO_HUNTER.userId,
      title: "Read a Book",
      description: "Read at least 20 pages of nonfiction or system architecture.",
      category: "study",
      type: "daily",
      difficulty: "easy",
      baseXp: 50,
      coins: 15,
      deadline: "Today, 11:00 PM",
      repeat: "daily",
      status: "start",
      checklist: [{ id: "s1", title: "Read 20 pages", completed: false }],
      notes: "Reading Designing Data-Intensive Applications.",
      createdAt: "2026-10-14T08:00:00Z",
      updatedAt: "2026-10-14T08:00:00Z",
    },
    {
      id: "q-4",
      userId: DEMO_HUNTER.userId,
      title: "Drink 2L Water",
      description: "Stay hydrated throughout daily training sessions.",
      category: "health",
      type: "daily",
      difficulty: "easy",
      baseXp: 50,
      coins: 10,
      deadline: "Today, 08:00 PM",
      repeat: "daily",
      status: "start",
      checklist: [],
      notes: "",
      createdAt: "2026-10-14T08:00:00Z",
      updatedAt: "2026-10-14T08:00:00Z",
    },
    {
      id: "q-5",
      userId: DEMO_HUNTER.userId,
      title: "Meditate (10 min)",
      description: "Mindfulness and breathwork to recover mental focus.",
      category: "personal",
      type: "daily",
      difficulty: "easy",
      baseXp: 50,
      coins: 10,
      deadline: "Today, 09:00 PM",
      repeat: "daily",
      status: "start",
      checklist: [],
      notes: "",
      createdAt: "2026-10-14T08:00:00Z",
      updatedAt: "2026-10-14T08:00:00Z",
    },
    {
      id: "q-6",
      userId: DEMO_HUNTER.userId,
      title: "Plan Tomorrow",
      description: "Set tomorrow's priority matrix before sleeping.",
      category: "work",
      type: "daily",
      difficulty: "easy",
      baseXp: 40,
      coins: 10,
      deadline: "Today, 11:30 PM",
      repeat: "daily",
      status: "locked",
      checklist: [],
      notes: "Unlocks at 9:00 PM.",
      createdAt: "2026-10-14T08:00:00Z",
      updatedAt: "2026-10-14T08:00:00Z",
    },
  ];

  private habits: Habit[] = [
    {
      id: "h-1",
      userId: DEMO_HUNTER.userId,
      title: "Morning Exercise",
      category: "health",
      frequency: "daily",
      targetDaysPerWeek: 7,
      currentStreak: 12,
      bestStreak: 28,
      completions: {
        "2026-10-14": true,
        "2026-10-15": true,
        "2026-10-16": true,
        "2026-10-17": true,
        "2026-10-18": true,
        "2026-10-19": false,
        "2026-10-20": true,
      },
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
    {
      id: "h-2",
      userId: DEMO_HUNTER.userId,
      title: "Drink 2L Water",
      category: "health",
      frequency: "daily",
      targetDaysPerWeek: 7,
      currentStreak: 12,
      bestStreak: 12,
      completions: {
        "2026-10-14": true,
        "2026-10-15": true,
        "2026-10-16": true,
        "2026-10-17": true,
        "2026-10-18": true,
        "2026-10-19": true,
        "2026-10-20": false,
      },
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
    {
      id: "h-3",
      userId: DEMO_HUNTER.userId,
      title: "Meditation",
      category: "personal",
      frequency: "daily",
      targetDaysPerWeek: 7,
      currentStreak: 8,
      bestStreak: 14,
      completions: {
        "2026-10-14": true,
        "2026-10-15": false,
        "2026-10-16": true,
        "2026-10-17": true,
        "2026-10-18": true,
        "2026-10-19": true,
        "2026-10-20": false,
      },
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
    {
      id: "h-4",
      userId: DEMO_HUNTER.userId,
      title: "Read a Book",
      category: "study",
      frequency: "daily",
      targetDaysPerWeek: 7,
      currentStreak: 12,
      bestStreak: 21,
      completions: {
        "2026-10-14": true,
        "2026-10-15": true,
        "2026-10-16": false,
        "2026-10-17": true,
        "2026-10-18": true,
        "2026-10-19": true,
        "2026-10-20": true,
      },
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
    {
      id: "h-5",
      userId: DEMO_HUNTER.userId,
      title: "Healthy Food",
      category: "health",
      frequency: "daily",
      targetDaysPerWeek: 7,
      currentStreak: 9,
      bestStreak: 18,
      completions: {
        "2026-10-14": true,
        "2026-10-15": true,
        "2026-10-16": true,
        "2026-10-17": false,
        "2026-10-18": true,
        "2026-10-19": true,
        "2026-10-20": false,
      },
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
    {
      id: "h-6",
      userId: DEMO_HUNTER.userId,
      title: "No Social Media",
      category: "personal",
      frequency: "daily",
      targetDaysPerWeek: 7,
      currentStreak: 5,
      bestStreak: 10,
      completions: {
        "2026-10-14": false,
        "2026-10-15": true,
        "2026-10-16": true,
        "2026-10-17": true,
        "2026-10-18": false,
        "2026-10-19": true,
        "2026-10-20": true,
      },
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
    {
      id: "h-7",
      userId: DEMO_HUNTER.userId,
      title: "Sleep Early",
      category: "health",
      frequency: "daily",
      targetDaysPerWeek: 7,
      currentStreak: 4,
      bestStreak: 15,
      completions: {
        "2026-10-14": false,
        "2026-10-15": false,
        "2026-10-16": true,
        "2026-10-17": true,
        "2026-10-18": true,
        "2026-10-19": true,
        "2026-10-20": false,
      },
      createdAt: "2026-10-01T00:00:00Z",
      updatedAt: "2026-10-14T07:30:00Z",
    },
  ];

  private routines: RoutineItem[] = [
    { id: "r1", timeOfDay: "morning", timeStr: "06:00 AM", title: "Wake Up", enabled: true, order: 1 },
    { id: "r2", timeOfDay: "morning", timeStr: "06:10 AM", title: "Drink Water", enabled: true, order: 2 },
    { id: "r3", timeOfDay: "morning", timeStr: "06:30 AM", title: "Morning Exercise", enabled: true, order: 3 },
    { id: "r4", timeOfDay: "morning", timeStr: "06:45 AM", title: "Meditation", enabled: false, order: 4 },
    { id: "r5", timeOfDay: "morning", timeStr: "07:00 AM", title: "Plan My Day", enabled: true, order: 5 },
  ];

  private notifications: SystemNotificationItem[] = [
    {
      id: "n-1",
      category: "quests",
      title: "Quest Completed!",
      body: "Morning Workout (+80 XP awarded). Daily streak maintained.",
      createdAt: "2026-10-14T07:30:00Z",
      read: false,
      timeAgo: "10 min ago",
      group: "Today",
    },
    {
      id: "n-2",
      category: "system",
      title: "Level Up!",
      body: "You reached Level 32. 3 Stat Points & 1 Skill Point granted.",
      createdAt: "2026-10-14T07:05:00Z",
      read: false,
      timeAgo: "35 min ago",
      group: "Today",
    },
    {
      id: "n-3",
      category: "achievements",
      title: "New Achievement Unlocked",
      body: "Early Bird • Completed your routine before 8:00 AM.",
      createdAt: "2026-10-14T06:30:00Z",
      read: false,
      timeAgo: "1 hour ago",
      group: "Today",
    },
    {
      id: "n-4",
      category: "social",
      title: "Friend Request",
      body: "Priya sent you a friend request.",
      createdAt: "2026-10-14T05:30:00Z",
      read: true,
      timeAgo: "2 hours ago",
      group: "Today",
    },
    {
      id: "n-5",
      category: "quests",
      title: "Weekly Challenge",
      body: "3 days left to complete 25 total quests this week.",
      createdAt: "2026-10-13T10:00:00Z",
      read: true,
      timeAgo: "1 day ago",
      group: "Yesterday",
    },
    {
      id: "n-6",
      category: "social",
      title: "Party Invitation",
      body: "Karan invited you to join 'DSA Study Group'.",
      createdAt: "2026-10-13T09:00:00Z",
      read: true,
      timeAgo: "1 day ago",
      group: "Yesterday",
    },
    {
      id: "n-7",
      category: "system",
      title: "System Update",
      body: "New features and performance optimizations deployed.",
      createdAt: "2026-10-11T12:00:00Z",
      read: true,
      timeAgo: "3 days ago",
      group: "This Week",
    },
  ];

  private achievements: AchievementItem[] = [
    { id: "a1", title: "First Step", description: "Complete your first quest ever.", category: "Starter", status: "unlocked", unlockedAt: "Oct 1, 2026", badgeIcon: "footprints" },
    { id: "a2", title: "7 Day Streak", description: "Maintain a 7-day workout habit streak.", category: "Consistency", status: "unlocked", unlockedAt: "Oct 7, 2026", badgeIcon: "flame" },
    { id: "a3", title: "Early Bird", description: "Complete a morning routine before 8:00 AM.", category: "Routine", status: "unlocked", unlockedAt: "Oct 14, 2026", badgeIcon: "sun" },
    { id: "a4", title: "Book Reader", description: "Read 500 total pages across quests.", category: "Knowledge", status: "in_progress", progress: 340, total: 500, badgeIcon: "book-open" },
    { id: "a5", title: "Fitness Master", description: "Complete 50 workout quests.", category: "Health", status: "in_progress", progress: 28, total: 50, badgeIcon: "dumbbell" },
    { id: "a6", title: "Social Butterfly", description: "Join 3 party quests with hunters.", category: "Social", status: "locked", badgeIcon: "users" },
    { id: "a7", title: "Dungeon Explorer", description: "Complete your first boss dungeon challenge.", category: "Dungeons", status: "locked", badgeIcon: "sword" },
    { id: "a8", title: "Knowledge Seeker", description: "Complete 50 study quests.", category: "Study", status: "in_progress", progress: 32, total: 50, badgeIcon: "graduation-cap" },
  ];

  private completionHistory = new Set<string>();

  public getProfile() {
    return { ...this.profile };
  }

  public getQuests() {
    return [...this.quests];
  }

  public getHabits() {
    return [...this.habits];
  }

  public getRoutines() {
    return [...this.routines];
  }

  public getNotifications() {
    return [...this.notifications];
  }

  public getAchievements() {
    return [...this.achievements];
  }

  public markAllNotificationsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
    this.bumpSync();
  }

  public toggleQuestCompletion(questId: string, localDate: string, idempotencyKey: string) {
    const dedupeKey = `${questId}:${localDate}`;
    const quest = this.quests.find((q) => q.id === questId);
    if (!quest) throw new Error("Quest not found");

    if (this.completionHistory.has(dedupeKey)) {
      // Revert completion
      this.completionHistory.delete(dedupeKey);
      quest.status = "in_progress";
      this.profile.currentXp = Math.max(0, this.profile.currentXp - quest.baseXp);
    } else {
      // Mark completed
      this.completionHistory.add(dedupeKey);
      quest.status = "completed";
      this.profile.currentXp += quest.baseXp;
      this.profile.lifetimeXp += quest.baseXp;
      this.profile.coins += quest.coins;

      // Handle level up
      if (this.profile.currentXp >= this.profile.nextLevelXp) {
        this.profile.currentXp -= this.profile.nextLevelXp;
        this.profile.level += 1;
        this.profile.unspentPoints += 3;
        this.profile.skillPoints += 1;
      }
    }

    this.bumpSync();
    return { quest: { ...quest }, profile: { ...this.profile } };
  }

  public spendStats(allocations: Partial<HunterProfile["stats"]>) {
    let total = 0;
    for (const [k, v] of Object.entries(allocations)) {
      if (v && v > 0) {
        total += v;
        const statKey = k as keyof HunterProfile["stats"];
        this.profile.stats[statKey] += v;
      }
    }
    if (total > this.profile.unspentPoints) {
      throw new Error("Insufficient unspent points");
    }
    this.profile.unspentPoints -= total;
    this.bumpSync();
    return { profile: { ...this.profile } };
  }

  public updateProfile(data: Partial<HunterProfile>) {
    this.profile = {
      ...this.profile,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.bumpSync();
    return this.profile;
  }

  public addQuest(questData: Partial<Quest>) {
    const newQuest: Quest = {
      id: `q-${Date.now()}`,
      userId: this.profile.userId,
      title: questData.title || "New Quest",
      description: questData.description || "",
      category: questData.category || "personal",
      type: questData.type || "daily",
      difficulty: questData.difficulty || "medium",
      baseXp: questData.baseXp || 50,
      coins: questData.coins || 10,
      deadline: questData.deadline || "Today, 10:00 PM",
      repeat: questData.repeat || "daily",
      status: "start",
      checklist: questData.checklist || [],
      notes: questData.notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.quests.unshift(newQuest);
    this.bumpSync();
    return newQuest;
  }

  public updateRoutineItem(id: string, enabled: boolean) {
    const r = this.routines.find((item) => item.id === id);
    if (r) {
      r.enabled = enabled;
      this.bumpSync();
    }
    return r;
  }

  private bumpSync() {
    this.profile.syncVersion += 1;
    this.profile.updatedAt = new Date().toISOString();
  }
}

// Global singleton instance
const globalForHunter = global as unknown as { hunterStore?: HunterStore };
export const hunterStore = globalForHunter.hunterStore || new HunterStore();
if (process.env.NODE_ENV !== "production") globalForHunter.hunterStore = hunterStore;
