"use client"
import React, { useState } from "react";
import Link from 'next/link'; // <-- Impor Link
// import { usePathname } from 'next/navigation'; // <-- Impor hook untuk cek URL
import {
  Search,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Trash2,
  Edit,
  Plus,
  Settings,
  BookOpen,
  Bell,
  User,
  ChevronDown,
  Home,
  UserCircle,
  AlertTriangle,
  LogOut, // Added for dropdown
} from "lucide-react";

export default function DashboardHeader(){
  // Added navigate prop
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
      {/* --- MODIFICATION: Hardcoded "Shafiq!" --- */}
      <h2 className="text-2xl font-bold text-gray-800">Shafiq!</h2>
      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={24} />
        </button>
        {/* --- MODIFICATION: Replaced initial with icon button and dropdown --- */}
        <div className="relative">
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <UserCircle size={32} />
            <ChevronDown size={20} />
          </button>

          {/* The dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 overflow-hidden border">
              <Link
                href="/dashboard/settings"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} />
                <span>Account Settings</span>
              </Link>
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gray-100 border-t"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
