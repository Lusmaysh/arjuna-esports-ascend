
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, DollarSign, Calendar, CreditCard } from 'lucide-react';
import { useTournaments } from '@/hooks/useTournaments';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const TournamentShowcase = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { data: tournaments, isLoading } = useTournaments();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRegistrationFee = (fee: number) => {
    return fee === 0 ? 'FREE' : formatCurrency(fee);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: id });
  };

  const getFeaturedTournament = () => {
    if (!tournaments || tournaments.length === 0) return null;
    // Get the first tournament with registration status, or the first one
    return tournaments.find(t => t.status === 'registration') || tournaments[0];
  };

  const getOtherTournaments = () => {
    if (!tournaments || tournaments.length === 0) return [];
    const featured = getFeaturedTournament();
    return tournaments.filter(t => t.id !== featured?.id).slice(0, 2);
  };

  const featuredTournament = getFeaturedTournament();
  const otherTournaments = getOtherTournaments();

  if (isLoading) {
    return (
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat turnamen...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredTournament) {
    return (
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">ELITE</span> TOURNAMENTS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Turnamen akan segera hadir. Pantau terus untuk update terbaru!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">ELITE</span> TOURNAMENTS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Berkompetisi di level tertinggi. Turnamen kami menampilkan tim-tim terbaik, hadiah terbesar, dan kompetisi paling ketat dalam esports.
          </p>
        </div>

        {/* Tournament Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-card/50 p-2 rounded-xl backdrop-blur-sm border border-border/50">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-lg font-orbitron font-bold transition-all ${
                activeTab === 'upcoming' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 rounded-lg font-orbitron font-bold transition-all ${
                activeTab === 'live' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Live Now
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-lg font-orbitron font-bold transition-all ${
                activeTab === 'past' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Featured Tournament */}
        <div className="mb-16 animate-scale-in">
          <Card className="overflow-hidden bg-gradient-to-r from-card/80 to-card/40 border-primary/30 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop"
                    alt={featuredTournament.name}
                    className="w-full h-80 md:h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-orbitron font-bold">
                      FEATURED
                    </span>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-accent font-orbitron font-bold text-sm tracking-wide">
                      {featuredTournament.game.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="font-orbitron text-3xl md:text-4xl font-black mb-4 leading-tight">
                    {featuredTournament.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-lg font-bold">{formatCurrency(featuredTournament.prize_pool)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span>{featuredTournament.number_of_teams} Teams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{formatDate(featuredTournament.date_held)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span className={`font-semibold ${featuredTournament.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                        {formatRegistrationFee(featuredTournament.registration_fee)}
                      </span>
                    </div>
                  </div>
                  
                  {featuredTournament.registration_link ? (
                    <Button 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 font-orbitron font-bold glow-effect"
                      asChild
                    >
                      <a href={featuredTournament.registration_link} target="_blank" rel="noopener noreferrer">
                        Register Now
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 font-orbitron font-bold glow-effect"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Grid */}
        {otherTournaments.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {otherTournaments.map((tournament, index) => (
              <Card 
                key={tournament.id} 
                className={`overflow-hidden bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:scale-105 animate-slide-in-left`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop"
                      alt={tournament.name}
                      className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-orbitron font-bold">
                        {tournament.status === 'upcoming' ? 'Coming Soon' : 
                         tournament.status === 'registration' ? 'Registration Open' :
                         tournament.status === 'ongoing' ? 'Live Now' : 'Completed'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-primary font-orbitron font-bold text-sm tracking-wide">
                        {tournament.game.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="font-orbitron text-xl font-bold mb-4">
                      {tournament.name}
                    </h3>
                    
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Prize Pool</span>
                        <span className="font-bold text-primary">{formatCurrency(tournament.prize_pool)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Teams</span>
                        <span>{tournament.number_of_teams}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span>{formatDate(tournament.date_held)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Registration</span>
                        <span className={`font-semibold ${tournament.registration_fee === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                          {formatRegistrationFee(tournament.registration_fee)}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-primary/50 text-primary hover:bg-primary/10 font-orbitron"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TournamentShowcase;
