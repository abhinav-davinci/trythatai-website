import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AlonJourney from "@/components/AlonJourney";
import RealtorSection from "@/components/RealtorSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <AlonJourney />
      <RealtorSection />
      <Faq />
      <Footer />
    </main>
  );
}
