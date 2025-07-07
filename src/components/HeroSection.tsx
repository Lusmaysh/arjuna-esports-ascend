
import { Button } from '@/components/ui/button';
import { Trophy, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-40 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-orbitron text-6xl md:text-8xl lg:text-9xl font-black mb-4">
            <span className="gradient-text text-glow">ARJUNA</span>
          </h1>
          <h2 className="font-orbitron text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground">
            ESPORTS CHAMPIONSHIP
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Penyelenggara Turnamen Mobile Legends Terkemuka di Indonesia. Tempat Para Legenda Ditempa dan Para Juara Muncul.
          {/* Indonesian's Premier Mobile Legends Tournament Organizer. Where Legends Are Forged and Champions Rise. */}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/tournaments" onClick={handleScrollToTop}>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 font-orbitron font-bold text-lg px-8 py-4 glow-effect animate-pulse-glow"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Join Tournament
            </Button>
          </Link>
          <Button 
            size="lg"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 font-orbitron font-bold text-lg px-8 py-4"
          >
            <Zap className="mr-2 h-5 w-5" />
            Watch Live
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center hover:bg-card/40 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-2">500+</div>
            <div className="text-muted-foreground font-inter">Mobile Legends Tournaments</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center hover:bg-card/40 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-2">50K+</div>
            <div className="text-muted-foreground font-inter">Active Players</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center hover:bg-card/40 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-2">24/7</div>
            <div className="text-muted-foreground font-inter">Live Events</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Target className="h-8 w-8 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
