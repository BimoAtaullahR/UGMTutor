import React, { useState } from 'react';
import { Search, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const LandingHeader = ({ navigate }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 print:hidden">
      <div className="container mx-auto max-w-7xl flex justify-between items-center gap-8">
        <div className="flex items-center gap-8">
          <img src="/Logo.svg" alt="Logo" className="h-10" />
          <nav className="hidden md:flex gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('home');
              }}
              className="text-gray-200 hover:text-white font-medium"
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('mycourses');
              }}
              className="text-gray-200 hover:text-white font-medium"
            >
              Explore
            </a>
          </nav>
        </div>

        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Your Tutor"
              className="bg-white/20 text-white placeholder-gray-300 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('account');
            }}
            className="flex items-center gap-2 text-gray-200 hover:text-white font-medium"
          >
            <img
              src="/profpic.svg"
              alt="Profile"
              className="h-6 w-6 rounded-full bg-white/30 p-1"
            />
            Account
          </a>
        </div>
      </div>
    </header>
  );
};

const LandingFooter = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 py-16 print:hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/Logo.svg" alt="Logo" className="h-10" />
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
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">How It Works</a></li>
              <li><a href="#" className="hover:text-white">Become a Tutor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Email: contact@ugmtutor.id</li>
              <li>Phone: +62 123 456 789</li>
              <li>Address: Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} UGM Peer Tutor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const CategorySearch = () => {
  const categories = ['Calculus', 'Data Science', 'Health Services', 'Business'];
  const [activeCategory, setActiveCategory] = useState('Business');

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-200 rounded-xl p-10 text-center">
          <h3 className="text-3xl font-bold text-gray-800">Find From Category</h3>
          <p className="text-gray-600 mt-2">Explore the expertise you need, from science to social studies.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-6 rounded-full font-medium transition duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-800 text-white shadow-lg'
                    : 'bg-white text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedTutorCard = ({ navigate, sectionTitle, sectionDescription, tutorName, tutorSubject, tutorDescription, imageUrl }) => {
  return (
    <div className="bg-gray-200 rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div className="text-center md:text-left">
        <h3 className="text-4xl font-bold text-gray-800">{sectionTitle}</h3>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          {sectionDescription}
        </p>
      </div>
      <div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={tutorName}
            className="w-full h-64 object-cover"
            onError={(e) => e.target.src = './abstract.svg'}
          />
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('tutorProfile'); }} className="hover:text-blue-700 hover:underline transition duration-300">
                {tutorName}
              </a>
            </h4>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-semibold">Subject :</span> {tutorSubject}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Bio :</span> {tutorDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedTutorsSection = ({ navigate }) => {
  const tutors = [
    {
      sectionTitle: 'Lorem',
      sectionDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tutorName: 'Bimo Purwokerto',
      tutorSubject: 'Calculus',
      tutorDescription: 'Learn Everything about Calculus 1',
      imageUrl: './abstract.jpg'
    },
    {
      sectionTitle: 'Lorem',
      sectionDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tutorName: 'Bimo Purwokerto',
      tutorSubject: 'Calculus',
      tutorDescription: 'Learn Everything about Calculus 1',
      imageUrl: './abstract.jpg'
    },
  ];

  return (
    <section className="bg-white pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {tutors.map((tutor, index) => (
            <FeaturedTutorCard key={index} navigate={navigate} {...tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = ({ navigate }) => {
  const steps = [
    {
      step: 1,
      title: '1. Find Your Tutor',
      description: `Use our simple search to find tutors by the exact subjects you need, like 'Calculus' or 'Statistics', or browse by category`,
      imageUrl: 'https://placehold.co/400x300/818cf8/ffffff?text=Step+1',
    },
    {
      step: 2,
      title: '2. Check Their Profile',
      description: `View detailed profiles. See their faculty, expertise, hourly price, and preferred locations (Online, Perpusat, GSP, etc.).`,
      imageUrl: 'https://placehold.co/400x300/a78bfa/ffffff?text=Step+2',
    },
    {
      step: 3,
      title: '3. Connect & Learn',
      description: `Found the one? Just click the button to contact them directly on WhatsApp. Arrange your schedule and pay them directly`,
      imageUrl: 'https://placehold.co/400x300/c084fc/ffffff?text=Step+3',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-gray-800">How It Works</h3>
        <p className="text-gray-600 mt-2">Connecting with a tutor is simple and fast.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step) => (
            <div key={step.step} className="group bg-gray-50 p-6 rounded-lg shadow-md transition-shadow duration-300">
              <img
                src={step.imageUrl}
                alt={step.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">{step.title}</h4>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToAction = ({ navigate }) => {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">Teach Smarter, Earn Easier</h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          Join our community of UGM peer tutors. Share your knowledge, help fellow students, and earn extra income on your own schedule.
        </p>
        <button
          onClick={() => navigate('mycourses')}
          className="mt-8 bg-white text-blue-800 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 
                     border-2 border-white
                     hover:bg-transparent hover:text-white"
        >
          Become a Tutor
        </button>
      </div>
    </section>
  );
};

export default function Homepage({ navigate }) {
  return (
    <div className="font-sans antialiased bg-white">
      <LandingHeader navigate={navigate} />
      <main>
        <CategorySearch />
        <FeaturedTutorsSection navigate={navigate} />
        <HowItWorks navigate={navigate} />
        <CallToAction navigate={navigate} />
      </main>
      <LandingFooter />
    </div>
  );
}