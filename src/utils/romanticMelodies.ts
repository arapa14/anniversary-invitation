// Romantic Web Audio Synthesizer for Smooth Playlist Playback
// Provides melodic acoustic guitar and piano synth loops for:
// 1. Shape of My Heart
// 2. Tak Ada Ujungnya - Roni Parulian
// 3. Takkan Terganti - Kahitna

let audioCtx: AudioContext | null = null;
let currentLoopTimer: NodeJS.Timeout | null = null;
let activeOscillators: OscillatorNode[] = [];
let masterGain: GainNode | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Melody note frequencies
const N: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.0, 'G#4': 415.3, A4: 440.0, B4: 493.88,
  C5: 523.25, 'C#5': 554.37, D5: 587.33, 'D#5': 622.25, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, 'G#5': 830.61, A5: 880.0, B5: 987.77,
  C6: 1046.5,
};

// Song 1: Shape of My Heart (Acoustic arpeggio & melody)
const shapeOfMyHeartPattern = [
  // F#m arpeggio
  { note: N['F#4'], t: 0.0, d: 0.8, type: 'triangle', gain: 0.14 },
  { note: N['C#5'], t: 0.25, d: 0.7, type: 'sine', gain: 0.12 },
  { note: N['F#5'], t: 0.5, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['C#5'], t: 0.75, d: 0.7, type: 'triangle', gain: 0.1 },
  // E / C#m
  { note: N['E4'], t: 1.0, d: 0.8, type: 'triangle', gain: 0.14 },
  { note: N['B4'], t: 1.25, d: 0.7, type: 'sine', gain: 0.12 },
  { note: N['E5'], t: 1.5, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['B4'], t: 1.75, d: 0.7, type: 'triangle', gain: 0.1 },
  // D
  { note: N['D4'], t: 2.0, d: 0.8, type: 'triangle', gain: 0.14 },
  { note: N['A4'], t: 2.25, d: 0.7, type: 'sine', gain: 0.12 },
  { note: N['D5'], t: 2.5, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['A4'], t: 2.75, d: 0.7, type: 'triangle', gain: 0.1 },
  // C#sus4 -> C#
  { note: N['C#4'], t: 3.0, d: 0.9, type: 'triangle', gain: 0.14 },
  { note: N['G#4'], t: 3.25, d: 0.7, type: 'sine', gain: 0.12 },
  { note: N['C#5'], t: 3.5, d: 1.0, type: 'sine', gain: 0.15 },
  { note: N['F4'], t: 3.75, d: 0.8, type: 'triangle', gain: 0.1 },
  // Melodic Lead Line
  { note: N['F#5'], t: 4.0, d: 0.6, type: 'sine', gain: 0.16 },
  { note: N['E5'], t: 4.5, d: 0.5, type: 'sine', gain: 0.15 },
  { note: N['D5'], t: 5.0, d: 0.7, type: 'sine', gain: 0.16 },
  { note: N['C#5'], t: 5.75, d: 1.2, type: 'sine', gain: 0.18 },
  { note: N['B4'], t: 6.5, d: 0.7, type: 'sine', gain: 0.15 },
  { note: N['A4'], t: 7.0, d: 1.4, type: 'sine', gain: 0.17 },
];

// Song 2: Tak Ada Ujungnya - Roni Parulian (Warm romantic ballad)
const takAdaUjungnyaPattern = [
  // Intro warm chords
  { note: N['C4'], t: 0.0, d: 1.0, type: 'triangle', gain: 0.14 },
  { note: N['E4'], t: 0.2, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['G4'], t: 0.4, d: 1.1, type: 'sine', gain: 0.14 },
  { note: N['C5'], t: 0.6, d: 1.2, type: 'sine', gain: 0.15 },

  { note: N['A3'], t: 1.2, d: 1.0, type: 'triangle', gain: 0.13 },
  { note: N['C4'], t: 1.4, d: 0.9, type: 'sine', gain: 0.12 },
  { note: N['E4'], t: 1.6, d: 1.1, type: 'sine', gain: 0.14 },
  { note: N['A4'], t: 1.8, d: 1.3, type: 'sine', gain: 0.16 },

  { note: N['F3'], t: 2.4, d: 1.0, type: 'triangle', gain: 0.13 },
  { note: N['A3'], t: 2.6, d: 0.9, type: 'sine', gain: 0.12 },
  { note: N['C4'], t: 2.8, d: 1.0, type: 'sine', gain: 0.14 },
  { note: N['F4'], t: 3.0, d: 1.2, type: 'sine', gain: 0.15 },

  { note: N['G3'], t: 3.6, d: 1.0, type: 'triangle', gain: 0.14 },
  { note: N['B3'], t: 3.8, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['D4'], t: 4.0, d: 1.0, type: 'sine', gain: 0.14 },
  { note: N['G4'], t: 4.2, d: 1.2, type: 'sine', gain: 0.16 },

  // Ballad melody phrase
  { note: N['E5'], t: 4.8, d: 0.6, type: 'sine', gain: 0.18 },
  { note: N['D5'], t: 5.3, d: 0.5, type: 'sine', gain: 0.16 },
  { note: N['C5'], t: 5.8, d: 1.0, type: 'sine', gain: 0.2 },
  { note: N['G4'], t: 6.6, d: 0.8, type: 'sine', gain: 0.16 },
  { note: N['A4'], t: 7.2, d: 1.4, type: 'sine', gain: 0.19 },
];

