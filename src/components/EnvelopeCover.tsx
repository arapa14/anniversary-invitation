import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Calendar,
  Edit2,
  Check,
  BookOpen,
} from 'lucide-react';
import { GrandFloralArch, LuxuryBouquetCorner, WaxSealBadge } from './FloralDecorations';
import { INVITATION_DATA } from '../data/invitationData';

interface EnvelopeCoverProps {
  guestName: string;
  onOpenInvitation: () => void;
  onChangeGuestName?: (name: string) => void;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  guestName,
  onOpenInvitation,
  onChangeGuestName,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [tempGuestName, setTempGuestName] = useState(guestName);

  const handleOpen = () => {
    setIsOpening(true);

    // Launch soft Sea Pastel celebratory confetti
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#89CFF1', '#B8EBFF', '#E5F6FE', '#FFDDDC', '#FFCCCB', '#FEBDBB', '#FFFFFF'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#89CFF1', '#B8EBFF', '#FFDDDC', '#FEBDBB', '#FFF'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#89CFF1', '#B8EBFF', '#FFDDDC', '#FEBDBB', '#FFF'],
      });
    }, 180);

    setTimeout(() => {
      onOpenInvitation();
    }, 750);
  };

  const handleSaveGuestName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempGuestName.trim() && onChangeGuestName) {
      onChangeGuestName(tempGuestName.trim());
    }
    setIsEditingGuest(false);
  };

  return (
    <div className="fixed inset-0 z-50 h-[100dvh] w-full flex flex-col justify-between items-center overflow-hidden select-none bg-gradient-to-b from-[#E5F6FE] via-[#F4FAFD] to-[#FFDDDC]/40 text-[#334E68]">
      {/* Background Soft Ambient Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft dreamy background photo with gentle pastel tint */}
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop"
          alt="10th Wedding Anniversary"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[0.95] opacity-25"
        />
        
        {/* Soft Sea Pastel Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E5F6FE]/90 via-[#F4FAFD]/85 to-[#FFDDDC]/50 backdrop-blur-[1px]" />
        
        {/* Soft Radial Ambient Lights */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#B8EBFF]/40 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#FEBDBB]/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E5F6FE]/60 blur-3xl" />
      </div>

      {/* Floating Gentle Petal Particles */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: -20,
              x: `${15 + i * 15}%`,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: '105vh',
              x: `${15 + i * 15 + (i % 2 === 0 ? 10 : -10)}%`,
              opacity: [0, 0.6, 0.7, 0],
              rotate: 360,
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
            className="absolute top-0 w-3 h-3 rounded-full opacity-60"
            style={{
              background: i % 2 === 0 ? '#B8EBFF' : '#FFDDDC',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Corner Soft Botanical Accents */}
      <LuxuryBouquetCorner
        position="top-left"
        className="absolute top-1 left-1 w-28 sm:w-36 h-28 sm:h-36 z-10 opacity-70"
      />
      <LuxuryBouquetCorner
        position="top-right"
        className="absolute top-1 right-1 w-28 sm:w-36 h-28 sm:h-36 z-10 opacity-70"
      />
      <LuxuryBouquetCorner
        position="bottom-left"
        className="absolute bottom-1 left-1 w-28 sm:w-36 h-28 sm:h-36 z-10 opacity-70"
      />
      <LuxuryBouquetCorner
        position="bottom-right"
        className="absolute bottom-1 right-1 w-28 sm:w-36 h-28 sm:h-36 z-10 opacity-70"
      />

      {/* TOP HEADER: Badge & Decade Marker */}
      <header className="relative z-20 pt-5 sm:pt-7 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#89CFF1]/40 shadow-xs backdrop-blur-xs"
        >
          <Sparkles size={12} className="text-[#89CFF1]" />
          <span className="font-serif text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#334E68]">
            10th Wedding Anniversary
          </span>
          <Sparkles size={12} className="text-[#FEBDBB]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-[10px] sm:text-[11px] text-[#627D98] tracking-widest uppercase mt-1.5 font-medium"
        >
          A Decade of Serenity &amp; Love • 2015 - 2026
        </motion.p>
      </header>

      {/* CENTER: Main Card Content */}
      <main className="relative z-20 w-full max-w-sm sm:max-w-md px-4 flex flex-col items-center text-center my-auto py-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#B8EBFF]/60 shadow-[0_10px_35px_rgba(137,207,241,0.22)] relative overflow-hidden"
        >
          {/* Subtle floral arch inside card */}
          <GrandFloralArch className="opacity-70 mb-1" />

          {/* Cameo Wax Seal */}
          <div className="my-2">
            <WaxSealBadge text="10th" size="md" variant="sea" className="mx-auto" />
          </div>

          {/* Greeting Eyebrow */}
          <p className="font-sans text-[11px] sm:text-xs text-[#627D98] tracking-wider uppercase font-semibold mt-1">
            Surat Kasih &amp; Kenangan 10 Tahun
          </p>

          {/* Couple Names */}
          <h1 className="font-script text-4xl sm:text-5xl text-[#334E68] font-normal leading-tight my-1.5 drop-shadow-xs">
            {INVITATION_DATA.couple.husband.shortName} <span className="text-[#FEBDBB] font-serif text-3xl sm:text-4xl">&amp;</span> {INVITATION_DATA.couple.wife.shortName}
          </h1>

          {/* Decade Subtext */}
          <p className="font-serif italic text-xs sm:text-[13px] text-[#627D98] max-w-xs mx-auto leading-relaxed mt-1 mb-4">
            &ldquo;Satu dekade merajut kasih, doa, dan kesetiaan bersamamu.&rdquo;
          </p>

          {/* Recipient / Dedication Box */}
          <div className="w-full bg-gradient-to-r from-[#E5F6FE]/70 via-[#F4FAFD] to-[#FFDDDC]/50 rounded-xl p-3.5 border border-[#89CFF1]/30 my-2 text-center">
            <p className="text-[10px] sm:text-[11px] font-sans font-medium text-[#627D98] uppercase tracking-wider mb-0.5">
              Dipersembahkan Khusus Untuk:
            </p>

            {isEditingGuest ? (
              <form onSubmit={handleSaveGuestName} className="flex items-center justify-center gap-1.5 mt-1.5">
                <input
                  type="text"
                  value={tempGuestName}
                  onChange={(e) => setTempGuestName(e.target.value)}
                  placeholder="Ketik nama panggilan sayang..."
                  className="px-3 py-1 text-xs sm:text-sm bg-white rounded-lg border border-[#89CFF1] text-[#334E68] focus:outline-none focus:ring-2 focus:ring-[#89CFF1] w-full max-w-[220px] text-center"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-1.5 bg-[#89CFF1] text-[#243B53] rounded-lg hover:bg-[#B8EBFF] transition-colors cursor-pointer"
                  title="Simpan Nama"
                >
                  <Check size={14} />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <h2 className="font-serif text-sm sm:text-base font-bold text-[#334E68] tracking-wide">
                  {guestName}
                </h2>
                {onChangeGuestName && (
                  <button
                    onClick={() => setIsEditingGuest(true)}
                    className="p-1 text-[#89CFF1] hover:text-[#334E68] transition-colors cursor-pointer"
                    title="Ubah Nama Panggilan"
                  >
                    <Edit2 size={12} />
                  </button>
                )}
              </div>
            )}
            <p className="text-[9.5px] font-sans text-[#627D98] mt-1">
              Dari Suamimu Tercinta — Daniel
            </p>
          </div>

          {/* Action Open Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpen}
            disabled={isOpening}
            className="w-full mt-4 py-3 px-5 rounded-xl bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB] text-[#243B53] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(137,207,241,0.35)] hover:shadow-[0_6px_20px_rgba(137,207,241,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isOpening ? (
              <>
                <Sparkles size={16} className="animate-spin" />
                <span>Membuka Surat Kasih...</span>
              </>
            ) : (
              <>
                <BookOpen size={16} className="text-[#334E68]" />
                <span>Buka Surat Kasih &amp; Kenangan</span>
                <Heart size={14} className="fill-[#FEBDBB] text-[#334E68]" />
              </>
            )}
          </motion.button>
        </motion.div>
      </main>

      {/* BOTTOM FOOTER: Clean, peaceful tribute note */}
      <footer className="relative z-20 pb-5 sm:pb-6 text-center px-4">
        <p className="text-[10.5px] sm:text-[11.5px] font-sans text-[#627D98] font-medium tracking-wide">
          24 Oktober 2015 — 2026 • Daniel &amp; Ashley
        </p>
      </footer>
    </div>
  );
};
