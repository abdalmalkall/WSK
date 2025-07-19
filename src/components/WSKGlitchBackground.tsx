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
          filter: 'hue-rotate(180deg)',
        };
      case 2:
        return {
          filter: 'contrast(1.5)',
        };
      case 3:
        return {
          filter: 'invert(0.1)',
        };
      default:
        return {
          filter: 'none',
        };
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden" style={getGlitchStyle()}>
      {/* 🎥 خلفية الفيديو */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-40"
      >
        <source src="/assets/void-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 💥 Noise overlay */}
      <div 
        className="absolute inset-0 opacity-5 animate-flicker pointer-events-none"
        style={{
          backgroundImage: `url("assets/void-background.mp4")`,
        }}
      />

      {/* 📡 خطوط مسح glitch */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-0.5 bg-cyan-500 absolute animate-slide-chaos opacity-20" style={{ top: '20%' }} />
        <div className="w-full h-0.5 bg-pink-500 absolute animate-slide-chaos opacity-20" style={{ top: '60%', animationDelay: '1s' }} />
        <div className="w-full h-0.5 bg-purple-500 absolute animate-slide-chaos opacity-20" style={{ top: '80%', animationDelay: '2s' }} />
      </div>
    </div>
  );
};
