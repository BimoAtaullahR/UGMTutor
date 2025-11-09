// Lokasi: src/app/course/[courseId]/page.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

// Komponen UI
import PublicHeader from '@/components/PublicHeader'; //
import PublicFooter from '@/components/PublicFooter'; //
import { Button } from '@/components/ui/button'; //
import { Card } from '@/components/ui/card'; //
import { ChevronLeft, BookOpen, MapPin, MessageCircle } from 'lucide-react';

// --- (A) TIPE DATA ---
// Tipe ini spesifik untuk halaman detail, mengambil data tutor (objek tunggal)
type CourseDetail = {
  id: string;
  subject_name: string;
  description: string;
  price: number;
  location: string;
  cover_image_url: string | null;
  tutor_id: string; 
  tutors: {
    full_name: string;
    profile_picture_url: string | null;
    major: string | null;
    whatsapp_number: string | null; // Kita ambil nomor WA
  } | null;
};

// --- (B) FUNGSI AMBIL DATA ---
// Fungsi Server Component untuk mengambil data course tunggal
async function getCourseDetails(courseId: string): Promise<CourseDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, tutors(full_name, profile_picture_url, major, whatsapp_number)") // Ambil juga nomor WA
    .eq("id", courseId)
    .single(); // .single() mengambil satu objek, BUKAN array
  
  if (error) {
    console.error("Error fetching course detail:", error.message);
    notFound(); // Tampilkan halaman 404 jika course tidak ditemukan
  }
  return data;
}

// --- (C) KOMPONEN HALAMAN UTAMA ---
export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  
  const course = await getCourseDetails(params.courseId);

  if (!course) {
     notFound();
  }

  const tutor = course.tutors;
  
  // Format harga
  const priceFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(course.price);

  // Buat link WhatsApp
  const whatsappNumber = tutor?.whatsapp_number;
  // Ubah nomor (misal: 0812...) menjadi format link internasional (62812...)
  const formattedWaNumber = whatsappNumber?.replace(/^0/, '62');
  const whatsappLink = whatsappNumber 
    ? `https://wa.me/${formattedWaNumber}` 
    : `/`; // Fallback jika tidak ada nomor WA

  return (
    <div className="font-sans antialiased bg-blue-50 min-h-screen">
      <PublicHeader />
      <main>
        <div className="container mx-auto max-w-7xl p-4 sm:p-8">
          
          {/* Tombol Kembali ke Profil Tutor (jika ada) */}
          <Link 
            href={`/`} // TODO: Ganti ke halaman profil tutor jika ada, misal: /tutor/${course.tutor_id}
            className="flex items-center text-gray-600 hover:text-blue-700 font-medium mb-8 transition-colors print:hidden"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Explore
          </Link>

          {/* Layout Detail Course */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kolom Kiri: Gambar dan Deskripsi */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-0 overflow-hidden">
                <div className="relative w-full h-64 sm:h-80 max-h-[400px]">
                  <Image 
                    src={course.cover_image_url || '/abstract.jpg'} //
                    alt={course.subject_name} 
                    fill
                    className="object-cover"
                    priority // Prioritaskan load gambar utama
                  />
                </div>
              </Card>

              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-700" />
                  About This Course
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {/* Tampilkan deskripsi dari database */}
                  <p>{course.description || "No description provided."}</p>
                </div>
              </Card>
            </div>
            
            {/* Kolom Kanan: Kartu Pemesanan */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8 shadow-lg">
                <div className="pb-4 mb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-blue-900">
                    {tutor ? `Tutoring by ${tutor.full_name}` : course.subject_name}
                  </h2>
                  <p className="text-sm text-gray-500">{tutor?.major || 'Universitas Gadjah Mada'}</p>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900">{course.subject_name}</h1>
                
                <div className="my-6">
                  <span className="text-4xl font-bold text-blue-700">{priceFormat}</span>
                  <span className="text-gray-500 font-medium ml-1">/ jam</span>
                </div>
                
                <Button asChild size="lg" className="w-full h-auto py-4 text-base font-semibold">
                   <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                     <MessageCircle className="w-5 h-5 mr-2" />
                     Get in Touch (WhatsApp)
                   </Link>
                </Button>
                
                <ul className="space-y-4 mt-8 text-gray-700 bg-blue-50/50 p-5 rounded-xl border">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="ml-3">
                        <p className="text-xs text-gray-500 uppercase font-semibold">LOCATION</p>
                        <p className="font-medium">{course.location}</p>
                    </div>
                  </li>
                  {/* Anda bisa tambahkan info lain di sini jika ada */}
                </ul>

              </Card>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};