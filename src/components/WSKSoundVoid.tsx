import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const WSKSoundVoid = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    setHasClicked(true);
    
    if (!isPlaying) {
      // Create white noise programmatically
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const bufferSize = 4096;
      const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
      
      whiteNoise.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 0.1 - 0.05; // Very quiet white noise
        }
      };
      
      whiteNoise.connect(audioContext.destination);
      setIsPlaying(true);
      
      // Stop after 10 seconds of "emptiness"
      setTimeout(() => {
        whiteNoise.disconnect();
        setIsPlaying(false);
      }, 10000);
    }
  };

  if (hasClicked && !isPlaying) {
    return (
      <div className="text-center space-y-4">
        <p className="text-muted-foreground text-sm animate-flicker">
        Did you hear something?
        </p>
        <p className="text-xs text-muted-foreground opacity-50">
       (Nothing to hear)
        </p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <Button
        variant="ghost"
        onClick={handleClick}
        className="border border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-void pulse-void"
        disabled={isPlaying}
      >
        {isPlaying ? (
          <>
            <VolumeX className="mr-2 h-4 w-4 animate-pulse" />
           Listening to the void...
          </>
        ) : (
          <>
            <Volume2 className="mr-2 h-4 w-4" />
          Listen to the full audio
          </>
        )}
      </Button>
      
      {isPlaying && (
        <p className="text-xs text-muted-foreground animate-flicker">
         ● REC • • • Register: None
        </p>
      )}
    </div>
  );
};