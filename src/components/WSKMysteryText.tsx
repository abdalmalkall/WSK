import { useState, useEffect } from 'react';

interface WSKMysteryTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export const WSKMysteryText = ({ texts, interval = 5000, className = "" }: WSKMysteryTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const cycleTimer = setInterval(() => {
      setIsVisible(false);

      const timeout = setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(timeout);
    }, interval);

    return () => clearInterval(cycleTimer);
  }, [texts.length, interval]);

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}>
      <p className="text-neon-cyan text-lg md:text-xl font-mono text-center animate-pulse">
        {texts[currentIndex]}
      </p>
    </div>
  );
};
