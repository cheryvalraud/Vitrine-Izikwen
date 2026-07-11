import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";
import "../globals.css";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101312",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: candidate } = await params;
  if (!isLocale(candidate)) return {};

  const locale = candidate as Locale;
  const { seo } = getDictionary(locale);
  const siteUrl = getSiteUrl();
  const path = `/${locale}`;
  const languageAlternates = Object.fromEntries(
    locales.map((item) => [item, `${siteUrl}/${item}`]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: path,
      languages: { ...languageAlternates, "x-default": `${siteUrl}/en` },
    },
    openGraph: {
      type: "website",
      siteName: "Izikwen",
      locale,
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: path,
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: seo.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [`/${locale}/opengraph-image`],
    },
    robots: { index: true, follow: true },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
