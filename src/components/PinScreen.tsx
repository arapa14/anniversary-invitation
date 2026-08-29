import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playChimeSound, playPopSound } from '../utils/soundEffects';

interface PinScreenProps {
  recipientName: string;
  expectedPin: string;
  onSuccess: () => void;
}

export const PinScreen: React.FC<PinScreenProps> = ({
  recipientName,
  expectedPin,
  onSuccess,
}) => {
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const pinLength = expectedPin.length || 6;

  // Key press listener for physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleClear();
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enteredPin]);

  const handleDigit = (digit: string) => {
    if (enteredPin.length < pinLength) {
      playPopSound();
      const nextPin = enteredPin + digit;
      setEnteredPin(nextPin);
      setError(false);

      // Auto submit when reaching target length
      if (nextPin.length === pinLength) {
        verifyPin(nextPin);
      }
    }
  };

  const handleClear = () => {
    playPopSound();
    setEnteredPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleSubmit = () => {
    if (enteredPin.length === 0) return;
    verifyPin(enteredPin);
  };

  const verifyPin = (pinToTest: string) => {
    if (pinToTest === expectedPin) {
      playChimeSound();
      onSuccess();
    } else {
      setIsShaking(true);
      setError(true);
      setTimeout(() => {
        setIsShaking(false);
        setEnteredPin('');
      }, 700);
    }
  };

  return (
    <div
      id="pin-screen"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4FAFD] via-[#E5F6FE] to-[#FFDDDC] text-[#243B53] px-4 select-none"
    >
      {/* Background ambient floating glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#89CFF1]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FFCCCB]/30 blur-3xl pointer-events-none" />

      {/* Floating gentle pastel icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-xl sm:text-2xl opacity-60 animate-bounce"
            style={{
              left: `${(i * 100) / 16 + (i % 3) * 2}%`,
              top: `${(i * 37) % 90}%`,
              animationDuration: `${3.5 + (i % 4)}s`,
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
          >
            {i % 4 === 0 ? '🌊' : i % 4 === 1 ? '🌸' : i % 4 === 2 ? '✨' : '❤️'}
          </span>
        ))}
      </div>

      {/* Glassmorphic Sea Pastel PIN Card */}
      <motion.div
        animate={
          isShaking
            ? { x: [-12, 12, -10, 10, -6, 6, 0] }
            : { y: [0, -8, 0] }
        }
        transition={
          isShaking
            ? { duration: 0.6 }
            : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
        }
        className="relative z-10 w-full max-w-[390px] rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/70 p-6 sm:p-9 text-center shadow-[0_20px_50px_rgba(137,207,241,0.25),0_10px_20px_rgba(255,204,203,0.15)]"
      >
        {/* Top Flower icon */}
        <div className="text-5xl sm:text-6xl -mt-14 mb-2 drop-shadow-[0_4px_16px_rgba(137,207,241,0.5)] inline-block animate-pulse">
          🌷
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#243B53] font-normal tracking-wide drop-shadow-xs">
          For You, {recipientName}
        </h1>
        <p className="text-xs sm:text-sm text-[#627D98] font-light mt-1 mb-6">
          Masukkan kode rahasia untuk membuka kado spesialmu
        </p>

        {/* PIN Dots Indicator */}
        <div className="flex justify-center items-center gap-3 sm:gap-3.5 mb-6">
          {Array.from({ length: pinLength }).map((_, i) => {
            const isFilled = i < enteredPin.length;
            return (
              <motion.span
                key={i}
                initial={false}
                animate={{
                  scale: isFilled ? 1.15 : 1,
                  backgroundColor: isFilled ? '#89CFF1' : 'transparent',
                  borderColor: isFilled ? '#89CFF1' : '#B8EBFF',
                  boxShadow: isFilled
                    ? '0 0 15px rgba(137, 207, 241, 0.7), 0 0 25px rgba(254, 189, 187, 0.4)'
                    : 'none',
                }}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-200"
              />
            );
          })}
        </div>

        {/* 3x4 Number Keypad */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-[270px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-[#F0F9FF] hover:border-[#89CFF1] active:scale-95 active:bg-[#89CFF1] active:text-white border border-[#D9E2EC] text-xl font-medium font-sans text-[#102A43] transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_rgba(137,207,241,0.25)]"
            >
              {digit}
            </button>
          ))}

          {/* Clear Button */}
          <button
            type="button"
            onClick={handleClear}
            className="py-3 sm:py-3.5 rounded-2xl bg-[#F0F4F8] hover:bg-[#E2E8F0] hover:text-[#102A43] active:scale-95 border border-[#D9E2EC] text-sm font-semibold font-sans text-[#486581] transition-all duration-200 cursor-pointer shadow-xs"
          >
            ✕
          </button>

          {/* Zero Digit */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-[#F0F9FF] hover:border-[#89CFF1] active:scale-95 active:bg-[#89CFF1] active:text-white border border-[#D9E2EC] text-xl font-medium font-sans text-[#102A43] transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_rgba(137,207,241,0.25)]"
          >
            0
          </button>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="py-3 sm:py-3.5 rounded-2xl btn-sea-primary text-lg font-bold transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            ↩
          </button>
        </div>

        {/* User requested hint: cari tau sendiri */}
        <div className="mt-5">
          <div className="text-[11px] sm:text-xs text-[#627D98] tracking-wider bg-white/50 px-3.5 py-1.5 rounded-full border border-[#E5F6FE] inline-flex items-center gap-1.5 shadow-2xs">
            <span>Hint : cari tau sendiri 🤫💕</span>
          </div>
        </div>

        {/* Error notification */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-[#E12D39] mt-2 font-medium"
            >
              Kode salah, coba ingat tanggal spesial kita 🤍
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
