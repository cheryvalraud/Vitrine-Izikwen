import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Mission from "@/components/Mission";
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";
import SiteAnimations from "@/components/SiteAnimations";
import SupportedAssets from "@/components/SupportedAssets";
import TrustSecurity from "@/components/TrustSecurity";
import { getDictionary, isLocale } from "@/lib/i18n";
import { contactEmail, getSiteUrl } from "@/lib/site";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getDictionary(locale);
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Izikwen",
        url: siteUrl,
        email: contactEmail,
        logo: `${siteUrl}/images/izikwen-logo-mark.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Izikwen",
        url: siteUrl,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebApplication",
        name: "Izikwen",
        applicationCategory: "FinanceApplication",
        description: copy.seo.description,
        url: `${siteUrl}/${locale}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#content">{copy.nav.skip}</a>
      <SiteAnimations />
      <Navbar locale={locale} copy={copy.nav} />
      <main id="content" className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#101312]">
        <Hero locale={locale} copy={copy.hero} />
        <ProductShowcase copy={copy.showcase} />
        <HowItWorks copy={copy.how} />
        <TrustSecurity copy={copy.trust} />
        <SupportedAssets copy={copy.assets} />
        <Mission copy={copy.mission} />
        <FAQ copy={copy.faq} />
        <FinalCTA locale={locale} copy={copy.cta} />
      </main>
      <Footer locale={locale} copy={copy.footer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
