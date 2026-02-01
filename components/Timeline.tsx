import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Coffee, Star, Sparkles, Camera, MapPin, Music, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TimelineEvent } from '../types';

/* 
  =============================================================================
  HOW TO ADD YOUR OWN PHOTOS:
  =============================================================================
  1. Create a folder named 'images' inside your project's 'public' folder.
  2. Copy your downloaded photos into that folder.
  3. Rename them to simple names (e.g., 'meeting-1.jpg', 'trip-2.png').
  4. Update the 'image' and 'gallery' fields below to point to your files.
     
     Example:
     image: "/images/my-photo.jpg",
     gallery: [
       "/images/photo-1.jpg",
       "/images/photo-2.jpg"
     ]
  =============================================================================
*/

// Data configuration
const timelineData: TimelineEvent[] = [
  {
    date: "The Beginning",
    title: "When We Met",
    description: "I am forever grateful to the moment when Riya helped us meet each other and it was lovely. me talking in english was not tho..",
    // Replace the link below with your local file, e.g., "/images/meeting-cover.jpg"
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=400", 
    gallery: [
      // Add your downloaded photos here:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800", // e.g. "/images/meet-1.jpg"
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800", // e.g. "/images/meet-2.jpg"
      "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?auto=format&fit=crop&q=80&w=800", 
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Star className="w-5 h-5 text-white" />
  },
  {
    date: "Chapter One",
    title: "First ever Dates",
    description: "My first ever date and the best date was with you.such a good experience was given to me that i can never forget it. and then we went on so many more dates",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515442261605-65987783cb6a?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Coffee className="w-5 h-5 text-white" />
  },
  {
    date: "Adventure",
    title: "Our Trips to Ooty and Mumbai",
    description: "We went to OOty together and it was sooooooooo good that i cant even tell you. itna maza aaya na mujhe. going there w the love of my life. and then Mumbai bhi. living together as husband and wife where i made the breakfast sob sob. but i loved every moment w u babyyyy.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <MapPin className="w-5 h-5 text-white" />
  },
  {
    date: "Cute",
    title: "Making Memories",
    description: "Every laugh, every trip, and every quiet moment shared has led us here.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Calendar className="w-5 h-5 text-white" />
  },
  {
    date: "Silly Moments",
    title: "Just our Bakchodi",
    description: "Being weird together is my favorite thing.Naraz aap thoda jldi ho jaate ho but it works out well always.",
    image: "https://images.unsplash.com/photo-1516238840914-94dfc0c873ae?auto=format&fit=crop&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1516238840914-94dfc0c873ae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531747056595-07f6cbbe10fd?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Camera className="w-5 h-5 text-white" />
  },
  {
    date: "Forever",
    title: "Future Experiences",
    description: "To many more months, years, and Valentines together.",
    image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&q=80&w=800"
    ],
    icon: <Sparkles className="w-5 h-5 text-white" />
  }
];

