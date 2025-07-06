
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const StorySection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
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
            at the forefront of Mobile Legends competitive gaming evolution. Every tournament tells a story, 
            every victory writes history.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 backdrop-blur-sm border border-border/50">
            <h3 className="font-orbitron text-3xl font-bold mb-4">
              Be Part of <span className="gradient-text">The Next Chapter</span>
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of elite Mobile Legends players who trust Arjuna Esports to deliver 
              world-class competitive experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community" onClick={handleScrollToTop}>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron font-bold px-8 py-4 rounded-lg glow-effect transition-all">
                  Join Our Community
                </button>
              </Link>
              <Link to="/contact-us" onClick={handleScrollToTop}>
                <button className="border border-primary/50 text-primary hover:bg-primary/10 font-orbitron font-bold px-8 py-4 rounded-lg transition-all">
                  Partner With Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
