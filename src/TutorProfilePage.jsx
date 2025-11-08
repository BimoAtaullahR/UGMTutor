import React from 'react';
import { LandingHeader, LandingFooter } from './component.jsx';

const TutorProfileHeader = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-200"></div>
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-24 md:-mt-20">
          <img 
            className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white object-cover shadow-lg" 
            src="https://placehold.co/160x160/c084fc/c084fc?text=Bimo"
            alt="Bimo Purwokerto"
            onError={(e) => e.target.src = 'https://placehold.co/160x160/cccccc/ffffff?text=Image'}
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Bimo Purwokerto</h1>
            <p className="text-gray-600">Faculty of Engineering</p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-auto">
            <button className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-800 transition duration-300">
              Contact via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="text-gray-700 space-y-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  );
};

const CourseCard = ({ navigate, title, price, description, imageUrl }) => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.01] flex flex-col md:flex-row items-center overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full md:w-2/5 h-64 object-cover"
        onError={(e) => e.target.src = 'https://placehold.co/500x280/cccccc/ffffff?text=Course'}
      />
      <div className="p-6 flex flex-col justify-between md:w-3/5 h-full">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
          <p className="text-lg font-medium text-blue-700 mb-2">{price}</p>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        </div>
        <button
          onClick={() => navigate('courseDetail')}
          className="self-start bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-blue-800 transition mt-auto"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const CoursesOffered = ({ navigate }) => {
  const loremDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.";
  
  const courses = [
    {
      title: 'Calculus 1',
      price: 'Price: Rp99.000',
      description: loremDesc,
      imageUrl: '/abstract.jpg',
    },
    {
      title: 'Physics for Engineers',
      price: 'Price: Rp99.000',
      description: loremDesc,
      imageUrl: '/abstract.jpg',
    },
    {
      title: 'Basic Algorithms',
      price: 'Price: Rp99.000',
      description: loremDesc,
      imageUrl: '/abstract.jpg',
    },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Courses Offered</h2>
      <div className="flex flex-col gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course.title}
            navigate={navigate}
            title={course.title}
            price={course.price}
            description={course.description}
            imageUrl={course.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default function TutorProfilePage({ navigate }) {
  return (
    <div className="font-sans antialiased bg-blue-50">
      <LandingHeader navigate={navigate} />
      <main className="container mx-auto max-w-7xl p-8">
        <div className="space-y-8">
          <TutorProfileHeader />
          <AboutMe />
          <CoursesOffered navigate={navigate} />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}