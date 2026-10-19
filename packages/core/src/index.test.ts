import { describe, it, expect } from "vitest";
import {
  calculateXpEarned,
  getXpForNextLevel,
  getRankForLevel,
  applyXp,
  calculateStreak,
  spendStatPoints,
} from "./index";

describe("GoalOS Core Game Rules", () => {
  describe("XP Multipliers", () => {
    it("should correctly compute XP across all difficulty tiers", () => {
      expect(calculateXpEarned(100, "easy")).toBe(50);
      expect(calculateXpEarned(100, "medium")).toBe(100);
      expect(calculateXpEarned(100, "hard")).toBe(150);
      expect(calculateXpEarned(100, "hardcore")).toBe(200);
    });
  });

  describe("Level Curve", () => {
    it("should compute correct XP threshold per level", () => {
      expect(getXpForNextLevel(1)).toBe(100);
      expect(getXpForNextLevel(2)).toBe(150);
      expect(getXpForNextLevel(10)).toBe(550);
    });
  });

  describe("Rank Progression", () => {
    it("should resolve rank tiers accurately", () => {
      expect(getRankForLevel(1).rank).toBe("E");
      expect(getRankForLevel(19).rank).toBe("E");
      expect(getRankForLevel(20).rank).toBe("D");
      expect(getRankForLevel(32).rank).toBe("D");
      expect(getRankForLevel(32).nextRank).toBe("C");
      expect(getRankForLevel(40).rank).toBe("C");
      expect(getRankForLevel(100).rank).toBe("S");
      expect(getRankForLevel(120).rank).toBe("National");
    });
  });

  describe("Level Up and Progression", () => {
    it("should handle partial progress without leveling up", () => {
      const res = applyXp(1, 0, 0, 50);
      expect(res.newLevel).toBe(1);
      expect(res.newCurrentXp).toBe(50);
      expect(res.leveledUp).toBe(false);
      expect(res.levelsGained).toBe(0);
    });

    it("should level up when XP crosses threshold and award points", () => {
      const res = applyXp(1, 0, 0, 100);
      expect(res.newLevel).toBe(2);
      expect(res.newCurrentXp).toBe(0);
      expect(res.leveledUp).toBe(true);
      expect(res.levelsGained).toBe(1);
      expect(res.statPointsGranted).toBe(3);
      expect(res.skillPointsGranted).toBe(1);
    });

    it("should handle multi-level jumps properly", () => {
      // Level 1: 100 XP, Level 2: 150 XP. Total needed = 250 XP to reach Level 3
      const res = applyXp(1, 0, 0, 300);
      expect(res.newLevel).toBe(3);
      expect(res.newCurrentXp).toBe(50);
      expect(res.levelsGained).toBe(2);
      expect(res.statPointsGranted).toBe(6);
      expect(res.skillPointsGranted).toBe(2);
    });
  });

  describe("Streak Calculation", () => {
    it("should calculate streak correctly including today", () => {
      const history = {
        "2026-10-14": true,
        "2026-10-13": true,
        "2026-10-12": true,
      };
      const result = calculateStreak(history, "2026-10-14");
      expect(result.currentStreak).toBe(3);
    });

    it("should maintain streak from yesterday if today is not yet done", () => {
      const history = {
        "2026-10-13": true,
        "2026-10-12": true,
      };
      const result = calculateStreak(history, "2026-10-14");
      expect(result.currentStreak).toBe(2);
    });

    it("should respect paused days without breaking streak", () => {
      const history = {
        "2026-10-14": true,
        "2026-10-12": true,
      };
      const paused = new Set(["2026-10-13"]);
      const result = calculateStreak(history, "2026-10-14", paused);
      expect(result.currentStreak).toBe(2);
    });
  });

  describe("Attribute Spending", () => {
    it("should correctly update stats when spending unspent points", () => {
      const stats = { strength: 10, agility: 10, intelligence: 10, vitality: 10, luck: 10 };
      const { updatedStats, remainingPoints } = spendStatPoints(stats, 5, {
        strength: 2,
        vitality: 3,
      });

      expect(updatedStats.strength).toBe(12);
      expect(updatedStats.vitality).toBe(13);
      expect(remainingPoints).toBe(0);
    });

    it("should throw error if attempting to spend more points than available", () => {
      const stats = { strength: 10, agility: 10, intelligence: 10, vitality: 10, luck: 10 };
      expect(() => spendStatPoints(stats, 2, { strength: 3 })).toThrow();
    });
  });
});
