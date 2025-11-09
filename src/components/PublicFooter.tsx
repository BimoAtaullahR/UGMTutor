import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-blue-950 text-gray-300 py-16 print:hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image src="/logo-gamajar.svg" alt="Logo" width={160} height={40} className="h-10 w-auto" />
            <p className="mt-4 text-sm">
              Connecting UGM students for peer-to-peer learning and skill sharing.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/signup" className="hover:text-white">Become a Tutor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Email: contact@gamajar.id</li>
              <li>Address: Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} GamAjar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};