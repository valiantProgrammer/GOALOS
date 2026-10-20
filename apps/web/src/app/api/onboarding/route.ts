import { NextResponse } from "next/server";
import { hunterStore } from "@/lib/store";

export async function PATCH(req: Request) {
  try {
    const data = await req.json();

    // If hunterName or avatar or class updated, sync into hunterStore
    if (data.hunterName) {
      hunterStore.updateProfile({
        hunterName: data.hunterName,
        motto: data.bio || undefined,
        class: data.hunterClass || undefined,
        avatar: data.avatarUrl || undefined,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Onboarding progress saved",
      data,
    });
  } catch (error) {
    console.error("Onboarding patch error:", error);
    return NextResponse.json(
      { message: "Failed to save onboarding data" },
      { status: 500 }
    );
  }
}
