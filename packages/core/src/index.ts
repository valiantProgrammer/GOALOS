import { TaskDifficulty, HunterRank, HunterStats } from "@goalos/types";
import { DIFFICULTY_MULTIPLIERS, RANK_TIERS } from "@goalos/config";

/**
 * Calculates XP earned given a base XP and task difficulty.
 */
export function calculateXpEarned(baseXp: number, difficulty: TaskDifficulty): number {
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty] ?? 1.0;
  return Math.round(baseXp * multiplier);
}

/**
 * Calculates XP required to advance from level L to L+1.
 * Standard default formula: 100 + 50 * (L - 1)
 */
export function getXpForNextLevel(level: number): number {
  if (level < 1) level = 1;
  return 100 + 50 * (level - 1);
}

/**
 * Resolves Hunter Rank given the hunter's level.
 */
export function getRankForLevel(level: number): { rank: HunterRank; title: string; nextRank?: HunterRank } {
  const currentTier = RANK_TIERS.find((t) => level >= t.minLevel && level <= t.maxLevel) ?? RANK_TIERS[0];
  const nextTierIndex = RANK_TIERS.findIndex((t) => t.rank === currentTier.rank) + 1;
  const nextTier = nextTierIndex < RANK_TIERS.length ? RANK_TIERS[nextTierIndex] : undefined;

  return {
    rank: currentTier.rank,
    title: currentTier.title,
    nextRank: nextTier?.rank,
  };
}

export interface LevelProgressionResult {
  newLevel: number;
  newCurrentXp: number;
  newNextLevelXp: number;
  newLifetimeXp: number;
  levelsGained: number;
  statPointsGranted: number;
  skillPointsGranted: number;
  leveledUp: boolean;
}

/**
 * Pure progression engine that computes new level and rollover XP.
 */
export function applyXp(
  level: number,
  currentXp: number,
  lifetimeXp: number,
  xpToAdd: number,
  customThresholdFn: (lvl: number) => number = getXpForNextLevel
): LevelProgressionResult {
  let newLevel = level;
  let newCurrentXp = currentXp + xpToAdd;
  const newLifetimeXp = lifetimeXp + xpToAdd;
  let levelsGained = 0;

  while (true) {
    const requiredXp = customThresholdFn(newLevel);
    if (newCurrentXp >= requiredXp) {
      newCurrentXp -= requiredXp;
      newLevel += 1;
      levelsGained += 1;
    } else {
      break;
    }
  }

  return {
    newLevel,
    newCurrentXp,
    newNextLevelXp: customThresholdFn(newLevel),
    newLifetimeXp,
    levelsGained,
    statPointsGranted: levelsGained * 3,
    skillPointsGranted: levelsGained * 1,
    leveledUp: levelsGained > 0,
  };
}

/**
 * Evaluates consecutive streak days given a completion record.
 * Handles paused/grace days without breaking streak.
 */
export function calculateStreak(
  completions: Record<string, boolean>, // YYYY-MM-DD -> boolean
  todayDate: string,
  pausedDates: Set<string> = new Set()
): { currentStreak: number } {
  let streak = 0;
  const today = new Date(todayDate);

  // Check if today is completed or pending
  const todayKey = todayDate;
  let checkDate = new Date(today);

  // If today is completed, start streak count from today
  if (completions[todayKey]) {
    streak += 1;
    checkDate.setDate(checkDate.getDate() - 1);
  } else if (pausedDates.has(todayKey)) {
    // Paused day preserves streak
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    // Today not done yet, look starting from yesterday
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Count backwards
  while (true) {
    const dateStr = checkDate.toISOString().split("T")[0];
    if (completions[dateStr]) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (pausedDates.has(dateStr)) {
      // Paused date doesn't increment or break
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak: streak };
}

/**
 * Validates and applies attribute point spending.
 */
export function spendStatPoints(
  currentStats: HunterStats,
  unspentPoints: number,
  pointsToSpend: Partial<Record<keyof HunterStats, number>>
): { updatedStats: HunterStats; remainingPoints: number } {
  let totalRequested = 0;
  const newStats = { ...currentStats };

  for (const [key, value] of Object.entries(pointsToSpend)) {
    if (value && value > 0) {
      totalRequested += value;
      const statKey = key as keyof HunterStats;
      newStats[statKey] += value;
    }
  }

  if (totalRequested > unspentPoints) {
    throw new Error(`Insufficient stat points. Requested: ${totalRequested}, Available: ${unspentPoints}`);
  }

  return {
    updatedStats: newStats,
    remainingPoints: unspentPoints - totalRequested,
  };
}

export * from "./ai-planner";

