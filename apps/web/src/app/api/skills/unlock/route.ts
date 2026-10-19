import { NextResponse } from "next/server";
import { DEMO_HUNTER, SKILLS_DATA } from "@goalos/config";

// In-memory state for skill allocations during session
let hunterSkillPoints = DEMO_HUNTER.skillPoints;
const unlockedSkillsState: Record<string, number> = {
  "time-control": 1,
  "mental-fortitude": 1,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const skillId = body?.skillId;

    const skillDef = SKILLS_DATA.find((s) => s.id === skillId);
    if (!skillDef) {
      return NextResponse.json(
        { success: false, error: `Skill ${skillId} not found.` },
        { status: 404 }
      );
    }

    const currentLevel = unlockedSkillsState[skillId] ?? 0;
    if (currentLevel >= skillDef.maxLevel) {
      return NextResponse.json(
        { success: false, error: `Skill is already at maximum level (${skillDef.maxLevel}).` },
        { status: 400 }
      );
    }

    const cost = skillDef.requirements.skillPoints;
    if (hunterSkillPoints < cost) {
      return NextResponse.json(
        { success: false, error: `Insufficient Skill Points. Needed: ${cost}, Available: ${hunterSkillPoints}` },
        { status: 400 }
      );
    }

    hunterSkillPoints -= cost;
    unlockedSkillsState[skillId] = currentLevel + 1;

    return NextResponse.json({
      success: true,
      skillId,
      newLevel: unlockedSkillsState[skillId],
      remainingSkillPoints: hunterSkillPoints,
      message: `Skill ${skillDef.name} upgraded to Level ${unlockedSkillsState[skillId]}!`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Error unlocking skill" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    skillPoints: hunterSkillPoints,
    unlockedSkills: unlockedSkillsState,
  });
}
