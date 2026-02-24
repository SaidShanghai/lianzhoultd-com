import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StrategySection from "@/components/StrategySection";
import VideoSection from "@/components/VideoSection";
import SupplyChainSection from "@/components/SupplyChainSection";
import DigitalPlatformSection from "@/components/DigitalPlatformSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StrategySection />
        <SupplyChainSection />
        <DigitalPlatformSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
