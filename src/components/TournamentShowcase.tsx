
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, DollarSign, Calendar } from 'lucide-react';

const tournaments = [
  {
    id: 1,
    title: "KEJUARAAN ARJUNA 2025",
    game: "Mobile Legends",
    prizePool: "Rp 1.000.000",
    participants: "8 Tim",
    date: "10-15 Juli 2025",
    status: "Pendaftaran Dibuka",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    featured: true
  },
  // {
  //   id: 2,
  //   title: "Mobile Legends Pro League",
  //   game: "Mobile Legends",
  //   prizePool: "$75,000",
  //   participants: "32 Tim",
  //   date: "10-15 Jan 2025",
  //   status: "Segera Hadir",
  //   image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop"
  // },
  // {
  //   id: 3,
  //   title: "PUBG Mobile Masters",
  //   game: "PUBG Mobile",
  //   prizePool: "$50,000",
  //   participants: "128 Tim",
  //   date: "5-10 Feb 2025",
  //   status: "Segera Hadir",
  //   image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"
  // }
];

const TournamentShowcase = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6">
            TURNAMEN <span className="gradient-text">ELIT</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Berkompetisi di level tertinggi. Turnamen kami menampilkan tim terbaik, 
            hadiah terbesar, dan kompetisi paling intens dalam esports.
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
              Mendatang
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 rounded-lg font-orbitron font-bold transition-all ${
                activeTab === 'live' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Live Sekarang
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-lg font-orbitron font-bold transition-all ${
                activeTab === 'past' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Event Sebelumnya
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
                    src={tournaments[0].image} 
                    alt={tournaments[0].title}
                    className="w-full h-80 md:h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-orbitron font-bold">
                      UNGGULAN
                    </span>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-accent font-orbitron font-bold text-sm tracking-wide">
                      {tournaments[0].game.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="font-orbitron text-3xl md:text-4xl font-black mb-4 leading-tight">
                    {tournaments[0].title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-lg font-bold">{tournaments[0].prizePool}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span>{tournaments[0].participants}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{tournaments[0].date}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 font-orbitron font-bold glow-effect"
                  asChild
                >
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwFUahebkE7xGIiZq3z2gTjxfW6rUwqNNv2Iqsew3wnqTJnw/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                    Daftar Sekarang
                  </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {tournaments.slice(1).map((tournament, index) => (
            <Card 
              key={tournament.id} 
              className={`overflow-hidden bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:scale-105 animate-slide-in-left`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={tournament.image} 
                    alt={tournament.title}
                    className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-orbitron font-bold">
                      {tournament.status}
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
                    {tournament.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Hadiah</span>
                      <span className="font-bold text-primary">{tournament.prizePool}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tim</span>
                      <span>{tournament.participants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tanggal</span>
                      <span>{tournament.date}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 text-primary hover:bg-primary/10 font-orbitron"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentShowcase;
