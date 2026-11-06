# Case Study: Building a Consumer Fintech Wallet in React Native and Expo

> **Draft status.** Every technical claim below was checked against the source code. Text in `[square brackets]` needs your input before publishing. The client name, team size, user numbers and business results are deliberately left out until you confirm what you may disclose (see Part 5).

---

## Part 1: Detailed Case Study

### 1. Project Overview

I built the iOS and Android app for a consumer digital wallet aimed at everyday spending. Users hold a USD balance (backed by USDC on the Base network), send money to friends, request payments, pay merchants by scanning a QR code, earn cashback and referral rewards, buy and sell crypto, and move money to and from their bank accounts. A debit card program (Visa, issued through Rain) is integrated, with card controls, statements and Apple/Google Wallet provisioning under way.

The app is one TypeScript codebase built on Expo (SDK 58) and React Native 0.88. It has about 100 routed screens and about 88,000 lines of TypeScript in `src/`, and it ships in nine languages, including right-to-left Arabic.

**Timeline:** first commit 23 June 2026; active development through November 2026 `[confirm, and say whether it is live in the App Store / Play Store]`.

### 2. The Problem

Moving money between bank accounts, cards, crypto and other people usually means switching between several apps, each with its own sign-up and identity check. The product's goal was to put all of that behind one familiar "dollar balance" interface, so users never deal with wallets, chains or gas fees directly.

That creates a difficult engineering brief for a mobile team:

- **Many regulated third parties.** Identity verification, bank linking, card issuing, fiat-to-crypto on-ramps and embedded wallets each have their own native SDK, auth model and failure modes, and they all have to feel like one product.
- **Security expectations of a banking app.** That means session handling, device trust, PIN and biometric confirmation for sensitive actions, and no sensitive data in logs.
- **Startup reliability.** A money app that shows a blank screen, a font flash or a stale maintenance banner loses trust fast.
- **Two platforms with different native rules.** Apple Pay inside a WebView, Apple Wallet entitlements and Android Gradle conflicts each need platform-specific work.

### 3. Project Objectives

- Ship one codebase to iOS and Android with native-quality navigation on each platform.
- Integrate KYC, bank linking, several on-ramps, an embedded wallet and card issuing behind one consistent flow.
- Keep credentials and session data in OS-backed secure storage, and require local confirmation for money movement.
- Let the business control features, maintenance mode and minimum versions remotely, without a new app release.
- Support international users from launch: nine locales, RTL layout and country-specific sign-up and waitlist.
- Allow hotfixes over the air while keeping the native projects stable.

### 4. My Role and Responsibilities

`[Confirm. The repository shows one primary commit author across 539 commits, but it cannot show who designed the backend, product or UI, or whether others reviewed the work.]`

Draft, assuming you were the lead or sole mobile engineer:

- Lead mobile engineer: owned the app's architecture, all client-side features and native integrations from the initial commit.
- Integrated every third-party SDK on the client (Privy, Veriff, Plaid, Coinbase, MoonPay, Transak, Rain, MeaWallet, Firebase, AppsFlyer, Crisp).
- Wrote the custom Expo native modules, config plugins and `patch-package` fixes for iOS and Android.
- Set up EAS build profiles, update channels and the release workflow.
- Migrated navigation from React Navigation to Expo Router's file-based routing.
- `[Worked with: backend team / designer / product owner. Confirm who.]`

### 5. Technical Stack

