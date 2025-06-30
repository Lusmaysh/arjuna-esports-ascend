
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TournamentShowcase from '@/components/TournamentShowcase';
import StorySection from '@/components/StorySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <TournamentShowcase />
        <StorySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
