import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Camera, Play, Download, Share } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  tournament_id: string | null;
  created_at: string;
  updated_at: string;
}

interface GalleryDetailModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const GalleryDetailModal = ({ item, isOpen, onClose }: GalleryDetailModalProps) => {
  if (!item) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'video':
      case 'highlight':
        return <Play className="h-4 w-4" />;
      default:
        return <Camera className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getCategoryIcon(item.category)}
            {item.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image/Video Display */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            
            {/* Play overlay for videos */}
            {(item.category === 'video' || item.category === 'highlight') && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="h-16 w-16 text-white" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                {getCategoryIcon(item.category)}
                {item.category}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(item.created_at).toLocaleDateString()}
              </div>
            </div>

            {item.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDetailModal;