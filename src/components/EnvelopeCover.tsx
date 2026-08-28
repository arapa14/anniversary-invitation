import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MailOpen, Music, Sparkles, User, Heart, Volume2, Calendar, MapPin, Crown, HeartHandshake } from 'lucide-react';
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
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#D4A96A', '#FFE58F', '#FFC1CC', '#FCE4E9', '#E598A8', '#FFFFFF', '#C05C74'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.65 },
        colors: ['#D4A96A', '#FFC1CC', '#E598A8', '#FFE58F'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.65 },
        colors: ['#D4A96A', '#FFC1CC', '#E598A8', '#FFE58F'],
      });
    }, 200);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-radial from-[#FFF8FA] via-[#FFF0F3] to-[#F7DCE4] p-3 sm:p-6 overflow-y-auto select-none">
      {/* Background Animated Bokeh & Glowing Light Halos */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-1/6 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#FFE58F]/40 to-[#FFB8C6]/35 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/6 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-gradient-to-br from-[#E598A8]/30 to-[#D4A96A]/25 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating Sparkle Dust Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, 15, -10], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-12 left-[15%] text-[#D4A96A]"
        >
          <Sparkles size={20} />
        </motion.div>
        <motion.div
          animate={{ y: [15, -10, 15], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-28 right-[18%] text-[#E598A8]"
        >
          <Sparkles size={16} />
        </motion.div>
        <motion.div
          animate={{ y: [-12, 12, -12], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-24 left-[20%] text-[#D4A96A]"
        >
          <Sparkles size={18} />
        </motion.div>
        <motion.div
          animate={{ y: [10, -15, 10], opacity: [0.4, 0.85, 0.4] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-20 right-[15%] text-[#C05C74]"
        >
          <Heart size={16} className="fill-[#FFB8C6]/40" />
        </motion.div>
      </div>

      {/* Lavish Decorative Bouquets in All 4 Corners */}
      <LuxuryBouquetCorner position="top-left" className="absolute -top-3 -left-3 w-32 h-32 sm:w-48 sm:h-48 opacity-90 drop-shadow-sm" />
      <LuxuryBouquetCorner position="top-right" className="absolute -top-3 -right-3 w-32 h-32 sm:w-48 sm:h-48 opacity-90 drop-shadow-sm" />
      <LuxuryBouquetCorner position="bottom-left" className="absolute -bottom-3 -left-3 w-32 h-32 sm:w-48 sm:h-48 opacity-90 drop-shadow-sm" />
      <LuxuryBouquetCorner position="bottom-right" className="absolute -bottom-3 -right-3 w-32 h-32 sm:w-48 sm:h-48 opacity-90 drop-shadow-sm" />

      {/* Outer Glow Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md mx-auto my-auto text-center"
      >
        {/* Double Gold-Trimmed Luxury Glass Card */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.25rem] p-5 sm:p-7 border-2 border-[#D4A96A]/60 shadow-[0_25px_70px_rgba(212,169,106,0.35)] overflow-hidden">
          
          {/* Inner Golden Hairline Inset Border */}
          <div className="absolute inset-2.5 rounded-[1.75rem] border border-[#D4A96A]/25 pointer-events-none" />

          {/* Top Grand Floral Arch with Ambient Shimmer */}
          <div className="relative">
            <GrandFloralArch className="w-full mb-0.5" />
          </div>

          {/* Golden Celebration Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF0D6] via-[#FCE4E9] to-[#FFF0D6] border border-[#D4A96A]/70 shadow-[0_2px_12px_rgba(212,169,106,0.25)] mb-2"
          >
            <Sparkles size={13} className="text-[#D4A96A] animate-spin-slow" />
            <span className="font-serif uppercase tracking-[0.25em] text-[10px] sm:text-[11px] font-bold text-[#8E7479]">
              THE 10TH WEDDING ANNIVERSARY
            </span>
            <Sparkles size={13} className="text-[#D4A96A] animate-spin-slow" />
          </motion.div>

          {/* Subtitle Heading */}
          <p className="font-serif italic text-base sm:text-lg text-[#8E7479] font-light">
            Undangan Perayaan Syukur &amp; Cinta
          </p>

          {/* Couple Names Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="my-2"
          >
            <h1 className="font-serif text-3xl sm:text-5xl text-[#C05C74] font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(192,92,116,0.15)] leading-tight">
              {INVITATION_DATA.couple.husband.shortName}{' '}
              <span className="font-script text-[#D4A96A] text-4xl sm:text-6xl font-light mx-1 inline-block transform hover:scale-110 transition-transform">
                &amp;
              </span>{' '}
              {INVITATION_DATA.couple.wife.shortName}
            </h1>
          </motion.div>

          <p className="font-serif italic text-xs sm:text-sm text-[#A68F94] max-w-xs mx-auto mb-3">
            &ldquo;{INVITATION_DATA.couple.anniversaryTheme}&rdquo;
          </p>

          {/* Interactive 3D Celebratory Envelope Centerpiece */}
          <div className="relative mx-auto my-3.5 w-full max-w-[270px] h-[165px] bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F3] to-[#FCE4E9] rounded-2xl border-2 border-[#D4A96A]/50 shadow-[0_10px_25px_rgba(212,169,106,0.2)] flex items-center justify-center overflow-hidden group">
            
            {/* Envelope flap folded */}
            <motion.div
              animate={isOpening ? { rotateX: 180, y: -50, opacity: 0 } : { rotateX: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              className="absolute top-0 inset-x-0 h-20 origin-top bg-gradient-to-b from-[#FAD1DB] via-[#FCE4E9] to-[#FAD1DB] shadow-md z-10 border-b border-[#D4A96A]/30"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Inner Gold-Edged Letter Card Preview */}
            <motion.div
              animate={isOpening ? { y: -20, scale: 1.05 } : { y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-[88%] h-[80%] bg-white rounded-xl border border-[#D4A96A]/50 shadow-sm p-2.5 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              {/* Inner Decorative Card Trim */}
              <div className="absolute inset-1 rounded-lg border border-[#D4A96A]/20 pointer-events-none" />

              <div className="flex items-center gap-1 text-[9px] tracking-[0.25em] uppercase font-sans text-[#D4A96A] font-bold">
                <Crown size={11} className="text-[#D4A96A]" />
                <span>SAVE THE DATE</span>
                <Crown size={11} className="text-[#D4A96A]" />
              </div>
              <p className="font-serif text-sm sm:text-base text-[#7A666A] font-bold my-1">
                {INVITATION_DATA.couple.celebrationDisplayDate}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-[#A68F94] font-sans">
                <MapPin size={11} className="text-[#E598A8]" />
                <span>{INVITATION_DATA.couple.venueName}</span>
              </div>
            </motion.div>

            {/* Wax Seal with Gold Halo & Interactive Glow */}
            <AnimatePresence>
              {!isOpening && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{
                    scale: [1, 1.08, 1],
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute z-20 cursor-pointer drop-shadow-[0_8px_20px_rgba(212,169,106,0.6)]"
                  onClick={handleOpen}
                >
                  <WaxSealBadge text="10th" size="md" variant="gold" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Envelope Bottom Triangle */}
            <div
              className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#FAD1DB]/85 to-transparent pointer-events-none"
              style={{
                clipPath: 'polygon(0 100%, 100% 100%, 50% 20%)',
              }}
            />
          </div>

          {/* VIP Recipient Personalization Plaque */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-3 mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF9FA] via-[#FFF3F6] to-[#FFF9FA] border-2 border-[#D4A96A]/40 shadow-[0_4px_15px_rgba(212,169,106,0.12)] relative"
          >
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8E7479] tracking-[0.2em] uppercase font-sans font-bold">
              <Sparkles size={11} className="text-[#D4A96A]" />
              <span>Kepada Yth. Tamu Kehormatan</span>
              <Sparkles size={11} className="text-[#D4A96A]" />
            </div>
            
            {!isEditingGuest ? (
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#C05C74] capitalize tracking-wide drop-shadow-2xs">
                  {guestName || 'Tamu Undangan Yang Terhormat'}
                </h3>
                {onChangeGuestName && (
                  <button
                    onClick={() => {
                      setTempGuestName(guestName);
                      setIsEditingGuest(true);
                    }}
                    className="text-[10px] text-[#D4A96A] hover:text-[#8E7479] font-sans font-bold underline cursor-pointer ml-1"
                    title="Ubah nama tamu"
                  >
                    (Ubah)
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSaveGuestName} className="mt-2 flex gap-1.5 max-w-xs mx-auto">
                <input
                  type="text"
                  value={tempGuestName}
                  onChange={(e) => setTempGuestName(e.target.value)}
                  placeholder="Ketik Nama Tamu..."
                  className="flex-1 px-3.5 py-1.5 rounded-xl text-xs bg-white border-2 border-[#D4A96A] text-[#7A666A] focus:outline-none shadow-inner"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#D4A96A] to-[#C05C74] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Simpan
                </button>
              </form>
            )}

            <p className="text-[10px] text-[#A68F94] font-sans mt-1">
              Merupakan suatu kehormatan &amp; kebahagiaan atas kehadiran Anda
            </p>
          </motion.div>

          {/* ULTRA EYE-CATCHING PRIMARY CALL TO ACTION (CTA) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2.5"
          >
            <div className="relative group">
              {/* Outer Pulsing Glow Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A96A] via-[#E598A8] to-[#C05C74] rounded-full blur-md opacity-75 group-hover:opacity-100 animate-pulse transition duration-500" />
              
              <motion.button
                id="btn-open-invitation-cta"
                onClick={handleOpen}
                disabled={isOpening}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#D4A96A] via-[#C05C74] to-[#8E3B50] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-bold shadow-[0_12px_35px_rgba(192,92,116,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden"
              >
                {/* Shimmer light sweep */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                
                <Sparkles size={18} className="animate-spin-slow text-[#FFE58F]" />
                <span className="font-bold tracking-wider">
                  {isOpening ? 'Membuka Undangan...' : 'Buka Undangan Pernikahan'}
                </span>
                <MailOpen size={18} className="animate-bounce" />
              </motion.button>
            </div>

            {/* Ambient Music & Feature Notice */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8E7479] font-sans pt-1">
              <Volume2 size={14} className="text-[#D4A96A] animate-pulse shrink-0" />
              <span className="font-medium">
                Dilengkapi Musik Romantis &amp; Konfirmasi RSVP
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

