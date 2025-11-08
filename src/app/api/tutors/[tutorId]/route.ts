import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { tutorId: string } }
) {
  const supabase = await createClient();
  try {
    const tutorId = params.tutorId;
    const { data: profileTutor, error: profileError } = await supabase
      .from("tutors")
      .select("*, services(*)")
      .eq("id", tutorId)
      .single();

    if (profileError) {
      console.error("Error when seeing tutor profile:", profileError);
      return NextResponse.json(
        { error: "Gagal melihat profil tutor" },
        { status: 500 }
      );
    }

    return NextResponse.json(profileTutor, { status: 200 });
  } catch (e) {
    console.error("Unexpected GET /api/tutors/[tutorId] error:", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
