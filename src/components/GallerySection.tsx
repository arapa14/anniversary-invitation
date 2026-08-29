import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, Heart } from 'lucide-react';
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
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#89CFF1] font-sans font-bold">
          GALERI KENANGAN
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#334E68] font-normal mt-1">
          Potret Bahagia 1 Dekade
        </h2>
        <p className="text-xs text-[#627D98] font-sans mt-1">
          Kumpulan momen indah yang mengabadikan kebersamaan dan tawa sepanjang 10 tahun
        </p>
        <GrandGoldDivider />
      </div>

      {/* Soft Pastel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {INVITATION_DATA.gallery.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openLightbox(photo, index)}
            className="group relative bg-white p-3.5 pb-4 rounded-3xl shadow-[0_8px_25px_rgba(137,207,241,0.15)] hover:shadow-[0_12px_32px_rgba(137,207,241,0.25)] transition-all duration-300 border border-[#B8EBFF]/60 cursor-pointer flex flex-col items-center"
          >
            {/* Tag Badge */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 bg-gradient-to-r from-[#89CFF1] to-[#FEBDBB] text-[#243B53] rounded-full text-[9.5px] font-sans uppercase tracking-wider font-bold shadow-xs">
              Momen #{index + 1}
            </div>

            {/* Photo Container */}
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#E5F6FE]/50 mb-3 mt-1">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#334E68]/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#334E68]">
                <span className="p-2 rounded-full bg-white/90 text-[#334E68] shadow-md">
                  <ZoomIn size={16} />
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="w-full text-center px-1">
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#334E68] mb-0.5">
                {photo.title}
              </h4>
              <p className="text-[9.5px] font-sans uppercase tracking-[0.18em] text-[#89CFF1] font-semibold">
                {photo.yearOrContext}
              </p>
              <p className="text-xs text-[#627D98] font-sans italic mt-1 line-clamp-2">
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
            className="fixed inset-0 z-50 bg-[#334E68]/60 backdrop-blur-xs flex items-center justify-center p-3 select-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto border border-[#B8EBFF]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#E5F6FE] text-[#334E68] hover:bg-[#B8EBFF] transition-colors z-10 cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Lightbox Photo */}
              <div className="relative w-full rounded-2xl overflow-hidden max-h-[55vh] flex items-center justify-center bg-[#E5F6FE]/50 mt-2">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[52vh] w-auto object-contain rounded-xl"
                />

                {/* Prev / Next Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[#334E68] hover:bg-white shadow-md transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[#334E68] hover:bg-white shadow-md transition-all cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Caption & Info */}
              <div className="mt-3.5 text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#89CFF1] font-bold">
                  {selectedPhoto.yearOrContext}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#334E68] mt-0.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-[#627D98] font-sans italic mt-1 max-w-sm mx-auto">
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
                <p className="text-[10px] font-sans text-[#627D98] mt-2">
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