// Song 3: Takkan Terganti - Kahitna (Signature romantic piano arpeggio)
const takkanTergantiPattern = [
  // Piano arpeggio in G
  { note: N['G3'], t: 0.0, d: 1.2, type: 'triangle', gain: 0.15 },
  { note: N['D4'], t: 0.25, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['G4'], t: 0.5, d: 1.0, type: 'sine', gain: 0.14 },
  { note: N['B4'], t: 0.75, d: 1.1, type: 'sine', gain: 0.15 },

  // Em
  { note: N['E3'], t: 1.1, d: 1.2, type: 'triangle', gain: 0.15 },
  { note: N['B3'], t: 1.35, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['E4'], t: 1.6, d: 1.0, type: 'sine', gain: 0.14 },
  { note: N['G4'], t: 1.85, d: 1.1, type: 'sine', gain: 0.15 },

  // C major 7
  { note: N['C3'], t: 2.2, d: 1.2, type: 'triangle', gain: 0.15 },
  { note: N['G3'], t: 2.45, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['E4'], t: 2.7, d: 1.0, type: 'sine', gain: 0.14 },
  { note: N['B4'], t: 2.95, d: 1.2, type: 'sine', gain: 0.16 },

  // D
  { note: N['D3'], t: 3.3, d: 1.2, type: 'triangle', gain: 0.15 },
  { note: N['A3'], t: 3.55, d: 0.9, type: 'sine', gain: 0.13 },
  { note: N['F#4'], t: 3.8, d: 1.0, type: 'sine', gain: 0.14 },
  { note: N['A4'], t: 4.05, d: 1.2, type: 'sine', gain: 0.16 },

  // Kahitna melody hook: "Takkan terganti..."
  { note: N['D5'], t: 4.5, d: 0.6, type: 'sine', gain: 0.19 },
  { note: N['B4'], t: 5.0, d: 0.6, type: 'sine', gain: 0.17 },
  { note: N['C5'], t: 5.5, d: 0.8, type: 'sine', gain: 0.18 },
  { note: N['A4'], t: 6.2, d: 0.7, type: 'sine', gain: 0.16 },
  { note: N['G4'], t: 6.8, d: 1.6, type: 'sine', gain: 0.21 },
];

export function stopMelodySynth() {
  if (currentLoopTimer) {
    clearInterval(currentLoopTimer);
    currentLoopTimer = null;
  }
  activeOscillators.forEach((osc) => {
    try {
      osc.stop();
      osc.disconnect();
    } catch {
      // Ignored
    }
  });
  activeOscillators = [];
}

export function playMelodySynth(songIndex: number) {
  stopMelodySynth();
  const ctx = getContext();
  if (!ctx) return;

  const patterns = [shapeOfMyHeartPattern, takAdaUjungnyaPattern, takkanTergantiPattern];
  const pattern = patterns[songIndex % patterns.length];
  const loopLength = 8.5; // seconds per cycle

  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.85, ctx.currentTime);
    masterGain.connect(ctx.destination);
  }

  const playCycle = () => {
    if (!ctx) return;
    const now = ctx.currentTime;

    pattern.forEach((p) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = (p.type as OscillatorType) || 'sine';
      osc.frequency.setValueAtTime(p.note, now + p.t);

      // Smooth envelope attack and decay
      gain.gain.setValueAtTime(0, now + p.t);
      gain.gain.linearRampToValueAtTime(p.gain, now + p.t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.t + p.d);

      osc.connect(gain);
      if (masterGain) {
        gain.connect(masterGain);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start(now + p.t);
      osc.stop(now + p.t + p.d + 0.1);
      activeOscillators.push(osc);
    });

    // Cleanup ended oscillators
    setTimeout(() => {
      activeOscillators = [];
    }, (loopLength + 1) * 1000);
  };

  playCycle();
  currentLoopTimer = setInterval(playCycle, loopLength * 1000);
}
