import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EnvelopeProps {
  onOpen?: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullView, setIsFullView] = useState(false);

  const handleEnvelopeClick = (e: React.MouseEvent) => {
    if (isFullView) return; 
    
    if (!isOpen) {
      setIsOpen(true);
      if (onOpen) onOpen();
    } else {
      // If already open, clicking the envelope closes it (slides back in)
      setIsOpen(false);
    }
  };

  const handleLetterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling to envelope handler
    if (isFullView) return;

    if (isOpen) {
      setIsFullView(true);
    } else {
      // If clicked while closed (through the transparent/pointer-events-none front), open it
      setIsOpen(true);
      if (onOpen) onOpen();
    }
  };

  const closeFullView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullView(false);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        className="relative w-72 h-48 md:w-80 md:h-52 cursor-pointer group perspective-1000 z-20"
        onClick={handleEnvelopeClick}
      >
        <div className="relative w-full h-full transition-transform duration-700 transform-style-3d">
          
          {/* Envelope Back */}
          <div className="absolute inset-0 bg-rose-100 rounded-lg shadow-2xl flex items-center justify-center z-10 overflow-hidden border-2 border-rose-200">
             <div className="text-rose-900/20 font-cursive text-6xl select-none">For You</div>
          </div>

          {/* Letter Inside (Slides up) */}
          <motion.div 
            className="absolute left-4 right-4 bg-white p-6 shadow-md rounded z-20 flex flex-col items-center border border-rose-100"
            initial={{ y: 0 }}
            animate={{ 
              y: isOpen ? -140 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ height: '90%' }}
            onClick={handleLetterClick}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-2 overflow-hidden pointer-events-none">
              <p className="font-cursive text-2xl text-rose-800">My Dearest,</p>
              <p className="font-serif text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                Walking into February with you is my favorite adventure. Click to read more...
              </p>
              <div className="text-rose-500 text-lg mt-1">Forever Yours ❤️</div>
            </div>
          </motion.div>

          {/* Flap (Animated) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-rose-200 origin-top z-40 rounded-t-lg shadow-sm border-t-2 border-rose-300"
            animate={{ 
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 10 : 40
            }}
            transition={{ duration: 0.6 }}
            style={{ 
              transformStyle: 'preserve-3d',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)' 
            }}
          />

          {/* Envelope Front (Pocket) */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-rose-50 rounded-b-lg z-30 border-t border-rose-200 shadow-inner flex items-center justify-center pointer-events-none">
              {!isOpen && <span className="text-4xl animate-bounce">💌</span>}
          </div>
        </div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-rose-200/60 font-serif text-sm italic"
      >
        {isOpen ? "Tap the letter to read it..." : "Tap to open"}
      </motion.p>

      {/* Full Screen Letter Modal */}
      <AnimatePresence>
        {isFullView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closeFullView}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-[#fffdf7] w-full max-w-lg p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()} 
              style={{
                backgroundImage: 'radial-gradient(#f0e6d2 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <button 
                onClick={closeFullView}
                className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6 text-center">
                <h2 className="font-cursive text-4xl text-rose-800 mb-6 border-b-2 border-rose-100 pb-4 inline-block">
                  My Dearest Valentine
                </h2>
                
                <div className="font-serif text-gray-700 space-y-4 text-lg leading-relaxed text-left">
                  <p>
                    From the moment our paths crossed, my world has been brighter. Every smile you share, every laugh we create together, adds a new color to my life.
                  </p>
                  <p>
                    Asking you to be my Valentine isn't just about a single day in February. It's about wanting to hold your hand through all the days that follow.
                  </p>
                  <p>
                    You are my favorite thought, my happiest moment, and my most beautiful adventure.
                  </p>
                </div>

                <div className="pt-8 text-right">
                  <p className="font-cursive text-3xl text-rose-600 transform -rotate-2 inline-block">
                    With all my love, <br/> Me ❤️
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};