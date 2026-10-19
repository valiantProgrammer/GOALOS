import { NextRequest, NextResponse } from "next/server";
import { hunterStore } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sinceVersion = parseInt(searchParams.get("since") || "0", 10);
  const profile = hunterStore.getProfile();

  return NextResponse.json({
    profile,
    quests: hunterStore.getQuests(),
    habits: hunterStore.getHabits(),
    routines: hunterStore.getRoutines(),
    notifications: hunterStore.getNotifications(),
    achievements: hunterStore.getAchievements(),
    syncVersion: profile.syncVersion,
    hasUpdates: profile.syncVersion > sinceVersion,
    serverTime: new Date().toISOString(),
  });
}
