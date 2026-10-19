# GOALOS — Page & Screen Manifest (All 58 Designed + 3 Derived Pages)

Status Legend:
- `[ ] Not Started`
- `[-] In Progress`
- `[x] Built`
- `[*] Fidelity Approved` (side-by-side comparison passed)

---

## Desktop / Web Pages (30 Designed + 2 Derived)
Electron wraps these identical routes.

| # | Page Name | Route | Mockup Ref | Phase | Status | Notes |
|---|---|---|---|---|---|---|
| DM-01 | Landing Page (Home) | `/` | `desktop-page-01.png` #1 | Phase 1 | `[*] Fidelity Approved` | Hero, stats strip, top nav, Get Started CTA. Side-by-side: docs/fidelity/comparison_DM-01.png |
| DM-02 | Sign In / Sign Up | `/sign-in`, `/sign-up` | `desktop-page-01.png` #2 | Phase 1 | `[*] Fidelity Approved` | Email/pwd, Google OAuth, Discord, disabled Apple button. Side-by-side: docs/fidelity/comparison_DM-02.png |
| Derived | Account Recovery | `/recover` | Derived from DM-02 | Phase 1 | `[*] Fidelity Approved` | Password reset card in same auth style |
| DM-03 | Onboarding / Hunter Setup | `/onboarding` | `desktop-page-01.png` #3 | Phase 1 | `[*] Fidelity Approved` | 6-step wizard, class selection (Shadow, Mage, Fighter, Rogue). Side-by-side: docs/fidelity/comparison_DM-03.png |
| DM-04 | Main Dashboard | `/dashboard` | `desktop-page-01.png` #4 | Phase 1 | `[*] Fidelity Approved` | Level card, 4 stat tiles, Today's Quests, Rank card, Focus timer card. Side-by-side: docs/fidelity/comparison_DM-04.png |
| DM-05 | Quest Management | `/quests` | `desktop-page-01.png` #5 | Phase 1 | `[*] Fidelity Approved` | Tabs, filters, table, bulk actions, Create Quest. Side-by-side: docs/fidelity/comparison_DM-05.png |
| DM-06 | Quest Details & Editor | `/quests/[id]` | `desktop-page-01.png` #6 | Phase 1 | `[*] Fidelity Approved` | Overview/Checklist/Notes/Subtasks/Analytics tabs. Side-by-side: docs/fidelity/comparison_DM-06.png |
| DM-07 | Habits & Routine Tracker | `/habits` | `desktop-page-01.png` #7 | Phase 1 | `[*] Fidelity Approved` | Week/Day/Month grid, Streaks panel, completion ring. Side-by-side: docs/fidelity/comparison_DM-07.png |
| DM-08 | Routine Builder | `/routines` | `desktop-page-01.png` #8 | Phase 1 | `[*] Fidelity Approved` | Morning/Afternoon/Evening/Night tabs, timeline preview. Side-by-side: docs/fidelity/comparison_DM-08.png |
| DM-09 | Focus Workspace | `/focus` | `desktop-page-01.png` #9 | Phase 4 | `[*] Fidelity Approved` | Pomodoro ring timer, session settings, soundscapes. Side-by-side: docs/fidelity/comparison_DM-09.png |
| DM-10 | Goals Dashboard | `/goals` | `desktop-page-02.png` #10 | Phase 4 | `[*] Fidelity Approved` | Active/Completed/Archived, category progress. Side-by-side: docs/fidelity/comparison_DM-10.png |
| DM-11 | Goal Details & Milestones | `/goals/[id]` | `desktop-page-02.png` #11 | Phase 4 | `[*] Fidelity Approved` | Milestone tracker, linked quests, notes, analytics. Side-by-side: docs/fidelity/comparison_DM-11.png |
| DM-12 | Calendar & Time Blocking | `/calendar` | `desktop-page-02.png` #12 | Phase 4 | `[*] Fidelity Approved` | Day/Week/Month, draggable time blocks, mini month. Side-by-side: docs/fidelity/comparison_DM-12.png |
| DM-13 | Planner & Schedule | `/planner` | `desktop-page-02.png` #13 | Phase 4 | `[*] Fidelity Approved` | Daily/Weekly/Monthly, Eisenhower Priority Matrix. Side-by-side: docs/fidelity/comparison_DM-13.png |
| DM-14 | Hunter Status & Attributes | `/status` | `desktop-page-02.png` #14 | Phase 1 | `[*] Fidelity Approved` | STR/AGI/INT/VIT/LUK attributes, titles, rank card. Side-by-side: docs/fidelity/comparison_DM-14.png |
| DM-15 | Skill Tree | `/skills` | `desktop-page-02.png` #15 | Phase 5 | `[*] Fidelity Approved` | Hex-node skill map, branches, unlock logic. Side-by-side: docs/fidelity/comparison_DM-15.png |
| DM-16 | Achievements & Titles | `/achievements` | `desktop-page-02.png` #16 | Phase 1 | `[*] Fidelity Approved` | Unlocked/In Progress/Locked grid, titles list. Side-by-side: docs/fidelity/comparison_DM-16.png |
| DM-17 | Dungeons & Challenges | `/dungeons` | `desktop-page-02.png` #17 | Phase 5 | `[*] Fidelity Approved` | Chapters, boss battles, reward tiers. Side-by-side: docs/fidelity/comparison_DM-17.png |
| DM-18/26 | Reward Shop | `/shop` | `desktop-page-02.png` #18 & `03.png` #26 | Phase 4 | `[*] Fidelity Approved` | Catalog, cart, buy with coins. Side-by-side: docs/fidelity/comparison_DM-18.png and comparison_DM-26.png |
| DM-19 | Analytics & Progress | `/analytics` | `desktop-page-03.png` #19 | Phase 4 | `[*] Fidelity Approved` | KPI tiles, XP line chart, donut, habit heatmap. Side-by-side: docs/fidelity/comparison_DM-19.png |
| DM-20 | Weekly Review | `/review` | `desktop-page-03.png` #20 | Phase 4 | `[*] Fidelity Approved` | Achievements, goals, habits, AI summary. Side-by-side: docs/fidelity/comparison_DM-20.png |
| DM-21 | Community & Party Quests | `/community` | `desktop-page-03.png` #21 | Phase 6 | `[*] Fidelity Approved` | Find hunters, suggested parties, opt-in leaderboard. Side-by-side: docs/fidelity/comparison_DM-21.png |
| DM-22 | Global Search & Command Center | `/search` & `Ctrl+K` | `desktop-page-03.png` #22 | Phase 4 | `[*] Fidelity Approved` | Quick actions, slash commands, AI suggestions. Side-by-side: docs/fidelity/comparison_DM-22.png |
| DM-23 | Notification Center | `/notifications` | `desktop-page-03.png` #23 | Phase 1 | `[*] Fidelity Approved` | Tabs, grouped chronological notifications. Side-by-side: docs/fidelity/comparison_DM-23.png |
| DM-24 | Settings & Preferences | `/settings` | `desktop-page-03.png` #24 | Phase 1 | `[*] Fidelity Approved` | Theme swatches, background style, UI density. Side-by-side: docs/fidelity/comparison_DM-24.png |
| DM-25 | Account, Privacy & Data | `/account` | `desktop-page-03.png` #25 | Phase 1 | `[*] Fidelity Approved` | Profile info, 2FA, devices, export, activity log. Side-by-side: docs/fidelity/comparison_DM-25.png |
| DM-27 | Inventory & Collection | `/inventory` | `desktop-page-03.png` #27 | Phase 4 | `[*] Fidelity Approved` | Owned items, equipped loadout, collection %. Side-by-side: docs/fidelity/comparison_DM-27.png |
| DM-28 | Admin Dashboard | `/admin` | `desktop-page-04.png` #28 | Phase 6 | `[*] Fidelity Approved` | KPI tiles, activity graphs, server status. Side-by-side: docs/fidelity/comparison_DM-28.png |
| DM-29 | User & Content Management | `/admin/users` | `desktop-page-04.png` #29 | Phase 6 | `[*] Fidelity Approved` | User table, template management, categories. Side-by-side: docs/fidelity/comparison_DM-29.png |
| DM-30 | System Monitoring & Data | `/admin/system` | `desktop-page-04.png` #30 | Phase 6 | `[*] Fidelity Approved` | CPU/memory/storage metrics, live logs, backups. Side-by-side: docs/fidelity/comparison_DM-30.png |
| Derived | Hunter Profile | `/profile` | Derived from MM-24 | Phase 1 | `[*] Fidelity Approved` | Avatar, title, stats, public profile |
| Derived | AI System Assistant | `/assistant` | Derived from MM-20 | Phase 5 | `[*] Fidelity Approved` | Full chat/plan/analyze hunter assistant. Side-by-side: docs/fidelity/comparison_derived_assistant.png |

