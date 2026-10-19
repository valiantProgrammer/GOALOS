import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";

const FIDELITY_DIR = path.resolve("docs/fidelity");
if (!fs.existsSync(FIDELITY_DIR)) {
  fs.mkdirSync(FIDELITY_DIR, { recursive: true });
}

const MOBILE_PAGES = [
  { id: "MM-01", route: "/", name: "Splash / Landing" },
  { id: "MM-02", route: "/onboarding", name: "Onboarding Intro" },
  { id: "MM-03", route: "/sign-in", name: "Login / Sign Up" },
  { id: "MM-04", route: "/onboarding", name: "Hunter Awakening Setup" },
  { id: "MM-05", route: "/dashboard", name: "Dashboard (Home)" },
  { id: "MM-06", route: "/quests", name: "Quest Log" },
  { id: "MM-07", route: "/quests/q-1", name: "Quest Details" },
  { id: "MM-08", route: "/habits", name: "Habits Tracker" },
  { id: "MM-09", route: "/routines", name: "Routine Builder" },
  { id: "MM-14", route: "/quests", name: "Create Task" },
  { id: "MM-15", route: "/status", name: "Hunter Status" },
  { id: "MM-17", route: "/achievements", name: "Achievements & Titles" },
  { id: "MM-21", route: "/notifications", name: "Notification Center" },
  { id: "MM-24", route: "/profile", name: "Hunter Profile" },
  { id: "MM-27", route: "/settings", name: "Settings" },
  { id: "MM-28", route: "/account", name: "Account & Privacy" },
];

async function captureMobile() {
  console.log("Launching Microsoft Edge for Mobile 390x844 & Tablet 768x1024 captures...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Phone Viewport: 390x844
  const phoneContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
  });
  const phonePage = await phoneContext.newPage();

  for (const page of MOBILE_PAGES) {
    const url = `http://localhost:3000${page.route}`;
    console.log(`[Phone 390x844] Capturing ${page.id}: ${url}...`);
    try {
      await phonePage.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await phonePage.waitForTimeout(500);
      const outPath = path.join(FIDELITY_DIR, `mobile_build_${page.id}.png`);
      await phonePage.screenshot({ path: outPath });
      console.log(`  -> Saved ${outPath}`);
    } catch (err) {
      console.error(`  -> Failed capturing ${page.id}:`, err.message);
    }
  }

  // 2. Tablet Viewport: 768x1024 Two-Pane
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 1,
  });
  const tabletPage = await tabletContext.newPage();
  console.log("[Tablet 768x1024] Capturing Tablet 2-pane Dashboard...");
  await tabletPage.goto("http://localhost:3000/dashboard", { waitUntil: "domcontentloaded" });
  await tabletPage.waitForTimeout(500);
  const tabletOut = path.join(FIDELITY_DIR, "tablet_build_dashboard.png");
  await tabletPage.screenshot({ path: tabletOut });
  console.log(`  -> Saved ${tabletOut}`);

  await browser.close();
  console.log("Mobile fidelity captures complete!");
}

captureMobile().catch((err) => {
  console.error("Mobile capture failed:", err);
  process.exit(1);
});
