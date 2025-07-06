
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TournamentServices = () => {
  const { toast } = useToast();

  const services = [
    {
      id: 1,
      title: 'Tournament Organization',
      price: 'Rp 500.000',
      description: 'Layanan penyelenggaraan turnamen esports profesional',
      features: [
        'Setup dan konfigurasi turnamen',
        'Sistem bracket management',
        'Live scoring dan tracking',
        'Sertifikat untuk pemenang',
        'Technical support selama event',
        'Basic streaming setup'
      ],
      icon: Trophy,
      popular: false
    },
    {
      id: 2,
      title: 'Full Tournament Package',
      price: 'Rp 750.000',
      description: 'Paket lengkap turnamen termasuk recruitment pemain',
      features: [
        'Semua fitur Tournament Organization',
        'Player recruitment dan registration',
        'Marketing dan promosi event',
        'Community management',
        'Prize pool management',
        'Advanced streaming production',
        'Post-event analytics',
        'Social media coverage'
      ],
      icon: Users,
      popular: true
    }
  ];

  const handleContactService = (serviceTitle: string, servicePrice: string) => {
    // Show success notification to user
    toast({
      title: "Pesanan Berhasil Dikirim!",
      description: `Terima kasih atas minat Anda pada ${serviceTitle}. Tim kami akan segera menghubungi Anda!`,
      duration: 5000,
    });

    // Show admin notification (in a real app, this would be sent to your backend)
    setTimeout(() => {
      toast({
        title: "🔔 Pesanan Baru Masuk!",
        description: `Pelanggan baru memesan: ${serviceTitle} (${servicePrice})`,
        duration: 8000,
      });
    }, 1000);

    // Log the order details (in a real app, this would be sent to your backend/analytics)
    console.log('New service order:', {
      package: serviceTitle,
      price: servicePrice,
      timestamp: new Date().toISOString(),
      userId: 'anonymous', // In a real app, you'd have user authentication
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
              <span className="gradient-text">Tournament Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Layanan profesional untuk menyelenggarakan turnamen esports yang berkualitas dan memorable
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-6 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.id} className={`relative ${service.popular ? 'border-primary shadow-lg' : ''}`}>
                    {service.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                        Most Popular
                      </Badge>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-orbitron">{service.title}</CardTitle>
                      <div className="text-3xl font-bold text-primary font-orbitron">
                        {service.price}
                      </div>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full font-semibold"
                        size="lg"
                        onClick={() => handleContactService(service.title, service.price)}
                      >
                        Pilih Paket Ini
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-orbitron mb-8">
              Mengapa Memilih <span className="gradient-text">Arjuna Esports</span>?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pengalaman Profesional</h3>
                <p className="text-muted-foreground">
                  Tim berpengalaman dalam menyelenggarakan berbagai turnamen esports
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
                <p className="text-muted-foreground">
                  Jaringan luas pemain dan komunitas esports di seluruh Indonesia
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">End-to-End Service</h3>
                <p className="text-muted-foreground">
                  Dari perencanaan hingga eksekusi, kami handle semua aspek turnamen
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TournamentServices;
