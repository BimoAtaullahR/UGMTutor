import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // Refresh session (ini akan berjalan di SETIAP halaman)
  const { data: { session } } = await supabase.auth.getSession();

  // Ambil info halaman yang dituju
  const pathname = request.nextUrl.pathname;

  // Aturan Perlindungan:
  // 1. Jika user TIDAK login DAN mencoba mengakses area privat...
  if (!session && pathname.startsWith('/dashboard')) {
    // ...lempar mereka kembali ke halaman login.
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 2. Jika user SUDAH login DAN mencoba mengakses halaman login/signup...
  if (session && (pathname === '/login' || pathname === '/signup')) {
    // ...lempar mereka ke dashboard (karena sudah login).
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Jika tidak ada aturan yang dilanggar, lanjutkan seperti biasa.
  // Ini akan berjalan di homepage (/) dan halaman publik lainnya.
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}