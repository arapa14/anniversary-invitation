import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Quote, Sparkles, Heart, BookOpen, Clock } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner, WaxSealBadge } from './FloralDecorations';

export const CoupleStorySection: React.FC = () => {
  return (
    <section id="couple-story" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-4xl mx-auto">
      {/* Soft Corner Bouquets */}
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 opacity-70" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 opacity-70" />

      {/* Love Letter Card: 10-Year Reflection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-white/95 border border-[#B8EBFF]/70 shadow-[0_10px_35px_rgba(137,207,241,0.2)] relative overflow-hidden"
      >
        {/* Soft top gradient bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB]" />

        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen size={16} className="text-[#89CFF1]" />
          <span className="font-serif uppercase tracking-[0.22em] text-[11px] font-semibold text-[#627D98]">
            {INVITATION_DATA.loveLetter.subtitle}
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#334E68] text-center font-normal mb-3">
          {INVITATION_DATA.loveLetter.title}
        </h3>

        <GrandGoldDivider />

        <p className="font-garamond italic text-sm sm:text-base text-[#486581] leading-relaxed text-center px-2 sm:px-4">
          &ldquo;{INVITATION_DATA.loveLetter.content}&rdquo;
        </p>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-serif italic text-[#627D98]">
          <span>— Dengan Cinta,</span>
          <span className="font-bold text-[#334E68] not-italic">{INVITATION_DATA.loveLetter.author}</span>
        </div>
      </motion.div>

      {/* Couple Profiles Section Header */}
      <div className="text-center mb-10">
        <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.28em] text-[#89CFF1] font-sans font-bold">
          KITA BERDUA
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#334E68] font-normal mt-1">
          Daniel &amp; Ashley
        </h2>
        <p className="text-xs text-[#627D98] font-sans mt-1">
          Satu dekade merajut kasih, doa, dan kesetiaan bersamamu
        </p>
        <GrandGoldDivider />
      </div>

      {/* Couple Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-16">
        {/* Husband Profile */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-6 text-center flex flex-col items-center relative overflow-hidden bg-white border border-[#B8EBFF]/70 shadow-[0_8px_30px_rgba(137,207,241,0.16)]"
        >
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-4">
            <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#89CFF1]/70 animate-spin-slow" />
            <div className="w-full h-full rounded-full overflow-hidden p-1.5 bg-white shadow-xs border border-[#E5F6FE]">
              <img
                src={INVITATION_DATA.couple.husband.avatarUrl}
                alt={INVITATION_DATA.couple.husband.fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-1.5 inset-x-0 flex justify-center">
              <span className="bg-gradient-to-r from-[#89CFF1] to-[#B8EBFF] text-[#243B53] px-3.5 py-0.5 rounded-full shadow-xs text-[10px] font-sans uppercase tracking-wider font-bold">
                {INVITATION_DATA.couple.husband.role}
              </span>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#334E68] mt-1">
            {INVITATION_DATA.couple.husband.fullName}
          </h3>
          <p className="text-xs text-[#627D98] font-sans mt-1 max-w-xs leading-relaxed">
            {INVITATION_DATA.couple.husband.description}
          </p>

          <div className="mt-4 pt-3 border-t border-[#E5F6FE] w-full flex justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#89CFF1] font-semibold hover:text-[#334E68] transition-colors">
              <Instagram size={13} />
              <span>{INVITATION_DATA.couple.husband.instagram}</span>
            </span>
          </div>
        </motion.div>

        {/* Wife Profile */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-6 text-center flex flex-col items-center relative overflow-hidden bg-white border border-[#FFDDDC]/90 shadow-[0_8px_30px_rgba(254,189,187,0.16)]"
        >
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-4">
            <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#FEBDBB]/70 animate-spin-slow" />
            <div className="w-full h-full rounded-full overflow-hidden p-1.5 bg-white shadow-xs border border-[#FFDDDC]">
              <img
                src={INVITATION_DATA.couple.wife.avatarUrl}
                alt={INVITATION_DATA.couple.wife.fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-1.5 inset-x-0 flex justify-center">
              <span className="bg-gradient-to-r from-[#FFDDDC] to-[#FEBDBB] text-[#334E68] px-3.5 py-0.5 rounded-full shadow-xs text-[10px] font-sans uppercase tracking-wider font-bold">
                {INVITATION_DATA.couple.wife.role}
              </span>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#334E68] mt-1">
            {INVITATION_DATA.couple.wife.fullName}
          </h3>
          <p className="text-xs text-[#627D98] font-sans mt-1 max-w-xs leading-relaxed">
            {INVITATION_DATA.couple.wife.description}
          </p>

          <div className="mt-4 pt-3 border-t border-[#FFDDDC] w-full flex justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#FEBDBB] font-semibold hover:text-[#334E68] transition-colors">
              <Instagram size={13} />
              <span>{INVITATION_DATA.couple.wife.instagram}</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Love Story Timeline */}
      <div className="relative">
        <div className="text-center mb-10">
          <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.28em] text-[#89CFF1] font-sans font-bold">
            JEJAK KISAH 1 DEKADE
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#334E68] font-normal mt-1">
            Perjalanan Indah Bersamamu
          </h2>
          <p className="text-xs text-[#627D98] font-sans mt-1">
            Mengenang setiap momen manis sejak awal pertemuan hingga perayaan 10 tahun pernikahan kita
          </p>
          <GrandGoldDivider />
        </div>

        {/* Timeline Cards in Sea Pastel */}
        <div className="space-y-6 sm:space-y-8">
          {INVITATION_DATA.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl bg-white border border-[#B8EBFF]/60 p-4 sm:p-5 shadow-[0_8px_25px_rgba(137,207,241,0.14)] overflow-hidden"
            >
              <div className="relative rounded-2xl overflow-hidden mb-3.5 max-h-56">
                <img
                  src={milestone.imageUrl}
                  alt={milestone.title}
                  className="w-full h-44 sm:h-52 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs border border-[#89CFF1]/50 px-3 py-0.5 rounded-full text-[10px] font-sans uppercase tracking-wider font-semibold text-[#334E68] shadow-xs">
                  {milestone.tag}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-[#89CFF1] to-[#FEBDBB] text-[#243B53] px-3 py-0.5 rounded-full text-xs font-serif font-bold shadow-xs">
                  {milestone.year}
                </div>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-[#334E68]">
                {milestone.title}
              </h3>
              <h4 className="text-[10.5px] uppercase tracking-[0.18em] font-sans text-[#89CFF1] font-semibold mb-1.5">
                {milestone.subtitle}
              </h4>
              <p className="text-xs sm:text-[13px] text-[#627D98] font-sans leading-relaxed">
                {milestone.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

