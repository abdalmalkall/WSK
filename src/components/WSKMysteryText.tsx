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
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const cycleTimer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 500);
    }, interval);

    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, [texts.length, interval]);

  return (
    <div className={`mystery-text ${isVisible ? 'appear' : ''} ${className}`}>
      <p className="text-neon-cyan text-lg md:text-xl font-mono text-center animate-pulse">
        {texts[currentIndex]}
      </p>
    </div>
  );
};