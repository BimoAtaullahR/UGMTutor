// Lokasi: src/components/Sidebar.tsx
'use client'; // <-- WAJIB: karena kita menggunakan hook 'usePathname'

import React from 'react';
import Link from 'next/link'; // <-- Impor Link
import { usePathname } from 'next/navigation'; // <-- Impor hook untuk cek URL
import {
  Settings,
  BookOpen,
  Home,
} from 'lucide-react';

export default function Sidebar(){
  // Hook ini akan memberi tahu kita URL saat ini
  const pathname = usePathname(); // Contoh: /dashboard/settings

  return (
    <aside className="w-56 bg-purple-50 text-gray-800 h-screen p-6 flex flex-col fixed shadow-lg">
      <img src="/logo-gamajar.svg" alt="Logo" className="h-10 mb-12" />

      <h2 className="text-sm font-semibold text-gray-500 mb-4">Navigation</h2>
      <nav className="flex flex-col gap-3">
        {/* --- Gunakan <Link> --- */}
        <Link
          href="/dashboard" // <-- Tautan URL Asli
          className={`flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-800 ${
            // Cek apakah URL = /dashboard
            pathname === "/dashboard" ? "bg-blue-100 text-blue-800" : ""
          }`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
      </nav>

      <h2 className="text-sm font-semibold text-gray-500 mt-8 mb-4">
        Main Menu
      </h2>
      <nav className="flex flex-col gap-3">
        {/* --- Gunakan <Link> --- */}
        <Link
          href="/dashboard/settings" // <-- Tautan URL Asli
          className={`flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-800 ${
            // Cek apakah URL = /dashboard/settings
            pathname === "/dashboard/settings" ? "bg-blue-800 text-white shadow-md" : ""
          }`}
        >
          <Settings size={20} />
          <span>Account Settings</span>
        </Link>
        
        {/* --- Gunakan <Link> --- */}
        <Link
          href="/dashboard/my-courses" // <-- Tautan URL Asli
          className={`flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-800 ${
            pathname === "/dashboard/my-courses"
              ? "bg-blue-800 text-white shadow-md"
              : ""
          }`}
        >
          <BookOpen size={20} />
          <span>My Course</span>
        </Link>
      </nav>
    </aside>
  );
};
