import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


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

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Supabase signup error:", error.message);
      if (error.message.includes("Email must end with @ugm.ac.id")) {
        return NextResponse.json(
          {
            error:
              "Pendaftaran gagal. Anda harus menggunakan email UGM (@ugm.ac.id).",
          },
          { status: 400 }
        );
      }
      if (error.message.includes("User already registered")) {
        return NextResponse.json(
          { error: "Email ini sudah terdaftar. Silakan login." },
          { status: 409 }
        );
      }
      if (error.message.includes("Password should be at least")) {
        return NextResponse.json(
          { error: "Password terlalu lemah. Gunakan minimal 6 karakter." },
          { status: 400 } // 400 = Bad Request
        );
      }
      return NextResponse.json(
        { error: "Terjadi kesalahan saat pendaftaran" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Pendaftaran berhasil!", user: data.user },
      { status: 201 }
    );
  } catch (e) {
    console.error("Unexpected signup error:", e);

    // Kirim balasan error umum ke frontend
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 } // 500 = Internal Server Error
    );
  }
}
