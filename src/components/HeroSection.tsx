import React from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Sparkles, ChevronDown } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import {
  GrandFloralArch,
  GrandGoldDivider,
  LuxuryBouquetCorner,
  CelebrationRibbonBadge,
  WaxSealBadge,
} from './FloralDecorations';

export const HeroSection: React.FC = () => {
  const scrollToStory = () => {
    const storyElem = document.getElementById('couple-story');
    if (storyElem) {
      storyElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVows = () => {
    const vowsElem = document.getElementById('love-vows');
    if (vowsElem) {
      vowsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-8 pb-14 px-3 sm:px-6 text-center overflow-hidden"
    >
      {/* Soft Sea Pastel Corner Accents */}
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-32 h-32 sm:w-44 sm:h-44 opacity-70" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-32 h-32 sm:w-44 sm:h-44 opacity-70" />

      {/* Gentle Ambient Pastel Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B8EBFF]/35 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#FEBDBB]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md sm:max-w-xl mx-auto w-full relative z-10"
      >
        {/* Soft Floral Arch at Top */}
        <GrandFloralArch className="w-full max-w-sm mx-auto mb-1.5 opacity-80" />

        {/* Milestone Ribbon Badge */}
        <CelebrationRibbonBadge
          title="UNTUK ISTRIKU TERCINTA, ASHLEY"
          subtitle="2015 — 2026 • 10 TAHUN PERNIKAHAN KITA"
        />

        <h2 className="font-serif italic text-lg sm:text-xl text-[#627D98] mt-2 font-normal">
          Happy 10th Wedding Anniversary, My Love
        </h2>

        {/* Display Typography for Couple Names */}
        <h1 className="font-script text-5xl sm:text-6xl text-[#334E68] font-normal my-2 tracking-wide drop-shadow-xs">
          Daniel <span className="text-[#FEBDBB] font-serif text-4xl sm:text-5xl">&amp;</span> Ashley
        </h1>

        {/* Soft Divider */}
        <GrandGoldDivider />

        <p className="font-sans text-[#627D98] max-w-md mx-auto leading-relaxed text-xs sm:text-sm mb-5 italic px-2">
          &ldquo;{INVITATION_DATA.couple.anniversaryTheme}&rdquo;
        </p>

        {/* Couple Photo with Soft Ring & Cameo Seal */}
        <div className="relative mx-auto my-5 w-56 h-56 sm:w-64 sm:h-64">
          {/* Animated Soft Pastel Halo */}
          <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-[#89CFF1]/60 animate-spin-slow" />
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#B8EBFF]/30 via-[#FFDDDC]/30 to-[#FEBDBB]/20 blur-sm animate-pulse pointer-events-none" />

          {/* Photo Frame */}
          <div className="w-full h-full rounded-full overflow-hidden bg-white p-2 border-2 border-[#B8EBFF]/70 shadow-[0_12px_35px_rgba(137,207,241,0.25)]">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"
              alt="Daniel & Ashley 10th Anniversary"
              className="w-full h-full object-cover object-center rounded-full transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Cameo Seal Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20">
            <WaxSealBadge text="10th" size="md" variant="sea" />
          </div>
        </div>

        {/* 10-Year Journey Highlights Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full my-6">
          {INVITATION_DATA.decadeHighlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-3 rounded-2xl bg-gradient-to-b ${item.colorClass} border backdrop-blur-xs shadow-xs text-center`}
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#334E68]">
                {item.number}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#627D98] uppercase tracking-wider font-sans font-semibold block mt-0.5">
                {item.unit}
              </span>
              <p className="text-[10.5px] font-sans font-medium text-[#334E68] mt-1 line-clamp-1">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Warm Spiritual Verse Card */}
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#B8EBFF]/60 shadow-[0_6px_25px_rgba(137,207,241,0.15)] text-center">
          <p className="font-serif italic text-xs sm:text-sm text-[#334E68] leading-relaxed max-w-lg mx-auto">
            &ldquo;{INVITATION_DATA.quote.text}&rdquo;
          </p>
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-sans font-semibold text-[#89CFF1]">
            <Sparkles size={12} />
            <span>{INVITATION_DATA.quote.source}</span>
            <Sparkles size={12} />
          </div>
        </div>

        {/* Action Buttons: Read Letter & Vows */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mt-4">
          <button
            onClick={scrollToStory}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB] text-[#243B53] text-xs font-sans uppercase tracking-wider font-bold shadow-[0_4px_16px_rgba(137,207,241,0.35)] hover:brightness-105 transition-all cursor-pointer"
          >
            <BookOpen size={15} />
            <span>Baca Surat Kasih untuk Istri</span>
          </button>

          <button
            onClick={scrollToVows}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#334E68] border border-[#89CFF1]/60 text-xs font-sans uppercase tracking-wider font-semibold shadow-xs hover:bg-[#E5F6FE] transition-all cursor-pointer"
          >
            <Heart size={14} className="fill-[#FEBDBB] text-[#FEBDBB]" />
            <span>Janji &amp; Doa Kasih</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-7 text-[#89CFF1] animate-bounce flex flex-col items-center">
          <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#627D98]">Gulir ke Bawah</span>
          <ChevronDown size={16} />
        </div>
      </motion.div>
    </section>
  );
};


