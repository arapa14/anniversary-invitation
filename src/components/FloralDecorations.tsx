import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const GrandGoldDivider: React.FC<{ className?: string; text?: string }> = ({
  className = '',
  text,
}) => (
  <div className={`flex items-center justify-center gap-3 my-5 ${className}`}>
    <div className="flex items-center gap-1">
      <div className="w-1.5 h-1.5 rotate-45 bg-[#89CFF1]/70" />
      <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#89CFF1] to-[#FEBDBB]" />
    </div>
    
    {text ? (
      <span className="font-serif italic text-[#627D98] text-xs sm:text-sm px-2 font-normal tracking-wide">
        {text}
      </span>
    ) : (
      <div className="flex items-center gap-1.5 text-[#FEBDBB]">
        <Sparkles size={12} className="text-[#89CFF1]" />
        <Heart size={14} className="fill-[#FEBDBB] text-[#FEBDBB]" />
        <Sparkles size={12} className="text-[#89CFF1]" />
      </div>
    )}

    <div className="flex items-center gap-1">
      <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-[#FEBDBB] via-[#89CFF1] to-transparent" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#89CFF1]/70" />
    </div>
  </div>
);

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <GrandGoldDivider className={className} />
);

export const GrandFloralArch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none relative w-full overflow-hidden ${className}`}>
    <svg viewBox="0 0 600 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Soft Sea Blue Curved Arch */}
      <path
        d="M 50 100 Q 300 -20 550 100"
        stroke="url(#seaBlueArch)"
        strokeWidth="1.8"
        strokeDasharray="3 3"
      />
      <path
        d="M 80 100 Q 300 10 520 100"
        stroke="url(#softPinkArch)"
        strokeWidth="1.2"
      />
      
      {/* Center Soft Blossom Cluster */}
      <g transform="translate(300, 32)">
        {/* Soft Halo Glow */}
        <circle cx="0" cy="0" r="26" fill="url(#seaHaloGlow)" opacity="0.6" />
        <circle cx="0" cy="0" r="20" stroke="#B8EBFF" strokeWidth="1" strokeDasharray="2 2" />
        
        {/* Main Soft Rose / Peony in Sea Pastel */}
        <circle cx="0" cy="0" r="14" fill="#FFDDDC" />
        <circle cx="0" cy="0" r="10" fill="#FEBDBB" opacity="0.9" />
        <circle cx="0" cy="0" r="6" fill="#FFCCCB" />
        <circle cx="0" cy="0" r="2.5" fill="#89CFF1" />

        {/* Soft Petals */}
        <ellipse cx="-14" cy="-5" rx="8" ry="5" fill="#E5F6FE" transform="rotate(-20 -14 -5)" />
        <ellipse cx="14" cy="-5" rx="8" ry="5" fill="#E5F6FE" transform="rotate(20 14 -5)" />
        <ellipse cx="-10" cy="12" rx="7" ry="4" fill="#FFDDDC" transform="rotate(30 -10 12)" />
        <ellipse cx="10" cy="12" rx="7" ry="4" fill="#FFDDDC" transform="rotate(-30 10 12)" />

        {/* Soft Sea Pastel Leaves */}
        <path d="M -26 -8 C -38 -15, -40 -1, -26 2 Z" fill="#89CFF1" opacity="0.75" />
        <path d="M 26 -8 C 38 -15, 40 -1, 26 2 Z" fill="#89CFF1" opacity="0.75" />
        <path d="M -22 10 C -32 20, -20 26, -14 16 Z" fill="#B8EBFF" opacity="0.7" />
        <path d="M 22 10 C 32 20, 20 26, 14 16 Z" fill="#B8EBFF" opacity="0.7" />

        {/* Soft Sparkle Star */}
        <path d="M 0 -22 L 1.5 -17 L 6 -17 L 2 -14 L 3.5 -9 L 0 -12 L -3.5 -9 L -2 -14 L -6 -17 L -1.5 -17 Z" fill="#89CFF1" />
      </g>

      {/* Left Node */}
      <g transform="translate(160, 48)">
        <circle cx="0" cy="0" r="9" fill="#E5F6FE" />
        <circle cx="0" cy="0" r="6" fill="#B8EBFF" />
        <circle cx="0" cy="0" r="2" fill="#FEBDBB" />
        <path d="M -12 -5 C -20 -10, -22 2, -12 3 Z" fill="#89CFF1" opacity="0.7" />
        <ellipse cx="6" cy="-6" rx="5" ry="3" fill="#FFDDDC" transform="rotate(25 6 -6)" />
      </g>

      {/* Right Node */}
      <g transform="translate(440, 48)">
        <circle cx="0" cy="0" r="9" fill="#E5F6FE" />
        <circle cx="0" cy="0" r="6" fill="#B8EBFF" />
        <circle cx="0" cy="0" r="2" fill="#FEBDBB" />
        <path d="M 12 -5 C 20 -10, 22 2, 12 3 Z" fill="#89CFF1" opacity="0.7" />
        <ellipse cx="-6" cy="-6" rx="5" ry="3" fill="#FFDDDC" transform="rotate(-25 -6 -6)" />
      </g>

      <defs>
        <linearGradient id="seaBlueArch" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8EBFF" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#89CFF1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B8EBFF" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="softPinkArch" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDDDC" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#FEBDBB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFDDDC" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="seaHaloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B8EBFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#89CFF1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export const LuxuryBouquetCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  let transformClasses = '';
  if (position === 'top-right') transformClasses = 'scale-x-[-1]';
  if (position === 'bottom-left') transformClasses = 'scale-y-[-1]';
  if (position === 'bottom-right') transformClasses = 'scale-x-[-1] scale-y-[-1]';

  return (
    <div className={`pointer-events-none select-none ${transformClasses} ${className}`}>
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
        {/* Soft Waves & Botanical Stems in Sea Pastel */}
        <path
          d="M 5 155 C 30 110, 50 60, 150 15"
          stroke="#89CFF1"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.7"
        />
        <path
          d="M 5 125 C 25 80, 75 35, 135 5"
          stroke="#FEBDBB"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Sea Sky Leaves */}
        <path d="M 55 45 C 45 20, 70 15, 80 35 Z" fill="#89CFF1" opacity="0.6" />
        <path d="M 35 65 C 15 50, 20 25, 45 45 Z" fill="#B8EBFF" opacity="0.7" />
        <path d="M 75 25 C 95 10, 115 25, 95 40 Z" fill="#89CFF1" opacity="0.5" />

        {/* Soft Pink Petals */}
        <path d="M 25 95 C 10 75, 30 55, 45 75 Z" fill="#FFDDDC" opacity="0.8" />
        <path d="M 95 35 C 120 25, 125 50, 105 55 Z" fill="#FFCCCB" opacity="0.7" />

        {/* Soft Pastel Peony Center */}
        <circle cx="50" cy="50" r="20" fill="#E5F6FE" />
        <circle cx="50" cy="50" r="15" fill="#FFDDDC" />
        <circle cx="50" cy="50" r="10" fill="#FEBDBB" />
        <circle cx="50" cy="50" r="5" fill="#FFCCCB" />
        <circle cx="50" cy="50" r="2" fill="#89CFF1" />

        {/* Soft Companion Flower */}
        <circle cx="85" cy="45" r="11" fill="#E5F6FE" />
        <circle cx="85" cy="45" r="7" fill="#B8EBFF" opacity="0.9" />
        <circle cx="85" cy="45" r="2.5" fill="#334E68" opacity="0.5" />

        {/* Mini Blossom */}
        <circle cx="40" cy="85" r="9" fill="#FFDDDC" />
        <circle cx="40" cy="85" r="5" fill="#FEBDBB" />
        <circle cx="40" cy="85" r="1.8" fill="#89CFF1" />

        {/* Tiny stars */}
        <text x="120" y="30" fill="#89CFF1" fontSize="12" fontWeight="normal">✦</text>
        <text x="30" y="125" fill="#FEBDBB" fontSize="11">✦</text>
      </svg>
    </div>
  );
};

export const CelebrationRibbonBadge: React.FC<{
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ title, subtitle, className = '' }) => (
  <div className={`relative inline-flex flex-col items-center justify-center my-3 px-5 py-1.5 ${className}`}>
    {/* Soft Sea Pastel Backdrop Pill */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#E5F6FE] via-[#FFDDDC]/60 to-[#E5F6FE] rounded-full border border-[#89CFF1]/40 shadow-xs" />
    
    <div className="relative z-10 flex items-center gap-1.5">
      <Sparkles size={11} className="text-[#89CFF1]" />
      <span className="font-serif uppercase tracking-[0.22em] text-[10px] sm:text-xs font-semibold text-[#334E68]">
        {title}
      </span>
      <Sparkles size={11} className="text-[#89CFF1]" />
    </div>

    {subtitle && (
      <span className="relative z-10 font-sans text-[9.5px] sm:text-[10.5px] text-[#627D98] tracking-widest uppercase mt-0.5">
        {subtitle}
      </span>
    )}
  </div>
);

export const WaxSealBadge: React.FC<{
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'rose' | 'sea';
  className?: string;
}> = ({ text = 'A&D', size = 'md', variant = 'sea', className = '' }) => {
  const sizeClasses = {
    sm: 'w-9 h-9 text-[10px]',
    md: 'w-13 h-13 text-xs',
    lg: 'w-16 h-16 text-sm',
  }[size];

  const sealClass = variant === 'rose' ? 'rose-pastel-seal' : 'sea-pastel-seal';

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={`relative inline-flex items-center justify-center rounded-full ${sealClass} text-[#334E68] font-serif font-bold shadow-sm select-none transform transition-transform duration-300 hover:scale-105 ${sizeClasses} ${className}`}
      >
        <div className="absolute inset-1 rounded-full border border-white/60 flex items-center justify-center">
          <span className="tracking-wider text-[#243B53] font-serif font-semibold">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

