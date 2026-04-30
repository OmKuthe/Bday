import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Sparkles, ArrowLeft } from 'lucide-react';

const MemoryJar = ({ onNavigate, onThenVsNow }) => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [poppedMemories, setPoppedMemories] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flyingCookie, setFlyingCookie] = useState(null);
  const jarRef = useRef(null);
  const memories = [
    {
      id: 1,
      title: "The Pronunciation Game",
      memory: "That random moment where we tried saying Wojciech Szczęsny properly… and completely failed. It turned into laughs, retries, and chaos—but somehow, it became one of those stupidly perfect moments.",
      emoji: "⚽"
    },
    {
      id: 2,
      title: "The Google Classroom Flirt",
      memory: "Who even flirts on Google Classroom? Apparently… me. Between assignments and notifications, there were messages that had nothing to do with studies—just quiet attempts to talk to you.",
      emoji: "💻"
    },
    {
      id: 3,
      title: "The KHUSHI Email",
      memory: "Not just an email. Something thoughtful. An interactive message… where every part came together to spell KHUSHI—like turning your name into something you could feel.",
      emoji: "✉️"
    },
    {
      id: 4,
      title: "The Christmas Video",
      memory: "On Christmas, I didn't just wish you. I made something for you. A whole video—because some people deserve more than just a 'Merry Christmas.'",
      emoji: "🎄"
    },
    {
      id: 5,
      title: "The Early Christmas",
      memory: "You said 'Merry Christmas' on 25th November. I told you it was too early. And you said: 'I thought you might take one month to reply.' That one line… hurt, hit, and stayed.",
      emoji: "🏜️"
    },
    {
      id: 6,
      title: "The Staircase Moment",
      memory: "The first time we held hands. On the stairs. A little awkward. A little unsure. But also… really nice.",
      emoji: "🤝"
    },
    {
      id: 7,
      title: "Your Little World",
      memory: "You explaining random things—how four people play that game, what books you read, what you like. I may not remember every detail… but I remember how much I loved listening.",
      emoji: "📚"
    },
    {
      id: 8,
      title: "The 0.5 Conversation",
      memory: "That one oddly specific talk… about 0.5. It didn't have to make perfect sense—because somehow, it still made sense to us.",
      emoji: "🧠"
    },
    {
      id: 9,
      title: "The Handmade Gift",
      memory: "A football crochet keychain. Made by you. Not something bought. Something created—with time, effort, and a little bit of you in it.",
      emoji: "🧶"
    },
    {
      id: 10,
      title: "The Ponytail Moment",
      memory: "I once said I liked ponytails. And one day… you wore one. Maybe it was small for you—but it meant more than you think to me.",
      emoji: "🎀"
    },
    {
      id: 11,
      title: "The T-Shirt Detail",
      memory: "You remembered the color of my T-shirt. Such a tiny detail… but it said something bigger: You notice me. You pay attention.",
      emoji: "👕"
    },
    {
      id: 12,
      title: "Our Secret Language",
      memory: "Now we have our own inside jokes, our own language, our own little world that nobody else understands. And I wouldn't trade it for anything.",
      emoji: "✨"
    },
  ];

  const collected = poppedMemories.map(id => memories.find(m => m.id === id));
  const leftCookies = collected.filter((_, i) => i % 2 === 0);
  const rightCookies = collected.filter((_, i) => i % 2 !== 0);

  const remainingMemories = memories.filter(m => !poppedMemories.includes(m.id)).length;

  const handlePopMemory = useCallback(async (memory) => {
    if (poppedMemories.includes(memory.id) || isAnimating) return;
    setIsAnimating(true);
    const goesLeft = poppedMemories.length % 2 === 0;
    setFlyingCookie({ ...memory, goesLeft });
    await new Promise(resolve => setTimeout(resolve, 950));
    setPoppedMemories(prev => [...prev, memory.id]);
    setSelectedMemory(memory);
    setFlyingCookie(null);
    setIsAnimating(false);
  }, [poppedMemories, isAnimating]);

  const handlePullRandom = useCallback(() => {
    const unpulled = memories.filter(m => !poppedMemories.includes(m.id));
    if (unpulled.length > 0 && !isAnimating) {
      handlePopMemory(unpulled[Math.floor(Math.random() * unpulled.length)]);
    }
  }, [poppedMemories, isAnimating, handlePopMemory]);

  // Brown cookie - larger size
  const Cookie = ({ size = 72, emoji }) => (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <defs>
        <radialGradient id="cookieGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#C47A3E"/>
          <stop offset="60%" stopColor="#A0522D"/>
          <stop offset="100%" stopColor="#6B2E0E"/>
        </radialGradient>
      </defs>
      {/* Main cookie body */}
      <circle cx="40" cy="40" r="37" fill="url(#cookieGrad)" opacity="0.95"/>
      <circle cx="40" cy="40" r="35" fill="url(#cookieGrad)"/>
      
      {/* Chocolate chips - darker brown */}
      {[[22,24],[52,20],[36,16],[62,38],[16,46],[46,54],[26,57],[58,60],[39,40],[24,33],[54,34],[30,45],[42,52],[48,28],[20,38],[60,48]].map(([cx,cy],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3.5"
          fill="#3E1A05" opacity="0.9" transform={`rotate(${i*22.5} ${cx} ${cy})`}/>
      ))}
      
      {/* Cookie texture dots */}
      {[...Array(12)].map((_, i) => (
        <circle key={`dot-${i}`} cx={25 + (i * 4) % 40} cy={30 + Math.floor(i / 6) * 20} r="1.5" fill="#D4893E" opacity="0.5"/>
      ))}
      
      {/* Highlight */}
      <ellipse cx="27" cy="25" rx="8" ry="5" fill="white" opacity="0.12" transform="rotate(-30 27 25)"/>
      
      {/* Emoji */}
      {emoji && <text x="40" y="44" textAnchor="middle" fontSize="18" dominantBaseline="middle" fill="#1A0A00">{emoji}</text>}
    </svg>
  );

  // LARGER JAR - significantly increased size
  const Jar = () => (
    <svg width="360" height="480" viewBox="0 0 360 480" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="jarBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.35"/>
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="jarShine" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="jarLid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d"/>
          <stop offset="100%" stopColor="#d97706"/>
        </linearGradient>
        <linearGradient id="jarRim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#b45309"/>
        </linearGradient>
        <clipPath id="jarClip">
          <path d="M60,170 Q54,175 52,200 L42,420 Q38,450 180,455 Q322,450 318,420 L308,200 Q306,175 300,170 Z"/>
        </clipPath>
      </defs>
      
      {/* Jar body */}
      <path d="M60,170 Q54,175 52,200 L42,420 Q38,450 180,455 Q322,450 318,420 L308,200 Q306,175 300,170 Z"
        fill="url(#jarBody)" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 4"/>
      
      {/* Cookies inside jar */}
      <g clipPath="url(#jarClip)" opacity="0.6">
        {[
          {cx:180,cy:400,r:55}, {cx:145,cy:360,r:48}, {cx:215,cy:355,r:45},
          {cx:170,cy:310,r:42}, {cx:195,cy:270,r:40}, {cx:150,cy:240,r:38},
          {cx:210,cy:220,r:36}, {cx:180,cy:185,r:34}
        ].map((c,i)=>(
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#C47A3E" opacity={0.7 - i * 0.04}/>
        ))}
      </g>
      
      {/* Jar shine */}
      <path d="M80,190 Q76,195 74,215 L66,410 Q64,435 100,440 L96,215 Q94,195 80,190 Z" fill="url(#jarShine)"/>
      
      {/* Glass reflection line */}
      <rect x="52" y="230" width="250" height="60" rx="4" fill="white" opacity="0.08"/>
      
      {/* Label on jar */}
      <rect x="110" y="250" width="140" height="70" rx="12" fill="white" opacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
      <text x="180" y="278" textAnchor="middle" fontSize="14" fill="white" opacity="0.85" fontFamily="serif" fontStyle="italic" fontWeight="bold">Memory Jar</text>
      <text x="180" y="300" textAnchor="middle" fontSize="10" fill="white" opacity="0.55">✦ open with love ✦</text>
      
      {/* Jar lid */}
      <rect x="95" y="100" width="170" height="75" rx="14" fill="url(#jarLid)" stroke="#b45309" strokeWidth="2.5"/>
      <rect x="95" y="100" width="170" height="35" rx="14" fill="white" opacity="0.15"/>
      
      {/* Lid knob */}
      <ellipse cx="180" cy="68" rx="35" ry="22" fill="url(#jarLid)" stroke="#b45309" strokeWidth="2"/>
      <ellipse cx="180" cy="68" rx="35" ry="12" fill="white" opacity="0.12"/>
      <ellipse cx="180" cy="55" rx="15" ry="10" fill="#fcd34d" stroke="#b45309" strokeWidth="1.5"/>
      
      {/* Decorative chocolate chips on lid */}
      {[[130,115],[165,108],[200,112],[235,118],[148,135],[212,132]].map(([cx,cy],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3.5" fill="#5C3317" opacity="0.7"
          transform={`rotate(${i*30} ${cx} ${cy})`}/>
      ))}
    </svg>
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#0e0a1f]">

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,200,150,0.3) 2px, transparent 2px)',
        backgroundSize: '40px 40px', opacity: 0.22
      }}/>
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(45deg, rgba(255,200,150,0.07) 0px, rgba(255,200,150,0.07) 2px, transparent 2px, transparent 15px)'
      }}/>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 6) * 3,
              height: 4 + (i % 6) * 3,
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              background: ['#FF3AF2','#00F5D4','#FFE600','#FF6B35','#7B2FFF'][i % 5],
              opacity: 0.2
            }}
            animate={{ y: [0, -70, 0], x: [0, (i%2===0?35:-35), 0], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 8 + i % 7, repeat: Infinity, delay: i * 0.55, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Background text */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[12%] right-[-10%] text-[20vw] font-black text-white/[0.035] whitespace-nowrap rotate-12"
          style={{ letterSpacing: '0.1em', fontFamily: 'monospace' }}>MEMORIES</div>
        <div className="absolute bottom-[8%] left-[-12%] text-[16vw] font-black text-white/[0.025] whitespace-nowrap -rotate-12"
          style={{ letterSpacing: '0.1em', fontFamily: 'monospace' }}>CHERISH</div>
      </div>

      {/* BACK BUTTON - Added */}
      <div className="relative z-30 pt-6 px-6">
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('reasons')}
          className="text-white/80 hover:text-white transition-all text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 flex items-center gap-2 backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          Back to Reasons
        </motion.button>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative z-20 pt-6 pb-4 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-[0.45em] text-yellow-300 font-bold mb-3"
        >
          ✦ a collection of us ✦
        </motion.p>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-0 mb-3">
          {['THE', 'MEMORY', 'JAR'].map((word, wi) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 70, rotate: wi === 0 ? -6 : wi === 2 ? 6 : 0 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.15 + wi * 0.18, type: 'spring', damping: 11 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white"
              style={{
                textShadow: '5px 5px 0 #FF1493, 10px 10px 0 #8A2BE2, 15px 15px 0 #FFD700',
                fontFamily: 'monospace', lineHeight: 1.08
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.65, duration: 0.9, ease: 'easeOut' }}
          className="h-1.5 rounded-full max-w-sm mx-auto mb-4 origin-left"
          style={{ background: 'linear-gradient(90deg, #FF3AF2, #FFE600, #00F5D4, #FF6B35)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="text-pink-200 text-base md:text-lg max-w-lg mx-auto leading-relaxed opacity-85"
        >
          Every moment we've made — collected, cherished,<br className="hidden md:block"/> kept inside this jar. Pull one out 🍪
        </motion.p>
      </div>

      {/* ── THREE COLUMN JAR LAYOUT ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-start justify-center gap-8 md:gap-12">

          {/* LEFT COLUMN - Larger brown cookies */}
          <div className="flex flex-col items-center gap-5 pt-16 min-w-[80px] md:min-w-[100px]">
            <AnimatePresence>
              {leftCookies.map((memory, i) => (
                <motion.div
                  key={memory.id}
                  initial={{ scale: 0, rotate: -40, opacity: 0, x: 80 }}
                  animate={{ scale: 1, rotate: -6 + (i % 3) * 6, opacity: 1, x: 0 }}
                  transition={{ type: 'spring', damping: 11 }}
                  onClick={() => setSelectedMemory(memory)}
                  className="cursor-pointer relative group"
                  title={memory.title}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                >
                  <Cookie size={68} emoji={memory.emoji} />
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/85 text-white text-[11px] rounded-lg px-2 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 backdrop-blur-sm border border-white/10 max-w-[130px] leading-tight">
                    {memory.title}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CENTER - JAR */}
          <div className="flex flex-col items-center relative flex-shrink-0">

            {/* Glow behind jar */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.32, 0.62, 0.32] }}
              transition={{ duration: 2.8, repeat: Infinity }}
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(251,191,36,0.35), rgba(255,105,180,0.2))',
                width: 400, height: 460, top: '5%', left: '50%', transform: 'translateX(-50%)'
              }}
            />

            {/* Flying cookie animation */}
            <AnimatePresence>
              {flyingCookie && (
                <motion.div
                  key="fly"
                  className="absolute z-50 pointer-events-none"
                  style={{ top: '8%', left: '50%' }}
                  initial={{ x: '-50%', y: 20, scale: 0.4, rotate: 0, opacity: 0 }}
                  animate={{
                    x: flyingCookie.goesLeft
                      ? ['-50%', '-50%', '-380%']
                      : ['-50%', '-50%', '280%'],
                    y: [20, -180, 100],
                    scale: [0.4, 1.8, 1.2],
                    rotate: flyingCookie.goesLeft ? [0, -25, -45] : [0, 25, 45],
                    opacity: [0, 1, 1]
                  }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Cookie size={85} emoji={flyingCookie.emoji} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Jar - clickable */}
            <motion.div
              ref={jarRef}
              whileHover={{ scale: 1.04, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePullRandom}
              className="cursor-pointer select-none relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <Jar />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-center mt-3 text-yellow-300 text-xs font-bold tracking-widest uppercase opacity-80"
              >
                tap the jar ↑
              </motion.div>
            </motion.div>

            {/* PULL A MEMORY button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePullRandom}
              disabled={remainingMemories === 0 || isAnimating}
              className="mt-8 relative overflow-hidden rounded-full font-black text-sm md:text-base uppercase tracking-widest flex items-center justify-center gap-2 px-8 py-4 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #FF3AF2 0%, #7B2FFF 50%, #00F5D4 100%)',
                backgroundSize: '200%',
                border: '3px solid #FFE600',
                boxShadow: '8px 8px 0 #FF3AF250, 14px 14px 0 #7B2FFF35',
                minWidth: 240
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
              />
              <span className="relative z-10 text-white whitespace-nowrap">🍪 PULL A MEMORY 🍪</span>
              <Gift className="relative z-10 text-white flex-shrink-0" size={17} />
            </motion.button>

            {/* Progress bar */}
            <div className="w-64 mt-6">
              <div className="bg-white/10 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-2.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #C47A3E, #A0522D, #6B2E0E)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((memories.length - remainingMemories) / memories.length) * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <p className="text-white/40 text-[11px] text-center mt-2 tracking-widest">
                {memories.length - remainingMemories} / {memories.length} memories collected
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - Larger brown cookies */}
          <div className="flex flex-col items-center gap-5 pt-16 min-w-[80px] md:min-w-[100px]">
            <AnimatePresence>
              {rightCookies.map((memory, i) => (
                <motion.div
                  key={memory.id}
                  initial={{ scale: 0, rotate: 40, opacity: 0, x: -80 }}
                  animate={{ scale: 1, rotate: 6 - (i % 3) * 6, opacity: 1, x: 0 }}
                  transition={{ type: 'spring', damping: 11 }}
                  onClick={() => setSelectedMemory(memory)}
                  className="cursor-pointer relative group"
                  title={memory.title}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                >
                  <Cookie size={68} emoji={memory.emoji} />
                  <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/85 text-white text-[11px] rounded-lg px-2 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 backdrop-blur-sm border border-white/10 max-w-[130px] leading-tight text-right">
                    {memory.title}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Button - Always visible (removed the "all memories" restriction) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 p-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={onThenVsNow}
            className="px-10 py-4 rounded-full font-black text-lg flex items-center gap-3 mx-auto text-white"
            style={{ 
              background: 'linear-gradient(135deg, #C47A3E, #A0522D, #6B2E0E)',
              border: '3px solid #FFE600',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
            }}
          >
            <Sparkles size={20} />
            Continue to Then vs Now ✨
            <Sparkles size={20} />
          </motion.button>
          <p className="text-white/40 text-xs mt-3">
            {remainingMemories > 0 ? `✨ ${remainingMemories} more memory cookies to discover! ✨` : "🎉 All memories collected! 🎉"}
          </p>
        </motion.div>
      </div>

      {/* ── MODAL for viewing memory details ── */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotate: -18 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.2, opacity: 0, rotate: 18 }}
              transition={{ type: 'spring', damping: 13 }}
              className="rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #C47A3Ee0, #8B4513cc)',
                border: '4px solid #D4893E',
                boxShadow: `0 0 55px #D4893E65, 14px 14px 0 #00000065`
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 10px)' }}/>

              <div className="flex justify-center mb-5">
                <motion.div
                  animate={{ rotate: [0, 9, -9, 0] }}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  <Cookie size={92} emoji={selectedMemory.emoji} />
                </motion.div>
              </div>

              <h3 className="text-xl font-black text-white mb-3"
                style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.45)', fontFamily: 'monospace' }}>
                {selectedMemory.title}
              </h3>

              <p className="text-white/95 text-sm leading-relaxed mb-5">
                {selectedMemory.memory}
              </p>

              <div className="flex justify-center gap-1.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} size={14} fill="#F472B6" className="text-pink-200"/>
                ))}
              </div>

              <button
                onClick={() => setSelectedMemory(null)}
                className="px-6 py-2.5 rounded-full font-bold text-sm text-white transition-all"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.32)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                Close & Cherish 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryJar;