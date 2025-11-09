// Lokasi: src/app/page.tsx
// Ini adalah Server Component (TIDAK ADA 'use client' di atas)

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { Search, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Impor komponen UI shadcn Anda
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Tentukan tipe data untuk course
type Course = {
  id: string;
  subject_name: string;
  price: number;
  description: string;
  cover_image_url?: string;
  tutors: { // Data hasil JOIN
    full_name: string;
    profile_picture_url?: string;
  } | null;
};

// --- KOMPONEN HEADER ---
// Kita ubah untuk menerima 'user' dan 'searchQuery'
const LandingHeader = ({ user, searchQuery }: { user: any, searchQuery?: string }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 print:hidden">
      <div className="container mx-auto max-w-7xl flex justify-between items-center gap-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/logo-gamajar.svg" alt="Logo" width={160} height={40} className="h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-200 hover:text-white font-medium">
              Home
            </Link>
            <Link href="/#courses-section" className="text-gray-200 hover:text-white font-medium">
              Explore
            </Link>
          </nav>
        </div>

        {/* --- FORM PENCARIAN (Sudah di-upgrade) --- */}
        <div className="flex-1 max-w-lg">
          <form action="/" method="GET" className="relative">
            <input
              type="text"
              name="search" // <-- Kunci untuk query param
              placeholder="Search Your Tutor (e.g., Kalkulus)"
              defaultValue={searchQuery} // <-- Tampilkan pencarian saat ini
              className="bg-white/20 text-white placeholder-gray-300 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
            <button type="submit" className="hidden"></button>
          </form>
        </div>

        {/* --- Tombol Akun (Dinamis) --- */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            // Jika sudah login, arahkan ke dashboard
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-200 hover:text-white font-medium">
              <Image
                src={user.user_metadata?.avatar_url || "/profpic.svg"}
                alt="Profile"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full bg-white/30"
              />
              Dashboard
            </Link>
          ) : (
            // Jika belum login, arahkan ke login
            <Link href="/login" className="flex items-center gap-2 text-gray-200 hover:text-white font-medium">
              <Image
                src="/profpic.svg"
                alt="Profile"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full bg-white/30 p-1"
              />
              Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

// --- KOMPONEN FOOTER ---
// (Tidak perlu diubah, sudah bagus)
const LandingFooter = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 py-16 print:hidden">
      {/* ... (Salin-tempel kode LandingFooter Anda di sini) ... */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image src="/logo-gamajar.svg" alt="Logo" width={160} height={40} className="h-10 w-auto" />
            <p className="mt-4 text-sm">
              Connecting UGM students for peer-to-peer learning and skill sharing.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/signup" className="hover:text-white">Become a Tutor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
            	<li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Email: contact@gamajar.id</li>
            	<li>Address: Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} GamAjar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- KOMPONEN FILTER KATEGORI ---
// Di-refactor untuk menggunakan <Link> (Server Component)
const CategorySearch = ({ activeCategory }: { activeCategory?: string }) => {
  const categories = ['Science', 'Politics', 'Business', 'Engineering'];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-200 rounded-xl p-10 text-center">
          <h3 className="text-3xl font-bold text-gray-800">Find From Category</h3>
          <p className="text-gray-600 mt-2">Explore the expertise you need, from science to social studies.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map((category) => (
              <Button key={category} asChild
                variant={activeCategory === category.toLowerCase() ? 'default' : 'secondary'}
                className="py-2 px-6 rounded-full font-medium transition duration-300"
              >
                <Link href={`/?category=${category.toLowerCase()}`}>
                  {category}
                </Link>
              </Button>
            ))}
            {/* Tampilkan tombol reset jika ada filter */}
            {activeCategory && (
              <Button variant="ghost" asChild>
                <Link href="/">Clear Filter</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- KOMPONEN CARD COURSE (Menggantikan FeaturedTutorCard) ---
const CourseCard = ({ course }: { course: Course }) => {
  const tutorName = course.tutors?.full_name || 'Tutor';
  // Format harga
  const priceFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(course.price);

  return (
    <Link href={`/course/${course.id}`} className="block group">
      <Card className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col transition-shadow hover:shadow-2xl">
        <div className="relative h-64 w-full">
          <Image
            src={course.cover_image_url || '/abstract.jpg'} // Fallback ke abstract.jpg
            alt={course.subject_name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700">
            {course.subject_name}
          </CardTitle>
          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={course.tutors?.profile_picture_url || '/profpic.svg'}
              alt={tutorName}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full bg-gray-200"
            />
            <span className="text-sm text-gray-700">{tutorName}</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{priceFormat}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

// --- BAGIAN COURSE (Menggantikan FeaturedTutorsSection) ---
const FeaturedCoursesSection = ({ courses }: { courses: Course[] }) => {
  return (
    <section id="courses-section" className="bg-white pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          The right tutors for you
        </h2>
        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">No Courses Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// --- KOMPONEN HOW IT WORKS ---
// (Refactor: Dihapus 'navigate', gambar diganti)
const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: '1. Find Your Tutor',
      description: `Use our simple search to find tutors by the exact subjects you need, like 'Calculus' or 'Statistics', or browse by category`,
      imageUrl: '/placeholder-step1.jpg', // Ganti dengan gambar Anda di /public
    },
    {
      step: 2,
      title: '2. Check Their Profile',
      description: `View detailed profiles. See their faculty, expertise, hourly price, and preferred locations (Online, Perpusat, GSP, etc.).`,
      imageUrl: '/placeholder-step2.jpg', // Ganti dengan gambar Anda di /public
    },
    {
      step: 3,
      title: '3. Connect & Learn',
      description: `Found the one? Just click the button to contact them directly on WhatsApp. Arrange your schedule and pay them directly`,
      imageUrl: '/placeholder-step3.jpg', // Ganti dengan gambar Anda di /public
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-gray-800">How It Works</h3>
        <p className="text-gray-600 mt-2">Connecting with a tutor is simple and fast.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step) => (
            <div key={step.step} className="group bg-gray-50 p-6 rounded-lg shadow-md transition-shadow duration-300">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">{step.title}</h4>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- KOMPONEN CTA ---
// (Refactor: Dihapus 'navigate', diganti <Link>)
const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">Teach Smarter, Earn Easier</h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          Join our community of UGM peer tutors. Share your knowledge, help fellow students, and earn extra income on your own schedule.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-8 py-3 px-8 rounded-full shadow-lg">
          <Link href="/signup"> {/* <-- Diubah ke /signup */}
            Become a Tutor
          </Link>
        </Button>
      </div>
    </section>
  );
};

// --- KOMPONEN UTAMA HALAMAN (SERVER COMPONENT) ---
export default async function Homepage({
  searchParams
}: {
  searchParams?: { search?: string; category?: string };
}) {
  
  // 1. Ambil data user (untuk header)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Ambil data courses (untuk halaman)
  const searchQuery = searchParams?.search;
  const categoryQuery = searchParams?.category;

  let query = supabase
    .from('services') // Nama tabel Anda
    .select('*, tutors(full_name, profile_picture_url)'); // JOIN

  if (searchQuery) {
    query = query.ilike('subject_name', `%${searchQuery}%`);
  }
  if (categoryQuery) {
    query = query.eq('category', categoryQuery);
  }

  const { data: courses, error } = await query;

  if (error) {
    console.error("Error fetching courses for homepage:", error.message);
  }

  // 3. Render halaman
  return (
    <div className="font-sans antialiased bg-white">
      <LandingHeader user={user} searchQuery={searchQuery} />
      <main>
        <CategorySearch activeCategory={categoryQuery} />
        <FeaturedCoursesSection courses={courses as Course[] || []} />
        <HowItWorks />
        <CallToAction />
      </main>
      <LandingFooter />
    </div>
  );
}