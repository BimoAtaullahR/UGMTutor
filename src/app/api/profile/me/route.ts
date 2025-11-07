import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
// import client helper (untuk mendapatkan user)
import { createClient } from '@/utils/supabase/server';
// import 'createClient' ASLI dari library inti (untuk admin)
import { createClient as createAdminClient } from '@supabase/supabase-js';


export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const {data: {user}, error: authError} = await supabase.auth.getUser();

    if(authError || !user){
      return NextResponse.json(
        {error: "Tidak terautentikasi"},
        {status: 401}
      )
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
        detectSessionInUrl: false
        }
      } 
    )

    const {error: deleteError} = await supabaseAdmin.auth.admin.deleteUser(userIdToDelete);

    if(deleteError){
      console.error("Supabase admin delete error:", deleteError.message);
      return NextResponse.json(
        {error: "Gagal menghapus akun"},
        {status: 500}
      )
    }

    await supabase.auth.signOut();

    NextResponse.json(
      {message: "Akun berhasil dihapus"},
      {status: 200}
    )
  } catch (e) {
    console.error("Supabase delete error:", e);
      return NextResponse.json(
        {error: "Gagal menghapus akun"},
        {status: 500}
      )
  }
}

