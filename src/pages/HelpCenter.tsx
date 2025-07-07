
import { HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const HelpCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Bagaimana cara mendaftar turnamen?",
      answer: "Klik tombol 'Daftar Sekarang' pada kartu turnamen mana pun dan isi formulir pendaftaran. Pastikan untuk menyelesaikan pendaftaran setidaknya 48 jam sebelum turnamen dimulai."
    },
    {
      question: "Apa saja persyaratan teknis yang diperlukan?",
      answer: "Anda memerlukan koneksi internet yang stabil, perangkat mobile yang kompatibel untuk Mobile Legends, dan Discord untuk komunikasi tim selama pertandingan."
    },
    {
      question: "Bagaimana hadiah didistribusikan?",
      answer: "Hadiah didistribusikan dalam waktu 7 hari kerja setelah turnamen selesai. Pemenang akan dihubungi melalui email terdaftar untuk detail pengambilan hadiah."
    },
    {
      question: "Bisakah saya berpartisipasi dalam beberapa turnamen?",
      answer: "Ya, Anda dapat mendaftar untuk beberapa turnamen selama tidak ada konflik jadwal dan Anda memenuhi semua persyaratan untuk setiap turnamen."
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
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Pusat Bantuan
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan dan dapatkan dukungan yang Anda butuhkan.
            </p>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Pertanyaan yang Sering Diajukan</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card/50 border border-border/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Butuh Bantuan Lebih Lanjut?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground text-sm mb-4">Chat dengan tim dukungan kami</p>
                <Button size="sm" variant="outline">Mulai Chat</Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Dukungan Email</h3>
                <p className="text-muted-foreground text-sm mb-4">Dapatkan bantuan melalui email</p>
                <Button size="sm" variant="outline">Kirim Email</Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Dukungan Telepon</h3>
                <p className="text-muted-foreground text-sm mb-4">Hubungi hotline dukungan kami</p>
                <Button size="sm" variant="outline">Telepon Sekarang</Button>
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

export default HelpCenter;