| Area                  | Choice                                                                                      | Why it mattered                                                               |
| --------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Runtime               | Expo SDK 58, React Native 0.88, React 19.3, TypeScript (strict)                             | One codebase, custom dev client (not Expo Go) because of the many native SDKs |
| Compiler              | React Compiler enabled (`experiments.reactCompiler`)                                        | Automatic memoization across a large screen tree                              |
| Navigation            | Expo Router with typed routes, `Stack.Protected` guards, `NativeTabs` on iOS                | Auth gating handled by the router; native tab bar on iOS                      |
| Server state          | TanStack Query 5 + Axios                                                                    | Caching, invalidation after mutations, a single error-handling layer          |
| Client state          | Zustand 5                                                                                   | Small, explicit stores for auth, theme, locale, feature flags and flows       |
| Embedded wallet       | Privy (`@privy-io/expo`), viem, Base chain                                                  | Every user gets an embedded Ethereum wallet on login, with no seed-phrase UX  |
| Identity              | Veriff SDK                                                                                  | KYC before money movement                                                     |
| Banking and funding   | Plaid Link, MX Connect, Coinbase Onramp (Apple Pay), MoonPay, Transak (headless), Changelly | Several funding routes, varying by region                                     |
| Cards                 | Rain card APIs, Recurly tokenization, MeaWallet push provisioning, custom PassKit module    | Card lifecycle and digital-wallet provisioning                                |
| Security              | Expo Secure Store (Keychain / Keystore), Expo Local Authentication                          | Token vault, PIN and biometrics                                               |
| Messaging and support | Firebase Cloud Messaging, Expo Notifications, Crisp                                         | Push with deep links, in-app support                                          |
| Growth                | AppsFlyer OneLink, Firebase Analytics and Crashlytics, Meta SDK                             | Referral attribution, funnel analytics, crash reporting                       |
| Documents             | `pdf-lib`, `expo-print`, `expo-sharing`                                                     | Account statements and letters generated on the device                        |
| i18n                  | i18next, nine locales, RTL                                                                  | International launch                                                          |
| Delivery              | EAS Build, EAS Update, `patch-package`                                                      | Store builds, OTA channels, fixes for upstream SDKs                           |

### 6. Application Architecture

```
src/
├── app/                 Expo Router routes
│   ├── _layout.tsx      Root: providers, startup gating, splash handoff
│   ├── +native-intent   Stops the router from hijacking deep links
│   ├── (auth)/          Splash, sign-in/up, KYC, waitlist, referral landing
│   └── (app)/           ~90 wallet routes + MainTabs/ (Home, Activity, Scan, Rewards, Profile)
├── navigation/          Group layouts, platform-split tab navigators
├── screens/             Screen implementations by domain (addFunds, crypto, fyntiqCard, sendPayment …)
├── api/                 Axios client, services, React Query hooks per domain
├── store/               Zustand stores
├── hooks/               SDK and lifecycle hooks (Plaid, Transak, AppsFlyer, FCM, system gate …)
├── utils/               Secure storage, PIN, lockout, deep links, system gate, formatting
├── i18n/                Nine locale bundles
└── theme/               Design tokens, fonts
modules/                 Local Expo native modules (Swift / Kotlin)
meawallet/               Config plugins that inject card-provisioning config into native projects
patches/                 patch-package fixes for third-party SDKs
```

**Layering.** Screens never call Axios directly. `api/services` holds the typed HTTP calls, and `api/hooks` wraps them in React Query hooks per domain (payments, crypto, card, referrals, notifications). Zustand holds only client state: session, theme, locale, feature flags and multi-step flow state. This split kept cache invalidation predictable. For example, a push notification invalidates only the notifications and unread-count queries.

**Route groups as security boundaries.** The root stack declares `(auth)` and `(app)` inside `Stack.Protected` guards driven by the auth store. Logging in or out flips the guard, Expo Router drops the other group's history, and there is no hand-written reset logic to get wrong.

**Startup pipeline.** The root layout runs theme, locale and auth hydration in parallel, loads fonts, then mounts providers (Privy → React Query → gestures → safe area → language gate → system gate → router).

_Verified in:_ `src/app/_layout.tsx`, `src/navigation/RootNavigation.tsx`, `src/api/apiClient.ts`, `src/api/hooks/*`, `src/store/*`.

### 7. Key Features and Implementations

**Onboarding and identity**

- Phone and email OTP sign-up and sign-in with a resend cooldown. The client reads cooldowns sent by the server (including ones embedded in error messages) so users see an accurate countdown. This was part of SMS-pumping fraud prevention. `src/utils/authCooldown.ts`
- Country-based sign-up with a waitlist for unsupported regions.
- Veriff KYC, with a verification prompt shown before gated actions.
- A Privy embedded Ethereum wallet created automatically for every user at login (`createOnLogin: "all-users"`).

**Moving money**

- Send, request and receive by username or QR code. Scan-to-pay merchant checkout uses the camera.
- Slide-to-send confirmation, then a PIN or biometric check before the transaction is submitted.
- Add funds through Plaid- or MX-linked bank accounts, Coinbase (Apple Pay), MoonPay or Transak, with a fee breakdown and processing states.
- Withdrawal to linked or manually added bank accounts, with fee display.
- Crypto: holdings, price charts, buy and sell flows, and deposit by address and QR code.

