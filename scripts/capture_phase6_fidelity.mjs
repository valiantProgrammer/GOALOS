import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

const FIDELITY_DIR = path.resolve("docs/fidelity");
if (!fs.existsSync(FIDELITY_DIR)) {
  fs.mkdirSync(FIDELITY_DIR, { recursive: true });
}

const DESKTOP_PAGES = [
  { id: "DM-21", route: "/community", name: "Community & Party Quests" },
  { id: "DM-28", route: "/admin", name: "Admin Dashboard" },
  { id: "DM-29", route: "/admin/users", name: "User & Content Management" },
  { id: "DM-30", route: "/admin/system", name: "System Monitoring & Data Management" },
];

const MOBILE_PAGES = [
  { id: "MM-25", route: "/community", name: "Friends & Party Quests" },
];

async function capturePhase6() {
  console.log("Launching Microsoft Edge for Phase 6 fidelity captures...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Desktop 1440x900
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();

  for (const page of DESKTOP_PAGES) {
    const url = `http://localhost:3000${page.route}?asOf=2026-10-14`;
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
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  for (const page of MOBILE_PAGES) {
    const url = `http://localhost:3000${page.route}?asOf=2026-10-14`;
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
  console.log("Phase 6 screenshots capture completed!");
}

capturePhase6().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
