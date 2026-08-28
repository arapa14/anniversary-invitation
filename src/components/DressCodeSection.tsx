import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shirt, Check, Sparkles, User, Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner } from './FloralDecorations';

export const DressCodeSection: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>(INVITATION_DATA.dressCode.colors[0].name);

  return (
    <section id="dress-code" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-4xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-24 h-24 opacity-60" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-24 h-24 opacity-60" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          DRESS CODE GUIDE
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Tata Busana &amp; Palet Warna
        </h2>
        <p className="text-xs text-[#A68F94] font-sans mt-1 max-w-sm mx-auto">
          {INVITATION_DATA.dressCode.description}
        </p>
        <GrandGoldDivider />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-5 sm:p-8 text-center bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)]"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF0D6] via-[#FCE4E9] to-[#FFF0D6] border border-[#D4A96A]/60 text-xs font-sans uppercase tracking-wider font-bold text-[#8E7479] mb-6 shadow-xs">
          <Shirt size={14} className="text-[#D4A96A]" />
          <span>Tema: {INVITATION_DATA.dressCode.themeName}</span>
        </div>

        {/* Color Palette Swatches */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-6">
          {INVITATION_DATA.dressCode.colors.map((color) => {
            const isSelected = selectedColor === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
              >
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center ${
                    isSelected ? 'ring-3 ring-[#D4A96A] ring-offset-2 scale-105' : 'border-2 border-[#FCE4E9]'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && <Check size={16} className="text-[#7A666A] drop-shadow-sm stroke-[3]" />}
                </div>
                <span className="text-[11px] font-bold text-[#7A666A] tracking-tight whitespace-nowrap">
                  {color.name}
                </span>
                <span className="text-[9px] text-[#A68F94] font-mono -mt-1">
                  {color.hex}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Color Information */}
        {selectedColor && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/40 max-w-sm mx-auto text-xs text-[#7A666A] shadow-xs">
            <p className="font-bold text-[#C05C74] mb-0.5">
              {INVITATION_DATA.dressCode.colors.find((c) => c.name === selectedColor)?.name}
            </p>
            <p className="text-[#8E7479]">
              {INVITATION_DATA.dressCode.colors.find((c) => c.name === selectedColor)?.description}
            </p>
          </div>
        )}

        {/* Style Etiquette Tips */}
        <div className="mt-6 pt-5 border-t border-[#FCE4E9] grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs text-[#7A666A]">
          <div className="p-3.5 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9]">
            <strong className="flex items-center gap-1.5 text-[#C05C74] font-serif text-sm mb-1 font-bold">
              <Shirt size={15} className="text-[#D4A96A]" />
              <span>Pria (Gentlemen)</span>
            </strong>
            <p className="text-xs text-[#8E7479] font-sans leading-relaxed">
              Kemeja pastel/putih, blazer santai bernuansa cream/sage, celana chino rapi, atau batik modern bermotif cerah lembut.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FFF5F7] border border-[#FCE4E9]">
            <strong className="flex items-center gap-1.5 text-[#C05C74] font-serif text-sm mb-1 font-bold">
              <Sparkles size={15} className="text-[#E598A8]" />
              <span>Wanita (Ladies)</span>
            </strong>
            <p className="text-xs text-[#8E7479] font-sans leading-relaxed">
              Dress / gamis anggun bernuansa dusty rose, blush pink, atau champagne dengan aksen mutiara atau rose gold.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
