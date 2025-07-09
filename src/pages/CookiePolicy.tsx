
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-orbitron mb-8 text-center">
              <span className="gradient-text">Kebijakan Cookie</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <div className="bg-card/50 p-6 rounded-lg border">
                <p className="text-sm text-muted-foreground mb-4">
                  Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
                </p>
                
                <h2 className="text-2xl font-semibold text-foreground mb-4">Apa itu Cookie?</h2>
                <p className="mb-4">
                  Cookie adalah file teks kecil yang ditempatkan pada perangkat Anda saat mengunjungi situs web kami. 
                  Cookie membantu kami memberikan pengalaman yang lebih baik dengan mengingat preferensi Anda dan 
                  memahami bagaimana Anda menggunakan situs web kami.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">Jenis Cookie yang Kami Gunakan</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">1. Cookie yang Diperlukan</h3>
                <p className="mb-4">
                  Cookie ini penting untuk fungsi dasar situs web dan tidak dapat dinonaktifkan. 
                  Termasuk pengaturan keamanan, preferensi bahasa, dan informasi sesi login.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">2. Cookie Kinerja</h3>
                <p className="mb-4">
                  Cookie ini mengumpulkan informasi tentang bagaimana pengunjung menggunakan situs web, 
                  seperti halaman yang paling sering dikunjungi dan pesan kesalahan yang muncul. 
                  Informasi ini digunakan untuk meningkatkan kinerja situs web.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">3. Cookie Fungsional</h3>
                <p className="mb-4">
                  Cookie ini memungkinkan situs web mengingat pilihan yang Anda buat (seperti nama pengguna, 
                  bahasa, atau wilayah) dan memberikan fitur yang lebih personal dan relevan.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">4. Cookie Analitik</h3>
                <p className="mb-4">
                  Kami menggunakan cookie analitik untuk memahami bagaimana pengunjung berinteraksi dengan 
                  situs web kami. Ini membantu kami menganalisis data dan meningkatkan pengalaman pengguna.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">Mengelola Cookie</h2>
                <p className="mb-4">
                  Anda dapat mengontrol dan/atau menghapus cookie sesuai keinginan. Anda dapat menghapus 
                  semua cookie yang sudah ada di komputer Anda dan mengatur sebagian besar browser untuk 
                  mencegah penempatan cookie.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">Cara Menonaktifkan Cookie:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie Pihak Ketiga</h2>
                <p className="mb-4">
                  Situs web kami mungkin menggunakan layanan pihak ketiga seperti Google Analytics, 
                  media sosial, atau platform periklanan yang dapat menempatkan cookie pada perangkat Anda. 
                  Cookie ini diatur oleh pihak ketiga dan tunduk pada kebijakan privasi mereka.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">Perubahan Kebijakan Cookie</h2>
                <p className="mb-4">
                  Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan 
                  perubahan pada praktik kami atau karena alasan operasional, hukum, atau peraturan lainnya.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">Hubungi Kami</h2>
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Cookie ini, silakan hubungi kami melalui:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Email: privacy@arjunaesports.com</li>
                  <li>Telepon: +62 21 1234 5678</li>
                  <li>Alamat: Jakarta, Indonesia</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
