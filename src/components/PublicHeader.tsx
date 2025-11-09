'use client'; // Header bersifat client-side untuk tombol 'Account'

import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function PublicHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cek apakah user sudah login
  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 print:hidden">
      <div className="container mx-auto max-w-7xl flex justify-between items-center gap-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/logo-gamajar.svg" alt="Logo" width={160} height={40} className="h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-200 hover:text-white font-medium">
              Home
            </Link>
            <Link href="/#courses-section" className="text-gray-200 hover:text-white font-medium">
              Explore
            </Link>
          </nav>
        </div>

        <div className="flex-1 max-w-lg">
          {/* Arahkan form pencarian ke halaman utama */}
          <form action="/" method="GET" className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search Your Tutor"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/20 text-white placeholder-gray-300 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
            <button type="submit" className="hidden" />
          </form>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Tampilkan link yang benar berdasarkan status login */}
          {user ? (
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-200 hover:text-white font-medium">
              <Image
                src={user.user_metadata?.avatar_url || "/profpic.svg"}
                alt="Profile"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full bg-white/30"
              />
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-gray-200 hover:text-white font-medium">
              <Image
                src="/profpic.svg"
                alt="Profile"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full bg-white/30 p-1"
              />
              Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};