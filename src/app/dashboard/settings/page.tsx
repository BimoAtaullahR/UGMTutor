// Lokasi: src/app/dashboard/settings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; //
import Image from 'next/image';
// Impor komponen UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; //
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; //
import { AlertTriangle, CheckCircle, Upload } from 'lucide-react';

// Tipe untuk data profil
type Profile = {
  full_name: string;
  major: string | null;
  whatsapp_number: string | null;
  profile_picture_url: string | null;
  bio: string | null; // Tambahan untuk 'About Me'
};

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  
  // State untuk form
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    major: '',
    whatsapp_number: '',
    profile_picture_url: null,
    bio: ''
  });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 1. Ambil data profil yang ada saat halaman dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const res = await fetch('/api/profile/me'); //
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setProfile(data);
        }
      } else {
        setError('Gagal memuat profil.');
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  // 2. Handle perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // 3. Handle perubahan file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  // 4. Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      let profilePicUrl = profile.profile_picture_url;

      // Jika ada file baru, upload dulu
      if (profilePicFile) {
        const fileExt = profilePicFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/profile_pictures/${fileName}`; // Asumsi bucket 'profile_pictures'

        const { error: uploadError } = await supabase.storage
          .from('profile_pictures') // GANTI NAMA BUCKET JIKA PERLU
          .upload(filePath, profilePicFile, { upsert: true });

        if (uploadError) throw new Error(`Upload Error: ${uploadError.message}`);

        const { data: { publicUrl } } = supabase.storage
          .from('profile_pictures')
          .getPublicUrl(filePath);
        profilePicUrl = publicUrl;
      }

      // Kirim data ke API
      const res = await fetch('/api/profile/me', { //
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: profile.full_name,
          major: profile.major,
          whatsapp_number: profile.whatsapp_number,
          profile_picture_url: profilePicUrl,
          bio: profile.bio,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal menyimpan profil');
      }

      setSuccess('Profil berhasil diperbarui!');
      router.refresh(); // Refresh layout untuk update header

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Bagian Edit Profil */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
        
        {/* Pesan Sukses/Error */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default" className="mb-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Upload Gambar */}
        <div className="flex items-center space-x-6 mb-6">
          <Image
            src={profile?.profile_picture_url || '/profpic.svg'} //
            alt="Profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full bg-gray-200 object-cover"
          />
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Label htmlFor="profile-pic-upload" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                {profilePicFile ? profilePicFile.name : 'Change Picture'}
              </Label>
            </Button>
            <Input 
              id="profile-pic-upload" 
              type="file" 
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange} 
            />
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input 
              id="full_name" 
              name="full_name" 
              value={profile?.full_name || ''} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <Label htmlFor="major">Faculty / Major</Label>
            <Input 
              id="major" 
              name="major" 
              placeholder="e.g., Faculty of Engineering" 
              value={profile?.major || ''} 
              onChange={handleChange} 
            />
          </div>
           <div>
            <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
            <Input 
              id="whatsapp_number" 
              name="whatsapp_number" 
              placeholder="e.g., 08123456789" 
              value={profile?.whatsapp_number || ''} 
              onChange={handleChange} 
            />
          </div>
           <div>
            <Label htmlFor="about_me">About Me (Bio)</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              placeholder="Write a short bio..." 
              value={profile?.bio || ''} 
              onChange={handleChange}
              rows={4}
            />
            {/* <p className="text-xs text-gray-500 mt-1">
              Catatan: 'About Me' belum terhubung ke API simpan.
            </p> */}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>

      {/* Bagian Danger Zone */}
      <div className="bg-white p-8 rounded-lg shadow-md border border-red-300 mt-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-gray-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <Button asChild variant="destructive">
          <Link href="/dashboard/settings/delete">
            Delete Your Account
          </Link>
        </Button>
      </div>
    </div>
  );
}