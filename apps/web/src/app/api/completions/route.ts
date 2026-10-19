import { NextRequest, NextResponse } from "next/server";
import { hunterStore } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sourceId, localDate, idempotencyKey } = body;

    if (!sourceId || !idempotencyKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const effectiveDate = localDate || new Date().toISOString().split("T")[0];
    const result = hunterStore.toggleQuestCompletion(sourceId, effectiveDate, idempotencyKey);

    return NextResponse.json({
      success: true,
      quest: result.quest,
      profile: result.profile,
      syncVersion: result.profile.syncVersion,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Completion failed" }, { status: 500 });
  }
}
