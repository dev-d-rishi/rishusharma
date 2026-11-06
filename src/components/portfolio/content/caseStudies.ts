import { fyntiqWalletCaseStudy } from "./fyntiqWallet";
import type { CaseStudy, Screenshot } from "./types";

const wooftagShot = (
  file: string,
  alt: string,
  caption: string,
): Screenshot => ({
  src: `/projects/wooftag/${file}`,
  alt,
  caption,
  width: 600,
  height: 1067,
});

const wooftagShots = {
  location: wooftagShot(
    "scan-location.jpg",
    "Wooftag screen showing a map pin and GPS coordinates shared when a pet's tag was scanned",
    "Location shared on scan",
  ),
  alerts: wooftagShot(
    "alerts.jpg",
    "Lock screen with Wooftag push notifications and a GPS alert email after a tag scan",
    "Push and email alerts",
  ),
  history: wooftagShot(
    "scan-history.jpg",
    "Notifications list showing each time the pet's Wooftag was scanned",
    "Real-time scan history",
  ),
  home: wooftagShot(
    "home.jpg",
    "Wooftag home screen listing the owner's pets with an option to add another",
    "All pets in one place",
  ),
  profile: wooftagShot(
    "pet-profile.jpg",
    "Pet profile with photo, breed, weight, sex and age",
    "Personalised pet profiles",
  ),
  details: wooftagShot(
    "profile-details.jpg",
    "Profile editor for phone numbers, addresses, behaviour and health information",
    "Contact, behaviour and health details",
  ),
  tags: wooftagShot(
    "tags.jpg",
    "List of a pet's linked Wooftags with toggles to enable each tag",
    "Manage and activate tags",
  ),
};

