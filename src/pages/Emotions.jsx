import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Zap, Smile, Frown, Angry, Meh, Shell, ArrowLeft, X } from 'lucide-react';

// Import your character PNGs
import joyImg from '../assets/insideout/Joy.png';
import sadnessImg from '../assets/insideout/sadness.png';
import angerImg from '../assets/insideout/anger.png';
import fearImg from '../assets/insideout/fear.png';
import disgustImg from '../assets/insideout/disgust.png';
import anxietyImg from '../assets/insideout/anxiety.png'; 

const Emotions = ({ onNavigate, onJourney }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const emotionsData = [
    {
      id: 'joy',
      name: 'JOY',
      emoji: '🌟',
      image: joyImg,
      color: '#FFE44D',
      borderColor: '#FF6B35',
      shadowColor: '#FFB800',
      fullDescription: `Joy is the one who shines the brightest almost like she was born to lead.

She's always smiling, always glowing, and honestly… her name literally means joy, so she takes her job very seriously.
She's the reason Khushi laughs at the smallest things, finds happiness in chocolates 🍫 and ice cream 🍦, and loves making things for others.

Joy believes:
"If I can make someone smile today, then everything is worth it."

She dances around the console, making sure Khushi's world feels warm, soft, and full of light.
And that happy face of hers? That's 100% Joy's doing.`
    },
    {
      id: 'sadness',
      name: 'SADNESS',
      emoji: '💙',
      image: sadnessImg,
      color: '#5DADE2',
      borderColor: '#FF85C1',
      shadowColor: '#2E86C1',
      fullDescription: `Sadness sits quietly… but she feels everything deeply.

She's the one who whispers:
"I just want to cry…"

When things don't go right, when emotions get heavy, Sadness gently takes over not to hurt, but to release.
She makes Khushi human. She makes her real.

Just like in Inside Out, Sadness isn't weak—she's necessary.
She allows Khushi to feel, to care, and to connect.`
    },
    {
      id: 'anger',
      name: 'ANGER',
      emoji: '🔥',
      image: angerImg,
      color: '#E74C3C',
      borderColor: '#F4D03F',
      shadowColor: '#C0392B',
      fullDescription: `Anger doesn't show up all the time… but when he does, you'll know.

Especially when Khushi is hungry 😤
Suddenly everything becomes irritating, and Anger storms in like:

"WHY IS EVERYTHING SO ANNOYING RIGHT NOW?!"

He sometimes lets a few not-so-decent words slip out too 🙃
But honestly, he's not bad he just wants things to be right (and maybe wants food immediately).`
    },
    {
      id: 'fear',
      name: 'FEAR',
      emoji: '💜',
      image: fearImg,
      color: '#A569BD',
      borderColor: '#F7DC6F',
      shadowColor: '#6C3483',
      fullDescription: `Fear is always on high alert especially during exams or deadlines.

You'll hear him panicking like:
"Meri padhai nahi hui 😭"
"Mera kya hoga?"
"Main fail ho jaungi!"
"Sir kya bolenge??"
"Project nahi hua!"

He imagines every worst-case scenario possible…
but in his own way, he's just trying to protect Khushi from failure.`
    },
    {
      id: 'anxiety',
      name: 'ANXIETY',
      emoji: '😰',
      image: anxietyImg,
      color: '#FF8C42',
      borderColor: '#FFB347',
      shadowColor: '#E67E22',
      fullDescription: `Anxiety is like Fear… but on fast-forward and overload mode.

When she takes control:
• Khushi feels numb
• Thoughts start racing
• Everything feels urgent at once

She goes:
"Fix everything. Right now. ALL AT ONCE."

But ends up overwhelmed, not knowing where to start.

Anxiety isn't calm or logical she's chaos.
But she exists because Khushi cares deeply about everything.`
    },
    {
      id: 'disgust',
      name: 'DISGUST',
      emoji: '💚',
      image: disgustImg,
      color: '#52BE80',
      borderColor: '#FF5733',
      shadowColor: '#1E8449',
      fullDescription: `Disgust doesn't speak much… but when she does, it's sharp.

She protects Khushi from:
• Things she doesn't like
• Situations that feel "off"
• People or vibes that don't match her energy

She's the one who goes:
"Ugh… no. Just no."

Stylish, picky, and a little savage—but necessary.`
    }
  ];

  const handleContinue = () => {
    if (onJourney) {
      onJourney();
    }
  };

  // Random rotation offsets for 3D card effect
  const getCardStyles = (idx) => {
    const rotations = [-4, 3, -2, 5, -3, 2];
    const yOffsets = [-10, 5, -5, 10, -8, 6];
    return {
      rotate: rotations[idx % rotations.length],
      yOffset: yOffsets[idx % yOffsets.length]
    };
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#1a0033] via-[#2d1b4e] to-[#0e0a1f]">
      
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={() => onNavigate('starting')}
          className="text-white/80 hover:text-white transition-colors text-sm bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 flex items-center gap-1 backdrop-blur-sm"
        >
          <ArrowLeft size={14} />
          Exit
        </button>
      </div>

      {/* Static Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        
        {/* Dot Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 200, 255, 0.3) 1.5px, transparent 1.5px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Static Floating Elements */}
        {[...Array(20)].map((_, i) => {
          const shapes = ['💭', '🌟', '✨', '💫', '🧠', '🎈'];
          const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
          return (
            <div
              key={`static-shape-${i}`}
              className="absolute text-xl md:text-2xl opacity-20"
              style={{
                left: `${5 + (i % 10) * 10}%`,
                top: `${Math.floor(i / 5) * 20 + 10}%`,
              }}
            >
              {randomShape}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-12 px-4 md:px-8">
        
        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Inside Out Khushi's Head Quarters 🧠 
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-pink-200 text-base md:text-lg font-medium"
          >
            Tap any emotion to see what they're really thinking! 🎭
          </motion.p>
        </motion.div>

        {/* Cards Grid - 3D Design */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            
            {emotionsData.map((emotion, idx) => {
              const styles = getCardStyles(idx);
              return (
                <motion.div
                  key={emotion.id}
                  initial={{ opacity: 0, y: 50, rotate: styles.rotate }}
                  animate={{ opacity: 1, y: 0, rotate: styles.rotate }}
                  transition={{ delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 0,
                    y: -15,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onClick={() => setSelectedEmotion(emotion)}
                  className="cursor-pointer"
                  style={{
                    transform: `translateY(${styles.yOffset}px)`,
                  }}
                >
                  <div 
                    className="relative rounded-2xl p-6 transition-all duration-300 h-full backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${emotion.color}20, ${emotion.color}05)`,
                      border: `3px solid ${emotion.borderColor}`,
                      boxShadow: hoveredCard === idx 
                        ? `15px 15px 0px 0px ${emotion.shadowColor}, 0 20px 40px rgba(0,0,0,0.4)` 
                        : `10px 10px 0px 0px ${emotion.shadowColor}, 0 10px 20px rgba(0,0,0,0.3)`,
                    }}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Glow effect on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${emotion.color}40, transparent 70%)`,
                      }}
                    />

                    {/* Character Image */}
                    <div className="flex justify-center mb-4 relative">
                      <div 
                        className="absolute inset-0 rounded-full blur-2xl opacity-50 transition-opacity"
                        style={{ background: emotion.color }}
                      />
                      <img
                        src={emotion.image}
                        alt={emotion.name}
                        className="w-36 h-36 md:w-44 md:h-44 object-contain drop-shadow-2xl relative z-10 transition-transform duration-300"
                        style={{
                          filter: hoveredCard === idx ? 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' : 'none'
                        }}
                      />
                    </div>

                    {/* Emotion Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{emotion.emoji}</span>
                        <h2 
                          className="text-xl md:text-2xl font-black tracking-tighter"
                          style={{ color: emotion.color, textShadow: `2px 2px 0px ${emotion.shadowColor}` }}
                        >
                          {emotion.name}
                        </h2>
                      </div>
                      <motion.div
                        animate={{ rotate: hoveredCard === idx ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {emotion.id === 'joy' && <Smile size={24} style={{ color: emotion.color }} />}
                        {emotion.id === 'sadness' && <Frown size={24} style={{ color: emotion.color }} />}
                        {emotion.id === 'anger' && <Angry size={24} style={{ color: emotion.color }} />}
                        {emotion.id === 'fear' && <Meh size={24} style={{ color: emotion.color }} />}
                        {emotion.id === 'anxiety' && <Zap size={24} style={{ color: emotion.color }} />}
                        {emotion.id === 'disgust' && <Shell size={24} style={{ color: emotion.color }} />}
                      </motion.div>
                    </div>

                    {/* Preview Text */}
                    <div className="mt-3">
                      <p className="text-white/70 text-xs md:text-sm line-clamp-2">
                        {emotion.fullDescription.split('\n\n')[0].substring(0, 100)}...
                      </p>
                    </div>

                    {/* Tap to Read More Badge */}
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-white/10 backdrop-blur-sm">
                        👆 Tap to read more
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute -top-2 -right-2 text-xl opacity-40">✦</div>
                    <div className="absolute -bottom-2 -left-2 text-xl opacity-40">✦</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12 pb-8"
        >
          <motion.button
            onClick={handleContinue}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255,105,180,0.6)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full font-bold text-lg uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white shadow-2xl flex items-center gap-3 group"
          >
            <span>Continue the Journey</span>
            <Heart className="group-hover:animate-pulse" size={18} fill="white" />
            <Sparkles size={18} className="group-hover:animate-spin" />
          </motion.button>
        </motion.div>
      </div>

      {/* Modal Popup for Emotion Details - Smaller size */}
      <AnimatePresence>
        {selectedEmotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEmotion(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-2xl p-5"
              style={{
                background: `linear-gradient(135deg, ${selectedEmotion.color}30, ${selectedEmotion.color}10)`,
                border: `3px solid ${selectedEmotion.borderColor}`,
                backdropFilter: 'blur(20px)',
                boxShadow: `15px 15px 0px 0px ${selectedEmotion.shadowColor}`
              }}
            >
              {/* Circular Back Button */}
              <button
                onClick={() => setSelectedEmotion(null)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-black/80 hover:bg-black transition-all duration-200 flex items-center justify-center shadow-lg z-20 border-2 border-white/30"
                style={{
                  boxShadow: `0 0 10px ${selectedEmotion.color}`
                }}
              >
                <X size={18} className="text-white" />
              </button>

              {/* Modal Content - Smaller */}
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <img
                    src={selectedEmotion.image}
                    alt={selectedEmotion.name}
                    className="w-32 h-32 md:w-36 md:h-36 object-contain mx-auto mb-3 relative z-10"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-3xl">{selectedEmotion.emoji}</span>
                  <h2 
                    className="text-2xl md:text-3xl font-black"
                    style={{ color: selectedEmotion.color, textShadow: `2px 2px 0px ${selectedEmotion.shadowColor}` }}
                  >
                    {selectedEmotion.name}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content - Smaller text */}
              <div 
                className="max-h-[40vh] overflow-y-auto custom-scroll px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="whitespace-pre-wrap text-white/90 text-sm md:text-base leading-relaxed space-y-3">
                  {selectedEmotion.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Footer Note - Smaller */}
              <div className="mt-4 pt-3 border-t border-white/20 text-center">
                <p className="text-pink-300 italic text-xs">
                  "And together… these emotions don't just control Khushi…<br/>
                  they are Khushi.<br/>
                  A little joy, a little sadness, some chaos, some fire—<br/>
                  but always… beautifully real."
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Hide scrollbar for all elements */
        .custom-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .custom-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
};

export default Emotions;