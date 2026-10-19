import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

const FIDELITY_DIR = path.resolve("docs/fidelity");
if (!fs.existsSync(FIDELITY_DIR)) {
  fs.mkdirSync(FIDELITY_DIR, { recursive: true });
}

const DESKTOP_PAGES = [
  { id: "DM-15", route: "/skills", name: "Skill Tree" },
  { id: "DM-17", route: "/dungeons", name: "Dungeons & Challenges" },
  { id: "derived_assistant", route: "/assistant", name: "AI System Assistant" },
];

const MOBILE_PAGES = [
  { id: "MM-16", route: "/skills", name: "Skill Tree" },
  { id: "MM-18", route: "/dungeons", name: "Story Mode" },
  { id: "MM-20", route: "/assistant", name: "AI Assistant" },
];

async function capturePhase5() {
  console.log("Launching Microsoft Edge for Phase 5 fidelity captures...");
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
  console.log("Phase 5 screenshots capture completed!");
}

capturePhase5().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
