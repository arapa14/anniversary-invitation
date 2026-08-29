import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timeoutIdsRef = useRef<number[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Romantic gentle chord sequence (Cmaj7 -> Am9 -> Fmaj9 -> G6/11)
  const notesSequence = [
    // Chord 1: Cmaj7
    { note: 261.63, delay: 0 },   // C4
    { note: 329.63, delay: 400 }, // E4
    { note: 392.00, delay: 800 }, // G4
    { note: 493.88, delay: 1200 },// B4
    { note: 523.25, delay: 1600 },// C5
    { note: 392.00, delay: 2000 },// G4
    { note: 329.63, delay: 2400 },// E4
    { note: 493.88, delay: 2800 },// B4

    // Chord 2: Am9
    { note: 220.00, delay: 3200 },// A3
    { note: 261.63, delay: 3600 },// C4
    { note: 329.63, delay: 4000 },// E4
    { note: 392.00, delay: 4400 },// G4
    { note: 493.88, delay: 4800 },// B4
    { note: 329.63, delay: 5200 },// E4
    { note: 261.63, delay: 5600 },// C4
    { note: 392.00, delay: 6000 },// G4

    // Chord 3: Fmaj7#11
    { note: 174.61, delay: 6400 },// F3
    { note: 261.63, delay: 6800 },// C4
    { note: 329.63, delay: 7200 },// E4
    { note: 369.99, delay: 7600 },// F#4
    { note: 440.00, delay: 8000 },// A4
    { note: 329.63, delay: 8400 },// E4
    { note: 261.63, delay: 8800 },// C4
    { note: 440.00, delay: 9200 },// A4

    // Chord 4: Gadd9 / sus
    { note: 196.00, delay: 9600 }, // G3
    { note: 246.94, delay: 10000 },// B3
    { note: 293.66, delay: 10400 },// D4
    { note: 392.00, delay: 10800 },// G4
    { note: 440.00, delay: 11200 },// A4
    { note: 293.66, delay: 11600 },// D4
    { note: 246.94, delay: 12000 },// B3
    { note: 392.00, delay: 12400 },// G4
  ];

  const totalLoopDuration = 12800;

  const playTone = (freq: number) => {
    if (!audioCtxRef.current || !gainNodeRef.current || !isPlayingRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Soft warm sine + triangle blend
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm low-pass acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    // Envelope: slow soft attack, romantic warm decay
    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.12);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(gainNodeRef.current);

    osc.start(now);
    osc.stop(now + 3.0);
  };

  const scheduleMusicLoop = () => {
    if (!isPlayingRef.current) return;

    notesSequence.forEach(({ note, delay }) => {
      const id = window.setTimeout(() => {
        if (isPlayingRef.current) {
          playTone(note);
        }
      }, delay);
      timeoutIdsRef.current.push(id);
    });

    const loopId = window.setTimeout(() => {
      if (isPlayingRef.current) {
        scheduleMusicLoop();
      }
    }, totalLoopDuration);
    timeoutIdsRef.current.push(loopId);
  };

  const startMusic = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
        
        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.4, audioCtxRef.current.currentTime);
        masterGain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = masterGain;
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      isPlayingRef.current = true;
      setIsPlaying(true);
      scheduleMusicLoop();
    } catch {
      // AudioContext policy handled
    }
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = () => {
    if (!gainNodeRef.current || !audioCtxRef.current) return;
    if (isMuted) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.4, audioCtxRef.current.currentTime);
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current && !isMuted) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.4, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startMusic();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      id="floating-audio-player"
      className="fixed top-5 right-5 z-40 flex items-center gap-2"
    >
      {/* Volume Slider Popover */}
      {showVolumeSlider && (
        <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-full border border-[#B8EBFF]/60 shadow-[0_8px_25px_rgba(137,207,241,0.2)] flex items-center gap-2 animate-fadeIn">
          <button
            onClick={toggleMute}
            className="text-[#89CFF1] hover:text-[#334E68] transition-colors p-1 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 accent-[#89CFF1] h-1.5 cursor-pointer bg-[#E5F6FE] rounded-lg"
          />
        </div>
      )}

      {/* Main Music Button */}
      <button
        id="btn-toggle-music"
        onClick={togglePlay}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowVolumeSlider(!showVolumeSlider);
        }}
        className={`group relative flex items-center justify-center w-11 h-11 rounded-full shadow-[0_8px_20px_rgba(137,207,241,0.25)] transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#E5F6FE] text-[#89CFF1] ring-1 ring-[#89CFF1] ring-offset-2'
            : 'bg-white/90 text-[#627D98] hover:text-[#89CFF1] hover:bg-[#E5F6FE]/50 border border-[#B8EBFF]/60'
        }`}
        title={isPlaying ? 'Jeda Musik (Klik kanan untuk volume)' : 'Putar Musik Romantis'}
      >
        <div className={`flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Music size={17} />
        </div>

        {/* Pulse Ripple Effect when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-[#89CFF1]/30 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
