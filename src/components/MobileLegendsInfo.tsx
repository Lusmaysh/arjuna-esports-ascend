import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Clock, Star, Gamepad2, Target } from 'lucide-react';

const MobileLegendsInfo = () => {
  return (
    <section className="py-16 px-6 bg-muted/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            Tentang <span className="gradient-text">Mobile Legends</span> Tournament
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bergabunglah dalam turnamen Mobile Legends: Bang Bang terbesar di Indonesia. 
            Kompetisi profesional dengan sistem bracket eliminasi dan hadiah jutaan rupiah.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Format Tim</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                5 vs 5 dengan 1 cadangan per tim. Setiap tim maksimal 6 pemain yang terdaftar.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Sistem Bracket</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Double elimination dengan Best of 3 untuk semifinal dan Best of 5 untuk final.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Durasi Event</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Turnamen berlangsung 1-2 hari dengan babak penyisihan dan final di hari yang sama.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Syarat Peserta</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Rank minimal Epic. Semua anggota tim harus dari server Indonesia.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Platform</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Turnamen dimainkan secara online melalui custom room Mobile Legends: Bang Bang.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Perlengkapan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Device sendiri, koneksi internet stabil minimal 10 Mbps, dan Discord untuk komunikasi.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
          <h3 className="font-orbitron text-2xl font-bold mb-4 text-center">
            Aturan Penting Tournament
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-primary">Aturan Umum:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Check-in 30 menit sebelum pertandingan</li>
                <li>• Maksimal 10 menit keterlambatan</li>
                <li>• Screenshot hasil wajib dikirim</li>
                <li>• Dilarang menggunakan bug atau exploit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Hero & Ban Pick:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Draft pick mode dengan ban phase</li>
                <li>• Setiap tim dapat ban 3 hero</li>
                <li>• Tidak ada hero yang dilarang</li>
                <li>• Skin tidak mempengaruhi permainan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileLegendsInfo;