import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import SupportedAssets from "@/components/SupportedAssets";
import TrustSecurity from "@/components/TrustSecurity";
import WhyIzikwen from "@/components/WhyIzikwen";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f2ea] text-[#07111f]">
      <Navbar />
      <Hero />
      <TrustSecurity />
      <HowItWorks />
      <SupportedAssets />
      <WhyIzikwen />
      <FAQ />
      <Footer />
    </main>
  );
}