// Animation variants for the slide
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Timeline: React.FC = () => {
  const [showLove, setShowLove] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const openGallery = (event: TimelineEvent) => {
    if (event.gallery && event.gallery.length > 0) {
      setSelectedEvent(event);
      setCurrentImageIndex(0);
      setDirection(0);
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto'; // Re-enable scroll
  };

  const paginate = (newDirection: number) => {
    if (!selectedEvent?.gallery) return;
    
    setDirection(newDirection);
    setCurrentImageIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = selectedEvent.gallery!.length - 1;
      if (nextIndex >= selectedEvent.gallery!.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedEvent) return;
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent]);

  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <div className="relative">
        
        {/* Dark Curved Burgundy Line Background */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none hidden md:block z-0">
          <svg className="w-full h-full" preserveAspectRatio="none">
             <path 
               d="M 50% 0 
                  Q 52% 10%, 50% 20%
                  T 50% 40%
                  T 50% 60%
                  T 50% 80%
                  T 50% 100%"
               fill="none" 
               stroke="url(#burgundyGradient)" 
               strokeWidth="4" 
               strokeLinecap="round"
               strokeDasharray="12, 0"
             />
             <defs>
               <linearGradient id="burgundyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#4a0e1c" stopOpacity="0.4" />
                 <stop offset="50%" stopColor="#6d1629" stopOpacity="1" />
                 <stop offset="100%" stopColor="#4a0e1c" stopOpacity="0.4" />
               </linearGradient>
             </defs>
          </svg>
        </div>

        {/* Mobile simple straight line */}
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-burgundy-900 via-rose-700 to-burgundy-900 opacity-60 md:hidden" />

        <div className="space-y-32">
          {timelineData.map((event, index) => (
            <TimelineItem 
              key={index} 
              event={event} 
              index={index} 
              onOpenGallery={() => openGallery(event)}
            />
          ))}
        </div>
        
        {/* Final Interaction */}
        <div className="pt-32 pb-12 text-center relative z-20">
            <AnimatePresence mode="wait">
              {!showLove ? (
                <motion.div
                     key="heart"
                     initial={{ scale: 0, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     whileHover={{ scale: 1.2, rotate: 10 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     onClick={() => setShowLove(true)}
                     className="cursor-pointer inline-block"
                >
                    <Heart className="w-20 h-20 text-rose-500 mx-auto fill-rose-500 animate-pulse drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]" />
                    <p className="text-rose-200 mt-4 font-cursive text-xl animate-bounce">Click me</p>
                </motion.div>
              ) : (
                <motion.div
                    key="message"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                >
                    <h1 className="font-cursive text-6xl md:text-8xl text-rose-500 drop-shadow-2xl">
                      I Love You ❤️
                    </h1>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence initial={false} custom={direction}>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Background: Translucent burgundy with blur
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/40 backdrop-blur-xl"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
              onClick={closeGallery}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Left */}
            <button 
              className="absolute left-4 z-40 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block"
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Navigation Right */}
            <button 
              className="absolute right-4 z-40 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block"
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Main Image Slider */}
            <div 
              className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentImageIndex}
                  src={selectedEvent.gallery![currentImageIndex]}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                  alt={`Gallery image ${currentImageIndex + 1}`}
                />
              </AnimatePresence>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                 <div className="inline-block bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                   <p className="text-white font-cursive text-2xl tracking-wide">
                     {selectedEvent.title}
                   </p>
                   <div className="flex justify-center gap-2 mt-2">
                     {selectedEvent.gallery!.map((_, idx) => (
                       <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-rose-500 w-4' : 'bg-white/30'}`}
                       />
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  onOpenGallery: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, onOpenGallery }) => {
  const isEven = index % 2 === 0;
  const hasGallery = event.gallery && event.gallery.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Spacer for desktop alignment */}
      <div className="w-full md:w-5/12 hidden md:block" />

      {/* Center Node */}
      <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-rose-500 border-4 border-rose-900 shadow-[0_0_20px_rgba(244,63,94,0.6)] z-10 -ml-6 md:ml-0">
        {event.icon}
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
        <div 
          onClick={hasGallery ? onOpenGallery : undefined}
          className={`
            group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 
            transition-all duration-300 shadow-xl overflow-hidden hover:bg-white/10
            ${hasGallery ? 'cursor-pointer hover:border-rose-400 hover:shadow-[0_0_25px_rgba(244,63,94,0.4)]' : 'hover:border-rose-400/50'}
          `}
        >
          {/* Image Section */}
          <div className="h-48 w-full overflow-hidden relative">
             <img 
               src={event.image} 
               alt={event.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-rose-900/90 to-transparent" />
             
             {/* Gallery indicator */}
             {hasGallery && (
               <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
                 <Camera className="w-4 h-4 text-white" />
               </div>
             )}
          </div>

          {/* Text Section */}
          <div className="p-6 relative -mt-12">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-rose-200 uppercase bg-rose-950/80 rounded-full border border-rose-500/30">
              {event.date}
            </span>
            <h3 className="text-2xl font-cursive text-white mb-2 drop-shadow-md group-hover:text-rose-300 transition-colors">
              {event.title}
            </h3>
            <p className="text-rose-100/80 font-sans text-sm leading-relaxed">
              {event.description}
            </p>
            {hasGallery && (
              <p className="mt-3 text-xs text-rose-400 uppercase tracking-widest font-semibold flex items-center gap-1 justify-end md:justify-start">
                <Sparkles className="w-3 h-3" /> Tap to view gallery
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};