import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Tidak terautentikasi" },
        { status: 401 } // 401 = Unauthorized
      );
    }
    const body = await request.json();
    const { subject_name, price, description, location, category } = body;

    if (!subject_name || !price) {
      return NextResponse.json(
        { error: "Nama mata kuliah dan harga wajib diisi" },
        { status: 400 }
      );
    }

    const { data: newCourse, error: insertError } = await supabase
      .from("services")
      .insert({
        subject_name: subject_name,
        price: price,
        description: description,
        location: location,
        category: category,
      })
      .select()
      .single();

    if (insertError) {
      console.error("failed to insert course:", insertError);
      return NextResponse.json(
        { error: "Gagal menyimpan course ke database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
        newCourse,
        {status: 200}
    )
  } catch (e) {
    console.error("Unexpected POST /api/courses error:", e);
    return NextResponse.json(
        {error: "terjadi kesalahan internal pada server"},
        {status: 500}
    )
  }
}

export async function GET(request: Request) {
  const supabase = await createClient();
  try {
    const {searchParams} = new URL(request.url);
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('category');

    let query = supabase.from('services')
    .select('*, tutors(full_name, profile_picture_url, major)');

    if(searchQuery){
        query = query.ilike('subject_name', `%${searchQuery}%`);
    }
    if(categoryQuery){
        query = query.eq('category', `%${categoryQuery}%`);
    }

    const {data: courses, error} = await query;

    if(error){
        console.error("Public courses fetch error:", error.message);
        return NextResponse.json(
            { error: 'Gagal mengambil data courses' },
            { status: 500 }
        );
    }

    return NextResponse.json(courses, {status: 200});
    

  } catch (e) {
    console.error("Unexpected GET /api/courses error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
