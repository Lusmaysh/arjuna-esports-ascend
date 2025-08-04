
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Trophy, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Community = () => {
  const [dbTest, setDbTest] = useState<string>('Testing...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('tournaments')
          .select('count(*)')
          .single();
        
        if (error) {
          console.error('Database connection error:', error);
          setDbTest(`Error: ${error.message}`);
        } else {
          setDbTest('Database connected successfully');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setDbTest(`Unexpected error: ${err}`);
      }
    };

    testConnection();
  }, []);

  const communityStats = [
    { label: 'Active Players', value: '25,000+', icon: Users },
    { label: 'Tournaments Held', value: '150+', icon: Trophy },
    { label: 'Discord Members', value: '10,000+', icon: MessageCircle },
    { label: 'Champions', value: '500+', icon: Star }
  ];

  const topPlayers = [
    {
      id: 1,
      name: 'ProGamer123',
      game: 'Valorant',
      rank: '#1',
      avatar: '/placeholder.svg',
      points: '2,450'
    },
    {
      id: 2,
      name: 'MLMaster',
      game: 'Mobile Legends',
      rank: '#2',
      avatar: '/placeholder.svg',
      points: '2,380'
    },
    {
      id: 3,
      name: 'PUBGKing',
      game: 'PUBG Mobile',
      rank: '#3',
      avatar: '/placeholder.svg',
      points: '2,290'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'GamerPro',
      action: 'won the Valorant Daily Challenge',
      time: '2 hours ago',
      points: '+50 pts'
    },
    {
      id: 2,
      user: 'MLHero',
      action: 'joined the Mobile Legends Tournament',
      time: '4 hours ago',
      points: ''
    },
    {
      id: 3,
      user: 'FireMaster',
      action: 'achieved Grandmaster rank',
      time: '6 hours ago',
      points: '+100 pts'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
              <span className="gradient-text">Community</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Bergabunglah dengan komunitas esports terbesar Indonesia. Connect, compete, dan conquer bersama!
            </p>
            <div className="bg-muted/20 p-4 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">Database Status: {dbTest}</p>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-20 px-6 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {communityStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold font-orbitron text-primary mb-2">
                        {stat.value}
                      </div>
                      <p className="text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Top Players */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Top Players
                  </CardTitle>
                  <CardDescription>
                    Pemain terbaik bulan ini berdasarkan poin tournament
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPlayers.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="min-w-12">
                            {player.rank}
                          </Badge>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.game}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{player.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>
                    Aktivitas terbaru dari komunitas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-semibold">{activity.user}</span>{' '}
                              {activity.action}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.time}
                            </p>
                          </div>
                          {activity.points && (
                            <Badge variant="outline" className="ml-2">
                              {activity.points}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Community CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-orbitron mb-8">
              Ready to Join the <span className="gradient-text">Community</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Bergabunglah dengan Discord server kami dan mulai journey esports Anda!
            </p>
            <Button size="lg" className="font-semibold">
              Join Discord Server
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
