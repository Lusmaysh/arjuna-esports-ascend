
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import Tournaments from "./pages/Tournaments";
import Community from "./pages/Community";
import Forum from "./pages/Forum";
import Gallery from "./pages/Gallery";
import TournamentServices from "./pages/TournamentServices";
import NotFound from "./pages/NotFound";
import TournamentRules from "./pages/TournamentRules";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Schedule from "./pages/Schedule";
import Rankings from "./pages/Rankings";
import NewsUpdates from "./pages/NewsUpdates";
import VisiMisi from "./pages/VisiMisi";
import Admin from "./pages/Admin";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";
import TournamentDetail from "./pages/TournamentDetail";
import { Helmet } from "react-helmet";
import { useResourcePreloader } from "@/hooks/useResourcePreloader";

// Enhanced QueryClient with better caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => {
  // Preload critical resources for better performance
  useResourcePreloader([
    { href: '/placeholder.svg', as: 'image' },
    { href: '/favicon.ico', as: 'image' }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="arjuna-esports-theme">
        <TooltipProvider>
        <Helmet>
          <title>Arjuna Esports - Platform Turnamen Esports Terdepan di Indonesia</title>
          <meta name="description" content="Bergabunglah dengan Arjuna Esports, platform turnamen esports terbesar di Indonesia. Ikuti turnamen Mobile Legends, PUBG Mobile, Free Fire, dan game esports lainnya dengan hadiah jutaan rupiah." />
          <meta name="keywords" content="esports, turnamen, mobile legends, pubg mobile, free fire, gaming, indonesia, kompetisi, hadiah, arjuna esports" />
          <meta name="author" content="Arjuna Esports" />
          <meta property="og:title" content="Arjuna Esports - Platform Turnamen Esports Terdepan" />
          <meta property="og:description" content="Platform turnamen esports terbesar di Indonesia dengan hadiah jutaan rupiah. Ikuti turnamen Mobile Legends, PUBG, Free Fire dan game lainnya." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Arjuna Esports - Platform Turnamen Esports" />
          <meta name="twitter:description" content="Platform turnamen esports terbesar di Indonesia dengan hadiah jutaan rupiah." />
          <link rel="canonical" href="https://arjunaesports.com" />
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournament/:id" element={<TournamentDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/tournament-services" element={<TournamentServices />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/news-updates" element={<NewsUpdates />} />
            <Route path="/tournament-rules" element={<TournamentRules />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/visi-misi" element={<VisiMisi />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
