import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

const FIDELITY_DIR = path.resolve("docs/fidelity");
if (!fs.existsSync(FIDELITY_DIR)) {
  fs.mkdirSync(FIDELITY_DIR, { recursive: true });
}

const PAGES = [
  { id: "DM-01", route: "/", name: "Landing (Home)" },
  { id: "DM-02", route: "/sign-in", name: "Sign In / Sign Up" },
  { id: "DERIVED-RECOVER", route: "/recover", name: "Account Recovery" },
  { id: "DM-03", route: "/onboarding", name: "Onboarding / Hunter Setup" },
  { id: "DM-04", route: "/dashboard", name: "Main Dashboard" },
  { id: "DM-05", route: "/quests", name: "Quest Management" },
  { id: "DM-06", route: "/quests/q-1", name: "Quest Details & Editor" },
  { id: "DM-07", route: "/habits", name: "Habits & Routine Tracker" },
  { id: "DM-08", route: "/routines", name: "Routine Builder" },
  { id: "DM-14", route: "/status", name: "Hunter Status & Attributes" },
  { id: "DM-16", route: "/achievements", name: "Achievements & Titles" },
  { id: "DM-23", route: "/notifications", name: "Notification Center" },
  { id: "DM-24", route: "/settings", name: "Settings & Preferences" },
  { id: "DM-25", route: "/account", name: "Account, Privacy & Data" },
  { id: "DERIVED-PROFILE", route: "/profile", name: "Hunter Profile" },
];

async function capture() {
  console.log("Launching Microsoft Edge for Phase 1 fidelity captures...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();

  for (const page of PAGES) {
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

  // Also capture Mobile 390x844 responsive views for Dashboard & Quests
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  const mobileRoutes = [
    { id: "MM-05-RESPONSIVE", route: "/dashboard" },
    { id: "MM-06-RESPONSIVE", route: "/quests" },
  ];
  for (const m of mobileRoutes) {
    const url = `http://localhost:3000${m.route}`;
    console.log(`[Mobile 390x844] Capturing ${m.id}: ${url}...`);
    try {
      await mobilePage.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await mobilePage.waitForTimeout(600);
      const outPath = path.join(FIDELITY_DIR, `build_${m.id}.png`);
      await mobilePage.screenshot({ path: outPath });
      console.log(`  -> Saved ${outPath}`);
    } catch (err) {
      console.error(`  -> Failed capturing ${m.id}:`, err.message);
    }
  }

  await browser.close();
  console.log("Phase 1 captures completed!");
}

capture().catch((err) => {
  console.error("Capture script failed:", err);
  process.exit(1);
});
