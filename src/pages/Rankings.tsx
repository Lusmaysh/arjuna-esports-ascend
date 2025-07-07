
import { Trophy, Medal, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Rankings = () => {
  const navigate = useNavigate();

  const topPlayers = [
    { rank: 1, name: "DragonSlayer", points: 2850, wins: 45, icon: Crown, color: "text-yellow-500" },
    { rank: 2, name: "PhoenixRise", points: 2720, wins: 42, icon: Medal, color: "text-gray-400" },
    { rank: 3, name: "StormBreaker", points: 2650, wins: 38, icon: Medal, color: "text-amber-600" },
    { rank: 4, name: "ShadowHunter", points: 2580, wins: 35, icon: Star, color: "text-primary" },
    { rank: 5, name: "LightningBolt", points: 2520, wins: 33, icon: Star, color: "text-primary" },
  ];

  const topTeams = [
    { rank: 1, name: "Legends United", points: 3200, members: 5 },
    { rank: 2, name: "Elite Warriors", points: 3150, members: 5 },
    { rank: 3, name: "Storm Riders", points: 3080, members: 5 },
    { rank: 4, name: "Fire Dragons", points: 2950, members: 5 },
    { rank: 5, name: "Shadow Wolves", points: 2890, members: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Peringkat Pemain
                {/* Player Rankings */}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Lihat siapa yang mendominasi papan peringkat di semua turnamen dan kompetisi kami.
              {/* See who's dominating the leaderboards across all our tournaments and competitions. */}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Top Players */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-6">
              <h2 className="font-orbitron text-2xl font-bold mb-6 flex items-center gap-3">
                <Trophy className="h-6 w-6 text-primary" />
                Top Players
              </h2>
              <div className="space-y-4">
                {topPlayers.map((player) => {
                  const Icon = player.icon;
                  return (
                    <div key={player.rank} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${player.color}`} />
                          <span className="font-bold text-lg">#{player.rank}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-muted-foreground text-sm">{player.wins} wins</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">{player.points}</p>
                        <p className="text-muted-foreground text-sm">points</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Teams */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-6">
              <h2 className="font-orbitron text-2xl font-bold mb-6 flex items-center gap-3">
                <Medal className="h-6 w-6 text-primary" />
                Top Teams
              </h2>
              <div className="space-y-4">
                {topTeams.map((team) => (
                  <div key={team.rank} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary">#{team.rank}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="text-muted-foreground text-sm">{team.members} members</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-lg">{team.points}</p>
                      <p className="text-muted-foreground text-sm">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Recent Achievements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold">Tournament Champion</h3>
                <p className="text-muted-foreground text-sm">DragonSlayer</p>
                <p className="text-primary text-sm">Mobile Legends Cup</p>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <Medal className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-semibold">Rising Star</h3>
                <p className="text-muted-foreground text-sm">PhoenixRise</p>
                <p className="text-primary text-sm">Most Improved Player</p>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <Trophy className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold">Team Victory</h3>
                <p className="text-muted-foreground text-sm">Legends United</p>
                <p className="text-primary text-sm">Mobile Legends Championship</p>
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

export default Rankings;
