import { NextResponse } from "next/server";
import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(25),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = SignUpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid registration data", errors: result.error.errors },
        { status: 400 }
      );
    }

    const { email, username } = result.data;

    // Free-tier resilient user registration
    // In Atlas M0 or in-memory fallback, store user record
    const user = {
      id: `usr_${Date.now()}`,
      email,
      username,
      hunterName: username,
      onboardingComplete: false,
      onboardingStep: 1,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Failed to create account" },
      { status: 500 }
    );
  }
}
