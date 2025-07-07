
import { Trophy, Target, Eye, Heart, Users, Zap } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const VisiMisi = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="h-12 w-12 text-primary" />
              <h1 className="font-orbitron text-4xl md:text-5xl font-black">
                <span className="gradient-text">VISI</span> & <span className="gradient-text">MISI</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Membangun ekosistem esports terbaik di Asia Tenggara dengan dedikasi tinggi 
              untuk menciptakan turnamen berkualitas tinggi.
            </p>
          </div>
        </section>

        {/* Visi Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="font-orbitron text-3xl font-bold">VISI</h2>
              </div>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
              <blockquote className="text-xl md:text-2xl text-center leading-relaxed text-foreground font-medium">
                "Menjadi platform esports terdepan di Asia Tenggara yang menghadirkan 
                turnamen berkualitas tinggi, membangun komunitas gaming yang solid, 
                dan menciptakan peluang karir bagi para pemain profesional."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Misi Section */}
        <section className="py-16 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="font-orbitron text-3xl font-bold">MISI</h2>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  <h3 className="font-orbitron text-lg font-bold">Turnamen Berkualitas</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Menyelenggarakan turnamen esports dengan standar internasional, 
                  sistem yang fair, dan prize pool yang menarik.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="font-orbitron text-lg font-bold">Membangun Komunitas</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Menciptakan komunitas gaming yang positif, inklusif, dan 
                  mendukung pertumbuhan talenta esports lokal.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                  <h3 className="font-orbitron text-lg font-bold">Pengembangan Talent</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Memberikan platform dan kesempatan bagi pemain untuk 
                  mengembangkan skill dan berkarir di dunia esports.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                  <h3 className="font-orbitron text-lg font-bold">Standar Profesional</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Menerapkan standar operasional tertinggi dalam setiap aspek 
                  penyelenggaraan turnamen dan layanan.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                  <h3 className="font-orbitron text-lg font-bold">Inovasi Berkelanjutan</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Terus berinovasi dalam teknologi, format turnamen, dan 
                  pengalaman peserta untuk kemajuan esports.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="font-orbitron text-lg font-bold">Kolaborasi Regional</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Membangun kerjasama strategis dengan organisasi esports 
                  se-Asia Tenggara untuk pertumbuhan bersama.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl font-bold mb-8">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="font-orbitron text-xl font-bold text-primary">INTEGRITAS</h3>
                <p className="text-muted-foreground">
                  Berkomitmen pada transparansi, kejujuran, dan fair play 
                  dalam setiap turnamen.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-orbitron text-xl font-bold text-primary">EXCELLENCE</h3>
                <p className="text-muted-foreground">
                  Selalu berusaha memberikan yang terbaik dalam setiap 
                  aspek layanan dan turnamen.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-orbitron text-xl font-bold text-primary">PASSION</h3>
                <p className="text-muted-foreground">
                  Didorong oleh cinta terhadap esports dan dedikasi 
                  untuk memajukan industri gaming.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default VisiMisi;
