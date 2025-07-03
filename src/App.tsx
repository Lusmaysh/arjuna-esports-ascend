
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tournaments from "./pages/Tournaments";
import Community from "./pages/Community";
import TournamentServices from "./pages/TournamentServices";
import NotFound from "./pages/NotFound";
import TournamentRules from "./pages/TournamentRules";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Schedule from "./pages/Schedule";
import Rankings from "./pages/Rankings";
import NewsUpdates from "./pages/NewsUpdates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/community" element={<Community />} />
          <Route path="/tournament-services" element={<TournamentServices />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/news-updates" element={<NewsUpdates />} />
          <Route path="/tournament-rules" element={<TournamentRules />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
