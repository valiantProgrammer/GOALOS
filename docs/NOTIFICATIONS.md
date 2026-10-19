# GOALOS — Notification Engine Architecture (`docs/NOTIFICATIONS.md`)

## 1. Dual Notification Channels

### Channel A: Local Scheduled Notifications (Device-Centric)
- **Role**: High-reliability, zero-server-dependency daily prompts.
- **Implementations**:
  - **Mobile**: `expo-notifications` local triggers (`DailyTriggerInput`).
  - **Electron**: Node-cron in main process triggering `new Notification(...)`.
  - **Web/PWA**: Service Worker local notification dispatch when active.
- **Scheduled Triggers**:
  - Daily Morning Briefing: "SYSTEM NOTIFICATION — Daily Quests Have Arrived."
  - Quest Deadline Reminder: 1 hour before due time.
  - Focus Session Complete: Haptic ring & soundscape chime.
  - Evening Review Prompt: "Record your hunter accomplishments before day reset."

### Channel B: Server Push (Cross-Device Events)
- **Role**: Real-time cross-device alerts.
- **Implementations**:
  - **Web**: `web-push` using VAPID keys.
  - **Android**: Expo Push Service forwarding to FCM.
  - **iOS**: APNs via Expo Push Service (Free development workaround in `docs/DISTRIBUTION.md`).
- **Triggers**:
  - Level Up & Rank Up ("LEVEL UP! You reached Level 33").
  - Boss Defeated / Dungeon Complete.
  - Streak Milestones (7-day, 14-day, 30-day).
  - Silent sync signal.

### Channel C: In-App Notification Center (DM-23, MM-21)
- Serves as the persistent record of all notifications across categories: `Quests`, `Achievements`, `Social`, `System`.
- Notifications support `readAt`, deduplication keys, and action deep-links.