---

## Mobile / Tablet Screens (28 Screens)

| # | Screen Name | Route / Path | Mockup Ref | Phase | Status | Notes |
|---|---|---|---|---|---|---|
| MM-01 | Splash Screen | `/(auth)/splash` | `phone-page-01.png` #1 | Phase 3 | `[*] Fidelity Approved` | Logo glow, Get Started button. Side-by-side: docs/fidelity/comparison_MM-01.png |
| MM-02 | Onboarding Intro | `/(auth)/onboarding-intro` | `phone-page-01.png` #2 | Phase 3 | `[*] Fidelity Approved` | 5-dot carousel, Skip/Next. Side-by-side: docs/fidelity/comparison_MM-02.png |
| MM-03 | Login / Sign Up | `/(auth)/sign-in` | `phone-page-01.png` #3 | Phase 3 | `[*] Fidelity Approved` | Email/pwd + OAuth buttons. Side-by-side: docs/fidelity/comparison_MM-03.png |
| MM-04 | Hunter Awakening Setup | `/(auth)/awakening` | `phone-page-01.png` #4 | Phase 3 | `[*] Fidelity Approved` | Avatar, Name, Class selection. Side-by-side: docs/fidelity/comparison_MM-04.png |
| MM-05 | Dashboard (Home) | `/(tabs)/index` | `phone-page-01.png` #5 | Phase 3 | `[*] Fidelity Approved` | Level card, Today's Quests, Quote. Side-by-side: docs/fidelity/comparison_MM-05.png |
| MM-06 | Quest Log | `/(tabs)/quests` | `phone-page-01.png` #6 | Phase 3 | `[*] Fidelity Approved` | Tabs, filters, quest cards with check. Side-by-side: docs/fidelity/comparison_MM-06.png |
| MM-07 | Quest Details | `/(tabs)/quests/[id]` | `phone-page-01.png` #7 | Phase 3 | `[*] Fidelity Approved` | Checklist, subtasks, rewards, Mark Complete. Side-by-side: docs/fidelity/comparison_MM-07.png |
| MM-08 | Habits & Routine Tracker | `/(tabs)/habits` | `phone-page-01.png` #8 | Phase 3 | `[*] Fidelity Approved` | Week day selector, habit check cards. Side-by-side: docs/fidelity/comparison_MM-08.png |
| MM-09 | Routine Builder | `/(tabs)/habits/builder` | `phone-page-01.png` #9 | Phase 3 | `[*] Fidelity Approved` | Time of day tabs, toggle switch rows. Side-by-side: docs/fidelity/comparison_MM-09.png |
| MM-10 | Focus Timer | `/(tabs)/focus` | `phone-page-01.png` #10 | Phase 4 | `[*] Fidelity Approved` | Circular timer, soundscape icons. Side-by-side: docs/fidelity/comparison_MM-10.png |
| MM-11 | Goal Management | `/(more)/goals` | `phone-page-01.png` #11 | Phase 4 | `[*] Fidelity Approved` | Goal progress cards, Add Goal CTA. Side-by-side: docs/fidelity/comparison_MM-11.png |
| MM-12 | Goal Details & Milestones | `/(more)/goals/[id]` | `phone-page-01.png` #12 | Phase 4 | `[*] Fidelity Approved` | Milestones checklist, status badges. Side-by-side: docs/fidelity/comparison_MM-12.png |
| MM-13 | Calendar & Daily Planner | `/(more)/calendar` | `phone-page-01.png` #13 | Phase 4 | `[*] Fidelity Approved` | Time block view, date selector. Side-by-side: docs/fidelity/comparison_MM-13.png |
| MM-14 | Create / Edit Task | `/(tabs)/create-task` | `phone-page-01.png` #14 | Phase 3 | `[*] Fidelity Approved` | Task/Quest/Habit tabs, priority chips. Side-by-side: docs/fidelity/comparison_MM-14.png |
| MM-15 | Hunter Status & Attributes | `/(more)/status` | `phone-page-02.png` #15 | Phase 3 | `[*] Fidelity Approved` | STR, AGI, INT, VIT, LUK with (+) buttons. Side-by-side: docs/fidelity/comparison_MM-15.png |
| MM-16 | Skill Tree | `/skills` | `phone-page-02.png` #16 | Phase 5 | `[*] Fidelity Approved` | Skill branches, unlock action. Side-by-side: docs/fidelity/comparison_MM-16.png |
| MM-17 | Achievements & Titles | `/(more)/achievements` | `phone-page-02.png` #17 | Phase 3 | `[*] Fidelity Approved` | Badges grid, unlocked titles. Side-by-side: docs/fidelity/comparison_MM-17.png |
| MM-18 | Story Mode / Boss Battles | `/dungeons` | `phone-page-02.png` #18 | Phase 5 | `[*] Fidelity Approved` | Chapters, boss HP, challenge rewards. Side-by-side: docs/fidelity/comparison_MM-18.png |
| MM-19 | Reward Shop & Inventory | `/(more)/shop` | `phone-page-02.png` #19 | Phase 4 | `[*] Fidelity Approved` | Coin balance, items grid, equip button. Side-by-side: docs/fidelity/comparison_MM-19.png |
| MM-20 | AI System Assistant | `/assistant` | `phone-page-02.png` #20 | Phase 5 | `[*] Fidelity Approved` | Hunter AI conversation interface. Side-by-side: docs/fidelity/comparison_MM-20.png |
| MM-21 | Notification Center | `/(more)/notifications` | `phone-page-02.png` #21 | Phase 3 | `[*] Fidelity Approved` | Categorized notification cards. Side-by-side: docs/fidelity/comparison_MM-21.png |
| MM-22 | Analytics & Progress | `/(more)/analytics` | `phone-page-02.png` #22 | Phase 4 | `[*] Fidelity Approved` | Mobile charts, streak stats, XP graph. Side-by-side: docs/fidelity/comparison_MM-22.png |
| MM-23 | Weekly Review | `/(more)/review` | `phone-page-02.png` #23 | Phase 4 | `[*] Fidelity Approved` | Weekly scorecard, AI review. Side-by-side: docs/fidelity/comparison_MM-23.png |
| MM-24 | Hunter Profile | `/(more)/profile` | `phone-page-02.png` #24 | Phase 3 | `[*] Fidelity Approved` | Avatar, title, rank, achievements list. Side-by-side: docs/fidelity/comparison_MM-24.png |
| MM-25 | Friends & Party Quests | `/community` | `phone-page-02.png` #25 | Phase 6 | `[*] Fidelity Approved` | Party members, friend list, invites. Side-by-side: docs/fidelity/comparison_MM-25.png |
| MM-26 | Search / Command Center | `/(more)/search` | `phone-page-02.png` #26 | Phase 4 | `[*] Fidelity Approved` | Instant search, filters, quick commands. Side-by-side: docs/fidelity/comparison_MM-26.png |
| MM-27 | Settings & Preferences | `/(more)/settings` | `phone-page-02.png` #27 | Phase 3 | `[*] Fidelity Approved` | Preferences, sound, themes, quiet hours. Side-by-side: docs/fidelity/comparison_MM-27.png |
| MM-28 | Account, Privacy & Data | `/(more)/account` | `phone-page-02.png` #28 | Phase 3 | `[*] Fidelity Approved` | Account management, export data, security. Side-by-side: docs/fidelity/comparison_MM-28.png |
