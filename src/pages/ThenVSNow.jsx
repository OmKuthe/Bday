import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';

const ThenVSNow = ({ onNavigate, onLetter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      thenIcon: "🕸️",
      thenTitle: "A Random Beginning",
      thenText: "Just two people at a tech fest. One making a spider web… One standing there doing nothing 😅 A simple line: 'Can you help me with this?' That's all it took.",
      nowIcon: "🌹",
      nowTitle: "A Meaningful Connection",
      nowText: "From that one small moment… to something we never expected. Now it's not just 'help me with this'— it's being there for each other in everything.",
      color: "#FF6B6B",
      bgGradient: "from-rose-500/20 to-orange-500/20"
    },
    {
      id: 2,
      thenIcon: "💬",
      thenTitle: "Unusual Conversations",
      thenText: "Texts that made no sense sometimes. Random teasing. Confusing replies. 'Goldfish has a smol memory 😌' And me wondering what to even say.",
      nowIcon: "💞",
      nowTitle: "Effortless Talking",
      nowText: "Now we don't think before talking. Conversations just… flow. From random texts → to hours of calls. From confusion → to comfort.",
      color: "#4ECDC4",
      bgGradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      id: 3,
      thenIcon: "😅",
      thenTitle: "Silly Moments",
      thenText: "Fake stories like 'I'm from Spain 🇪🇸' and you actually believing it for days. Just fun. Just jokes.",
      nowIcon: "❤️",
      nowTitle: "Real Feelings",
      nowText: "Behind the jokes… real emotions slowly started showing. From laughing at things— to feeling things together.",
      color: "#FFD93D",
      bgGradient: "from-yellow-500/20 to-amber-500/20"
    },
    {
      id: 4,
      thenIcon: "🌙",
      thenTitle: "Late Night Curiosity",
      thenText: "4 AM talks that started out of nowhere. A small debate. A random 'my dear.'",
      nowIcon: "💖",
      nowTitle: "Late Night Comfort",
      nowText: "Now those late nights feel different. Not just talking— but feeling understood. Not just staying awake— but wanting to.",
      color: "#B980F0",
      bgGradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      id: 5,
      thenIcon: "🏜️",
      thenTitle: "The Distance",
      thenText: "The Desert Phase. Unclear feelings. Dry replies. Unspoken confusion. 'Maybe I should step back…'",
      nowIcon: "🤝",
      nowTitle: "Choosing Each Other",
      nowText: "No more distance. No more guessing. Now it's: 'I'm here. And I'm not going anywhere.'",
      color: "#FF8C42",
      bgGradient: "from-orange-500/20 to-red-500/20"
    },
    {
      id: 6,
      thenIcon: "💌",
      thenTitle: "Hidden Feelings",
      thenText: "A small flirt. A hidden 'I like you.' Not fully said. Not fully understood.",
      nowIcon: "💞",
      nowTitle: "Said Out Loud",
      nowText: "No hiding. You know. I know. And somehow… that made everything simpler.",
      color: "#FF6B9D",
      bgGradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      id: 7,
      thenIcon: "🫶",
      thenTitle: "Awkward Firsts",
      thenText: "Holding hands for the first time. A little nervous. A little unsure.",
      nowIcon: "🌹",
      nowTitle: "Natural Us",
      nowText: "Now it feels normal. Comfortable. Like we've always been this way.",
      color: "#2ECC71",
      bgGradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 8,
      thenIcon: "🎁",
      thenTitle: "Little Efforts",
      thenText: "Google Classroom messages. A Christmas video. An email spelling your name. Small things… trying to mean something.",
      nowIcon: "💖",
      nowTitle: "Meaning in Everything",
      nowText: "Now every small thing already means something. A call. A word. Even silence.",
      color: "#3498DB",
      bgGradient: "from-blue-500/20 to-cyan-500/20"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#0e0a1f]">
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${currentSlide?.color}20 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #FF69B420 0%, transparent 50%)`,
          }}
        />
        
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: currentSlide?.color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Decorative stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-sm opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Massive Background Text */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-15%] text-[20vw] font-black text-white/[0.03] whitespace-nowrap select-none rotate-12"
          style={{ letterSpacing: '0.1em', fontFamily: 'monospace' }}>
          THEN ⇄ NOW
        </div>
      </div>

      {/* Header with Back Button */}
      <div className="relative z-30 pt-4 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('memoryjar')}
            className="text-white/80 hover:text-white transition-all text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
            Back to Memory Jar
          </motion.button>
        </div>
      </div>

      {/* Main Slideshow Content - Reduced vertical spacing */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 py-4">
        
        {/* Title - Reduced margin */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl mb-2"
          >
            ⏳
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white"
            style={{
              textShadow: '4px 4px 0 #FF1493, 8px 8px 0 #8A2BE2',
              fontFamily: 'monospace'
            }}>
            THEN ⇄ NOW
          </h1>
          <p className="text-pink-200 text-sm mt-2 max-w-xl mx-auto opacity-80">
            How It Started vs What It Became
          </p>
        </motion.div>

        {/* Slideshow Container - Reduced height */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          >
            <ArrowRight size={20} className="text-white" />
          </button>

          {/* Cards Container - Reduced minHeight */}
          <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: '420px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300, rotateY: direction > 0 ? 15 : -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300, rotateY: direction > 0 ? -15 : 15 }}
                transition={{ duration: 0.5, type: "spring", damping: 25 }}
                className="w-full"
              >
                <div className="grid md:grid-cols-2 gap-5 p-5">
                  
                  {/* THEN Card - Reduced padding */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="relative rounded-2xl overflow-hidden backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${currentSlide.color}15, ${currentSlide.color}05)`,
                      border: `2px solid ${currentSlide.color}60`,
                      boxShadow: `0 15px 30px -10px ${currentSlide.color}80`
                    }}
                  >
                    <div className="p-6 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="text-6xl mb-3"
                      >
                        {currentSlide.thenIcon}
                      </motion.div>
                      
                      <div className="inline-block px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-sm mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentSlide.color }}>
                          THEN
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {currentSlide.thenTitle}
                      </h3>
                      
                      <p className="text-white/80 text-sm md:text-base leading-relaxed">
                        {currentSlide.thenText}
                      </p>
                      
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-4 text-2xl opacity-50"
                      >
                        ⏪
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* NOW Card - Reduced padding */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="relative rounded-2xl overflow-hidden backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${currentSlide.color}25, ${currentSlide.color}10)`,
                      border: `2px solid ${currentSlide.color}80`,
                      boxShadow: `0 15px 30px -10px ${currentSlide.color}90`
                    }}
                  >
                    <div className="p-6 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.3 }}
                        className="text-6xl mb-3"
                      >
                        {currentSlide.nowIcon}
                      </motion.div>
                      
                      <div className="inline-block px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-sm mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentSlide.color }}>
                          NOW
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {currentSlide.nowTitle}
                      </h3>
                      
                      <p className="text-white/90 text-sm md:text-base leading-relaxed">
                        {currentSlide.nowText}
                      </p>
                      
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="mt-4 text-2xl opacity-50"
                      >
                        ⏩
                      </motion.div>
                    </div>
                  </motion.div>
                  
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators - Reduced margin */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className="transition-all"
              >
                <motion.div
                  animate={{
                    width: idx === currentIndex ? 28 : 6,
                    backgroundColor: idx === currentIndex ? currentSlide?.color : 'rgba(255,255,255,0.3)'
                  }}
                  className="h-1.5 rounded-full"
                  style={{ width: idx === currentIndex ? 28 : 6 }}
                />
              </button>
            ))}
          </div>

          {/* Auto-play Controls - Reduced margin */}
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2 transition-all"
            >
              {isAutoPlaying ? (
                <>
                  <Pause size={14} className="text-white" />
                  <span className="text-white text-xs">Pause</span>
                </>
              ) : (
                <>
                  <Play size={14} className="text-white" />
                  <span className="text-white text-xs">Auto-play</span>
                </>
              )}
            </button>
          </div>
        </div>

                {/* Ending Quote - WIDE RECTANGLE with full-width text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-5 max-w-5xl w-full mx-auto"
        >
          <div className="w-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl border-2 border-pink-400/40 p-6">
            <div className="text-3xl mb-2 text-center">✨</div>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              "We didn't change completely… we just grew into something deeper. From 'Then'… to 'Now'— it's still us. Just closer."
            </p>
            <div className="flex justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} size={14} className="text-pink-400 animate-pulse" fill="#F472B6" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Continue Button - Reduced top margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-5 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,105,180,0.7)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onLetter}
            className="px-8 py-3 rounded-full font-black text-lg uppercase tracking-wider flex items-center gap-3 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #FD8BFF 0%, #FF5F6D 40%, #FFD166 100%)',
              border: '3px solid #FFE484',
              boxShadow: '8px 8px 0px #ff149360'
            }}
          >
            <span className="relative z-10">📖 A Letter for you 📖</span>
            <Sparkles className="relative z-10 group-hover:animate-spin" size={20} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
          <p className="text-pink-300/60 text-xs mt-2 text-center">
            ✨ One final surprise ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ThenVSNow;