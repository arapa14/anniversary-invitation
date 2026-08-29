import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playFireworkBurstSound } from '../utils/soundEffects';

interface FireworksOverlayProps {
  recipientName: string;
  onClose: () => void;
}

export const FireworksOverlay: React.FC<FireworksOverlayProps> = ({
  recipientName,
  onClose,
}) => {
  useEffect(() => {
    // Sound effect
    playFireworkBurstSound();

    // Trigger canvas confetti bursts
    const end = Date.now() + 6 * 1000;
    const colors = ['#89CFF1', '#B8EBFF', '#E5F6FE', '#FEBDBB', '#FFDDDC', '#FFFFFF'];

    const interval: NodeJS.Timeout = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      playFireworkBurstSound();

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: colors,
        particleCount: 45,
      });
    }, 1200);

    // Initial big burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: colors,
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#102A43]/85 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer z-50 shadow-md active:scale-95"
        aria-label="Tutup Perayaan"
      >
        <X size={24} />
      </button>

      {/* Floating Celebration Card in Sea Pastel glass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 max-w-lg w-full bg-white/95 backdrop-blur-2xl border border-white rounded-3xl p-8 sm:p-10 text-center shadow-[0_25px_80px_rgba(137,207,241,0.4)]"
      >
        <div className="text-5xl sm:text-6xl mb-4 animate-bounce">
          💍
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#243B53] font-normal mb-2 tracking-tight">
          Happy Anniversary!
        </h2>

        <p className="font-serif text-2xl sm:text-3xl bg-gradient-to-r from-[#4895BE] via-[#89CFF1] to-[#FEBDBB] bg-clip-text text-transparent font-medium mb-4">
          Dearest {recipientName}
        </p>

        <p className="font-garamond italic text-base sm:text-xl text-[#334E68] leading-relaxed mb-6">
          "Semoga setiap langkah kita selalu dipenuhi kehangatan cinta, keberkahan, dan kebahagiaan yang tak pernah pudar selamanya."
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              playFireworkBurstSound();
              confetti({
                particleCount: 90,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#89CFF1', '#B8EBFF', '#FEBDBB', '#FFDDDC'],
              });
            }}
            className="px-8 py-3.5 rounded-full btn-sea-primary text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2.5 cursor-pointer shadow-[0_10px_25px_rgba(72,149,190,0.5)]"
          >
            <Sparkles size={16} className="text-white" />
            <span>Kembang Api Lagi! ✨</span>
            <Heart size={14} className="fill-white text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

