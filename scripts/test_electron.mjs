import { _electron as electron } from "playwright";
import * as path from "path";
import * as fs from "fs";

async function testElectron() {
  console.log("Starting Electron smoke test with Playwright...");
  const appPath = path.resolve("apps/desktop");
  
  const electronApp = await electron.launch({
    args: [appPath],
    env: {
      ...process.env,
      NODE_ENV: "development",
      GOALOS_WEB_URL: "http://localhost:3000",
    },
  });

  const appPathResolved = await electronApp.evaluate(async ({ app }) => {
    return app.getAppPath();
  });
  console.log(`Electron launched successfully! App path: ${appPathResolved}`);

  // Get first window
  const window = await electronApp.firstWindow();
  console.log("Found main Electron window. Waiting for load...");
  await window.waitForLoadState("domcontentloaded");
  await window.waitForTimeout(1500);

  const title = await window.title();
  console.log(`Window title: "${title}"`);

  const url = window.url();
  console.log(`Window URL: ${url}`);

  // Capture screenshot of packaged/running Electron window
  const shotPath = path.resolve("docs/fidelity/electron_window_dashboard.png");
  await window.screenshot({ path: shotPath });
  console.log(`Captured Electron window screenshot: ${shotPath}`);

  // Test navigation inside Electron
  console.log("Testing navigation to /quests inside Electron...");
  await window.goto("http://localhost:3000/quests", { waitUntil: "domcontentloaded" });
  await window.waitForTimeout(1000);
  const questShotPath = path.resolve("docs/fidelity/electron_window_quests.png");
  await window.screenshot({ path: questShotPath });
  console.log(`Captured Electron quests screenshot: ${questShotPath}`);

  // Close app
  await electronApp.close();
  console.log("Electron smoke test completed successfully!");
}

testElectron().catch((err) => {
  console.error("Electron smoke test failed:", err);
  process.exit(1);
});
