import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { WebKimmyConfig } from '../types';

interface LetterSectionProps {
  letter: WebKimmyConfig['letter'];
}

export const LetterSection: React.FC<LetterSectionProps> = ({ letter }) => {
  return (
    <section
      id="letter"
      className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-2xl w-full mx-auto z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E5F6FE] text-xs uppercase tracking-widest text-[#334E68] shadow-xs mb-3">
            <Heart size={12} className="text-[#FEBDBB] fill-[#FEBDBB]" />
            <span>Surat Kasih & Doa</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#243B53] tracking-tight">
            A Letter For You
          </h2>
        </motion.div>

        {/* Elegant Parchment Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-7 sm:p-12 shadow-[0_20px_50px_rgba(137,207,241,0.2),0_4px_12px_rgba(254,189,187,0.15)]"
        >
          {/* Floral Header flourish */}
          <div className="text-center text-[#89CFF1] text-base sm:text-lg tracking-[0.3em] mb-2 select-none opacity-85">
            ✿ ❀ ✦ ❀ ✿
          </div>

          <p className="text-center text-xs text-[#627D98] uppercase tracking-widest font-medium mb-6">
            Today & Forever
          </p>

          {/* Salutation */}
          <p className="font-garamond italic text-lg sm:text-2xl text-[#334E68] text-center mb-6 leading-relaxed">
            {letter.salutation}
          </p>

          <p className="font-serif text-xl sm:text-2xl hidden text-[#243B53] font-medium mb-5">
            {letter.recipientGreeting}
          </p>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[#334E68] leading-relaxed font-normal">
            {letter.paragraphs.map((para, index) => (
              <p key={index} className="tracking-wide">
                {para}
              </p>
            ))}
          </div>

          {/* Signature & Seal Block */}
          <div className="mt-10 pt-6 border-t border-[#E5F6FE] flex flex-col items-end">
            <p className="font-garamond italic text-base sm:text-xl text-[#627D98]">
              {letter.closing}
            </p>
            <p className="font-serif text-xl sm:text-2xl text-[#243B53] mt-1 font-medium tracking-wide">
              {letter.signature}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
