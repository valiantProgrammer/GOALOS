import { NextRequest, NextResponse } from "next/server";
import { hunterStore } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { allocations } = body;

    const result = hunterStore.spendStats(allocations);
    return NextResponse.json({ success: true, profile: result.profile });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to spend stats" }, { status: 400 });
  }
}
