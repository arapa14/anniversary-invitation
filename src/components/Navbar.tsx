import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Calendar,
  Image as GalleryIcon,
  Shirt,
  CheckCircle,
  Gift,
  MessageSquareHeart,
  Clock,
  Sparkles,
  Menu,
  X,
  MailOpen,
  ChevronUp,
} from 'lucide-react';

interface NavbarProps {
  onOpenCover: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCover }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 5 primary quick-access navigation items
  const primaryNavItems = [
    { id: 'hero', label: 'Beranda', icon: Heart },
    { id: 'event-details', label: 'Acara', icon: Calendar },
    { id: 'gallery', label: 'Galeri', icon: GalleryIcon },
    { id: 'rsvp', label: 'RSVP', icon: CheckCircle },
    { id: 'wishes', label: 'Doa', icon: MessageSquareHeart },
  ];

  // Secondary items accessed via "Menu / Lainnya"
  const secondaryNavItems = [
    { id: 'couple-story', label: 'Kisah Perjalanan', icon: Sparkles, desc: '1 Dekade Cinta' },
    { id: 'program-highlights', label: 'Susunan Acara', icon: Clock, desc: 'Rundown & Jadwal' },
    { id: 'dress-code', label: 'Dress Code', icon: Shirt, desc: 'Panduan Busana' },
    { id: 'digital-gift', label: 'Tanda Kasih', icon: Gift, desc: 'Kado & Amplop Digital' },
  ];

  const allTrackedIds = [
    'hero',
    'couple-story',
    'event-details',
    'gallery',
    'dress-code',
    'program-highlights',
    'rsvp',
    'digital-gift',
    'wishes',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of allTrackedIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === activeSection);

  return (
    <nav
      ref={menuRef}
      className="fixed bottom-3 sm:bottom-4 inset-x-0 z-40 flex flex-col items-center pointer-events-none px-3"
    >
      {/* Expandable Menu Popover */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-2 w-full max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-3xl p-3 border-2 border-[#D4A96A]/40 shadow-[0_15px_40px_rgba(212,169,106,0.3)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-[#FCE4E9]">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] font-bold text-[#8E7479] flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#D4A96A]" />
                <span>Menu Undangan</span>
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full text-[#8E7479] hover:bg-[#FFF5F7] transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-start gap-2 p-2 rounded-2xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FFF0D6] to-[#FCE4E9] border border-[#D4A96A]/60'
                        : 'hover:bg-[#FFF5F7] border border-transparent'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-xl shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white'
                          : 'bg-[#FFF0D6] text-[#D4A96A]'
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#7A666A] truncate leading-tight">
                        {item.label}
                      </p>
                      <p className="text-[9px] text-[#A68F94] font-sans truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Reopen Cover Option */}
            <div className="mt-2 pt-2 border-t border-[#FCE4E9]">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenCover();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl bg-[#FFF5F7] hover:bg-[#FCE4E9] border border-[#FCE4E9] text-xs font-sans font-bold text-[#8E7479] hover:text-[#C05C74] transition-colors cursor-pointer"
              >
                <MailOpen size={13} className="text-[#D4A96A]" />
                <span>Buka Kembali Sampul Depan</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Streamlined Floating Dock Bar */}
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border-2 border-[#D4A96A]/40 shadow-[0_10px_35px_rgba(212,169,106,0.3)] rounded-full px-2 py-1.5 flex items-center gap-1 max-w-fit">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white shadow-xs'
                  : 'text-[#8E7479] hover:text-[#C05C74] hover:bg-[#FFF5F7]'
              }`}
            >
              <Icon size={14} className={isActive ? 'stroke-[2.5]' : ''} />
              <span className="text-[9px] sm:text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* Vertical Divider */}
        <div className="w-[1px] h-5 bg-[#D4A96A]/30 mx-0.5" />

        {/* Menu / Lainnya Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap relative ${
            isMenuOpen || isSecondaryActive
              ? 'bg-[#FFF0D6] text-[#C05C74] border border-[#D4A96A]/60'
              : 'text-[#8E7479] hover:text-[#C05C74] hover:bg-[#FFF5F7]'
          }`}
          title="Menu Bagian Lainnya"
        >
          <div className="relative">
            {isMenuOpen ? <ChevronUp size={14} /> : <Menu size={14} />}
            {isSecondaryActive && !isMenuOpen && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#C05C74]" />
            )}
          </div>
          <span className="text-[9px] sm:text-[11px] mt-0.5">Menu</span>
        </button>
      </div>
    </nav>
  );
};
