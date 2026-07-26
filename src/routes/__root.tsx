import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import flavorCollectionImage from "@/assets/Product/flavor_collection.png";
import lotferoxLogo from "@/assets/Lotferox_logo.png";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://lotferox.com").replace(/\/$/, "");
const PAGE_URL = `${SITE_URL}/`;
const SEO_TITLE = "LoTFerox Nuts | Roasted Makhana Fox Nuts Snacks";
const SEO_DESCRIPTION =
  "LoTFerox Nuts makes roasted makhana fox nuts in 25 gm packs across six snack-smart flavours: Mint Pudina, Himalayan Salt & Pepper, Cream & Onion, Mix Masala, Tomato Tango and Tangy Cheese.";
const SEO_IMAGE = new URL(flavorCollectionImage, PAGE_URL).toString();
const SEO_LOGO = new URL(lotferoxLogo, PAGE_URL).toString();
const FLAVOURS = [
  "Mint Pudina",
  "Himalayan Salt & Pepper",
  "Cream & Onion",
  "Mix Masala",
  "Tomato Tango",
  "Tangy Cheese",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "LoTFerox Nuts",
      url: PAGE_URL,
      logo: SEO_LOGO,
      sameAs: ["https://www.facebook.com/", "https://www.instagram.com/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "LoTFerox Nuts",
      url: PAGE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#roasted-makhana`,
      name: "LoTFerox Nuts Roasted Makhana",
      brand: { "@id": `${SITE_URL}/#organization` },
      category: "Roasted Makhana Fox Nuts Snacks",
      description: SEO_DESCRIPTION,
      image: SEO_IMAGE,
      size: "25 gm",
      keywords: "roasted makhana, fox nuts, vegan snacks, gluten free snacks, roasted not fried",
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#flavours`,
      name: "LoTFerox Makhana Flavours",
      itemListElement: FLAVOURS.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESCRIPTION },
      {
        name: "keywords",
        content:
          "LoTFerox, LoTFerox Nuts, roasted makhana, fox nuts, makhana snacks, 25 gm makhana, Mint Pudina makhana, Tangy Cheese makhana, vegan snacks, gluten free snacks",
      },
      { name: "author", content: "LoTFerox Nuts" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#f7f7f2" },
      { property: "og:site_name", content: "LoTFerox Nuts" },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: SEO_IMAGE },
      { property: "og:image:secure_url", content: SEO_IMAGE },
      { property: "og:image:width", content: "1448" },
      { property: "og:image:height", content: "1086" },
      { property: "og:image:alt", content: "LoTFerox Nuts roasted makhana flavour collection" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO_TITLE },
      { name: "twitter:description", content: SEO_DESCRIPTION },
      { name: "twitter:image", content: SEO_IMAGE },
      { name: "twitter:image:alt", content: "LoTFerox Nuts roasted makhana flavour collection" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: PAGE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" },
    ],
    scripts: [
      {
        tag: "script",
        attrs: { type: "application/ld+json" },
        children: JSON.stringify(structuredData),
      },
    ],
  }),
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
      <body>
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
