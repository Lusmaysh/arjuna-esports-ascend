
import { useState, useEffect } from 'react';
import { Menu, X, Trophy, Calendar, Users, DollarSign, LayoutDashboard, Newspaper, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Tournaments', href: '/tournaments', icon: Trophy },
    // { name: 'Schedule', href: '/schedule', icon: Calendar },
    // { name: 'Community', href: '/community', icon: Users },
    // { name: 'News & Updates', href: '/news-updates', icon: Newspaper },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" onClick={handleScrollToTop}>
            <div className="flex items-center">
              <div className="font-orbitron text-2xl font-black">
                <span className="gradient-text">ARJUNA</span>
                <span className="text-foreground ml-2">ESPORTS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleScrollToTop}
                  className={`flex items-center gap-2 transition-colors font-inter font-medium ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* Special Tournament Services Button */}
            <Link
              to="/tournament-services"
              onClick={handleScrollToTop}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-inter font-semibold transition-all duration-300 ${
                location.pathname === '/tournament-services'
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                  : 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 hover:border-primary hover:shadow-lg hover:shadow-primary/25'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Services
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 transition-colors font-inter font-medium ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    onClick={handleScrollToTop}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Special Tournament Services Button for Mobile */}
              <Link
                to="/tournament-services"
                className={`flex items-center gap-3 mx-3 px-3 py-2 rounded-lg border-2 font-inter font-semibold transition-all duration-300 ${
                  location.pathname === '/tournament-services'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/50'
                }`}
                onClick={handleScrollToTop}
              >
                <ShoppingCart className="h-4 w-4" />
                Services
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
