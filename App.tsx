import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ChevronDown } from 'lucide-react';

import { MusicPlayer } from './components/MusicPlayer';
import { FloatingParticles } from './components/FloatingParticles';
import { Envelope } from './components/Envelope';
import { Timeline } from './components/Timeline';
import { AppPhase } from './types';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [noBtnState, setNoBtnState] = useState(0); // 0: Initial, 1: Sure?, 2: Really?, 3: Replaced
  const [showTimeline, setShowTimeline] = useState(false);

  // Flow control
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'intro') {
      timeout = setTimeout(() => setPhase('buildup-1'), 4500);
    } else if (phase === 'buildup-1') {
      timeout = setTimeout(() => setPhase('buildup-2'), 4000);
    } else if (phase === 'buildup-2') {
      timeout = setTimeout(() => setPhase('question'), 4000);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  const handleYes = () => {
    setPhase('accepted');
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffc0cb', '#ff69b4', '#e60073']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffc0cb', '#ff69b4', '#e60073']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleNo = () => {
    if (noBtnState < 2) {
      setNoBtnState(prev => prev + 1);
    } else {
      setNoBtnState(3);
      // Removed transition to rejected state
    }
  };

  const handleEnvelopeOpen = () => {
     // Delay showing the scroll indicator slightly to let the animation finish
     setTimeout(() => setShowTimeline(true), 800);
  };

  const getNoButtonText = () => {
    switch (noBtnState) {
      case 0: return "Let me think...";
      case 1: return "Are you sure?";
      case 2: return "Really sure?";
      default: return "";
    }
  };

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-[2000ms] ${phase === 'accepted' ? 'bg-gradient-to-br from-rose-900 via-pink-900 to-slate-900 overflow-y-auto h-auto' : 'bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-slate-950 overflow-hidden h-screen'} flex flex-col items-center`}>
      
      <MusicPlayer />
      <FloatingParticles />

      {/* Main Content Area */}
      <div className={`z-10 w-full max-w-4xl flex flex-col items-center justify-center transition-all duration-1000 ${phase === 'accepted' ? 'pt-20 pb-10 min-h-[90vh]' : 'h-screen'}`}>
        <AnimatePresence mode="wait">
          
          {/* Phase: Intro */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 1.5 }}
              className="space-y-6 text-center px-4"
            >
              <h1 className="font-serif text-3xl md:text-5xl text-rose-100/90 leading-tight italic tracking-wide">
                “Some questions don’t need courage… <br/> they need honesty.”
              </h1>
            </motion.div>
          )}

          {/* Phase: Build Up 1 */}
          {phase === 'buildup-1' && (
            <motion.div
              key="buildup1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
              transition={{ duration: 1.5 }}
              className="space-y-4 text-center px-4"
            >
              <Heart className="w-12 h-12 text-rose-500 mx-auto animate-pulse-slow drop-shadow-lg" fill="currentColor" />
              <p className="font-cursive text-4xl md:text-6xl text-rose-blush drop-shadow-md">
                Every moment feels warmer <br/> when it’s you.
              </p>
            </motion.div>
          )}

          {/* Phase: Build Up 2 */}
          {phase === 'buildup-2' && (
            <motion.div
              key="buildup2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
              transition={{ duration: 1.5 }}
              className="space-y-4 text-center px-4"
            >
              <div className="flex gap-4 justify-center">
                 <Heart className="w-8 h-8 text-rose-400 animate-bounce" fill="currentColor" />
                 <Heart className="w-8 h-8 text-rose-400 animate-bounce delay-100" fill="currentColor" />
              </div>
              <p className="font-cursive text-4xl md:text-6xl text-rose-blush drop-shadow-md">
                Every smile feels complete <br/> when you’re near.
              </p>
            </motion.div>
          )}

          {/* Phase: Question & Actions */}
          {phase === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-2xl space-y-12 text-center px-4"
            >
              <h2 className="font-serif text-3xl md:text-5xl text-ivory leading-relaxed drop-shadow-xl">
                If I held out my hand… <br />
                <span className="font-cursive text-rose-gold text-5xl md:text-7xl block mt-4">
                  would you walk into February with me?
                </span>
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-8 min-h-[100px]">
                {/* Yes Button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(225, 29, 72, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className={`
                    bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-sans font-semibold shadow-lg border border-rose-400 transition-all duration-500 flex items-center gap-2 group cursor-pointer
                    ${noBtnState === 3 ? 'px-16 py-8 text-3xl md:text-5xl shadow-[0_0_50px_rgba(225,29,72,0.8)]' : 'px-8 py-4 text-lg md:text-xl'}
                  `}
                >
                  <span>I already am</span>
                  <Heart className={`${noBtnState === 3 ? 'w-12 h-12' : 'w-5 h-5'} transition-all duration-500 group-hover:animate-ping`} fill="currentColor" />
                </motion.button>

                {/* No Button */}
                {noBtnState < 3 && (
                   <motion.button
                    initial={{ x: 0 }}
                    animate={noBtnState > 0 ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    whileHover={{ scale: 0.95, opacity: 0.8 }}
                    onClick={handleNo}
                    className="px-8 py-4 bg-transparent border-2 border-rose-200/30 text-rose-200 rounded-full font-sans font-medium text-lg md:text-xl hover:bg-rose-900/30 hover:border-rose-200/50 transition-all duration-300 backdrop-blur-sm cursor-pointer whitespace-nowrap"
                   >
                     {getNoButtonText()}
                   </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Phase: Accepted */}
          {phase === 'accepted' && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center px-4 flex flex-col items-center"
            >
              <h2 className="font-cursive text-4xl md:text-6xl text-rose-100 drop-shadow-[0_0_15px_rgba(255,105,180,0.5)]">
                You just made my heart <br/> choose forever 💕
              </h2>
              
              <Envelope onOpen={handleEnvelopeOpen} />

              {showTimeline && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-10 animate-bounce text-rose-200/50"
                >
                  <ChevronDown className="w-8 h-8 mx-auto" />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Phase: Rejected - Kept in code but unreachable via new logic */}
          {phase === 'rejected' && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-6 text-center px-4"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-rose-200/80 italic">
                Patience is the quietest form of love.
              </h2>
              <p className="font-cursive text-2xl text-rose-400">
                I'm not going anywhere.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Render Timeline Below */}
      {phase === 'accepted' && showTimeline && (
        <div className="w-full z-10 pb-20">
          <Timeline />
        </div>
      )}

      {/* Footer Text */}
      <AnimatePresence>
        {(phase === 'question' || phase === 'rejected') && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2, duration: 2 }}
             className="fixed bottom-8 left-0 right-0 text-center z-0 pointer-events-none"
          >
             <p className="text-rose-100/40 font-serif text-sm md:text-base tracking-widest uppercase">
               No matter the answer… you’re already special to me.
             </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;