**Card**

- Card activation, PIN set and change, freeze and unfreeze, lost-card reporting, replacement, card controls, monthly statements and benefits screens.
- Card tokenization through a Recurly-hosted form in a WebView.
- Digital-wallet provisioning **in progress** (see Challenge 4).

**Account**

- A USD account details screen that generates PDFs on the device (`src/screens/app/usdAccount/pdf/`).
- Referral program with OneLink deep links and reward tracking.
- Notifications centre with push deep links, notification preferences and a blocked-users list.
- Security settings: PIN, biometrics, app-unlock timeout and wallet freeze.
- Theme, language and in-app Crisp support chat.

**System gates**

- Maintenance mode, forced update (checked against the live App Store / Play Store version), an offline blocking modal and a device-compromise screen.

### 8. Major Technical Challenges

1. **Starting fast and reliably with many SDKs.** Privy, Firebase, AppsFlyer, Crisp, fonts, locale, secure storage and remote config all compete for the first second of launch. Showing the screen too early produced a font flash or wrong-language UI. Waiting for the network made the app hostage to a slow API.
2. **Running Apple Pay inside a WebView for the Coinbase on-ramp.** WebKit disables Apple Pay on any WKWebView that injects user scripts, but React Native WebView's message bridge works by injecting a script. Coinbase's headless on-ramp also posts events to its own message handler name, which React Native WebView did not register.
3. **Native build conflicts between SDKs.** On Android, the Veriff SDK's BouncyCastle artifacts clashed with other cryptography dependencies, and AppsFlyer's module failed on newer Android Gradle Plugin defaults.
4. **Card push provisioning.** Apple Wallet in-app provisioning requires a restricted entitlement, production cards (Visa has no sandbox) and issuer-generated encrypted payloads. Meanwhile, the UI had to be built and tested on real devices.
5. **Migrating navigation while shipping features.** The app started on React Navigation with manually keyed auth and app stacks. Moving to file-based Expo Router risked breaking auth gating, deep links (referrals, OneLink, OAuth returns) and notification routing.
6. **Security without a native banking SDK.** Tokens, the user cache and PIN data needed OS-level protection. Some early builds had stored data in AsyncStorage, and 401s, PIN failures and logout all had to behave correctly.
7. **Platform-correct navigation chrome.** iOS users expect a native tab bar (and a sidebar on wide windows), while the Android design called for a custom tab bar with a central Scan button.

### 9. How I Solved Those Challenges

**1. Startup pipeline: cache first, then revalidate, with a splash handoff**

- Theme, locale and auth hydration run in parallel through a memoized promise (`initializeStartupStores`), so React re-renders cannot start hydration twice.
- Auth hydration marks the session ready as soon as the access token is read, then loads the cached user profile in the background. A `sessionId` check prevents a late profile load from overwriting a newer login or logout.
- Feature flags and the maintenance config are read from a cache first, then refreshed from the network. Cached values go through runtime type guards before use, so a corrupt cache or a schema change cannot crash startup.
- The store-version check for forced updates runs in the background with its own timeout, so it never blocks first render.
- Splash handoff: the native splash stays visible until the JavaScript splash has laid out with the brand fonts, which removes the system-font flash. The JS splash then stays until providers, the system gate and a minimum display time are all ready. Crisp is initialized on the next tick after the app is ready.
- I added a development-only startup tracer (`logStartupStage`) that timestamps each stage. This made it possible to see which SDK or storage read was slow.

_Files:_ `src/app/_layout.tsx`, `src/store/authStore.ts`, `src/navigation/RootNavigation.tsx`, `src/hooks/useSystemGate.ts`, `src/utils/systemGate.ts`, `src/utils/startupTrace.ts`

**2. Native patch to React Native WebView for Apple Pay**
I patched the iOS WebView implementation (`patches/react-native-webview+*.patch`) so that when `enableApplePay` is on, it registers only message handlers and no injected scripts. It also registers a second handler named `cbOnramp`, which Coinbase requires, and routes both through the existing `onMessage` path. On the JS side, the checkout modal consumes Coinbase lifecycle events (`load_error`, `commit_error`, `polling_success`) and maps error codes to localized messages. When the WebView redirects back to the app, it confirms the final order status with the API instead of trusting the redirect.
_Files:_ `patches/react-native-webview+13.16.0.patch`, `src/screens/app/addFunds/CoinbaseApplePayCheckoutModal.tsx`

