import { z } from "zod";

// --- Hunter Class & Ranks ---
export const HunterClassSchema = z.enum(["shadow", "mage", "fighter", "rogue"]);
export type HunterClass = z.infer<typeof HunterClassSchema>;

export const HunterRankSchema = z.enum(["E", "D", "C", "B", "A", "S", "National"]);
export type HunterRank = z.infer<typeof HunterRankSchema>;

// --- Attributes (STR, AGI, INT, VIT, LUK) ---
export const HunterStatsSchema = z.object({
  strength: z.number().int().min(1).default(10),
  agility: z.number().int().min(1).default(10),
  intelligence: z.number().int().min(1).default(10),
  vitality: z.number().int().min(1).default(10),
  luck: z.number().int().min(1).default(10),
});
export type HunterStats = z.infer<typeof HunterStatsSchema>;

// --- Hunter Profile ---
export const HunterProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  hunterName: z.string().min(2).max(32),
  avatar: z.string().default("/avatars/default.png"),
  class: HunterClassSchema.default("shadow"),
  motto: z.string().max(120).default("Discipline creates freedom."),
  level: z.number().int().min(1).default(1),
  currentXp: z.number().int().min(0).default(0),
  nextLevelXp: z.number().int().min(1).default(100),
  lifetimeXp: z.number().int().min(0).default(0),
  coins: z.number().int().min(0).default(0),
  rank: HunterRankSchema.default("E"),
  stats: HunterStatsSchema.default({
    strength: 10,
    agility: 10,
    intelligence: 10,
    vitality: 10,
    luck: 10,
  }),
  unspentPoints: z.number().int().min(0).default(0),
  skillPoints: z.number().int().min(0).default(0),
  equippedTitle: z.string().default("Awakened Hunter"),
  currentStreak: z.number().int().min(0).default(0),
  bestStreak: z.number().int().min(0).default(0),
  syncVersion: z.number().int().min(1).default(1),
  updatedAt: z.string(),
});
export type HunterProfile = z.infer<typeof HunterProfileSchema>;

// --- Difficulty & Status ---
export const TaskDifficultySchema = z.enum(["easy", "medium", "hard", "hardcore"]);
export type TaskDifficulty = z.infer<typeof TaskDifficultySchema>;

export const TaskStatusSchema = z.enum(["in_progress", "completed", "start", "locked"]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

// --- Quest Schema ---
export const QuestCategorySchema = z.enum(["study", "health", "work", "personal", "finance", "special"]);
export type QuestCategory = z.infer<typeof QuestCategorySchema>;

export const QuestTypeSchema = z.enum(["daily", "weekly", "story", "special"]);
export type QuestType = z.infer<typeof QuestTypeSchema>;

export const QuestSubtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean().default(false),
});
export type QuestSubtask = z.infer<typeof QuestSubtaskSchema>;

export const QuestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1).max(120),
  description: z.string().default(""),
  category: QuestCategorySchema.default("personal"),
  type: QuestTypeSchema.default("daily"),
  difficulty: TaskDifficultySchema.default("medium"),
  baseXp: z.number().int().min(1).default(50),
  coins: z.number().int().min(0).default(10),
  deadline: z.string().optional(),
  repeat: z.enum(["daily", "weekly", "none"]).default("daily"),
  status: TaskStatusSchema.default("start"),
  checklist: z.array(QuestSubtaskSchema).default([]),
  notes: z.string().default(""),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Quest = z.infer<typeof QuestSchema>;

// --- Habit Schema ---
export const HabitSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1).max(100),
  category: QuestCategorySchema.default("health"),
  frequency: z.enum(["daily", "weekly", "custom"]).default("daily"),
  targetDaysPerWeek: z.number().int().min(1).max(7).default(7),
  currentStreak: z.number().int().min(0).default(0),
  bestStreak: z.number().int().min(0).default(0),
  completions: z.record(z.string(), z.boolean()).default({}), // YYYY-MM-DD -> boolean
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Habit = z.infer<typeof HabitSchema>;

// --- Completion Log & Idempotency ---
export const CompletionIntentSchema = z.object({
  sourceType: z.enum(["quest", "habit", "routine", "challenge"]),
  sourceId: z.string(),
  localDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD in user tz
  idempotencyKey: z.string().uuid(),
});
export type CompletionIntent = z.infer<typeof CompletionIntentSchema>;

// --- Sync Schema ---
export const SyncRequestSchema = z.object({
  sinceVersion: z.number().int().min(0).default(0),
});
export type SyncRequest = z.infer<typeof SyncRequestSchema>;

export const SyncResponseSchema = z.object({
  profile: HunterProfileSchema,
  quests: z.array(QuestSchema),
  habits: z.array(HabitSchema),
  notifications: z.array(z.any()),
  serverTime: z.string(),
  syncVersion: z.number().int(),
});
export type SyncResponse = z.infer<typeof SyncResponseSchema>;

// --- Skill Tree Schemas ---
export const SkillCategorySchema = z.enum(["offense", "defense", "utility", "special"]);
export type SkillCategory = z.infer<typeof SkillCategorySchema>;

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: SkillCategorySchema,
  description: z.string(),
  level: z.number().int().min(0).default(0),
  maxLevel: z.number().int().min(1).default(5),
  effects: z.array(z.string()),
  requirements: z.object({
    minLevel: z.number().int().default(1),
    skillPoints: z.number().int().default(1),
    prerequisiteId: z.string().optional(),
  }),
  unlocked: z.boolean().default(false),
  icon: z.string().default("sparkles"),
});
export type Skill = z.infer<typeof SkillSchema>;

// --- Dungeon & Boss Schemas ---
export const DungeonChapterSchema = z.object({
  id: z.string(),
  chapterNumber: z.number().int().min(1),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  bossName: z.string(),
  status: z.enum(["active", "completed", "locked"]).default("locked"),
  progress: z.number().int().min(0).default(0),
  total: z.number().int().min(1).default(4),
  rewards: z.object({
    xp: z.number().int(),
    avatar: z.string().optional(),
    title: z.string().optional(),
    coins: z.number().int(),
  }),
});
export type DungeonChapter = z.infer<typeof DungeonChapterSchema>;

// --- AI Assistant Schemas ---
export const AiRoleSchema = z.enum(["system", "user", "assistant"]);
export type AiRole = z.infer<typeof AiRoleSchema>;

export const AiMessageSchema = z.object({
  id: z.string(),
  role: AiRoleSchema,
  content: z.string(),
  timestamp: z.string(),
  actionSuggestions: z.array(z.string()).optional(),
});
export type AiMessage = z.infer<typeof AiMessageSchema>;

