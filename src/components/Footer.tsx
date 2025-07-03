import { Trophy, Mail, MapPin, Phone, Twitter, Youtube, Instagram, Phone, Twitch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'WhatsApp', icon: Phone, href: 'wa.me/088231303465' },
  ];

  const quickLinks = [
    { name: 'Tournaments', href: '/tournaments' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'News & Updates', href: '/news-updates' },
    { name: 'Community', href: '/community' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help-center' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Tournament Rules', href: '/tournament-rules' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const handleSupportLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLinkClick = (href: string) => {
    if (href.startsWith('/#')) {
      // Small delay to ensure navigation happens first, then scroll
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // For regular page navigation, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              <div className="font-orbitron text-2xl font-black">
                <span className="gradient-text">ARJUNA</span>
                <br />
                <span className="text-foreground">ESPORTS</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Southeast Asia's premier esports tournament organizer, 
              forging legends through competitive excellence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-card/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-border/50"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => handleQuickLinkClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-6 text-foreground">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={handleSupportLinkClick}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-6 text-foreground">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Pekalongan Gaming Hub<br />
                  Indonesia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@arjuna-esports.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+62 882-3130-3465</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-center md:text-left">
            © 2024 Arjuna Esports. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <Link 
              to="/privacy-policy" 
              onClick={handleSupportLinkClick}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
