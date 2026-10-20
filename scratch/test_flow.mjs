import { chromium } from "playwright";

async function runFlowTest() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });

  console.log("1. Testing Sign Up Page...");
  await page.goto("http://localhost:3000/sign-up", { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', "solo_hunter@goalos.app");
  await page.fill('input[placeholder="hunter_name"]', "Jinwoo");
  await page.fill('input[placeholder="••••••••••••"]', "HunterPass123!");
  const confirmInput = page.locator('input[placeholder="••••••••••••"]').nth(1);
  await confirmInput.fill("HunterPass123!");
  await page.click('input[type="checkbox"]');
  await page.click('button[type="submit"]');

  await page.waitForURL("**/onboarding/welcome", { timeout: 10000 });
  console.log("✓ Sign up redirected to Step 1: /onboarding/welcome");

  console.log("2. Testing Step 1 (Welcome)...");
  await page.click('button:has-text("Next")');
  await page.waitForURL("**/onboarding/profile", { timeout: 10000 });
  console.log("✓ Navigated to Step 2: /onboarding/profile");

  console.log("3. Testing Step 2 (Profile)...");
  await page.click('button:has-text("Next")');
  await page.waitForURL("**/onboarding/goals", { timeout: 10000 });
  console.log("✓ Navigated to Step 3: /onboarding/goals");

  console.log("4. Testing Step 3 (Goals & Interests)...");
  await page.click('button:has-text("Next")');
  await page.waitForURL("**/onboarding/schedule", { timeout: 10000 });
  console.log("✓ Navigated to Step 4: /onboarding/schedule");

  console.log("5. Testing Step 4 (Schedule)...");
  await page.click('button:has-text("Next")');
  await page.waitForURL("**/onboarding/preferences", { timeout: 10000 });
  console.log("✓ Navigated to Step 5: /onboarding/preferences");

  console.log("6. Testing Step 5 (Preferences)...");
  await page.click('button:has-text("Next")');
  await page.waitForURL("**/onboarding/complete", { timeout: 10000 });
  console.log("✓ Navigated to Step 6: /onboarding/complete");

  console.log("7. Testing Back Navigation...");
  await page.goto("http://localhost:3000/onboarding/profile", { waitUntil: "networkidle" });
  await page.click('button:has-text("Back")');
  await page.waitForURL("**/onboarding/welcome", { timeout: 10000 });
  console.log("✓ Back navigation moved from Step 2 to Step 1");

  console.log("8. Testing Completion & Redirection to Dashboard...");
  await page.goto("http://localhost:3000/onboarding/complete", { waitUntil: "networkidle" });
  await page.click('button:has-text("Enter GOALOS")');
  await page.waitForURL("**/dashboard", { timeout: 15000 });
  console.log("✓ Final step redirected to /dashboard");

  console.log("All end-to-end tests passed successfully!");
  await browser.close();
}

runFlowTest().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
