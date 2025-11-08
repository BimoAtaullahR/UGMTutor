// Lokasi: app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // <-- Impor Next.js Image

// Impor komponen shadcn yang sudah Anda install
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // 2. Ambil data JSON dari response (baik sukses maupun gagal)
      const data = await res.json();

      if (!res.ok) {
        // 3. Jika status bukan 2xx, ambil pesan error dari backend
        // dan simpan ke state 'error'
        throw new Error(data.error || "Terjadi kesalahan saat login.");
      }

      // Jika sukses, arahkan ke dashboard
      router.push("/");
      router.refresh(); // Opsional: untuk memastikan data session terbarui
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    // Div terluar untuk menengahkan card di layar
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card utama, kita buat lebih lebar (max-w-4xl) */}
      <Card className="w-full max-w-4xl shadow-lg p-8">
        {/* Grid 2 kolom: 1 untuk form, 1 untuk gambar */}
        {/* 'md:grid-cols-2' berarti di mobile (HP) akan 1 kolom, 
             di desktop (medium) akan 2 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* === KOLOM 1: FORM LOGIN === */}
          <div className="p-8">
            {" "}
            {/* Tambah padding agar tidak mepet */}
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">
                Login untuk Tutor
              </CardTitle>
              {/* <CardDescription>
                Login to your GAMAJAR account
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {error && (
                  <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.ugm.ac.id"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading} // Disable saat loading
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading} // Disable saat loading
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium text-red-500">{error}</p>
                )}

                <Button type="submit" className="w-full">
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-center w-full mt-4">
                Belum mendaftar menjadi tutor?{" "}
                <Link href="/signup" className="underline">
                  Daftar
                </Link>
              </div>
            </CardFooter>
          </div>

          {/* === KOLOM 2: GAMBAR LOGO === */}
          {/* 'hidden md:flex' -> disembunyikan di mobile, 
               ditampilkan (sebagai flex) di desktop */}
          <div className="hidden md:flex items-center justify-center p-8 bg-gray-50 rounded-r-lg">
            <Link href="/">
              <Image
                src="/logo-gamajar.svg" // <-- Ambil dari /public
                alt="GAMAJAR Logo"
                width={300} // Atur ukuran logo
                height={300}
                objectFit="contain" // Pastikan logo tidak gepeng/stretch
              />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
