import React, { memo } from 'react';

export const GoaBackground: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none gpu-layer">
      {/* Base Lighter & Warmer Goa Forest Green Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#005B3A] via-[#004E32] to-[#003B26]" />

      {/* Central Soft Light Aura for Optimal Content & Text Contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F7F0DB]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Softened Goa Retro Illustrated Background Poster Image */}
      <div 
        className="absolute inset-0 opacity-20 md:opacity-25 bg-cover bg-center mix-blend-luminosity filter saturate-150 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/pic/goa_bg.png')`,
        }}
      />

      {/* Retro Sun Reflection Glow Layer */}
      <div className="absolute top-16 right-1/3 w-[360px] h-[360px] bg-[#FFD400]/20 rounded-full blur-[90px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-[#FF0B78]/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle Screen Print Texture Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F7F0DB 1.2px, transparent 1.2px)`,
          backgroundSize: `20px 20px`
        }}
      />

      {/* Left Tropical Foliage Decorative Vector Artwork */}
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none hidden md:block opacity-60">
        <svg className="w-full h-full text-[#006B3C] animate-float" viewBox="0 0 300 300" fill="currentColor">
          <path d="M 0 300 C 50 180 160 100 280 20 C 180 90 80 180 0 300 Z" />
          <path d="M 0 300 C 80 200 220 140 300 80 C 200 140 100 200 0 300 Z" />
          <path d="M 0 300 C 40 150 140 60 220 0 C 140 70 60 160 0 300 Z" fill="#FF0B78" opacity="0.6" />
        </svg>
      </div>

      {/* Right Waves Accent */}
      <div className="absolute bottom-4 right-4 pointer-events-none hidden lg:block opacity-35">
        <svg className="w-64 h-48 text-[#FFD400]" viewBox="0 0 200 150" fill="currentColor">
          <path d="M 0 130 Q 30 110 60 130 T 120 130 T 180 130 T 240 130" stroke="#79C968" strokeWidth="3" fill="none" />
          <path d="M 0 140 Q 30 120 60 140 T 120 140 T 180 140 T 240 140" stroke="#FFD400" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
});

GoaBackground.displayName = 'GoaBackground';
