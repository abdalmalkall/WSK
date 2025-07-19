import { useState, useRef } from 'react';
import { Button } from './ui/button';

interface WSKVanishButtonProps {
  children: React.ReactNode;
  onVanish?: () => void;
  className?: string;
}

export const WSKVanishButton = ({ children, onVanish, className = "" }: WSKVanishButtonProps) => {
  const [isVanished, setIsVanished] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMouseEnter = () => {
    // Play disappear sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    
    setTimeout(() => {
      setIsVanished(true);
      onVanish?.();
    }, 300);
  };

  const handleClick = () => {
    // Do absolutely nothing - that's the point!
    console.log("You clicked nothing. Nothing happened. As expected.");
  };

  if (isVanished) {
    return (
      <div className="w-full h-12 flex items-center justify-center">
        <span className="text-muted-foreground text-sm opacity-50 animate-flicker">
          [VOID]
        </span>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        className={`vanish-button border-blood-red text-blood-red hover:bg-blood-red hover:text-ghost-white pulse-void ${className}`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {children}
      </Button>
      
      <audio 
        ref={audioRef}
        preload="auto"
      >
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+XprnAbBW219dSddS0FKnbA79+QQgwXaq3r8K1TAw5QtvLms2MdBzOP1/CQRgcaTbDrw3dMCQ1ZvNbqnFESCkq09cWZQAoUXqPW8MJlFgtGnMnrq10PBjOK3eytPwIvktH60lsAABOAz9SuKCg4d3rY8KxfFQ1ImdR8LmkJaKnfOKiRXOjyAQNJbW17WRR1fV/s+F3e2vOTYFHy2/KX" type="audio/wav" />
      </audio>
    </>
  );
};