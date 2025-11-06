//di bawah ini kode halaman login yang dari supabase, 
// tetapi butuh penyesuaian dengan api endpoint yang sudah direncanain.

//kodenya tetap ada hanya untuk penjelasan implementasi saja, kemudian diubah
// dan disesuaikan.

// import { login } from '../api/auth/login' -> nanti bukan seperti ini
// import { signup } from '../api/auth/signup' -> nanti bukan seperti ini 

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button> -> fungsi login nanti dibuat dengan perbedaan daripada fungsi di bawah itu adalah menggunakan fetching data dari api endpoint
//       <button formAction={signup}>Sign up</button> -> fungsi signup juga mirip" seperti login
//     </form>
//   )
// }

//ini kode fungsi signup dan login sebelumnya (dari template code nya supabase)
// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'

// import { createClient } from '@/utils/supabase/server'

// export async function signup(formData: FormData) {
//   const supabase = await createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }

// export async function login(formData: FormData) {
//   const supabase = await createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signInWithPassword(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }

