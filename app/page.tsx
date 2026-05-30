import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SplitProducts from "@/components/SplitProducts";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <SplitProducts />
      <Faq />
      <Footer />
    </main>
  );
}
