import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const GrandGoldDivider: React.FC<{ className?: string; text?: string }> = ({
  className = '',
  text,
}) => (
  <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rotate-45 bg-[#D4A96A]/60" />
      <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4A96A] to-[#E598A8]" />
    </div>
    
    {text ? (
      <span className="font-serif italic text-[#8E7479] text-sm sm:text-base px-2 font-medium tracking-wide">
        {text}
      </span>
    ) : (
      <div className="flex items-center gap-1.5 text-[#E598A8]">
        <Sparkles size={13} className="text-[#D4A96A] animate-pulse" />
        <Heart size={16} className="fill-[#E598A8] text-[#E598A8]" />
        <Sparkles size={13} className="text-[#D4A96A] animate-pulse" />
      </div>
    )}

    <div className="flex items-center gap-1">
      <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-[#E598A8] via-[#D4A96A] to-transparent" />
      <div className="w-2 h-2 rotate-45 bg-[#D4A96A]/60" />
    </div>
  </div>
);

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <GrandGoldDivider className={className} />
);

export const GrandFloralArch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none relative w-full overflow-hidden ${className}`}>
    <svg viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Golden Arch Line */}
      <path
        d="M 50 110 Q 300 -30 550 110"
        stroke="url(#goldGradientArch)"
        strokeWidth="2.5"
        strokeDasharray="4 4"
      />
      <path
        d="M 80 110 Q 300 0 520 110"
        stroke="url(#pinkGradientArch)"
        strokeWidth="1.5"
      />
      
      {/* Center Grand Flower Cluster */}
      <g transform="translate(300, 32)">
        {/* Golden Sparkle Halo */}
        <circle cx="0" cy="0" r="28" fill="url(#haloGlow)" opacity="0.8" />
        <circle cx="0" cy="0" r="24" stroke="#FCE4E9" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Main Peony Flower */}
        <circle cx="0" cy="0" r="16" fill="#FAD1DB" />
        <circle cx="0" cy="0" r="12" fill="#E598A8" opacity="0.9" />
        <circle cx="0" cy="0" r="7" fill="#C05C74" />
        <circle cx="0" cy="0" r="3" fill="#FFE58F" />

        {/* Petals */}
        <ellipse cx="-16" cy="-6" rx="9" ry="6" fill="#FCE4E9" transform="rotate(-20 -16 -6)" />
        <ellipse cx="16" cy="-6" rx="9" ry="6" fill="#FCE4E9" transform="rotate(20 16 -6)" />
        <ellipse cx="-12" cy="14" rx="8" ry="5" fill="#FFD1DC" transform="rotate(30 -12 14)" />
        <ellipse cx="12" cy="14" rx="8" ry="5" fill="#FFD1DC" transform="rotate(-30 12 14)" />

        {/* Golden Leaves */}
        <path d="M -30 -10 C -45 -18, -48 -2, -32 2 Z" fill="#D4A96A" opacity="0.85" />
        <path d="M 30 -10 C 45 -18, 48 -2, 32 2 Z" fill="#D4A96A" opacity="0.85" />
        <path d="M -26 12 C -38 24, -24 32, -18 20 Z" fill="#E598A8" opacity="0.7" />
        <path d="M 26 12 C 38 24, 24 32, 18 20 Z" fill="#E598A8" opacity="0.7" />

        {/* Sparkle stars */}
        <path d="M 0 -26 L 2 -20 L 8 -20 L 3 -16 L 5 -10 L 0 -14 L -5 -10 L -3 -16 L -8 -20 L -2 -20 Z" fill="#D4A96A" />
      </g>

      {/* Left Floral Node */}
      <g transform="translate(160, 52)">
        <circle cx="0" cy="0" r="11" fill="#FAD1DB" />
        <circle cx="0" cy="0" r="7" fill="#E598A8" />
        <circle cx="0" cy="0" r="2.5" fill="#FFE58F" />
        <path d="M -15 -6 C -24 -12, -26 2, -15 4 Z" fill="#D4A96A" opacity="0.8" />
        <ellipse cx="8" cy="-8" rx="6" ry="4" fill="#FFD1DC" transform="rotate(25 8 -8)" />
      </g>

      {/* Right Floral Node */}
      <g transform="translate(440, 52)">
        <circle cx="0" cy="0" r="11" fill="#FAD1DB" />
        <circle cx="0" cy="0" r="7" fill="#E598A8" />
        <circle cx="0" cy="0" r="2.5" fill="#FFE58F" />
        <path d="M 15 -6 C 24 -12, 26 2, 15 4 Z" fill="#D4A96A" opacity="0.8" />
        <ellipse cx="-8" cy="-8" rx="6" ry="4" fill="#FFD1DC" transform="rotate(-25 -8 -8)" />
      </g>

      {/* Gradients */}
      <defs>
        <linearGradient id="goldGradientArch" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2B980" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#D4A96A" stopOpacity="1" />
          <stop offset="100%" stopColor="#E2B980" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="pinkGradientArch" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FCE4E9" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#E598A8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FCE4E9" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE58F" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFE58F" stopOpacity="0" />
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
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Golden Swirl Lines */}
        <path
          d="M 5 155 C 30 110, 50 60, 150 15"
          stroke="#D4A96A"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.8"
        />
        <path
          d="M 5 125 C 25 80, 75 35, 135 5"
          stroke="#E598A8"
          strokeWidth="1.2"
          opacity="0.6"
        />

        {/* Golden Leaves */}
        <path d="M 55 45 C 45 20, 70 15, 80 35 Z" fill="#D4A96A" opacity="0.85" />
        <path d="M 35 65 C 15 50, 20 25, 45 45 Z" fill="#E2B980" opacity="0.8" />
        <path d="M 75 25 C 95 10, 115 25, 95 40 Z" fill="#D4A96A" opacity="0.75" />

        {/* Emerald/Rose Leaves */}
        <path d="M 25 95 C 10 75, 30 55, 45 75 Z" fill="#FCE4E9" stroke="#E598A8" strokeWidth="0.8" />
        <path d="M 95 35 C 120 25, 125 50, 105 55 Z" fill="#FFD1DC" stroke="#E598A8" strokeWidth="0.8" />

        {/* Large Rose Center */}
        <circle cx="50" cy="50" r="22" fill="#FCE4E9" />
        <circle cx="50" cy="50" r="17" fill="#FAD1DB" />
        <circle cx="50" cy="50" r="12" fill="#E598A8" />
        <circle cx="50" cy="50" r="6" fill="#C05C74" />
        <circle cx="50" cy="50" r="2.5" fill="#FFE58F" />

        {/* Smaller Companion Flower */}
        <circle cx="85" cy="45" r="12" fill="#FFF0D6" />
        <circle cx="85" cy="45" r="8" fill="#E2B980" opacity="0.8" />
        <circle cx="85" cy="45" r="3" fill="#8E6327" />

        {/* Mini Blossom */}
        <circle cx="40" cy="85" r="10" fill="#FFD1DC" />
        <circle cx="40" cy="85" r="6" fill="#E598A8" />
        <circle cx="40" cy="85" r="2" fill="#FFE58F" />

        {/* Sparkling Stars */}
        <text x="120" y="30" fill="#D4A96A" fontSize="14" fontWeight="bold">✦</text>
        <text x="30" y="125" fill="#D4A96A" fontSize="12" fontWeight="bold">✦</text>
        <text x="95" y="80" fill="#E598A8" fontSize="10">★</text>
      </svg>
    </div>
  );
};

export const MinimalistPetalArt: React.FC<{
  className?: string;
  delay?: string;
  flip?: boolean;
}> = ({ className = '', delay = '0s', flip = false }) => (
  <LuxuryBouquetCorner
    position={flip ? 'top-right' : 'top-left'}
    className={`${className} animate-float-slow`}
  />
);

export const FloralCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => (
  <LuxuryBouquetCorner position={position} className={className} />
);

export const CelebrationRibbonBadge: React.FC<{
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ title, subtitle, className = '' }) => (
  <div className={`relative inline-flex flex-col items-center justify-center my-3 px-6 py-2 ${className}`}>
    {/* Glowing backdrop pill */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#FFF0D6] via-[#FCE4E9] to-[#FFF0D6] rounded-full border border-[#D4A96A]/60 shadow-[0_4px_20px_rgba(212,169,106,0.25)] animate-pulse-glow" />
    
    <div className="relative z-10 flex items-center gap-2">
      <Sparkles size={13} className="text-[#D4A96A]" />
      <span className="font-serif uppercase tracking-[0.25em] text-[11px] sm:text-xs font-semibold text-[#8E7479]">
        {title}
      </span>
      <Sparkles size={13} className="text-[#D4A96A]" />
    </div>

    {subtitle && (
      <span className="relative z-10 font-sans text-[10px] sm:text-[11px] text-[#A68F94] tracking-widest uppercase mt-0.5">
        {subtitle}
      </span>
    )}
  </div>
);

export const FloralWreath: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`relative flex items-center justify-center p-3 ${className}`}>
    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#FFE58F]/20 via-[#FFC1CC]/20 to-[#FFE58F]/20 blur-sm animate-pulse" />
    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4A96A]/60 animate-spin-slow" />
    <div className="absolute inset-1.5 rounded-full border border-[#FCE4E9]" />
    <div className="relative z-10">{children}</div>
  </div>
);

export const WaxSealBadge: React.FC<{
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'rose' | 'gold';
  className?: string;
}> = ({ text = 'A&D', size = 'md', variant = 'rose', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-[11px]',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
  }[size];

  const sealClass = variant === 'gold' ? 'gold-wax-seal' : 'wax-seal';

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer Golden Glow & Starburst */}
      <div className="absolute -inset-1 rounded-full bg-[#FFE58F]/40 blur-xs animate-ping pointer-events-none" />
      
      <div
        className={`relative inline-flex items-center justify-center rounded-full ${sealClass} text-[#FFF5F7] font-serif font-bold shadow-lg select-none transform transition-all duration-300 hover:scale-110 ${sizeClasses} ${className}`}
        style={{
          clipPath:
            'polygon(50% 0%, 65% 5%, 80% 0%, 93% 12%, 100% 28%, 97% 45%, 100% 62%, 92% 78%, 82% 90%, 65% 96%, 50% 100%, 35% 96%, 18% 90%, 8% 78%, 0% 62%, 3% 45%, 0% 28%, 7% 12%, 20% 0%, 35% 5%)',
        }}
      >
        <div className="absolute inset-1.5 rounded-full border border-white/50 flex items-center justify-center shadow-inner">
          <span className="tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] font-serif">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};
