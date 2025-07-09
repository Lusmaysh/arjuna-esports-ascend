
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-orbitron mb-8 text-center">
              <span className="gradient-text">Syarat dan Ketentuan</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <div className="bg-card/50 p-6 rounded-lg border">
                <p className="text-sm text-muted-foreground mb-4">
                  Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
                </p>
                
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Penerimaan Syarat</h2>
                <p className="mb-4">
                  Dengan mengakses dan menggunakan platform Arjuna Esports, Anda menyetujui untuk terikat 
                  oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui syarat-syarat ini, 
                  mohon untuk tidak menggunakan layanan kami.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Deskripsi Layanan</h2>
                <p className="mb-4">
                  Arjuna Esports adalah platform yang menyediakan layanan penyelenggaraan turnamen esports, 
                  komunitas gaming, dan layanan terkait esports lainnya. Kami berhak mengubah, 
                  memodifikasi, atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Pendaftaran dan Akun</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Persyaratan Pendaftaran</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Anda harus berusia minimal 13 tahun atau memiliki izin orang tua/wali</li>
                  <li>Memberikan informasi yang akurat dan lengkap</li>
                  <li>Menjaga keamanan akun dan password Anda</li>
                  <li>Tidak membagikan akun dengan pihak lain</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Tanggung Jawab Akun</h3>
                <p className="mb-4">
                  Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di akun Anda. 
                  Segera laporkan kepada kami jika terjadi penggunaan akun yang tidak sah.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Aturan Turnamen</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">4.1 Partisipasi</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Peserta harus mendaftar sesuai dengan prosedur yang ditetapkan</li>
                  <li>Membayar biaya pendaftaran jika diperlukan</li>
                  <li>Mematuhi jadwal dan aturan yang telah ditetapkan</li>
                  <li>Berperilaku sportif dan tidak melakukan kecurangan</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">4.2 Diskualifikasi</h3>
                <p className="mb-4">
                  Kami berhak mendiskualifikasi peserta yang melanggar aturan, melakukan kecurangan, 
                  atau berperilaku tidak sportif tanpa pengembalian biaya pendaftaran.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Pembayaran dan Pengembalian Dana</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">5.1 Biaya Pendaftaran</h3>
                <p className="mb-4">
                  Biaya pendaftaran turnamen harus dibayar penuh sebelum batas waktu yang ditentukan. 
                  Pembayaran yang terlambat dapat mengakibatkan pembatalan pendaftaran.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">5.2 Kebijakan Pengembalian</h3>
                <p className="mb-4">
                  Pengembalian dana hanya dapat dilakukan dalam kondisi tertentu seperti pembatalan 
                  turnamen oleh penyelenggara. Pengembalian dana atas permintaan peserta tidak dapat dilakukan 
                  kecuali dalam keadaan khusus yang ditentukan oleh penyelenggara.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Perilaku Pengguna</h2>
                <p className="mb-4">Pengguna dilarang untuk:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Menggunakan bahasa yang kasar, menyinggung, atau tidak pantas</li>
                  <li>Melakukan spam atau mengirim konten yang tidak relevan</li>
                  <li>Menyebarkan informasi palsu atau menyesatkan</li>
                  <li>Melakukan tindakan yang dapat merusak platform atau mengganggu pengguna lain</li>
                  <li>Menggunakan platform untuk tujuan ilegal</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Hak Kekayaan Intelektual</h2>
                <p className="mb-4">
                  Semua konten di platform Arjuna Esports, termasuk namun tidak terbatas pada logo, 
                  desain, teks, gambar, dan video dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. 
                  Penggunaan tanpa izin dilarang keras.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Privasi</h2>
                <p className="mb-4">
                  Penggunaan data pribadi Anda diatur dalam Kebijakan Privasi kami yang merupakan 
                  bagian integral dari Syarat dan Ketentuan ini.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Batasan Tanggung Jawab</h2>
                <p className="mb-4">
                  Arjuna Esports tidak bertanggung jawab atas kerugian langsung, tidak langsung, 
                  insidental, atau konsekuensial yang timbul dari penggunaan platform kami. 
                  Layanan disediakan "sebagaimana adanya" tanpa jaminan apapun.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Perubahan Syarat dan Ketentuan</h2>
                <p className="mb-4">
                  Kami berhak mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan berlaku 
                  segera setelah dipublikasikan di platform kami. Penggunaan berkelanjutan dari 
                  layanan kami setelah perubahan dianggap sebagai persetujuan terhadap syarat yang baru.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Penghentian Layanan</h2>
                <p className="mb-4">
                  Kami dapat menghentikan atau menangguhkan akses Anda ke layanan kami kapan saja 
                  jika Anda melanggar Syarat dan Ketentuan ini atau melakukan tindakan yang merugikan 
                  platform atau pengguna lain.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Hukum yang Berlaku</h2>
                <p className="mb-4">
                  Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa 
                  yang timbul akan diselesaikan melalui pengadilan yang berwenang di Jakarta, Indonesia.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Hubungi Kami</h2>
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Email: legal@arjunaesports.com</li>
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

export default TermsOfService;
