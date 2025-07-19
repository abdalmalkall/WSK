import { useEffect, useState } from 'react';

interface WSKGlitchTextProps {
  text: string;
  className?: string;
  autoScramble?: boolean;
}

export const WSKGlitchText = ({ text, className = "", autoScramble = false }: WSKGlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const scrambleChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?~`";
  
  const scrambleText = () => {
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split('').map((char, index) => {
          if (iterations < maxIterations * 0.7) {
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            return text[index] || char;
          }
        }).join('')
      );
      
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 50);
  };

  useEffect(() => {
    if (autoScramble) {
      const timer = setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
          scrambleText();
        }
      }, 3000);
      
      return () => clearInterval(timer);
    }
  }, [autoScramble, text]);

  return (
    <span 
      className={`glitch ${className} ${isGlitching ? 'animate-glitch-rgb' : ''}`}
      data-text={displayText}
      onMouseEnter={() => !autoScramble && scrambleText()}
    >
      {displayText}
    </span>
  );
};