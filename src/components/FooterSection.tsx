import React from 'react';
import { ChevronUp, Share2, Heart, Sparkles } from 'lucide-react';
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
    <footer className="relative pt-14 pb-28 px-3 sm:px-6 text-center overflow-hidden border-t border-[#B8EBFF]/60 bg-gradient-to-b from-white via-[#E5F6FE]/40 to-[#FFDDDC]/30">
      <LuxuryBouquetCorner position="bottom-left" className="absolute bottom-0 left-0 w-28 h-28 opacity-70" />
      <LuxuryBouquetCorner position="bottom-right" className="absolute bottom-0 right-0 w-28 h-28 opacity-70" />

      <div className="max-w-md sm:max-w-xl mx-auto relative z-10">
        <WaxSealBadge text="10th" size="md" variant="sea" className="mx-auto mb-3" />

        <h3 className="font-script text-4xl sm:text-5xl text-[#334E68] mb-2 font-normal">
          {INVITATION_DATA.couple.husband.shortName} <span className="text-[#FEBDBB] font-serif text-3xl sm:text-4xl">&amp;</span> {INVITATION_DATA.couple.wife.shortName}
        </h3>

        <p className="font-serif italic text-xs sm:text-sm text-[#627D98] max-w-sm mx-auto mb-4 leading-relaxed">
          &ldquo;Untuk istriku tercinta Ashley, terima kasih atas 10 tahun pernikahan yang penuh kedamaian, kebahagiaan, dan keberkahan. Aku mencintaimu selalu.&rdquo;
        </p>

        <GrandGoldDivider />

        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[11px] font-sans font-semibold text-[#89CFF1] tracking-[0.2em] uppercase my-3">
          <span>#UntukIstrikuAshley</span>
          <span>•</span>
          <span>#10TahunCintaBersamamu</span>
        </div>

        {/* Share & Scroll to Top Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={onOpenGuestModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB] text-[#243B53] text-xs font-sans uppercase tracking-wider font-bold shadow-xs hover:brightness-105 transition-all cursor-pointer"
          >
            <Share2 size={14} />
            <span>Bagikan Kartu Kasih Ini</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-[#334E68] border border-[#89CFF1]/50 text-xs font-sans uppercase tracking-wider font-semibold shadow-xs hover:bg-[#E5F6FE] transition-all cursor-pointer"
          >
            <ChevronUp size={14} className="text-[#89CFF1]" />
            <span>Kembali ke Atas</span>
          </button>
        </div>

        <p className="text-[10px] font-sans text-[#627D98] mt-8">
          Surat Kasih 10 Tahun Pernikahan • Daniel untuk Ashley (2015 — 2026)
        </p>
      </div>
    </footer>
  );
};

