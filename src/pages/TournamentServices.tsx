import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Users, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

const TournamentServices = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{title: string, price: string} | null>(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const services = [
    {
      id: 1,
      title: 'Tournament Organization',
      price: '500.000',
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
      price: '750.000',
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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('service_orders')
        .insert({
          customer_name: customerData.name,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          service_title: selectedService.title,
          service_price: selectedService.price,
          notes: customerData.notes,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Success notification for customer
      toast({
        title: "Pesanan Berhasil Dikirim! ✅",
        description: `Terima kasih ${customerData.name}! Pesanan Anda untuk ${selectedService.title} telah diterima. Kami akan segera menghubungi Anda.`,
        duration: 5000,
      });

      // Reset form
      setCustomerData({ name: '', email: '', phone: '', notes: '' });
      setSelectedService(null);
      
      // Close the dialog
      setIsDialogOpen(false);

      console.log('New service order created:', data);
    } catch (error) {
      console.error('Error creating service order:', error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal mengirim pesanan. Silakan coba lagi.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openOrderDialog = (service: {title: string, price: string}) => {
    setSelectedService(service);
    setIsDialogOpen(true);
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
                        Rp {service.price}
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
                      
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full font-semibold"
                            size="lg"
                            onClick={() => openOrderDialog(service)}
                          >
                            Pilih Paket Ini
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Pesan {selectedService?.title}</DialogTitle>
                            <DialogDescription>
                              Isi informasi Anda dan kami akan menghubungi Anda segera.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleOrderSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Nama Lengkap *</Label>
                              <Input
                                id="name"
                                value={customerData.name}
                                onChange={(e) => setCustomerData(prev => ({...prev, name: e.target.value}))}
                                required
                                placeholder="Masukkan nama lengkap Anda"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={customerData.email}
                                onChange={(e) => setCustomerData(prev => ({...prev, email: e.target.value}))}
                                required
                                placeholder="nama@email.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Nomor Telepon *</Label>
                              <Input
                                id="phone"
                                value={customerData.phone}
                                onChange={(e) => setCustomerData(prev => ({...prev, phone: e.target.value}))}
                                required
                                placeholder="08xxxxxxxxxx"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes">Catatan Tambahan</Label>
                              <Textarea
                                id="notes"
                                value={customerData.notes}
                                onChange={(e) => setCustomerData(prev => ({...prev, notes: e.target.value}))}
                                placeholder="Ceritakan tentang turnamen yang ingin Anda selenggarakan..."
                                rows={3}
                              />
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                <strong>Paket:</strong> {selectedService?.title}<br />
                                <strong>Harga:</strong> {selectedService?.price}
                              </p>
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                              {isSubmitting ? 'Mengirim...' : 'Kirim Pesanan'}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
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
