import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner } from './FloralDecorations';
import { PhotoItem } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openLightbox = (photo: PhotoItem, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (selectedIndex + 1) % INVITATION_DATA.gallery.length;
    setSelectedIndex(nextIdx);
    setSelectedPhoto(INVITATION_DATA.gallery[nextIdx]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx =
      (selectedIndex - 1 + INVITATION_DATA.gallery.length) % INVITATION_DATA.gallery.length;
    setSelectedIndex(prevIdx);
    setSelectedPhoto(INVITATION_DATA.gallery[prevIdx]);
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-5xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 opacity-70" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-28 h-28 opacity-70" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          MOMENTS &amp; MEMORIES
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Galeri Kenangan 1 Dekade
        </h2>
        <p className="text-xs text-[#A68F94] font-sans mt-1">
          Kumpulan potret bahagia yang mengabadikan setiap langkah perjalanan cinta kami
        </p>
        <GrandGoldDivider />
      </div>

      {/* Polaroid Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {INVITATION_DATA.gallery.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openLightbox(photo, index)}
            className="group relative bg-white p-3.5 pb-5 rounded-3xl shadow-[0_12px_35px_rgba(212,169,106,0.18)] hover:shadow-[0_18px_45px_rgba(212,169,106,0.28)] transition-all duration-300 border-2 border-[#D4A96A]/30 cursor-pointer flex flex-col items-center"
          >
            {/* Golden Heart/Washi Pin Tag */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white rounded-full text-[9px] font-sans uppercase tracking-wider font-bold shadow-xs">
              MOMENT #{index + 1}
            </div>

            {/* Photo Container */}
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#FFF5F7] mb-3">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="p-2.5 rounded-full bg-white/80 text-[#8E7479] shadow-md">
                  <ZoomIn size={18} />
                </span>
              </div>
            </div>

            {/* Polaroid Caption */}
            <div className="w-full text-center px-1">
              <h4 className="font-serif font-bold text-base text-[#7A666A] mb-0.5">
                {photo.title}
              </h4>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4A96A] font-bold">
                {photo.yearOrContext}
              </p>
              <p className="text-xs text-[#8E7479] font-sans italic mt-1 line-clamp-2">
                &ldquo;{photo.caption}&rdquo;
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#5E4A4E]/70 backdrop-blur-xs flex items-center justify-center p-3 select-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto border-2 border-[#D4A96A]/50"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF5F7] text-[#8E7479] hover:bg-[#FCE4E9] transition-colors z-10 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Lightbox Photo */}
              <div className="relative w-full rounded-2xl overflow-hidden max-h-[55vh] flex items-center justify-center bg-[#FFF5F7] mt-2">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[52vh] w-auto object-contain rounded-xl"
                />

                {/* Prev / Next Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-[#8E7479] hover:bg-white shadow-md transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-[#8E7479] hover:bg-white shadow-md transition-all cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Caption & Info */}
              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#D4A96A] font-bold">
                  {selectedPhoto.yearOrContext}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#7A666A] mt-0.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-[#8E7479] font-sans italic mt-1 max-w-sm mx-auto">
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
                <p className="text-[10px] font-sans text-[#A68F94] mt-2">
                  Foto {selectedIndex + 1} dari {INVITATION_DATA.gallery.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
