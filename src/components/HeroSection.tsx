import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import { WebKimmyConfig } from '../types';

interface HeroSectionProps {
  config: WebKimmyConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullPhrase = config.typewriterPhrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(fullPhrase.slice(0, currentText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullPhrase.slice(0, currentText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % config.typewriterPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, config.typewriterPhrases]);

  const scrollToBouquet = () => {
    const bouquetElem = document.getElementById('bouquet');
    if (bouquetElem) {
      bouquetElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto z-10 flex flex-col items-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E5F6FE] backdrop-blur-md text-[#334E68] text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 shadow-xs"
        >
          <span>💍</span>
          <span>Our Happy Anniversary</span>
          <span>💍</span>
        </motion.div>

        {/* Grand Anniversary Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#243B53] tracking-tight leading-tight mb-4"
        >
          HAPPY <br />
          <span className="bg-gradient-to-r from-[#4895BE] via-[#89CFF1] to-[#FEBDBB] bg-clip-text text-transparent font-medium">
            ANNIVERSARY
          </span>{' '}
          <br />
          <span className="tracking-wide font-serif text-4xl sm:text-6xl md:text-7xl text-[#243B53] drop-shadow-xs">
            {config.recipientName}
          </span>
        </motion.h1>

        {/* Typewriter text container */}
        <div className="min-h-[48px] sm:min-h-[56px] flex items-center justify-center px-4 mb-4">
          <p className="font-garamond text-xl sm:text-2xl md:text-3xl text-[#334E68] italic tracking-wide">
            {currentText}
            <span className="inline-block w-0.5 h-6 bg-[#89CFF1] ml-1 animate-pulse" />
          </p>
        </div>

        {/* Soft glowing divider */}
        <div className="flex items-center justify-center gap-3 my-4 w-48 sm:w-64 opacity-80">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#89CFF1]" />
          <span className="text-sm text-[#89CFF1]">✿</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#89CFF1]" />
        </div>

        {/* Date subtitle */}
        <p className="text-xs sm:text-sm text-[#627D98] uppercase tracking-widest font-medium mb-4">
          {config.subtitle}
        </p>

        {/* Romantic quote */}
        <div className="max-w-lg mx-auto bg-white/75 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white shadow-md my-2">
          <p className="font-serif italic text-sm sm:text-base text-[#334E68] leading-relaxed">
            {config.heroQuote}
          </p>
        </div>

        {/* Explore Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToBouquet}
          className="mt-8 inline-flex items-center gap-2.5 px-8 py-4 rounded-full btn-sea-primary text-xs sm:text-sm uppercase tracking-widest font-semibold cursor-pointer"
        >
          <Sparkles size={16} className="text-white" />
          <span>Lihat Hadiah Bunga &amp; Kenangan</span>
          <Heart size={15} className="fill-white text-white" />
        </motion.button>

        {/* Scroll down indicator */}
        <div
          onClick={scrollToBouquet}
          className="mt-12 text-[#627D98] hover:text-[#243B53] transition-colors cursor-pointer flex flex-col items-center gap-1 animate-bounce"
        >
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll Down</span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
};
