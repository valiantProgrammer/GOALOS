# GOALOS — Design & Technical Decisions Log

This document records all architectural decisions, design resolutions, and technical trade-offs made during development to preserve strict fidelity to the mockups while maintaining scalability.

---

## 1. Attributes & Stats
- **Decision**: Use the five attributes shown on the mockups: `STR (Strength)`, `AGI (Agility)`, `INT (Intelligence)`, `VIT (Vitality)`, and `LUK (Luck)`.
- **Rationale**: Reconciles the mockups (DM-14, MM-15) with the game engine. Discipline and Focus are retained as derived behavioral analytics metrics rather than raw leveling attributes.

## 2. Rank Tiers & Level Thresholds
- **Decision**: Ranks are defined as:
  - E-Rank: Level 1–19
  - D-Rank: Level 20–39 (Mockup shows Level 32 as D-Rank with next rank C-Rank at 2,570 XP)
  - C-Rank: Level 40–59
  - B-Rank: Level 60–79
  - A-Rank: Level 80–99
  - S-Rank: Level 100–119
  - National Rank: Level 120+
- **Rationale**: Matches the mockup data (`Lv. 32 Shadow Hunter, D-Rank, next C-Rank 2,570 XP`).

## 3. Level 32 Demo Seed Alignment
- **Decision**: The default level-up curve is $xp(L) = 100 + 50 \times (L - 1)$. For demo seed fidelity, a config override in `@goalos/config` sets Level 32 target to 5,000 XP with 2,430 current XP, exactly matching DM-04 and MM-05.
- **Rationale**: Required by the fidelity protocol to render identical numbers to the mockups.

## 4. Mobile Navigation Bar
- **Decision**: The bottom navigation bar consists of 5 items: **Home, Quests, Habits, Focus, More**.
- **Rationale**: Directly reflects the mockup bottom navigation. The "More" screen provides clean access to Goals, Calendar, Status, Skill Tree, Achievements, Story Mode, Shop, AI Assistant, Notifications, Analytics, Weekly Review, Profile, Friends, Search, Settings, and Account.

## 5. Primary Action Button Styling
- **Decision**: Desktop buttons use solid electric blue (`#3b6cf6` to `#2555eb`) with cyan glow on hover. Mobile buttons use the vibrant blue-to-violet linear gradient (`#3b82f6` -> `#8b5cf6`).
- **Rationale**: Preserves exact visual parity with the platform mockups.

## 6. Sliced Design Reference Images
- **Decision**: Composite mockup sheets are programmatically sliced into individual page assets in `docs/design-reference/sliced/` (e.g. `DM-01.png` ... `DM-30.png`, `MM-01.png` ... `MM-28.png`).
- **Rationale**: Enables exact 1:1 automated pixel comparison during the fidelity protocol.

## 7. Sign in with Apple vs Free Stack
- **Decision**: The Apple Sign In button is visually rendered on DM-02 per the mockup but is marked disabled with a tooltip: *"Needs Apple Developer account ($99/year). Use Google or Email sign-in."*
- **Rationale**: Per hard constraint #1, no paid services may be mandated. Full documentation of the free path and paid upgrade is maintained in `docs/DISTRIBUTION.md`.

## 8. Authoritative Backend & In-Memory Store
- **Decision**: An in-memory store in `apps/web/src/lib/store.ts` handles the demo user state (`Lv. 32 Shadow Hunter`) with full transactional mutations for completions, stat points, and notifications. When MongoDB URI is supplied, it seamlessly switches to Mongoose.
- **Rationale**: Ensures the web app runs instantaneously in development, CI, testing, and offline modes while maintaining strict server-authoritative rules.

## 9. Electron Security & Window Architecture
- **Decision**: Electron is configured with `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`. The secure preload script exposes only minimal vetted methods (`showNotification`, `onDeepLink`, `setAutoLaunch`, `getAutoLaunch`).
- **Rationale**: Strictly prevents arbitrary code execution vulnerabilities while allowing the web client to access native desktop features.

## 10. External Browser OAuth Protocol
- **Decision**: Google OAuth is opened in the user's default system browser via `shell.openExternal` rather than inside the Electron webview, and redirects back to GoalOS via the registered custom protocol `goalos://`.
- **Rationale**: Google's OAuth endpoints intentionally block embedded webviews/user-agents for security reasons.

## 11. Window Bounds Persistence & Offline Fallback
- **Decision**: Desktop window dimensions and position are automatically persisted to `userData/window-state.json`. If network connectivity is lost or the remote host is unreachable, the desktop shell renders an embedded cyberpunk HUD offline fallback page (`offline.html`).
- **Rationale**: Ensures native desktop app polish and resilient offline behavior.

## 12. React Native & Tablet Architecture
- **Decision**: Mobile screens are implemented in `apps/mobile` with Expo Router and custom Native styling matching `@goalos/design-tokens`. A dynamic breakpoint at width ≥ 768 (`useWindowDimensions()`) activates a responsive two-pane master-detail layout on tablet devices in both portrait and landscape.
- **Rationale**: Meets the non-negotiable requirement of separate native and DOM codebases while providing a tablet experience that mirrors the HUD aesthetic.

## 13. Productivity Architecture & Reward Shop Unification
- **Decision**: The Reward Shop (`/shop`, DM-18 and DM-26) is consolidated into an integrated responsive catalog with category tabs (All, Avatars, Themes, Boosts, Titles, Items, Special), live coin balance deduction, and a cart item counter.
- **Rationale**: Reconciles the two mockups (DM-18 base vs DM-26 expanded) into a single functional store experience.

## 14. Priority Matrix & Analytics Visualizations
- **Decision**: The Eisenhower Matrix on DM-13 uses an accessible 4-quadrant layout with color-coded urgency borders. Analytics charts on DM-19 / MM-22 use lightweight composited SVGs and circular progress rings without heavy third-party bundle bloat, ensuring rapid load times.
- **Rationale**: Preserves Lighthouse 90+ performance while matching exact mockup visuals.

## 15. Skill Tree Constellation & Progression Architecture
- **Decision**: The Skill Tree (`DM-15`, `MM-16`) features a sacred-geometry hexagonal constellation graph connecting core passives across Offense, Defense, Utility, and Special disciplines. Upgrades deduct server-authoritative Skill Points (`SP`), granting passive multipliers and title unlocks.
- **Rationale**: Faithfully mirrors the high-tech sci-fi constellation shown in DM-15 while integrating with the core game engine.

## 16. AI System Assistant & Fallback Planner Engine
- **Decision**: The AI Assistant (`/assistant` and `MM-20`) integrates Google Gemini API via `/api/ai/plan` with an intelligent, deterministic rule-based fallback engine. If no Gemini API key is configured, the system still generates structured tactical schedules, objective milestone decompositions, routine sequences, and motivational diagnostics.
- **Rationale**: Fulfills the hard constraint that all core systems must function 100% free of charge and offline without external API dependencies.

## 17. Community Opt-In & Admin Console Monitoring Architecture
- **Decision**: Community features (`DM-21`, `MM-25`) operate on an opt-in privacy model. The Admin Dashboard (`DM-28`), User Management (`DM-29`), and System Monitoring (`DM-30`) display real platform health parameters and simulated cloud metrics clearly labeled as demo data on the free stack, avoiding costly external cloud monitoring subscriptions.
- **Rationale**: Keeps the application 100% free to deploy and run, while meeting exact visual parity with the mockups.






