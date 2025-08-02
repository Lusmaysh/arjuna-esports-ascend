import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, MapPin, CreditCard, Gem } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/OptimizedImage';

interface Tournament {
  id: string;
  name: string;
  game: string;
  description?: string;
  prize_pool: number;
  diamond_prize_pool: number;
  number_of_teams: number;
  date_held: string;
  location: string;
  registration_fee: number;
  registration_link?: string;
  status: string;
  image_url?: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
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

  const statusBadge = getStatusBadge(tournament.status);

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
};

export default TournamentCard;