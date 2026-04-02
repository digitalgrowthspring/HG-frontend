'use client';

import { useEffect, useRef, useState } from 'react';

type TrailParticle = {
  id: number;
  x: number;
  y: number;
  colorClass: string;
  size: number;
  glyph: string;
};

const TRAIL_COLORS = [
  'hg-wand-particle-gold',
  'hg-wand-particle-teal',
  'hg-wand-particle-pink',
  'hg-wand-particle-purple',
];

const TRAIL_GLYPHS = ['✦', '•', '✦', '•'];

export function HeroMagic() {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [cursor, setCursor] = useState({ x: -120, y: -120 });
  const [active, setActive] = useState(false);
  const nextIdRef = useRef(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const hasFinePointer = window.matchMedia('(any-pointer: fine)').matches;

    if (!hasFinePointer) {
      root.classList.remove('has-wand-cursor');
      return;
    }

    root.classList.add('has-wand-cursor');

    const spawnParticle = (x: number, y: number) => {
      const id = nextIdRef.current++;
      const colorClass = TRAIL_COLORS[id % TRAIL_COLORS.length];
      const glyph = TRAIL_GLYPHS[id % TRAIL_GLYPHS.length];
      const size = glyph === '✦' ? 15 + (id % 3) * 3 : 7 + (id % 2) * 2;

      setParticles((current) => [
        ...current.slice(-16),
        { id, x, y, colorClass, size, glyph },
      ]);

      window.setTimeout(() => {
        setParticles((current) => current.filter((particle) => particle.id !== id));
      }, 760);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      setCursor({ x, y });
      setActive(true);

      const now = performance.now();
      if (now - lastSpawnRef.current < 28) return;
      lastSpawnRef.current = now;

      spawnParticle(x - 6, y - 6);
    };

    const handleLeave = () => setActive(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handleLeave);
    window.addEventListener('blur', handleLeave);

    return () => {
      root.classList.remove('has-wand-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
      window.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('blur', handleLeave);
    };
  }, []);

  return (
    <div className="hg-wand-overlay" aria-hidden="true">
      <div
        className={`hg-wand-cursor${active ? ' is-active' : ''}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      >
        <span className="hg-wand-stick" />
      </div>

      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`hg-wand-particle ${particle.colorClass}`}
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: `${particle.size}px`,
          }}
        >
          {particle.glyph}
        </span>
      ))}
    </div>
  );
}
