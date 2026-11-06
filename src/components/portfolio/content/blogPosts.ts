import { walletShots } from "./fyntiqWallet";
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    slug: "apple-pay-inside-react-native-webview",
    title: "Making Apple Pay work inside a React Native WebView",
    excerpt:
      "WebKit turns off Apple Pay the moment a WebView injects a script, which is exactly how React Native WebView's message bridge works. Here's how I got a Coinbase checkout with Apple Pay working in Fyntiq Wallet.",
    date: "2026-11-02",
    tags: ["React Native", "iOS", "Apple Pay", "WebView"],
    cover: walletShots.addFunds.src,
    body: [
      {
        type: "p",
        text: "In Fyntiq Wallet, one way to add money is a Coinbase on-ramp checkout that supports Apple Pay. Coinbase serves that checkout as a web page, so in a React Native app it lives in a WebView. On paper that's simple. In practice, the Apple Pay button simply did nothing.",
      },
      { type: "figure", ...walletShots.addFunds, caption: "The add-funds screen in Fyntiq Wallet." },
      { type: "h2", text: "Why Apple Pay disappears" },
      {
        type: "p",
        text: "WebKit disables Apple Pay in any WKWebView that has user scripts injected into it. It's a deliberate security rule: a page that can be modified by the host app shouldn't be trusted with a payment sheet. React Native WebView's postMessage bridge depends on exactly that kind of injected script, so out of the box the two can't coexist.",
      },
      {
        type: "p",
        text: "React Native WebView does have an enableApplePay prop, which turns off script injection. But that also removes the bridge, and there was a second problem: Coinbase's checkout posts its events to a message handler with its own name, which the library never registers. So with Apple Pay on, the app was deaf to the checkout.",
      },
      { type: "h2", text: "The fix: handlers without scripts" },
      {
        type: "p",
        text: "A WKScriptMessageHandler doesn't need an injected script. The page can call window.webkit.messageHandlers.<name>.postMessage directly, as long as the native side has registered that name. So I patched the iOS WebView with patch-package: when enableApplePay is on, it registers message handlers only — the standard one plus Coinbase's — and injects nothing. Both handlers are routed through the existing onMessage callback, so the JavaScript side doesn't need to know the difference.",
      },
      {
        type: "code",
        lang: "objc",
        code: `// Simplified sketch of the patched setup (RNCWebViewImpl.m)
if (_enableApplePay) {
  // No WKUserScripts here: injecting any script disables Apple Pay.
  WKUserContentController *ucc = config.userContentController;
  [ucc addScriptMessageHandler:self name:MessageHandlerName];
  [ucc addScriptMessageHandler:self name:@"cbOnramp"]; // Coinbase's handler
}`,
      },
      {
        type: "p",
        text: "Because it's a patch-package patch, it's a small, readable diff that's reapplied on every install. When the upstream library supports this, the patch can simply be deleted.",
      },
      { type: "h2", text: "Don't trust the redirect" },
      {
        type: "p",
        text: "On the JavaScript side, the checkout modal listens for Coinbase's lifecycle events — load errors, commit errors, and success — and maps error codes to localized messages. When the WebView finally redirects back into the app, the app doesn't treat that as proof of payment. It asks the backend for the order's real status and only then updates the balance.",
      },
      {
        type: "callout",
        text: "A redirect tells you the user finished a flow, not that money moved. In payments, the server is the only source of truth.",
      },
      { type: "h2", text: "Takeaways" },
      {
        type: "list",
        items: [
          "If Apple Pay silently fails in a WebView, check for injected scripts first.",
          "Message handlers and injected scripts are separate mechanisms; you can keep the first without the second.",
          "Keep native patches small and source-only, so they're easy to review and easy to drop.",
          "Always confirm payment state with your API after a web checkout.",
        ],
      },
    ],
  },
  {
    slug: "cache-first-startup-react-native",
    title: "A cache-first startup pipeline for a React Native fintech app",
    excerpt:
      "A dozen SDKs, remote config, fonts and secure storage all want the first second of launch. How I made Fyntiq Wallet start quickly without flashes, wrong languages or a hostage-to-the-network splash screen.",
    date: "2026-10-27",
    tags: ["React Native", "Expo", "Performance", "Architecture"],
    cover: walletShots.splash.src,
    body: [
      {
        type: "p",
        text: "Fyntiq Wallet loads an embedded wallet SDK, Firebase, attribution, support chat, custom fonts, nine locales, secure storage and remote configuration. Early on, startup had two failure modes: render too early and you get a system-font flash or the wrong language; wait for the network and a slow API means users stare at a splash screen. A money app can't afford either.",
      },
      { type: "h2", text: "1. Hydrate in parallel, exactly once" },
      {
        type: "p",
        text: "Theme, locale and auth state are all read from storage, and none depends on the others. They run in parallel behind a single memoized promise, so a re-render during startup can never kick off a second hydration.",
      },
      {
        type: "code",
        lang: "ts",
        code: `let startup: Promise<void> | null = null;

export function initializeStartupStores() {
  startup ??= Promise.all([
    useThemeStore.getState().hydrate(),
    useLocaleStore.getState().hydrate(),
    useAuthStore.getState().hydrate(),
  ]).then(() => undefined);
  return startup;
}`,
      },
      { type: "h2", text: "2. Mark the session ready as early as possible" },
      {
        type: "p",
        text: "Routing only needs to know whether there's a session. So auth hydration marks the session ready as soon as the access token is read, then loads the cached user profile in the background. A session ID check stops a slow profile load from overwriting a newer login or logout that happened in the meantime.",
      },
      { type: "h2", text: "3. Cache first, validate always" },
      {
        type: "p",
        text: "Feature flags and maintenance config are read from cache and refreshed from the network in the background. The important detail: cached values pass through runtime type guards before use. After an app update changes the config shape, or if storage is corrupted, the app falls back to safe defaults instead of crashing on launch.",
      },
      {
        type: "callout",
        text: "TypeScript types disappear at runtime. Anything you read back from storage is 'unknown' until a guard says otherwise.",
      },
      { type: "h2", text: "4. Hand off the splash screen deliberately" },
      {
        type: "list",
        items: [
          "The native splash stays visible until the JavaScript splash has laid out with the brand fonts, so there's never a system-font flash.",
          "The JavaScript splash stays until providers, the system gate and a minimum display time are all ready.",
          "Non-critical SDKs, such as support chat, initialize on the next tick after the app is ready.",
          "The store-version check for forced updates runs in the background with its own timeout, so it never blocks first render.",
        ],
      },
      { type: "figure", ...walletShots.splash, caption: "Fyntiq Wallet's launch screen." },
      { type: "h2", text: "5. Measure every stage" },
      {
        type: "p",
        text: "Finally, a development-only tracer logs a timestamp at each startup stage. Optimizing startup is guesswork without it; with it, the slow SDK or storage read is obvious in the logs.",
      },
      {
        type: "code",
        lang: "ts",
        code: `const t0 = Date.now();
export function logStartupStage(stage: string) {
  if (__DEV__) console.log(\`[startup] +\${Date.now() - t0}ms \${stage}\`);
}`,
      },
    ],
  },
  {
    slug: "secure-storage-migration-react-native",
    title: "Moving tokens to secure storage without logging anyone out",
    excerpt:
      "Early builds kept session data in AsyncStorage. Here's how I moved it to the Keychain and Keystore with a migrate-on-read vault, plus the PIN and biometric layers on top.",
    date: "2026-10-09",
    tags: ["React Native", "Security", "Expo", "Fintech"],
    cover: walletShots.send.src,
    body: [
      {
        type: "p",
        text: "AsyncStorage is convenient and unencrypted. Some early builds of Fyntiq Wallet stored the session and cached profile there. Moving that data to OS-backed secure storage was clearly right — but a forced logout for every existing user, in a money app, is a terrible experience.",
      },
      { type: "h2", text: "Migrate on read" },
      {
        type: "p",
        text: "I wrapped Expo Secure Store (the iOS Keychain and the Android Keystore) in a small vault module. Reads check the secure store first. If the value isn't there but exists in AsyncStorage, the vault copies it across, deletes the legacy copy and returns it. Users upgrade silently the first time the app reads each key.",
      },
      {
        type: "code",
        lang: "ts",
        code: `import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function vaultGet(key: string): Promise<string | null> {
  const secure = await SecureStore.getItemAsync(key);
  if (secure !== null) return secure;

  const legacy = await AsyncStorage.getItem(key);
  if (legacy === null) return null;

  await SecureStore.setItemAsync(key, legacy);
  await AsyncStorage.removeItem(key); // never leave a plaintext copy behind
  return legacy;
}`,
      },
      { type: "h2", text: "Confirmation as a reusable promise" },
      {
        type: "p",
        text: "Every money movement ends with a PIN or biometric check. Rather than wiring that into each screen, a hook exposes it as a promise: the screen awaits confirmation, and the PIN sheet (with an optional Face ID or fingerprint shortcut) resolves or rejects it.",
      },
      { type: "figure", ...walletShots.send, caption: "Slide to send, then confirm with PIN or biometrics." },
      {
        type: "code",
        lang: "ts",
        code: `const confirm = useSensitivePinAuth();

async function onSlideComplete() {
  const ok = await confirm({ reason: "Send $25 to @june123" });
  if (!ok) return;
  await sendPayment.mutateAsync(draft);
}`,
      },
      { type: "h2", text: "The other layers" },
      {
        type: "list",
        items: [
          "Sign-in PIN attempts are limited per phone number, with a timed lockout stored in the vault.",
          "With biometric unlock enabled, the app relocks after a background timeout.",
          "The API client recursively redacts PINs, card numbers and CVVs from development logs.",
          "An expired session signs the user out — but a wrong wallet PIN doesn't, because that would punish a typo with a full logout.",
        ],
      },
      {
        type: "callout",
        text: "Security changes are product changes. The best migration is one users never notice.",
      },
    ],
  },
  {
    slug: "typed-native-modules-react-native",
    title: "Wrapping native SDKs in React Native with a typed contract",
    excerpt:
      "When a vendor only ships Android and iOS SDKs, write the TypeScript interface first. Here's the pattern I use to keep two native implementations in sync.",
    date: "2026-10-18",
    tags: ["React Native", "Native Modules", "TypeScript"],
    body: [
      {
        type: "p",
        text: "Sooner or later every React Native app needs something that only exists natively — a payment terminal SDK, a hardware API, a vendor library with no JavaScript port. The bridge code itself isn't the hard part. Keeping two native implementations behaving identically is.",
      },
      { type: "h2", text: "Start with the contract" },
      {
        type: "p",
        text: "Before writing any Kotlin or Swift, define what JavaScript is allowed to see. Keep it small, promise-based, and model outcomes explicitly instead of throwing for expected cases.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// src/native/Scanner.ts
import { NativeModules, Platform } from "react-native";

export type ScanResult =
  | { status: "ok"; value: string }
  | { status: "cancelled" }
  | { status: "error"; code: "PERMISSION" | "UNSUPPORTED" | "UNKNOWN" };

type ScannerNative = {
  scan(timeoutMs: number): Promise<ScanResult>;
};

const native = NativeModules.Scanner as ScannerNative | undefined;

export async function scan(timeoutMs = 30_000): Promise<ScanResult> {
  if (!native) return { status: "error", code: "UNSUPPORTED" };
  return native.scan(timeoutMs);
}`,
      },
      {
        type: "p",
        text: "Screens import this file, never NativeModules directly. If the module is missing — a simulator, an old build, a platform you haven't implemented yet — the app degrades gracefully instead of crashing on undefined.",
      },
      { type: "h2", text: "Map native errors at the boundary" },
      {
        type: "p",
        text: "Each native side catches its SDK's exceptions and converts them to the same small set of codes. Don't let raw Java exception messages or NSError domains leak into JavaScript — they differ per platform and make UI logic brittle.",
      },
      {
        type: "code",
        lang: "kotlin",
        code: `@ReactMethod
fun scan(timeoutMs: Double, promise: Promise) {
  try {
    val value = sdk.scan(timeoutMs.toLong())
    promise.resolve(Arguments.createMap().apply {
      putString("status", "ok")
      putString("value", value)
    })
  } catch (e: UserCancelledException) {
    promise.resolve(Arguments.createMap().apply { putString("status", "cancelled") })
  } catch (e: SecurityException) {
    promise.resolve(errorMap("PERMISSION"))
  } catch (e: Exception) {
    promise.resolve(errorMap("UNKNOWN"))
  }
}`,
      },
      {
        type: "callout",
        text: "Notice the module resolves rather than rejects for expected outcomes. Reserve rejections for genuine bugs, so a try/catch in JavaScript means 'something is broken', not 'the user pressed cancel'.",
      },
      { type: "h2", text: "Checklist before you ship" },
      {
        type: "list",
        items: [
          "Every method is called on the right thread (UI work on main, heavy work off it).",
          "Both platforms return identical shapes for every outcome.",
          "Permissions are requested and explained before the SDK needs them.",
          "The JS wrapper handles a missing module without crashing.",
          "Release builds are tested — ProGuard/R8 can strip classes the SDK relies on.",
        ],
      },
    ],
  },
  {
    slug: "deep-linking-react-native-checklist",
    title: "Deep linking in React Native: the parts that actually break",
    excerpt:
      "Universal links, App Links, cold starts, and auth-gated screens. A practical checklist from shipping referral and in-app browser flows.",
    date: "2026-09-02",
    tags: ["React Native", "Deep Linking", "iOS", "Android"],
    body: [
      {
        type: "p",
        text: "Getting a deep link to open your app in development takes ten minutes. Getting it to work reliably in production — from a cold start, behind a login screen, on both platforms — takes considerably longer. These are the places it usually goes wrong.",
      },
      { type: "h2", text: "1. Verify your domains properly" },
      {
        type: "list",
        items: [
          "iOS: apple-app-site-association must be served over HTTPS at /.well-known/, with no redirects and the correct content type.",
          "Android: assetlinks.json must include the SHA-256 fingerprint of your release signing key — including the Play App Signing key, not just your upload key.",
          "Add android:autoVerify=\"true\" to the intent filter, or Android will show a chooser instead of opening your app.",
        ],
      },
      { type: "h2", text: "2. Handle cold starts and warm starts" },
      {
        type: "p",
        text: "A link that arrives while the app is closed comes through getInitialURL; one that arrives while it's running comes through an event listener. You need both.",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { Linking } from "react-native";
import { useEffect } from "react";

export function useDeepLinks(onUrl: (url: string) => void) {
  useEffect(() => {
    Linking.getInitialURL().then((url) => url && onUrl(url));
    const sub = Linking.addEventListener("url", ({ url }) => onUrl(url));
    return () => sub.remove();
  }, [onUrl]);
}`,
      },
      { type: "h2", text: "3. Don't lose the link at the login screen" },
      {
        type: "p",
        text: "If a signed-out user taps a referral link, the app shows the login screen — and the link is gone. Store the pending URL, let authentication finish, then navigate. React Navigation's linking config handles routing, but holding the link through auth is your job.",
      },
      {
        type: "callout",
        text: "Treat a pending deep link as state. Save it on arrival, clear it after navigation, and test the signed-out path every release.",
      },
      { type: "h2", text: "4. Test the real thing" },
      {
        type: "list",
        items: [
          "Test from Notes, Messages, email, and a browser — they behave differently.",
          "Test release builds signed with production keys.",
          "Test with the app killed, backgrounded, and in the foreground.",
          "Test with the user logged out.",
        ],
      },
    ],
  },
  {
    slug: "app-store-play-store-release-checklist",
    title: "My App Store and Google Play release checklist",
    excerpt:
      "Signing, versioning, privacy labels, and the small things that cause rejections. The list I run through before every production release.",
    date: "2026-07-21",
    tags: ["Release", "App Store", "Google Play", "DevOps"],
    body: [
      {
        type: "p",
        text: "Most store rejections and broken releases come from the same handful of mistakes. After shipping a number of apps to both stores, I keep a checklist and run through it every time, even for small updates.",
      },
      { type: "h2", text: "Versioning" },
      {
        type: "list",
        items: [
          "Bump the user-facing version (versionName / CFBundleShortVersionString) when the release contains visible changes.",
          "Always increment the build number (versionCode / CFBundleVersion) — stores reject duplicates.",
          "Tag the commit in Git so every build maps back to source.",
        ],
      },
      { type: "h2", text: "Signing" },
      {
        type: "list",
        items: [
          "Android: build a signed AAB with the upload key; confirm Play App Signing is enabled.",
          "iOS: check the distribution certificate and provisioning profile haven't expired.",
          "Never commit keystores or .p12 files — keep them in CI secrets.",
        ],
      },
      { type: "h2", text: "Privacy and compliance" },
      {
        type: "list",
        items: [
          "App Store privacy labels and Play Data safety form match what the app — and every SDK in it — actually collects.",
          "Every permission has a clear, specific usage description string on iOS.",
          "Account deletion is available in-app if users can create accounts.",
          "A demo account and notes are provided for reviewers when login is required.",
        ],
      },
      {
        type: "callout",
        text: "Third-party SDKs are the most common source of privacy-label mismatches. Audit what each SDK collects, not just what your own code does.",
      },
      { type: "h2", text: "Before you press submit" },
      {
        type: "list",
        ordered: true,
        items: [
          "Smoke-test the exact release build on a real device for each platform.",
          "Confirm crash reporting (Crashlytics or Sentry) receives events from the release build.",
          "Upload source maps / dSYMs so production crashes are readable.",
          "Use a staged rollout on Google Play and phased release on the App Store.",
          "Watch crash-free rate for the first 24–48 hours before widening the rollout.",
        ],
      },
    ],
  },
];

export const sortedBlogPosts = [...blogPosts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
