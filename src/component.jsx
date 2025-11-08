import React from 'react';
import { Search, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const LandingHeader = ({ navigate }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 print:hidden">
      <div className="container mx-auto max-w-7xl flex justify-between items-center gap-8">
        <div className="flex items-center gap-8">
          <img src="/Logo.svg" alt="Logo" className="h-10" />
          <nav className="hidden md:flex gap-6">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="text-gray-200 hover:text-white font-medium">Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('mycourses'); }} className="text-gray-200 hover:text-white font-medium">Explore</a>
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
        <div className="hidden md:block">
          <a href="#" className="text-gray-200 hover:text-white font-medium">Account</a>
        </div>
      </div>
    </header>
  );
};

export const LandingFooter = () => {
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