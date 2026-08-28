import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, Camera, UtensilsCrossed, Cake, Music, GlassWater, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner } from './FloralDecorations';

export const ProgramHighlightsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <GlassWater size={18} className="text-[#D4A96A]" />;
      case 'HeartHandshake':
        return <HeartHandshake size={18} className="text-[#C05C74]" />;
      case 'Camera':
        return <Camera size={18} className="text-[#D4A96A]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed size={18} className="text-[#C05C74]" />;
      case 'Cake':
        return <Cake size={18} className="text-[#D4A96A]" />;
      case 'Music':
        return <Music size={18} className="text-[#C05C74]" />;
      default:
        return <Sparkles size={18} className="text-[#D4A96A]" />;
    }
  };

  return (
    <section id="program-highlights" className="py-14 sm:py-20 px-3 sm:px-6 relative max-w-md sm:max-w-3xl mx-auto">
      <LuxuryBouquetCorner position="top-left" className="absolute top-0 left-0 w-24 h-24 opacity-60" />
      <LuxuryBouquetCorner position="top-right" className="absolute top-0 right-0 w-24 h-24 opacity-60" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4A96A] font-sans font-bold">
          EVENT ITINERARY
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#C05C74] font-normal mt-1">
          Susunan Acara
        </h2>
        <p className="text-xs text-[#A68F94] font-sans mt-1">
          Rangkaian kebersamaan yang telah kami siapkan khusus untuk Anda
        </p>
        <GrandGoldDivider />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {INVITATION_DATA.schedule.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-2xl p-3.5 sm:p-4.5 flex items-start sm:items-center gap-3 sm:gap-4 bg-white border-2 border-[#D4A96A]/30 shadow-[0_8px_25px_rgba(212,169,106,0.15)] hover:shadow-md transition-all"
          >
            {/* Time Badge */}
            <div className="shrink-0 w-20 sm:w-24 text-center py-1.5 px-2 rounded-xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4E9] border border-[#D4A96A]/40">
              <span className="font-serif text-xs sm:text-sm font-bold text-[#C05C74] block">
                {item.time}
              </span>
            </div>

            {/* Icon Bubble */}
            <div className="shrink-0 w-9 h-9 rounded-full bg-[#FFF0D6] border border-[#D4A96A]/50 shadow-xs flex items-center justify-center">
              {getIcon(item.iconName)}
            </div>

            {/* Text details */}
            <div className="flex-1">
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#7A666A]">
                {item.title}
              </h3>
              <p className="text-xs text-[#8E7479] font-sans mt-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
