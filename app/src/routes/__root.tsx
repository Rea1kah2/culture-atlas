import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { ClientOnly } from "../components/site/client-only";
import { SmoothScroll } from "../components/site/smooth-scroll";
import { LanguageProvider } from "../lib/i18n/context";
import { getCurrentUser, type SessionUser } from "../lib/api/auth.functions";
// Page metadata (browser <title>/favicon + social og: tags) committed into the
// repo, read at BUILD time — no runtime fetch.
import appMetaJson from "../app-meta.json";

// Culture Atlas defaults — used until app-meta.json's generated cover lands
// (see design-brief.md "Asset plan": cover generation is pending credits).
const DEFAULT_TITLE = "Culture Atlas · Discover Indonesia Beyond the Crowds";
const DEFAULT_DESCRIPTION =
  "Culture Atlas helps travelers find Indonesia's hidden cultural destinations, the villages, festivals, crafts, and flavors that never make the usual itinerary.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

// Own-host zones whose absolute URLs should be relativized (e.g. an og:image
// pointing at this same Worker) — the free Cloudflare Workers subdomain, plus
// any custom domain once one is attached.
const APP_HOST_ZONES = ["workers.dev"];

function toOwnAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const u = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => u.hostname === zone || u.hostname.endsWith(`.${zone}`),
    );
    if (isAppHost) return u.pathname + u.search;
    return value;
  } catch {
    return value;
  }
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = toOwnAssetUrl(meta.og_image_url);
  const favicon = toOwnAssetUrl(meta.favicon_url);
  const ogVideo = toOwnAssetUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#12243f" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Culture Atlas" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...(favicon ? [{ rel: "icon", href: favicon }] : []),
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ca-paper px-6 text-center">
      <span className="ca-eyebrow">Entry not found</span>
      <h1 className="font-display text-4xl font-bold text-ca-ink">
        This page isn&apos;t in the atlas.
      </h1>
      <p className="max-w-md text-ca-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-2 border border-ca-ink px-6 py-3 font-semibold text-ca-ink transition-colors hover:bg-ca-ink hover:text-ca-paper"
      >
        Back to Culture Atlas
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ca-paper px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-ca-ink">This page didn&apos;t load</h1>
      <p className="max-w-md text-ca-ink-soft">
        Something went wrong on our end. You can try refreshing or head back home.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="border border-ca-ink bg-ca-ink px-6 py-3 font-semibold text-ca-paper transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <a
          href="/"
          className="border border-ca-ink px-6 py-3 font-semibold text-ca-ink hover:bg-ca-ink hover:text-ca-paper"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: SessionUser | null;
}>()({
  // Reads the session cookie (if any) once per request/navigation so every
  // route/component below can read `context.user` without fetching it
  // themselves. Never throws — an invalid/expired session just resolves to
  // no user rather than breaking the page.
  beforeLoad: async () => {
    const { user } = await getCurrentUser();
    return { user };
  },
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-ca-paper font-body text-ca-ink">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ClientOnly>
          <SmoothScroll />
        </ClientOnly>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
