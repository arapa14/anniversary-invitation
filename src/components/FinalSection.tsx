import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { WebKimmyConfig } from '../types';

interface FinalSectionProps {
  config: WebKimmyConfig;
  onLaunchFireworks: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({
  config,
  onLaunchFireworks,
}) => {
  return (
    <section
      id="final"
      className="min-h-[85vh] py-24 px-4 flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      <div className="max-w-2xl w-full mx-auto z-10 flex flex-col items-center">
        {/* Blossom Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full bg-white/80 border border-[#E5F6FE] flex items-center justify-center text-3xl mb-6 shadow-xs"
        >
          💍
        </motion.div>

        {/* Final Grand Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#243B53] leading-tight mb-4 tracking-tight"
        >
          May our journey always be <br />
          <span className="bg-gradient-to-r from-[#4895BE] via-[#89CFF1] to-[#FEBDBB] bg-clip-text text-transparent font-medium">
            filled with love &amp; joy
          </span>
        </motion.h2>

        <p className="font-garamond italic text-lg sm:text-2xl text-[#334E68] max-w-md mx-auto mb-8 leading-relaxed">
          "Terima kasih sudah tetap bersama dan mau menjalani semuanya sampai hari ini." 🤍
        </p>

        {/* Launch Fireworks Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLaunchFireworks}
          className="px-9 py-4 rounded-full btn-blush-romantic text-xs sm:text-sm uppercase tracking-widest font-bold cursor-pointer inline-flex items-center gap-3 shadow-[0_12px_35px_rgba(248,138,135,0.45)]"
        >
          <Sparkles size={18} className="text-[#5C1D1D]" />
          <span>Rayakan Bersama (Kembang Api) 🎆</span>
          <Heart size={16} className="fill-[#5C1D1D] text-[#5C1D1D]" />
        </motion.button>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-[#E5F6FE] w-full max-w-xs text-center text-xs text-[#627D98] font-normal">
          <p className="flex items-center justify-center gap-1.5">
            <span>Dibuat dengan segenap cinta untuk</span>
            <span className="text-[#243B53] font-serif font-medium italic">{config.recipientName}</span>
            <span>💕</span>
          </p>
          <p className="text-[10px] text-[#627D98]/70 mt-1">
            Happy Anniversary · Today, Tomorrow &amp; Always
          </p>
        </div>
      </div>
    </section>
  );
};
