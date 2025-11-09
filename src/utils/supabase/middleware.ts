// Lokasi: src/utils/supabase/middleware.ts
// GANTI SEMUA ISI FILE DENGAN KODE INI:

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export const createClient = (request: NextRequest) => {
  // Buat response (ini penting)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Ini adalah 'interface' baru yang diharapkan
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          try {
            // Dalam middleware, kita perlu update request DAN response
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          } catch {
            // Ini akan error di Server Component, tapi di middleware
            // ini adalah perilaku yang diharapkan.
            // 'request.cookies.set' hanya tersedia di middleware
          }
        },
      },
    }
  )

  // Kembalikan supabase DAN response
  return { supabase, response }
}