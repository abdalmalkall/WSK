import { useEffect, useState } from 'react';

export const WSKGlitchBackground = () => {
  const [glitchState, setGlitchState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchState(prev => (prev + 1) % 4);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const getGlitchStyle = () => {
    switch (glitchState) {
      case 1:
        return {
          background: 'linear-gradient(45deg, #000 0%, #111 50%, #000 100%)',
          filter: 'hue-rotate(180deg)',
        };
      case 2:
        return {
          background: 'radial-gradient(circle, #000 0%, #1a1a1a 100%)',
          filter: 'contrast(1.5)',
        };
      case 3:
        return {
          background: 'linear-gradient(90deg, #000 0%, #0a0a0a 25%, #000 50%, #0a0a0a 75%, #000 100%)',
          filter: 'invert(0.1)',
        };
      default:
        return {
          background: '#000',
          filter: 'none',
        };
    }
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10 transition-all duration-75"
      style={getGlitchStyle()}
    >
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-5 animate-flicker"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Scanning lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="w-full h-0.5 bg-neon-cyan absolute animate-slide-chaos opacity-20"
          style={{ top: '20%' }}
        />
        <div 
          className="w-full h-0.5 bg-neon-magenta absolute animate-slide-chaos opacity-20"
          style={{ top: '60%', animationDelay: '1s' }}
        />
        <div 
          className="w-full h-0.5 bg-glitch-3 absolute animate-slide-chaos opacity-20"
          style={{ top: '80%', animationDelay: '2s' }}
        />
      </div>
    </div>
  );
};