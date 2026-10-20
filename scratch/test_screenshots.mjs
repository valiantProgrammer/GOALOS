import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = "scratch/screenshots";
fs.mkdirSync(OUT_DIR, { recursive: true });

const pages = [
  { name: "step1-welcome", url: "http://localhost:3000/onboarding/welcome" },
  { name: "step2-profile", url: "http://localhost:3000/onboarding/profile" },
  { name: "step3-goals", url: "http://localhost:3000/onboarding/goals" },
  { name: "step4-schedule", url: "http://localhost:3000/onboarding/schedule" },
  { name: "step5-preferences", url: "http://localhost:3000/onboarding/preferences" },
  { name: "step6-complete", url: "http://localhost:3000/onboarding/complete" },
  { name: "signup", url: "http://localhost:3000/sign-up" },
];

const viewports = [
  { label: "1920x1080", width: 1920, height: 1080 },
  { label: "1366x768", width: 1366, height: 768 },
  { label: "mobile-390", width: 390, height: 844 },
];

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });
    
    for (const p of pages) {
      try {
        await page.goto(p.url, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(500);
        const filename = `${p.name}-${vp.label}.png`;
        const filepath = path.join(OUT_DIR, filename);
        await page.screenshot({ path: filepath, fullPage: false });
        console.log(`Captured ${filename}`);
      } catch (err) {
        console.error(`Error on ${p.name} @ ${vp.label}:`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();
  console.log("All screenshots captured!");
}

main();
