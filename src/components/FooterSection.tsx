import React from 'react';
import { ChevronUp, Share2, Sparkles, Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { GrandGoldDivider, LuxuryBouquetCorner, WaxSealBadge } from './FloralDecorations';

interface FooterSectionProps {
  onOpenGuestModal: () => void;
  onScrollToTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenGuestModal,
  onScrollToTop,
}) => {
  return (
    <footer className="relative pt-14 pb-28 px-3 sm:px-6 text-center overflow-hidden border-t-2 border-[#D4A96A]/30 bg-gradient-to-b from-[#FFF5F7] to-[#FFF0F3]">
      <LuxuryBouquetCorner position="bottom-left" className="absolute bottom-0 left-0 w-32 h-32 opacity-70" />
      <LuxuryBouquetCorner position="bottom-right" className="absolute bottom-0 right-0 w-32 h-32 opacity-70" />

      <div className="max-w-md sm:max-w-xl mx-auto relative z-10">
        <WaxSealBadge text="10th" size="md" variant="gold" className="mx-auto mb-3" />

        <h3 className="font-script text-4xl sm:text-5xl text-[#C05C74] mb-2 font-normal">
          {INVITATION_DATA.couple.husband.shortName} &amp; {INVITATION_DATA.couple.wife.shortName}
        </h3>

        <p className="font-serif italic text-xs sm:text-sm text-[#7A666A] max-w-sm mx-auto mb-4 leading-relaxed">
          &ldquo;Tiada kata yang mampu mengungkapkan rasa syukur kami selain terima kasih atas kehadiran, doa restu, dan kasih sayang Anda.&rdquo;
        </p>

        <GrandGoldDivider />

        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[11px] font-sans font-bold text-[#D4A96A] tracking-[0.25em] uppercase my-3">
          <span>#AshleyDaniel10thAnniversary</span>
          <span>•</span>
          <span>#ADecadeOfLove</span>
        </div>

        {/* Share & Scroll to Top Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={onOpenGuestModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A96A] to-[#E598A8] text-white text-xs font-sans uppercase tracking-wider font-bold shadow-md hover:brightness-105 transition-all cursor-pointer"
          >
            <Share2 size={14} />
            <span>Bagikan Undangan ke Sahabat</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-[#8E7479] border border-[#D4A96A] text-xs font-sans uppercase tracking-wider font-bold shadow-xs hover:bg-[#FFF5F7] transition-all cursor-pointer"
          >
            <ChevronUp size={14} className="text-[#D4A96A]" />
            <span>Kembali ke Atas</span>
          </button>
        </div>

        <p className="text-[10px] font-sans text-[#A68F94] mt-10">
          Undangan Digital Pernikahan &amp; Ulang Tahun Pernikahan © {new Date().getFullYear()} {INVITATION_DATA.couple.husband.shortName} &amp; {INVITATION_DATA.couple.wife.shortName}
        </p>
      </div>
    </footer>
  );
};
