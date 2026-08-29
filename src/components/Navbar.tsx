import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  BookOpen,
  Image as GalleryIcon,
  Sparkles,
  MailOpen,
} from 'lucide-react';

interface NavbarProps {
  onOpenCover: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCover }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Beranda', icon: Heart },
    { id: 'couple-story', label: 'Surat Kasih', icon: BookOpen },
    { id: 'gallery', label: 'Galeri Kita', icon: GalleryIcon },
    { id: 'love-vows', label: 'Janji & Doa', icon: Sparkles },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-3 sm:bottom-4 inset-x-0 z-40 flex items-center justify-center pointer-events-none px-3">
      {/* Streamlined Floating Sea Pastel Bar */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-[#89CFF1]/40 shadow-[0_8px_30px_rgba(137,207,241,0.25)] rounded-full px-2.5 py-1.5 flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#89CFF1] to-[#B8EBFF] text-[#243B53] font-bold shadow-xs'
                  : 'text-[#627D98] hover:text-[#334E68] hover:bg-[#E5F6FE]/60 font-medium'
              }`}
            >
              <Icon size={14} className={isActive ? 'stroke-[2.5]' : ''} />
              <span className="text-[10px] sm:text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* Vertical Divider */}
        <div className="w-[1px] h-5 bg-[#89CFF1]/30 mx-1" />

        {/* Cover Button */}
        <button
          onClick={onOpenCover}
          className="flex flex-col items-center justify-center px-2.5 py-1 rounded-full text-xs font-sans font-medium text-[#627D98] hover:text-[#334E68] hover:bg-[#E5F6FE]/60 transition-all cursor-pointer select-none whitespace-nowrap"
          title="Buka Sampul Depan"
        >
          <MailOpen size={14} />
          <span className="text-[10px] sm:text-[11px] mt-0.5">Sampul</span>
        </button>
      </div>
    </nav>
  );
};


