import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';

export const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      type: Math.random() > 0.6 ? 'heart' : Math.random() > 0.3 ? 'sparkle' : 'petal',
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-rose-gold/20"
          initial={{ 
            x: `${p.x}vw`, 
            y: '110vh', 
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
          style={{ width: p.size, height: p.size }}
        >
          {p.type === 'heart' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : p.type === 'sparkle' ? (
            <div className="w-full h-full bg-white rounded-full blur-[1px]" />
          ) : (
            <div className="w-full h-full bg-rose-900/40 rounded-tl-full rounded-br-full" />
          )}
        </motion.div>
      ))}
    </div>
  );
};