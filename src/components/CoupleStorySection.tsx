import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Quote, Sparkles, Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, GrandFloralArch, LuxuryBouquetCorner, WaxSealBadge } from './FloralDecorations';

export const CoupleStorySection: React.FC = () => {
  return (
    <section id="couple-story" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-4xl mx-auto">
      {/* Decorative Corner Bouquets */}
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 sm:w-40 sm:h-40 opacity-70" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-28 h-28 sm:w-40 sm:h-40 opacity-70" />

      {/* Quote Card with Golden Border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl mx-auto mb-12 sm:mb-16 p-5 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xs border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)] relative overflow-hidden"
      >
        {/* Shimmer line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent" />
        
        <Quote size={24} className="text-[#D4A96A] mx-auto mb-2" />
        <p className="font-garamond italic text-sm sm:text-base text-[#7A666A] leading-relaxed">
          &ldquo;{INVITATION_DATA.quote.text}&rdquo;
        </p>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-sans text-[#D4A96A] tracking-[0.25em] uppercase font-bold">
          <Sparkles size={11} className="text-[#D4A96A]" />
          <span>{INVITATION_DATA.quote.source}</span>
          <Sparkles size={11} className="text-[#D4A96A]" />
        </div>
      </motion.div>

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          THE HAPPY COUPLE
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Mempelai yang Berbahagia
        </h2>
        <GrandGoldDivider />
      </div>

      {/* Couple Profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16">
        {/* Husband Profile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 text-center flex flex-col items-center relative overflow-hidden bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)]"
        >
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 mb-5">
            {/* Golden Dashed Ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#D4A96A]/70 animate-spin-slow" />
            <div className="w-full h-full rounded-full overflow-hidden p-1.5 bg-white shadow-md border border-[#FCE4E9]">
              <img
                src={INVITATION_DATA.couple.husband.avatarUrl}
                alt={INVITATION_DATA.couple.husband.fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <span className="bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white px-3.5 py-0.5 rounded-full shadow-xs text-[10px] font-sans uppercase tracking-wider font-bold">
                {INVITATION_DATA.couple.husband.role}
              </span>
            </div>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7A666A] mt-2">
            {INVITATION_DATA.couple.husband.fullName}
          </h3>
          <p className="text-xs text-[#8E7479] font-sans mt-1.5 max-w-xs leading-relaxed">
            {INVITATION_DATA.couple.husband.sonOf}
          </p>

          <div className="mt-4 pt-3 border-t border-[#FCE4E9] w-full flex justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#D4A96A] font-semibold hover:text-[#C05C74] transition-colors">
              <Instagram size={13} />
              <span>{INVITATION_DATA.couple.husband.instagram}</span>
            </span>
          </div>
        </motion.div>

        {/* Wife Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 text-center flex flex-col items-center relative overflow-hidden bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)]"
        >
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 mb-5">
            {/* Golden Dashed Ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#D4A96A]/70 animate-spin-slow" />
            <div className="w-full h-full rounded-full overflow-hidden p-1.5 bg-white shadow-md border border-[#FCE4E9]">
              <img
                src={INVITATION_DATA.couple.wife.avatarUrl}
                alt={INVITATION_DATA.couple.wife.fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <span className="bg-gradient-to-r from-[#E598A8] to-[#D4A96A] text-white px-3.5 py-0.5 rounded-full shadow-xs text-[10px] font-sans uppercase tracking-wider font-bold">
                {INVITATION_DATA.couple.wife.role}
              </span>
            </div>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7A666A] mt-2">
            {INVITATION_DATA.couple.wife.fullName}
          </h3>
          <p className="text-xs text-[#8E7479] font-sans mt-1.5 max-w-xs leading-relaxed">
            {INVITATION_DATA.couple.wife.daughterOf}
          </p>

          <div className="mt-4 pt-3 border-t border-[#FCE4E9] w-full flex justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#D4A96A] font-semibold hover:text-[#C05C74] transition-colors">
              <Instagram size={13} />
              <span>{INVITATION_DATA.couple.wife.instagram}</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Love Milestone Numbers Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-[#D4A96A]/30 shadow-[0_15px_35px_rgba(212,169,106,0.18)] mb-16"
      >
        <div className="text-center mb-5">
          <h3 className="font-serif text-base sm:text-lg text-[#7A666A] font-bold">
            10 Tahun Penuh Makna dalam Angka
          </h3>
          <p className="text-[11px] text-[#A68F94] font-sans mt-0.5">
            Setiap detik yang terukir adalah karunia indah yang patut disyukuri
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-center">
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C05C74]">10</span>
            <p className="text-[10px] text-[#8E7479] uppercase tracking-[0.15em] font-sans font-semibold mt-1">Tahun Menikah</p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C05C74]">3,652+</span>
            <p className="text-[10px] text-[#8E7479] uppercase tracking-[0.15em] font-sans font-semibold mt-1">Hari Bersama</p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C05C74]">2</span>
            <p className="text-[10px] text-[#8E7479] uppercase tracking-[0.15em] font-sans font-semibold mt-1">Buah Hati</p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/30">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C05C74]">∞</span>
            <p className="text-[10px] text-[#8E7479] uppercase tracking-[0.15em] font-sans font-semibold mt-1">Kenangan Cinta</p>
          </div>
        </div>
      </motion.div>

      {/* Love Story Timeline */}
      <div className="relative">
        <div className="text-center mb-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
            OUR LOVE STORY
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
            Perjalanan Kisah Cinta Kami
          </h2>
          <p className="text-xs text-[#A68F94] font-sans mt-1">
            Mengenang jejak-jejak indah yang membawa kami ke hari ke-10 tahun pernikahan ini
          </p>
          <GrandGoldDivider />
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 sm:space-y-12">
          {INVITATION_DATA.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-3xl bg-white border-2 border-[#D4A96A]/30 p-4 sm:p-6 shadow-[0_15px_35px_rgba(212,169,106,0.15)] overflow-hidden"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 max-h-64">
                <img
                  src={milestone.imageUrl}
                  alt={milestone.title}
                  className="w-full h-48 sm:h-60 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#FFF0D6] border border-[#D4A96A] px-3 py-1 rounded-full text-[11px] font-sans uppercase tracking-wider font-bold text-[#8E7479] shadow-xs">
                  {milestone.tag}
                </div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white px-3 py-1 rounded-full text-xs font-serif font-bold shadow-xs">
                  {milestone.year}
                </div>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#7A666A]">
                {milestone.title}
              </h3>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#D4A96A] font-bold mb-2">
                {milestone.subtitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#8E7479] font-sans leading-relaxed">
                {milestone.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
