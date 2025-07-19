import { useEffect, useState } from 'react';
import { WSKGlitchText } from '../components/WSKGlitchText';
import { WSKVanishButton } from '../components/WSKVanishButton';
import { WSKMysteryText } from '../components/WSKMysteryText';
import { WSKSoundVoid } from '../components/WSKSoundVoid';
import { WSKGlitchBackground } from '../components/WSKGlitchBackground';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isWSK, setIsWSK] = useState(false);

  const mysteryTexts = [
    "ما الهدف من وجودك؟",
    "لماذا أنت هنا؟",
    "هل تبحث عن معنى؟",
    "لا يوجد معنى.",
    "أنت تختار المعنى.",
    "أم أن المعنى يختارك؟",
    "WSK = Welcome to Something Known",
    "أو ربما... لا شيء معروف",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSection(prev => (prev + 1) % 5);
    }, 8000);

    // Show final message after 30 seconds
    const finalTimer = setTimeout(() => {
      setShowFinalMessage(true);
      setTimeout(() => {
        setIsWSK(true);
      }, 3000);
    }, 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(finalTimer);
    };
  }, []);

  if (isWSK) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center eye-cursor">
        <WSKGlitchBackground />
        <div className="text-center space-y-8 animate-pulse">
          <WSKGlitchText 
            text="أنت الآن WSK" 
            className="text-6xl text-neon-cyan"
            autoScramble={true}
          />
          <p className="text-ghost-white text-lg opacity-70 animate-flicker">
            مرحبًا بك في اللاشيء المعروف
          </p>
          <div className="mt-12">
            <span className="text-xs text-muted-foreground opacity-30">
              [الآن يمكنك إغلاق المتصفح]
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (showFinalMessage) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <WSKGlitchBackground />
        <div className="text-center space-y-12 animate-pulse">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-neon-magenta pulse-void animate-flicker flex items-center justify-center">
            <span className="text-3xl animate-glitch-rgb">?</span>
          </div>
          <WSKGlitchText 
            text="أنت الآن WSK." 
            className="text-4xl text-neon-magenta"
            autoScramble={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-ghost-white overflow-hidden">
      <WSKGlitchBackground />
      
      {/* Header */}
      <header className="relative z-10 p-8 text-center">
        <WSKGlitchText 
          text="WSK" 
          className="text-6xl md:text-8xl text-neon-cyan mb-4"
        />
        <p className="text-lg md:text-xl text-muted-foreground animate-flicker">
          Welcome to Something Known
        </p>
        <p className="text-sm text-muted-foreground mt-2 opacity-50">
          (أو ربما... لا شيء معروف)
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 container mx-auto px-4 py-12 space-y-20">
        
        {/* Section 1: Vanishing Buttons */}
        <section className="text-center space-y-8 min-h-[200px]">
          <h2 className="text-2xl text-neon-magenta animate-pulse">
            تعليمات غامضة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <WSKVanishButton>
              لا تضغط
            </WSKVanishButton>
            <WSKVanishButton>
              اضغط هنا للفراغ
            </WSKVanishButton>
            <WSKVanishButton>
              زر بلا هدف
            </WSKVanishButton>
          </div>
        </section>

        {/* Section 2: Mystery Text */}
        <section className="text-center space-y-8 min-h-[200px]">
          <h2 className="text-2xl text-neon-cyan animate-slide-chaos">
            أسئلة بلا إجابات
          </h2>
          <WSKMysteryText 
            texts={mysteryTexts}
            interval={4000}
            className="min-h-[100px] flex items-center justify-center"
          />
        </section>

        {/* Section 3: Sound of Void */}
        <section className="text-center space-y-8 min-h-[200px]">
          <h2 className="text-2xl text-blood-red animate-flicker">
            تجربة صوتية
          </h2>
          <WSKSoundVoid />
        </section>

        {/* Section 4: Auto-changing Content */}
        <section className="text-center space-y-8 min-h-[200px]">
          <div 
            className="p-8 border border-neon-magenta rounded-lg transition-all duration-1000"
            style={{
              transform: currentSection % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)',
              borderColor: currentSection % 3 === 0 ? '#00FFFF' : '#FF00FF',
            }}
          >
            <WSKGlitchText 
              text={`قسم متغير #${currentSection + 1}`}
              className="text-xl"
              autoScramble={true}
            />
            <p className="mt-4 text-muted-foreground">
              هذا القسم يتغير كل ٨ ثوانٍ بلا سبب
            </p>
          </div>
        </section>

        {/* Section 5: Nonsense Status */}
        <section className="text-center space-y-4">
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <span className="animate-pulse">الحالة: غير محددة</span>
            <span className="animate-flicker">الهدف: لا يوجد</span>
            <span className="animate-slide-chaos">المعنى: اختياري</span>
          </div>
          <div className="text-xs opacity-30">
            WSK v∞.∞.∞ - لا حقوق محفوظة للفراغ
          </div>
        </section>

      </main>
    </div>
  );
};

export default Index;
