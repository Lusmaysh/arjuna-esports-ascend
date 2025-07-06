
import { Trophy, Shield, Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TournamentRules = () => {
  const navigate = useNavigate();

  const rules = [
    {
      icon: Users,
      title: "Team Composition",
      description: "Each team must consist of 5 players with 1 substitute allowed."
    },
    {
      icon: Clock,
      title: "Match Duration",
      description: "Standard matches have a 30-minute time limit. Overtime rules apply if needed."
    },
    {
      icon: Shield,
      title: "Fair Play",
      description: "No cheating, hacking, or unsportsmanlike conduct. Violations result in immediate disqualification."
    },
    {
      icon: CheckCircle,
      title: "Equipment Standards",
      description: "All players must use approved devices and maintain stable internet connection."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Tournament Rules
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Official rules and regulations for all Arjuna Esports tournaments. 
              Please read carefully before participating.
            </p>
          </div>

          {/* Rules Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {rules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <div key={index} className="bg-card/50 border border-border/50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-lg font-bold mb-2">{rule.title}</h3>
                      <p className="text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Rules */}
          <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
            <h2 className="font-orbitron text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-primary" />
              Detailed Regulations
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Registration Requirements</h3>
                <p>All players must be registered 48 hours before tournament start. Valid ID and contact information required.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Match Protocol</h3>
                <p>Players must join the designated lobby 15 minutes before scheduled match time. Late arrivals may result in forfeit.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">3. Technical Issues</h3>
                <p>In case of technical difficulties, notify tournament officials immediately. Matches may be paused or rescheduled at organizer discretion.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">4. Prize Distribution</h3>
                <p>Prizes will be distributed within 7 business days after tournament conclusion. Tax responsibilities lie with the winners.</p>
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

export default TournamentRules;
