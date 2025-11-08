import React from 'react';
import { LandingHeader, LandingFooter } from './component.jsx';
import { 
  ChevronLeft, BookOpen, MapPin
} from 'lucide-react';

const CourseDetailLayout = ({ navigate }) => {
  const course = {
    title: "Calculus 1",
    subtitle: "Mastering Calculus 1 With Bimo",
    image: "/abstract.jpg",
    price: "Rp 99.000",
    location: "Perpustakaan Pusat",
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-8">
      <button 
        onClick={() => navigate('tutorProfile')} 
        className="flex items-center text-gray-600 hover:text-blue-700 font-medium mb-8 transition-colors print:hidden"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Tutor Profile
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-64 sm:h-80 max-h-[400px] rounded-2xl shadow-sm object-cover"
            onError={(e) => e.target.src = 'https://placehold.co/800x400/e2e8f0/1e293b?text=Course+Image'}
          />

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-blue-100/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-700" />
              About This Course
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
               <h3 className="text-lg font-semibold text-gray-900 mt-6">What you will learn:</h3>
               <ul className="list-disc list-inside space-y-2 ml-2">
                 <li>Understanding limits and continuity.</li>
                 <li>Mastering derivatives and their applications.</li>
                 <li>Introduction to integrals and the Fundamental Theorem of Calculus.</li>
               </ul>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-blue-100">
            
            <div className="pb-4 mb-4 border-b border-gray-300">
              <h2 className="text-xl font-bold text-blue-900">{course.subtitle}</h2>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            
            <div className="my-6">
              <span className="text-4xl font-bold text-blue-700">{course.price}</span>
              <span className="text-gray-500 font-medium ml-1">/ hour</span>
            </div>
            
            <button className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
               <span>Get in Touch</span>
            </button>
            
            <ul className="space-y-4 mt-8 text-gray-700 bg-blue-50/50 p-5 rounded-xl">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="ml-3">
                    <p className="text-xs text-gray-500 uppercase font-semibold">LOCATION</p>
                    <p className="font-medium">{course.location}</p>
                </div>
              </li>
            </ul>

          </div>
        </div>

      </div>
    </div>
  );
};

export default function CourseDetailPage({ navigate }) {
  return (
    <div className="font-sans antialiased bg-blue-50 min-h-screen">
      <LandingHeader navigate={navigate} />
      <main>
        <CourseDetailLayout navigate={navigate} />
      </main>
      <LandingFooter />
    </div>
  );
};