
import { Button } from '@/components/ui/button';
import { Trophy, Zap, Target } from 'lucide-react';

const HeroSection = () => {
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
          Southeast Asia's Premier Mobile Legends Tournament Organizer. Where Legends Are Forged and Champions Rise.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 font-orbitron font-bold text-lg px-8 py-4 glow-effect animate-pulse-glow"
          >
            <Trophy className="mr-2 h-5 w-5" />
            Join Tournament
          </Button>
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
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="text-center p-6 bg-card/50 rounded-xl backdrop-blur-sm border border-border/50">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-orbitron font-bold text-primary mb-1">500+</div>
              <div className="text-muted-foreground">Tournaments Hosted</div>
            </div>
            
            <div className="text-center p-6 bg-card/50 rounded-xl backdrop-blur-sm border border-border/50">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-orbitron font-bold text-accent mb-1">50K+</div>
              <div className="text-muted-foreground">Active Players</div>
            </div>
            
            <div className="text-center p-6 bg-card/50 rounded-xl backdrop-blur-sm border border-border/50">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-orbitron font-bold text-primary mb-1">24/7</div>
              <div className="text-muted-foreground">Live Events</div>
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
