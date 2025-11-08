'use client'
// 1. Impor hook yang diperlukan, termasuk useParams
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'; // <-- Impor useParams

// 2. Impor 'createClient' dari helper SISI KLIEN
import { createClient } from "@/utils/supabase/client";

// 3. Impor semua komponen UI dan Ikon Anda
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";

// 4. Kita ubah 'AddCourseForm' menjadi komponen Halaman default
export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams(); // <-- Hook untuk mendapatkan [courseId]
  const courseId = params.courseId as string; // Ambil ID dari URL

  // State untuk semua field
  const [subjectName, setSubjectName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);
  
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();

  // 5. EFEK: Ambil data course yang ada untuk mengisi form
  useEffect(() => {
    if (!courseId) return; // Jangan lakukan apa-apa jika ID belum ada

    const fetchCourseData = async () => {
      // Panggil API GET [courseId] yang sudah Anda buat
      const res = await fetch(`/api/courses/${courseId}`);
      if (res.ok) {
        const data = await res.json();
        // Isi semua state dengan data yang ada
        setSubjectName(data.subject_name || '');
        setPrice(data.price?.toString() || '');
        setDescription(data.description || '');
        setCategory(data.category || '');
        setLocation(data.location || '');
        setExistingCoverUrl(data.cover_image_url || null);
      }
    };
    fetchCourseData();
  }, [courseId]); // Jalankan ini setiap 'courseId' berubah

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverFile(e.target.files[0]);
    }
  };

  // 6. MODIFIKASI: handleSubmit untuk 'PUT' (Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploading(false);
    setError(null);

    try {
      let coverUrl = existingCoverUrl; // Mulai dengan URL yang ada

      // Jika user meng-upload file BARU, ganti URL-nya
      if (coverFile) {
        setUploading(true);
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('course_covers')
          .upload(filePath, coverFile, {
            upsert: true // Timpa file lama jika ada (opsional)
          });

        if (uploadError) throw new Error(uploadError.message);

        const { data: { publicUrl } } = supabase.storage
          .from('course_covers')
          .getPublicUrl(filePath);
        
        coverUrl = publicUrl;
        setUploading(false);
      }

      // 7. MODIFIKASI: Panggil API 'PUT' ke endpoint dinamis
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT', // <-- Ubah ke PUT
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject_name: subjectName,
          price: Number(price),
          description: description,
          category: category,
          location: location,
          cover_image_url: coverUrl, // Kirim URL (baru atau lama)
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal meng-update course');
      }

      alert('Course berhasil di-update!');
      
      // 8. Kembalikan user ke halaman 'My Courses'
      router.push('/dashboard/my-courses'); 
      router.refresh(); // Segarkan data di halaman tersebut

    } catch (err: any) {
      setError(err.message);
      setUploading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 9. RETURN: JSX form (sama seperti AddCourseForm)
  return (
    // Kita tidak perlu grid di sini, hanya form
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Edit Your Course</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Course Name */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Course Name
          </Label>
          <Input
            type="text"
            placeholder="Enter your course name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </div>
        
        {/* Cover Image */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Add Cover (Opsional)
          </Label>
          <Input 
            type="file" 
            id="cover-upload" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
          />
          <Label 
            htmlFor="cover-upload" 
            className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Plus size={32} />
            <span className="mt-2 text-sm">
              {coverFile ? coverFile.name : (existingCoverUrl ? 'Ganti cover' : 'Upload Image')}
            </span>
          </Label>
          {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
          {/* Tampilkan preview gambar yang ada */}
          {!coverFile && existingCoverUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Cover saat ini:</p>
              <img src={existingCoverUrl} alt="Cover" className="w-full h-auto mt-2 rounded-lg object-cover" />
            </div>
          )}
        </div>
        
        {/* Price */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Price (IDR)
          </Label>
          <Input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </Label>
          <Textarea
            placeholder="Jelaskan course Anda..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </Label>
          <Input
            type="text"
            placeholder="Misal: Online, Fakultas MIPA, dll."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-4">Category</Label>
          <RadioGroup
            value={category}
            onValueChange={setCategory}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="science" id="cat-science" />
              <Label htmlFor="cat-science">Science</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="politics" id="cat-politics" />
              <Label htmlFor="cat-politics">Politics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="cat-business" />
              <Label htmlFor="cat-business">Business</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="engineering" id="cat-engineering" />
              <Label htmlFor="cat-engineering">Engineering</Label>
            </div>
          </RadioGroup>
        </div>
        
        {error && <p className="text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-900 text-white font-semibold p-4 rounded-lg shadow-md hover:bg-blue-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? (uploading ? 'Uploading Image...' : 'Saving Changes...') : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}