import { NextResponse } from "next/server";
import { DUNGEONS_DATA } from "@goalos/config";

// In-memory chapter progress state
const chaptersProgress: Record<string, { progress: number; status: "active" | "completed" | "locked" }> = {
  "chapter-1": { progress: 3, status: "active" },
  "chapter-2": { progress: 0, status: "locked" },
  "chapter-3": { progress: 0, status: "locked" },
  "chapter-4": { progress: 0, status: "locked" },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const chapterId = body?.chapterId || "chapter-1";

    const chapterDef = DUNGEONS_DATA.find((c) => c.id === chapterId);
    if (!chapterDef) {
      return NextResponse.json(
        { success: false, error: `Chapter ${chapterId} not found.` },
        { status: 404 }
      );
    }

    const current = chaptersProgress[chapterId] ?? { progress: 0, status: "locked" };
    if (current.status === "locked") {
      return NextResponse.json(
        { success: false, error: "Chapter is currently locked. Complete prior trials to unlock." },
        { status: 403 }
      );
    }

    if (current.progress < chapterDef.total) {
      current.progress += 1;
    }

    let rewardsAwarded = null;
    if (current.progress >= chapterDef.total) {
      current.status = "completed";
      rewardsAwarded = chapterDef.rewards;
      // Unlock Chapter 2 if Chapter 1 is completed
      if (chapterId === "chapter-1") {
        chaptersProgress["chapter-2"] = { progress: 0, status: "active" };
      }
    }

    return NextResponse.json({
      success: true,
      chapterId,
      progress: current.progress,
      total: chapterDef.total,
      status: current.status,
      rewardsAwarded,
      message:
        current.status === "completed"
          ? `VICTORY! ${chapterDef.bossName} has been defeated!`
          : `Combat encounter cleared! Progress: ${current.progress}/${chapterDef.total}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Error processing dungeon encounter" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    chapters: chaptersProgress,
  });
}
