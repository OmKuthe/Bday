import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Gift, ArrowLeft, Crown, Gem, Flower2, Music, Coffee, Camera, Smile, Zap, Shield, Feather } from 'lucide-react';

const Reasons = ({ onNavigate, onMemoryJar }) => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const reasons = [
    {
      id: 1,
      number: "01",
      reason: "Your smile lights up my entire world. It's the first thing I fell for and the last thing I think about before sleep.",
      emoji: "😊"
    },
    {
      id: 2,
      number: "02",
      reason: "The way you laugh it's pure magic. That sound is my favorite melody and it makes everything better instantly.",
      emoji: "😂"
    },
    {
      id: 3,
      number: "03",
      reason: "Your kind heart. You care so deeply about everyone around you, and that compassion makes you incredibly beautiful.",
      emoji: "💕"
    },
    {
      id: 4,
      number: "04",
      reason: "Your intelligence amazes me every day. The way your mind works, your insights, your ideas you inspire me.",
      emoji: "🧠"
    },
    {
      id: 5,
      number: "05",
      reason: "Your strength. You're stronger than you know, facing challenges with grace and courage. You inspire me to be brave.",
      emoji: "💪"
    },
    {
      id: 6,
      number: "06",
      reason: "The way you look at me  those eyes speak a thousand words. When you look at me, I feel truly seen and appreciated.",
      emoji: "👀"
    },
    {
      id: 7,
      number: "07",
      reason: "Your adorable quirks. The way you scrunch your nose, your little dances, your unique expressions I adore every single one.",
      emoji: "✨"
    },
    {
      id: 8,
      number: "08",
      reason: "Your passion. When you care about something, you give it everything. That fire in you is so attractive and inspiring.",
      emoji: "🔥"
    },
    {
      id: 9,
      number: "09",
      reason: "Just being around you makes everything better. Your presence is like sunshine on a cloudy day — warm and comforting.",
      emoji: "🌟"
    },
    {
      id: 10,
      number: "10",
      reason: "Your vulnerability. You trust me enough to show your real self fears, tears, and all. That trust means everything.",
      emoji: "🌙"
    },
    {
      id: 11,
      number: "11",
      reason: "Your creativity. The unique way you see and express yourself is beautiful. You make the ordinary extraordinary.",
      emoji: "🎨"
    },
    {
      id: 12,
      number: "12",
      reason: "The way you remember small details about me. It shows how much you care, and it makes me feel so special.",
      emoji: "📝"
    },
    {
      id: 13,
      number: "13",
      reason: "Your Voice. The sound of your voice is like a soothing melody that calms my soul. I could listen to you talk for hours.",
      emoji: "🤗"
    },
    {
      id: 14,
      number: "14",
      reason: "The way you support my dreams. You believe in me even when I doubt myself. That faith keeps me going.",
      emoji: "💪"
    },
    {
      id: 15,
      number: "15",
      reason: "Your sense of humor. You make me laugh when I'm down and you don't take yourself too seriously.",
      emoji: "😂"
    },
    {
      id: 16,
      number: "16",
      reason: "The way you get excited about small things. Your genuine happiness over little joys is so refreshing.",
      emoji: "🎉"
    },
    {
      id: 17,
      number: "17",
      reason: "Your patience with me. You understand my flaws and still choose to stick around. That means the world.",
      emoji: "🕊️"
    },
    {
      id: 18,
      number: "18",
      reason: "Your honesty. You don't pretend to be someone you're not. What I see is what I get and I like what I see.",
      emoji: "💎"
    },
    {
      id: 19,
      number: "19",
      reason: "The way you challenge me. You push me to be better, think deeper, and grow as a person.",
      emoji: "⚡"
    },
    {
      id: 20,
      number: "20",
      reason: "Your loyalty. Once you care about someone, you're there for them no matter what. That's rare and precious.",
      emoji: "🛡️"
    },
    {
      id: 21,
      number: "21",
      reason: "Being simply you — the most important reason of all. My heart chose you, and it was the best decision ever. Happy 21st Birthday! 🎂",
      emoji: "💖"
    }
  ];

  // Color palette for cards
  const colorPalette = [
    { border: "#FF6B6B", accent: "#FFE66D" },
    { border: "#B980F0", accent: "#FFD93D" },
    { border: "#4ECDC4", accent: "#FF6B6B" },
    { border: "#2ECC71", accent: "#FF8C42" },
    { border: "#FF8C42", accent: "#B980F0" },
    { border: "#FFD93D", accent: "#FF6B9D" },
    { border: "#06AED5", accent: "#FFE66D" },
    { border: "#FF6B9D", accent: "#FFD93D" }
  ];

  // Random rotations for each card - fixed values
  const rotations = [-2, -1.5, -1, 0, 0.5, 1, 1.5, 2, -0.5, 0.8, -1.2, 1.3, -0.8, 0.3, 1.8, -1.8, 1.2, -0.3, 0.7, -1.3, 0.9];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#0a0514] via-[#1a0f2e] to-[#0d0b1a]">
      
      {/* Fixed Background Patterns - Static */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #FF69B4 25%, transparent 25%),
              linear-gradient(-45deg, #FF69B4 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #FF69B4 75%),
              linear-gradient(-45deg, transparent 75%, #FF69B4 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
          }}
        />
      </div>

      {/* Gradient Mesh Overlay - Static */}
      <div className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(255,105,180,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(155,89,182,0.15) 0%, transparent 50%)'
        }}
      />

      {/* Static Background Decorations - No moving emojis at corners */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const decorations = ['⭐', '✨', '💫', '🌸', '🌟'];
          const randomDeco = decorations[Math.floor(Math.random() * decorations.length)];
          return (
            <div
              key={`static-${i}`}
              className="absolute text-lg opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {randomDeco}
            </div>
          );
        })}
      </div>

      {/* Massive Background Text */}
      <div className="fixed top-[10%] left-[-10%] text-[25vw] font-black text-white/5 whitespace-nowrap select-none pointer-events-none"
        style={{ 
          letterSpacing: '0.15em',
          transform: 'rotate(-8deg)',
          fontFamily: 'monospace'
        }}>
        REASONS
      </div>

      {/* Back Button */}
      <div className="relative z-20 pt-6 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('journey')}
            className="text-white/80 hover:text-white transition-all text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
            Back to Journey
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 pb-32">
        
        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            💖
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent animate-gradient"
            style={{
              backgroundSize: '200% auto',
              animation: 'gradient 3s linear infinite'
            }}>
            21 REASONS I LIKE YOU 💖
          </h1>
          <p className="text-pink-200 text-lg md:text-xl max-w-2xl mx-auto">
            One reason for every amazing year — and so many more that don't fit on this page
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(21)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: i * 0.05, repeat: Infinity }}
              >
                <Star size={12} className="text-yellow-400" fill="#FFD700" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Flip Cards Grid - Staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, idx) => {
            const colors = colorPalette[idx % colorPalette.length];
            const rotation = rotations[idx % rotations.length];
            const isFlipped = flippedCards[reason.id] || false;
            const borderStyle = 'solid'; // Fixed border style for consistency

            return (
              <motion.div
                key={reason.id}
                custom={idx}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: idx * 0.08, 
                  duration: 0.5,
                  type: "spring",
                  damping: 15,
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative"
                style={{
                  perspective: '1000px',
                  height: '380px',
                  transform: `rotate(${rotation}deg)`
                }}
              >
                <div
                  className={`relative w-full h-full transition-all duration-500 cursor-pointer`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                  onClick={() => toggleFlip(reason.id)}
                >
                  {/* Card Front */}
                  <div 
                    className="absolute inset-0 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${colors.border}20, ${colors.border}40)`,
                      backdropFilter: 'blur(10px)',
                      border: `3px solid ${colors.border}`,
                      boxShadow: `12px 12px 0px 0px ${colors.border}60`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="absolute -top-2 -right-2 text-2xl opacity-40">✦</div>
                    <div className="absolute -bottom-2 -left-2 text-2xl opacity-40">✦</div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-7xl md:text-8xl font-black mb-4"
                      style={{
                        fontFamily: "'Bungee', 'Impact', cursive",
                        textShadow: `4px 4px 0px ${colors.border}`,
                        background: `linear-gradient(135deg, ${colors.border}, white)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {reason.number}
                    </motion.div>
                    
                    <div className="text-5xl mb-3">{reason.emoji}</div>
                    <p className="text-white/70 text-sm font-mono">click to reveal 💕</p>
                    
                    <div 
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-0.5 rounded-full"
                      style={{ backgroundColor: colors.border }}
                    />
                  </div>

                  {/* Card Back */}
                  <div 
                    className="absolute inset-0 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, #1a0f2e, #0d0b1a)`,
                      border: `3px solid ${colors.border}`,
                      boxShadow: `12px 12px 0px 0px ${colors.border}60`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="absolute -top-2 -right-2 text-2xl opacity-40">💕</div>
                    <div className="absolute -bottom-2 -left-2 text-2xl opacity-40">💕</div>
                    
                    <div className="text-4xl mb-3">{reason.emoji}</div>
                    <p className="text-white text-sm md:text-base leading-relaxed font-sans px-2">
                      {reason.reason}
                    </p>
                    <div className="flex justify-center gap-1 mt-4">
                      <Heart size={14} className="text-pink-400" fill="#F472B6" />
                      <Heart size={14} className="text-pink-400" fill="#F472B6" />
                      <Heart size={14} className="text-pink-400" fill="#F472B6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="text-center mt-16 p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            🎂
          </motion.div>
          <p className="text-white text-xl md:text-2xl leading-relaxed font-medium max-w-3xl mx-auto">
            This list could go on forever... because the reasons I like you grow with every passing day.
            <br />
            <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent mt-3 inline-block">
              Happy 21st Birthday! You mean everything to me. 💕
            </span>
          </p>
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {[...Array(21)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, delay: i * 0.05, repeat: Infinity }}
              >
                <Heart className="text-pink-400" size={16} fill="#F472B6" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continue to Memory Jar Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center mt-12 pb-8"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 0 40px rgba(255,105,180,0.7)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onMemoryJar}
            className="px-12 py-5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-bold text-xl shadow-2xl flex items-center gap-4 mx-auto group relative overflow-hidden"
            style={{
              border: '3px solid #FFE484',
              boxShadow: '15px 15px 0px 0px #ff149370'
            }}
          >
            <span className="relative z-10">🏺 Open the Memory Jar 🏺</span>
            <Gift className="relative z-10 group-hover:rotate-12 transition-transform" size={24} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
          <p className="text-pink-300/60 text-sm mt-4">
            ✨ One last surprise awaits you inside — all our precious memories together ✨
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @media (max-width: 768px) {
          .perspective-1000 {
            height: 360px;
          }
        }
        
        @media (max-width: 640px) {
          .perspective-1000 {
            height: 380px;
          }
        }
      `}</style>
    </div>
  );
};

export default Reasons;