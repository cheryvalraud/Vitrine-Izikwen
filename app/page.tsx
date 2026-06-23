import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ValueCards from "@/components/ValueCards";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfffd] text-slate-950">
      <Navbar />
      <Hero />
      <ValueCards />
      <HowItWorks />
      <Footer />
    </main>
  );
}