**3. Fixing SDK conflicts with patch-package**

- Veriff: excluded its BouncyCastle `jdk18on` modules and pinned compatible `jdk15to18` artifacts.
- AppsFlyer: enabled `buildConfig` in the module's Gradle file, which newer Android Gradle Plugin versions no longer enable by default.

These fixes are reapplied automatically on every `npm install` through `postinstall`.
_Files:_ `patches/`

**4. Building provisioning infrastructure ahead of production credentials**

- Wrote two Expo config plugins that inject the MeaWallet configuration into the iOS Xcode project (as a bundled resource) and into Android `res/raw` at prebuild, so the secret file never has to be added to the native projects by hand.
- Wrote a local Expo module in Swift (`modules/payment-pass`) around `PKAddPaymentPassViewController` (ECC_V2, Visa). It handles capability checks, distinguishes user cancellation from failure, and resolves the top view controller. With a placeholder payload, it lets the team exercise the native Add to Apple Wallet sheet on a device before the issuer backend is ready.
- Drafted the MeaWallet-based Apple and Google Wallet flow: an already-in-Wallet check, OEM tokenization and activation-state handling.

`[Status: the MeaWallet flow is currently commented out in the source. Describe it as "in progress" unless it has since shipped.]`
_Files:_ `meawallet/configIos.js`, `meawallet/configAndroid.js`, `modules/payment-pass/`, `src/screens/app/fyntiqCard/addRainCardToWallet.ts`

**5. Incremental migration to Expo Router**

- Kept the existing screen implementations and route names. Each file in `src/app/(app)` is a thin route that re-exports a screen, so the migration changed routing, not features.
- Replaced the keyed auth and app stacks with `Stack.Protected` guards. An `index` route redirects to the group the session allows.
- Added `+native-intent.tsx` so that incoming referral, OneLink, OAuth and Privy URLs, which have their own listeners, do not cause the router to navigate on cold or warm start.
- Notification taps are deduplicated by event ID, invalidate only the relevant queries, and wait until the router is ready before navigating.
- Turned on typed routes so that broken `router.push` targets fail at compile time.

_Files:_ `src/app/`, `src/navigation/RootNavigation.tsx`, `src/hooks/useNotificationDeepLinking.ts`

**6. Layered client security**

- `encryptedVault` wraps Expo Secure Store (iOS Keychain, Android Keystore). Tokens and the cached user profile are migrated from AsyncStorage on first read, and the legacy copy is deleted, so existing users were upgraded without being logged out.
- Sensitive actions go through `useSensitivePinAuth`, a promise-based PIN sheet with an optional biometric shortcut, which keeps the confirmation step out of each screen's logic.
- Sign-in PIN lockout per phone number: 3 failures lock for 15 minutes, with the counter stored in the secure vault.
- The app relocks after a background timeout when biometric unlock is enabled.
- The Axios interceptor recursively redacts PINs, card numbers, CVVs and card secrets from development logs. It turns `{status:false}` envelopes into real errors and logs out globally on 401, except for wallet-PIN failures, which must not end the session.
- In development, a toggle swaps in a mock Axios adapter, so complete auth and payment flows can be tested without hitting the backend.

_Files:_ `src/utils/encryptedVault.ts`, `src/utils/storage.ts`, `src/hooks/useSensitivePinAuth.ts`, `src/utils/loginLockout.ts`, `src/navigation/AppStack.tsx`, `src/api/apiClient.ts`

**7. Platform-specific tab navigation**

- iOS uses Expo Router `NativeTabs` (a real UITabBar with SF Symbols). The Scan tab is marked `disabled` but still handles `tabPress`, so it opens the scanner without becoming a tab-history entry. UIKit adapts the native tabs to a sidebar on wide windows.
- Android uses `TabNavigator.android.tsx`, which applies the custom Fyntiq tab bar with a central action button and safe-area-aware sizing. Platform file extensions select the right navigator with no runtime branching.
- **In progress (uncommitted):** a `useWideLayout` hook and a `SplitAmountLayout` component that split amount-entry screens into two panes on wide landscape windows, such as a dual-screen phone held open, and keep content off the fold using safe-area-corrected pane widths.

