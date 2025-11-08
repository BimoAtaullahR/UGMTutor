import Sidebar from '@/components/Sidebar'; // Pindahkan Sidebar ke /components
import DashboardHeader from '@/components/DashboardHeader'; // Pindahkan Header ke /components

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      {/* 1. Sidebar (sekarang di layout) */}
      <Sidebar /> 
      
      <div className="flex-1 ml-56"> {/* ml-56 harus = lebar sidebar */}
        {/* 2. Header (sekarang di layout) */}
        <DashboardHeader />
        
        {/* 3. 'children' adalah halaman Anda (page.tsx) */}
        <main className="p-10">
          {children}
        </main>
      </div>
    </div>
  );
}