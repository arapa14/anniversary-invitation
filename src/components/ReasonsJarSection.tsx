import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RefreshCw, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { playPopSound, playChimeSound } from '../utils/soundEffects';

interface ReasonsJarSectionProps {
  reasons: string[];
}

export const ReasonsJarSection: React.FC<ReasonsJarSectionProps> = ({ reasons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [openedReasons, setOpenedReasons] = useState<number[]>([0]);

  const handleShake = () => {
    if (isShaking) return;
    setIsShaking(true);
    playPopSound();

    setTimeout(() => {
      setIsShaking(false);
      const nextIndex = Math.floor(Math.random() * reasons.length);
      setCurrentIndex(nextIndex);
      playChimeSound();
      if (!openedReasons.includes(nextIndex)) {
        setOpenedReasons((prev) => [...prev, nextIndex]);
      }
    }, 600);
  };

  const handlePrev = () => {
    playPopSound();
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const handleNext = () => {
    playPopSound();
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  return (
    <section
      id="reasons"
      className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-3xl w-full mx-auto z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E5F6FE] text-xs uppercase tracking-widest text-[#334E68] shadow-xs mb-3">
            <Gift size={13} className="text-[#89CFF1]" />
            <span>Jar of Gratitude</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#243B53] tracking-tight mb-2">
            Reasons I'm Grateful for You
          </h2>
          <p className="text-xs sm:text-sm text-[#627D98] font-light">
            Guncang toples cinta ini untuk membuka alasan-alasan mengapa kamu begitu berharga 💖
          </p>
        </motion.div>

        {/* Interactive Jar & Note Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Glass Jar Visual */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              animate={
                isShaking
                  ? {
                      rotate: [-8, 8, -6, 6, -3, 3, 0],
                      y: [-5, 5, -4, 4, 0],
                    }
                  : { y: [0, -6, 0] }
              }
              transition={
                isShaking
                  ? { duration: 0.6 }
                  : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
              }
              onClick={handleShake}
              className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-b-[40px] rounded-t-2xl bg-white/70 backdrop-blur-md border-2 border-white shadow-[0_20px_50px_rgba(137,207,241,0.25),inset_0_0_30px_rgba(137,207,241,0.15)] p-4 flex flex-col items-center justify-end cursor-pointer group"
            >
              {/* Jar Lid */}
              <div className="absolute -top-4 w-32 sm:w-36 h-8 bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB] rounded-lg border border-white shadow-sm flex items-center justify-center">
                <div className="w-16 h-1 bg-white/60 rounded-full" />
              </div>

              {/* Floating Love Origami / Notes inside jar */}
              <div className="relative w-full h-44 flex flex-wrap items-end justify-center gap-2 pb-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -4, 0],
                      rotate: [(i * 30) % 360, (i * 30 + 10) % 360, (i * 30) % 360],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5 + (i % 3),
                      ease: 'easeInOut',
                    }}
                    className="text-lg sm:text-xl drop-shadow-xs select-none"
                  >
                    {i % 3 === 0 ? '💌' : i % 3 === 1 ? '💖' : '🌸'}
                  </motion.span>
                ))}
              </div>

              {/* Jar Tag */}
              <div className="w-full py-1.5 rounded-lg bg-white/90 border border-[#E5F6FE] text-[10px] text-[#334E68] uppercase tracking-widest text-center font-medium shadow-xs">
                Toples Kasih ({openedReasons.length}/{reasons.length})
              </div>
            </motion.div>

            {/* Shake Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleShake}
              className="mt-6 px-7 py-3 rounded-full btn-sea-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={14} className={isShaking ? 'animate-spin' : ''} />
              <span>Guncang Toples 🫙</span>
            </motion.button>
          </div>

          {/* Unfolded Love Note Card */}
          <div className="md:col-span-7 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white/90 backdrop-blur-2xl border border-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(137,207,241,0.2)] relative overflow-hidden"
              >
                {/* Note Header */}
                <div className="flex items-center justify-between border-b border-[#E5F6FE] pb-4 mb-4">
                  <div className="flex items-center gap-2 text-[#4895BE]">
                    <Heart size={16} className="fill-[#FEBDBB] text-[#FEBDBB]" />
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#334E68]">
                      Reason #{currentIndex + 1} of {reasons.length}
                    </span>
                  </div>
                  <Sparkles size={16} className="text-[#89CFF1]" />
                </div>

                {/* Reason Text */}
                <div className="my-6 min-h-[90px] flex items-center">
                  <p className="font-garamond italic text-xl sm:text-2xl md:text-3xl text-[#243B53] leading-relaxed">
                    "{reasons[currentIndex]}"
                  </p>
                </div>

                {/* Note Navigation Footer */}
                <div className="pt-4 border-t border-[#E5F6FE] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2.5 rounded-full btn-sea-outline text-[#102A43] cursor-pointer"
                    aria-label="Previous Reason"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span className="text-xs text-[#627D98] font-medium font-sans">
                    Sentuhan Kasih ke-{currentIndex + 1}
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2.5 rounded-full btn-sea-outline text-[#102A43] cursor-pointer"
                    aria-label="Next Reason"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
