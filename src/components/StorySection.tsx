
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Users, Zap } from 'lucide-react';

const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Founded with a vision to elevate Southeast Asian esports to global standards. Started with our first Dota 2 tournament featuring 16 teams.",
    icon: Target,
    stats: "16 Teams"
  },
  {
    year: "2020",
    title: "Breaking Barriers",
    description: "Expanded to mobile esports and hosted our first international championship with participants from 12 countries.",
    icon: Users,
    stats: "12 Countries"
  },
  {
    year: "2022",
    title: "Going Global",
    description: "Achieved recognition as one of Asia's premier tournament organizers. Awarded 'Best Esports Event' by Gaming Excellence Awards.",
    icon: Trophy,
    stats: "$2M+ Prizes"
  },
  {
    year: "2024",
    title: "The Future",
    description: "Leading the charge in next-gen competitive gaming with cutting-edge technology and unprecedented prize pools.",
    icon: Zap,
    stats: "500+ Events"
  }
];

const StorySection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6">
            OUR <span className="gradient-text">LEGACY</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From humble beginnings to global recognition, Arjuna Esports has been 
            at the forefront of competitive gaming evolution. Every tournament tells a story, 
            every victory writes history.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
          
          <div className="space-y-24">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.includes(index);
              
              return (
                <div 
                  key={index}
                  data-index={index}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`w-16 h-16 rounded-full border-4 border-primary bg-background flex items-center justify-center transition-all duration-700 ${isVisible ? 'scale-100 animate-pulse-glow' : 'scale-0'}`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'pr-8 md:pr-16' : 'pl-8 md:pl-16'}`}>
                    <Card className={`bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-700 ${isVisible ? (isLeft ? 'animate-slide-in-left' : 'animate-slide-in-right') : 'opacity-0'}`}>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-orbitron text-3xl font-black text-primary">
                            {milestone.year}
                          </span>
                          <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-orbitron font-bold">
                            {milestone.stats}
                          </span>
                        </div>
                        
                        <h3 className="font-orbitron text-2xl font-bold mb-4 text-foreground">
                          {milestone.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 backdrop-blur-sm border border-border/50">
            <h3 className="font-orbitron text-3xl font-bold mb-4">
              Be Part of <span className="gradient-text">The Next Chapter</span>
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of elite players who trust Arjuna Esports to deliver 
              world-class competitive experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron font-bold px-8 py-4 rounded-lg glow-effect transition-all">
                Join Our Community
              </button>
              <button className="border border-primary/50 text-primary hover:bg-primary/10 font-orbitron font-bold px-8 py-4 rounded-lg transition-all">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
