import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flower2, Heart, CheckCircle } from 'lucide-react';
import { BouquetFlower } from '../types';
import { playPopSound } from '../utils/soundEffects';

interface DigitalBouquetSectionProps {
  bouquet: BouquetFlower[];
}

export const DigitalBouquetSection: React.FC<DigitalBouquetSectionProps> = ({ bouquet }) => {
  const [selectedFlower, setSelectedFlower] = useState<BouquetFlower>(bouquet[0]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([bouquet[0].id]);

  const handleSelect = (flower: BouquetFlower) => {
    playPopSound();
    setSelectedFlower(flower);
    if (!unlockedIds.includes(flower.id)) {
      setUnlockedIds((prev) => [...prev, flower.id]);
    }
  };

  return (
    <section
      id="bouquet"
      className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl w-full mx-auto z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E5F6FE] text-xs uppercase tracking-widest text-[#334E68] shadow-xs mb-3">
            <Flower2 size={13} className="text-[#89CFF1]" />
            <span>Interactive Flower Bouquet</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#243B53] tracking-tight mb-3">
            A Digital Bouquet for You
          </h2>
          <p className="text-xs sm:text-sm text-[#627D98] font-light max-w-md mx-auto">
            Sentuh setiap bunga di buket untuk membuka arti dan pesan manis di baliknya 🌸
          </p>
        </motion.div>

        {/* Main Grid: Bouquet Visual on Left/Center + Message Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Bouquet Visual Interactive Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_45px_rgba(137,207,241,0.25)] p-4 flex items-center justify-center">
              {/* Soft Ambient Glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-30 transition-all duration-500 pointer-events-none"
                style={{ backgroundColor: selectedFlower.color }}
              />

              {/* Bouquet Wrapping Graphic */}
              <div className="absolute bottom-6 w-36 h-40 sm:w-44 sm:h-48 bg-gradient-to-t from-[#89CFF1] via-[#B8EBFF] to-[#E5F6FE] rounded-b-3xl border border-white/60 shadow-md flex flex-col items-center justify-between p-3 z-0">
                <div className="w-full text-center">
                  <span className="text-[10px] tracking-widest uppercase font-serif text-[#334E68] font-medium">
                    Handmade with Love
                  </span>
                </div>
                {/* Bouquet Ribbon Tie */}
                <div className="w-10 h-10 -mb-2 text-2xl flex items-center justify-center drop-shadow-md">
                  🎀
                </div>
              </div>

              {/* Interactive Floating Flowers inside Bouquet */}
              <div className="relative w-full h-full z-10">
                {bouquet.map((flower) => {
                  const isSelected = selectedFlower.id === flower.id;
                  const isUnlocked = unlockedIds.includes(flower.id);

                  return (
                    <motion.button
                      key={flower.id}
                      type="button"
                      onClick={() => handleSelect(flower)}
                      whileHover={{ scale: 1.25, rotate: 8 }}
                      whileTap={{ scale: 0.9 }}
                      animate={
                        isSelected
                          ? {
                              scale: [1.15, 1.25, 1.15],
                              y: [0, -6, 0],
                            }
                          : { y: [0, -3, 0] }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 3 + (flower.x % 2),
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        left: `${flower.x}%`,
                        top: `${flower.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-2 border-[#89CFF1] shadow-[0_0_20px_rgba(137,207,241,0.8)] z-30'
                          : isUnlocked
                          ? 'bg-white/80 border border-[#B8EBFF] z-20 shadow-xs'
                          : 'bg-white/40 border border-white/40 opacity-70 z-10'
                      }`}
                    >
                      <span>{flower.emoji}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Counter Pill */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E5F6FE] text-[10px] text-[#334E68] tracking-wider z-20 flex items-center gap-1 shadow-xs">
                <CheckCircle size={10} className="text-[#89CFF1]" />
                <span>
                  {unlockedIds.length}/{bouquet.length} Terbuka
                </span>
              </div>
            </div>

            {/* Quick Flower Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-sm">
              {bouquet.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleSelect(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    selectedFlower.id === f.id
                      ? 'btn-sea-primary shadow-xs'
                      : 'bg-white/90 text-[#334E68] hover:bg-white hover:border-[#89CFF1] border border-[#D9E2EC] font-medium shadow-2xs'
                  }`}
                >
                  <span>{f.emoji}</span>
                  <span className="truncate max-w-[85px] font-sans font-medium">{f.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Flower Meaning & Message Card */}
          <div className="lg:col-span-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlower.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="bg-white/90 backdrop-blur-2xl border border-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(137,207,241,0.2)] relative overflow-hidden"
              >
                {/* Top Floral Accent */}
                <div className="flex items-center justify-between border-b border-[#E5F6FE] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl drop-shadow-xs">
                      {selectedFlower.emoji}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#243B53] font-medium">
                        {selectedFlower.name}
                      </h3>
                      <p className="text-[11px] text-[#627D98] uppercase tracking-widest font-normal">
                        {selectedFlower.meaning}
                      </p>
                    </div>
                  </div>
                  <Sparkles className="text-[#89CFF1]" size={18} />
                </div>

                {/* Sweet Romantic Message */}
                <div className="my-6">
                  <p className="font-garamond italic text-lg sm:text-xl md:text-2xl text-[#334E68] leading-relaxed">
                    "{selectedFlower.msg}"
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 border-t border-[#E5F6FE] flex items-center justify-between text-xs text-[#627D98] font-normal">
                  <span className="flex items-center gap-1">
                    <Heart size={12} className="text-[#FEBDBB] fill-[#FEBDBB]" />
                    <span>Special Bloom for Istriku</span>
                  </span>
                  <span className="italic font-serif">Penuh Kasih</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
