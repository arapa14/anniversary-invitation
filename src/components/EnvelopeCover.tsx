import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  MailOpen,
  Sparkles,
  Heart,
  Volume2,
  Calendar,
  MapPin,
  Crown,
  Clock,
  HeartHandshake,
  Flame,
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

    // Launch multi-cannons grand celebratory confetti
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#D4A96A', '#FFE58F', '#FFC1CC', '#FCE4E9', '#E598A8', '#FFFFFF', '#C05C74'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 75,
        origin: { x: 0.08, y: 0.65 },
        colors: ['#D4A96A', '#FFC1CC', '#E598A8', '#FFE58F', '#FFF'],
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 75,
        origin: { x: 0.92, y: 0.65 },
        colors: ['#D4A96A', '#FFC1CC', '#E598A8', '#FFE58F', '#FFF'],
      });
    }, 180);

    setTimeout(() => {
      onOpenInvitation();
    }, 850);
  };

  const handleSaveGuestName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempGuestName.trim() && onChangeGuestName) {
      onChangeGuestName(tempGuestName.trim());
    }
    setIsEditingGuest(false);
  };

  return (
    <div className="fixed inset-0 z-50 h-[100dvh] w-full flex flex-col justify-between items-center overflow-hidden select-none bg-[#1A0F14]">
      {/* Background Image with Romantic Ambient Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop"
          alt="10th Wedding Anniversary Backdrop"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105"
        />
        {/* Cinematic multi-stop gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C0B14]/85 via-[#2A101C]/75 to-[#12040A]/95 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#1A0710]/40 to-[#0F0208]/90" />
      </div>

      {/* Floating Animated Light Glows & Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-1/6 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-[#FFE58F]/30 via-[#FFC1CC]/20 to-transparent rounded-full blur-3xl pointer-events-none"
        />

        {/* Ambient floating sparkle particles */}
        <motion.div
          animate={{ y: [-8, 10, -8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-8 left-[8%] text-[#FFE58F]"
        >
          <Sparkles size={16} />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.25, 0.75, 0.25] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-16 right-[10%] text-[#FFB8C6]"
        >
          <Sparkles size={14} />
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-24 left-[10%] text-[#D4A96A]"
        >
          <Sparkles size={15} />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-16 right-[12%] text-[#FCE4E9]"
        >
          <Heart size={14} className="fill-[#FFB8C6]/40" />
        </motion.div>
      </div>

      {/* Decorative Golden Floral Bouquets at the 4 screen corners - cleanly scaled for mobile */}
      <LuxuryBouquetCorner position="top-left" className="absolute -top-2 -left-2 w-16 h-16 sm:w-28 sm:h-28 opacity-75 z-2 pointer-events-none drop-shadow-sm" />
      <LuxuryBouquetCorner position="top-right" className="absolute -top-2 -right-2 w-16 h-16 sm:w-28 sm:h-28 opacity-75 z-2 pointer-events-none drop-shadow-sm" />
      <LuxuryBouquetCorner position="bottom-left" className="absolute -bottom-2 -left-2 w-16 h-16 sm:w-28 sm:h-28 opacity-75 z-2 pointer-events-none drop-shadow-sm" />
      <LuxuryBouquetCorner position="bottom-right" className="absolute -bottom-2 -right-2 w-16 h-16 sm:w-28 sm:h-28 opacity-75 z-2 pointer-events-none drop-shadow-sm" />

      {/* Main Content Layer - Mobile-First Layout Optimized with Strict No Overflow */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md h-full max-h-[100dvh] mx-auto px-4 py-3 sm:py-5 flex flex-col justify-between items-center text-center overflow-hidden">
        
        {/* TOP SECTION: 10th Anniversary Milestone Pill */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center pt-0.5"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#D4A96A]/80 shadow-[0_0_12px_rgba(212,169,106,0.35)] mb-1">
            <Sparkles size={10} className="text-[#FFE58F] animate-spin-slow shrink-0" />
            <span className="font-serif uppercase tracking-[0.2em] text-[9px] sm:text-[11px] font-bold text-[#FFE58F]">
              THE 10TH WEDDING ANNIVERSARY
            </span>
            <Sparkles size={10} className="text-[#FFE58F] animate-spin-slow shrink-0" />
          </div>

          <p className="font-serif uppercase tracking-[0.22em] text-[9.5px] sm:text-[10.5px] text-[#FCE4E9]/90 font-medium">
            Perayaan Ulang Tahun Pernikahan
          </p>

          <div className="flex items-center gap-2 my-0.5">
            <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent" />
            <span className="font-serif italic text-[10.5px] sm:text-xs text-[#FFE58F] tracking-widest font-light">
              2015 &bull; 2025/2026
            </span>
            <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent" />
          </div>
        </motion.div>

        {/* CENTER SECTION: Couple Cameo Portrait, Names & Theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto py-1 sm:py-2 flex flex-col items-center w-full"
        >
          {/* Framed Portrait Cameo */}
          <div className="relative mb-2 group">
            {/* Outer Subtle Pulse */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4A96A]/60 via-[#E598A8]/40 to-[#FFE58F]/60 rounded-full blur-md opacity-80 animate-pulse" />
            
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#FFE58F] via-[#D4A96A] to-[#E598A8] shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/85 relative">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop"
                  alt="Daniel & Ashley 10th Anniversary"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Wax Seal 10th Badge */}
              <div className="absolute -bottom-1 -right-0.5 z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                <WaxSealBadge text="10th" size="sm" variant="gold" />
              </div>
            </div>
          </div>

          {/* Couple Names Display */}
          <h1 className="font-serif text-2xl sm:text-4xl text-white font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-tight">
            {INVITATION_DATA.couple.husband.shortName}{' '}
            <span className="font-script text-[#FFE58F] text-3xl sm:text-5xl font-light mx-1 inline-block transform hover:scale-110 transition-transform">
              &amp;
            </span>{' '}
            {INVITATION_DATA.couple.wife.shortName}
          </h1>

          {/* 10-Year Anniversary Theme */}
          <div className="mt-1 mb-2 px-2">
            <p className="font-serif italic text-[11px] sm:text-xs text-[#FCE4E9] font-light leading-snug drop-shadow-md">
              &ldquo;{INVITATION_DATA.couple.anniversaryTheme}&rdquo;
            </p>
            <p className="font-sans text-[9px] sm:text-[10px] text-[#FFE58F]/95 uppercase tracking-[0.16em] font-semibold mt-0.5">
              1 Dekade Kasih &amp; Kebersamaan Abadi
            </p>
          </div>

          {/* Date & Location Pill */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-white/95 font-sans">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-[#D4A96A]/50 shadow-sm">
              <Calendar size={10} className="text-[#FFE58F]" />
              <span className="font-medium">{INVITATION_DATA.couple.celebrationDisplayDate}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-[#D4A96A]/50 shadow-sm">
              <MapPin size={10} className="text-[#FFE58F]" />
              <span className="font-medium truncate max-w-[140px] sm:max-w-none">
                The Glasshouse Jakarta
              </span>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM SECTION: VIP Recipient Plaque & Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="w-full pb-1"
        >
          {/* Personalized VIP Guest Plaque */}
          <div className="mb-2 p-2.5 rounded-2xl bg-black/55 backdrop-blur-lg border border-[#D4A96A]/50 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-center gap-1 text-[9px] text-[#FFE58F] tracking-[0.18em] uppercase font-sans font-bold">
              <Sparkles size={9} className="text-[#FFE58F]" />
              <span>Kepada Yth. Tamu Kehormatan</span>
              <Sparkles size={9} className="text-[#FFE58F]" />
            </div>

            {!isEditingGuest ? (
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <h3 className="font-serif text-sm sm:text-base font-bold text-white capitalize tracking-wide drop-shadow-sm truncate max-w-[220px]">
                  {guestName || 'Tamu Undangan Yang Terhormat'}
                </h3>
                {onChangeGuestName && (
                  <button
                    onClick={() => {
                      setTempGuestName(guestName);
                      setIsEditingGuest(true);
                    }}
                    className="text-[10px] text-[#FFE58F] hover:text-white font-sans font-bold underline cursor-pointer shrink-0"
                    title="Ubah nama tamu"
                  >
                    (Ubah)
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSaveGuestName} className="mt-1 flex gap-1 max-w-xs mx-auto">
                <input
                  type="text"
                  value={tempGuestName}
                  onChange={(e) => setTempGuestName(e.target.value)}
                  placeholder="Ketik Nama Tamu..."
                  className="flex-1 px-2.5 py-1 rounded-xl text-[11px] bg-white/95 border-2 border-[#D4A96A] text-[#7A666A] focus:outline-none shadow-inner"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-gradient-to-r from-[#D4A96A] to-[#C05C74] text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Simpan
                </button>
              </form>
            )}

            <p className="text-[9.5px] text-[#FCE4E9]/85 font-sans mt-0.5 leading-tight">
              Turut mengundang ke Perayaan 10th Wedding Anniversary
            </p>
          </div>

          {/* EYE-CATCHING PRIMARY CTA BUTTON */}
          <div className="relative group">
            {/* Outer Pulsing Glow Aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFE58F] via-[#D4A96A] to-[#E598A8] rounded-full blur-md opacity-80 group-hover:opacity-100 animate-pulse transition duration-500" />
            
            <motion.button
              id="btn-open-anniversary-invitation"
              onClick={handleOpen}
              disabled={isOpening}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#D4A96A] via-[#C05C74] to-[#8E3B50] text-white font-sans text-[11px] sm:text-xs uppercase tracking-[0.16em] font-bold shadow-[0_8px_25px_rgba(212,169,106,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer overflow-hidden border border-[#FFE58F]/50"
            >
              {/* Shimmer light sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
              
              <Sparkles size={15} className="animate-spin-slow text-[#FFE58F] shrink-0" />
              <span className="font-bold tracking-wider truncate">
                {isOpening ? 'Membuka Undangan...' : 'Buka Undangan Anniversary'}
              </span>
              <MailOpen size={15} className="animate-bounce shrink-0" />
            </motion.button>
          </div>

          {/* Ambient Music Notice */}
          <div className="flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10.5px] text-[#FCE4E9]/85 font-sans pt-1">
            <Volume2 size={12} className="text-[#FFE58F] animate-pulse shrink-0" />
            <span className="font-medium">
              Dilengkapi Musik Romantis &amp; Rundown Acara
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};


