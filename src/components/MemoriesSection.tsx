import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ChevronLeft, ChevronRight, Heart, ZoomIn, X, Sparkles } from 'lucide-react';
import { PolaroidPhoto } from '../types';
import { playPopSound } from '../utils/soundEffects';

interface MemoriesSectionProps {
  polaroids: PolaroidPhoto[];
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ polaroids }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedPhoto, setZoomedPhoto] = useState<PolaroidPhoto | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const currentPhoto = polaroids[currentIndex];

  const handleNext = () => {
    playPopSound();
    setCurrentIndex((prev) => (prev + 1) % polaroids.length);
  };

  const handlePrev = () => {
    playPopSound();
    setCurrentIndex((prev) => (prev - 1 + polaroids.length) % polaroids.length);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section
      id="memories"
      className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-3xl w-full mx-auto z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E5F6FE] text-xs uppercase tracking-widest text-[#334E68] shadow-xs mb-3">
            <Camera size={13} className="text-[#89CFF1]" />
            <span>Captured Memories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#243B53] tracking-tight mb-2">
            Our Photo Memories
          </h2>
          <p className="text-xs sm:text-sm text-[#627D98] font-light">
            Setiap detik manis dan senyuman indah yang kita lewati bersama
          </p>
        </motion.div>

        {/* Polaroid Card Display */}
        <div className="relative flex flex-col items-center justify-center my-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.92, rotate: (currentPhoto.rotation || 0) - 4 }}
              animate={{ opacity: 1, scale: 1, rotate: currentPhoto.rotation || 0 }}
              exit={{ opacity: 0, scale: 0.92, rotate: (currentPhoto.rotation || 0) + 4 }}
              transition={{ duration: 0.4 }}
              className="relative w-72 sm:w-88 bg-white p-4 sm:p-5 pb-7 sm:pb-9 rounded-2xl shadow-[0_20px_50px_rgba(137,207,241,0.25),0_4px_16px_rgba(254,189,187,0.15)] border border-[#E5F6FE] text-[#243B53] cursor-pointer group"
              onClick={() => setZoomedPhoto(currentPhoto)}
            >
              {/* Top Washi Tape decorative element */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#B8EBFF]/70 backdrop-blur-sm transform -rotate-2 border-y border-white/60 shadow-xs pointer-events-none rounded-xs" />

              {/* Photo Image Frame */}
              <div className="relative w-full aspect-square bg-[#F4FAFD] overflow-hidden rounded-xl mb-4 border border-[#E5F6FE]/80">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Zoom overlay badge */}
                <div className="absolute inset-0 bg-[#243B53]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="p-3 bg-white/60 text-[#243B53] rounded-full backdrop-blur-md shadow-md">
                    <ZoomIn size={20} />
                  </span>
                </div>
              </div>

              {/* Handwritten Caption on Polaroid Footer */}
              <div className="px-1 flex items-center justify-between">
                <p className="font-script text-2xl sm:text-3xl text-[#243B53] leading-none">
                  {currentPhoto.caption}
                </p>

                {/* Heart like button */}
                <button
                  type="button"
                  onClick={(e) => handleLike(currentPhoto.id, e)}
                  className="flex items-center gap-1 text-xs text-[#243B53] font-medium bg-[#E5F6FE] hover:bg-[#FFDDDC] px-2.5 py-1 rounded-full transition-all cursor-pointer border border-[#B8EBFF]/50"
                >
                  <Heart
                    size={13}
                    className={`${(likes[currentPhoto.id] || 0) > 0 ? 'fill-[#FEBDBB] text-[#FEBDBB]' : 'text-[#627D98]'}`}
                  />
                  <span>{(likes[currentPhoto.id] || 0) + 12}</span>
                </button>
              </div>

              {currentPhoto.date && (
                <p className="text-[10px] text-[#627D98] uppercase tracking-widest font-sans mt-2 text-left">
                  {currentPhoto.date}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3.5 rounded-full btn-sea-outline text-[#102A43] cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Indicator Dots */}
            <div className="flex gap-2 items-center">
              {polaroids.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playPopSound();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-[#4895BE] w-7 shadow-[0_0_10px_rgba(72,149,190,0.6)]'
                      : 'bg-[#B8EBFF] w-2.5 hover:bg-[#89CFF1]'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="p-3.5 rounded-full btn-sea-outline text-[#102A43] cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {zoomedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#102A43]/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setZoomedPhoto(null)}
          >
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute top-6 right-6 text-white hover:text-[#FEBDBB] p-2 rounded-full bg-white/20 backdrop-blur-md cursor-pointer"
            >
              <X size={24} />
            </button>
            <div
              className="max-w-xl w-full bg-white p-4 sm:p-6 pb-8 rounded-2xl text-[#243B53] shadow-2xl border border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomedPhoto.url}
                alt={zoomedPhoto.caption}
                className="w-full max-h-[65vh] object-cover rounded-xl mb-4"
                referrerPolicy="no-referrer"
              />
              <p className="font-script text-3xl sm:text-4xl text-[#243B53] text-center">
                {zoomedPhoto.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
