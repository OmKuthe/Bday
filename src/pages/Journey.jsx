import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Calendar, MapPin, Camera, ArrowLeft, Sparkles, Star, Compass, Gift, Music, Coffee, Sun, Moon, Zap, Image } from 'lucide-react';

// Import journey images from your assets folder
import chapter1Img from '../assets/journey/1.png';
import chapter2Img from '../assets/journey/2.png';
import chapter3Img from '../assets/journey/3.png';
import chapter4Img from '../assets/journey/4.png';
import chapter5Img from '../assets/journey/5.png';
import chapter6Img from '../assets/journey/6.png';
import chapter7Img from '../assets/journey/7.png';
import chapter8Img from '../assets/journey/8.png';
import chapter9Img from '../assets/journey/9.png';

const Journey = ({ onNavigate, onGames }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Journey Milestones Data with your new content and images
  const milestones = [
    {
      id: 1,
      title: "🌐 Chapter 1: The Beginning — ItechRoots '25",
      description: "It wasn't dramatic. It wasn't planned. It was just… a simple moment.",
      fullStory: `You were working on a spider web decoration, focused, figuring things out.
And I was just standing there… doing absolutely nothing useful 😅

Then you looked at me and said:
"Can you help me with this?"

And just like that…
a random moment turned into our first real conversation.

That was the start.
Not loud. Not cinematic.
But real.`,
      emoji: "🌐",
      color: "#FF6B6B",
      borderColor: "#FFE66D",
      shadowColor: "#FF8E8E",
      image: chapter1Img
    },
    {
      id: 2,
      title: "💬 Chapter 2: The Texts That Weren't Normal",
      description: "You didn't text like normal people. Your messages were… different.",
      fullStory: `Sometimes random, sometimes teasing, sometimes confusing—but always interesting.

"I was thinking… I should tease you a bit."
"You know goldfish has a smol memory 😌"

And I'd just sit there thinking:
"What am I even supposed to reply to this?"

But somehow… I always wanted to.`,
      emoji: "💬",
      color: "#4ECDC4",
      borderColor: "#FFE66D",
      shadowColor: "#6EE7DE",
      image: chapter2Img
    },
    {
      id: 3,
      title: "🇪🇸 Chapter 3: The Spain Lie 😭",
      description: "Then came the legendary prank. I told you… I was from Spain 🇪🇸",
      fullStory: `And you believed it.
Not for 5 minutes.
Not for 1 hour.

For 2–3 whole days.

When I finally told you the truth…
you just went completely silent.

Numb. Shocked.

Like:
"How did I even believe this??"

That moment?
Unforgettable 😂`,
      emoji: "🇪🇸",
      color: "#FFD93D",
      borderColor: "#FF6B6B",
      shadowColor: "#FFE380",
      image: chapter3Img
    },
    {
      id: 4,
      title: "🌙 Chapter 4: 4 AM Talks",
      description: "Somewhere along the way… texts turned into late-night conversations.",
      fullStory: `Then into 4 AM talks.

We had our first small debate.
Our first real disagreement.

And also… the first time I called you:
"my dear"

That's when something shifted.

We weren't just talking anymore…
we liked talking to each other.`,
      emoji: "🌙",
      color: "#B980F0",
      borderColor: "#FFD93D",
      shadowColor: "#D4A5FF",
      image: chapter4Img
    },
    {
      id: 5,
      title: "🏜️ Chapter 5: The Desert Phase",
      description: "Then came the phase we both remember… The Desert Phase.",
      fullStory: `I hinted that I might like you.
You didn't really respond to it.

And I thought:
"If she's not reciprocating… maybe I should step back."

So I did.

You still texted.
But I replied… dry. Distant.

Something that once felt full…
suddenly felt empty.`,
      emoji: "🏜️",
      color: "#FF8C42",
      borderColor: "#B980F0",
      shadowColor: "#FFA559",
      image: chapter5Img
    },
    {
      id: 6,
      title: "☎️ Chapter 6: The Call That Changed Everything",
      description: "Then one day… you weren't well. I called you.",
      fullStory: `You sounded soft… quiet… and those red cheeks of yours 🥹

And in that moment, I decided:
"I don't care what happens… I'm not losing this."

Slowly… everything came back.

Texts → Calls
Calls → Hours
Hours → Us`,
      emoji: "☎️",
      color: "#FF6B9D",
      borderColor: "#4ECDC4",
      shadowColor: "#FF8DBD",
      image: chapter6Img
    },
    {
      id: 7,
      title: "❤️ Chapter 7: Saying It Out Loud",
      description: "It didn't happen in a dramatic way. Just a joke… a small flirt…",
      fullStory: `And hidden inside it—
"I like you."

Later you asked:
"Do you like me?"

And this time… I didn't hide.
"Yes."

You panicked a little…
Not because you didn't care—
but because you did.

You said:
"I like this… being liked by you."

And slowly…
you started liking it more than just a little.`,
      emoji: "❤️",
      color: "#FF6B6B",
      borderColor: "#FFE66D",
      shadowColor: "#FF8E8E",
      image: chapter7Img
    },
    {
      id: 8,
      title: "💞 Chapter 8: From Us… to Us",
      description: "We got closer. Late-night calls. Long conversations.",
      fullStory: `Little fights.
And even stronger bonds.

Then one day…
you said it.

You like me too.

And just like that…
we stepped into something new.

Not rushed.
Not forced.

Just… natural.`,
      emoji: "💞",
      color: "#4ECDC4",
      borderColor: "#FFE66D",
      shadowColor: "#6EE7DE",
      image: chapter8Img
    },
    {
      id: 9,
      title: "🌹 Chapter 9: Our First Date",
      description: "And then came our first date. A letter. A flower.",
      fullStory: `And two people… a little shy, a little excited.

We held hands.
We smiled.
We just… enjoyed being there.

No overthinking.
No complications.

Just us.`,
      emoji: "🌹",
      color: "#FFD93D",
      borderColor: "#FF6B6B",
      shadowColor: "#FFE380",
      image: chapter9Img
    }
  ];

  const colorPalette = [
    { main: "#FF6B6B", light: "#FFE6E6" },
    { main: "#4ECDC4", light: "#E0F7F5" },
    { main: "#FFD93D", light: "#FFF5D9" },
    { main: "#B980F0", light: "#F0E4FF" },
    { main: "#FF8C42", light: "#FFE8D9" },
    { main: "#FF6B9D", light: "#FFE6F0" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#0a0514] via-[#1a0f2e] to-[#0d0b1a]">
      
      {/* No Navbar - Removed completely */}
      
      {/* Animated Background Patterns */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Dot Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 100, 200, 0.3) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Diagonal Stripes */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'repeating-linear-gradient(45deg, rgba(255, 200, 255, 0.1) 0px, rgba(255, 200, 255, 0.1) 3px, transparent 3px, transparent 15px)'
          }}
        />
      </div>

      {/* Massive Background Text */}
      <div className="fixed top-[10%] left-[-10%] text-[25vw] font-black text-white/5 whitespace-nowrap select-none pointer-events-none"
        style={{ 
          letterSpacing: '0.1em',
          transform: 'rotate(-8deg)',
          fontFamily: 'monospace'
        }}>
        MEMORIES
      </div>

      {/* Floating Decorations - Fixed circular motion */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => {
          const decorations = ['⭐', '✨', '💫', '🌍', '🗺️', '💕', '🎵', '📸', '💭', '🎈', '🎀', '🌟', '⚡', '💖'];
          const randomDeco = decorations[Math.floor(Math.random() * decorations.length)];
          // Calculate circular position
          const angle = (i / 40) * Math.PI * 2;
          const radius = Math.random() * 300 + 100;
          return (
            <motion.div
              key={`float-${i}`}
              className="absolute text-xl md:text-2xl"
              initial={{ 
                left: `${50 + Math.cos(angle) * (radius / window.innerWidth * 100)}%`,
                top: `${50 + Math.sin(angle) * (radius / window.innerHeight * 100)}%`,
                opacity: 0.15 + Math.random() * 0.3
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
              }}
            >
              {randomDeco}
            </motion.div>
          );
        })}
      </div>

      {/* Hero Section with Back Button (moved inside hero) */}
      <div className="relative z-10 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('emotions')}
            className="text-white/80 hover:text-white transition-all text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2 backdrop-blur-sm mb-8"
          >
            <ArrowLeft size={16} />
            Back to Emotions
          </motion.button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6"
            style={{
              textShadow: '6px 6px 0 #FF1493, 12px 12px 0 #8A2BE2, 18px 18px 0 #FFD700',
              color: '#FFF5F5'
            }}>
            OUR JOURNEY ✨
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-pink-200 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Every step, every laugh, every heartbeat - our story in moments
          </motion.p>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-32">
        {/* Vertical Connecting Line */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-yellow-500 rounded-full"
          style={{ 
            boxShadow: '0 0 20px rgba(255,105,180,0.5)',
            background: 'linear-gradient(180deg, #FF6B6B 0%, #B980F0 50%, #FFD93D 100%)'
          }} 
        />
        
        {/* Mobile Connecting Line */}
        <div className="lg:hidden absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-yellow-500 rounded-full" />

        {milestones.map((milestone, idx) => {
          const isEven = idx % 2 === 0;
          const colors = colorPalette[idx % colorPalette.length];
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, type: "spring" }}
              onMouseEnter={() => setHoveredCard(milestone.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative mb-16 lg:mb-24 ${
                isEven ? 'lg:pr-[50%] lg:text-right' : 'lg:pl-[50%] lg:text-left'
              }`}
            >
              {/* Timeline Node */}
              <motion.div 
                className="absolute top-0 left-8 lg:left-1/2 transform lg:-translate-x-1/2 z-20"
                animate={{ 
                  scale: hoveredCard === milestone.id ? 1.3 : 1,
                  rotate: hoveredCard === milestone.id ? 360 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4"
                  style={{
                    backgroundColor: colors.main,
                    borderColor: '#FFE66D',
                    boxShadow: `0 0 0 4px ${colors.main}40, 0 10px 20px rgba(0,0,0,0.3)`
                  }}
                >
                  <span className="text-3xl">{milestone.emoji}</span>
                </div>
              </motion.div>

              {/* Connecting Line to Node */}
              <div className="absolute top-8 left-24 lg:hidden w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500" />
              <div className="hidden lg:block absolute top-8 left-1/2 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                style={{ 
                  transform: isEven ? 'translateX(-100%)' : 'translateX(0)',
                  left: isEven ? 'calc(50% - 8px)' : 'calc(50% + 8px)'
                }} 
              />

              {/* Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotate: isEven ? -1 : 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`relative ml-24 lg:ml-0 ${
                  isEven ? 'lg:mr-8' : 'lg:ml-8'
                }`}
              >
                <div 
                  className="relative rounded-3xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300"
                  style={{
                    backgroundColor: `${colors.main}15`,
                    border: `3px solid ${colors.main}`,
                    boxShadow: `12px 12px 0px 0px ${colors.main}80, 20px 20px 40px rgba(0,0,0,0.3)`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Decorative Corner Icons */}
                  <div className="absolute -top-4 -right-4 text-3xl opacity-60">✦</div>
                  <div className="absolute -bottom-4 -left-4 text-3xl opacity-60">✦</div>
                  
                  {/* Chapter Number */}
                  <div className="flex items-center gap-3 mb-4" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: `${colors.main}40` }}
                    >
                      <span className="text-sm font-bold" style={{ color: colors.main }}>#{idx + 1}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
                    {milestone.title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  {/* Image Section - Now with actual images */}
                  <div 
                    className="rounded-xl mb-4 overflow-hidden"
                    style={{
                      backgroundColor: `${colors.main}20`,
                      border: `1px solid ${colors.main}`,
                      minHeight: '150px'
                    }}
                  >
                    {milestone.image ? (
                      <img 
                        src={milestone.image} 
                        alt={`Chapter ${idx + 1}: ${milestone.title}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        style={{ maxHeight: '180px', width: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <Image size={32} style={{ color: colors.main, opacity: 0.5 }} />
                        <p className="text-white/40 text-xs mt-2">Image coming soon 📸</p>
                      </div>
                    )}
                  </div>

                  {/* Full Story Block */}
                  <div 
                    className="rounded-xl p-4 mb-4 border-l-4"
                    style={{
                      backgroundColor: `${colors.main}20`,
                      borderLeftColor: colors.main
                    }}
                  >
                    <p className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {milestone.fullStory}
                    </p>
                  </div>

                  {/* Ending Line for last chapter */}
                  {idx === milestones.length - 1 && (
                    <div 
                      className="rounded-xl p-4 mt-4 text-center"
                      style={{
                        backgroundColor: `${colors.main}30`,
                        border: `2px solid ${colors.main}`
                      }}
                    >
                      <p className="text-white font-semibold text-base md:text-lg italic">
                        "It didn't start perfectly… it didn't stay easy… but somehow, through everything—it became something I never want to lose."
                      </p>
                    </div>
                  )}

                  {/* Memory Marker */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/20">
                    <Heart size={14} className="animate-pulse" style={{ color: colors.main }} />
                    <span className="text-white/60 text-xs font-mono">cherished forever</span>
                    <Heart size={14} className="animate-pulse" style={{ color: colors.main }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Grand Finale Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="relative mt-16 text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255,105,180,0.8)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onGames}
            className="px-12 py-5 rounded-full font-black text-xl md:text-2xl uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white shadow-2xl flex items-center gap-4 mx-auto group relative overflow-hidden"
            style={{
              border: '3px solid #FFE484',
              boxShadow: '15px 15px 0px 0px #ff149370'
            }}
          >
            <span className="relative z-10">🎮 More!!!! 🎮</span>
            <Sparkles className="relative z-10 group-hover:animate-spin" size={24} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
          <p className="text-pink-300/60 text-sm mt-4">
            ✨ Ready for some fun? Let's celebrate our journey with games! ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Journey;