# Arjuna Esports Ascend

Website resmi untuk tim **Arjuna Esports Ascend**, dirancang sebagai platform promosi digital yang modern, responsif, dan informatif. Proyek ini dibuat menggunakan **React + Vite**, dengan backend sederhana melalui **Supabase**, serta dideploy menggunakan **Vercel**.

## 🔥 Fitur Utama

- 🌐 Landing page profesional dan mobile-friendly
- 📌 Informasi tim esports dan event yang sedang atau akan berlangsung
- 🎮 Tampilan modern dengan animasi ringan dan struktur navigasi yang intuitif
- 🔐 Integrasi backend menggunakan Supabase (autentikasi & data ringan)
- ⚡ Hosting cepat & stabil menggunakan Vercel

## 🛠️ Teknologi yang Digunakan

- **React** – Library front-end modern berbasis komponen
- **TypeScript** – Menambahkan tipe statis dan skalabilitas
- **Tailwind CSS** – Utility-first CSS untuk styling yang efisien
- **Supabase** – Backend as a Service (BaaS) untuk autentikasi dan database
- **Vercel** – Hosting/deploy otomatis dari GitHub

## 🚀 Cara Menjalankan Proyek

1. Clone repositori:
   ```bash
   git clone https://github.com/Lusmaysh/arjuna-esports-ascend.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd arjuna-esports-ascend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan proyek:
   ```bash
   npm run dev
   ```

> ⚠️ Untuk koneksi Supabase, kamu perlu membuat `.env` file dengan konfigurasi API key kamu.

## 📦 Struktur Folder

```
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MobileLegendsInfo.tsx
│   │   ├── Navigation.tsx
│   │   ├── StorySection.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TournamentCard.tsx
│   │   ├── TournamentShowcase.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toaster.tsx
│   │       ├── toast.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       └── use-toast.ts
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useTournamentStatusRefresh.ts
│   │   └── useTournaments.ts
│   ├── index.css
│   ├── integrations
│   │   └── supabase
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── Admin.tsx
│   │   ├── Community.tsx
│   │   ├── ContactUs.tsx
│   │   ├── CookiePolicy.tsx
│   │   ├── Dashboard.tsx
│   │   ├── HelpCenter.tsx
│   │   ├── Index.tsx
│   │   ├── NewsUpdates.tsx
│   │   ├── NotFound.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── Rankings.tsx
│   │   ├── Schedule.tsx
│   │   ├── TermsOfService.tsx
│   │   ├── TournamentDetail.tsx
│   │   ├── TournamentRules.tsx
│   │   ├── TournamentServices.tsx
│   │   ├── Tournaments.tsx
│   │   └── VisiMisi.tsx
│   └── vite-env.d.ts
├── supabase
│   ├── config.toml
│   └── migrations
│       ├── 20250706010057-6bb4ffdc-d309-4eb9-aaf0-37c7bd09052b.sql
│       ├── 20250707141553-0bea9792-9334-4184-8756-dc50f99a8d0f.sql
│       ├── 20250709142549-ad4f4a51-e4f1-4b35-af09-334125ee2537.sql
│       ├── 20250709155601-76483022-ae80-4774-a14c-563cc9a13ab2.sql
│       ├── 20250709160122-d8581d4c-d3fb-49ae-844a-45420a099dad.sql
│       ├── 20250709160839-4fcb8e25-e3ff-4583-a0ec-16106bc8fe61.sql
│       ├── 20250801063822_5756ded4-6af9-459f-baf0-e8487810f0d5.sql
│       └── 20250801064616_6e5cc879-f686-4e67-9ce3-28af3a741c44.sql
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📸 Tampilan (Screenshots)
  <!-- > (Tambahkan screenshot tampilan UI jika ada) -->

## 🧑‍💻 Kontributor

- **Syamsul Hidayat** – Fullstack Developer  
  GitHub: [@Lusmaysh](https://github.com/Lusmaysh)

## 📄 Lisensi

Proyek ini bersifat open-source dan menggunakan lisensi [MIT](LICENSE).
