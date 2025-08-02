
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TournamentShowcase from '@/components/TournamentShowcase';
import StorySection from '@/components/StorySection';
import Footer from '@/components/Footer';
import { useResourcePreloader, useRoutePrefetch } from "@/hooks/useResourcePreloader";

const Dashboard = () => {
  // Preload critical resources
  useResourcePreloader([
    { href: '/placeholder.svg', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
  ]);

  // Prefetch likely next routes
  useRoutePrefetch(['Tournaments', 'Community', 'TournamentServices']);

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

export default Dashboard;
