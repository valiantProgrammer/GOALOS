import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const routes = [
  { name: "home-dashboard", path: "/dashboard" },
  { name: "quests", path: "/quests" },
  { name: "quest-detail", path: "/quests/q-1" },
  { name: "habits", path: "/habits" },
  { name: "routines", path: "/routines" },
  { name: "focus", path: "/focus" },
  { name: "goals", path: "/goals" },
  { name: "goal-detail", path: "/goals/g-1" },
  { name: "calendar", path: "/calendar" },
  { name: "planner", path: "/planner" },
  { name: "hunter-status", path: "/status" },
  { name: "skill-tree", path: "/skills" },
  { name: "achievements", path: "/achievements" },
  { name: "dungeons", path: "/dungeons" },
  { name: "shop", path: "/shop" },
  { name: "analytics", path: "/analytics" },
  { name: "weekly-review", path: "/review" },
  { name: "sign-in", path: "/signin" },
  { name: "sign-up", path: "/sign-up" },
  { name: "onboarding", path: "/onboarding" },
];

const viewports = [
  { name: "1920x934", width: 1920, height: 934 },
  { name: "1366x768", width: 1366, height: 768 },
];

const outDir = path.resolve("C:/Users/user/.gemini/antigravity-ide/brain/bf596578-4d8d-4c4d-9d32-5a6d03e58ffc/verification-screenshots");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ channel: "msedge" });

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    console.log(`\nTesting viewport ${vp.name}...`);
    for (const r of routes) {
      try {
        const url = `http://localhost:3000${r.path}`;
        await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
        // small wait for images & transitions
        await page.waitForTimeout(600);

        const filePath = path.join(outDir, `${r.name}-${vp.name}.png`);
        await page.screenshot({ path: filePath, fullPage: false });
        console.log(`Saved: ${r.name}-${vp.name}.png`);
      } catch (err) {
        console.error(`Error on ${r.name} (${vp.name}):`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();
  console.log("\nFinished generating screenshots!");
}

run();
