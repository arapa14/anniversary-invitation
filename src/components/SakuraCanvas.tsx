import React, { useEffect, useRef } from 'react';

export const SakuraCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#89CFF1', '#B8EBFF', '#E5F6FE', '#FEBDBB', '#FFDDDC', '#FFFFFF'];

    class Petal {
      x = 0;
      y = 0;
      size = 0;
      speedY = 0;
      speedX = 0;
      rotation = 0;
      rotSpeed = 0;
      opacity = 0;
      color = '';
      sway = 0;
      swaySpeed = 0;

      constructor() {
        this.reset();
        this.y = Math.random() * h;
      }

      reset() {
        this.x = Math.random() * w;
        this.y = -20 - Math.random() * 80;
        this.size = 6 + Math.random() * 12;
        this.speedY = 0.4 + Math.random() * 0.8;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = 0.4 + Math.random() * 0.45;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.sway = Math.random() * 100;
        this.swaySpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.sway) * 0.35;
        this.sway += this.swaySpeed;
        this.rotation += this.rotSpeed;

        if (this.y > h + 30) {
          this.reset();
          this.y = -20 - Math.random() * 80;
        }
        if (this.x < -30) this.x = w + 30;
        if (this.x > w + 30) this.x = -30;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        const s = this.size;
        ctx.fillStyle = this.color;

        // 5 petals sakura flower blossom or individual petal
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const cx = Math.cos(angle) * s * 0.5;
          const cy = Math.sin(angle) * s * 0.5;
          ctx.beginPath();
          ctx.ellipse(cx, cy, s * 0.5, s * 0.3, angle, 0, Math.PI * 2);
          ctx.fill();
        }

        // Center dot
        ctx.fillStyle = '#FF6B8A';
        ctx.globalAlpha = this.opacity * 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    const petalCount = window.innerWidth < 768 ? 28 : 55;
    const petals: Petal[] = Array.from({ length: petalCount }, () => new Petal());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.update();
        p.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sakuraCanvas"
      className="fixed inset-0 pointer-events-none z-0 opacity-50 transition-opacity duration-1000"
    />
  );
};
