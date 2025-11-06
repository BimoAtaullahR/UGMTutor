import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  // 1. Ambil data yang dikirim oleh frontend (payload)
  //    Contoh: { email: "...", password: "..." }
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Supabase signup error:", error.message);
      NextResponse.json(
        {error: "Kombinasi email dan password salah."},
        {status: 401} //401: unauthorized
      )
    }
    NextResponse.json(
      {message: "Login berhasil!", user: data.user, session: data.session},
      {status: 200}
    )
  } catch (e) {
    console.error("Unexpected signin error:", e);

    // Kirim balasan error umum ke frontend
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 } // 500 = Internal Server Error
    );
  }
}

