// Lokasi: src/app/dashboard/page.tsx

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, User } from 'lucide-react';

// Fungsi untuk mengambil data di sisi server
async function getDashboardData() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // 1. Ambil profil tutor
  const { data: tutor } = await supabase
    .from('tutors')
    .select('full_name')
    .eq('id', user.id)
    .single();

  // 2. Ambil jumlah courses
  const { data: courses, count } = await supabase
    .from('services')
    .select('id', { count: 'exact' })
    .eq('tutor_id', user.id);

  return {
    tutorName: tutor?.full_name || user.email,
    courseCount: count || 0,
  };
}

// Ini adalah halaman dashboard utama Anda
export default async function DashboardPage() {
  const { tutorName, courseCount } = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Catatan: Header "Welcome Naryana!" sudah diurus oleh DashboardHeader di layout.tsx */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseCount}</div>
            <p className="text-xs text-muted-foreground">
              Jumlah course yang Anda tawarkan
            </p>
          </CardContent>
        </Card>
        
        {/* Placeholder untuk statistik masa depan */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              (Fitur segera hadir)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold mb-4">Akses Cepat</h3>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard/my-courses">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Course Baru
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/settings">
              Edit Profil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}