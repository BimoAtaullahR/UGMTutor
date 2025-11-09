// Lokasi: src/app/api/courses/[courseId]/route.ts

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

// --- FUNGSI PUT (Update) ---
export async function PUT(
  request: NextRequest,
  // PERBAIKAN #1: 'params' adalah sebuah 'Promise'
  context: { params: Promise<{ courseId: number }> }
) {
  const supabase = await createClient();
  try {
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
    const { subject_name, price, description, location, category, cover_image_url } = body;
    
    // PERBAIKAN #2: 'await' params-nya di sini
    const params = await context.params;
    const courseId = params.courseId;

    const { data: updatedCourse, error: updateError } = await supabase
      .from("services")
      .update({
        subject_name: subject_name,
        price: price,
        description: description,
        location: location,
        category: category,
        cover_image_url: cover_image_url
      })
      .eq("id", courseId)
      .eq("tutor_id", user.id)
      .select()
      .single();

    if (updateError) {
      console.error("update error:", updateError.message);
      return NextResponse.json(
        { error: "Gagal mengupdate course" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(updatedCourse, { status: 200 });

  } catch (e) {
    console.error("Unexpected PUT error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}

// --- FUNGSI DELETE ---
export async function DELETE(
  request: NextRequest,
  // PERBAIKAN #1: 'params' adalah sebuah 'Promise'
  context: { params: Promise<{ courseId: number }> }
) {
  const supabase = await createClient();
  try {
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

    // PERBAIKAN #2: 'await' params-nya di sini
    const params = await context.params;
    const courseId = params.courseId;

    const { error: deleteError } = await supabase
      .from("services")
      .delete()
      .eq("id", courseId)
      .eq("tutor_id", user.id);

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
    console.error("Unexpected DELETE error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}

// --- FUNGSI GET (Read) ---
export async function GET(
  request: NextRequest,
  // PERBAIKAN #1: 'params' adalah sebuah 'Promise'
  context: { params: Promise<{ courseId: number }> }
) {
  const supabase = await createClient();
  try {
    // PERBAIKAN #2: 'await' params-nya di sini
    const params = await context.params;
    const courseId = params.courseId;
    
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
    console.error("Unexpected GET error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}