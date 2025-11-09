// Lokasi: src/app/tutor/[tutorId]/page.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server'; //
import { notFound } from 'next/navigation';

// Impor komponen UI
import PublicHeader from '@/components/PublicHeader'; //
import PublicFooter from '@/components/PublicFooter'; //
import { Button } from '@/components/ui/button'; //

// --- (A) TIPE DATA ---
// Tipe untuk course/layanan
type Service = {
  id: string;
  subject_name: string;
  price: number;
  description: string;
  cover_image_url: string | null;
};

// Tipe untuk profil tutor (termasuk layanannya)
type TutorProfile = {
  id: string;
  full_name: string;
  major: string | null; // Asumsi 'Faculty' adalah 'major'
  about_me: string | null; // Asumsi ada kolom 'about_me'
  profile_picture_url: string | null;
  whatsapp_number: string | null;
  services: Service[]; // Ini adalah hasil join dari Supabase
};

// --- (B) FUNGSI AMBIL DATA ---
// Fungsi Server Component untuk mengambil data tutor
async function getTutorProfile(tutorId: string): Promise<TutorProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tutors")
    .select("*, services(*)") // Ambil tutor DAN semua services terkait
    .eq("id", tutorId)
    .single();

  if (error) {
    console.error("Error fetching tutor profile:", error.message);
    notFound(); // Tampilkan halaman 404 jika tutor tidak ditemukan
  }
  return data;
}

// --- (C) SUB-KOMPONEN (dari TutorProfilePage.jsx) ---

// Helper untuk format link WhatsApp
const getWhatsAppLink = (number: string | null) => {
  if (!number) return '#'; // Fallback jika tidak ada nomor
  // Ubah 08... menjadi 628...
  const formatted = number.replace(/^0/, '62');
  return `https://wa.me/${formatted}`;
};

// Komponen Header Profil
const TutorProfileHeader = ({ tutor }: { tutor: TutorProfile }) => {
  const waLink = getWhatsAppLink(tutor.whatsapp_number);
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-200"></div>
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-24 md:-mt-20">
          <Image 
            className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white object-cover shadow-lg" 
            src={tutor.profile_picture_url || 'https://placehold.co/160x160/cccccc/ffffff?text=Tutor'}
            alt={tutor.full_name || 'Tutor'}
            width={160}
            height={160}
            // Tambahkan fallback onError untuk Client Component (jika dipisah)
            // Di Server Component, kita cukup andalkan URL
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{tutor.full_name}</h1>
            <p className="text-gray-600">{tutor.major || 'Universitas Gadjah Mada'}</p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-auto">
            <Button asChild size="lg" className="rounded-full py-3 px-6 shadow-md">
              <Link href={waLink} target="_blank" rel="noopener noreferrer">
                Contact via WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen About Me
const AboutMe = ({ description }: { description: string | null }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="text-gray-700 space-y-4 whitespace-pre-line">
        {description || 'Tutor has not provided a description yet.'}
      </p>
    </div>
  );
};

// Komponen Card untuk Course
const CourseCard = ({ course }: { course: Service }) => {
  // Format harga
  const priceFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(course.price);

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.01] flex flex-col md:flex-row items-center overflow-hidden">
      <Image 
        src={course.cover_image_url || '/abstract.jpg'} //
        alt={course.subject_name} 
        className="w-full md:w-2/5 h-64 object-cover"
        width={500}
        height={280}
      />
      <div className="p-6 flex flex-col justify-between md:w-3/5 h-full">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">{course.subject_name}</h3>
          <p className="text-lg font-medium text-blue-700 mb-2">{priceFormat} / jam</p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        </div>
        {/* Arahkan ke halaman detail course */}
        <Button asChild className="self-start rounded-full py-2 px-6 shadow">
          <Link href={`/course/${course.id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Komponen Daftar Course
const CoursesOffered = ({ courses }: { courses: Service[] }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Courses Offered</h2>
      {courses && courses.length > 0 ? (
        <div className="flex flex-col gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">This tutor is not offering any courses at the moment.</p>
      )}
    </div>
  );
};

// --- (D) KOMPONEN HALAMAN UTAMA ---

export default async function TutorPage({ params }: { params: { tutorId: string } }) {
  // 1. Ambil data tutor berdasarkan ID dari URL
  const tutor = await getTutorProfile(params.tutorId);

  // 2. Jika getTutorProfile() melempar notFound(), halaman ini tidak akan render
  if (!tutor) {
     notFound(); // Pengaman ganda
  }

  // 3. Render halaman
  return (
    <div className="font-sans antialiased bg-blue-50">
      <PublicHeader />
      <main className="container mx-auto max-w-7xl p-8">
        <div className="space-y-8">
          <TutorProfileHeader tutor={tutor} />
          <AboutMe description={tutor.about_me} />
          <CoursesOffered courses={tutor.services} />
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}