
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TournamentShowcase from '@/components/TournamentShowcase';
import StorySection from '@/components/StorySection';
import Footer from '@/components/Footer';
import { useResourcePreloader } from "@/hooks/useResourcePreloader";
import { usePagePrefetch } from "@/hooks/usePagePrefetch";

const Dashboard = () => {
  // Preload critical resources
  useResourcePreloader([
    { href: '/placeholder.svg', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
  ]);

  // Prefetch likely next routes
  usePagePrefetch(['Tournaments', 'Community', 'TournamentServices', 'Gallery', 'Forum']);

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
