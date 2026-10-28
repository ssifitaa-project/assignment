# Curriculum Vitae & Galeri Kegiatan Harian
### Nurfita Lestari - Semester 7

Website personal profil Curriculum Vitae (CV) interaktif dan dokumentasi galeri kegiatan harian berbasis HTML5, CSS3 murni, dan JavaScript modern.

Dibuat untuk tugas mata kuliah **Web Development Management**.

---

## 🌟 Fitur Utama

### 1. Halaman Utama CV (`index.html`)
- **Header & Navigasi**: Menu lengkap (*Biodata*, *Pendidikan*, *Pengalaman*, *Keahlian*, *Kontak*, dan tautan ke *Galeri Kegiatan*).
- **Dark / Light Mode Toggle**: Beralih tema gelap/terang secara instan dengan sinkronisasi *Local Storage*.
- **Cetak CV / Print-Ready**: Desain CSS cetak (`@media print`) yang dioptimalkan untuk cetak fisik atau simpan format PDF.
- **Hero Interaktif**: Dilengkapi foto profil (`gigihadid.jpg`) dan efek teks ketik dinamis (*typing effect*).
- **Biodata**: Data pribadi lengkap, profil dedikasi, minat karir, dan ringkasan statistik.
- **Pendidikan**: *Timeline* pendidikan formal S1 dan riwayat sekolah beserta sorotan mata kuliah relevan.
- **Pengalaman**: Filter kategori pengalaman (*Proyek & Web*, *Organisasi & Tim*, *Akademik & Magang*).
- **Keahlian**: Animasi progress bar keahlian teknis (*Technical Skills*), kisi-kisi peralatan (*Tools & Software*), serta *badge soft skills*.
- **Formulir Kontak**: Simulasi pengiriman pesan cepat dengan notifikasi *toast*.

### 2. Halaman Galeri Kegiatan Harian (`galeri.html`)
- **Rutinitas Harian (*Daily Routine Timeline*)**: Gambaran alur produktif mahasiswi semester 7 mulai dari pagi hari hingga malam.
- **Galeri Foto Interaktif**: Grid foto kegiatan dengan penyaringan tab kategori (*Perkuliahan*, *Coding & Proyek*, *Organisasi*, *Hobi & Santai*) dan pencarian *real-time*.
- **Lightbox Modal**: Pratinjau foto resolusi penuh dengan navigasi *Next/Prev* dan dukungan navigasi keyboard (*Arrow keys* & *Esc*).
- **Tambah Kegiatan Baru**: Formulir interaktif untuk menambahkan dokumentasi aktivitas secara dinamis dari peramban.

---

## 📁 Struktur Berkas

```
Project/
├── index.html       # Halaman utama CV Nurfita Lestari
├── galeri.html      # Halaman galeri kegiatan harian & rutinitas
├── style.css        # Desain responsif, tema gelap/terang, animasi, & layout cetak
├── script.js        # Logika interaktif halaman utama (Dark mode, typing effect, filter)
├── gallery.js       # Logika interaktif galeri (Penyaringan tab, pencarian, lightbox modal)
├── gigihadid.jpg    # Foto profil
└── README.md        # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

1. Clone repositori ini:
   ```bash
   git clone https://github.com/ssifitaa-project/assignment.git
   ```
2. Buka berkas `index.html` atau `galeri.html` langsung di peramban web (Google Chrome, Microsoft Edge, Firefox, dll.).
3. Tidak memerlukan dependensi atau *server build* tambahan (siap dijalankan langsung).

---

© 2026 **Nurfita Lestari**. Dibuat dengan dedikasi untuk Web Development Management.
