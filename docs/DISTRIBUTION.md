# GOALOS — Free-Tier Distribution & Deployment Strategy (`docs/DISTRIBUTION.md`)

This guide specifies how GOALOS runs 100% free across all three target platforms, detailing free workarounds and paid upgrade paths.

---

## 1. Cloud Infrastructure (Zero Cost)
- **Web & Backend Hosting**: Vercel Hobby Tier (Node.js 20+ Serverless API routes, Next.js Edge SSR, PWA hosting).
- **Database**: MongoDB Atlas M0 Free Cluster (512 MB storage, shared RAM, replica set, zero dollar credit card requirement).
- **Scheduled Cron**: GitHub Actions scheduled workflow (`schedule: '0 * * * *'`) calling secret-protected `/api/cron/*` endpoints, completely bypassing Vercel Hobby's 1-cron-per-day restriction.

---

## 2. Desktop Distribution (Electron)
- **Packaging**: `electron-builder` building for Windows (`.exe` NSIS installer + portable), macOS (`.dmg` / `.zip`), and Linux (`.AppImage` / `.deb`).
- **Update Mechanism**: `electron-updater` configured with GitHub Releases as the free artifact host. Updates are automatically checked on launch.
- **Code Signing**:
  - Windows: Unsigned or self-signed certificate for development. Production can use SignPath.io (free for OSS) or standard developer certs.
  - macOS: Ad-hoc signing for local execution. Users bypass Gatekeeper via Right Click -> Open.

---

## 3. Mobile Distribution (Expo & React Native)
- **Android**:
  - **Free APK**: Built locally via `pnpm --filter mobile run:android` or via Expo EAS Build Free Tier (generates a direct sideloadable `.apk`).
  - **Push Notifications**: Standard Google FCM credentials wired through Expo Push Service (Free).
- **iOS**:
  - **Free Development Workaround**:
    - Build locally via Xcode or run via Expo Development Build connected to a personal Apple ID (free 7-day provisioning profile).
    - Remote APNs push notifications require an Apple Developer Account ($99/year).
    - **Free Fallback Built-in**: All scheduled quest reminders, morning briefings, and focus alarms utilize local iOS notifications (`expo-notifications` local scheduling), which work 100% offline and cost $0 without any paid account.
    - Sign in with Apple button is displayed per mockup specification but disabled with an informative tooltip: *"Requires Apple Developer account. Use Google or Email sign-in."*
