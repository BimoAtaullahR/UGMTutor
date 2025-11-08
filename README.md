# GamAjar  tutors

 **GamaAjar** adalah platform marketplace tutor *peer-to-peer* (rekan sejawat) berbasis web yang dirancang khusus untuk menjembatani kesenjangan akademik di lingkungan **Universitas Gadjah Mada (UGM)**.

Platform ini mengubah proses pencarian tutor informal (dari mulut ke mulut atau grup WA) yang tidak efisien menjadi sebuah alur digital yang terstruktur, efisien, dan dapat diakses oleh semua mahasiswa.

**Live Demo:** [**https://gam-ajar.vercel.app/**](https://gam-ajar.vercel.app/)

-----

 \#\# 🚀 Latar Belakang

Proyek ini dibuat dalam **5 hari** sebagai bagian dari **Lomba WebCraft 2025**.

Mahasiswa UGM sering kesulitan menemukan bimbingan belajar tambahan yang relevan. Solusi yang ada saat ini memiliki kekurangan:

  * **Grup WA/Line:** Sangat tidak terstruktur, informasi penting tenggelam, dan pencarian tutor bersifat untung-untungan.
  * **Bimbel Komersial:** Mahal, jadwal kaku, dan materi belum tentu relevan dengan kurikulum spesifik dosen UGM.

GamAjar hadir sebagai solusi **hiper-lokal** yang menggabungkan **struktur** dari bimbel komersial dengan **kepercayaan, relevansi, dan fleksibilitas** dari sistem tutor sebaya.

## ✨ Fitur Inti (MVP)

Fokus kami adalah meluncurkan produk yang fungsional dan teruji dengan fitur inti yang paling esensial:

  * **Autentikasi Tutor:** Sistem *Sign Up* dan *Sign In* yang aman untuk Tutor, divalidasi hanya untuk email UGM (`@ugm.ac.id`).
  * **Manajemen Profil & Course:** *Dashboard* privat bagi tutor untuk membuat, mengedit, dan menghapus profil serta jasa (*course*) yang mereka tawarkan (termasuk mata kuliah, harga, deskripsi, dan gambar *cover*).
  * **Halaman Discovery Publik:** Halaman utama yang menampilkan semua *course* yang tersedia bagi Tutee (publik) untuk dijelajahi.
  * **Pencarian & Filter:** *Core engine* platform. Memungkinkan Tutee mencari *course* secara instan berdasarkan nama mata kuliah dan memfilter berdasarkan kategori.
  * **Halaman Detail:** Halaman profil publik untuk setiap tutor dan halaman detail untuk setiap *course*.
  * **Inovasi Alur Cepat (Tombol WA):** Sebagai ganti sistem *booking* yang rumit, kami mengimplementasikan tombol "Hubungi via WA" untuk koneksi instan antara Tutee dan Tutor, menurunkan hambatan adopsi secara drastis.

## 🛠️ Tech Stack

Platform ini dibangun menggunakan *tech stack* modern yang berfokus pada kecepatan pengembangan dan keandalan.

  * **UI/UX:** **Figma**
  * **Frontend:** **Next.js 14+** (App Router), **React**, **Tailwind CSS**, **shadcn/ui**
  * **Backend:** **Next.js (API Routes)**
  * **Database & BaaS:** **Supabase**
      * **PostgreSQL** (Database)
      * **Supabase Auth** (Autentikasi & RLS)
      * **Supabase Storage** (Upload Foto Profil & Cover Course)
  * **Deployment:** **Vercel**

## 🏁 Memulai (Pengembangan Lokal)

Untuk menjalankan proyek ini di komputer lokal Anda:

1.  **Clone repositori:**

    ```bash
    git clone https://github.com/BimoAtaullahR/GamAjar.git
    cd GamAjar
    ```

2.  **Instal dependensi:**

    ```bash
    npm install
    ```

3.  **Siapkan Environment Variables:**
    Buat file baru bernama `.env.local` di *root* proyek. Salin isi dari `.env.example` (jika ada) dan isi dengan *keys* Supabase Anda:

    ```
    NEXT_PUBLIC_SUPABASE_URL=https://[ID_PROYEK_ANDA].supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[KUNCI_ANON_ANDA]
    SUPABASE_SERVICE_ROLE_KEY=[KUNCI_SERVICE_ROLE_ANDA]
    ```

4.  **Jalankan server pengembangan:**

    ```bash
    npm run dev
    ```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di *browser* Anda.

## 👥 Tim Kami

Produk ini dirancang dan dibangun oleh:

  * **Gilbard Kinan Nangwaya** (`556096`)
  * **Ataya Fiqri Risqullah** (`567272`)
  * **Bimo Ataullah Rahman** (`556364`)
  * **Naryana Maulana Putera** (`555076`)
