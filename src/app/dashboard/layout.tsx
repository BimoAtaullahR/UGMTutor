// Lokasi: src/app/dashboard/layout.tsx
'use client'; // <-- Harus menjadi Client Component untuk mengelola state

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State untuk mengontrol sidebar di mode mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      
      {/* Sidebar sekarang menerima state 'isOpen' */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Konten Utama: 
        - 'md:ml-56': Margin kiri 56 HANYA di desktop (medium ke atas)
        - Di mobile, margin kiri otomatis 0 (full width)
      */}
      <div className="flex-1 md:ml-56">
        
        {/* Header sekarang menerima fungsi untuk membuka menu */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        {/* 'children' adalah page.tsx Anda */}
        <main className="p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}