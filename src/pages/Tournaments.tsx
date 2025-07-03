import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, MapPin } from 'lucide-react';

const Tournaments = () => {
  const tournaments = [
    {
      id: 1,
      title: 'Mobile Legends Tournament',
      game: 'Mobile Legends',
      status: 'upcoming',
      date: '15 August 2025',
      prize: 'Rp 10.000.000',
      participants: '64 Tim',
      location: 'Online',
      description: 'Turnamen Mobile Legends dengan format double elimination.'
    },
    {
      id: 2,
      title: 'Arjuna Championship 2025',
      game: 'Mobile Legends',
      status: 'registration',
      date: '10 July 2025',
      prize: 'Rp 1.000.000',
      participants: '8 Tim',
      location: 'Pekalongan',
      description: 'Kompetisi Mobile Legends dengan format double elimination.',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfwFUahebkE7xGIiZq3z2gTjxfW6rUwqNNv2Iqsew3wnqTJnw/viewform?usp=header'
    },
    // {
    //   id: 3,
    //   title: 'PUBG Mobile Championship',
    //   game: 'PUBG Mobile',
    //   status: 'ongoing',
    //   date: '10 Januari 2025',
    //   prize: 'Rp 15.000.000',
    //   participants: '128 Tim',
    //   location: 'Bandung',
    //   description: 'Battle Royale championship dengan hadiah terbesar.'
    // },
    // {
    //   id: 4,
    //   title: 'Free Fire Masters',
    //   game: 'Free Fire',
    //   status: 'completed',
    //   date: '5 Januari 2025',
    //   prize: 'Rp 5.000.000',
    //   participants: '48 Tim',
    //   location: 'Surabaya',
    //   description: 'Turnamen Free Fire regional dengan pemain terbaik.'
    // }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: 'Coming Soon', variant: 'secondary' as const },
      registration: { label: 'Registration Open', variant: 'default' as const },
      ongoing: { label: 'Live Now', variant: 'destructive' as const },
      completed: { label: 'Completed', variant: 'outline' as const }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
  };

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
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="py-20 px-6 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.map((tournament) => {
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
                  if (tournament.status === 'registration' && tournament.registrationLink) {
                    window.open(tournament.registrationLink, '_blank');
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
                        {tournament.title}
                      </CardTitle>
                      <CardDescription>
                        {tournament.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{tournament.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-primary">{tournament.prize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{tournament.participants}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{tournament.location}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={handleButtonClick}
                      >
                        {getButtonText()}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tournaments;
