// GANTI SELURUH ISI FILE 'app/api/courses/me/route.ts' DENGAN INI

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  try {
    // 1. Dapatkan user (Ini sudah benar)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Tidak terautentikasi" },
        { status: 401 }
      );
    }

    // --- INI PERBAIKANNYA ---
    
    // 2. Ambil 'data' sebagai 'courseTutor' (atau 'courses')
    const {
      data: courseTutor, // <-- Ini HANYA me-rename 'data'
      error: getCourseError,
    } = await supabase
      .from("services") 
      .select("*") 
      // 3. Cocokkan dengan 'tutor_id' (bukan 'id')
      .eq("tutor_id", user.id); // <-- Ini BENAR
      // 4. Hapus '.single()' untuk mendapatkan SEMUA course

    if (getCourseError) {
      console.error("error when getting courses:", getCourseError.message);
      return NextResponse.json(
        { error: "Gagal mengambil courses tutor" },
        { status: 500 }
      );
    }
    
    // 5. Kembalikan 'courseTutor' (yang sekarang berisi array course)
    return NextResponse.json(courseTutor, { status: 200 });

  } catch (e) {
    console.error("Unexpected GET /api/courses/me error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}