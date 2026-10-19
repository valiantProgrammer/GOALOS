import { NextResponse } from "next/server";
import { generateHunterAiResponse } from "@goalos/core";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt || "Plan my day";
    const hunterLevel = body?.hunterLevel ?? 32;
    const currentStreak = body?.currentStreak ?? 12;

    const response = await generateHunterAiResponse({
      prompt,
      hunterLevel,
      currentStreak,
    });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal AI Server Error" },
      { status: 500 }
    );
  }
}
