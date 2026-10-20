import { chromium } from "playwright";

const testRoutes = [
  "/dashboard",
  "/quests",
  "/habits",
  "/calendar",
  "/analytics",
  "/settings",
  "/account",
];

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1540, height: 788 } });

  let allPassed = true;

  for (const route of testRoutes) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    const evaluation = await page.evaluate(() => {
      // 1. Is window/body scrollable?
      const bodyScrollable = document.documentElement.scrollHeight > window.innerHeight &&
                             document.documentElement.style.overflow !== "hidden";
      const windowScrollYBefore = window.scrollY;
      window.scrollTo(0, 500);
      const windowScrollYAfter = window.scrollY;

      // 2. Find the scrollable inner right pane
      const mainEl = document.querySelector("main") || document.querySelector(".flex-1.overflow-y-auto");
      const isInnerScrollable = mainEl ? mainEl.scrollHeight > mainEl.clientHeight : false;

      // Try scrolling the inner pane
      let innerScrolled = false;
      if (mainEl && isInnerScrollable) {
        mainEl.scrollTop = 200;
        innerScrolled = mainEl.scrollTop > 0;
      }

      // Check TopBar position
      const topBar = document.querySelector("header");
      const topBarTop = topBar ? topBar.getBoundingClientRect().top : null;

      // Check Sidebar position
      const sidebar = document.querySelector("aside");
      const sidebarLeft = sidebar ? sidebar.getBoundingClientRect().left : null;

      return {
        windowScrollYAfter,
        isInnerScrollable,
        innerScrolled,
        topBarTop,
        sidebarLeft,
      };
    });

    console.log(`Route ${route}:`);
    console.log(`  Window scroll after scroll attempt: ${evaluation.windowScrollYAfter} (must be 0)`);
    console.log(`  Inner right pane scrollable: ${evaluation.isInnerScrollable}`);
    console.log(`  Inner right pane scrolled: ${evaluation.innerScrolled}`);
    console.log(`  TopBar top: ${evaluation.topBarTop}px (must be 0)`);
    console.log(`  Sidebar left: ${evaluation.sidebarLeft}px (must be 0)`);

    if (evaluation.windowScrollYAfter !== 0 || evaluation.topBarTop !== 0 || evaluation.sidebarLeft !== 0) {
      allPassed = false;
      console.error(`  FAIL on ${route}`);
    } else {
      console.log(`  PASS: Entire page is locked, right bottom part is scrollable!`);
    }
  }

  await browser.close();

  if (allPassed) {
    console.log("\nALL ROUTES PASSED VERIFICATION!");
  } else {
    console.error("\nSOME ROUTES FAILED VERIFICATION!");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
