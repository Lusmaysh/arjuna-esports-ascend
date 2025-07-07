
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NewsUpdates = () => {
  const navigate = useNavigate();

  const newsArticles = [
    {
      id: 1,
      title: "Kejuaraan Mobile Legends 2024 Diumumkan",
      excerpt: "Turnamen Mobile Legends terbesar tahun ini hadir dengan hadiah fantastis senilai $50,000. Pendaftaran dibuka minggu depan.",
      date: "2024-01-10",
      author: "Tim Turnamen",
      category: "Turnamen",
      featured: true
    },
    {
      id: 2,
      title: "Gaming Hub Baru Dibuka di Pekalongan",
      excerpt: "Fasilitas gaming canggih dengan peralatan berkelas tinggi kini tersedia untuk sesi latihan dan turnamen lokal.",
      date: "2024-01-08",
      author: "Tim Berita",
      category: "Fasilitas",
      featured: false
    },
    {
      id: 3,
      title: "Wawancara dengan Juara DragonSlayer",
      excerpt: "Dapatkan wawasan dari pemain berperingkat #1 kami tentang perjalanan mereka ke puncak dan strategi mendatang.",
      date: "2024-01-05",
      author: "Tim Media",
      category: "Sorotan Pemain",
      featured: false
    },
    {
      id: 4,
      title: "Aturan Turnamen Mobile Legends Diperbarui",
      excerpt: "Perubahan penting pada format turnamen dan aturan. Semua peserta harus meninjau pedoman yang diperbarui.",
      date: "2024-01-03",
      author: "Komite Aturan",
      category: "Pembaruan",
      featured: false
    },
    {
      id: 5,
      title: "Kemitraan dengan Warnet Gaming Lokal",
      excerpt: "Kami memperluas jaringan dengan kemitraan strategis untuk membawa turnamen lebih dekat ke pemain di seluruh wilayah.",
      date: "2024-01-01",
      author: "Tim Bisnis",
      category: "Kemitraan",
      featured: false
    }
  ];

  const featuredNews = newsArticles.find(news => news.featured);
  const regularNews = newsArticles.filter(news => !news.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Newspaper className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Berita & Pembaruan
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tetap terinformasi dengan berita terbaru, pengumuman turnamen, dan pembaruan dari Arjuna Esports.
            </p>
          </div>

          {/* Featured News */}
          {featuredNews && (
            <div className="mb-12">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Unggulan
                  </span>
                  <span className="text-primary font-semibold">{featuredNews.category}</span>
                </div>
                <h2 className="font-orbitron text-3xl font-bold mb-4">{featuredNews.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{featuredNews.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{featuredNews.author}</span>
                    </div>
                  </div>
                  <Button>
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Regular News */}
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Pembaruan Terbaru</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regularNews.map((news) => (
                <div key={news.id} className="bg-card/50 border border-border/50 rounded-lg p-6 hover:bg-card/70 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-semibold">
                      {news.category}
                    </span>
                  </div>
                  <h3 className="font-orbitron text-xl font-bold mb-3">{news.title}</h3>
                  <p className="text-muted-foreground mb-4">{news.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{news.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{news.author}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Baca Selengkapnya
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-orbitron text-2xl font-bold mb-4">Tetap Terupdate</h2>
              <p className="text-muted-foreground mb-6">
                Berlangganan newsletter kami untuk mendapatkan pengumuman turnamen terbaru dan berita esports langsung ke inbox Anda.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="email.anda@example.com"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Berlangganan</Button>
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

      <Footer />
    </div>
  );
};

export default NewsUpdates;
