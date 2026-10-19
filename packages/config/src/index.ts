import { HunterRank, TaskDifficulty } from "@goalos/types";

// Difficulty XP Multipliers
export const DIFFICULTY_MULTIPLIERS: Record<TaskDifficulty, number> = {
  easy: 0.5,
  medium: 1.0,
  hard: 1.5,
  hardcore: 2.0,
};

// Rank Progression Configuration
export interface RankConfig {
  rank: HunterRank;
  minLevel: number;
  maxLevel: number;
  requiredLifetimeXp: number;
  title: string;
}

export const RANK_TIERS: RankConfig[] = [
  { rank: "E", minLevel: 1, maxLevel: 19, requiredLifetimeXp: 0, title: "Novice Hunter" },
  { rank: "D", minLevel: 20, maxLevel: 39, requiredLifetimeXp: 25000, title: "Awakened Hunter" },
  { rank: "C", minLevel: 40, maxLevel: 59, requiredLifetimeXp: 75000, title: "Shadow Striker" },
  { rank: "B", minLevel: 60, maxLevel: 79, requiredLifetimeXp: 150000, title: "Elite Vanguard" },
  { rank: "A", minLevel: 80, maxLevel: 99, requiredLifetimeXp: 300000, title: "Guild Master" },
  { rank: "S", minLevel: 100, maxLevel: 119, requiredLifetimeXp: 600000, title: "Monarch" },
  { rank: "National", minLevel: 120, maxLevel: 999, requiredLifetimeXp: 1000000, title: "Legend of Humanity" },
];

// Level 32 Demo Hunter Mockup Parameters
export const DEMO_HUNTER = {
  id: "demo-hunter-32",
  userId: "demo-user-1",
  hunterName: "Rupayan",
  avatar: "/avatars/shadow-hunter.png",
  class: "shadow" as const,
  motto: "Discipline creates freedom.",
  level: 32,
  currentXp: 2430,
  nextLevelXp: 5000, // Reconciled for mockup exact rendering
  lifetimeXp: 38450,
  coins: 2450,
  rank: "D" as const,
  nextRank: "C" as const,
  nextRankRemainingXp: 2570,
  stats: {
    strength: 28,
    agility: 24,
    intelligence: 20,
    vitality: 26,
    luck: 22,
  },
  unspentPoints: 5,
  skillPoints: 3,
  equippedTitle: "Discipline Seeker",
  currentStreak: 12,
  bestStreak: 28,
  focusMinutesToday: 120,
  syncVersion: 42,
};

