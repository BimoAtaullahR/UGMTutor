// Lokasi: src/components/CourseCard.tsx
"use client"; // <-- TAMBAHKAN INI di baris paling atas

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'; //

// Tipe data yang dibutuhkan oleh komponen ini
type Course = {
  id: string;
  subject_name: string;
  description: string;
  price: number;
  cover_image_url?: string | null;
  tutors: {
    id: string; 
    full_name: string;
    profile_picture_url?: string | null;
  }[] | null;
};

// 'export default' agar bisa di-impor
export default function CourseCard({ course }: { course: Course }) {
  const tutor = (course.tutors && course.tutors.length > 0) ? course.tutors[0] : null;
  const tutorName = tutor?.full_name || 'Tutor';
  
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
            src={course.cover_image_url || '/abstract.jpg'}
            alt={course.subject_name}
            fill
            className="object-cover"
            // 'onError' sekarang diizinkan karena ini adalah Client Component
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Course';
            }}
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
              src={tutor?.profile_picture_url || '/profpic.svg'}
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