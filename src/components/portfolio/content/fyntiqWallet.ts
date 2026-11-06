import type { CaseStudy, Screenshot } from "./types";

const shot = (file: string, alt: string, caption: string): Screenshot => ({
  src: `/projects/fyntiq-wallet/${file}`,
  alt,
  caption,
  width: 600,
  height: 1299,
});

export const walletShots = {
  splash: shot(
    "splash.jpg",
    "Fyntiq Wallet launch screen with the tagline 'Shop. Earn. Send & receive.'",
    "Launch screen",
  ),
  home: shot(
    "home.jpg",
    "Fyntiq Wallet home screen showing the USD balance, card details, quick actions and rewards",
    "Home: balance, card and quick actions",
  ),
  send: shot(
    "send-payment.jpg",
    "Payment review screen with amount, fee and note, confirmed with a slide-to-send control",
    "Review and slide-to-send",
  ),
  addFunds: shot(
    "add-funds.jpg",
    "Add funds screen offering Apple Pay, Google Pay, debit or credit card with a USD to USDC conversion summary",
    "Add funds with Apple Pay, Google Pay or card",
  ),
  rewards: shot(
    "rewards.jpg",
    "Rewards screen showing cashback earned this month, all-time and pending totals, and recent rewards",
    "Cashback rewards",
  ),
  receive: shot(
    "receive.jpg",
    "Receive screen with a personal QR code and shareable payment handle",
    "Receive by QR code or link",
  ),
} as const;