// --- Canonical Skill Tree Definitions ---
export const SKILLS_DATA = [
  {
    id: "focus-mastery",
    name: "Focus Mastery",
    category: "offense" as const,
    description: "Increase focus duration by 25%",
    level: 0,
    maxLevel: 5,
    effects: ["+25% focus timer duration", "+10% XP from focus sessions"],
    requirements: { minLevel: 10, skillPoints: 2 },
    unlocked: false,
    icon: "target",
    gridPosition: { x: 50, y: 55 },
    color: "#a855f7", // purple center
  },
  {
    id: "time-control",
    name: "Time Control",
    category: "offense" as const,
    description: "Reduces break time by 20%",
    level: 1,
    maxLevel: 5,
    effects: ["Reduces break time by 20%", "+5% streak recovery"],
    requirements: { minLevel: 12, skillPoints: 2 },
    unlocked: true,
    icon: "clock",
    gridPosition: { x: 50, y: 18 },
    color: "#3b82f6", // blue top
  },
  {
    id: "mental-fortitude",
    name: "Mental Fortitude",
    category: "offense" as const,
    description: "Increase max focus by 1",
    level: 1,
    maxLevel: 5,
    effects: ["Increase max focus by 1", "+15% willpower resistance"],
    requirements: { minLevel: 15, skillPoints: 3 },
    unlocked: true,
    icon: "shield",
    gridPosition: { x: 78, y: 38 },
    color: "#3b82f6", // blue right
  },
  {
    id: "shadow-surge",
    name: "Shadow Surge",
    category: "offense" as const,
    description: "Burst of productivity upon quest start",
    level: 0,
    maxLevel: 5,
    effects: ["+20% speed for 25 mins", "+15 XP on quick finish"],
    requirements: { minLevel: 8, skillPoints: 1 },
    unlocked: false,
    icon: "zap",
    gridPosition: { x: 22, y: 38 },
    color: "#10b981", // green left
  },
  {
    id: "discipline-core",
    name: "Discipline Core",
    category: "offense" as const,
    description: "Permanent streak protection buffer",
    level: 0,
    maxLevel: 5,
    effects: ["+1 monthly grace day", "50% penalty mitigation"],
    requirements: { minLevel: 18, skillPoints: 2 },
    unlocked: false,
    icon: "flame",
    gridPosition: { x: 20, y: 72 },
    color: "#10b981", // green bottom-left
  },
  {
    id: "iron-will",
    name: "Iron Will",
    category: "offense" as const,
    description: "Unshakable habit retention",
    level: 0,
    maxLevel: 5,
    effects: ["+10% habit consistency XP", "Auto-streak recovery"],
    requirements: { minLevel: 22, skillPoints: 3 },
    unlocked: false,
    icon: "droplet",
    gridPosition: { x: 80, y: 72 },
    color: "#06b6d4", // cyan bottom-right
  },
  {
    id: "monarch-awakening",
    name: "Monarch's Awakening",
    category: "offense" as const,
    description: "Ultimate state of effortless flow",
    level: 0,
    maxLevel: 5,
    effects: ["Double XP on complete daily checklist", "Aura of Dominance unlock"],
    requirements: { minLevel: 30, skillPoints: 5 },
    unlocked: false,
    icon: "crown",
    gridPosition: { x: 50, y: 90 },
    color: "#3b82f6", // blue bottom
  },
];

// --- Canonical Dungeons & Challenges ---
export const DUNGEONS_DATA = [
  {
    id: "chapter-1",
    chapterNumber: 1,
    title: "Chapter 1",
    subtitle: "The Awakening",
    description: "A new journey begins. Complete daily quests to unlock the next chapter.",
    bossName: "Shadow Gate Guardian",
    status: "active" as const,
    progress: 3,
    total: 4,
    rewards: {
      xp: 500,
      avatar: "Shadow Aura (Avatar)",
      title: "The Awakening",
      coins: 100,
    },
    image: "/art/dungeon-portal.png",
  },
  {
    id: "chapter-2",
    chapterNumber: 2,
    title: "Chapter 2",
    subtitle: "Discipline",
    description: "Build your habits and forge unbreakable consistency.",
    bossName: "Sloth Behemoth",
    status: "locked" as const,
    progress: 0,
    total: 5,
    rewards: {
      xp: 800,
      avatar: "Discipline Crest",
      title: "Habit Forger",
      coins: 200,
    },
    image: "/art/dungeon-discipline.png",
  },
  {
    id: "chapter-3",
    chapterNumber: 3,
    title: "Chapter 3",
    subtitle: "The First Dungeon",
    description: "Face your first true trial inside the frozen abyss.",
    bossName: "Frost Cerberus",
    status: "locked" as const,
    progress: 0,
    total: 6,
    rewards: {
      xp: 1200,
      avatar: "Frost Vanguard",
      title: "Dungeon Conqueror",
      coins: 350,
    },
    image: "/art/dungeon-frost.png",
  },
  {
    id: "chapter-4",
    chapterNumber: 4,
    title: "Chapter 4",
    subtitle: "Inner Shadows",
    description: "Overcome your limits and confront the reflection of your ego.",
    bossName: "Shadow Monarch Reflection",
    status: "locked" as const,
    progress: 0,
    total: 8,
    rewards: {
      xp: 2000,
      avatar: "Monarch Cloak",
      title: "True Sovereign",
      coins: 600,
    },
    image: "/art/dungeon-monarch.png",
  },
];

