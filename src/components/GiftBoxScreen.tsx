import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playGiftOpenSound } from '../utils/soundEffects';

interface GiftBoxScreenProps {
  recipientName: string;
  onUnwrapped: () => void;
}

export const GiftBoxScreen: React.FC<GiftBoxScreenProps> = ({
  recipientName,
  onUnwrapped,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    playGiftOpenSound();

    // Transition after unwrap explosion finishes
    setTimeout(() => {
      onUnwrapped();
    }, 1300);
  };

  return (
    <div
      id="giftbox-screen"
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-br from-[#F4FAFD] via-[#E5F6FE] to-[#FFDDDC] text-[#243B53] overflow-hidden select-none"
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm sm:text-base text-[#334E68] tracking-widest uppercase font-medium mb-8 sm:mb-12 z-10 text-center px-4"
      >
        Ketuk kado untuk membuka kejutan 🎁
      </motion.p>

      {/* 3D Interactive Gift Box Container */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-pointer">
        <motion.div
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            isOpen
              ? {
                  scale: [1, 1.1, 0.95],
                  rotate: [0, -3, 3, 0],
                }
              : {
                  y: [0, -8, 0],
                }
          }
          transition={
            isOpen
              ? { duration: 0.6 }
              : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
          }
          className="relative w-48 h-48 sm:w-56 sm:h-56 flex flex-col items-center justify-end"
        >
          {/* Ambient Glow behind box */}
          <div className="absolute inset-0 bg-[#89CFF1]/30 blur-3xl rounded-full pointer-events-none" />

          {/* Lid of the Gift Box */}
          <motion.div
            animate={
              isOpen
                ? {
                    y: -140,
                    x: 60,
                    rotate: 35,
                    opacity: [1, 0.8, 0],
                    scale: 1.2,
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-20 w-52 sm:w-60 h-14 bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#89CFF1] rounded-xl border border-white/80 shadow-[0_8px_25px_rgba(137,207,241,0.4)] flex items-center justify-center"
          >
            {/* Top Ribbon & Bow */}
            <div className="absolute -top-7 sm:-top-8 w-14 h-14 text-4xl sm:text-5xl drop-shadow-[0_0_15px_rgba(255,204,203,0.8)] flex items-center justify-center">
              🎀
            </div>
            <div className="w-8 h-full bg-gradient-to-b from-[#FFDDDC] via-[#FFCCCB] to-[#FEBDBB] shadow-[0_0_12px_rgba(254,189,187,0.5)]" />
          </motion.div>

          {/* Body of the Gift Box */}
          <div className="relative z-10 w-44 sm:w-52 h-36 sm:h-40 bg-gradient-to-b from-[#62B7DE] via-[#7BBEE3] to-[#4895BE] rounded-b-2xl border-x border-b border-white/40 shadow-[0_20px_45px_rgba(72,149,190,0.35)] flex justify-center overflow-hidden">
            {/* Vertical Ribbon */}
            <div className="w-8 h-full bg-gradient-to-b from-[#FFDDDC] via-[#FFCCCB] to-[#FEBDBB] shadow-[0_0_12px_rgba(254,189,187,0.4)]" />

            {/* Horizontal Ribbon Line */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-gradient-to-r from-[#FFDDDC] via-[#FFCCCB] to-[#FEBDBB] shadow-[0_0_12px_rgba(254,189,187,0.4)]" />

            {/* Sparkle badge on box */}
            <div className="absolute bottom-3 text-xs font-serif italic text-white/90 drop-shadow-xs font-medium">
              Special for {recipientName}
            </div>
          </div>

          {/* Bursting particles when opening */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                {Array.from({ length: 32 }).map((_, idx) => {
                  const angle = (idx / 32) * Math.PI * 2;
                  const distance = 120 + Math.random() * 180;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance - 80;
                  const emojis = ['🌸', '✨', '💖', '🌷', '🌊', '⭐', '🌺', '🎉'];
                  const emoji = emojis[idx % emojis.length];

                  return (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.4, 0.8],
                        x,
                        y,
                        opacity: [1, 1, 0],
                        rotate: [0, (Math.random() - 0.5) * 360],
                      }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.015 }}
                      className="absolute text-2xl sm:text-3xl"
                    >
                      {emoji}
                    </motion.span>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Button to trigger opening */}
      <motion.button
        type="button"
        onClick={handleOpen}
        disabled={isOpen}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-6 px-8 py-3.5 rounded-full btn-sea-primary text-sm sm:text-base font-semibold tracking-wider flex items-center gap-2.5 cursor-pointer z-20"
      >
        <span>Buka Kado Spesial</span>
        <span className="text-lg">🎁</span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-[#627D98] tracking-wider font-light mt-4"
      >
        Sebuah kejutan manis telah menantimu ✨
      </motion.p>
    </div>
  );
};
