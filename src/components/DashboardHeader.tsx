"use client"
// 1. Impor hook dan client
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client"; // <-- Impor client

// 2. Impor ikon 'Menu'
import {
  Settings,
  BookOpen,
  Bell,
  ChevronDown,
  Home,
  UserCircle,
  LogOut,
  Menu // <-- Tambahkan ini
} from "lucide-react";

// 3. Tambahkan prop 'onMenuClick'
export default function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }){
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tutorName, setTutorName] = useState<string | null>(null);
  const router = useRouter();

  // 4. Ambil nama tutor (useEffect)
  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
          const res = await fetch('/api/profile/me');
          if (res.ok) {
              const profile = await res.json();
              setTutorName(profile.full_name); 
          } else {
              setTutorName("Tutor");
          }
      }
    };
    fetchProfile();
  }, []);

  // 5. Fungsi Logout
  const handleLogout = async () => {
    const supabase = createClient();
    setIsDropdownOpen(false);
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* 6. Tombol Hamburger (hanya tampil di HP) */}
        <button onClick={onMenuClick} className="text-gray-600 md:hidden">
          <Menu size={24} />
        </button>
        
        {/* Tampilkan nama */}
        <h2 className="text-2xl font-bold text-gray-800">
          {tutorName ? `${tutorName}!` : 'Loading...'}
        </h2>
      </div>
      
      {/* Sisa header (Ikon Bell & Dropdown) */}
      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={24} />
        </button>
        <div className="relative">
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <UserCircle size={32} />
            <ChevronDown size={20} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 overflow-hidden border">
              <Link
                href="/dashboard/settings"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} />
                <span>Account Settings</span>
              </Link>
              {/* 7. Perbaiki Tombol Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gray-100 border-t w-full text-left"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};