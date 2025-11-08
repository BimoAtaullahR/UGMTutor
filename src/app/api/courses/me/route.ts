import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  try {
    //Dapatkan data user yang sedang login
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

    //ambil profil dari tabel tutors
    const {
      data: { courseTutor },
      error: getCourseError,
    } = await supabase
      .from("services") // dari tabel "tutors"
      .select("*") // ambil semua kolom (full_name, whatsapp_number, dll)
      .eq("id", user.id) //dimana 'id' cocok dengan id user yang sedang login
      .single(); // kita mengharapkan hanya satu hasil

    if (getCourseError) {
      // Ini bisa terjadi jika ada error DB atau
      // user sudah terdaftar di 'auth' tapi belum buat profil di 'tutors'
      console.error("error when getting courses:", getCourseError.message);
      return NextResponse.json(
        { error: "Gagal mengambil courses tutor" },
        { status: 500 }
      );
    }
    return NextResponse.json(courseTutor, { status: 200 });
  } catch (e) {
    console.error("Unexpected GET /api/courses/me error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}