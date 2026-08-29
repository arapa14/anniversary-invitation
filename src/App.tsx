import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PinScreen } from './components/PinScreen';
import { GiftBoxScreen } from './components/GiftBoxScreen';
import { SakuraCanvas } from './components/SakuraCanvas';
import { HeroSection } from './components/HeroSection';
import { DigitalBouquetSection } from './components/DigitalBouquetSection';
import { LetterSection } from './components/LetterSection';
import { MemoriesSection } from './components/MemoriesSection';
import { TimelineSection } from './components/TimelineSection';
import { MusicSection } from './components/MusicSection';
import { ReasonsJarSection } from './components/ReasonsJarSection';
import { FinalSection } from './components/FinalSection';
import { FireworksOverlay } from './components/FireworksOverlay';
import { FloatingMusic } from './components/FloatingMusic';
import { KIMMY_DATA } from './data/kimmyData';
import { WebKimmyConfig } from './types';
import { playMelodySynth, stopMelodySynth } from './utils/romanticMelodies';

type AppStage = 'PIN' | 'GIFTBOX' | 'MAIN';

export default function App() {
  const [stage, setStage] = useState<AppStage>('PIN');
  const [config, setConfig] = useState<WebKimmyConfig>(KIMMY_DATA);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(230);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check URL parameters for dynamic customization (?to=Kimmy, ?pin=020923)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('name') || params.get('recipient');
    const pinParam = params.get('pin');

    if (toParam || pinParam) {
      setConfig((prev) => ({
        ...prev,
        recipientName: toParam ? decodeURIComponent(toParam) : prev.recipientName,
        pin: pinParam || prev.pin,
        title: `HAPPY ANNIVERSARY ${(toParam || prev.recipientName).toUpperCase()}`,
      }));
    }
  }, []);

  // Track scroll percentage for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize and manage audio playback
  useEffect(() => {
    const currentSong = config.playlist[currentTrackIndex];
    if (!currentSong) return;

    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;
    audio.src = currentSong.url;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      handleNextTrack();
    };

    const handleError = () => {
      // If audio file URL cannot be reached or CORS fails, activate melodious Web Audio synth fallback!
      if (isPlaying) {
        playMelodySynth(currentTrackIndex);
        if (!synthTimerRef.current) {
          synthTimerRef.current = setInterval(() => {
            setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
          }, 1000);
        }
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    if (isPlaying) {
      audio.play().catch(() => {
        playMelodySynth(currentTrackIndex);
        if (!synthTimerRef.current) {
          synthTimerRef.current = setInterval(() => {
            setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
          }, 1000);
        }
      });
    } else {
      stopMelodySynth();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
      }
    };
  }, [currentTrackIndex, config.playlist, isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopMelodySynth();
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch(() => {
            playMelodySynth(currentTrackIndex);
            if (!synthTimerRef.current) {
              synthTimerRef.current = setInterval(() => {
                setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
              }, 1000);
            }
          });
      } else {
        playMelodySynth(currentTrackIndex);
      }
    }
  };

  const handleSelectTrack = (index: number) => {
    stopMelodySynth();
    setCurrentTime(0);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = config.playlist[index].url;
      audioRef.current.play().catch(() => {
        playMelodySynth(index);
      });
    } else {
      playMelodySynth(index);
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % config.playlist.length;
    handleSelectTrack(nextIdx);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + config.playlist.length) % config.playlist.length;
    handleSelectTrack(prevIdx);
  };

  const handleSeek = (seconds: number) => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = seconds;
      } catch {
        // Ignored
      }
      setCurrentTime(seconds);
    }
  };

  // Stage Transitions
  const handlePinSuccess = () => {
    setStage('GIFTBOX');
  };

  const handleGiftUnwrapped = () => {
    setStage('MAIN');
    // Start music on unwrapping
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        playMelodySynth(currentTrackIndex);
      });
    } else {
      playMelodySynth(currentTrackIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F9FF] via-[#E6F4FA] to-[#FDF6F8] text-[#243B53] selection:bg-[#B8EBFF] selection:text-[#102A43] relative font-sans overflow-x-hidden">
      {/* Ambient Sea Pastel Background Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#89CFF1]/20 blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[450px] h-[450px] rounded-full bg-[#B8EBFF]/25 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 left-10 w-[550px] h-[550px] rounded-full bg-[#FEBDBB]/20 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E5F6FE]/40 blur-3xl pointer-events-none -z-10" />

      {/* Top Scroll Progress Bar */}
      {stage === 'MAIN' && (
        <div
          id="scroll-progress"
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#89CFF1] via-[#B8EBFF] to-[#FEBDBB] z-50 transition-all duration-150 shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      {/* Floating Sakura Petals Canvas Background */}
      <SakuraCanvas />

      {/* Stage 1: PIN Screen */}
      <AnimatePresence>
        {stage === 'PIN' && (
          <PinScreen
            recipientName={config.recipientName}
            expectedPin={config.pin}
            onSuccess={handlePinSuccess}
          />
        )}
      </AnimatePresence>

      {/* Stage 2: 3D Gift Box Screen */}
      <AnimatePresence>
        {stage === 'GIFTBOX' && (
          <GiftBoxScreen
            recipientName={config.recipientName}
            onUnwrapped={handleGiftUnwrapped}
          />
        )}
      </AnimatePresence>

      {/* Stage 3: Main Celebration Content */}
      {stage === 'MAIN' && (
        <main id="main-content" className="relative z-10 w-full">
          {/* Hero Section */}
          <HeroSection config={config} />

          {/* Interactive Digital Bouquet Section */}
          <DigitalBouquetSection bouquet={config.bouquet} />

          {/* Romantic Letter Section */}
          <LetterSection letter={config.letter} />

          {/* Photo Memories Polaroid Section */}
          <MemoriesSection polaroids={config.polaroids} />

          {/* Written Timeline Section */}
          <TimelineSection timeline={config.timeline} />

          {/* Music Vinyl Player Section */}
          <MusicSection
            playlist={config.playlist}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onSelectTrack={handleSelectTrack}
            onNext={handleNextTrack}
            onPrev={handlePrevTrack}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />

          {/* Jar of Reasons Section */}
          <ReasonsJarSection reasons={config.reasons} />

          {/* Final Section */}
          <FinalSection
            config={config}
            onLaunchFireworks={() => setShowFireworks(true)}
          />

          {/* Floating Music Button */}
          <FloatingMusic
            isPlaying={isPlaying}
            currentSong={config.playlist[currentTrackIndex]}
            onToggle={handleTogglePlay}
          />
        </main>
      )}

      {/* Fireworks & Celebration Modal Overlay */}
      <AnimatePresence>
        {showFireworks && (
          <FireworksOverlay
            recipientName={config.recipientName}
            onClose={() => setShowFireworks(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
