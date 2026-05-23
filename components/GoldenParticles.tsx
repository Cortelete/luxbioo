import React from 'react';

const GoldenParticles: React.FC = () => {
  const particleCount = 50;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDuration: `${Math.random() * 15 + 15}s`, // Even slower: 15s to 30s
      animationDelay: `${Math.random() * 20}s`,
      opacity: Math.random() * 0.6 + 0.2, // More subtle
    };
    return <div key={i} className="gold-particle" style={style} />;
  });

  return <div className="particle-container" aria-hidden="true">{particles}</div>;
};

export default GoldenParticles;