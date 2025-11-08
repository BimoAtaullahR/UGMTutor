import React, { useState } from 'react';
import { Home, Book, Settings, User, LogOut, Bell } from 'lucide-react';

export const Sidebar = ({ navigate, currentPage }) => {
  const NavItem = ({ icon: Icon, label, page }) => (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); navigate(page); }}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        currentPage === page
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </a>
  );

  return (
    <div className="w-64 bg-white h-screen shadow-lg p-5 flex flex-col">
      <img src="/Logo.svg" alt="Logo" className="h-10 mb-8" />
      <nav className="flex-1 space-y-2">
        <NavItem icon={Home} label="Home" page="home" />
        <NavItem icon={Book} label="My Course" page="mycourses" />
        <NavItem icon={Settings} label="Account Settings" page="settings" />
      </nav>
      <div className="mt-auto">
        <NavItem icon={LogOut} label="Log Out" page="home" />
      </div>
    </div>
  );
};

export const DashboardHeader = ({ navigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome Naryana!</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="h-6 w-6" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300"
          >
            <User className="h-5 w-5" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('settings'); setDropdownOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Account Settings
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); navigate('home'); setDropdownOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-b-lg"
              >
                Log Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};