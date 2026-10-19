import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

const FIDELITY_DIR = path.resolve("docs/fidelity");
if (!fs.existsSync(FIDELITY_DIR)) {
  fs.mkdirSync(FIDELITY_DIR, { recursive: true });
}

const DESKTOP_PAGES = [
  { id: "DM-09", route: "/focus", name: "Focus Workspace" },
  { id: "DM-10", route: "/goals", name: "Goals Dashboard" },
  { id: "DM-11", route: "/goals/g-1", name: "Goal Details & Milestones" },
  { id: "DM-12", route: "/calendar", name: "Calendar & Time Blocking" },
  { id: "DM-13", route: "/planner", name: "Planner & Schedule" },
  { id: "DM-18", route: "/shop", name: "Reward Shop (Base)" },
  { id: "DM-26", route: "/shop", name: "Reward Shop (Expanded)" },
  { id: "DM-19", route: "/analytics", name: "Analytics & Progress" },
  { id: "DM-20", route: "/review", name: "Weekly Review" },
  { id: "DM-22", route: "/search", name: "Search & Command Center" },
  { id: "DM-27", route: "/inventory", name: "Inventory & Collection" },
];

const MOBILE_PAGES = [
  { id: "MM-10", route: "/focus", name: "Focus Timer" },
  { id: "MM-11", route: "/goals", name: "Goals Dashboard" },
  { id: "MM-12", route: "/goals/g-1", name: "Goal Details" },
  { id: "MM-13", route: "/calendar", name: "Calendar & Planner" },
  { id: "MM-19", route: "/shop", name: "Shop & Inventory" },
  { id: "MM-22", route: "/analytics", name: "Analytics & Progress" },
  { id: "MM-23", route: "/review", name: "Weekly Review" },
  { id: "MM-26", route: "/search", name: "Search Command Center" },
];

async function capturePhase4() {
  console.log("Launching Microsoft Edge for Phase 4 fidelity captures...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Desktop 1440x900
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();

  for (const page of DESKTOP_PAGES) {
    const url = `http://localhost:3000${page.route}`;
    console.log(`[Desktop 1440x900] Capturing ${page.id}: ${url}...`);
    try {
      await desktopPage.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await desktopPage.waitForTimeout(600);
      const outPath = path.join(FIDELITY_DIR, `build_${page.id}.png`);
      await desktopPage.screenshot({ path: outPath });
      console.log(`  -> Saved ${outPath}`);
    } catch (err) {
      console.error(`  -> Failed capturing ${page.id}:`, err.message);
    }
  }

  // 2. Mobile 390x844
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  for (const page of MOBILE_PAGES) {
    const url = `http://localhost:3000${page.route}`;
    console.log(`[Mobile 390x844] Capturing ${page.id}: ${url}...`);
    try {
      await mobilePage.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await mobilePage.waitForTimeout(600);
      const outPath = path.join(FIDELITY_DIR, `build_${page.id}.png`);
      await mobilePage.screenshot({ path: outPath });
      console.log(`  -> Saved ${outPath}`);
    } catch (err) {
      console.error(`  -> Failed capturing ${page.id}:`, err.message);
    }
  }

  await browser.close();
  console.log("Phase 4 captures completed!");
}

capturePhase4().catch((err) => {
  console.error("Phase 4 capture failed:", err);
  process.exit(1);
});
