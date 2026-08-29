import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: 'petal' | 'glitter' | 'heart';
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
}

export const FloatingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  const colors = [
    '#B8EBFF', // Sea Blue Light
    '#E5F6FE', // Ice Blue
    '#FFDDDC', // Soft Pink
    '#FEBDBB', // Pastel Coral Pink
    '#89CFF1', // Sea Pastel Blue
  ];

  useEffect(() => {
    if (!isEnabled) {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(32, Math.floor(window.innerWidth / 36));

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const type: 'petal' | 'glitter' | 'heart' =
        i % 4 === 0 ? 'glitter' : i % 6 === 0 ? 'heart' : 'petal';

      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: type === 'glitter' ? Math.random() * 4 + 2 : Math.random() * 9 + 7,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: type === 'glitter' ? Math.random() * 0.6 + 0.3 : Math.random() * 1.0 + 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1.4 - 0.7,
        opacity: Math.random() * 0.4 + 0.3,
        color:
          type === 'glitter'
            ? Math.random() > 0.5
              ? '#89CFF1'
              : '#FEBDBB'
            : colors[Math.floor(Math.random() * colors.length)],
        type,
        swayAmplitude: Math.random() * 25 + 10,
        swayFrequency: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
      };
    });

    let time = 0;

    const drawParticle = (p: Particle) => {
      ctx.save();
      const currentX =
        p.x + Math.sin(time * p.swayFrequency + p.swayOffset) * p.swayAmplitude;
      ctx.translate(currentX, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'glitter') {
        // Draw 4-pointed golden sparkle star
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.fill();
      } else if (p.type === 'heart') {
        // Draw tiny romantic heart
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const h = p.size * 0.5;
        ctx.moveTo(0, h * 0.3);
        ctx.bezierCurveTo(-h, -h * 0.7, -h * 1.4, h * 0.2, 0, h * 1.4);
        ctx.bezierCurveTo(h * 1.4, h * 0.2, h, -h * 0.7, 0, h * 0.3);
        ctx.fill();
      } else {
        // Draw organic curved rose petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          p.size / 2,
          -p.size / 2,
          p.size,
          p.size / 3,
          0,
          p.size
        );
        ctx.bezierCurveTo(
          -p.size,
          p.size / 3,
          -p.size / 2,
          -p.size / 2,
          0,
          0
        );
        ctx.fillStyle = p.color;
        ctx.fill();

        // Shimmer line
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.quadraticCurveTo(p.size * 0.1, p.size * 0.5, 0, p.size * 0.85);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      particlesRef.current.forEach((p) => {
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 50) {
          p.y = -30;
          p.x = Math.random() * width;
        }

        drawParticle(p);
      });

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isEnabled]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-700 ${
          isEnabled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Floating Particles Toggle */}
      <button
        id="btn-toggle-petals"
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'Sembunyikan Efek Kilau & Kelopak' : 'Tampilkan Efek Kilau & Kelopak'}
        className="fixed bottom-24 right-4 z-40 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#89CFF1]/40 text-[#89CFF1] flex items-center justify-center shadow-[0_4px_15px_rgba(137,207,241,0.25)] hover:bg-[#E5F6FE] transition-all text-xs cursor-pointer"
      >
        <Sparkles size={15} className={isEnabled ? 'animate-pulse text-[#89CFF1]' : 'opacity-40 text-[#627D98]'} />
      </button>
    </>
  );
};
