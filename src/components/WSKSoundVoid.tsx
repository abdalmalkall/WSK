import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const WSKSoundVoid = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const whiteNoiseNodeRef = useRef<ScriptProcessorNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const handleClick = () => {
    setHasClicked(true);

    if (!isPlaying) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = audioContext;

        const bufferSize = 4096;
        const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);

        whiteNoise.onaudioprocess = (e) => {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 0.1 - 0.05;
          }
        };

        whiteNoise.connect(audioContext.destination);
        whiteNoiseNodeRef.current = whiteNoise;
        setIsPlaying(true);

        // Stop after 10 seconds
        setTimeout(() => {
          whiteNoise.disconnect();
          audioContext.close();
          setIsPlaying(false);
        }, 10000);
      } catch (err) {
        console.error("Audio context failed:", err);
      }
    }
  };

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
            جاري الاستماع للفراغ...
          </>
        ) : (
          <>
            <Volume2 className="mr-2 h-4 w-4" />
            استمع لصوت الفراغ
          </>
        )}
      </Button>

      {isPlaying && (
        <p className="text-xs text-muted-foreground animate-flicker">
          ● REC • • • سجل: لا شيء
        </p>
      )}

      {hasClicked && !isPlaying && (
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm animate-flicker">
            هل سمعت شيئًا؟
          </p>
          <p className="text-xs text-muted-foreground opacity-50">
            (لا يوجد شيء للسماع)
          </p>
        </div>
      )}
    </div>
  );
};
