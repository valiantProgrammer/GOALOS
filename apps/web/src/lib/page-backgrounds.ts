export type BackgroundVariant = "hero" | "scene" | "dense";

export const ROUTE_BACKGROUND_MAP: Record<string, BackgroundVariant> = {
  // Hero: artwork strongest
  "/": "hero",
  "/dashboard": "hero",
  "/sign-in": "hero",
  "/signin": "hero",
  "/sign-up": "hero",
  "/signup": "hero",
  "/onboarding": "hero",

  // Scene: opacity ~0.55, uses bg-full-2560.webp
  "/quests": "scene",
  "/routines": "scene",
  "/focus": "scene",
  "/dungeons": "scene",
  "/achievements": "scene",
  "/skills": "scene",
  "/status": "scene",
  "/assistant": "scene",
  "/community": "scene",
  "/admin": "scene",

  // Dense: opacity ~0.35, uses bg-blur-1280.webp
  "/habits": "dense",
  "/calendar": "dense",
  "/planner": "dense",
  "/analytics": "dense",
  "/review": "dense",
  "/goals": "dense",
  "/shop": "dense",
  "/settings": "dense",
  "/account": "dense",
  "/inventory": "dense",
  "/notifications": "dense",
  "/search": "dense",
  "/kit-gallery": "dense",
};

export function getBackgroundVariant(pathname: string): BackgroundVariant {
  if (ROUTE_BACKGROUND_MAP[pathname]) {
    return ROUTE_BACKGROUND_MAP[pathname];
  }

  // Prefix matching
  for (const [route, variant] of Object.entries(ROUTE_BACKGROUND_MAP)) {
    if (route !== "/" && pathname.startsWith(route)) {
      return variant;
    }
  }

  return "scene";
}
