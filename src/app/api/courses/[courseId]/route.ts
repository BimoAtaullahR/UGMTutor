import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  request: NextRequest,
  context: { params: { courseId: string } }
) {
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
    const { subject_name, price, description, location, category } = body;
    const courseId = context.params.courseId;

    //ambil profil dari tabel tutors
    const { data: updatedCourse, error: updateError } = await supabase
      .from("services") // dari tabel "services"
      .update({
        subject_name: subject_name,
        price: price,
        description: description,
        location: location,
        category: category,
      })
      .eq("id", courseId)
      .eq("tutor_id", user.id) //dimana 'id' cocok dengan id user yang sedang login
      .single(); // kita mengharapkan hanya satu hasil

    if (updateError) {
      // Ini bisa terjadi jika ada error DB atau
      // user sudah terdaftar di 'auth' tapi belum buat profil di 'tutors'
      console.error("update error:", updateError.message);
      return NextResponse.json(
        { error: "Gagal mengupdate course" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Course berhasil diupdate!" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Unexpected PUT /api/courses/[coursesId] error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context : { params: { courseId: string } }
) {
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

    const courseId = context.params.courseId;

    //ambil profil dari tabel tutors
    const { error: deleteError } = await supabase
      .from("services") // dari tabel "services"
      .delete()
      .eq("id", courseId)
      .eq("tutor_id", user.id); //dimana 'id' cocok dengan id user yang sedang login

    if (deleteError) {
      console.error("delete error:", deleteError.message);
      return NextResponse.json(
        { error: "Gagal menghapus course" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Course berhasil dihapus!" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Unexpected DELETE /api/courses/[coursesId] error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { courseId: string } }
) {
  const supabase = await createClient();
  try {
    const courseId = context.params.courseId;
    const { data: courseData, error: dataError } = await supabase
      .from("services")
      .select("*, tutors(full_name, profile_picture_url, major)")
      .eq("id", courseId)
      .single();

    if (dataError) {
      console.error("Error when getting course:", dataError);
      return NextResponse.json(
        { error: "Gagal menampilkan course" },
        { status: 500 }
      );
    }

    return NextResponse.json(courseData, { status: 200 });
  } catch (e) {
    console.error("Unexpected GET /api/courses/[coursesId] error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
