import { NextResponse } from "next/server";
import { hunterStore } from "@/lib/store";

export async function POST() {
  hunterStore.markAllNotificationsRead();
  return NextResponse.json({ success: true });
}