export const fyntiqWalletCaseStudy: CaseStudy = {
  slug: "fyntiq-wallet",
  title: "Fyntiq Wallet: a consumer fintech wallet built from scratch in React Native",
  client: "Fyntiq Wallet",
  category: "Fintech · Payments",
  summary:
    "I built the iOS and Android app from the first commit: a USD wallet where people pay friends and merchants, earn cashback, buy crypto and move money to and from their bank, without ever seeing a wallet address, a chain or a gas fee.",
  role: "Lead mobile engineer — architecture, every client feature and native integration, release pipeline",
  platforms: "Android & iOS",
  stack: [
    "React Native",
    "Expo",
    "TypeScript",
    "Expo Router",
    "TanStack Query",
    "Zustand",
    "Privy",
    "Swift",
    "Kotlin",
  ],
  screenshots: [
    walletShots.home,
    walletShots.send,
    walletShots.addFunds,
    walletShots.receive,
    walletShots.rewards,
    walletShots.splash,
  ],
  links: {
    playStore:
      "https://play.google.com/store/apps/details?id=com.fyntiq.wallet",
    appStore: "https://apps.apple.com/us/app/fyntiq-wallet/id6779112642",
  },
  highlights: [
    { label: "Scale", value: "~100 screens, ~88k lines of TypeScript" },
    { label: "Integrations", value: "10+ financial SDKs and APIs" },
    { label: "Languages", value: "9 locales, including RTL Arabic" },
  ],
  body: [
    { type: "h2", text: "Overview" },
    {
      type: "p",
      text: "Fyntiq Wallet is a consumer wallet for everyday spending. Users hold a USD balance (backed by USDC on the Base network), send and request money, pay merchants by scanning a QR code, earn cashback and referral rewards, buy and sell crypto, and move money between the app and their bank. A Visa debit card program issued through Rain is integrated, with card controls and statements.",
    },
    {
      type: "p",
      text: "I built the mobile app from scratch as the lead mobile engineer, working alongside the backend developer. It is a single TypeScript codebase on Expo and React Native that ships to the App Store and Google Play, with around 100 routed screens and support for nine languages, including right-to-left Arabic.",
    },
    { type: "h2", text: "The problem" },
    {
      type: "p",
      text: "Moving money between bank accounts, cards, crypto and other people usually means juggling several apps, each with its own sign-up and identity check. The product goal was to hide all of that behind one familiar dollar balance. That made for a demanding mobile brief:",
    },
    {
      type: "list",
      items: [
        "Many regulated third parties — identity verification, bank linking, card issuing, fiat on-ramps and an embedded wallet — each with its own native SDK, auth model and failure modes, all needing to feel like one product.",
        "The security expectations of a banking app: careful session handling, PIN and biometric confirmation for sensitive actions, and no sensitive data in logs.",
        "Startup reliability: a money app that flashes a blank screen, the wrong font or a stale maintenance banner loses trust immediately.",
        "Two platforms with different native rules: Apple Pay inside a WebView, Apple Wallet entitlements and Android Gradle conflicts all needed platform-specific work.",
      ],
    },
    { type: "h2", text: "Architecture" },
    {
      type: "p",
      text: "The app runs on Expo with a custom dev client (the number of native SDKs rules out Expo Go), React Native and strict TypeScript, with the React Compiler enabled for automatic memoization across a large screen tree.",
    },
    {
      type: "list",
      items: [
        "Screens never call the network directly. Typed service functions wrap Axios, and TanStack Query hooks per domain (payments, crypto, card, referrals, notifications) sit on top. A push notification invalidates only the queries it affects.",
        "Zustand holds only client state: session, theme, locale, feature flags and multi-step flow state. Server data stays in the query cache.",
        "Expo Router route groups act as security boundaries. The signed-out and signed-in groups sit behind Stack.Protected guards driven by the auth store, so logging in or out swaps the whole navigation tree with no hand-written reset logic.",
        "Local Expo native modules in Swift and Kotlin, config plugins, and small patch-package fixes keep restricted native capabilities inside a managed Expo build pipeline.",
      ],
    },
    { type: "h2", text: "What I built" },
    { type: "h3", text: "Onboarding and identity" },
    {
      type: "list",
      items: [
        "Phone and email OTP sign-in with a server-driven resend cooldown, part of the defence against SMS-pumping fraud.",
        "Country-based sign-up with a waitlist for unsupported regions.",
        "Veriff KYC, prompted before any gated action.",
        "A Privy embedded Ethereum wallet created automatically for every user at login, with no seed phrase to manage.",
      ],
    },
    { type: "h3", text: "Moving money" },
    {
      type: "list",
      items: [
        "Send, request and receive by username or QR code, plus scan-to-pay merchant checkout.",
        "A slide-to-send confirmation followed by a PIN or biometric check before anything is submitted.",
        "Adding funds through Plaid- or MX-linked bank accounts, Coinbase with Apple Pay, MoonPay or Transak, with a clear fee breakdown and processing states.",
        "Withdrawals to linked or manually added bank accounts, and crypto holdings with price charts, buy, sell and deposit flows.",
      ],
    },
    { type: "h3", text: "Card and account" },
    {
      type: "list",
      items: [
        "Card activation, PIN set and change, freeze and unfreeze, lost-card reporting, replacement, controls and monthly statements.",
        "USD account details and statements generated as PDFs on the device.",
        "A referral program using AppsFlyer OneLink deep links, a notifications centre, security settings, and in-app support chat.",
        "System gates for maintenance mode, forced updates checked against the live store version, and an offline blocking screen.",
      ],
    },
    { type: "h2", text: "Hard problems and how I solved them" },
    { type: "h3", text: "1. Starting fast with a dozen SDKs competing for launch" },
    {
      type: "p",
      text: "Privy, Firebase, AppsFlyer, support chat, fonts, locale, secure storage and remote config all compete for the first second of launch. Rendering too early produced a font flash or the wrong language. Waiting for the network made the app hostage to a slow API. I built a cache-first startup pipeline:",
    },
    {
      type: "list",
      items: [
        "Theme, locale and auth hydration run in parallel behind a memoized promise, so re-renders can never start hydration twice.",
        "The session is marked ready as soon as the access token is read; the cached profile loads afterwards, with a session ID check so a late load can't overwrite a newer login or logout.",
        "Feature flags and maintenance config are read from cache first and refreshed from the network, and cached values pass runtime type guards so a corrupt cache can't crash startup.",
        "The native splash stays up until the JavaScript splash has laid out with brand fonts, removing the system-font flash. Non-critical SDKs initialize after the app is ready.",
        "A development-only tracer timestamps each startup stage, which made slow SDKs and storage reads easy to find.",
      ],
    },
    {
      type: "code",
      lang: "ts",
      code: `// Simplified: read cached config first, but never trust its shape.
function isSystemConfig(value: unknown): value is SystemConfig {
  return (
    typeof value === "object" && value !== null &&
    typeof (value as SystemConfig).maintenance === "boolean" &&
    typeof (value as SystemConfig).minVersion === "string"
  );
}

export async function loadSystemConfig(): Promise<SystemConfig> {
  const cached = await readCache("system-config");
  const config = isSystemConfig(cached) ? cached : DEFAULT_CONFIG;
  void refreshSystemConfigInBackground(); // network result applies on arrival
  return config;
}`,
    },
    { type: "figure", ...walletShots.addFunds, caption: "Add funds: Apple Pay runs inside the Coinbase checkout WebView." },
    { type: "h3", text: "2. Making Apple Pay work inside a WebView" },
    {
      type: "p",
      text: "The Coinbase on-ramp runs in a WebView, and WebKit disables Apple Pay in any WKWebView that injects user scripts. React Native WebView's message bridge works by injecting a script, and Coinbase's checkout also posts events to its own message handler name, which the library didn't register.",
    },
    {
      type: "p",
      text: "I patched the iOS WebView with patch-package so that, when Apple Pay is enabled, it registers message handlers only and injects no scripts. It also registers Coinbase's handler and routes it through the normal onMessage path. On the JavaScript side, the checkout maps Coinbase lifecycle and error events to localized messages, and when the WebView redirects back, the app confirms the final order status with the API instead of trusting the redirect.",
    },
    { type: "h3", text: "3. Native build conflicts between SDKs" },
    {
      type: "p",
      text: "On Android, the Veriff SDK's BouncyCastle artifacts clashed with other cryptography dependencies, and AppsFlyer's module broke on newer Android Gradle Plugin defaults. Small, source-only patch-package fixes resolve both and are reapplied on every install, so there was no need to fork either SDK.",
    },
    { type: "h3", text: "4. Card push provisioning before production credentials" },
    {
      type: "p",
      text: "Adding a card to Apple Wallet from inside an app requires a restricted entitlement, production cards (Visa has no sandbox) and encrypted payloads from the issuer, all of which take weeks to arrive. I didn't wait: I wrote Expo config plugins that inject the MeaWallet provisioning configuration into the iOS and Android projects at prebuild, and a local Swift module around PKAddPaymentPassViewController that handles capability checks and tells user cancellation apart from failure. With a placeholder payload, the team can exercise the native Add to Apple Wallet sheet on a real device. The end-to-end provisioning flow is still in progress.",
    },
    { type: "figure", ...walletShots.send, caption: "Every transfer ends with slide-to-send, then a PIN or biometric check." },
    { type: "h3", text: "5. Layered client security" },
    {
      type: "list",
      items: [
        "A vault wrapper over Expo Secure Store keeps tokens and the cached profile in the iOS Keychain and Android Keystore. Data from older builds is migrated out of AsyncStorage on first read and the legacy copy deleted, so existing users were upgraded without being logged out.",
        "Sensitive actions go through a promise-based PIN sheet with an optional biometric shortcut, keeping the confirmation step out of each screen's logic.",
        "Sign-in PIN attempts are limited per phone number, with a lockout after repeated failures.",
        "The app relocks after a background timeout when biometric unlock is on.",
        "The API client recursively redacts PINs, card numbers, CVVs and card secrets from development logs, and signs the user out on an expired session — except for wallet-PIN failures, which must not end the session.",
      ],
    },
    { type: "h3", text: "6. Moving to file-based routing while shipping features" },
    {
      type: "p",
      text: "The app started on React Navigation with manually keyed auth and app stacks. I moved it to Expo Router incrementally: each route file is a thin re-export of an existing screen, so the migration changed routing, not features. A native-intent handler stops referral, OneLink, OAuth and wallet URLs (which have their own listeners) from triggering router navigation, notification taps are deduplicated and wait for the router to be ready, and typed routes turn broken navigation targets into compile errors.",
    },
    { type: "h3", text: "7. Navigation that feels native on each platform" },
    {
      type: "p",
      text: "iOS uses native tabs — a real UITabBar with SF Symbols, which adapts to a sidebar on wide windows — and the Scan tab opens the scanner without becoming a history entry. Android uses a custom tab bar with a central Scan button. Platform-specific files select the right navigator with no runtime branching.",
    },
    { type: "h2", text: "Outcome" },
    {
      type: "list",
      items: [
        "Live on the App Store and Google Play.",
        "Around 100 routed screens covering onboarding, payments, funding, crypto, card, rewards and settings.",
        "More than ten regulated or financial third-party SDKs and APIs working together in one app.",
        "Nine locales, including right-to-left Arabic.",
        "EAS build profiles for development, internal preview, TestFlight and production, with separate over-the-air update channels.",
      ],
    },
    { type: "h2", text: "Lessons" },
    {
      type: "list",
      items: [
        "Patch upstream code openly, and keep the patch small. Source-only patches are easy to review and easy to drop when upstream catches up.",
        "Validate everything you cache. A runtime type guard is a few lines and prevents a whole class of 'the app won't open after an update' bugs.",
        "Let the router own auth boundaries. Declarative guards removed a whole set of logout and deep-link edge cases.",
        "Treat storage migrations as product work: migrate on read, delete the legacy key, and nobody gets logged out.",
        "Build native scaffolding before credentials arrive, so integration doesn't start from zero when they do.",
      ],
    },
    {
      type: "callout",
      text: "Next on my list: automated tests around payment and auth flows, CI checks for lint and type-checking, a token-refresh queue so an expired session can recover silently, and a runtime-version policy tied to native changes for OTA updates.",
    },
  ],
};