_Files:_ `src/navigation/TabNavigator.tsx`, `src/navigation/TabNavigator.android.tsx`, `src/hooks/useWideLayout.ts`, `src/components/SplitAmountLayout.tsx`

### 10. Performance and Optimization

These items are verified in code. I have not quoted any measured numbers because the repository does not record any.

- **Non-blocking startup:** parallel store hydration, cache-first flags and config, background store-version lookup, deferred Crisp initialization, and early return from auth hydration before the profile loads.
- **No visual flashes:** splash handoff timed to font readiness; the navigation theme is derived from the app theme so screen transitions never flash white in dark mode.
- **React Compiler** enabled app-wide for automatic memoization.
- **Targeted cache invalidation** through React Query keys instead of global refetches. Freshness is tuned per query: `staleTime: 0` for card activation state, a longer stale time for payment requests.
- **Network resilience:** request timeouts with user-facing messages, timeout-wrapped balance polling after Privy funding, and an offline blocking modal (NetInfo).
- **Startup instrumentation** with timestamps per stage in development builds.
- `[Optional: add any measured numbers you have, such as cold-start time, crash-free sessions or app size. Do not estimate them.]`

### 11. Final Outcome

Verified from the repository:

- About 100 routed screens across onboarding, payments, funding, crypto, card, rewards and settings.
- About 88,000 lines of TypeScript in `src/`, plus Swift and Kotlin native modules.
- More than 10 regulated or financial third-party SDKs and APIs integrated in one app.
- Nine locales, including RTL Arabic.
- EAS build profiles for development, internal preview, TestFlight and production, with separate OTA channels for preview and production.
- Marketing version 1.9 (iOS build 24) at the time of writing.

`[Add only what you can confirm: store launch date, countries, users, transaction volume, ratings, crash-free rate.]`

### 12. Lessons Learned

- **Patch upstream code openly, and keep the patch small.** `patch-package` let me ship Apple Pay and Android build fixes without forking SDKs. Keeping patches limited to source files (not build output) makes them easier to review and to drop when upstream catches up.
- **Validate everything you cache.** A runtime type guard on cached feature flags costs a few lines and prevents a whole class of "the app won't open after an update" bugs.
- **Let the router own auth boundaries.** Declarative `Stack.Protected` guards replaced hand-written stack resets and removed edge cases around logout and deep links.
- **Treat secure-storage migrations as product work.** Migrating on read, then deleting the legacy key, upgraded existing users silently and without forcing them to log in again.
- **Build native integration scaffolding before credentials arrive.** Card provisioning depends on entitlements and production cards that take weeks to obtain. Having the config plugins and a device-testable PassKit module ready meant integration was not starting from zero when they arrived.
- **What I'd do next:** add automated tests around payment and auth flows, CI checks for lint and type-check, a token-refresh queue (currently any 401 logs the user out), and an OTA runtime-version policy tied to native changes. `[Keep or edit.]`

---

## Part 2: Portfolio Summary (about 150 words)

I built the iOS and Android app for a consumer fintech wallet that lets users hold a USD balance, pay friends and merchants, buy crypto, and fund or withdraw through their bank, all behind a single "dollar" interface with no visible blockchain complexity. The app is built on Expo SDK 58, React Native 0.88 and TypeScript, with Expo Router, TanStack Query and Zustand. It integrates more than ten regulated third-party services, including Privy embedded wallets, Veriff KYC, Plaid, Coinbase Apple Pay, MoonPay, Transak and Rain cards. I designed a startup pipeline that reads from cache and refreshes in the background, a layered security model (Keychain/Keystore vault, PIN lockout, biometric relock, log redaction), and fixes to native SDKs, including a WebView patch that makes Apple Pay work inside the Coinbase checkout. The app has about 100 screens, supports nine languages including RTL Arabic, and ships through EAS Build and OTA update channels.

---

## Part 3: Five LinkedIn-Ready Technical Achievements

