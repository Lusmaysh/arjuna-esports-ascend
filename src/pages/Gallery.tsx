import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Play, Search, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const categories = [
    { value: 'all', label: 'All Media' },
    { value: 'photo', label: 'Photos' },
    { value: 'video', label: 'Videos' },
    { value: 'highlight', label: 'Highlights' },
    { value: 'behind-scenes', label: 'Behind the Scenes' }
  ];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('tournament_gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
                <span className="gradient-text">Tournament Gallery</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Relive the best moments from our tournaments through photos and videos
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading gallery...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No media found for the selected filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {getCategoryIcon(item.category)}
                          {item.category}
                        </Badge>
                      </div>

                      {/* Play overlay for videos */}
                      {(item.category === 'video' || item.category === 'highlight') && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredItems.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;