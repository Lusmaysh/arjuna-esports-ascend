import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Trophy, CreditCard, ExternalLink, ArrowLeft, Gem } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const TournamentDetail = () => {
  const { id: tournamentId } = useParams();

  const { data: tournament, isLoading, error } = useQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', tournamentId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!tournamentId,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const formatRegistrationFee = (fee: number) => {
    return fee === 0 ? 'GRATIS' : formatCurrency(fee);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: id });
  };

  const getGameImage = (game: string) => {
    const gameImages: { [key: string]: string } = {
      'Mobile Legends': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      'PUBG Mobile': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      'Free Fire': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'Valorant': 'https://images.unsplash.com/photo-1627063439772-1447c4b40e5b?w=800&h=600&fit=crop',
      'League of Legends': 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=600&fit=crop',
    };
    return gameImages[game] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop';
  };

  const formatDiamonds = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const getTournamentImage = (tournament: any) => {
    return tournament?.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat detail turnamen...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-destructive mb-4">Turnamen tidak ditemukan</p>
              <Link to="/tournaments">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Daftar Turnamen
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusBadge = getStatusBadge(tournament.status);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <Link to="/tournaments" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Daftar Turnamen
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={getTournamentImage(tournament)}
                  alt={tournament.name}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant={statusBadge.variant} className="text-sm">
                    {statusBadge.label}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <span className="text-primary font-orbitron font-bold text-sm tracking-wide">
                    {tournament.game.toUpperCase()}
                  </span>
                </div>
                
                <h1 className="font-orbitron text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  {tournament.name}
                </h1>
                
                {tournament.description && (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {tournament.description}
                  </p>
                )}

                {tournament.registration_link && tournament.status === 'registration' ? (
                  <Button 
                    size="lg" 
                    className="w-fit bg-primary hover:bg-primary/90 font-orbitron font-bold glow-effect"
                    asChild
                  >
                    <a href={tournament.registration_link} target="_blank" rel="noopener noreferrer">
                      Daftar Sekarang
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-fit bg-primary hover:bg-primary/90 font-orbitron font-bold"
                    disabled
                  >
                    {tournament.status === 'completed' ? 'Turnamen Berakhir' :
                     tournament.status === 'ongoing' ? 'Sedang Berlangsung' : 'Segera Hadir'}
                  </Button>
                )}
              </div>
            </div>

            {/* Tournament Details */}
            <div className={`grid md:grid-cols-2 ${tournament.diamond_prize_pool > 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-6 mb-12`}>
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <CardTitle className="text-sm font-medium">Hadiah Uang</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(tournament.prize_pool)}
                  </p>
                </CardContent>
              </Card>

              {tournament.diamond_prize_pool > 0 && (
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Gem className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-sm font-medium">Hadiah Diamond</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-500">
                      {formatDiamonds(tournament.diamond_prize_pool)} 💎
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    <CardTitle className="text-sm font-medium">Tim</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {tournament.number_of_teams}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">Tanggal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    {formatDate(tournament.date_held)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">Lokasi</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    {tournament.location}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Registration Info */}
            <Card className="bg-gradient-to-r from-card/80 to-card/40 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informasi Pendaftaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Biaya Pendaftaran</p>
                    <p className={`text-2xl font-bold ${tournament.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                      {formatRegistrationFee(tournament.registration_fee)}
                    </p>
                  </div>
                  {tournament.registration_fee === 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Gratis!
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TournamentDetail;
