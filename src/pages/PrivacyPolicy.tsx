
import { Shield, Eye, Lock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Kebijakan Privasi
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Privasi Anda penting bagi kami. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Terakhir diperbarui: Januari 2024
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 text-center">
              <Eye className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Transparansi</h3>
              <p className="text-muted-foreground text-sm">Kami jelas tentang data apa yang kami kumpulkan dan mengapa</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 text-center">
              <Lock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Keamanan</h3>
              <p className="text-muted-foreground text-sm">Data Anda dilindungi dengan keamanan standar industri</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 text-center">
              <Database className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Kontrol</h3>
              <p className="text-muted-foreground text-sm">Anda memiliki kontrol atas informasi pribadi Anda</p>
            </div>
          </div>

          {/* Policy Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Informasi yang Kami Kumpulkan</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Informasi Pendaftaran</h3>
                  <p>Ketika Anda mendaftar untuk turnamen, kami mengumpulkan nama, alamat email, username game, dan detail kontak Anda.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Data Penggunaan</h3>
                  <p>Kami secara otomatis mengumpulkan informasi tentang bagaimana Anda menggunakan website kami, termasuk halaman yang dikunjungi dan waktu yang dihabiskan.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Data Komunikasi</h3>
                  <p>Ketika Anda menghubungi kami, kami menyimpan catatan komunikasi Anda untuk memberikan dukungan yang lebih baik.</p>
                </div>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Bagaimana Kami Menggunakan Informasi Anda</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• Untuk mengorganisir dan mengelola pendaftaran turnamen</p>
                <p>• Untuk mengkomunikasikan pembaruan dan pengumuman turnamen</p>
                <p>• Untuk meningkatkan layanan dan pengalaman pengguna kami</p>
                <p>• Untuk memastikan fair play dan integritas turnamen</p>
                <p>• Untuk mematuhi kewajiban hukum</p>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Perlindungan Data</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah.</p>
                <p>Data Anda disimpan di server yang aman dan akses dibatasi hanya untuk personel yang berwenang.</p>
                <p>Kami secara rutin meninjau praktik keamanan kami untuk memastikan informasi Anda tetap terlindungi.</p>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Hak Anda</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• <strong>Akses:</strong> Meminta salinan data pribadi Anda</p>
                <p>• <strong>Koreksi:</strong> Memperbarui atau mengoreksi informasi Anda</p>
                <p>• <strong>Penghapusan:</strong> Meminta penghapusan data Anda</p>
                <p>• <strong>Portabilitas:</strong> Meminta transfer data Anda</p>
                <p>• <strong>Keberatan:</strong> Menolak pemrosesan data Anda</p>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Hubungi Kami</h2>
              <p className="text-muted-foreground">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau bagaimana kami menangani data Anda, 
                silakan hubungi kami di <strong>privacy@arjuna-esports.com</strong> atau gunakan formulir kontak kami.
              </p>
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

export default PrivacyPolicy;
