import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Trophy, Users, Star } from 'lucide-react';

interface ScheduleMatch {
  date: string;
  time: string;
  tournament: string;
  teams: string;
  venue: string;
}

interface ScheduleDetailModalProps {
  match: ScheduleMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleDetailModal = ({ match, isOpen, onClose }: ScheduleDetailModalProps) => {
  if (!match) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            {match.tournament}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-muted-foreground">{match.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-muted-foreground">{match.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Venue</p>
                  <p className="text-muted-foreground">{match.venue}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Teams</p>
                  <p className="text-muted-foreground">{match.teams}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Status</p>
                  <Badge variant="secondary">Upcoming</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Tournament Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Prize Pool: IDR 5,000,000</p>
              <p>• Registration Fee: IDR 50,000 per team</p>
              <p>• Maximum 16 teams</p>
              <p>• Best of 3 format</p>
              <p>• Stream available on our official channel</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button className="flex-1">
              <Trophy className="h-4 w-4 mr-2" />
              Register Team
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailModal;