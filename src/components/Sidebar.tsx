// Lokasi: src/components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, BookOpen, Home, X } from 'lucide-react'; // <-- Tambahkan 'X'
import { cn } from '@/lib/utils'; // <-- Impor 'cn' dari lib/utils

// 1. Tambahkan props isOpen dan setIsOpen
export default function Sidebar({ isOpen, setIsOpen }: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* 2. Overlay (hanya tampil di HP saat sidebar terbuka) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 3. Modifikasi Sidebar Utama */}
      <aside 
        className={cn(
          "bg-purple-50 text-gray-800 h-screen p-6 flex flex-col fixed shadow-lg z-40 transition-transform duration-300 ease-in-out w-56",
          // Perilaku Desktop: selalu terlihat
          "md:translate-x-0",
          // Perilaku Mobile: slide in/out
          isOpen ? "translate-x-0" : "-translate-x-full" 
        )}
      >
        <div className="flex justify-between items-center mb-12">
          <img src="/logo-gamajar.svg" alt="Logo" className="h-10" />
          {/* 4. Tombol Tutup (hanya tampil di HP) */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-600">
            <X size={24} />
          </button>
        </div>

        <h2 className="text-sm font-semibold text-gray-500 mb-4">Navigation</h2>
        <nav className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)} // 5. Tutup sidebar saat link diklik
            className={`flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-800 ${
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
          <Link
            href="/dashboard/settings"
            onClick={() => setIsOpen(false)} // 5. Tutup sidebar saat link diklik
            className={`flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-800 ${
              pathname === "/dashboard/settings" ? "bg-blue-800 text-white shadow-md" : ""
            }`}
          >
            <Settings size={20} />
            <span>Account Settings</span>
          </Link>
          
          <Link
            href="/dashboard/my-courses"
            onClick={() => setIsOpen(false)} // 5. Tutup sidebar saat link diklik
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
    </>
  );
};