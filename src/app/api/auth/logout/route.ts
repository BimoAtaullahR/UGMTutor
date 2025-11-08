import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  // 1. Ambil data yang dikirim oleh frontend (payload)
  //    Contoh: { email: "...", password: "..." }
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase signout error:", error.message);
      NextResponse.json(
        {error: "Gagal untuk logout."},
        {status: 500} 
      )
    }
    NextResponse.json(
      {message: "Logout berhasil!"},
      {status: 200}
    )
  } catch (e) {
    console.error("Supabase signout error:", e);
      NextResponse.json(
        {error: "Gagal untuk logout."},
        {status: 500} 
      )
  }
}

