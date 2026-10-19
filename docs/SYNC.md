# GOALOS — Cross-Device Synchronization Protocol (`docs/SYNC.md`)

## 1. Overview
GOALOS achieves near-real-time multi-device consistency without incurring costs for long-running persistent WebSocket connections on Vercel Hobby.

## 2. Core Principles
1. **Authoritative Server**: The backend database (MongoDB Atlas) is the sole arbiter of XP, levels, rank progression, streaks, and timestamps.
2. **Monotonic `syncVersion`**: Every write operation (quest completion, habit check, level up, profile edit) increments a monotonically increasing counter `syncVersion` on the user profile.
3. **Delta Polling**: Clients query `GET /api/sync?since=<version>`. If the user is at version 120 and the server is at 123, only the mutations between 120 and 123 are transmitted.
4. **Silent Wake-up Push**: When Device A writes to the backend, the server dispatches a silent push notification (`content-available: 1` or data payload `{ type: "SYNC", version: 123 }`) to Device B and C. The background listener triggers a silent delta fetch.
5. **Foreground Polling Fallback**: While active in the foreground, clients poll `/api/sync` on a 45-second interval. Polling pauses immediately when the window loses focus or is backgrounded.

## 3. Offline Mutation Queue & Conflict Resolution
- Every client maintains a local append-only mutation queue.
- Each mutation is stamped with:
  - `idempotencyKey`: UUID v4
  - `localDate`: YYYY-MM-DD in the user's timezone
  - `createdAt`: ISO 8601 timestamp
  - `payload`: The serialized action (e.g., complete quest, check habit)
- Replay: Upon network reconnection, items are flushed FIFO.
- Conflict Rule: The earliest valid completion timestamp for a given `localDate` wins. Duplicate submissions are recognized via the unique `idempotencyKey` and return the existing record without penalty or double reward.
