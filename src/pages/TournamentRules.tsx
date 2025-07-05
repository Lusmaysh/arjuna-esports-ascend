
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
      title: "Komposisi Tim",
      description: "Setiap tim harus terdiri dari 5 pemain dengan 1 pemain cadangan yang diizinkan."
    },
    {
      icon: Clock,
      title: "Durasi Pertandingan",
      description: "Pertandingan standar memiliki batas waktu 30 menit. Aturan perpanjangan waktu berlaku jika diperlukan."
    },
    {
      icon: Shield,
      title: "Fair Play",
      description: "Tidak ada kecurangan, hacking, atau perilaku tidak sportif. Pelanggaran mengakibatkan diskualifikasi langsung."
    },
    {
      icon: CheckCircle,
      title: "Standar Peralatan",
      description: "Semua pemain harus menggunakan perangkat yang disetujui dan menjaga koneksi internet yang stabil."
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
                Aturan Turnamen
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Aturan dan regulasi resmi untuk semua turnamen Arjuna Esports. 
              Harap baca dengan cermat sebelum berpartisipasi.
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
              Regulasi Terperinci
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Persyaratan Pendaftaran</h3>
                <p>Semua pemain harus terdaftar 48 jam sebelum turnamen dimulai. KTP yang valid dan informasi kontak diperlukan.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Protokol Pertandingan</h3>
                <p>Pemain harus bergabung dengan lobby yang ditentukan 15 menit sebelum waktu pertandingan terjadwal. Keterlambatan dapat mengakibatkan forfeit.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">3. Masalah Teknis</h3>
                <p>Dalam kasus kesulitan teknis, segera beritahu panitia turnamen. Pertandingan dapat dihentikan sementara atau dijadwal ulang atas kebijaksanaan penyelenggara.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">4. Distribusi Hadiah</h3>
                <p>Hadiah akan didistribusikan dalam 7 hari kerja setelah turnamen berakhir. Tanggung jawab pajak ada pada pemenang.</p>
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

export default TournamentRules;
