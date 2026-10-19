import { NextRequest, NextResponse } from "next/server";
import { DEMO_HUNTER } from "@goalos/config";

export async function POST(req: NextRequest) {
  // Mobile token authorization endpoint
  // In dev / demo mode: returns short-lived JWT + refresh token
  return NextResponse.json({
    accessToken: "mock-jwt-hunter-token-xyz",
    refreshToken: "mock-refresh-token-abc",
    user: {
      id: DEMO_HUNTER.userId,
      email: "rupayan@goalos.app",
      hunterName: DEMO_HUNTER.hunterName,
    },
  });
}
