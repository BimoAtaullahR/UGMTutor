'use client'
// 1. Impor hook yang diperlukan dari React dan Next.js
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 2. Impor 'createClient' dari helper SISI KLIEN
import { createClient } from "@/utils/supabase/client";

// 3. Impor semua komponen UI dan Ikon Anda
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Anda lupa mengimpor Input
import { Button } from "@/components/ui/button"; // Anda lupa mengimpor Button
import { Textarea } from "@/components/ui/textarea"; // Lebih baik untuk deskripsi
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  Trash2,
  Edit,
  Plus,
} from "lucide-react";

/**
 * --- 3B. Add Course Form ---
 * Komponen ini sekarang diperbaiki, dengan state yang benar dan
 * struktur JSX yang valid.
 */
function AddCourseForm({ onCourseAdded }: { onCourseAdded: () => void }) {
  // State untuk semua field
  const [subjectName, setSubjectName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(''); // <-- Diperbaiki
  const [category, setCategory] = useState('');     // <-- Diperbaiki
  const [location, setLocation] = useState('');       // <-- Diperbaiki
  
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient(); // Ini sekarang akan berfungsi

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploading(false);
    setError(null);

    try {
      let coverUrl: string | null = null;

      if (coverFile) {
        setUploading(true);
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        // 4. PERBAIKAN: Gunakan bucket 'course_covers'
        const { error: uploadError } = await supabase.storage
          .from('course_covers') // <-- Diperbaiki
          .upload(filePath, coverFile);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('course_covers') // <-- Diperbaiki
          .getPublicUrl(filePath);
        
        coverUrl = publicUrl;
        setUploading(false);
      }

      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject_name: subjectName,
          price: Number(price),
          description: description, // <-- Ditambahkan
          category: category,       // <-- Ditambahkan
          location: location,         // <-- Ditambahkan
          cover_image_url: coverUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal menambahkan course');
      }

      alert('Course berhasil ditambahkan!');
      setSubjectName('');
      setPrice('');
      setDescription('');
      setLocation('');
      setCategory('');
      setCoverFile(null);
      onCourseAdded(); // Refresh tabel

    } catch (err: any) {
      setError(err.message);
      setUploading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. PERBAIKAN: 'return' sekarang ada di tempat yang benar
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Add Your Course</h3>
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
              {coverFile ? coverFile.name : 'Upload Image'}
            </span>
          </Label>
          {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
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
          <Textarea // <-- Gunakan Textarea
            placeholder="Jelaskan course Anda..."
            value={description} // <-- Diperbaiki
            onChange={(e) => setDescription(e.target.value)} // <-- Diperbaiki
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
            value={location} // <-- Diperbaiki
            onChange={(e) => setLocation(e.target.value)} // <-- Diperbaiki
            required
          />
        </div>

        {/* Category (Komponen RadioGroup dimasukkan di sini) */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-4">Category</Label>
          <RadioGroup
            value={category} // <-- Diperbaiki
            onValueChange={setCategory} // <-- Diperbaiki
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
          {isSubmitting ? (uploading ? 'Uploading Image...' : 'Creating...') : 'Create Course'}
        </Button>
      </form>
    </div>
  );
}

/**
 * --- 4B. Active Courses Table ---
 * (Tidak ada perubahan, ini sudah benar)
 */
function ActiveCourseTable({ courses, isLoading, onDelete, onEdit }: {
  courses: any[];
  isLoading: boolean;
  onDelete: (courseId: string) => void;
  onEdit: (courseId: string) => void;
}) {

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">
          Your Active Course
        </h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
       <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">
          Your Active Course
        </h3>
        <p>Anda belum memiliki course. Silakan tambahkan!</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">
        Your Active Course
      </h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-sm font-semibold text-gray-500">
              Name
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-500">
              Price (IDR)
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-gray-100">
              <td className="py-4 px-4 font-medium text-gray-700">
                {course.subject_name}
              </td>
              <td className="py-4 px-4 text-gray-600">
                {new Intl.NumberFormat('id-ID').format(course.price)}
              </td>
              <td className="py-4 px-4">
                <div className="flex gap-3">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(course.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => onEdit(course.id)}
                    className="bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * --- MyCoursesPage Component (Wrapper) ---
 * Ini adalah komponen induk "smart" yang mengatur semua data.
 */
export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/courses/me');
      if (!res.ok) {
        throw new Error('Gagal mengambil data course');
      }
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId: string) => {
    if (!confirm('Anda yakin ingin menghapus course ini?')) {
      return;
    }
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Gagal menghapus course');
      }
      fetchCourses(); // Refresh data
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus course.');
    }
  };

  const handleEdit = (courseId: string) => {
    router.push(`/dashboard/my-courses/edit/${courseId}`);
  };

  // 6. PERBAIKAN: Tambahkan 'return' yang hilang
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <ActiveCourseTable
        courses={courses}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <AddCourseForm onCourseAdded={fetchCourses} />
    </div>
  );
};