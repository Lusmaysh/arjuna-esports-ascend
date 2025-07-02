
import { Calendar, Clock, Trophy, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Schedule = () => {
  const navigate = useNavigate();

  const upcomingMatches = [
    {
      date: "2024-01-15",
      time: "19:00 WIB",
      tournament: "Mobile Legends Championship",
      teams: "Team Alpha vs Team Beta",
      venue: "Online"
    },
    {
      date: "2024-01-18",
      time: "20:00 WIB",
      tournament: "Free Fire Tournament",
      teams: "Fire Squad vs Lightning Bolt",
      venue: "Pekalongan Gaming Hub"
    },
    {
      date: "2024-01-22",
      time: "18:30 WIB",
      tournament: "PUBG Mobile Cup",
      teams: "Battle Royale Final",
      venue: "Online"
    },
    {
      date: "2024-01-25",
      time: "19:30 WIB",
      tournament: "Valorant Regional",
      teams: "Phoenix vs Storm",
      venue: "Online"
    }
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
                Tournament Schedule
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay up to date with all upcoming tournaments and matches. Don't miss your chance to compete!
            </p>
          </div>

          {/* Upcoming Matches */}
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Upcoming Matches</h2>
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
                      <Button size="sm" variant="outline">
                        View Details
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
              <h2 className="font-orbitron text-2xl font-bold">This Month's Tournaments</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Mobile Legends</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Weekly Championship - Every Friday</p>
                  <p>• Monthly Cup - Last Sunday</p>
                  <p>• Beginner's Tournament - 2nd Saturday</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Other Games</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Free Fire Battle - Every Tuesday</p>
                  <p>• PUBG Mobile - Every Thursday</p>
                  <p>• Valorant Regional - Monthly</p>
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
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Schedule;
