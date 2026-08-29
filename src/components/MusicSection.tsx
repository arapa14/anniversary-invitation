import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Music, Play, Pause, SkipBack, SkipForward, Disc3, Sparkles, Volume2 } from 'lucide-react';
import { Song } from '../types';
import { playPopSound, playVinylScratchSound } from '../utils/soundEffects';

interface MusicSectionProps {
  playlist: Song[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectTrack: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  playlist,
  currentTrackIndex,
  isPlaying,
  onTogglePlay,
  onSelectTrack,
  onNext,
  onPrev,
  currentTime,
  duration,
  onSeek,
}) => {
  const currentSong = playlist[currentTrackIndex] || playlist[0];
  const vinylRef = useRef<HTMLDivElement | null>(null);

  // Rotation & Scratch State
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const isDraggingRef = useRef(false);
  const lastAngleRef = useRef(0);
  const currentTimeRef = useRef(currentTime);
  const durationRef = useRef(duration);
  const onSeekRef = useRef(onSeek);

  // Sync refs
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);
  useEffect(() => {
    onSeekRef.current = onSeek;
  }, [onSeek]);

  // Smooth continuous rotation when playing and not manually dragging
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying && !isDraggingRef.current) {
        // Rotate ~45 degrees per second (smooth 33 RPM turntable feel)
        setRotationAngle((prev) => (prev + delta * 45) % 360000);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  // Helper to compute angle from pointer event
  const getAngleFromEvent = useCallback((e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!vinylRef.current) return 0;
    const rect = vinylRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = 'touches' in e && e.touches[0] ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches[0] ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const rad = Math.atan2(clientY - centerY, clientX - centerX);
    return rad * (180 / Math.PI);
  }, []);

  // Pointer Down (Start dragging/scratching)
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    setIsScratching(true);
    const angle = getAngleFromEvent(e);
    lastAngleRef.current = angle;
  };

  // Pointer Move (Scrubbing / Rotating vinyl)
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !vinylRef.current) return;

      const currentAngle = getAngleFromEvent(e);
      let diff = currentAngle - lastAngleRef.current;

      // Handle -180 / 180 boundary wrap
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      // Ignore noise
      if (Math.abs(diff) < 0.2) return;

      // Update visual rotation
      setRotationAngle((prev) => prev + diff);

      // Translate angular movement to time seek
      // 360 degrees rotation = 16 seconds of song timeline
      const totalDur = durationRef.current || 220;
      const secondsDelta = (diff / 360) * 16;
      const newCalculatedTime = Math.max(0, Math.min(totalDur, currentTimeRef.current + secondsDelta));

      onSeekRef.current(newCalculatedTime);
      playVinylScratchSound(Math.min(2.5, Math.max(0.6, Math.abs(diff) / 4)));

      lastAngleRef.current = currentAngle;
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsScratching(false);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('touchcancel', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchcancel', handlePointerUp);
    };
  }, [getAngleFromEvent]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  // Progress percentage for tonearm positioning (0 to 1)
  const progressRatio = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
  // Tonearm angle: rests outside at -25 deg when stopped, 0 deg at track start, up to 28 deg at track end
  const tonearmAngle = isPlaying || isScratching ? progressRatio * 26 : -22;

  return (
    <section
      id="music"
      className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl w-full mx-auto z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E5F6FE] text-xs uppercase tracking-widest text-[#334E68] shadow-xs mb-3">
            <Music size={13} className="text-[#89CFF1]" />
            <span>Romantic Soundtrack</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#243B53] tracking-tight mb-2">
            Special Playlist
          </h2>
          <p className="text-xs sm:text-sm text-[#627D98] font-light">
            Melodi penuh kenangan yang terangkai khusus untuk merayakan anniversary kita 🎶
          </p>
        </motion.div>

        {/* Player Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vinyl Record Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            {/* Turntable Platter Deck */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-b from-white/90 to-[#EAF6FD]/90 rounded-3xl p-4 border border-white shadow-[0_25px_60px_rgba(137,207,241,0.25)] flex items-center justify-center select-none backdrop-blur-xl">
              {/* Turntable Platter Metallic Ring */}
              <div className="absolute inset-4 rounded-full border-4 border-[#B8EBFF]/40 shadow-inner bg-gradient-to-tr from-[#1E293B] via-[#0F172A] to-[#1E293B] flex items-center justify-center" />

              {/* Tonearm (Needle Arm) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-20 pointer-events-none origin-[16px_16px] transition-transform duration-500 ease-out"
                style={{
                  transform: `rotate(${tonearmAngle}deg)`,
                }}
              >
                {/* Pivot Base */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#89CFF1] to-[#4895BE] shadow-md border border-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                </div>
                {/* Metallic Arm */}
                <div className="w-1.5 h-32 sm:h-38 bg-gradient-to-b from-[#E2E8F0] via-[#94A3B8] to-[#CBD5E1] ml-3.5 shadow-sm rounded-full -mt-1 origin-top" />
                {/* Needle Head Cartridge */}
                <div className="w-5 h-8 bg-gradient-to-b from-[#FEBDBB] to-[#89CFF1] rounded-sm -ml-0.5 -mt-1 shadow-md border border-white/60 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Interactive Rotatable Vinyl Record */}
              <div
                ref={vinylRef}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  touchAction: 'none',
                }}
                className={`relative z-10 w-56 h-56 sm:w-68 sm:h-68 rounded-full bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#0F172A] p-2 border-2 border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(137,207,241,0.2)] flex items-center justify-center select-none transition-shadow ${
                  isScratching ? 'cursor-grabbing scale-102 ring-4 ring-[#89CFF1]/40' : 'cursor-grab hover:scale-101'
                }`}
                title="Geser atau putar piringan hitam untuk mengatur posisi timeline lagu"
              >
                {/* Vinyl Grooves & Sheen Rings */}
                <div className="w-48 h-48 sm:w-58 sm:h-58 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden">
                  {/* Realistic Light Sheen Flares */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#89CFF1]/10 to-transparent pointer-events-none" />

                  <div className="w-36 h-36 sm:w-46 sm:h-46 rounded-full border border-white/15 flex items-center justify-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/20 flex items-center justify-center">
                      {/* Center Label */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#89CFF1] via-[#4895BE] to-[#FEBDBB] flex flex-col items-center justify-center text-center p-1 shadow-inner text-white pointer-events-none">
                        <Disc3 size={20} className={`text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                        <span className="text-[7px] uppercase tracking-tighter font-mono mt-0.5 text-white font-bold">
                          Anniversary
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Hint Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E5F6FE] text-[11px] text-[#334E68] shadow-xs"
            >
              {isScratching ? (
                <>
                  <Sparkles size={13} className="text-[#FEBDBB] animate-spin" />
                  <span className="font-semibold text-[#102A43]">
                    Scratching: {formatTime(currentTime)} / {formatTime(duration || 220)}
                  </span>
                </>
              ) : (
                <>
                  <Volume2 size={13} className="text-[#89CFF1]" />
                  <span>Putar piringan hitam untuk scratch &amp; seek lagu 🔄</span>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Player Controls & Track List */}
          <div className="lg:col-span-6 text-left">
            <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(137,207,241,0.2)]">
              {/* Current Track Info */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#4895BE] font-semibold block mb-1">
                  Now Playing
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#243B53] font-medium tracking-normal">
                  {currentSong.name}
                </h3>
                <p className="text-sm text-[#627D98] font-normal mt-1">
                  {currentSong.artist}
                </p>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5 mb-6">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime || 0}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-[#E5F6FE] rounded-lg appearance-none cursor-pointer accent-[#89CFF1]"
                />
                <div className="flex justify-between text-[11px] text-[#627D98] font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 210)}</span>
                </div>
              </div>

              {/* Player Buttons */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <button
                  type="button"
                  onClick={onPrev}
                  className="p-3.5 rounded-full btn-sea-outline text-[#102A43] cursor-pointer"
                  aria-label="Previous Track"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  type="button"
                  onClick={onTogglePlay}
                  className="w-16 h-16 rounded-full btn-sea-primary flex items-center justify-center cursor-pointer shadow-[0_10px_30px_rgba(72,149,190,0.5)]"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={24} className="fill-white text-white" /> : <Play size={24} className="fill-white text-white ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  className="p-3.5 rounded-full btn-sea-outline text-[#102A43] cursor-pointer"
                  aria-label="Next Track"
                >
                  <SkipForward size={18} />
                </button>
              </div>

              {/* Playlist Selectors */}
              <div className="border-t border-[#E5F6FE] pt-4 space-y-2">
                <span className="text-[11px] text-[#627D98] uppercase tracking-wider font-medium block mb-2">
                  Daftar Lagu Pilihan:
                </span>
                {playlist.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      playPopSound();
                      onSelectTrack(idx);
                    }}
                    className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                      currentTrackIndex === idx
                        ? 'bg-[#E5F6FE] border border-[#89CFF1]/50 text-[#243B53] font-medium shadow-xs'
                        : 'bg-transparent hover:bg-[#F4FAFD] text-[#627D98] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#4895BE]">0{idx + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-[#243B53]">{track.name}</p>
                        <p className="text-xs text-[#627D98]">{track.artist}</p>
                      </div>
                    </div>
                    {currentTrackIndex === idx && isPlaying && (
                      <span className="flex items-center gap-0.5 h-3">
                        <span className="w-1 bg-[#89CFF1] h-3 animate-pulse" />
                        <span className="w-1 bg-[#89CFF1] h-2 animate-pulse delay-75" />
                        <span className="w-1 bg-[#89CFF1] h-4 animate-pulse delay-150" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

