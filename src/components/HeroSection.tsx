
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Trophy, Users, Calendar } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">ARJUNA</span>
            <br />
            <span className="text-foreground">ESPORTS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            Where legends are forged in the crucible of competition. 
            Experience the pinnacle of professional esports tournaments.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron font-bold px-8 py-4 text-lg glow-effect hover:animate-pulse-glow transition-all duration-300"
            >
              Join Tournament <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/50 text-primary hover:bg-primary/10 font-orbitron font-bold px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Highlights
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
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