/** Every case study, including hidden drafts. Set `hidden: false` to publish one. */
export const allCaseStudies: CaseStudy[] = [
  fyntiqWalletCaseStudy,
  {
    slug: "wooftag-qr-pet-identity",
    title: "Wooftag: QR pet tags with real-time location alerts",
    client: "Wooftag",
    category: "Consumer · Community",
    summary:
      "Designing a scan-to-alert flow that gets a lost pet's location to its owner in seconds — no microchip scanner, no app install required for the finder.",
    role: "React Native Developer — feature development, maps, notifications",
    platforms: "Android & iOS",
    stack: [
      "React Native",
      "Google Maps",
      "GPS / Location",
      "Push Notifications",
      "REST APIs",
    ],
    imageSrc: "/projects/wooftag.png",
    screenshots: [
      wooftagShots.location,
      wooftagShots.alerts,
      wooftagShots.history,
      wooftagShots.home,
      wooftagShots.profile,
      wooftagShots.details,
      wooftagShots.tags,
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.wooftag",
      appStore: "https://apps.apple.com/us/app/wooftag/id6467188257",
    },
    highlights: [
      { label: "Finder flow", value: "Scan a QR, no install" },
      { label: "Owner alert", value: "Push + email with coordinates" },
      { label: "Maps", value: "Live GPS sharing" },
    ],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Microchips only help once a lost pet reaches a vet or shelter with a scanner. Most pets are found by ordinary people on the street who have no way to read a chip. Wooftag set out to make every pet identifiable by anyone with a phone camera.",
      },
      { type: "h2", text: "The core flow" },
      {
        type: "list",
        ordered: true,
        items: [
          "A finder scans the QR code on the pet's tag with any camera app.",
          "They see the pet's public profile and the owner's chosen contact options.",
          "With permission, the finder's location is captured at the moment of the scan.",
          "The owner instantly receives a push notification and an email containing live coordinates.",
          "The owner opens the location on a map inside the app and can coordinate pickup.",
        ],
      },
      { type: "h2", text: "Key engineering decisions" },
      {
        type: "figure",
        ...wooftagShots.location,
        caption: "What the owner sees seconds after their pet's tag is scanned.",
      },
      { type: "h3", text: "Location as a moment, not a stream" },
      {
        type: "p",
        text: "For the finder, we capture a single high-accuracy fix at scan time rather than tracking continuously. It's faster, kinder to battery, and much easier to explain in a permission prompt — which directly affects how many finders say yes.",
      },
      { type: "h3", text: "Redundant alert channels" },
      {
        type: "p",
        text: "A push notification can be missed or disabled, so every scan also triggers an email with the same coordinates. The owner gets the information on whichever channel reaches them first.",
      },
      {
        type: "figure",
        ...wooftagShots.alerts,
        caption: "The same scan arrives as a push notification and as an email.",
      },
      { type: "h3", text: "Maps that work with real-world data" },
      {
        type: "p",
        text: "Google Maps integration handles the owner's view of scan locations and real-time GPS sharing. Markers, permission states, and the 'location unavailable' case were all designed explicitly, because a blank map during an emergency is the worst possible UX.",
      },
      { type: "h2", text: "Outcome" },
      {
        type: "p",
        text: "Wooftag shipped on both the App Store and Google Play with QR-based identification, map-based location sharing, and push and email alerts working end to end.",
      },
      {
        type: "callout",
        text: "Designing for the stressed user — the owner who just lost their dog — shaped every decision: fewer taps, redundant alerts, and no empty states without an explanation.",
      },
    ],
  },
  {
    slug: "fyntiq-business-tap-to-pay",
    hidden: true,
    title: "Bringing Tap to Pay to a React Native merchant app",
    client: "Fyntiq Business",
    category: "Fintech · Payments",
    summary:
      "How we turned a phone into a payment terminal by wrapping Adyen's native Android and iOS SDKs in custom React Native modules — without giving up a single shared TypeScript codebase.",
    role: "React Native Developer — mobile architecture, native modules, release",
    platforms: "Android & iOS",
    stack: [
      "React Native",
      "TypeScript",
      "Adyen SDK",
      "Kotlin",
      "Swift",
      "Native Modules",
    ],
    status: "Tap to Pay in progress",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.fyntiq.app",
      appStore: "https://apps.apple.com/us/app/fyntiq-business/id6771384221",
    },
    highlights: [
      { label: "Core flows", value: "Invoices, payment links, multi-business" },
      { label: "Payments", value: "Multi-provider integration" },
      { label: "Native work", value: "Kotlin + Swift bridges" },
    ],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Fyntiq Business lets merchants generate invoices, share secure payment links, and track transactions across multiple business accounts. The next step was in-person payments: letting a merchant accept a contactless card directly on their phone, with no extra hardware.",
      },
      {
        type: "p",
        text: "Tap to Pay on Phone is only exposed through Adyen's native Android and iOS SDKs. There is no JavaScript API, so the React Native app needed a native layer that could talk to both SDKs while keeping the product logic in one shared codebase.",
      },
      { type: "h2", text: "Constraints" },
      {
        type: "list",
        items: [
          "Two very different native SDKs with different lifecycles, permissions, and error models.",
          "Payment state must never be ambiguous — a merchant needs a definitive success or failure.",
          "App Store privacy and payment compliance requirements had to be met on every release.",
          "Existing payment-link and invoice flows had to keep working untouched.",
        ],
      },
      { type: "h2", text: "Approach" },
      { type: "h3", text: "One JavaScript contract, two native implementations" },
      {
        type: "p",
        text: "I started by designing the TypeScript interface first — the shape the rest of the app would depend on — and then implemented it twice: once in Kotlin, once in Swift. Screens only ever see a typed, promise-based API, so the payment UI doesn't care which platform it's running on.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export type TapToPayResult =
  | { status: "approved"; pspReference: string }
  | { status: "declined"; reason: string }
  | { status: "cancelled" };

export interface TapToPayModule {
  isSupported(): Promise<boolean>;
  prepare(sessionToken: string): Promise<void>;
  startPayment(amountMinor: number, currency: string): Promise<TapToPayResult>;
}`,
      },
      { type: "h3", text: "Modelling payment state explicitly" },
      {
        type: "p",
        text: "Instead of booleans and loose error strings, every payment resolves to a discriminated union. Native exceptions are mapped to a small set of known outcomes at the bridge boundary, which keeps the React side simple and makes every state renderable.",
      },
      { type: "h3", text: "Isolating the feature" },
      {
        type: "p",
        text: "The Tap to Pay entry point is gated behind a capability check (device support, OS version, merchant eligibility). Unsupported devices fall back to the existing payment-link flow, so nothing regresses for merchants who can't use it yet.",
      },
      { type: "h2", text: "What shipped so far" },
      {
        type: "list",
        items: [
          "Invoice generation and secure payment link sharing in production on both stores.",
          "Multi-business account management with real-time transaction tracking.",
          "Multi-provider payment integration that passed App Store privacy review.",
          "Native module scaffolding and typed bridge contract for Tap to Pay, currently being integrated.",
        ],
      },
      { type: "h2", text: "Lessons" },
      {
        type: "callout",
        text: "Write the TypeScript contract before touching Kotlin or Swift. It forces you to decide what the product actually needs from the SDK, and it keeps two native implementations honest.",
      },
    ],
  },
  {
    slug: "honda-disha-portal",
    hidden: true,
    title: "Honda Disha Portal: a multilingual app built for low bandwidth",
    client: "Honda (HMSI)",
    category: "Automotive · Enterprise",
    summary:
      "Building a React Native app for Honda dealers, transporters, and HMSI staff that stays usable on slow networks and speaks the user's language.",
    role: "React Native Developer — app development, state management, API integration",
    platforms: "Android & iOS",
    stack: ["React Native", "Redux Toolkit", "REST APIs", "Multilingual"],
    imageSrc: "/projects/disha.png",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.dishaportal",
      appStore: "https://apps.apple.com/in/app/disha-portal/id6749362362",
    },
    highlights: [
      { label: "Users", value: "Dealers, transporters, HMSI" },
      { label: "Network", value: "Optimized for low bandwidth" },
      { label: "Language", value: "Multilingual UI" },
    ],
    body: [
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Disha Portal serves three very different groups — dealers, transporters, and internal HMSI users — many of whom work on patchy mobile networks and prefer to use the app in their own language. A heavy, English-only app wasn't going to work.",
      },
      { type: "h2", text: "What the app does" },
      {
        type: "list",
        items: [
          "Secure authentication with role-aware access for each user type.",
          "Showroom locator for finding nearby dealerships.",
          "Vehicle booking enquiries submitted directly from the app.",
          "Load change request workflows for transport and logistics.",
        ],
      },
      { type: "h2", text: "Designing for low bandwidth" },
      {
        type: "p",
        text: "Every screen was built assuming the network is slow or about to drop. That meant small payloads, cached reference data, and clear loading and retry states instead of spinners that never end.",
      },
      {
        type: "list",
        items: [
          "Redux Toolkit for predictable, cache-friendly state across screens.",
          "Reference data (locations, lists) cached so repeat visits don't refetch.",
          "Explicit retry affordances on failed requests rather than silent failures.",
          "Lightweight screens and assets to keep startup and navigation fast.",
        ],
      },
      { type: "h2", text: "Multilingual from the start" },
      {
        type: "p",
        text: "All user-facing copy lives in translation files, and layouts were checked against longer strings so labels don't truncate or overflow when the language changes. Adding a language is a content task, not a code change.",
      },
      { type: "h2", text: "Outcome" },
      {
        type: "p",
        text: "Disha Portal is live on both the App Store and Google Play, giving Honda's dealer and transport network one app for enquiries, locating showrooms, and managing load change requests.",
      },
      {
        type: "callout",
        text: "Treat the slow network as the default case, not an edge case. If the app feels good on 3G, it feels great everywhere else.",
      },
    ],
  },
];

/** Case studies shown on the site. */
export const caseStudies = allCaseStudies.filter((c) => !c.hidden);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
