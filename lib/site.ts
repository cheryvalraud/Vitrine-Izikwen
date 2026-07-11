const DEFAULT_SITE_URL = "https://izikwen.com";

export const contactEmail = "contact@izikwen.com";

export function getSiteUrl(): string {
  const configured = process.env.SITE_URL?.trim() || DEFAULT_SITE_URL;

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return DEFAULT_SITE_URL;
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function accessMailto(locale: string): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(`Izikwen access request (${locale})`)}`;
}

export function contactMailto(locale: string): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(`Izikwen contact (${locale})`)}`;
}

