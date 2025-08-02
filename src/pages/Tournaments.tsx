import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Trophy, RefreshCw } from 'lucide-react';
import { useTournaments } from '@/hooks/useTournaments';
import { useTournamentStatusRefresh } from '@/hooks/useTournamentStatusRefresh';
import { useToast } from '@/hooks/use-toast';
import TournamentCard from '@/components/TournamentCard';
import MobileLegendsInfo from '@/components/MobileLegendsInfo';
import { useResourcePreloader, useRoutePrefetch } from '@/hooks/useResourcePreloader';

const Tournaments = () => {
  const { data: tournaments, isLoading, error } = useTournaments();
  const refreshMutation = useTournamentStatusRefresh();
  const { toast } = useToast();

  // Preload tournament images and prefetch related routes
  useResourcePreloader([
    { href: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
  ]);

  // Prefetch likely next routes
  useRoutePrefetch(['Dashboard', 'Community', 'TournamentDetail']);


  const handleRefreshStatuses = () => {
    refreshMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Status Updated",
          description: "Tournament statuses have been refreshed successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to refresh tournament statuses. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  // Sort tournaments by status priority and date
  const getSortedTournaments = () => {
    if (!tournaments) return [];
    
    const statusPriority = {
      registration: 1,
      upcoming: 2,
      ongoing: 3,
      completed: 4
    };

    return [...tournaments].sort((a, b) => {
      const priorityA = statusPriority[a.status as keyof typeof statusPriority] || 5;
      const priorityB = statusPriority[b.status as keyof typeof statusPriority] || 5;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same priority, sort by date
      return new Date(a.date_held).getTime() - new Date(b.date_held).getTime();
    });
  };

  const sortedTournaments = getSortedTournaments();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat turnamen...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-destructive mb-4">Gagal memuat turnamen</p>
              <p className="text-muted-foreground">Silakan coba lagi nanti</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
              <span className="gradient-text">Tournaments</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Ikuti turnamen esports terbesar dan terbaik. Buktikan skill Anda dan raih hadiah jutaan rupiah!
            </p>
            
            {/* Refresh Button */}
            <Button 
              onClick={handleRefreshStatuses}
              disabled={refreshMutation.isPending}
              variant="outline"
              className="mb-8"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
              {refreshMutation.isPending ? 'Memperbarui Status...' : 'Perbarui Status Turnamen'}
            </Button>
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="py-20 px-6 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            {sortedTournaments && sortedTournaments.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedTournaments.map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Belum Ada Turnamen</h3>
                <p className="text-muted-foreground">
                  Turnamen akan segera hadir. Pantau terus halaman ini untuk update terbaru!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Mobile Legends Information */}
        <MobileLegendsInfo />
      </main>
      
      <Footer />
    </div>
  );
};

export default Tournaments;
