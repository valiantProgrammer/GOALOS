import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      onboardingComplete: true,
      message: "Hunter awakening complete. Welcome to GOALOS.",
    });
  } catch (error) {
    console.error("Onboarding complete error:", error);
    return NextResponse.json(
      { message: "Failed to finalize onboarding" },
      { status: 500 }
    );
  }
}
