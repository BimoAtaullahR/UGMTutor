import { NextResponse } from "next/server";
// import client helper (untuk mendapatkan user)
import { createClient } from "@/utils/supabase/server";
// import 'createClient' ASLI dari library inti (untuk admin)
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
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

    const userIdToDelete = user.id;

    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        // Opsi auth ini PENTING untuk server-side
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      }
    );

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userIdToDelete
    );

    if (deleteError) {
      console.error("Supabase admin delete error:", deleteError.message);
      return NextResponse.json(
        { error: "Gagal menghapus akun" },
        { status: 500 }
      );
    }

    await supabase.auth.signOut();

    NextResponse.json({ message: "Akun berhasil dihapus" }, { status: 200 });
  } catch (e) {
    console.error("Supabase delete error:", e);
    return NextResponse.json(
      { error: "Gagal menghapus akun" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
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
      data: { tutorProfile },
      error: profileError,
    } = await supabase
      .from("tutors") // dari tabel "tutors"
      .select("*") // ambil semua kolom (full_name, whatsapp_number, dll)
      .eq("id", user.id) //dimana 'id' cocok dengan id user yang sedang login
      .single(); // kita mengharapkan hanya satu hasil

    if (profileError) {
      // Ini bisa terjadi jika ada error DB atau
      // user sudah terdaftar di 'auth' tapi belum buat profil di 'tutors'
      console.error("profile fetch error:", profileError.message);
      return NextResponse.json(
        { error: "Gagal mengambil data tutor" },
        { status: 500 }
      );
    }
    return NextResponse.json(tutorProfile, { status: 200 });
  } catch (e) {
    console.error("Unexpected GET /api/profile/me error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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

    const body = await request.json();
    const {whatsapp_number, full_name, major, profile_picture_url} = body;


    //ambil profil dari tabel tutors
    const {
      data: updatedProfile ,
      error: updateError,
    } = await supabase
      .from("tutors") // dari tabel "tutors"
      .update({
        full_name : full_name,
        whatsapp_number: whatsapp_number,
        major: major,
        profile_picture_url: profile_picture_url,
      }) // ambil semua kolom (full_name, whatsapp_number, dll)
      .eq("id", user.id) //dimana 'id' cocok dengan id user yang sedang login
      .select()
      .single(); // kita mengharapkan hanya satu hasil

    if (updateError) {
      // Ini bisa terjadi jika ada error DB atau
      // user sudah terdaftar di 'auth' tapi belum buat profil di 'tutors'
      console.error("update error:", updateError.message);
      return NextResponse.json(
        { error: "Gagal mengupdate profil" },
        { status: 500 }
      );
    }
    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (e) {
    console.error("Unexpected PUT /api/profile/me error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
