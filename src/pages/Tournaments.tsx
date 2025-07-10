import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, MapPin, CreditCard, RefreshCw, Gem } from 'lucide-react';
import { useTournaments } from '@/hooks/useTournaments';
import { useTournamentStatusRefresh } from '@/hooks/useTournamentStatusRefresh';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Tournaments = () => {
  const { data: tournaments, isLoading, error } = useTournaments();
  const refreshMutation = useTournamentStatusRefresh();
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: 'Coming Soon', variant: 'secondary' as const },
      registration: { label: 'Registration Open', variant: 'default' as const },
      ongoing: { label: 'Live Now', variant: 'destructive' as const },
      completed: { label: 'Completed', variant: 'outline' as const }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDiamonds = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const formatRegistrationFee = (fee: number) => {
    return fee === 0 ? 'FREE' : formatCurrency(fee);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: id });
  };

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
            {/*<Button 
              onClick={handleRefreshStatuses}
              disabled={refreshMutation.isPending}
              variant="outline"
              className="mb-8"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
              {refreshMutation.isPending ? 'Memperbarui Status...' : 'Perbarui Status Turnamen'}
            </Button>*/}
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="py-20 px-6 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            {sortedTournaments && sortedTournaments.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedTournaments.map((tournament) => {
                  const statusBadge = getStatusBadge(tournament.status);
                  const getButtonText = () => {
                    switch (tournament.status) {
                      case 'registration': return 'Daftar Sekarang';
                      case 'ongoing': return 'Lihat Live';
                      case 'completed': return 'Lihat Hasil';
                      default: return 'Info Lengkap';
                    }
                  };

                  const handleButtonClick = () => {
                    if (tournament.status === 'registration' && tournament.registration_link) {
                      window.open(tournament.registration_link, '_blank');
                    }
                  };

                  return (
                    <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={statusBadge.variant}>
                            {statusBadge.label}
                          </Badge>
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <CardTitle className="text-xl font-orbitron">
                          {tournament.name}
                        </CardTitle>
                        <CardDescription>
                          {tournament.description || `Turnamen ${tournament.game} dengan format kompetitif.`}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(tournament.date_held)}</span>
                          </div>
                          {tournament.prize_pool > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold text-primary">
                              {formatCurrency(tournament.prize_pool)}
                            </span>
                          </div>
                      )}
                          {tournament.diamond_prize_pool > 0 && (
                            <div className="flex items-center gap-2 text-sm">
                              <Gem className="h-4 w-4 text-blue-500" />
                              <span className="font-semibold text-blue-500">
                                {formatDiamonds(tournament.diamond_prize_pool)} 💎
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament.number_of_teams} Tim</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{tournament.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className={`font-semibold ${tournament.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                              {formatRegistrationFee(tournament.registration_fee)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link to={`/tournament/${tournament.id}`} className="flex-1">
                            <Button 
                              className="w-full" 
                              variant="outline"
                            >
                              Info Lengkap
                            </Button>
                          </Link>
                          {tournament.status === 'registration' && tournament.registration_link && (
                            <Button 
                              onClick={handleButtonClick}
                              className="flex-1"
                            >
                              {getButtonText()}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Tournaments;
