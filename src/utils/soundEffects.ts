// Web Audio API Synthesizer for Romantic Sound Effects

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChimeSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Harpsichord chime)

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.08);

    gain.gain.setValueAtTime(0, now + i * 0.08);
    gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 1.3);
  });
}

export function playGiftOpenSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Shimmering arpeggio
  const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.05);

    gain.gain.setValueAtTime(0, now + idx * 0.05);
    gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.05 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.05);
    osc.stop(now + idx * 0.05 + 1.6);
  });
}

export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.13);
}

export function playFireworkBurstSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Whistle / launch
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.36);

  // Burst shimmer
  setTimeout(() => {
    if (!ctx) return;
    const burstTime = ctx.currentTime;
    const burstNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    burstNotes.forEach((f) => {
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();
      bOsc.type = 'triangle';
      bOsc.frequency.setValueAtTime(f + (Math.random() - 0.5) * 40, burstTime);
      bGain.gain.setValueAtTime(0.12, burstTime);
      bGain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.8 + Math.random() * 0.4);
      bOsc.connect(bGain);
      bGain.connect(ctx.destination);
      bOsc.start(burstTime);
      bOsc.stop(burstTime + 1.2);
    });
  }, 300);
}

let lastScratchSoundTime = 0;
export function playVinylScratchSound(pitchFactor = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = Date.now();
  if (now - lastScratchSoundTime < 60) return; // Throttle sound triggers
  lastScratchSoundTime = now;

  try {
    const audioNow = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const baseFreq = 220 * Math.max(0.5, Math.min(2.5, pitchFactor));
    osc.frequency.setValueAtTime(baseFreq, audioNow);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, audioNow + 0.05);

    gain.gain.setValueAtTime(0.05, audioNow);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioNow + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(audioNow);
    osc.stop(audioNow + 0.08);
  } catch {
    // Ignored
  }
}

