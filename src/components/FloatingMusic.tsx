import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Disc3 } from 'lucide-react';
import { Song } from '../types';

interface FloatingMusicProps {
  isPlaying: boolean;
  currentSong: Song;
  onToggle: () => void;
}

export const FloatingMusic: React.FC<FloatingMusicProps> = ({
  isPlaying,
  currentSong,
  onToggle,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 select-none">
      {/* Track info pill on hover/playing */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#E5F6FE] px-3.5 py-1.5 rounded-full shadow-lg text-xs text-[#243B53]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#89CFF1] animate-ping" />
          <span className="truncate max-w-[140px] font-medium">{currentSong.name}</span>
        </motion.div>
      )}

      {/* Floating Vinyl Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#89CFF1] shadow-[0_6px_25px_rgba(137,207,241,0.4)] flex items-center justify-center text-[#243B53] cursor-pointer relative overflow-hidden group"
        aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {/* Spinning Vinyl Center */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { repeat: Infinity, duration: 6, ease: 'linear' }
              : { duration: 0.3 }
          }
          className="w-full h-full flex items-center justify-center"
        >
          <Disc3
            size={28}
            className={`text-[#89CFF1] ${isPlaying ? 'opacity-100' : 'opacity-70'}`}
          />
        </motion.div>

        {/* Center overlay indicator */}
        <div className="absolute inset-0 bg-[#243B53]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {isPlaying ? (
            <Pause size={16} className="text-[#243B53] fill-[#243B53]" />
          ) : (
            <Play size={16} className="text-[#243B53] fill-[#243B53] ml-0.5" />
          )}
        </div>
      </motion.button>
    </div>
  );
};
