// (Opsional, tapi sangat disarankan)
// File ini akan otomatis ditampilkan saat data 'getCourseDetails' sedang diambil

import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { Card } from '@/components/ui/card';
import { ChevronLeft, BookOpen, MapPin } from 'lucide-react';

const Spinner = () => (
  <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-800 motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status"
  >
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
);

export default function LoadingCourseDetail() {
  return (
    <div className="font-sans antialiased bg-blue-50 min-h-screen">
      <PublicHeader />
      <main>
        <div className="container mx-auto max-w-7xl p-4 sm:p-8">
          <div className="flex items-center text-gray-400 font-medium mb-8">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Tutor Profile
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Placeholder Gambar */}
              <div className="w-full h-64 sm:h-80 max-h-[400px] rounded-2xl shadow-sm bg-gray-200 animate-pulse" />
              
              {/* Placeholder Deskripsi */}
              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-700" />
                  About This Course
                </h2>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <div className="pb-4 mb-4 border-b border-gray-300">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
                <div className_="my-6">
                  <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
                <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
                <div className="mt-8 p-5 bg-gray-100 rounded-xl">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 ml-3 animate-pulse" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}