1. **Enabled Apple Pay inside a React Native WebView** by patching the native iOS WebView to register Coinbase's message handler without script injection, which unblocked one-tap card funding in the app.
2. **Built a startup pipeline that loads from cache first** for a fintech app with more than ten native SDKs: parallel store hydration, validated cached feature flags, background version checks, and a font-aware splash handoff with no flash on launch.
3. **Migrated about 100 screens from React Navigation to Expo Router** while features kept shipping, replacing manual stack resets with declarative auth guards and isolating deep-link handling from the router.
4. **Designed layered client-side security for a money app:** Keychain/Keystore vault with silent migration from legacy storage, promise-based PIN and biometric confirmation, per-account lockout, background relock, and recursive redaction of card data in logs.
5. **Wrote custom Expo native modules and config plugins** (Swift PassKit, MeaWallet provisioning config for iOS and Android, an install tracker) so restricted native capabilities fit a managed Expo build pipeline.

---

## Part 4: Suggested Screenshots and Diagrams

**Screenshots** (use test accounts only; blur balances, names, card numbers and addresses):

1. Home: balance, quick actions, recent activity.
2. Send flow strip: recipient → amount → review (slide-to-send) → PIN sheet → success.
3. Add-funds method picker showing the bank, Coinbase/Apple Pay, MoonPay and Transak options.
4. Card screen: card controls and the freeze toggle.
5. The same screen in Arabic (RTL) next to English.
6. iOS native tab bar next to the Android custom tab bar.
7. System gates: maintenance and forced-update screens.
8. `[If shipped]` the two-pane amount screen on a wide or foldable display.

**Diagrams:**

1. **Architecture layers:** Screens → React Query hooks → services → Axios client (interceptors) → backend; Zustand stores alongside; third-party SDKs on the edge.
2. **Startup sequence:** native splash → parallel hydration (theme, locale, auth) + fonts → providers → system gate (cached config, then network) → JS splash exit → router redirect.
3. **Auth boundaries:** `index` redirect → `Stack.Protected (auth)` vs `Stack.Protected (app)` → app-unlock overlay after background timeout.
4. **Funding flow:** user → on-ramp (Coinbase WebView / MoonPay / Transak / Plaid) → backend order → status confirmation → balance refetch.
5. **Apple Pay WebView fix:** before/after comparison of script injection vs handler-only registration.

---

## Part 5: Questions to Answer Before Publishing

**Permission and confidentiality**

1. Are you allowed to name the client or product publicly, show its logo or link to the store listing? If not, I can produce a fully anonymized version.
2. Is this employment, contract or agency work? Does an NDA or contract limit portfolio use?
3. May you show real UI screenshots, or must you use redesigned or blurred versions?

**Your role** 4. Commits in this repository are authored as "Adarsh". Is that you, and were you the only mobile engineer? Who else contributed (backend, design, QA, PM)? 5. Did you make the architectural decisions (Expo, Zustand, React Query, the Expo Router migration), or were some given to you? 6. Did you work on the backend or only on the mobile client?

**Status and outcomes** 7. Is the app live on the App Store and Play Store? Since when, and in which countries? 8. Can you share any real metrics: users, transaction volume, ratings, crash-free rate, cold-start time? 9. Has Apple/Google Wallet push provisioning shipped? In the code it is currently commented out, and the PassKit module uses a placeholder payload. 10. Has the Expo Router migration been merged and released? It is on the `feat/expo-router` branch, and the README still describes React Navigation. 11. Has the dual-screen/foldable layout work shipped? It is uncommitted in the working tree.

**Accuracy caveats found during verification. Fix these in code or avoid claiming them:** 12. **Device-compromise detection:** the code `require`s `jail-monkey`, but the package is not in `package.json` or `node_modules`, so the check falls back to "trusted". Don't claim jailbreak/root detection until this is fixed. 13. **Token refresh** is commented out. Any 401 logs the user out. Don't claim "silent token refresh". 14. **Wallet PIN** is stored in the Secure Store vault as plain digits, not hashed. Say "stored in the OS keychain", not "hashed". 15. **No automated tests or CI configuration** exist in this repository. Avoid claiming test coverage. 16. The iOS `aps-environment` entitlement is `development`, and `runtimeVersion` is fixed at `1.0.0`. Confirm how production push and OTA compatibility are handled before describing the release process in detail. 17. Modern Treasury appears only in the README, not in client code I could find. Leave it out unless you integrated it.

**Before you share anything from this repo:** `app.json` contains third-party identifiers (social-SDK app ID and client token, support-chat site ID, Apple Team ID, EAS project ID). I did not include them here; keep them out of screenshots and any public code samples.
