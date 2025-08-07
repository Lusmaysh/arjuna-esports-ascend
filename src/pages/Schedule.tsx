
import { Calendar, Clock, Trophy, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { usePagePrefetch } from '@/hooks/usePagePrefetch';
import ScheduleDetailModal from '@/components/ScheduleDetailModal';

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState<typeof upcomingMatches[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prefetch related pages
  usePagePrefetch(['Tournaments', 'Gallery', 'Community']);

  const upcomingMatches = [
    {
      date: "2025-07-10",
      time: "19:00 WIB",
      tournament: "Kejuaraan Mobile Legends",
      teams: "Tim Alpha vs Tim Beta",
      venue: "Online"
    },
    {
      date: "2025-08-18",
      time: "20:00 WIB",
      tournament: "Turnamen Mobile Legends",
      teams: "Fire Squad vs Lightning Bolt",
      venue: "Pekalongan Gaming Hub"
    },
    {
      date: "2025-09-22",
      time: "18:30 WIB",
      tournament: "Piala Mobile Legends",
      teams: "Alpha vs Beta",
      venue: "Online"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Jadwal Turnamen
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tetap up-to-date dengan semua turnamen dan pertandingan yang akan datang. Jangan lewatkan kesempatan untuk berkompetisi!
            </p>
          </div>

          {/* Upcoming Matches */}
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Pertandingan Mendatang</h2>
            <div className="grid gap-6">
              {upcomingMatches.map((match, index) => (
                <div key={index} className="bg-card/50 border border-border/50 rounded-lg p-6">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{match.date}</p>
                        <p className="text-muted-foreground text-sm flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {match.time}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-primary">{match.tournament}</p>
                      <p className="text-muted-foreground text-sm">{match.teams}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{match.venue}</span>
                    </div>
                    
                    <div className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedMatch(match);
                          setIsModalOpen(true);
                        }}
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tournament Calendar */}
          <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-6 w-6 text-primary" />
              <h2 className="font-orbitron text-2xl font-bold">Turnamen Bulan Ini</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Mobile Legends</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Kejuaraan Mingguan - Setiap Jumat</p>
                  <p>• Piala Bulanan - Minggu Terakhir</p>
                  <p>• Turnamen Pemula - Sabtu Kedua</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Game Lainnya</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Pertempuran Free Fire - Setiap Selasa</p>
                  <p>• PUBG Mobile - Setiap Kamis</p>
                  <p>• Regional Valorant - Bulanan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="font-orbitron"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>

      <ScheduleDetailModal 
        match={selectedMatch}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Schedule;
